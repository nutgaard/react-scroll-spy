/**
 * requestAnimationFrame provider, with polyfill
 */
function native() {
    if (window) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame;
    }
    return undefined;
}

function polyfill() {
    return (callback, element, delay) => {
        setTimeout(callback, delay || (1000 / 60), new Date().getTime());
    };
}

function createRequestAnimationFrame() {
    return native() || polyfill();
}

export default createRequestAnimationFrame();
