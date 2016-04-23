/* eslint-env node, mocha */
/* eslint-disable newline-per-chained-call */
import React from 'react';
import ReactDOM from 'react-dom';
import AnchorElement from './../src/anchor-element';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import { expect } from 'chai';
import { Scroller } from './../src/scroller';

// Utils
const size = (instance) => Object.keys(instance._elementPanelRegister).length;
const createAnchorElement = () => {
    const wrapper = mount(<AnchorElement><h1>Test</h1></AnchorElement>);
    spy(wrapper.node, 'getConfig');

    return wrapper.node;
};

// So we can work on a clean instance for each test
let scroller = null;
beforeEach(() => {
    scroller = new Scroller();
});
afterEach(() => {
    scroller = null;
});


describe('Scroller', () => {
    describe('register/unregister functions', () => {
        it('should export a object', () => {
            expect(typeof scroller).to.equal('object'); // Instance
            expect(typeof Scroller).to.equal('function'); // Class definition
        });

        it('should be initially empty', () => {
            expect(size(scroller)).to.equal(0);
        });

        it('should not keep duplicate ids', () => {
            scroller.registerElementPanel('id1', {});
            scroller.registerElementPanel('id1', {});
            scroller.registerElementPanel('id1', {});

            expect(size(scroller)).to.equal(1);
        });

        it('should delete based on id', () => {
            scroller.registerElementPanel('id1', {});
            scroller.registerElementPanel('id2', {});
            scroller.registerElementPanel('id1', {});
            scroller.registerElementPanel('id2', {});

            expect(size(scroller)).to.equal(2);

            scroller.unregisterElementPanel('id2');

            expect(size(scroller)).to.equal(1);
        });

        it('should retain the last registered element', () => {
            scroller.registerElementPanel('id1', 'first');
            scroller.registerElementPanel('id1', 'second');

            const element = scroller.getElementPanel('id1');

            expect(element).to.equal('second');
        });
    });

    describe('prepareToScroll', () => {
        it('should throw Error if element was not found', () => {
            const error = 'Could not find any component with id: dummy';
            expect(() => scroller.prepareToScroll('dummy')).to.throw(error)
        });

        it('should fetch config from the component', () => {
            const element = createAnchorElement();
            const component = ReactDOM.findDOMNode(element);
            spy(component, 'getBoundingClientRect');

            scroller.registerElementPanel('id', element);

            scroller.prepareToScroll('id');

            expect(element.getConfig.calledOnce).to.equal(true);
            expect(component.getBoundingClientRect.calledOnce).to.equal(true);
        })
    });
});
