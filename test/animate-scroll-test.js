/* eslint-env node, mocha */
/* eslint-disable newline-per-chained-call */
import { expect } from 'chai';
import { spy } from 'sinon';
import AnimateScroll from './../src/animate-scroll';

const defaultConfig = (done, fn = () => {}) => ({
    events: {
        end: () => {
            fn();
            done();
        }
    },
    duration: 10 // Just to make the tests run faster
});

describe('AnimateScroll', () => {
    it('should have static defaults', () => {
        expect(AnimateScroll.easing).to.not.equal(null);
        expect(AnimateScroll.cancelEvents).to.not.equal(null);
    });

    describe('initializing and setup', () => {
        let addListener = undefined;
        let removeListener = undefined;

        beforeEach(() => {
            // JSDOM doesnt add attributes to document.body
            addListener = spy();
            removeListener = spy();
            document.body.scrollTop = 0;
            document.body.addEventListener = addListener;
            document.body.removeEventListener = removeListener;
        });

        afterEach(() => {
            addListener = null;
            removeListener = null;
            delete document.body.scrollTop;
            delete document.body.addEventListener;
            delete document.body.removeEventListener;
        });

        it('should have reasonable defaults', () => {
            const scroller = new AnimateScroll(defaultConfig);

            expect(scroller._start).to.equal(null);
            expect(scroller._cancel).to.equal(false);
            expect(scroller._startPosition).to.equal(0);
            expect(scroller._duration()).to.equal(500);
            expect(scroller._container).to.equal(document.body);
            expect(scroller._options).to.deep.equal(defaultConfig);
            expect(scroller._id).to.equal(null);
            expect(scroller._component).to.equal(null);
        });

        it('should create listeners when animation starts', (done) => {
            const scroller = new AnimateScroll(defaultConfig(done));
            scroller.start();

            expect(addListener.callCount).to.equal(AnimateScroll.cancelEvent.length);
        });

        it('should teardown listeners when animation is finished', (done) => {
            const config = defaultConfig(done, () => {
                expect(addListener.callCount).to.equal(AnimateScroll.cancelEvent.length);
                expect(removeListener.callCount).to.equal(AnimateScroll.cancelEvent.length);
            });
            const scroller = new AnimateScroll(config);
            scroller.start();
        });
    });

    it('should request multiple animation frames and tweens', (done) => {
        // animationsframes and tweens are called in same animation cycle
        const originalTween = AnimateScroll.easing;
        const easingSpy = spy();
        AnimateScroll.easing = easingSpy;
        const config = defaultConfig(done, () => {
            AnimateScroll.easing = originalTween;
            expect(easingSpy.callCount).to.be.above(1);
        });
        // Needs a greater duration to get more animationsFrames
        const scroller = new AnimateScroll({ ...config, duration: 40 });
        scroller.start();
    });

    it('should stop animation on cancel', () => {
        // animationsframes and tweens are called in same animation cycle
        const originalTween = AnimateScroll.easing;
        const easingSpy = spy();
        AnimateScroll.easing = easingSpy;

        const scroller = new AnimateScroll({ });
        scroller.start();
        scroller.cancel();

        expect(easingSpy.notCalled).to.equal(true);
        AnimateScroll.easing = originalTween;
    });
});
