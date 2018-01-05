import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import List from 'yoda-core-components/lib/components/List/List';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import * as styles from './YodaHelpSection.css';


const cx = classNames.bind(styles);
/**
 *HelpSection component to standardize the styling and html structure of HelpSection on footer
 * This imports config file which has the data for helpList
 * This component also consumes List and Icon from core component
 * */

export default class HelpSection extends Component {
    static defaultProps = {
        iconTheme: '',
        description: '',
        pretext: '',
        contactLink: '',
        wrapperTheme: '',
        titleClass: '',
        listWrapperTheme: '',
        listClass: '',
        footerHelpSection: {},
    }

    static propTypes = {
        iconTheme: PropTypes.string,
        description: PropTypes.string,
        pretext: PropTypes.string,
        contactLink: PropTypes.string,
        wrapperTheme: PropTypes.string,
       // titleClass: PropTypes.string,
        listWrapperTheme: PropTypes.string,
        listClass: '',
        footerHelpSection: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    }

    render() {
        const helpSectionRenderer = (dataItem, index) => {
            const helpSection = 'helpSection';
            const ariaLabelId = helpSection + dataItem.id;
            return (
                <div className={styles.helpListBlock}>
                    <div id={`help-link-${dataItem.id}-block`}>
                        <a
                            href={dataItem.linkPath}
                            className={cx('helpLink', (dataItem.linkPath ? '' : 'inactive'))}
                            aria-labelledby={ariaLabelId}
                            target={dataItem.newTab}
                            id={`help-link-${dataItem.id}`}
                            data-automation-id={`help-link-${dataItem.id}`}
                        >
                            <span className={cx('helpIcon', this.props.iconTheme)}>
                                <Icon automationId={`help-icon-${index}`} iconType="svg" classNames="fa" width="26" height="26" viewBox="0 0 26 26" name={dataItem.name} PathClassName={styles.helpIconColor} />
                            </span>
                            <span id={ariaLabelId} className={cx('helpDescription', this.props.description)} key={dataItem.id}>
                                <span className={cx(this.props.pretext)}>{dataItem.text}</span>
                                <strong data-automation-id={`help-text-${index}`} className={cx('helpDescStatus', this.props.contactLink)}>
                                    {dataItem.textStrong}
                                </strong>
                            </span>
                        </a>
                    </div>
                </div>
            );
        };

        // Entire React DOM
        return (
            <div className={cx('helpSection', this.props.wrapperTheme)}>
                <div data-automation-id="need-help-container" className={cx('containerWidth')}>
                    <div className={cx('helpSectionList', this.props.listWrapperTheme)}>
                        <List
                            datasource={this.props.footerHelpSection} childRenderer={helpSectionRenderer}
                            itemStyleClass={cx('helpListItem', this.props.listClass)}
                            listBodyClass={cx('helpListBody')}
                            automationId="help-list"
                            spacing="None"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
