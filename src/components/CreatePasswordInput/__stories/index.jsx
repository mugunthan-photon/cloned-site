import React from 'react';
import CreatePasswordInput from '../CreatePasswordInput';

const getRandomemail = () => `${(`${Math.random().toString(36)}00000000000000000`).slice(2, 15 + 2)}@test.com`;
const userInfo = {
    emailId: getRandomemail(),
    firstName: 'jigar',
    lastName: 'patel',
};

const isValid = () => {};
const stories = [{
    name: 'CreatePasswordInput',
    story: () => (
        <div>
            <CreatePasswordInput
                userEmail={userInfo.emailId}
                userFirstName={userInfo.firstName}
                userLastName={userInfo.lastName}
                isPasswordValidated={isValid}
            />
        </div>
    ),
}];

export default stories;
