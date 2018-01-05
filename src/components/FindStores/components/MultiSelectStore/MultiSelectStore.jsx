import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Button from 'yoda-core-components/lib/components/Button/Button';
import styles from './MultiSelectStore.css';

const cx = classNames.bind(styles);

export const MultiSelectStore = (props) => {
    const { selectStoreAction, selectedStores } = props;

    return (
        <section className={cx('selectStoreContainer', 'row')}>
            <Button
                buttonType="Primary"
                type="submit"
                size="Xl"
                className={cx('selectStoresButton')}
                automationId="at-store-list-select-stores"
                onClick={() => selectStoreAction(selectedStores)}>
                Select Stores ({selectedStores.length})
            </Button>
        </section>
    );
};

MultiSelectStore.propTypes = {
    selectStoreAction: PropTypes.func.isRequired,
    selectedStores: PropTypes.arrayOf(PropTypes.object),
};

MultiSelectStore.defaultProps = {
    selectedStores: [],
};

const mapStateToProps = ({
    galleryStoreReducer: { selectedStores },
}) => ({
    selectedStores,
});

export default connect(mapStateToProps)(MultiSelectStore);

