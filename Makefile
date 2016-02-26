cp:
	@cp -r ./src/ ./dist

release: clean
	@mkdir -p ./dist
	@cp -r ./src/ ./dist

clean:
	@rm -fr ./dist

test:
	@echo 'do nothing.'

publish:
	@npm publish

.PHONY: install test
