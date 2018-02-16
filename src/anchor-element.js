/**
 * Provides the anchor-panel which can be linked to by `anchor`-augmented componented
 */
import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
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

// eslint does not understand that all props are passed on through `getConfig`, hence disabling the rule
AnchorElement.propTypes = {
    id: PT.string.isRequired,
    offset: PT.number, // eslint-disable-line react/no-unused-prop-types
    children: PT.element.isRequired,
    isInside: PT.func, // eslint-disable-line react/no-unused-prop-types
    duration: PT.oneOfType([PT.number, PT.func]) // eslint-disable-line react/no-unused-prop-types
};

AnchorElement.contextTypes = CtxTypes.contextTypes;

export default AnchorElement;
