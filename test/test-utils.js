export function omit(obj, keys = []) {
    return Object
        .keys(obj)
        .filter((key) => !keys.includes(key))
        .reduce((acc, key) => {
            // eslint-disable-next-line no-param-reassign
            acc[key] = obj[key];
            return acc;
        }, {});
}

export function later(fn, timeout = 0) {
    return setTimeout(fn, timeout);
}
