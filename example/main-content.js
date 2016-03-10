import React from 'react';
import Content from './content';

function MainContent() {
    return (
        <main>
            <Content id="item1" header="Item 1" />
            <Content id="item2" header="Item 2" />
            <Content id="item3" header="Item 3" />
            <Content id="item4" header="Item 4" />
            <Content id="item5" header="Item 5" />
        </main>
    );
}

export default MainContent;
