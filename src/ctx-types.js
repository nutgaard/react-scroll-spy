/**
 * Proptypes used for the context
 */
import { PropTypes as PT } from 'prop-types';

export const contextTypes = {
    offset: PT.number,
    events: PT.shape({
        start: PT.func,
        end: PT.func
    }),
    animate: PT.bool,
    container: PT.object
};

export const defaultConfig = {
    offset: 0,
    events: {},
    animate: true,
    container: undefined
};

export default {
    contextTypes,
    defaultConfig
};
