.PHONY: all

SHELL := /usr/bin/env bash # bash is necessary for the `source` command to work

all: release

clean:
	rm -fr node_modules
	cd packages/common && make clean
	cd packages/web && make clean

install:
	cd packages/common && make install
	cd packages/web && make install

build: install
	cd packages/common && make build
	cd packages/web && make build

release: clean install build
