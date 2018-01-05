import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import CheckBox from 'yoda-core-components/lib/components/CheckBox/CheckBox';
import styles from './SelectStoreCheckbox.css';
import GalleryStoreAction from '../../../../actions/GalleryStoreAction';

const cx = classNames.bind(styles);

export const SelectStoreCheckbox = (props) => {
    const { storeInfo,
        selectedStores,
        actions: { selectStoreToFilter },
        onChangeCallback,
        label,
        checkboxClass,
        labelContainerClass,
        checkboxLabelClass,
     } = props;
    const checked = selectedStores.find(currentStore => currentStore.id === storeInfo.id);
    const checkboxConfig = {
        id: `storeSelectOption${storeInfo.id}`,
        value: storeInfo.id,
        checked: !!checked,
    };
    const onCheckBoxChange = () => {
        selectStoreToFilter(storeInfo);
        if (onChangeCallback) {
            onChangeCallback(storeInfo);
        }
    };

    const checkboxWrapper = cx('checkboxWrapper', checkboxClass);
    const checkboxLabel = cx('checkboxLabel', checkboxLabelClass);
    const labelContainer = cx('labelContainerClass', labelContainerClass);

    return (<div className={cx(checkboxWrapper)}>
        <CheckBox
            labelContainerClass={labelContainer}
            labelClass={checkboxLabel}
            label={label}
            onChange={onCheckBoxChange}
            config={checkboxConfig}
            />
    </div>);
};

SelectStoreCheckbox.propTypes = {
    storeInfo: PropTypes.objectOf(PropTypes.object).isRequired,
    selectedStores: PropTypes.arrayOf(PropTypes.object),
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
    onChangeCallback: PropTypes.func,
    label: PropTypes.oneOfType([PropTypes.func, PropTypes.children]).isRequired,
    checkboxClass: PropTypes.string,
    checkboxLabelClass: PropTypes.string,
    labelContainerClass: PropTypes.string,
};

SelectStoreCheckbox.defaultProps = {
    selectedStores: [],
    onChangeCallback: null,
    checkboxClass: '',
    checkboxLabelClass: '',
    labelContainerClass: '',
};

const mapStateToProps = ({
    galleryStoreReducer: { selectedStores },
}) => ({
    selectedStores,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...GalleryStoreAction }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectStoreCheckbox);

