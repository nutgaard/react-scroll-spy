/* eslint-env node, mocha */
/* eslint-disable newline-per-chained-call */
import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import AnchorElement from './../src/anchor-element';

describe('AnchorElement', () => {
    it('should register with scroller on mount', () => {
        const register = spy();
        const unregister = spy();

        AnchorElement.__Rewire__('scroller', { register, unregister });
        mount(<AnchorElement><h1>Test</h1></AnchorElement>);
        AnchorElement.__ResetDependency__('scroller');

        expect(register.calledOnce).to.equal(true);
        expect(unregister.calledOnce).to.equal(false);
    });
});
