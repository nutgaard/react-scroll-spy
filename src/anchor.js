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
    function AnchorComponent({ onClick, ...props }) {
        const restProps = {
            ...props,
            onClick: handleClick.bind(this, onClick, props.href)
        };

        return <Component {...restProps} />;
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
