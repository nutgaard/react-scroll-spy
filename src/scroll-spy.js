/* eslint-env browser  */
/**
 * The class responsible for keeping track of scrolling
 */
import ReactDOM from 'react-dom';
import { throttle, getScrollYPosition } from './utils';
import Scroller from './scroller'; // eslint-disable-line import/no-named-as-default

class ScrollSpy {
    constructor() {
        this._linksRegister = [];
        this._scrollPanelRegister = [];
        window.addEventListener('scroll', throttle(() =>
            this._handleScroll({ target: document.body }))
        );
        this._handleScroll({ target: document.body });
    }

    registerLink(component) {
        if (!this._linksRegister.includes(component)) {
            this._linksRegister.push(component);
        }
    }

    registerScrollpanel(component) {
        if (!this._scrollPanelRegister.includes(component)) {
            const listener = throttle(this._handleScroll.bind(this));
            component.addEventListener('scroll', listener);
            this._handleScroll({ target: component });
            this._scrollPanelRegister.push({ component, listener });
        }
    }

    unregisterLink(component) {
        const index = this._linksRegister.indexOf(component);
        if (index >= 0) {
            this._linksRegister.splice(index, 1);
        }
    }

    unregisterScrollpanel(component) {
        const index = this._scrollPanelRegister.findIndex((el) => el.component === component);
        if (index >= 0) {
            const el = this._scrollPanelRegister[index];
            el.component.removeEventListener('scroll', el.listener);

            this._scrollPanelRegister.splice(index, 1);
        }
    }

    _handleScroll(e) {
        const scrolledIn = e.target;
        const scrollOffset = getScrollYPosition(scrolledIn);

        let elements = this._linksRegister
            .map((link) => ({ link, href: link.props.href }))
            .map(({ link, href }) => ({
                link,
                href,
                panelComp: Scroller.getElementPanel(href),
                // eslint-disable-next-line react/no-find-dom-node
                panel: ReactDOM.findDOMNode(Scroller.getElementPanel(href))
            }))
            .filter(({ panel }) => scrolledIn.contains(panel))
            .map((elem) => elem.link._handleScroll(scrollOffset, scrolledIn, elem));

        elements = ScrollSpy.consolidateActiveState(scrollOffset, elements);

        const newActive = elements.filter(({ isInside, hasActive }) => isInside && !hasActive);
        const oldActive = elements.filter(({ isInside, hasActive }) => !isInside && hasActive);

        newActive.forEach(({ link, activeClass }) => link.classList.add(activeClass));
        oldActive.forEach(({ link, activeClass }) => link.classList.remove(activeClass));
    }
}

ScrollSpy.consolidateActiveState = (scrollOffset, elements) => elements
    .map((elementConfig) => {
        const { panelComp, isInside: { elementTop, elementBottom, element, container } } = elementConfig;

        return {
            ...elementConfig,
            isInside: panelComp.props.isInside(scrollOffset, elementTop, elementBottom, element, container)
        };
    });

export default new ScrollSpy();
