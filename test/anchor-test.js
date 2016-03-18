/* eslint-env node, mocha */
/* eslint-disable newline-per-chained-call */
import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import anchor from './../src/anchor';
import { AnchorButton } from './../src/index';

describe('Anchor', () => {
    it('should call prepareToScroll onClick', () => {
        const prepareToScroll = spy();

        anchor.__Rewire__('scroller', { prepareToScroll });
        const wrapper = mount(<AnchorButton><h1>Test</h1></AnchorButton>);
        wrapper.find('button').simulate('click');
        anchor.__ResetDependency__('scroller');

        expect(prepareToScroll.calledOnce).to.equal(true);
    });
});
