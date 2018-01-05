import React from 'react';
import LocationFinder from '../../LocationFinder/LocationFinder';

const getStoresList = () => {
    console.log('Get stores !!');
};

const stories = [{
    name: 'Location Finder',
    story: () => (
        <div>
            <LocationFinder
                onFormSubmit={getStoresList}
            ><strong>7</strong> stores within <strong>25mi</strong> of <strong>75920</strong></LocationFinder>
        </div>
      ),
}];

export default stories;
