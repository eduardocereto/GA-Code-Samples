/**
 * GA Video Tracking
 *
 * HTML5 Video Tracking Plugin
 *
 * Copyright 2011, Cardinal Path
 * Licensed under the MIT license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 */


/**
 * Cross Browser addEventListener.
 *
 * @param {HTMLElement} obj The Element to attach event to.
 * @param {string} evt The event that will trigger the binded function.
 * @param {function(event)} ofnc The function to bind to the element.
 * @param {boolean} bubble true if event should be fired at bubble phase.
 * Defaults to false. Works only on W3C compliant browser. MSFT don't support
 * it.
 */
function bindEvent(obj, evt, ofnc, bubble) {
    var fnc = function(event) {
        event = event || window.event;
        return ofnc.call(obj, event);
    };
    bubble = bubble || false;
    // W3C model
    if (obj.addEventListener) {
        obj.addEventListener(evt, fnc, !!bubble);
    }
    // Microsoft model
    else if (obj.attachEvent) {
        obj.attachEvent('on' + evt, fnc);
    }
    // Browser don't support W3C or MSFT model, time to go old school
    else {
        evt = 'on' + evt;
        if (typeof obj[evt] === 'function') {
            // Object already has a function on traditional
            // Let's wrap it with our own function inside another function
            fnc = (function(f1, f2) {
                return function() {
                    f1.apply(this, arguments);
                    f2.apply(this, arguments);
                }
            })(obj[evt], fnc);
        }
        obj[evt] = fnc;
    }
};

/**
 * Triggers the actual video/audio GA events
 *
 * To be used as a callback for the HTML5 media events
 *
 * @param {Event} e A reference to the HTML event fired
 * @this {HTMLMediaElement} The HTML element firing the event
 */
function _trackMediaElement(e){
    _gaq.push(['_trackEvent', this.tagName, e.type, this.currentSrc]);
}

/**
 * Triggers the HTML5 Video Tracking on the page
 */
function _trackMedia(tag) {
    var vs = document.getElementsByTagName(tag);
    for(var i=0; i<vs.length; i++){
        bindEvent(vs[i], 'play', _trackMediaElement);
        bindEvent(vs[i], 'ended', _trackMediaElement);
        bindEvent(vs[i], 'pause', _trackMediaElement);
    }
}

function _trackVideo(){
    _trackMedia('video');
}

function _trackAudio(){
    _trackMedia('audio');
}

