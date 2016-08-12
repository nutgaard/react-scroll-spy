/* eslint-env browser  */
/**
 * A component to use when you want scrolling other places than the global document
 */
import React, { PropTypes as PT } from 'react';
import CtxTypes from './ctx-types';
import ScrollSpy from './scroll-spy';
import { omit } from './utils';

class ScrollPanel extends React.Component {
    getChildContext() {
        const { offset, events, animate } = this.props;
        return {
            offset,
            events,
            animate,
            container: this.container || document.body
        };
    }

    componentDidMount() {
        ScrollSpy.registerScrollpanel(this.container);
        this.forceUpdate();
    }

    componentWillUnmount() {
        ScrollSpy.unregisterScrollpanel(this.container);
    }

    render() {
        const { tag, children, ...elemProps } = this.props; // eslint-disable-line no-use-before-define
        return React.createElement(
            tag,
            { ...omit(elemProps, ['events', 'animate']), ref: (container) => { this.container = container; } },
            children
        );
    }
}

ScrollPanel.defaultProps = {
    tag: 'div',
    className: 'scroll-panel',
    offset: 0,
    events: {},
    animate: true
};

ScrollPanel.childContextTypes = CtxTypes.contextTypes;
ScrollPanel.propTypes = {
    offset: PT.number,
    events: PT.object,
    animate: PT.bool,
    tag: PT.string,
    children: PT.arrayOf(PT.element),
    className: PT.string
};

export default ScrollPanel;
