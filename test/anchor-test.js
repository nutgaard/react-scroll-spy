/* eslint-env node, mocha */
/* eslint-disable newline-per-chained-call */
import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import anchor from './../src/anchor';
import { AnchorButton } from './../src/index';

Enzyme.configure({ adapter: new Adapter() });

describe('Anchor', () => {
    it('should call prepareToScroll onClick', () => {
        const prepareToScroll = spy();
        const registerLink = spy();

        anchor.__Rewire__('scroller', { prepareToScroll, registerLink });
        const wrapper = mount(<AnchorButton href="test"><h1>Test</h1></AnchorButton>);
        wrapper.find('button').simulate('click');
        anchor.__ResetDependency__('scroller');

        expect(prepareToScroll.calledOnce).to.equal(true);
    });
});
