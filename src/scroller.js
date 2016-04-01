/**
 * Responsible for calculating the new scroll positions
 */
import ReactDOM from 'react-dom';
import AnimateScroll from './animate-scroll';

class Scroller {
    constructor() {
        this._elementPanelRegister = {};
    }

    registerElementPanel(id, component) {
        this._elementPanelRegister[id] = component;
    }

    unregisterElementPanel(id) {
        delete this._elementPanelRegister[id];
    }

    getElementPanel(id) {
        return this._elementPanelRegister[id];
    }

    prepareToScroll(id) {
        const element = this._elementPanelRegister[id];

        if (!element) {
            throw new Error(`Could not find any component with id: ${id}`);
        }

        const config = element.getConfig();
        const component = ReactDOM.findDOMNode(element);
        if (config.events && config.events.start) {
            config.events.start(id, component);
        }

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

            if (config.events && config.events.end) {
                config.events.end(id, component);
            }
        } else {
            const animation = new AnimateScroll(config);
            animation.start(id, component, scrollOffset - config.offset);
        }
    }
}

export default new Scroller();

