const BLOG_PREFIX = "/Dummy-Website-Test";

function setTheme(theme) {
    const themeStyleLink = document.getElementById('theme-style');
    if (theme === 'system') {
        themeStyleLink.setAttribute('href', prefersDarkColorScheme()?BLOG_PREFIX+'/css/dark-theme.css':BLOG_PREFIX+'/css/light-theme.css');
        localStorage.removeItem('theme');
    } else if (theme === 'dark') {
        themeStyleLink.setAttribute('href', BLOG_PREFIX+'/css/dark-theme.css');
        localStorage.setItem('theme', 'dark');
    } else if (theme === 'light') {
        themeStyleLink.setAttribute('href', BLOG_PREFIX+'/css/light-theme.css');
        localStorage.setItem('theme', 'light');
    }
}

function prefersDarkColorScheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
} else {
    setTheme('system');
}

const themeButtons = document.querySelectorAll('[data-type="theme-button"]');

Array.from(themeButtons).forEach((button) => {
    button.addEventListener('click', function (event) {
        const selectedTheme = event.target.dataset.theme;
        setTheme(selectedTheme);
    });
});
