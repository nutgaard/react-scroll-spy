import { PropTypes as PT } from 'react';

export const config = PT.object;

export const href = PT.string.isRequired;
export const id = PT.string.isRequired;

export const defaultConfig = {
    offset: 0
};

export default {
    config,
    defaultConfig,
    href,
    id
};
