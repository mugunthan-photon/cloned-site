import React, { Component, PropTypes } from 'react';
import JsBarcode from 'jsbarcode';
import * as styles from './Barcode.css';

class GenerateBarcode extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
    };

    constructor() {
        super();
        this.reference = '';
    }
    /* istanbul ignore next */
    componentDidMount() {
        JsBarcode(this.reference, this.props.id, { height: '80', format: 'CODE128B', width: '1' });
    }
    assignReference = (reference) => {
        this.reference = reference;
    };

    render() {
        return <svg ref={this.assignReference} className={styles.barcode}/>;
    }
}

export default GenerateBarcode;
