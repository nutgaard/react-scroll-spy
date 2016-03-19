import React from 'react';
import CtxTypes from './ctx-types';

class ScrollPanel extends React.Component {
    getChildContext() {
        const { offset, events, animate } = this.props;

        //safe this, so it can be updated when component is mounted
        this.ctx = {
            config: {
                offset, events, animate
            }
        };

        return this.ctx;
    }

    componentDidMount() {
        this.ctx.config.container = this.refs.container;
    }

    render() {
        return React.createElement(
            this.props.tag,
            { className: this.props.className, ref: 'container' },
            this.props.children
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

export default ScrollPanel;