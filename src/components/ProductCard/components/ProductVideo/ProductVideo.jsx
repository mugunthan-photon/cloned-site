import React, { PropTypes } from 'react';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import classNames from 'classnames/bind';

import VideoPlayer from '../../../VideoPlayer/VideoPlayer';
import * as styles from './ProductVideo.css';

const cx = classNames.bind(styles);

const ProductVideo = (props) => {
    const { deviceType: { isDesktop }, videoId, playVideo, index, cardType, setParentState, renderVideo } = props;

    const showVideo = () => {
        setParentState({
            playVideo: true,
        });
    };

    /* istanbul ignore next */
    const onVideoEnd = () => {
        setParentState({
            playVideo: false,
        });
    };

    if (isDesktop && videoId) {
        if (renderVideo) {
            return playVideo ?
                <div className={cx('videoWrapper', cardType)}>
                    <VideoPlayer videoId={videoId} index={index} onEnd={onVideoEnd}/>
                </div> : null;
        }

        return (
            <div className={cx('video')} data-automation-id="product-video">
                <button onClick={() => showVideo()}>
                    <Icon iconType="svg" automationId="video-automation-product" width="48px" height="48px" viewBox="0 0 48 48" name="video" key="video"/>
                </button>
            </div>
        );
    }

    return null;
};

ProductVideo.defaultProps = {
    deviceType: {},
    videoId: '',
    index: 0,
    playVideo: false,
    cardType: '',
    renderVideo: false,
};

ProductVideo.propTypes = {
    deviceType: PropTypes.oneOfType([PropTypes.object]),
    videoId: PropTypes.string,
    index: PropTypes.number,
    playVideo: PropTypes.bool,
    cardType: PropTypes.string,
    setParentState: PropTypes.func.isRequired,
    renderVideo: PropTypes.bool,
};

export default ProductVideo;
