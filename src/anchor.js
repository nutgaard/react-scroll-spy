import React, { PropTypes as PT } from 'react';
import CtxTypes from './ctx-types';
import scroller from './scroller';

function handleClick(onClick, href, event) {
    event.stopPropagation();
    event.preventDefault();

    if (onClick) {
        onClick(event);
    }

    scroller.prepareToScroll(href);
}

function anchor(Component) {
    class AnchorComponent extends React.Component {
        componentDidMount() {
            scroller.registerLink(this.props.href, this);
        }

        componentWillUnmount() {
            scroller.unregisterLink(this.props.href);
        }

        render() {
            const { onClick, ...props } = this.props; // eslint-disable-line no-use-before-define
            const restProps = {
                ...props,
                onClick: handleClick.bind(this, onClick, props.href)
            };
            return <Component {...restProps} />;
        }
    }

    AnchorComponent.displayName = `AnchorComponent(${Component.displayName || Component.name})`;
    AnchorComponent.propTypes = {
        href: CtxTypes.href,
        onClick: PT.func
    };

    AnchorComponent.contextTypes = {
        scrollspy: CtxTypes.config
    };

    return AnchorComponent;
}

export default anchor;
