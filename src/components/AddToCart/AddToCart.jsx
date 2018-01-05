import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from 'yoda-core-components/lib/components/Button/Button';
import Loading from '../../components/Loading/Loading';
import SiteComponent from '../SiteComponent/SiteComponent';
import * as styles from './AddToCart.css';
import * as actions from '../../actions/AddToCartAction';
import * as config from './AddToCart.config';

const cx = classNames.bind(styles);

export class AddToCart extends SiteComponent {

    static propTypes = {
        automationId: PropTypes.string,
        actions: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        addToCart: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        productDetails: PropTypes.objectOf().isRequired,
        buttonType: PropTypes.oneOf(config.BUTTON_TYPE),
        customClassName: PropTypes.string,
        buttonText: PropTypes.string,
    }

    static defaultProps = {
        automationId: '',
        actions: {},
        addToCart: {
            isAddToCartSuccess: false,
            isUpdateCartSuccess: false,
        },
        buttonType: 'Primary',
        buttonText: 'Move To Cart',
    };

    constructor() {
        super();
        this.addToCartButton = this.addToCartButton.bind(this);
        // this.addToCart = this.addToCart.bind(this);
        this.state = {
            inViewport: false,
            scrolled: false,
        };
    }

    addToCartButton(e) {
        e.preventDefault();
        this.props.actions.addItemToCart(this.props.productDetails, this.props.analyticsData);
    }

    render() {
        const { automationId, customClassName, buttonText } = this.props;

        return (
            <div
                className={cx('wrapper', 'sm12', 'md12', 'lg12', 'xl12')}
                ref={el => this.addToCartWrapper = el} //eslint-disable-line
            >
                <div className={cx('addToCartBlock', customClassName)}>
                    <Button
                        size="Lg"
                        buttonType="Secondary"
                        automationId={automationId}
                        className={cx('buttonStyle')}
                        onClick={this.addToCartButton}
                    >
                        <span className={cx('btnText')}>{buttonText}</span>
                    </Button>
                    {/* <Messages messages={addToCartMessages}/> */}
                </div>
                <Loading/>
            </div>
        );
    }
}
// const customOptionsFormSyncErrorsSelector = getFormSyncErrors(CUSTOM_OPTIONS_FORM_ID);
const mapStateToProps = state => ({
    addToCart: state.addToCart,
    selectedQuantity: parseInt(state.selectedQuantity, 10),
});


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        ...actions,
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);
