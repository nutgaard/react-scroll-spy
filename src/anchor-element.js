/**
 * Provides the anchor-panel which can be linked to by `anchor`-augmented componented
 */
import React, { PropTypes as PT, Component } from 'react';
import scroller from './scroller';
import CtxTypes from './ctx-types';
import { filterUndefined } from './utils';

class AnchorElement extends Component {
    componentDidMount() {
        scroller.registerElementPanel(this.props.id, this);
    }

    componentWillUnmount() {
        scroller.unregisterElementPanel(this.props.id);
    }

    getConfig() {
        const containerConfig = { ...CtxTypes.defaultConfig, ...filterUndefined(this.context) };

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
    isInside: (scrollOffset, elemTopBound, elemBottomBound) =>
        (scrollOffset >= elemTopBound && scrollOffset <= elemBottomBound)
};

AnchorElement.propTypes = {
    id: PT.string.isRequired,
    offset: PT.number,
    children: PT.element.isRequired,
    isInside: PT.func,
    duration: PT.oneOfType([PT.number, PT.func])
};

AnchorElement.contextTypes = CtxTypes.contextTypes;

export default AnchorElement;
