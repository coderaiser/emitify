'use strict';

module.exports = Emitify;

function Emitify() {
    if (!(this instanceof Emitify))
        return new Emitify();
    
    this._all = {};
}

Emitify.prototype.on = function(event, callback) {
    const funcs = this._all[event];
    
    check(event, callback);
    
    if (funcs)
        funcs.push(callback);
    else
        this._all[event] = [callback];
    
    return this;
};

Emitify.prototype.addListener =
Emitify.prototype.on;

Emitify.prototype.once = function(event, callback) {
    const self = this;
    
    check(event, callback);
    
    this.on(event, function fn(...args) {
        callback(...args);
        self.off(event, fn);
    });
    
    return this;
};

Emitify.prototype.off = function(event, callback) {
    const events = this._all[event] || [];
    let index = events.indexOf(callback);
    
    check(event, callback);
    
    while (~index) {
        events.splice(index, 1);
        index = events.indexOf(callback);
    }
    
    return this;
};

Emitify.prototype.removeListener =
Emitify.prototype.off;

Emitify.prototype.emit = function(event, ...args) {
    const funcs = this._all[event];
    
    checkEvent(event);
    
    if (!funcs && event === 'error')
        throw args[0];
    
    if (!funcs)
        return this;
    
    for (const fn of funcs) {
        fn(...args);
    }
    
    return this;
};

Emitify.prototype.removeAllListeners = function(event) {
    checkEvent(event);
    
    this._all[event] = [];
    
    return this;
};

function checkEvent(event) {
    if (typeof event !== 'string')
        throw Error('event should be string!');
}

function checkFn(callback) {
    if (typeof callback !== 'function')
        throw Error('callback should be function!');
}

function check(event, callback) {
    checkEvent(event);
    checkFn(callback);
}

