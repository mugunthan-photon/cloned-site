import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames/bind';
import Loader from 'yoda-core-components/lib/components/Loader/Loader';
import ScriptLoader from 'yoda-core-components/lib/helpers/ScriptLoader/ScriptLoader';
import * as styles from './VideoPlayer.css';

const cx = classNames.bind(styles);
const brightcoveCredentials = {
    brightcoveAccNum: 1232842441001,
    url: '//players.brightcove.net/1232842441001/default_default/index.min.js',
};

export default class VideoPlayer extends PureComponent {

    static defaultProps = {
        videoId: '',
        index: 0,
        onEnd: () => {},
    };

    static propTypes = {
        videoId: PropTypes.oneOfType([PropTypes.string]),
        index: PropTypes.oneOfType([PropTypes.bool]),
        onEnd: PropTypes.oneOfType([PropTypes.func]),
    };

    constructor() {
        super();
        this.state = {
            videoStarted: false,
        };
    }

    componentWillMount() {
        /* istanbul ignore next */
        if (!window.videojs) {
            ScriptLoader.load({
                src: brightcoveCredentials.url,
                async: true,
                defer: false,
                onSuccess: this.onVideoScriptLoad.bind(this),
            });
        }
    }

    componentDidMount() {
        this.onVideoScriptLoad();
    }

    onVideoScriptLoad = () => {
        /* istanbul ignore next */
        if (window.videojs && this.videoNode) {
            // "this" reference won't work inside the callback function, hence taking the reference here
            const onVideoEnd = this.props.onEnd;
            const playVideo = this.playVideo;
            try {
                // Instantiate player - This is necessary for the brightcove script to parse the dynamically added video tags
                window.bc(this.videoNode);
            } catch (e) {
                // Error
            }

            // Setup the player
            window.videojs(this.videoNode).ready(function onReady() {
                const player = this; // Player reference

                // This callback will be triggered once the video has played completely
                player.on('ended', () => {
                    onVideoEnd();
                });

                // This callback will be triggered once the video content preloaded and ready to play
                player.on('canplay', () => {
                    playVideo();
                    player.play();
                });

                // Sometimes the error is loaded from cache for the same videoId. This time error event won't be triggered
                if (player.error_) {
                    playVideo();
                    setTimeout(() => {
                        // Showing the error to user for sometime
                        onVideoEnd();
                    }, 2000);
                }

                // This callback will be triggered if error has occured while loading/playing the video
                player.on('error', () => {
                    playVideo();
                    setTimeout(() => {
                        // Showing the error to user for sometime
                        onVideoEnd();
                    }, 2000);
                });
            });
        }
    }

    playVideo = () => {
        // Disable the loader once video has started playing
        this.setState({
            videoStarted: true,
        });
    }

    render() {
        const { videoId, index } = this.props;
        const { videoStarted } = this.state;

        return (
            <div className={cx(styles.videoContainer)}>
                {!videoStarted && <Loader
                    automationId="test-automation-loader-1"
                    loaderClass={styles.loader} />}
                <video
                    ref={(node) => { this.videoNode = node; }}
                    className={cx(styles.videoPlay, 'vjs-big-play-centered')}
                    data-embed="default"
                    data-account={brightcoveCredentials.brightcoveAccNum}
                    data-player="default"
                    data-video-id={videoId}
                    data-automation-id={`prod-video-${index}`}
                    controls />
            </div>
        );
    }
}
