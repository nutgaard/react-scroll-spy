/* eslint-env node, mocha */
/* eslint-disable newline-per-chained-call */
import { expect } from 'chai';
import AnimateScroll from './../src/animate-scroll';

describe('AnimateScroll', () => {
    it('should have static defaults', () => {
        expect(AnimateScroll.easing).to.not.equal(null);
        expect(AnimateScroll.cancelEvents).to.not.equal(null);
    });
});
