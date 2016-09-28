/* eslint-env node, mocha */
/* eslint-disable newline-per-chained-call */
import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import AnchorElement from './../src/anchor-element';
import { defaultConfig } from './../src/ctx-types';
import { omit } from './test-utils';

describe('AnchorElement', () => {
    it('should register with scroller on mount', () => {
        const registerElementPanel = spy();
        const unregisterElementPanel = spy();

        AnchorElement.__Rewire__('scroller', { registerElementPanel, unregisterElementPanel });
        mount(<AnchorElement id="test"><h1>Test</h1></AnchorElement>);
        AnchorElement.__ResetDependency__('scroller');

        expect(registerElementPanel.calledOnce).to.equal(true);
        expect(unregisterElementPanel.calledOnce).to.equal(false);
    });

    it('should unregister with scroller on unmount', () => {
        const registerElementPanel = spy();
        const unregisterElementPanel = spy();

        AnchorElement.__Rewire__('scroller', { registerElementPanel, unregisterElementPanel });
        const wrapper = mount(<AnchorElement id="test"><h1>Test</h1></AnchorElement>);
        wrapper.unmount();
        AnchorElement.__ResetDependency__('scroller');

        expect(registerElementPanel.calledOnce).to.equal(true);
        expect(unregisterElementPanel.calledOnce).to.equal(true);
    });

    describe('getConfig', () => {
        it('should return defaults if no props are provided', () => {
            const wrapper = mount(<AnchorElement id="test"><h1>Test</h1></AnchorElement>);
            const config = wrapper.node.getConfig();

            expect(omit(config, ['children', 'isInside', 'id'])).to.deep.equal(defaultConfig);
        });

        it('should inherit from context', () => {
            const ctx = { offset: 10, events: { test: 0 }, animate: false, container: {} };
            const wrapper = mount(<AnchorElement id="test"><h1>Test</h1></AnchorElement>, { context: ctx });
            const config = wrapper.node.getConfig();

            expect(omit(config, ['children', 'isInside', 'id'])).to.not.deep.equal(defaultConfig);
            expect(omit(config, ['children', 'isInside', 'id'])).to.deep.equal(ctx);
        });

        it('should use props if present', () => {
            const ctx = { offset: 10, events: { test: 0 }, animate: false, container: {} };
            const ctxWithProps = { ...ctx, offset: 20, animate: true };
            const wrapper = mount(<AnchorElement id="test" offset={20} animate><h1>Test</h1></AnchorElement>, { context: ctx });

            const config = wrapper.node.getConfig();

            expect(omit(config, ['children', 'isInside', 'id'])).to.not.deep.equal(defaultConfig);
            expect(omit(config, ['children', 'isInside', 'id'])).to.not.deep.equal(ctx);
            expect(omit(config, ['children', 'isInside', 'id'])).to.deep.equal(ctxWithProps);
        });
    });

    describe('isInside', () => {
        it('should check top-bound', () => {
            expect(AnchorElement.defaultProps.isInside(0, 0, 100)).to.be.equal(true);
            expect(AnchorElement.defaultProps.isInside(0, 1, 100)).to.be.equal(false);
        });
        it('should check bottom-bound', () => {
            expect(AnchorElement.defaultProps.isInside(100, 0, 100)).to.be.equal(true);
            expect(AnchorElement.defaultProps.isInside(101, 0, 100)).to.be.equal(false);
        });
        it('should return true if it contains offset', () => {
            expect(AnchorElement.defaultProps.isInside(50, 0, 100)).to.be.equal(true);
        });
        it('should return false if it does notcontains offset', () => {
            expect(AnchorElement.defaultProps.isInside(10, 50, 100)).to.be.equal(false);
            expect(AnchorElement.defaultProps.isInside(110, 50, 100)).to.be.equal(false);
        });
    });
});
