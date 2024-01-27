from importlib import import_module
import edn_format
import re

with open('content/config.edn', 'r') as f:
    content = f.read()

config =  edn_format.loads(''.join(re.split(r':ignored-files.*?\n', content)))
preprocess_files = config[edn_format.Keyword('preprocessing-py-scripts')]

print('-------------------------------------')
print('Executing preprocessing scripts')
print('-------------------------------------')

for fname in preprocess_files:
    print(f'FROM {fname}.py')
    import_module(fname).run()
    print('DONE')
    print('-------------------------------------')

print('Finished')
print('-------------------------------------')