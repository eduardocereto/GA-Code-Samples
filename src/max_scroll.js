/**
 * GA Code Samples
 *
 * Max-Scroll Tracking Plugin
 *
 * Copyright 2011, Cardinal Path and Direct Performance
 * Licensed under the MIT license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 */

(function(){

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
 * Get current browser viewpane heigtht
 *
 * @return {number} height.
 */
function _get_window_height() {
    return window.innerHeight || document.documentElement.clientHeight ||
        document.body.clientHeight || 0;
}

/**
 * Get current absolute window scroll position
 *
 * @return {number} YScroll.
 */
function _get_window_Yscroll() {
    return window.pageYOffset || document.body.scrollTop ||
        document.documentElement.scrollTop || 0;
}

/**
 * Get current absolute document height
 *
 * @return {number} Current document height.
 */
function _get_doc_height() {
    return Math.max(
        document.body.scrollHeight || 0, document.documentElement.scrollHeight || 0,
        document.body.offsetHeight || 0, document.documentElement.offsetHeight || 0,
        document.body.clientHeight || 0, document.documentElement.clientHeight || 0
    );
}


/**
 * Get current vertical scroll percentage
 *
 * @return {number} Current vertical scroll percentage.
 */
function _get_scroll_percentage() {
    return (
        (_get_window_Yscroll() + _get_window_height()) / _get_doc_height()
    ) * 100;
}

var _t = null;
var _max_scroll = 0;
function _update_scroll_percentage(now) {
    if (_t) {
        clearTimeout(_t);
    }
    if (now === true) {
        _max_scroll = Math.max(_get_scroll_percentage(), _max_scroll);
        return;
    }
    _t = setTimeout(function() {
        _max_scroll = Math.max(_get_scroll_percentage(), _max_scroll);
    }, 400);
}

function _sendMaxScroll() {
    _update_scroll_percentage(true);
    _max_scroll = Math.floor(_max_scroll);
    if (_max_scroll <= 0 || _max_scroll > 100) return;
    var bucket = (_max_scroll > 10 ? 1 : 0) * (
        Math.floor((_max_scroll - 1) / 10) * 10 + 1
    );
    bucket = String(bucket) + '-' +
        String(Math.ceil(_max_scroll / 10) * 10);

    _gaq.push(['_trackEvent',
        'Max Scroll',
        document.location.pathname + document.location.search,
        bucket,
        Math.floor(_max_scroll),
        true // non-interactive
    ]);
}

function _trackMaxScroll() {
    bindEvent(window, 'scroll', _update_scroll_percentage);
    bindEvent(window, 'beforeunload', _sendMaxScroll);
}

window['_trackMaxScroll'] = _trackMaxScroll;

})();

