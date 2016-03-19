export function throttle(fn, threshhold = 250, scope = this) {
    let last;
    let deferTimer;
    return function thottledFunction(...args) {
        const context = scope || this;

        const now = +new Date;
        if (last && now < last + threshhold) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(() => {
                last = now;
                fn.apply(context, args);
            }, threshhold);
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
}


export function filterUndefined(obj) {
    return Object.keys(obj)
        .map((key) => ({ key, value: obj[key] }))
        .filter(({ value }) => !!value)
        .reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {});
}
