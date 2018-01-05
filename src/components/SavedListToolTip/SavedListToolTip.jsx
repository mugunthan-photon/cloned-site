import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import classNames from 'classnames/bind';
// import { browserHistory } from 'react-router';
import LoadSVG from 'yoda-core-components/lib/helpers/LoadSVG/LoadSVG';
import Loader from 'yoda-core-components/lib/components/Loader/Loader';
import coreSprite from 'yoda-core-components/lib/assets/sprite.svg';
import Button from 'yoda-core-components/lib/components/Button/Button';
import RadioButton from 'yoda-core-components/lib/components/RadioButton/RadioButton';
import MessageBox from 'yoda-core-components/lib/components/MessageBox/MessageBox';
import ModalBox from 'yoda-core-components/lib/components/ModalBox/ModalBox';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import get from 'lodash/forEach';
import TokenProvider from '../../helpers/TokenProvider/TokenProvider';
import * as MTLactions from '../../actions/SavedListToolTip';
import * as AnalyticsAction from '../../actions/AnalyticsAction';
import * as styles from './SavedListToolTip.css';

const cx = classNames.bind(styles);
/*
    This Component is similar to Tooltip which is appeared when
    user clicks on save for later or add to list
    @Params to be passed which are required
    productId  : Id of the product to be saved or added [string]
    deviceType : Pass device type {isMobile: true/false}

    handleCreateNewList : func. to handle when user creates new list
    moveToListSuccess   : func. to handle after product is moved successfully
    addToListSuccess    : func. call back to know if item added succefully
    Optional @Params
    bodyTheme   : class to change view
    footerTheme : class to change foother view
    headerText  : Pass string to set header

*/
class ToolTip extends Component {
    static defaultProps = {
        headerText: 'Select List To Move',
        bodyTheme: '',
        footerTheme: '',
        closeToolTip: () => {},
        lists: { data: {} },
        MTLSavedLists: { listItems: {} },
        listId: '',
        origin: 'LD',
        pdpPayload: [],
        addItems: {},
        toolTipTheme: '',
        addToListSuccess: null,
        movedToList: {},
    }

    static propTypes = {
        headerText: PropTypes.string,
        bodyTheme: PropTypes.string,
        footerTheme: PropTypes.string,
        actions: PropTypes.objectOf.isRequired,
        lists: PropTypes.objectOf.isRequired,
        addItems: PropTypes.objectOf.isRequired,
        createList: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.func])).isRequired,
        moveToListSuccess: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.func])).isRequired,
        closeToolTip: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.func])),
        handleCreateNewList: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.func])).isRequired,
        listId: PropTypes.string,
        productId: PropTypes.string.isRequired,
        deviceType: PropTypes.objectOf.isRequired,
        pdpPayload: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.object])),
        origin: PropTypes.string,
        toolTipTheme: PropTypes.string,
        addToListSuccess: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.func])),
        // MyListActions: PropTypes.objectOf(PropTypes.object).isRequired,
        products: PropTypes.objectOf(PropTypes.object).isRequired,
        movedToList: PropTypes.objectOf(PropTypes.object).isRequired,
    }

    constructor() {
        super();
        const accountId = TokenProvider.get('ACCOUNT_ID');
        const token = TokenProvider.get('Access_Token');
        if (!TokenProvider.get('DP_USER_STATE')) {
            TokenProvider.set('DP_USER_STATE', '0');
        }
        const authStatus = parseInt(TokenProvider.get('DP_USER_STATE'), 10);
        this.state = {
            accountId,
            token,
            createNewList: false,
            showError: false,
            errorType: '',
            errorMessage: '',
            newlistName: '',
            newListId: '',
            processed: {},
            authStatus,
            successMsg: false,
            showLoader: false,
            MTLError: '',
        };

        this.closeToolTip = this.closeToolTip.bind(this);
        this.listItems = this.listItems.bind(this);
        this.createNewList = this.createNewList.bind(this);
        this.newListMove = this.newListMove.bind(this);
        this.moveToList = this.moveToList.bind(this);
        this.renderToolTip = this.renderToolTip.bind(this);
        this.signinNavigate = this.signinNavigate.bind(this);
        this.listHubNavigate = this.listHubNavigate.bind(this);
    }

    /* jshint ignore:start */
    /*eslint-disable*/
    /* istanbul ignore next */
    componentWillReceiveProps(nextProps) {
        const { createList, listId, productId, movedToList, pdpPayload, addItems, lists } = nextProps;

        if (createList && createList.status) {
            const status = createList.status;
            const newList = this.state.newlistName;
            if (status === 412) {
                this.setState({
                    showError: true,
                    errorMessage: createList.data.errorMessage,
                    errorType: 'error',
                });
            }

            if (status === 201 && !(this.state.processed.newList === newList)) {
                // let checkLists = {};
                // if ('data' in lists) {
                //     checkLists = lists.data;
                // }
                // let listCreated = false;

                /*
                    [NOTE]
                    Have to remove this logic once the createlist
                    API returs the list id in the response.
                    Right now the data in the reponse is empty, because
                    of which making an another getlist api call to know
                    the id of the newly created list.
                */
                let newListId = createList.data.id;
                this.setState({
                    newListId: createList.data.id,
                    processed: { newList },
                    targetListName: createList.data.name,
                });
                if (this.props.origin === 'LD'){
                    nextProps.actions.moveToList(
                        listId,
                        productId,
                        [{
                            op: 'replace',
                            path: '/listId',
                            value: newListId,
                        }],
                        this.state.accountId,
                        this.state.token,
                    );
                } else {
                    nextProps.actions.addToList(
                        newListId,
                        this.state.accountId,
                        this.state.token,
                        pdpPayload,
                    );
                }
            }
        }

        if (movedToList) {
            if (('status' in movedToList && movedToList.status === 204) || ('status' in movedToList && movedToList.status === 201)) {

                if(this.props.moveToListSuccess && this.props.origin==='LD'){
                    this.props.moveToListSuccess(this.state.targetListName);
                    this.setState({ MTLError: '' });
                    this.props.closeToolTip();
                } else {
                    this.setState({ successMsg: true, MTLError: '' });
                    if (this.props.addToListSuccess) {
                        this.props.addToListSuccess();
                    }
                }
            }
        }

        if (lists && lists.status) {
           this.setState({ showLoader: false });
           if (lists.status === 500) {
                this.setState({ MTLError: lists.statusText});
           } else if (lists.status !== 200) {
                this.setState({ MTLError: lists.data.errorMessage});
           }
        }

        if (('status' in movedToList && movedToList.status !== 204)) {
            if(!this.state.MTLError) {
                this.setState({ MTLError: movedToList.data.errorMessage});
            }
        }
    }

    componentDidMount() {
        this.setState({ showError: 'mounted', errorMessage: '',  MTLError: '' });
        const { actions } = this.props;
        if((!this.props.lists || !this.props.lists.data || !this.props.lists.data.listData) && this.props.origin === 'LD') {
            actions.getLists(this.state.accountId, this.state.token);
        } else if (this.props.origin !== 'LD') {
            actions.getLists(this.state.accountId, this.state.token);
        }
    }

    /*eslint-enable*/
    /* jshint ignore:end */
    closeToolTip() {
        this.props.closeToolTip();
    }

    moveToList(event) {
        const lId = this.props.listId;
        const pId = this.props.productId;
        const newListId = event.target.id;
        let targetListName = '';
        let totalLists = this.props.lists;
        if ('data' in totalLists) {
            totalLists = totalLists.data;
        } else {
            totalLists = { listData: [] };
        }
        for (let idx = 0; idx < totalLists.listData.length; idx += 1) {
            if (totalLists.listData[idx].id === newListId) {
                targetListName = totalLists.listData[idx].name;
            }
        }

        this.setState({
            processed: { newList: '' },
            newlistName: '',
            pId,
            newListId,
            targetListName,
        });
        /*
            Has to send accountid and accesstoken, since factorysaga
            has issues
        */
        if (this.props.origin === 'LD') {
            this.props.actions.moveToList(
                lId,
                pId,
                [{
                    op: 'replace',
                    path: '/listId',
                    value: newListId,
                }],
                this.state.accountId,
                this.state.token,
            );
            this.props.actions.moveToListEventSuccess();
        } else {
            const { pdpPayload, lists } = this.props;
            const listData = get(lists, 'data.listData', []);
            const userState = parseInt(TokenProvider.get('DP_USER_STATE'), 10);
            if (userState) {
                let totalItemsSavedForLater = 0;
                for (let i = 0; i < listData.length; i += 1) {
                    totalItemsSavedForLater += this.props.lists.data.listData[i].totalItems;
                }
                this.props.actions.addToList(
                    newListId,
                    this.state.accountId,
                    this.state.token,
                    pdpPayload,
                    totalItemsSavedForLater,
                );
            } else {
                let savedItems = [];
                if (TokenProvider.get('DP_SAVED_ITEMS_PAYLOAD')) {
                    savedItems = JSON.parse(TokenProvider.get('DP_SAVED_ITEMS_PAYLOAD'));
                }
                if (savedItems.length) {
                    let found = false;
                    for (let i = 0; i < savedItems.length; i += 1) {
                        if ((savedItems[i].product.id === pdpPayload[0].product.id) &&
                        (savedItems[i].product.itemId === pdpPayload[0].product.itemId)) {
                            found = true;
                        }
                    }
                    if (!found) {
                        savedItems.push(pdpPayload[0]);
                    } else {
                        this.setState({ successMsg: false, MTLError: 'Item already exists.' });
                    }
                } else {
                    savedItems.push(pdpPayload[0]);
                }
                TokenProvider.set('DP_SAVED_ITEMS_PAYLOAD',
                    JSON.stringify(savedItems));
                TokenProvider.set('DP_USER_FAVCOUNT',
                    JSON.stringify(savedItems.length));
                this.setState({ successMsg: true, MTLError: '' });
                const analyticsData = {
                    listType: '',
                    product: [{
                        productInfo: {
                            productPPID: pdpPayload[0].product.id,
                        },
                    }],
                    itemsSavedForLater: savedItems.length,
                };
                analyticsData.listType = 'my fav';
                this.props.actions.addToListEventSuccess(analyticsData);
                if (this.props.addToListSuccess) {
                    this.props.addToListSuccess();
                }
            }
        }

        // fire action click event
        // this.props.actions.moveToListEventSuccess();
    }

    listItems() {
        let totalLists = this.props.lists;
        if ('data' in totalLists) {
            totalLists = totalLists.data;
        } else {
            totalLists = {};
        }
        let listItems = (<span />);
        let guestItemCount = [];
        if (TokenProvider.get('DP_SAVED_ITEMS_PAYLOAD')) {
            guestItemCount = JSON.parse(TokenProvider.get('DP_SAVED_ITEMS_PAYLOAD'));
        }
        if (totalLists.totalList > 0) {
            listItems = totalLists.listData.map((data) => {
                let view;
                if (this.props.listId !== data.id) {
                    view = (<div className={cx('itemsContainer')}>
                        <div className={cx('radioButton')} >
                            <RadioButton name="list" id={data.id} onClick={this.moveToList} />
                        </div>
                        <div className={cx('itemName')}>
                            {data.id === 'myFavorites' &&
                            <Icon iconType="svg" width="35px" height="35px" viewBox="0 0 35 35" name="heartfill" />
                                }
                            {this.state.authStatus ? <span>
                                <span className={cx('itemNameTxt')}>{data.name} </span>
                                <span className={cx('itemNameCount')}>({data.totalItems || 0})</span>
                            </span> : <span>
                                <span className={cx('itemNameTxt')}>{data.name} </span>
                                <span className={cx('itemNameCount')}>({guestItemCount.length})</span>
                            </span>}
                        </div>
                    </div>);
                }

                return view;
            },
            );
        }

        return listItems;
    }

    createNewList() {
        this.setState({
            createNewList: true,
            showError: false,
        });

        this.props.handleCreateNewList();
        // this.props.actions.createListClickAction();
    }

    newListMove() {
        const listName = (this.listName.value).trim();
        let showError = false;
        let errorMessage = '';
        const validate = /^[a-zA-Z\s0-9]*$/;

        if (!validate.test(listName)) {
            showError = true;
            errorMessage = 'Please enter valid list name';
        } else if (!listName) {
            showError = true;
            errorMessage = 'Please enter the list name';
        }

        if (!showError) {
            this.props.actions.createList(
                this.state.accountId,
                this.state.token,
                { name: listName },
            );
            this.setState({
                newlistName: listName,
            });
            if (this.props.origin === 'LD') {
                // fire action click event
                this.props.actions.moveToListEventSuccess();
            }
        } else {
            this.setState({
                showError,
                errorMessage,
                type: 'warning',
            });

            this.props.actions.createListError([{
                errorDescription: errorMessage,
            }]);
        }
    }
    signinNavigate() {
        window.location.assign('/signin?next=/mylist');
    }
    listHubNavigate() {
        window.location.assign(`/savedlist?id=${this.state.newListId}`);
    }
    renderToolTip(params) {
        const listItemsView = this.listItems();
        const { origin, products } = this.props;
        let buttonLabel = 'Move';
        if (origin === 'PDP') {
            buttonLabel = 'Add';
        }

        const productImages = [];
        if (products && ('data' in products)) {
            for (let idx = 0; idx < products.data.items.length; idx += 1) {
                if (idx < 3) {
                    productImages.push(
                        <div className={cx('imageBlock')}>
                            <img src={products.data.items[idx].product.image.url} alt="" className={cx('image')}/>
                        </div>,
                    );
                }

                if (idx >= 3) {
                    productImages.push(
                        <div className={cx('textBlock')}>
                            <div className={cx('remaining')}>
                                +{products.data.totalItems - 3}
                            </div>
                        </div>,
                    );
                    break;
                }
            }
        }

        return (
            <div className={cx('saveTollTip')}>
                { this.state.showLoader &&
                <Loader keepOverlay={false} automationId="test-automation-loader-1"/>
                }
                <div className={cx('header')}>
                    {!this.state.successMsg && <div className={cx('text')}>
                        {params.headerText}
                    </div>}
                    <div className={cx('closeToolTip')}>
                        <Button buttonType="Link" className={cx('closeButton')} onClick={this.closeToolTip}>
                            <Icon
                                type="button" iconType="svg" width="24px" height="24px" viewBox="0 0 25 25"
                                name="icon-close" automationId={'modal-icon-close_list'}
                            />
                        </Button>
                    </div>
                </div>
                {!this.state.successMsg && <div>
                    {(this.state.createNewList === false || origin === 'PDP') &&
                        <div className={cx(params.bodyTheme, 'bodyContainer', !params.showCreateList ? 'bodyContainerFH' : '')}>
                            {listItemsView}
                        </div>
                    }

                    {this.state.MTLError &&
                        <div className={cx('errorMsgCont')}>
                            <MessageBox level="section" type="error" title={this.state.MTLError} onClose={() => { this.setState({ MTLError: undefined }); }} />
                        </div>
                    }

                    {this.state.createNewList === true &&
                        <div className={cx('createnewListCont')}>
                            {(origin === 'LD') &&
                                <div className={cx('heading')}>
                                    New List
                                </div>
                            }
                            <div className={cx('inputContainer')}>
                                <input type="text" className={cx('input')} maxLength="24" ref={(component) => { this.listName = component; }} />
                            </div>
                            <div className={cx('moveButton')}>
                                <Button size="Md" buttonType="Tertiary" className={cx('button')} onClick={this.newListMove}>
                                    {buttonLabel}
                                </Button>
                            </div>
                            {this.state.showError &&
                                <div className={cx('errorMsgCont')}>
                                    <MessageBox level="section" type={params.errorType} title={params.errorMessage} onClose={() => { this.setState({ showError: undefined }); }} />
                                </div>
                            }
                        </div>
                    }
                    {(params.showCreateList === true &&
                        this.state.createNewList === false && this.state.authStatus === 1) &&
                        <div className={cx(params.footerTheme, 'footerContainer')}>
                            <Button buttonType="Link" onClick={this.createNewList} className={cx('button')}>
                                <Icon className={cx('plusToolTip')} iconType="svg" width="22px" height="22px" viewBox="0 0 35 35" name="plus" /> Create New List
                            </Button>
                        </div>
                    }

                    { this.state.authStatus === 0 &&
                        <div className={cx('footerContainer')}>
                            <Button buttonType="Link" onClick={this.signinNavigate} className={cx('button')}>
                                <Icon className={cx('plusToolTip')} iconType="svg" width="22px" height="22px" viewBox="0 0 35 35" name="plus" /> Sign in to Create New List
                            </Button>
                        </div>
                    }
                </div>}
                {this.state.successMsg && <div className={cx('successContainer')}>
                    <p className={cx('successText')}>
                        <Icon iconType="svg" width="35px" height="35px" viewBox="0 0 35 35" name="success" /> Item added to list</p>
                    <div className={cx('productImages')}>
                        {productImages}
                    </div>
                    <div className={cx('listName')}>
                        {this.state.targetListName === 'My Favorites' &&
                            <Icon iconType="svg" width="35px" height="35px" viewBox="0 0 35 35" name="heartfill" />
                        }
                        {this.state.targetListName}
                    </div>
                    <div className={cx('alignCenter')}>
                        <Button buttonType="Link" onClick={this.listHubNavigate} className={cx('button', 'btnLink', 'alignCenter')}>
                            View List
                        </Button>
                    </div>
                </div>}
            </div>
        );
    }

    render() {
        const { bodyTheme, headerText, footerTheme, lists, toolTipTheme } = this.props;
        const { errorMessage, errorType } = this.state;
        let showCreateList;
        let pdpTooltip = '';
        if (this.props.origin === 'PDP') {
            pdpTooltip = cx('pdpTooltip');
        }
        if (!lists.data) {
            lists.data = {};
        }
        if ('totalList' in lists.data) {
            showCreateList = lists.data.totalList < 7;
        } else {
            showCreateList = false;
        }

        let containerClass;
        if (this.state.createNewList) {
            containerClass = 'createAcActive';
        } else {
            containerClass = '';
        }

        const toolTipView = this.renderToolTip({
            showCreateList,
            headerText,
            errorMessage,
            errorType,
            bodyTheme,
            footerTheme,
        });

        return (
            <div>
                <LoadSVG svgPaths={[coreSprite]} />
                {/* Show normal tooltip other than mobile */}
                {!this.props.deviceType.isMobile &&
                    (<div className={cx('toolTipCont', containerClass, toolTipTheme, pdpTooltip)}>
                        <div className={cx('subContainer')}>
                            {toolTipView}
                        </div>
                    </div>)
                }
                {/* Show a popup for tooltip in Mobile mode */}
                {this.props.deviceType.isMobile &&
                        (<div>
                            <ModalBox showModal modalTheme={cx('modalStyle')} title="Share This List" onClose={this.closeToolTip}>
                                {toolTipView}
                            </ModalBox>
                        </div>)
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        lists: state.MTLSavedLists.listItems,
        createList: state.MTLSavedLists.createList,
        movedToList: state.MTLSavedLists.movedToList,
        addItems: state.MTLSavedLists.addItems,
        products: state.MTLSavedLists.products,
    };
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...MTLactions, ...AnalyticsAction }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToolTip);
