import ReactDOM from 'react-dom';
import AnimateScroll from './animate-scroll';
import { throttle } from './utils';

class Scroller {
    constructor() {
        this._elementPanelRegister = {};
        this._linkRegister = {};
        this._scrollPanelRegister = [];
        window.addEventListener('scroll', throttle(() => this._handleScroll({ target: document.body }), 100));
        this._handleScroll({ target: document.body });
    }

    registerElementPanel(id, component) {
        this._elementPanelRegister[id] = component;
    }

    registerLink(id, component) {
        this._linkRegister[id] = component;
    }

    registerScrollpanel(component) {
        if (!this._scrollPanelRegister.includes(component)) {
            const listener = throttle(this._handleScroll.bind(this), 100);
            component.addEventListener('scroll', listener);
            this._handleScroll({ target: component });
            this._scrollPanelRegister.push({ component, listener });
        }
    }

    unregisterElementPanel(id) {
        delete this._elementPanelRegister[id];
    }

    unregisterLink(id) {
        delete this._linkRegister[id];
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

        const elements = Object.keys(this._elementPanelRegister)
            .map((key) => ({ key, element: ReactDOM.findDOMNode(this._elementPanelRegister[key]) }))
            .filter(({ element }) => scrolledIn.contains(element))
            .map(this._handleElementScroll.bind(this, scrollOffset, scrolledIn));

        const newActive = elements.find(({ isInside, hasActive }) => isInside && !hasActive);
        const oldActive = elements.find(({ isInside, hasActive }) => !isInside && hasActive);

        if (newActive) {
            newActive.link.classList.add('active');

            if (oldActive) {
                oldActive.link.classList.remove('active');
            }
        }
    }

    _handleElementScroll(scrollOffset, container, { key, element }) {
        const cords = element.getBoundingClientRect();
        const containeRect = container.getBoundingClientRect();
        const link = ReactDOM.findDOMNode(this._linkRegister[key]);

        let elemTopBound = 0;
        if (container === document.body) {
            elemTopBound = cords.top - containeRect.top - 64;
        } else {
            elemTopBound = cords.top + scrollOffset - containeRect.top - 64;
        }
        const elemBottomBound = elemTopBound + cords.height;

        return {
            key,
            link,
            hasActive: link.classList.contains('active'),
            isInside: (scrollOffset >= elemTopBound && scrollOffset <= elemBottomBound)
        };
    }

    prepareToScroll(id) {
        const element = this._elementPanelRegister[id];

        if (!element) {
            throw new Error(`Could not find any component with id: ${id}`);
        }

        const config = element.getConfig();
        const component = ReactDOM.findDOMNode(element);

        const container = config.container || document.body;

        const componentCoords = component.getBoundingClientRect();
        const containerCoords = container.getBoundingClientRect();

        let scrollOffset = 0;
        if (container === document.body) {
            scrollOffset = componentCoords.top - containerCoords.top;
        } else {
            scrollOffset = componentCoords.top - containerCoords.top + container.scrollTop;
        }

        if (!config.animate) {
            container.scrollLeft = 0;
            container.scrollTop = scrollOffset - config.offset;

            if (config.events.end) {
                config.events.end(id, component);
            }
        } else {
            const animation = new AnimateScroll(config);
            animation.start(id, component, scrollOffset - config.offset);
        }
    }
}

export default new Scroller();

