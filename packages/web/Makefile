.PHONY: all

SHELL := /usr/bin/env bash # bash is necessary for the `source` command to work

all: clean install build

clean:
	rm -fr node_modules
	rm -fr build

install:
	yarn install

build:
	rm -fr web
	yarn build

release:
