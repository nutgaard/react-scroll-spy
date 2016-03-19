import React, { PropTypes as PT } from 'react';
import CtxTypes from './ctx-types';
import Scroller from './scroller';

class ScrollPanel extends React.Component {
    getChildContext() {
        const { offset, events, animate } = this.props;

        // safe this, so it can be updated when component is mounted
        this.ctx = {
            config: {
                offset, events, animate
            }
        };

        return this.ctx;
    }

    componentDidMount() {
        this.ctx.config.container = this.refs.container;
        Scroller.registerScrollpanel(this.refs.container);
    }

    componentWillUnmount() {
        Scroller.unregisterScrollpanel(this.refs.container);
    }

    render() {
        const { tag, children, ...elemProps } = this.props; // eslint-disable-line no-use-before-define
        return React.createElement(
            tag,
            { ...elemProps, ref: 'container' },
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

ScrollPanel.childContextTypes = {
    config: CtxTypes.config
};

ScrollPanel.propTypes = {
    offset: PT.number,
    events: PT.array,
    animate: PT.bool,
    tag: PT.string,
    children: PT.element
};

export default ScrollPanel;
