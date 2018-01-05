import React, { PropTypes, Component } from 'react';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import classNames from 'classnames/bind';
import * as styles from './SlidePanel.css';

const cx = classNames.bind(styles);

class SlidePanel extends Component {
    static propTypes = {
        isOpenPanel: PropTypes.bool,
        onClosePanel: PropTypes.func.isRequired,
        panelTitle: PropTypes.string,
        children: React.PropTypes.element,
    };

    static defaultProps = {
        isOpenPanel: false,
        panelTitle: '',
        children: '',
    };

    constructor() {
        super();
        this.closePanel = this.closePanel.bind(this);
    }

    componentDidMount() {
        if (this.props.isOpenPanel) {
            document.body.classList.add('slide-panel-open');
        } else {
            document.body.classList.remove('slide-panel-open');
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.isOpenPanel) {
            document.body.classList.add('slide-panel-open');
        } else {
            document.body.classList.remove('slide-panel-open');
        }
    }

    componentWillUnmount() {
        document.body.classList.remove('slide-panel-open');
    }

    getStyleToogleWrapper() {
        const toogleWrapper = this.props.isOpenPanel ?
            `${styles.toggleWrapper} ${styles.activeToggleWrapper}` : styles.toggleWrapper;
        return toogleWrapper;
    }

    getStyleTooglePanel() {
        const tooglePanel = this.props.isOpenPanel ?
            `${styles.detailsPanel} ${styles.activeDetailsPanel}` : styles.detailsPanel;
        return tooglePanel;
    }


    closePanel(e) {
        e.preventDefault();
        this.props.onClosePanel(e);
    }

    render() {
        return (
            <div className={styles.cover}>
                <button className={this.getStyleToogleWrapper()} onClick={this.closePanel} />
                <div data-automation-id="at-active-panel" className={this.getStyleTooglePanel()}>
                    <div className={styles.panelHeader}>
                        <a href="" className={styles.backIcon} onClick={this.closePanel} data-automation-id="at-slide-back-button">
                            <Icon iconType="svg" width="32px" height="32px" viewBox="0 0 48 48" name="icon-arrow-left" />
                        </a>
                        <button data-automation-id="at-panel-title" className={styles.panelTitle} onClick={this.closePanel} tabIndex={-42}>{this.props.panelTitle}</button>
                    </div>
                    <div data-automation-id="at-panel-content" className={cx('panelContent')}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default SlidePanel;
