# unicode-page

Tools to generate [unicode.page](https://unicode.page).

[UCD files for Unicode
13.0.0](https://www.unicode.org/Public/zipped/13.0.0/) are fetched by
`make`.

The aliases that look like `:this:` are called "shortcodes", although I
don't think this is an official name or that there is an official list.
Github has reasonably complete machine-formatted list (see Makefile).
[Slack's
documentation](https://slack.com/help/articles/202931348-Use-emoji-and-emoticons)
links to [some random
page](https://www.webfx.com/tools/emoji-cheat-sheet/), which seems
comprehensive enough, although it is only available as HTML with the
emojis represented by images that are named with absolutely no
indication of their code points.

TODO:

- Headless browser tests
- Implement indexing for fast fuzzy search on the client
- Manually go through more shortcode lists
- Plain text output (and implement font fallback/colored rendering in
  dmenu... okay, a fork of dmenu, I guess).
- Probably other things
