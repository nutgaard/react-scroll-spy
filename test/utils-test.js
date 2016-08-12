/* eslint-env node, browser, mocha */
/* eslint-disable newline-per-chained-call */
import { expect } from 'chai';
import { spy, mock } from 'sinon';
import { filterUndefined, throttle, omit as prodOmit, __RewireAPI__ as RewireAPI } from './../src/utils';
import { omit, later } from './test-utils';

describe('Utils', () => {
    describe('filterUndefined', () => {
        it('should remove all keys with undefined values', () => {
            const obj = { a: 'keep', b: 'undefined', c: undefined };
            const filtered = filterUndefined(obj);

            expect(omit(obj, ['c'])).to.deep.equal(filtered);
        });

        it('should remove all keys with null values', () => {
            const obj = { a: 'keep', b: 'undefined', c: null };
            const filtered = filterUndefined(obj);

            expect(obj).to.deep.equal(filtered);
        });

        it('should not remove keys with falsy values', () => {
            const obj = { a: 'keep', b: 'undefined', c: 0, d: false };
            const filtered = filterUndefined(obj);

            expect(obj).to.deep.equal(filtered);
        });
    });

    describe('throttle', () => {
        it('should return new function', () => {
            const fn = spy();
            const throttledFn = throttle(fn);

            expect(typeof throttledFn).to.equal('function');
        });

        it('should call fn with correct arguments', (done) => {
            RewireAPI.__Rewire__('requestAnimationFrame', (cb) => later(cb));
            const args = [6, 7, { a: 'value' }];
            const fn = mock();
            fn.once();
            fn.withArgs(...args);
            const throttledFn = throttle(fn);

            throttledFn(...args);

            // Need timeout here, because of throttle implementation
            later(() => {
                fn.verify();
                done();
            });
            RewireAPI.__ResetDependency__('requestAnimationFrame');
        });

        it('should throttle calls to fn', (done) => {
            RewireAPI.__Rewire__('requestAnimationFrame', (cb) => later(cb));
            const args = [6, 7, { a: 'value' }];
            const fn = mock();
            fn.twice();
            fn.withArgs(...args);
            const throttledFn = throttle(fn);

            throttledFn(...args);
            throttledFn(...args);
            throttledFn(...args);
            throttledFn(...args);

            later(() => throttledFn(...args), 10);

            later(() => {
                fn.verify();
                done();
            }, 30);

            RewireAPI.__ResetDependency__('requestAnimationFrame');
        });
    });

    describe('omit', () => {
        it('should not alter object if no exclusions are defined', () => {
            const obj = { a: 1, b: 2, c: 'test' };
            const result = prodOmit(obj);

            expect(result).to.deep.equal(obj);
        });

        it('should remove exclusions', () => {
            const obj = { a: 1, b: 2, c: 'test', d: 'one more' };
            const result = prodOmit(obj, ['c', 'd']);

            expect(result).to.deep.equal({ a: 1, b: 2 });
        });

        it('should exclusions not present in object', () => {
            const obj = { a: 1, b: 2, c: 'test', d: 'one more' };
            const result = prodOmit(obj, ['e', 'f']);

            expect(result).to.deep.equal(obj);
        });
    });
});
