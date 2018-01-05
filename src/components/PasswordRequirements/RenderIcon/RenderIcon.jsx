import React, { PropTypes } from 'react';
import Icon from 'yoda-core-components/lib/components/Icon/Icon';

function RenderIcon({ iconName }) {
    return (
        <span>
            <Icon
                iconType="svg"
                width="16px"
                height="16px"
                viewBox="0 0 24 24"
                name={iconName}
                automationId={`at-accPO-${iconName}`}
            />
        </span>
    );
}

RenderIcon.propTypes = {
    iconName: PropTypes.string.isRequired,
};

RenderIcon.defaultProps = {
    iconName: '',
};

export default RenderIcon;
