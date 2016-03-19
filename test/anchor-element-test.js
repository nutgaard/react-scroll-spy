/* eslint-env node, mocha */
/* eslint-disable newline-per-chained-call */
import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import AnchorElement from './../src/anchor-element';

describe('AnchorElement', () => {
    it('should registerElementPanel with scroller on mount', () => {
        const registerElementPanel = spy();
        const unregisterElementPanel = spy();

        AnchorElement.__Rewire__('scroller', { registerElementPanel, unregisterElementPanel });
        mount(<AnchorElement><h1>Test</h1></AnchorElement>);
        AnchorElement.__ResetDependency__('scroller');

        expect(registerElementPanel.calledOnce).to.equal(true);
        expect(unregisterElementPanel.calledOnce).to.equal(false);
    });
});
