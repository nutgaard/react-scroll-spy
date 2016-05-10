/**
 * Utility functions
 */
import requestAnimationFrame from './request-animation-frame';

export function filterUndefined(obj) {
    return Object.keys(obj)
        .map((key) => ({ key, value: obj[key] }))
        .filter(({ value }) => typeof value !== 'undefined')
        .reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {});
}

export function throttle(callback) {
    let requestedFrame;
    let args;
    let self;

    function callbackCheck() {
        if (args || self) {
            requestedFrame = requestAnimationFrame(callbackCheck);
            callback.apply(self, args);
        } else {
            requestedFrame = null;
        }
        args = self = null;
    }

    return function throttleProxy(...a) {
        // eslint-disable-next-line no-unused-expressions
        requestedFrame || (requestedFrame = requestAnimationFrame(callbackCheck));
        args = a;
        self = this;
    };
}

export function getScrollYPosition(container) {
    if (container === document.body) {
        const supportPageOffset = window.pageXOffset !== undefined;
        const isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');
        if (supportPageOffset) {
            return window.pageYOffset;
        }
        return isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
    }
    return container.scrollTop;
}
