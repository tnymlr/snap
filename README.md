# Snap
Snap is a Gnome Shell extension which allows you to assign a keyboard shortcut to summon windows of an app.

Inspired by "Snap.app" - http://indragie.com/snap/

This extension uses Gnome Shell API, so it works in both Wayland and X.Org.


## Build
In order to build Snap you're going to need [Node.JS](https://nodejs.org) and [NPM](https://www.npmjs.com/) installed

```bash
$ npm run build
```


Once it has been built just copy whole folder into `~/.local/share/gnome-shell/extensions/snap@extensions.shell.gnome.org` or create a symlink.

## Usage

To use this extension you need to assign a keyboard shortcut to an app first.

Once you've done it you can summon all of the windows of the app by hitting that keyboard shortct

### Assign Shortcut

In order to assign a shortcut you need to open extensions settings.

There are two ways to do it:

 - using [Gnome Tweak Tool](https://wiki.gnome.org/Apps/GnomeTweakTool) - just open it, go to extensions, find Snap and open settings.
 - using command line - just run:
   ```bash
    $ gnome-shell-extension-prefs 
   ```
   Find Snap in the list and click settings icon.

You can add and remove shortcuts using settings UI.

 - Click 'Add' button to add a new shortcut.
 - Pick an app from the apps list on the left
 - Click keyboard shortcut text entry
 - Press keyboard shortcut you want to use
 - Click 'Apply' button to save settings. No changes saved util you click 'Apply' button.

 You can click 'Delete' button to delete a shortcut

 *NOTE:* not all shortcuts are valid.
 Valid shortcuts:
  - Has exactly one letter
  - Has one or more modifiers (ctrl or alt or super or all of them)

### Using Shortcuts

Just hit a shortcut you've configured and see how it summons windows of the app assigned

## Limitations

There are several limitations right now

### Gnome shell reload is required

As for now you need to reload gnome shell if you change shortcuts. In order to do so, do as follows:

 - Press 'Alt+F2'
 - Type 'r'
 - Press 'Enter'

It won't kill any of applications you have running, it'll only reload Gnome Shell configuration.

### It doesn't start apps if there is no windows present

Even though I designed configuration schema with this feature in mind, I haven't implemented it yet.
