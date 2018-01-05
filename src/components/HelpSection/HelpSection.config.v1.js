const config = [
  /**
   * TODO: Will be updated when the actual image provided by design team
   * or would be completely replaced by font-icons
   */
    {
        id: 'give_call',
        key: 1,
        type: 'svg',
        text: 'Give us a call ',
        textStrong: '1-800-322-1189',
        linkPath: 'tel:1-800-322-1189',
        name: 'phone-fill',
        hidden: false,
        placeholder: false,
    },
    {
        id: 'text_us',
        key: 2,
        type: 'svg',
        text: 'Text us ',
        textStrong: '1-855-808-7710',
        linkPath: 'sms:1-855-808-7710',
        name: 'conversation-fill',
        hidden: false,
        placeholder: true,
    },
    {
        id: 'chat_us',
        key: 3,
        type: 'svg',
        text: 'Chat with us ',
        textStrong: 'Live',
        linkPath: '/customerService',
        name: 'chat-fill',
        hidden: false,
        placeholder: true,
    },
    {
        id: 'ask_us',
        key: 4,
        type: 'svg',
        text: 'Ask us on twitter ',
        textStrong: '@askjcp',
        linkPath: 'https://twitter.com/askjcp',
        name: 'ask-us-on-twitter',
        newTab: '_blank',
        hidden: false,
        placeholder: false,
    },
];

export default config;
