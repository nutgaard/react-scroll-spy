/**
 * A component to use when you want scrolling other places than the global document
 */
import React from 'react';
import { PropTypes as PT } from 'prop-types';
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
        const { tag, children, ...elemProps } = this.props;
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
    offset: CtxTypes.contextTypes.offset,
    events: CtxTypes.contextTypes.events,
    animate: CtxTypes.contextTypes.animate,
    tag: PT.string,
    children: PT.arrayOf(PT.element),
    className: PT.string
};

export default ScrollPanel;
