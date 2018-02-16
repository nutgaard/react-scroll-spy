/**
 * Exports a helper function which wraps clickable elements, hijacking onClick and passing it to the scroller
 */
import React from 'react';
import { PropTypes as PT } from 'prop-types';
import ReactDOM from 'react-dom';
import scroller from './scroller';
import ScrollSpy from './scroll-spy';
import { omit } from './utils';

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
        constructor(props) {
            super(props);

            this._handleScroll = this._handleScroll.bind(this);
        }

        componentDidMount() {
            ScrollSpy.registerLink(this);
        }

        componentWillUnmount() {
            ScrollSpy.unregisterLink(this);
        }

        _handleScroll(scrollOffset, container, element) {
            // eslint-disable-next-line react/no-find-dom-node
            const link = ReactDOM.findDOMNode(this);
            const cords = element.panel.getBoundingClientRect();
            const containeRect = container.getBoundingClientRect();

            let elemTopBound = 0;
            if (container === document.body) {
                elemTopBound = cords.top - containeRect.top - 64;
            } else {
                elemTopBound = (cords.top + scrollOffset) - containeRect.top - 64;
            }
            const elemBottomBound = elemTopBound + cords.height;

            return {
                ...element,
                link,
                activeClass: this.props.activeClass,
                hasActive: link.classList.contains(this.props.activeClass),
                isInside: {
                    elementTop: elemTopBound,
                    elementBottom: elemBottomBound,
                    element: cords,
                    container: containeRect
                }
            };
        }

        render() {
            const { onClick, ...props } = this.props;
            const restProps = {
                ...omit(props, ['activeClass']),
                onClick: (event) => handleClick(onClick, props.href, event)
            };
            return <Component {...restProps} />;
        }
    }

    AnchorComponent.displayName = `AnchorComponent(${Component.displayName || Component.name})`;
    AnchorComponent.propTypes = {
        href: PT.string.isRequired,
        onClick: PT.func,
        activeClass: PT.string
    };
    AnchorComponent.defaultProps = {
        activeClass: 'scroll-spy-active'
    };

    return AnchorComponent;
}

export default anchor;
