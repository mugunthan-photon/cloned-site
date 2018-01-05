import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames/bind';
import Columns from './Columns';
import * as IrisComponents from '../../iris/components/index';
import * as styles from './IrisParser.css';
import * as IrisActions from '../../actions/IrisAction';

const cx = classNames.bind(styles);

/**
 * Iris Praser is responsible for hitting the Layout aggregator IRIS Api and render the components
 * @params It is expectd to pass the props from microsite since it is used to construct the API with params
 */

export class IrisParser extends Component {
    static defaultProps = {
        irisData: {},
        context: {},
        tag: 'div',
        params: {},
        actions: {},
    };

    /* eslint-disable react/sort-comp */
    rootLevelObjectName = 'content';
    rootNode = [];
    colSpanName = 'rowSpan';
    tag: 'span';

    static propTypes = {
        irisData: PropTypes.objectOf(PropTypes.object),
        tag: PropTypes.string,
        context: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        params: PropTypes.objectOf(PropTypes.object),
        actions: PropTypes.objectOf(PropTypes.function),
    };

    componentWillMount() {
        if (isEmpty(this.props.irisData)) {
            this.props.actions.getIrisTemplateData(this.props.params);
        }
    }

    parseOneRow(rowData) {
        let retOneRow = null;
        const Tag = this.props.tag;
        if (rowData.template) {
            const cssClassName = cx(`${this.colSpanName}-${rowData.template}`);

            retOneRow = (
                <Tag className={cssClassName}>
                    {this.oneRowGen(rowData)}
                </Tag>
        );
        } else {
            console.warn('IRIS: template ( row based css class ) is missing in response');
        }
        return retOneRow;
    }

    oneRowGen(rowData) {
        const fullColumn = [];
        /* istanbul ignore else */
        if (rowData.columns && rowData.columns.length) {
            rowData.columns.forEach((oneCol) => {
                fullColumn.push(this.oneColumn(oneCol));
            }, this);
        } else {
            console.warn('IRIS: columns not found in response');
        }
        return fullColumn;
    }

    oneColumn(oneCol) {
        let colDom = null;
        if (oneCol.colSpan) {
            colDom = (<Columns className={oneCol.colSpan}>
                {this.renderComponents(oneCol)}
            </Columns>);
        } else {
            console.warn('IRIS: colspan is missing in response');
        }
        return colDom;
    }

    renderComponents(oneCol) {
        const colDom = [];
        /* istanbul ignore else */
        if (oneCol.components && oneCol.components.length) {
            oneCol.components.forEach((components) => {
                colDom.push(this.oneComponents(components));
            });
        } else {
            console.warn('IRIS: components is missing in response');
        }
        return colDom;
    }

    oneComponents(oneComponent) {
        let CustomComponent = null;
        let componentDom = null;
        try {
            /* istanbul ignore else */
            if (oneComponent.componentType) {
                CustomComponent = IrisComponents[oneComponent.componentType];
                componentDom = this.customComponentRender(CustomComponent, oneComponent);
            }
        } catch (e) {
            console.warn('IRIS: component name missmatch, check Iris Response');
        }
        return componentDom;
    }

    customComponentRender(CustomComponent, componentData) {
        const rndKeyNum = Math.floor(Math.random(1, 100000) * 1000000);
         /* istanbul ignore next */
        const componentContent = componentData.content || {};
        const rndKeyString = `comp_${componentData.componentType}_${rndKeyNum.toString()}`;
         /* istanbul ignore next */
        const deviceType = this.props.context.deviceType ? this.props.context.deviceType : {};
         /* istanbul ignore next */
        const preferences = this.props.context.preferences ? this.props.context.preferences : {};
         /* istanbul ignore next */
        const featureFlags = this.props.context.featureFlags ? this.props.context.featureFlags : {};
        return (
            <CustomComponent
                key={rndKeyString}
                automationId={componentData.componentType}
                deviceType={deviceType}
                preferences={preferences}
                featureFlags={featureFlags}
                irisData={componentContent}
            />
        );
    }

    parseRow() {
        this.rootNode = this.props.irisData[this.rootLevelObjectName];
        const fullNode = [];
        if (this.rootNode && this.rootNode.rows && this.rootNode.rows.length) {
            this.rootNode.rows.forEach((oneRowData) => {
                fullNode.push(this.parseOneRow(oneRowData));
            }, this);
        } else {
            console.warn('IRIS: rows not found in response');
        }
        return fullNode;
    }

    render() {
        return (<div>
            {this.parseRow()}
        </div>);
    }
}

const mapStateToProps = ({ context, irisData }) => ({
    context,
    irisData,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(IrisActions, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(IrisParser);
