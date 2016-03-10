import React, { Component } from 'react';

import Menu from './menu';
import MainContent from './main-content';

class Application extends Component {
    render() {
        return (
            <div>
                <Menu />
                <MainContent />
            </div>
        );
    }
}

export default Application;
