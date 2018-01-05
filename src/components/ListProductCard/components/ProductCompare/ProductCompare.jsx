import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import CheckBox from 'yoda-core-components/lib/components/CheckBox/CheckBox';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import ClassNames from 'classnames/bind';
import productComparisionActions from '../../../../actions/ProductComparisionAction';
import * as Constants from '../../../../common/Constants';
import * as analyticsAnalytics from '../../../../actions/AnalyticsAction';
import styles from './ProductCompare.css';

const cx = ClassNames.bind(styles);

class ProductCompare extends PureComponent {
    static propTypes = {
        productDetails: PropTypes.objectOf(PropTypes.object).isRequired,
        actions: PropTypes.objectOf(PropTypes.object).isRequired,
        compareProducts: PropTypes.objectOf(PropTypes.object).isRequired,
    }

    render() {
        const { productDetails, actions, compareProducts } = this.props;
        const { productCompare: { maxProducts, compareNow } } = Constants;
        const { compareIn } = productDetails;
        if (compareIn) {
            const isSelected = compareProducts.products.find(
                currentProduct => currentProduct.ppId === productDetails.ppId);
            const displayError = compareProducts.productToDisplayError.ppId === productDetails.ppId;
            const checkboxConfig = {
                checked: !!isSelected,
                id: productDetails.ppId,
                name: 'compareCheckbox',
            };
            const displayLink = isSelected && (compareProducts.products.length > 1);
            /* istanbul ignore next */
            return (
                <div className={cx('diffWrapper')}>
                    <CheckBox
                        label={displayLink ? <Link
                            className={cx('compareNow')}
                            to={compareProducts.comparePageUrl}
                            onClick={() => actions.compareProductsClick()}> {compareNow} </Link> : 'Compare'}
                        labelClass={styles.compare}
                        config={checkboxConfig}
                        onChange={() => actions.addOrRemoveProducts(productDetails)}
                        automationId="compareCheckbox"
                        enableFastClick
                    />
                    {displayError ? <div className={cx('errorText')}>
                        <span><Icon iconType="svg" width="40px" height="40px" viewBox="0 0 40 40" name="error"/></span>
                        <span>{maxProducts}</span>
                    </div>
                     : null}
                </div>
            );
        }
        return null;
    }
}

const mapStateToProps = ({ compareProducts }) => ({
    compareProducts,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...productComparisionActions, ...analyticsAnalytics }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCompare);
