/**
 * Exports a helper function which wraps clickable elements, hijacking onClick and passing it to the scroller
 */
import React, { PropTypes as PT } from 'react';
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
        href: PT.string.isRequired,
        onClick: PT.func
    };

    return AnchorComponent;
}

export default anchor;
