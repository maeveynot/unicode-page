.DEFAULT_GOAL := all

UCD.zip:
	@curl -LO "https://www.unicode.org/Public/zipped/13.0.0/$@"

UnicodeData.txt NamesList.txt Scripts.txt: | UCD.zip
	@unzip "$|" "$@"

emoji-sequences.txt emoji-zwj-sequences.txt:
	@curl -LO "https://www.unicode.org/Public/emoji/13.0/$@"

github-shortcodes.json:
	@curl -H "Accept: application/vnd.github.v3+json" -o "$@" 'https://api.github.com/emojis'

index.html: template.html.j2 UnicodeData.txt NamesList.txt Scripts.txt emoji-sequences.txt emoji-zwj-sequences.txt github-shortcodes.json generate
	./generate "$<" > "$@"

index.min.html: index.html
	minify-html --src "$<" --out "$@"

index.min.html.gz: index.min.html
	gzip -9fk "$<"

.DEFAULT_GOAL := all
.PHONY: all
all: index.min.html.gz

.PHONY: clean
clean:
	rm -rf index.html index.min.html index.min.html.gz
