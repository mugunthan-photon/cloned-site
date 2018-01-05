import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import ConnectedMessages, { Messages } from './Messages';
import { messagesLevels, messageTypes, levelUiMapping } from './Messages.config';

const titleMessageMock = 'titleMessageMock';
const messageIdMock = 'messageIdMock';
const onCloseSpy = spy();
const infoMessageMock = { id: 'idInfoMessageMock', type: messageTypes.information, title: titleMessageMock };
const errorMessageMock = { id: 'idErrorMessageMock', type: messageTypes.error, title: titleMessageMock };
const warnMessageMock = { id: 'idWarnMessageMock', type: messageTypes.warning, title: titleMessageMock };
const successMessageMock = { id: 'idSuccessMessageMock', type: messageTypes.success, title: titleMessageMock };
const infoMessageWithoutIdMock = { type: messageTypes.information, title: titleMessageMock };
const errorMessageWithoutIdMock = { type: messageTypes.error, title: titleMessageMock };
const warnMessageWithoutIdMock = { type: messageTypes.warning, title: titleMessageMock };

describe('<Messages /> ', () => {
    it('Messages exists', () => {
        const wrapper = shallow(
            <Messages messages={[]}/>,
        );

        expect(wrapper).to.exist; // eslint-disable-line
    });

    it('Messages renders needed amount of messages', () => {
        const wrapper = shallow(
            <Messages
                level={messagesLevels.page}
                messages={[
                    infoMessageMock,
                    errorMessageMock,
                ]}
            />,
        );

        expect(wrapper.find('Message')).to.have.lengthOf(2);
    });

    it('Messages renders Message Toast components in case level equals page', () => {
        const wrapper = shallow(
            <Messages
                level={messagesLevels.page}
                messages={[
                    warnMessageMock,
                    successMessageMock,
                ]}
            />,
        );

        expect(wrapper.find(`Message[uiType='${levelUiMapping[messagesLevels.page]}']`)).to.have.lengthOf(2);
    });

    it('Messages renders Message Box components in case level equals section', () => {
        const wrapper = shallow(
            <Messages
                level={messagesLevels.section}
                messages={[
                    infoMessageMock,
                    warnMessageMock,
                    successMessageMock,
                ]}
            />,
        );

        expect(wrapper.find(`Message[uiType='${levelUiMapping[messagesLevels.section]}']`)).to.have.lengthOf(3);
    });

    it('Messages renders Message Box components in case level equals section and messageId is not provided', () => {
        const wrapper = shallow(
            <Messages
                level={messagesLevels.section}
                messages={[
                    infoMessageWithoutIdMock,
                    warnMessageWithoutIdMock,
                    errorMessageWithoutIdMock,
                ]}
            />,
        );

        expect(wrapper.find(`Message[uiType='${levelUiMapping[messagesLevels.section]}']`)).to.have.lengthOf(3);
    });

    it('Messages renders Message Inline components in case level equals inline', () => {
        const wrapper = shallow(
            <Messages
                level={messagesLevels.inline}
                messages={[
                    infoMessageMock,
                    warnMessageMock,
                    successMessageMock,
                    errorMessageMock,
                ]}
            />,
        );

        expect(wrapper.find(`Message[uiType='${levelUiMapping[messagesLevels.inline]}']`)).to.have.lengthOf(4);
    });

    it('Messages renders Message Popup components in case level equals popup', () => {
        const wrapper = shallow(
            <Messages
                level={messagesLevels.popup}
                messages={[
                    infoMessageMock,
                    warnMessageMock,
                    successMessageMock,
                    errorMessageMock,
                ]}
            />,
        );

        expect(wrapper.find('MessagePopup')).to.have.lengthOf(4);
    });


    it('Messages renders Message Popup components in case level equals popup and messageId is not provided', () => {
        const wrapper = shallow(
            <Messages
                level={messagesLevels.popup}
                messages={[
                    infoMessageWithoutIdMock,
                    warnMessageWithoutIdMock,
                    errorMessageWithoutIdMock,
                ]}
            />,
        );

        expect(wrapper.find('MessagePopup')).to.have.lengthOf(3);
    });


    it('Messages closeMessage invokes this.props.onClose callback with the same params', () => {
        const wrapper = shallow(
            <Messages messages={[]} onClose={onCloseSpy}/>,
        );
        wrapper.instance().closeMessage(messageIdMock);

        expect(onCloseSpy.calledWith(messageIdMock)).to.equal(true);
        expect(onCloseSpy.calledOnce).to.equal(true);
    });

    it('Messages closeMessage invokes this.props.actions.removeMessage callback with the same param', () => {
        const removeMessageSpy = spy();

        const wrapper = shallow(
            <Messages
                messages={[]}
                actions={{
                    removeMessage: removeMessageSpy,
                }}
            />,
        );
        wrapper.instance().closeMessage(messageIdMock);

        expect(removeMessageSpy.calledWith({ id: messageIdMock })).to.equal(true);
        expect(removeMessageSpy.calledOnce).to.equal(true);
    });
});

describe('<ConnectedMessages /> ', () => {
    const mockStore = configureStore([]);
    let store = {};

    it('ConnectedMessages exists', () => {
        store = mockStore({
            actions: {},
        });

        const wrapper = mount(
            <Provider store={store}>
                <ConnectedMessages />
            </Provider>,
        );

        expect(wrapper).to.exist; // eslint-disable-line
    });
});
