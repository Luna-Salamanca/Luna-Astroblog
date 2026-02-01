#By default, Bun will run the dev server with Node.js. 
#To use the Bun runtime instead, use the --bun flag.
dev:
	bunx --bun astro dev

build:
	bunx --bun astro build

preview:
	bunx --bun astro preview

check:
	bunx --bun astro check

install:
	bun install

