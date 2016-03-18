/* eslint-env node, mocha */
/* eslint-disable newline-per-chained-call */
import { expect } from 'chai';
import CtxTypes from './../src/ctx-types';

describe('CtxTypes', () => {
    it('should have static defaults', () => {
        expect(CtxTypes.defaultConfig).to.not.equal(null);
        expect(CtxTypes.config).to.not.equal(null);
    });
});
