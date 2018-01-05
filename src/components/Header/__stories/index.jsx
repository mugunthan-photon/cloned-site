import React from 'react';
import Header from '../../Header/Header';

const stories = [{
    name: 'Header',
    story: () => (
        <div>
            <Header mountOnServer />
        </div>
    ) }];

export default stories;
