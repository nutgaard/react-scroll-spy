/**
 * Exports a helper function which wraps clickable elements, hijacking onClick and passing it to the scroller
 */
import React, { PropTypes as PT } from 'react';
import ReactDOM from 'react-dom';
import scroller from './scroller';
import ScrollSpy from './scroll-spy';

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

        _handleScroll(scrollOffset, container, { panel, panelComp }) {
            const link = ReactDOM.findDOMNode(this);
            const cords = panel.getBoundingClientRect();
            const containeRect = container.getBoundingClientRect();

            let elemTopBound = 0;
            if (container === document.body) {
                elemTopBound = cords.top - containeRect.top - 64;
            } else {
                elemTopBound = cords.top + scrollOffset - containeRect.top - 64;
            }
            const elemBottomBound = elemTopBound + cords.height;

            return {
                link,
                hasActive: link.classList.contains('active'),
                isInside: panelComp.props.isInside(scrollOffset, elemTopBound, elemBottomBound, cords, containeRect)
            };
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
