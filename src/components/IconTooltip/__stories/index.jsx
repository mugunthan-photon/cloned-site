import React from 'react';
import IconTooltip from '../IconTooltip';

const stories = [
    {
        name: 'IconTooltip',
        story: () => {
            const tooltipMessage = 'We’ll use this component to show more information something in JCPenney online stores.';
            const iconName = 'information';
            const styles = {
                // this is just to demonstrate
                // other way to import css in the comp you are using and
                // use bind classnames ideally
                'tooltip-wrapper': {
                },
                content: {
                    border: '2px solid #D7D7D7',
                },
                heading: {
                    fontSize: '17px',
                    fontWeight: 'bold',
                    lineHeight: '1.5',
                    textAlign: 'left',
                    color: '#ffff',
                    backgroundColor: '#53606B',
                    padding: '8px',
                    margin: '-8px -8px 8px',
                    borderTopLeftRadius: '4px',
                    borderTopRightRadius: '4px',
                },
            };
            const emailTooltip = (
                <div style={styles['tooltip-wrapper']}>
                    <div style={styles.heading}>
                        So you want to some in heading ?
                    </div>
                    <div style={styles.content}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos sit odio pariatur
                    </div>
                </div>
            );
            return (
                <div>
                    <p>
                    You know I wanted some more info. So I clicked
                    <IconTooltip message={tooltipMessage} icon={iconName} iconClass={'icon'}/>
                    icon
                    </p>
                    <br/>
                    <br/>
                    <p>
                    Then I thought to customize content and style
                    <br/>
                    so I passed HTML
                    <IconTooltip message={emailTooltip} icon={iconName} iconClass={'icon'}/>
                    icon
                </p>
                </div>
            );
        },
    },
];

export default stories;
