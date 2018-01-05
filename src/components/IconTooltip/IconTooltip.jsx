import React, { PropTypes } from 'react';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';
import classNames from 'classnames/bind';
import YodaTooltip from '../YodaTooltip/YodaTooltip';
import * as styles from './IconTooltip.css';

const cx = classNames.bind(styles);

const IconTooltip =
({ message, icon, direction, tooltipPlacement,
tooltipContentClass, triggerEventName, iconClass }) => (
    <YodaTooltip
        renderTooltipContents={message} direction={direction} tooltipPlacement={tooltipPlacement}
        tooltipContentClass={tooltipContentClass} triggerEventName={triggerEventName}>
        <Icon
            iconType="svg"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            name={icon}
            className={cx(styles.svgIcon, iconClass)}
        />
    </YodaTooltip>
    );

IconTooltip.propTypes = {
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    icon: PropTypes.string.isRequired,
    tooltipContentClass: PropTypes.string,
    direction: PropTypes.string,
    tooltipPlacement: PropTypes.string,
    triggerEventName: PropTypes.string,
    iconClass: PropTypes.string,
};

IconTooltip.defaultProps = {
    direction: 'Topleft',
    tooltipContentClass: styles.iconTooltip,
    tooltipPlacement: 'Right',
    triggerEventName: 'mouseover',
    iconClass: 'icon',
};
export default IconTooltip;
