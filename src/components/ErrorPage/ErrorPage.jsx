import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import List from 'yoda-core-components/lib/components/List/List';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import Button from 'yoda-core-components/lib/components/Button/Button';
import * as styles from './ErrorPage.css';
import data from './ErrorTemplateData';
import * as errorPageActions from '../../actions/ErrorPageAction';
import ErrorPageReducer from '../../reducers/ErrorPageReducer';

const cx = classNames.bind(styles);

/**
 * ErrorPages component to standardize the styling and html structure of any ErrorPage component on the page
 * This supports "ErroPage type of 404 and 500" based on the prop value of template Type
 * */

class Error extends Component {
    static propTypes = {
        templateType: PropTypes.string.isRequired,
    }

    static defaultProps = {
        templateType: '500',
    }

    static helpfulListRenderer(item) {
        return (<div className={cx('listItem')}><Icon
            className={cx('icon')}
            iconType="svg"
            width="40px"
            height="40px"
            viewBox="0 0 40 40"
            name={item.icon}
        />{item.name === 'Back to Previous Page' ? <Button
            className={cx('links')}
            buttonType="Text"
            size="Md"
            onClick={() => {
                window.history.back();
            }}>{item.name}
        </Button> : <a className={cx('links')} href={item.link}>{item.name}</a>}</div>);
    }

    static assistanceListRenderer(item) {
        return (<div className={cx('listItem')}><Icon
            className={cx('svg-icon')}
            iconType="svg"
            width="40px"
            height="40px"
            viewBox="0 0 40 40"
            name={item.icon}
        />
            <div className={cx('detailsWrapper')}>
                <div className={cx('details')}>{item.name}</div>
                {item.name === 'Give us a call' ?
                    <a href={`tel:${item.details}`} className={cx('details-information')}>{item.details}</a> :
                    <div className={cx('details-information')}>{item.details}</div>}</div>
        </div>);
    }

    static render500Template(templateType) {
        return (<div>
            <p className={cx('listHeader')}>{data[templateType].detailsData}</p>
            <Button
                type="button"
                automationId="at-error-link"
                rel="noopener noreferrer"
                onClick={() => {
                    window.location.reload();
                }}
                className={cx('refreshButton')}
            >{'Refresh Page'}
            </Button>
        </div>);
    }

    constructor() {
        super();
        this.renderTemplate = this.renderTemplate.bind(this);
    }

    loadLinksData() {
        const templateType = this.props.templateType;
        switch (templateType) {
            case '500':
                return data[templateType].leftData;
            case '404':
                return data[templateType].leftData;
            default:
                return data[templateType].leftData;
        }
    }

    loadAssistanceData() {
        const templateType = this.props.templateType;
        switch (templateType) {
            case '500':
                return data[templateType].rightData;
            case '404':
                return data[templateType].rightData;
            default:
                return data[templateType].rightData;
        }
    }

    renderTemplate() {
        const templateType = this.props.templateType;
        switch (templateType) {
            case '500':
                return Error.render500Template(templateType);
            case '404':
                return (<div><p className={cx('listHeader', 'listHeaderOne')}>{data[templateType].detailsData}</p>
                    <p className={cx('listHeader')}>{data[templateType].informationData}</p></div>);
            default:
                return Error.render500Template(templateType);
        }
    }

    render() {
        const classNameForLinks = this.props.templateType === '500' ? cx('listContainer', 'links-wrapper-500') : cx('listContainer', 'links-wrapper');
        const templateType = [404, 500].includes(+this.props.templateType) ? this.props.templateType : '500';
        return (
            <div className={cx('parentWrapper')}>
                <h3 className={cx('errorTitle')}>{data[templateType].errorInformation}</h3>
                {this.renderTemplate()}
                <div className={cx('linkContainer')}>
                    <div className={classNameForLinks}>
                        <h3 className={cx('linksTitle')}>{data[templateType].linkstitle}</h3>
                        <List
                            datasource={this.loadLinksData()}
                            spacing="None"
                            direction="Vertical"
                            itemSpacing="None"
                            listBodyClass={cx('list-class')}
                            listStyleClass={cx('list-ul-class')}
                            itemStyleClass={cx('list-item-class')}
                            childRenderer={Error.helpfulListRenderer}
                            automationId="at-error-helpfullinks-renderer"/>
                    </div>
                    <div className={cx('listContainer', 'assistance-wrapper')}>
                        <h3 className={cx('linksTitle', 'linksTitle-assistance')}>{data[templateType].assistancetitle}</h3>
                        <List
                            datasource={this.loadAssistanceData()}
                            spacing="None"
                            direction="Vertical"
                            itemSpacing="None"
                            listBodyClass={cx('list-class')}
                            listStyleClass={cx('list-ul-class')}
                            itemStyleClass={cx('list-item-class')}
                            childRenderer={Error.assistanceListRenderer}
                            automationId="at-error-assistancelinks-renderer"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Error;
export { errorPageActions, ErrorPageReducer };
