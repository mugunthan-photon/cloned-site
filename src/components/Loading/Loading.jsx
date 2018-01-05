import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'yoda-core-components/lib/components/Loader/Loader';


export class Loading extends Component {

    static propTypes = {
        isLoading: PropTypes.bool,
    };

    static defaultProps = {
        isLoading: false,
    };

    shouldComponentUpdate(nextProps) {
        return (this.props.isLoading !== nextProps.isLoading);
    }

    render() {
        return this.props.isLoading ? <Loader keepOverlay automationId="test-automation-loader-1" /> : null;
    }
}

const mapStateToProps = state => ({
    isLoading: state.isLoading,
});

export default connect(mapStateToProps)(Loading);
