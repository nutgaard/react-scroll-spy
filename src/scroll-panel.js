import React from 'react';
import CtxTypes from './ctx-types';

class ScrollPanel extends React.Component {
    getChildContext() {
        const { offset, events, animate } = this.props;
        return {
            offset, events, animate, container: this.refs.container
        }
    }

    render() {
        return (
            <div className="scroll-panel" ref="container"></div>
        );
    }
}

ScrollPanel.childContextTypes = {
    config: CtxTypes.config
};

export default ScrollPanel;