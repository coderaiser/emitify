(function() {
    'use strict';
    
    let Emitify = require('..'),
        test    = require('tape');
    
    test('on', t => {
        let emitify = Emitify();
        
        emitify.on('event', () => {
            t.end();
        });
        
        emitify.emit('event');
    });
    
    test('addListener', t => {
        let emitify = Emitify();
        
        emitify.addListener('event', () => {
            t.end();
        });
        
        emitify.emit('event');
    });
    
    test('once', t => {
        let emitify = Emitify(),
            was,
            fn      = () => {
                was && t.fail('listener should be off');
                was = true;
            };
        
        emitify.once('event', fn);
        
        emitify.emit('');
        
        t.end();
    });
    
    test('on error: no listeners', t => {
        let emitify = Emitify(),
            fn  = function() {
                emitify.emit('error', Error('Some error!'));
            };
       
       t.throws(fn, /Some error!/, 'should throw exception');
       t.end();
    });
    
    test('off', t => {
        let emitify = Emitify(),
            fn      = () => {
                t.fail('listener should be off');
            };
        
        emitify
            .on('event', fn)
            .off('event', fn);
        
        emitify.emit('event');
        
        t.end();
    });
    
    test('on, addListener: no arguments', t => {
        let emitify = Emitify(),
            fn  = function() {
                emitify.on();
            };
       
       t.throws(fn, /event should be string!/, 'should throw when not string');
       t.end();
    });
    
    test('on, addListener: no listener', t => {
        let emitify = Emitify(),
            fn  = function() {
                emitify.on('error');
            };
       
       t.throws(fn, /callback should be function!/, 'should throw when not function');
       t.end();
    });
})();
