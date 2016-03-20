/**
 * Proptypes used for the context
 */
import { PropTypes as PT } from 'react';

export const contextTypes = {
    offset: PT.number,
    events: PT.object,
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
