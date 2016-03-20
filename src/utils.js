/**
 * Utility functions
 */
import requestAnimationFrame from './request-animation-frame';

export function filterUndefined(obj) {
    return Object.keys(obj)
        .map((key) => ({ key, value: obj[key] }))
        .filter(({ value }) => !!value)
        .reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {});
}

export function throttle(callback) {
    let requestedFrame;
    let args;
    let self;

    function callbackCheck() {
        if (args && self) {
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
