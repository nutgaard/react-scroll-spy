import React, { PropTypes as PT, Component } from 'react';
import scroller from './scroller';
import CtxTypes from './ctx-types';

class AnchorElement extends Component {
    componentDidMount() {
        scroller.register(this.props.id, this);
    }

    componentWillUnmount() {
        scroller.unregister(this.props.id);
    }

    getConfig() {
        return {
            offset: this.props.offset,
            events: {},
            animate: true
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
    children: PT.element
};

export default AnchorElement;
