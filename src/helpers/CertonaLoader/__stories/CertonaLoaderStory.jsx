import React, { Component } from 'react';
import CertonaLoader from '../CertonaLoader';

class CertonaLoaderStory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            placeholderId: new Date().getTime(),
        };
    }

    componentWillMount = () => {
        const onSuccess = (response) => {
            document.getElementById(this.state.placeholderId).innerHTML = JSON.stringify(response);
        };

        const onError = () => {
            document.getElementById(this.state.placeholderId).innerHTML = 'Script loaded failed!!!';
        };

        CertonaLoader.load({
            pageType: 'HOME',
        },
            onSuccess,
            onError,
        );
    }

    render() {
        return (
            <div>
                <div id={this.state.placeholderId}>Loading certona....</div>
            </div>
        );
    }
}

export default CertonaLoaderStory;
