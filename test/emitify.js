'use strict';

const Emitify = require('..');
const test = require('tape');

test('on', (t) => {
    const emitify = Emitify();
    
    emitify.on('event', () => {
        t.end();
    });
    
    emitify.emit('event');
});

test('addListener', (t) => {
    const emitify = Emitify();
    
    emitify.addListener('event', () => {
        t.end();
    });
    
    emitify.emit('event');
});

test('addListener, add second one', (t) => {
    let value = 0;
    
    const emitify = Emitify();
    const inc = () => {
        return ++value;
    };
    
    emitify.addListener('run', () => {
        t.equal(inc(), 1);
    });
    
    emitify.addListener('run', () => {
        t.equal(inc(), 2);
        t.end();
    });
    
    emitify.emit('run');
});

test('once', (t) => {
    let was;
    const emitify = Emitify();
    const fn = (data) => {
        was && t.fail('listener should be off');
        t.equal(data, 'hello');
        was = true;
    };
    
    emitify.once('event', fn);
    emitify.emit('event', 'hello');
    
    t.end();
});

test('on error: no listeners', (t) => {
    const emitify = Emitify();
    const fn  = () => {
        emitify.emit('error', Error('Some error!'));
    };
   
    t.throws(fn, /Some error!/, 'should throw exception');
    t.end();
});

test('off', (t) => {
    const emitify = Emitify(),
        fn      = () => {
            t.fail('listener should be off');
        };
    
    emitify
        .on('event', fn)
        .off('event', fn);
    
    emitify.emit('event');
    
    t.end();
});

test('removeAllListeners', (t) => {
    const emitify = Emitify(),
        fn      = () => {
            t.fail('listener should be off');
        };
    
    emitify
        .on('event', fn)
        .on('event', fn)
        .removeAllListeners('event');
    
    emitify.emit('event');
    
    t.end();
});

test('removeAllListeners: no arguments', (t) => {
    const emitify = Emitify();
    const fn = () => {
        emitify.removeAllListeners();
    };
   
    t.throws(fn, /event should be string!/, 'should throw when not string');
    t.end();
});

test('on, addListener: no arguments', (t) => {
    const emitify = Emitify();
    const fn = () => {
        emitify.on();
    };
   
    t.throws(fn, /event should be string!/, 'should throw when not string');
    t.end();
});

test('on, addListener: no listener', (t) => {
    const emitify = Emitify();
    const fn = () => {
        emitify.on('error');
    };
   
    t.throws(fn, /callback should be function!/, 'should throw when not function');
    t.end();
});

test('emit: no listeners', (t) => {
    const emitify = Emitify();
    const fn = () => {
        return emitify.emit('hello');
    };
    
    t.equal(fn(), emitify, 'should return emitify');
   
    t.end();
});
