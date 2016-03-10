import React from 'react';
import { AnchorElement } from './../src/index';

function Content({id, header}) {
    return (
        <AnchorElement id={id} offset={16*4}>
            <article className="big-section">
                <h1>{header}</h1>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores dolorum id, minus natus placeat
                quae quis. Cumque exercitationem explicabo facilis impedit magni non numquam placeat sapiente sequi sit
                ullam, voluptates?
            </article>
        </AnchorElement>
    );
}

export default Content;
