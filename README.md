# Dummy-Website-Test

## Info

This is just a test and some experimentations :)

## To run

```
~$ clojure -X:serve
```

Then access `localhost:3000`

## Useful materials

- [Cryogen's Website](https://cryogenweb.org/docs/home.html)
- [Selmer Documentation](https://github.com/yogthos/Selmer)
- [Clojure Cheatsheet](https://clojure.org/api/cheatsheet)

## Documentation of changes (needs update)

The following will be the documentation of changes made/features added based on the `nucleus` theme of cryogen.

1. [Added easier color configuration](#added-easier-color-configuration)
2. [Added theme selection](#added-theme-selection)
3. [Added a way to 'unlink' pages](#added-a-way-to-unlink-pages)
4. [Included LaTeX support](#included-latex-support)
5. [Dates and Authors for pages](#dates-and-authors-for-pages)
6. [Styling](#styling)
7. [Note](#note)

### Added easier color configuration

Instead of changing the color manually in every `css` file, you can now just do all the configurations in `css/dark-theme.css` and `css/light-theme.css`. And here is the list of all parameters:

|Parameters               |Description                                     |
|-------------------------|------------------------------------------------|
|`--background`           |Background color (`<div id="right">`)           |
|`--main-color`           |Primary color                                   |
|`--text-color`           |Color of normal text                            |
|`--hover-color`          |Color of text when mouse is hovered over        |
|`--menu-background`      |Background color of the menu (`<div id="left">`)|
|`--footer-text-color`    |Color of the footer text                        |
|`--header-color`         |Color of the headers                            |
|`--blockquote-color`     |Color of text in blockquotes                    |
|`--blockquote-background`|Color of the blockquote background              |
|`--table-even-row`       |Color of the even rows of the table             |

### Added theme selection

Now there is a settings page where you can select between dark and light theme, or you can choose follow system. There can also be other custom themes, by simply including a `<theme-name>-theme.css` file under the `css/` folder. Then you can include a button `<a class="button" data-type="theme-button" data-theme="<theme-name>"></a>` so users can selected the newly added theme. 

### Added a way to 'unlink' pages

By default, all pages are unlinked, but if you specify `:link` to be `true` in the page metadata, you can unlink pages, while the linked pages are not affected. It is recommended to set `:page-index` to be negative and `:navbar?` to be `true`. Note linked pages will be displayed first, and unlinked pages will be displayed in the order of `:page-index`, in other words, a page with `:page-index ` set to `-2` will be displayed on top of a page with `:page-index` set to `-1` in the navigation bar.

### Included table customisation

Included `css/table.css` so customizing tables are possible. 

### Included LaTeX support

Using `katex` to render LaTeX, simply put the paragraph(s) in the element `<katex-container>`.

**Note**: Due to how cryogen handles superscripts during compilation of markdown files, it will compile any `^` into the `<sup>` tags, resulting in the buggy rendering of latex (`$a^b$` becomes `<p>$a<sup>b</sup>$</p>`). A workaround is to escape any superscripts, if all the files onl contain latex, run the `latex.py` file first, which converts any `^` in `<katex-container>` into `\^`. If any markdown files needs to be ignored when running `latex.py`, include it in the `EXCLUDE` list. Smarter handling script will be added in the future. Hence, when editing `md` files in vscode, the normal functionality of `\^` will be replaced by `\hatxtd`, and `^` will function the same way as `\^`, see `.vscode/settings.json` for more info.

### Dates and Authors for Pages

Specify the date and author of a page with `:date` and `:last-edited-by` in the metadata for the page. Dates should be in the format of `YYYY-MM-DD`. 

### Styling

Just look at the CSS files, theres too much to say. Recommended: learn css.

### Note

#### Edits in `src/cryogen/server.clj`

1. As we are still figuring out and learning the clojure language, we used python files to preprocess [latex](#included-latex-support) in markdown files and generate the javascript dealing with theme-selection for now. These files can be seen in `preprocessin-scripts/`, and is ran in the `cryogen.server/preprocess` function (see `src/cryogen/server.clj`).
2. To deal with the rendering of dates in pages, a filter is added in `src/cryogen/server.clj`, called `parseDate`, which parses a string with the format `YYYY-MM-DD` to a `java.util.Date` object, which then can be fed to the [`date` filter](https://github.com/yogthos/Selmer?tab=readme-ov-file#date).

#### Beyond Capabilities of Markdown (Life Hack!)

You can go beyond capabilities of markdown by including **raw** html in the markdown, like 
```html
<iframe width="640" height="400" src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>
```
in the markdown file to render the video

#### Also include

- `:navbar-name`
- `:notitle`
- `:last`
- `:last-edited-by`
- `:link`
- `<x-accordion>`