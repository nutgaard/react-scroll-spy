/* eslint-env node, mocha */
/* eslint-disable newline-per-chained-call */
import { expect } from 'chai';
import Scroller from './../src/scroller';

describe('Scroller', () => {
    it('should export a object', () => {
        expect(typeof Scroller).to.not.equal('function');
    });
});
