/**
 * Class for executing and maintaining a smooth scroll-animation using TweenFunctions for easing
 */
import requestAnimationFrame from './request-animation-frame';
import TweenFunctions from 'tween-functions';
import { getScrollYPosition } from './utils';

class AnimateScroll {
    constructor(options) {
        this._setup(options);
    }

    _setup(opt) {
        const options = opt || this._options;

        this._start = null;
        this._cancel = false;
        this._duration = options.duration || 500;
        this._container = options.container || document.body || document.documentElement;
        this._startPosition = getScrollYPosition(this._container);
        this._options = options;
        this._id = null;
        this._component = null;
    }

    _setupListeners() {
        this._listener = this.cancel.bind(this);
        AnimateScroll.cancelEvent.forEach((e) => this._container.addEventListener(e, this._listener));
    }

    _teardownListeners() {
        AnimateScroll.cancelEvent.forEach((e) => this._container.removeEventListener(e, this._listener));
    }

    start(id, component, targetPosition) {
        this._targetPosition = targetPosition;
        this._id = id;
        this._component = component;
        this._setupListeners();
        
        requestAnimationFrame(this.animate.bind(this));
    }

    animate(time) {
        if (this._start === null) {
            this._start = time;
            if (this._options.events && this._options.events.start) {
                this._options.events.start(this._id, this._component);
            }
        }
        if (this._cancel) {
            return;
        }

        const deltaT = time - this._start;

        let currentPosition = this._targetPosition;
        if (deltaT < this._duration) {
            currentPosition = AnimateScroll.easing(deltaT, this._startPosition, this._targetPosition, this._duration);
        }

        if (this._container === document.body) {
            window.scrollTo(0, currentPosition);
        } else {
            this._container.scrollTop = currentPosition;
        }

        if (deltaT < this._duration) {
            requestAnimationFrame(this.animate.bind(this));
        } else {
            this._teardownListeners();
            if (this._options.events && this._options.events.end) {
                this._options.events.end(this._id, this._component);
            }

        }
    }

    cancel() {
        this._cancel = true;
    }
}

AnimateScroll.easing = TweenFunctions.easeInOutQuad;
AnimateScroll.cancelEvent = ['mousedown', 'mousewheel', 'touchmove', 'keydown'];

export default AnimateScroll;
