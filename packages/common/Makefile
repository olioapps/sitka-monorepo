.PHONY: all

SHELL := /usr/bin/env bash # bash is necessary for the `source` command to work

all: clean install build

clean:
	rm -fr node_modules

install:
	yarn install

build:
	yarn decl
	
release: