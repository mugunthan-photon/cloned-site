import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DateTime from 'react-datetime';
import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import SiteComponent from '../SiteComponent/SiteComponent';
import actions from '../../actions/ShowPreviewZoneAction';

require('./DateTimePicker.css');

/* istanbul ignore next */
class DateTimePicker extends SiteComponent {
    static propTypes = {
        showDateTimePicker: PropTypes.bool,
        showPreviewZone: PropTypes.bool,
    }

    static defaultProps = {
        showDateTimePicker: false,
        showPreviewZone: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            showCalendar: false,
            zoneLabel: 'Show Zone',
        };
    }

    onClick = () => {
        this.setState({
            showCalendar: true,
        });
    }

    onDoneClick = () => {
        this.setState({
            showCalendar: false,
        });
        window.location.reload();
    }

    /*
     * This is show only in Preview environment
     */
    onClickShowZone = () => {
        const { showPreviewZone } = this.props;

        if (showPreviewZone) {
            this.props.actions.hidePreviewZone();
            this.state = {
                zoneLabel: 'Show Zone',
            };
        } else {
            this.props.actions.showPreviewZone();
            this.state = {
                zoneLabel: 'Hide Zone',
            };
        }
    }

    dateTimeOnChange = (d) => {
        const formatDate = d.format('YYYY.MM.DD hh:mm a');
        this.setState({
            selectedDate: formatDate,
        });
        Cookies.save('DP_PREVIEW_DATE', formatDate, 1);
    }

    render() {
        const { showCalendar, selectedDate, zoneLabel } = this.state;
        const { showDateTimePicker } = this.props;

        return showDateTimePicker && (
            <div className="previewOverlay">
                <div className="datepicker">
                    <button id="btnShowCalendar" className="btnShowCalendar" onClick={this.onClick}><Icon iconType="svg" automationId="test-automation-icon" width="35px" height="35px" viewBox="0 0 35 35" name="schedule-appt" pathClassName="iconPath" /></button>
                    <span className="lblShowCalendar" >{selectedDate}</span>
                    <button id="btnShowZone" className="btnShowZone" onClick={this.onClickShowZone}>{zoneLabel}</button>
                    {showCalendar &&
                        <div className="floatingCalendar">
                            <DateTime
                                input={false}
                                disableOnClickOutside
                                onChange={this.dateTimeOnChange} />
                            <button id="doneClick" className="doneButton" onClick={this.onDoneClick}>Done</button>
                        </div>
                            }
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ showPreviewZone }) => ({
    showPreviewZone,
});


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DateTimePicker);
