import React, { PropTypes } from 'react';
import * as styles from './GoogleAds.css';

const GoogleAds = props => (<div id={props.adId} className={styles.adsBlock} />);

GoogleAds.defaultProps = {
    adId: '',
};

GoogleAds.propTypes = {
    adId: PropTypes.string,
};

export default GoogleAds;
