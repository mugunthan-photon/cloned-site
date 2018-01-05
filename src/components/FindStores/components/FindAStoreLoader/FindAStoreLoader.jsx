import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import className from 'classnames/bind';
import Loader from 'yoda-core-components/lib/components/Loader/Loader';
import styles from './FindAStoreLoader.css';

const cx = className.bind(styles);

export const FindAStoreLoader = (props) => {
    const { displayLoader } = props;
    if (!displayLoader) {
        return null;
    }
    return (
        <Loader
            keepOverlay
            loaderClass={cx('loaderClass')}
            automationId="test-automation-loader-1" />
    );
};

FindAStoreLoader.defaultProps = {
    displayLoader: false,
};

FindAStoreLoader.propTypes = {
    displayLoader: PropTypes.bool,
};

const mapStateToProps = store => ({
    displayLoader: store.findAStorePageInfo && store.findAStorePageInfo.showLoader,
});

export default connect(mapStateToProps)(FindAStoreLoader);
