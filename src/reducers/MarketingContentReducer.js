import * as types from '../actionTypes/MarketingContentActionTypes';

export default function MarketingContentReducer(state = [], action) {
    const getMarketingContent = (content, defaultState) => {
        /* istanbul ignore next */
        const marketingContents = content.homePageContents ? content.homePageContents : [];
        /* istanbul ignore next */
        if (marketingContents.length > 0 && marketingContents[0].gridContents) {
            return marketingContents[0].gridContents;
        }
        return defaultState;
    };
    switch (action.type) {
        case types.MARKETING_CONTENT_GET_SUCCESS:
            return getMarketingContent(action.homePageContent, state);
        default:
            return state;
    }
}
