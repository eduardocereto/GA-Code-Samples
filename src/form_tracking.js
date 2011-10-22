/**
 * GA Code Samples
 *
 * Form Tracking Plugin
 *
 * Copyright 2011, Cardinal Path and Direct Performance
 * Licensed under the MIT license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 */

(function(){


/**
 * Cross Browser DomReady function.
 *
 * Inspired by: http://dean.edwards.name/weblog/2006/06/again/#comment367184
 *
 * @param {function(Event)} callback DOMReady callback.
 * @return {boolean} Ignore return value.
 */
function _DOMReady(callback) {
    var cb = function() {
        if (arguments.callee.done) return;
        arguments.callee.done = true;
        callback.apply(this, arguments);
    };
    if (/^(interactive|complete)/.test(document.readyState)) return cb();
    bindEvent(document, 'DOMContentLoaded', cb, false);
    bindEvent(window, 'load', cb, false);
};

/**
 * Returns true if the element is found in the Array, false otherwise.
 *
 * @param {Array} obj Array to search at.
 * @param {object} item Item to search form.
 * @return {boolean} true if contains.
 */
function inArray(obj, item) {
    if (obj && obj.length) {
        for (var i = 0; i < obj.length; i++) {
            if (obj[i] === item) {
                return true;
            }
        }
    }
    return false;
}

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
 * Enable form tracking for 1 form
 *
 * @this {GasHelper} The Ga Helper object
 * @param {HTMLFormElement} form The form element to be tagged.
 * @param {boolean=} opt_live if we should use live binding. Defaults to false.
 * @return {boolean} false if the form has no elements.
 */
function track_form(form, opt_live) {
    function tag_element(e) {
        var el = e.target;
        var el_name = el.name || el.id || el.type || el.nodeName;
        var action_name = e.type;
        var form_name = form.name || form.id || undefined;

        form_name = form_name ? ' (' + form_name + ')' : '';

        _gas.push(['_trackEvent',
            'Form Tracking', //category
            'form' + form_name, //action
            el_name + ' (' + action_name + ')' //label
        ]);
    }


    if (opt_live) {
        bindEvent(window, 'click', function(e) {
            try {
                var el = e.target;
                if (e.type == 'click' &&
                  inArray(['button', 'submit', 'image', 'reset'],
                    el.type.toLowerCase()
                  )
                ) {

                    tag_element(e);
                }
            }catch (e) {} //Ignore errors here.
        });
        bindEvent(document.body, 'change', function(e) {
            try {
                var el = e.target;
                if (e.type == 'change' &&
                  inArray(['input', 'select', 'textarea', 'hidden'],
                    el.nodeName.toLowerCase()
                  )
                ) {

                    tag_element(e);
                }
            }catch (e) {} //Ignore errors here.
        });
        //TODO: Track the submit on live binding
    }else {
        var i, el;
        if (!form.elements || !form.elements.length) {
            return false;
        }
        for (i = 0; i < form.elements.length; i++) {
            el = form.elements[i];
            if (inArray(['button', 'submit', 'image', 'reset'], el.type)) {
                //Button
                bindEvent(el, 'click', tag_element);
            }
            else {
                //Text field
                bindEvent(el, 'change', tag_element);
            }
        }
        bindEvent(form, 'submit', tag_element);
    }
}

function _trackForms (opt_live) {
    _DOMReady(function() {
        var forms = document.getElementsByTagName('form');
        for (var i = 0; i < forms.length; i++) {
            try {
                track_form(forms[i], opt_live);
            }catch (e) {}
            if (opt_live) break;
        }
        return false;
    });
}

window['_trackForms'] = _trackForms;

})();

