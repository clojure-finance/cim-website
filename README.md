# Dummy-Website-Test

## Info

This is just a test and some experimentations, also a place for me to jot nodes and stuff :)

## To run

```
~$ clojure -X:serve
```

Then access `localhost:3000`

**Note**: Due to how cryogen handles superscripts during compilation of markdown files, it will compile any `^` into the `<sup>` tags, resulting in the buggy rendering of latex (`$a^b$` becomes `<p>$a<sup>b</sup>$</p>`). A workaround is to escape any superscripts, if all the files onl contain latex, run the `latex.py` file first, which converts any `^` into `\^`. If any markdown files needs to be ignored when running `latex.py`, include it in the `EXCLUDE` list.

## Useful materials

- [Cryogen's Website](https://cryogenweb.org/docs/home.html)
- [Selmer Documentation](https://github.com/yogthos/Selmer)
- [Clojure Cheatsheet](https://clojure.org/api/cheatsheet)
