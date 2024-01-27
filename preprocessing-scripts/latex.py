def run():
    from glob import glob
    import re

    mdfiles = [f for f in glob('content/**/*.md', recursive=True)]

    EXCLUDE = []
    DELIMITERS_LEFT = [r'\\\(', r'\\[']
    DELIMITERS_RIGHT = [r'\\\)', r'\\]']
    DELIMITERS_NEUTRAL = ['$', '$$']

    for fname in mdfiles:
        if fname in EXCLUDE: continue
        print(f'Processing latex {fname}')
        with open(fname, 'r') as f:
            content = f.read()
        katex_content = [''.join(s) for s in re.findall(r'<katex-container\s*.*?>(?:.|\n)*?</katex-container>', content)]
        non_katex_content = re.split(r'<katex-container\s*.*?>(?:.|\n)*?</katex-container>', content)
        ncontent = ''
        for ig_content, content in zip(non_katex_content, katex_content):
            content = re.sub(r'\\\^', r'^', content)
            content = re.sub(r'\\\\\(', r'\(', content)
            content = re.sub(r'\\\\\)', r'\)', content)
            content = re.sub(r'\\\\\[', r'\[', content)
            content = re.sub(r'\\\\\]', r'\]', content)
            for dl, dr in zip(DELIMITERS_LEFT, DELIMITERS_RIGHT):
                non_latex = re.split(f'{dl}.*?{dr}', content)
                latex = re.findall(f'{dl}.*?{dr}', content)
                for i in range(len(latex)):
                    latex[i] =  re.sub(r'\^', r'\^', latex[i])
                content = ''.join([non_latex[i] + latex[i] for i in range(len(latex))])+non_latex[-1]
            for d in DELIMITERS_NEUTRAL:
                content = d.join(re.sub(r'\^', r'\^', c) if i%2 else c for i,c in enumerate(content.split(d)))
            ncontent += ig_content + content
        ncontent += non_katex_content[-1]
        ncontent = re.sub(r'\\\(', r'\\\\(', ncontent)
        ncontent = re.sub(r'\\\)', r'\\\\)', ncontent)
        ncontent = re.sub(r'\\\[', r'\\\\[', ncontent)
        ncontent = re.sub(r'\\\]', r'\\\\]', ncontent)
        with open(fname, 'w') as f:
            f.write(ncontent)
