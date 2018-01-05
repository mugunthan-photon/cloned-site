import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames/bind';

import Button from 'yoda-core-components/lib/components/Button/Button';
import ModalBox from 'yoda-core-components/lib/components/ModalBox/ModalBox';

import styles from './EcoRebates.css';

const cx = classNames.bind(styles);

class EcoRebate extends PureComponent {
    static propTypes = {
        ecoRebate: PropTypes.bool,
        skuId: PropTypes.string,
    }

    static defaultProps = {
        ecoRebate: false,
        skuId: '',
    }

    constructor() {
        super();
        this.state = {
            openRebatesModal: false,
        };
    }

    openRebateModelDialog = (e) => {
        this.setState({
            openRebatesModal: true,
        });
        e.preventDefault();
        e.stopPropagation();
    };

    closeRebatesModal = () => {
        this.setState({
            openRebatesModal: false,
        });
    };

    renderRebatesModal = () => {
        const { skuId } = this.props;
        const rebateWidgetUrl = `https://jcpenney.ecorebates.com/ui/widgets/jcpenney/rebatedetails.html?ecr_skus=${skuId}&ecr_uiContext=PLP`;
        const rebatesMarkup = `<style>.er-iframe {width: 100%; height: 100%;}</style>
                <iframe class="er-iframe" src=${rebateWidgetUrl}>Content is not supported on this device</iframe>`;
        return (
            <ModalBox
                showModal={this.state.openRebatesModal}
                onClose={this.closeRebatesModal}
                automationId="ecorebates-modal"
                modalTheme={cx('rebateModalBlock')}
                modalBlockTheme={cx('blockTheme')}>
                { /* eslint-disable react/no-danger */ }
                <div dangerouslySetInnerHTML={{ __html: rebatesMarkup }} />
            </ModalBox>
        );
    };

    render() {
        const { ecoRebate } = this.props;
        if (ecoRebate) {
            return (
                <div className={cx('ecoRebate')} data-automation-id="product-eco-rebate">
                    <Button onClick={this.openRebateModelDialog} type="button" automationId="rebates-link" buttonType="Link" size="Sm">
                        <span className={cx('link')}>
                            Rebates Available
                        </span>
                    </Button>
                    {this.state.openRebatesModal ? this.renderRebatesModal() : null}
                </div>
            );
        }

        return null;
    }
}


export default EcoRebate;
