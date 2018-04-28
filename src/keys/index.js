const log = require('utils/log');

const gnome = require('gnome');

const Meta = require('gi/meta');
const Shell = require('gi/shell');
const Main = require('ui/main');

const _onActivated = (grabbers, action) => {
    const grabber = grabbers.get(action);

    if (grabber) {
        grabber.callback(grabber.accelerator);
    }
};

const _init = (ctx) => {
    const grabbersMap = new Map();
    return Object.assign({
        grabbers: grabbersMap,
        handler: gnome.display.connect(
            'accelerator-activated',
            (display, action, deviceId, timestamp) => {
                _onActivated(grabbersMap, action);
            })
    }, ctx);
};

const _grab = (ctx, accelerator) => {
    const grabbers = ctx.grabbers;

    log('Trying to listen for hot key [accelerator={}]', accelerator);
    const action = gnome.display.grab_accelerator(accelerator);

    if (action === Meta.KeyBindingAction.NONE) {
        log('Unable to grab accelerator [binding={}]', accelerator);

        return (callback) => {
            log('I was unable to grab the shortcut so this callback is inactive');
        }
    } else {
        log('Grabbed accelerator [action={}]', action);
        const name = Meta.external_binding_name_for_action(action);
        log('Received binding name for action [name={}, action={}]',
            name, action);

        log('Requesting WM to allow binding [name={}]', name);
        Main.wm.allowKeybinding(name, Shell.ActionMode.ALL);

        return (callback) => {
            grabbers.set(action, {
                name: name,
                accelerator: accelerator,
                callback: callback
            });
        };
    }
};

const _ungrab = (ctx, action) => {
    const grabbers = ctx.grabbers;
    const grabber = grabbers.get(action);

    log('Stopping listening for [binding={}, action={}, name={}]',
        grabber.accelerator, action, grabber.name);

    const success = gnome.display.ungrab_accelerator(action);
    if (success) {
        log('Stopped listening for [binding={}, action={}, name={}]',
            grabber.accelerator, action, grabber.name);
        grabbers.delete(action);
    } else {
        log('Failed to stop listening for [binding={}, action={}, name={}]',
            grabber.accelerator, action, grabber.name);
    }

    return success;
};

const _start = (ctx) => {
    return _init(ctx);
};

const _stop = (ctx) => {
    log('Stopping listening for all registered key bindings');

    const grabbers = ctx.grabbers;

    let success = true;
    for (let [action, grabber] of grabbers.entries()) {
        success = success && _ungrab(ctx, action)
    }

    return Object.assign({grabbers: null, handler: null}, ctx);
};

const _create = () => {
    return {}
};

module.exports = {
    create: () => {
        let active = false;
        let ctx = _create();

        return {
            start: () => {
                ctx = _start(ctx);
                active = true;
            },

            stop: () => {
                ctx = _stop(ctx);
                active = false;
            },

            onKey: (accelerator) => {
                let action = null;

                if(active) {
                    const binder = _grab(ctx, accelerator);
                    action = (callback) => {
                        binder(callback);
                    };
                } else {
                    log('Attempt to grab a key using stopped key manager. All actions are ignored');
                    action = () => {};
                }

                return {
                    do: action
                };
            }
        }
    }
};
