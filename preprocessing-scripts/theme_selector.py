def run():
    import edn_format
    import re
    from glob import glob

    with open('content/config.edn', 'r') as f:
        content = f.read()

    config =  edn_format.loads(''.join(re.split(r':ignored-files.*?\n', content)))
    blog_prefix = config[edn_format.Keyword('blog-prefix')]
    theme_name = config[edn_format.Keyword('theme')]

    print(f"compiling themes from themes/{theme_name}/css/*-theme.css")

    themes_css_files = [fname.replace('\\', '/') for fname in glob(f'themes/{theme_name}/css/*.css') if fname[-10:] == "-theme.css"]
    theme_names = [fname.split('/')[-1][:-10] for fname in themes_css_files]
    theme_paths = ['/'+'/'.join(fname.split('/')[-2:]) for fname in themes_css_files]

    setTheme_template = lambda theme_name, theme_path: fr"""else if (theme === '{theme_name}') {{
            themeStyleLink.setAttribute('href', BLOG_PREFIX+'{theme_path}');
            localStorage.setItem('theme', '{theme_name}');
        }}"""

    setTheme_content = " ".join([setTheme_template(theme_name, theme_path) for theme_name, theme_path in zip(theme_names, theme_paths)])

    theme_selector_js = fr"""const BLOG_PREFIX = "{blog_prefix}";

    function setTheme(theme) {{
        const themeStyleLink = document.getElementById('theme-style');
        if (theme === 'system') {{
            themeStyleLink.setAttribute('href', prefersDarkColorScheme()?BLOG_PREFIX+'/css/dark-theme.css':BLOG_PREFIX+'/css/light-theme.css');
            localStorage.removeItem('theme');
        }} {setTheme_content}
    }}

    function prefersDarkColorScheme() {{
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }}

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {{
        setTheme(savedTheme);
    }} else {{
        setTheme('system');
    }}

    const themeButtons = document.querySelectorAll('[data-type="theme-button"]');

    Array.from(themeButtons).forEach((button) => {{
        button.addEventListener('click', function (event) {{
            const selectedTheme = event.target.dataset.theme;
            setTheme(selectedTheme);
        }});
    }});
    """

    with open(f'themes/{theme_name}/js/theme-selector.js', 'w') as f:
        f.write(theme_selector_js)

    print(f"finished generating themes/{theme_name}/js/theme-selector.js")