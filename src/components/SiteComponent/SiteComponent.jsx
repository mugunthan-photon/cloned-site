import React, { PropTypes } from 'react';

/**
 *
 */
class SiteComponent extends React.Component {

    /**
     * Supported React properties
     * @type {Object}
     */
    static propTypes = {
        mountOnServer: PropTypes.bool.isRequired,
    }

    /** @properties {Default set up} [description] */
    static defaultProps = {
        mountOnServer: false,
    };

    /**
     * This will managed by Appshell. This methods called on server side only if mountOnServer server is set to true
     *
     */
    componentWillMount = () => {
        const { mountOnServer } = this.props;
        const args = {
            isServer: __SERVER__,
        };

        if (__SERVER__) {
            if (mountOnServer) {
                this.hydrate(args);
            }
        } else {
            this.hydrate(args);
        }
    }

    /**
     * This method is implemented to allow component re-rendering efficiency sake
     */
    shouldComponentUpdate() {
        return true;
    }

    /**
     * Important method to override. This is called everytime componentWillMount is fired.
     * This will be called on server side if mountOnServer flag is set to true
     * This method will be called on client-side only if mountOnServer is set to false
     * update if you don't want to rebind the
     */
    hydrate() { // eslint-disable-line class-methods-use-this
        console.warn('Implement hydrate');
    }

}

export default SiteComponent;
