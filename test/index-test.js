/* eslint-env node, mocha */
/* eslint-disable newline-per-chained-call */
import { expect } from 'chai';
import Index from './../src/index';

describe('Index', () => {
    it('should export AnchorButton and AnchorLink', () => {
        expect(Index.AnchorButton).to.not.equal(null);
        expect(Index.AnchorLink).to.not.equal(null);
        expect(Index.AnchorElement).to.not.equal(null);
        expect(Index.anchor).to.not.equal(null);
        expect(Index.scroller).to.not.equal(null);
    });
});
