import React from 'react';
import Error from '../ErrorPage';

const stories = [{
    name: '404',
    story: () => (
        <Error templateType="404"/>
    ),
}];

export default stories;
