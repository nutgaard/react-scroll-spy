import React, { Component } from 'react';
import { AnchorLink } from './../src/index';

console.log('AnchorLink', AnchorLink);

class Menu extends Component {
    render() {
        return (
            <nav>
                <ul>
                    <li><AnchorLink href="item1">Item 1</AnchorLink></li>
                    <li><AnchorLink href="item2">Item 2</AnchorLink></li>
                    <li><AnchorLink href="item3">Item 3</AnchorLink></li>
                    <li><AnchorLink href="item4">Item 4</AnchorLink></li>
                    <li><AnchorLink href="item5">Item 5</AnchorLink></li>
                </ul>
            </nav>
        );
    }
}

export default Menu;
