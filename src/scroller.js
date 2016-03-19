import ReactDOM from 'react-dom';
import AnimateScroll from './animate-scroll';

class Scroller {
    constructor() {
        this._register = {};
    }

    register(id, component) {
        this._register[id] = component;
    }

    unregister(id) {
        delete this._register[id];
    }

    prepareToScroll(id) {
        const element = this._register[id];

        if (!element) {
            throw new Error(`Could not find any component with id: ${id}`);
        }

        const config = element.getConfig();
        const component = ReactDOM.findDOMNode(element);

        const container = config.container || document.body;

        const componentCoords = component.getBoundingClientRect();
        const containerCoords = container.getBoundingClientRect();
        const scrollOffset = container === document.body ? componentCoords.top - containerCoords.top : componentCoords.top - containerCoords.top + container.scrollTop;

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

