import React from 'react';
import PasswordStrengthMeter from '../PasswordStrengthMeter';

const showMeter = true;
const myPasswordScore = Math.floor((Math.random() * 100) + 1);

const stories = [{
    name: 'PasswordStrengthMeter',
    story: () => (
        <div>
            <PasswordStrengthMeter
                showMeter={showMeter}
                passwordScore={myPasswordScore}
            />
        </div>
    ),
}];

export default stories;
