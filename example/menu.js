import React, { Component } from 'react';
import { AnchorLink } from './../src/index';

console.log('AnchorLink', AnchorLink);

class Menu extends Component {
    render() {
        return (
            <nav>
                <ul>
                    <AnchorLink href="item1">Item 1</AnchorLink>
                    <AnchorLink href="item2">Item 2</AnchorLink>
                    <AnchorLink href="item3">Item 3</AnchorLink>
                    <AnchorLink href="item4">Item 4</AnchorLink>
                    <AnchorLink href="item5">Item 5</AnchorLink>
                </ul>
            </nav>
        );
    }
}

export default Menu;
