import React, { PureComponent, PropTypes } from 'react';
import { Helmet } from 'react-helmet';

/**
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ
 *
 * @export
 * @class PreRender
 * @extends {PureComponent}
 */

export default class PreRender extends PureComponent {

    static defaultProps = {
        url: '',
    }

    static propTypes = {
        url: PropTypes.string,
    }

    constructor() {
        super();
        this.initialRender = false;
    }

    shouldComponentUpdate() {
        return !this.initialRender;
    }

    render() {
        if (!__SERVER__ && this.props.url) {
            this.initialRender = true;
            // Prerendering a url only once to prefetch the static assets and not to consume
            // the user's bandwidth unnecessarily upon change of the urls
            return (
                <Helmet>
                    <link rel="prefetch" href={location.origin + this.props.url} />
                </Helmet>
            );
        }
        return null;
    }
}
