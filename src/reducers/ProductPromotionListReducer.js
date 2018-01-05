import * as types from '../actionTypes/ProductPromotionListActionTypes';

export default function ProductPromotionListReducer(state = [], action) {
    let dataMassage = [];
    let newState = {};
    switch (action.type) {
        case types.PRODUCT_PROMOTION_LIST_CLEAR:
            return {};
        case types.PRODUCT_PROMOTION_LIST_GET_SUCCESS:
            try {
                dataMassage = action.departmentDataWithPageName.gridContents.map((data) => {
                    const newtempData = { ...data, ...data.desktopImageBannerDetails };
                    const newData = Object.assign({},
                        newtempData,
                        { imageSrc: `/${action.departmentDataWithPageName.deviceType}/images/${newtempData.imageSrc}` },
                        { desktopImageBannerDetails: null },
                    );
                    return newData;
                });
                newState = Object.assign({},
                    action.departmentDataWithPageName,
                    { massagedData: [...dataMassage] },
                    { gridContents: null });
            } catch (e) {
                newState = state;
            }
            return newState;
        default:
            return state;
    }
}
