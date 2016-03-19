import { PropTypes as PT } from 'react';

export const config = PT.object;

export const href = PT.string.isRequired;
export const id = PT.string.isRequired;

export const defaultConfig = {
    offset: 0,
    events: {},
    animate: true,
    container: undefined
};

export default {
    config,
    defaultConfig,
    href,
    id
};
