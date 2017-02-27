# Snap
Snap is a gnome-shell extension which allows you to assign keyboard shortcuts for certain windows to be activated.
Inspired by "Snap.app" - http://indragie.com/snap/

This extension uses gnome-shell API, so it works both in Wayland and X.Org.

## Build
In order to build Snap you're going to need [Node.JS](https://nodejs.org) and [NPM](https://www.npmjs.com/) installed

```bash
$ npm run build
```

Once it has been built just copy whole folder into `~/.local/share/gnome-shell/extensions/snap@aner.id.au`or create a symlink.

## Use:
Just adjust your shortcuts in `extension.js` file. There are couple examples.
Currently it works by checking if second parameter is a substring of window class.

## Note
WARNING: this project is mostly in proof-of-concept stage and under heavy development. I do use it everyday though.
