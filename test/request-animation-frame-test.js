/* eslint-env node, mocha */
/* eslint-disable newline-per-chained-call */
import { expect } from 'chai';
import requestAnimationFrame from './../src/request-animation-frame';

describe('requestAnimationFrame', () => {
    it('should return requestAnimationFrame or a polyfill', () => {
        expect(requestAnimationFrame).to.not.equal(undefined);
    });
});
