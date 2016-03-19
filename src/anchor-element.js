import React, { PropTypes as PT, Component } from 'react';
import scroller from './scroller';
import CtxTypes from './ctx-types';

class AnchorElement extends Component {
    componentDidMount() {
        scroller.registerElementPanel(this.props.id, this);
    }

    componentWillUnmount() {
        scroller.unregisterElementPanel(this.props.id);
    }

    getConfig() {
        const containerConfig = this.context.config || CtxTypes.defaultConfig;

        return {
            ...containerConfig,
            ...this.props
        };
    }

    render() {
        return React.Children.only(this.props.children);
    }
}

AnchorElement.defaultProps = {
    offset: 0
};

AnchorElement.propTypes = {
    id: CtxTypes.id,
    offset: PT.number,
    children: PT.element.isRequired
};

AnchorElement.contextTypes = {
    config: CtxTypes.config
};

export default AnchorElement;
