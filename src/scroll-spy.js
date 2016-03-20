/**
 * The class responsible for keeping track of scrolling
 */
import ReactDOM from 'react-dom';
import { throttle } from './utils';
import Scroller from './scroller';

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
        const scrollOffset = scrolledIn.scrollTop;

        const elements = this._linksRegister
            .map((link) => ({ link, href: link.props.href }))
            .map(({ link, href }) => ({
                link, href,
                panelComp: Scroller.getElementPanel(href),
                panel: ReactDOM.findDOMNode(Scroller.getElementPanel(href))
            }))
            .filter(({ panel }) => scrolledIn.contains(panel))
            .map(({ link, panelComp, panel }) => link._handleScroll(scrollOffset, scrolledIn, { panel, panelComp }));


        const newActive = elements.find(({ isInside, hasActive }) => isInside && !hasActive);
        const oldActive = elements.find(({ isInside, hasActive }) => !isInside && hasActive);

        if (newActive) {
            newActive.link.classList.add(newActive.activeClass);

            if (oldActive) {
                oldActive.link.classList.remove(oldActive.activeClass);
            }
        }
    }
}

export default new ScrollSpy();
