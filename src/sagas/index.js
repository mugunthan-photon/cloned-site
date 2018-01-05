import { fork } from 'redux-saga/effects';
import watchDepartmentsRequest from './DepartmentsSaga';
import watchMarketingContentRequest from './MarketingContentSaga';
import watchActiveMenuListRequest from './NavigationMenuSaga';
import watchProductSearchRequest from './ProductSearchSaga';
import watchOptInRequest from './OptInSaga';
import watchGetStoresRequest from './OrdersSaga';
import watchSessionsRequest from './SessionSaga';
import watchListsRequest from './ListsSaga';
import watchCartActionsRequest from './CartSaga';
import watchZoneActionsRequest from './MarketingZonesSaga';
import { watchVisualNavigationRequest, watchVisualLeftNavigationRequest } from './DepartmentVisualNavigationSaga';
import watchSavedItemsProductListRequest from './SavedItemsProductCartridgeSaga';
import watchProductListRequest, { watchResetProductList } from './ProductCartridgeSaga';
import watchProductPromortionListRequest from './ProductPromotionListSaga';
import watchCouponsRequest from './CouponsSaga';
import watchPromotionalBannerActionRequest from './PromotionalBannerSaga';
import watchStoreSagaActionsRequest, { watchSetMyStore } from './StoreSaga';
import watchBreadCrumbNavRequest from './BreadCrumbNavSaga';
import watchProductSearchDetailRequest from './ProductSearchDetailSaga';
import { watchApplyAdjustmentsRequest, watchRemoveAdjustmentsRequest, watchgetAppliedAdjustmentsRequest } from './AdjustmentSaga';
import watchAccessTokenProviderRequest, { watchRefreshTokenProviderRequest } from './AccessTokenProviderSaga';
import { watchFindStoresRequest, watchFindMoreStoresRequest } from './FindStoresSaga';
import watchAccountRequest from './AccountSaga';
import watchSavedItem from './SavedItemsSaga';
import watchSelectStore from './SelectStoreSaga';
import { watchfindAStorePage, watchMoreFindAStorePage, watchPrePopulateStores, watchGetAndPreSelectStores } from './FindAStorePageSaga';
import watchSetMyDefaultStore from './SetMyDefaultStoreSaga';
import { watchhamburgerchange, watchHoverApi } from './HamburgerSaga';
import watchMTLToolTipSaga from './SavedListToolTip';
import watchAddToCartSaga from './AddToCartSaga';
import watchIrisRequest from './IrisSaga';


export default function* siteComponentSagas() {
    yield* [
        fork(watchDepartmentsRequest),
        fork(watchMarketingContentRequest),
        fork(watchProductSearchRequest),
        fork(watchOptInRequest),
        fork(watchGetStoresRequest),
        fork(watchSessionsRequest),
        fork(watchListsRequest),
        fork(watchCartActionsRequest),
        fork(watchActiveMenuListRequest),
        fork(watchZoneActionsRequest),
        fork(watchVisualNavigationRequest),
        fork(watchProductListRequest),
        fork(watchSavedItemsProductListRequest),
        fork(watchProductPromortionListRequest),
        fork(watchCouponsRequest),
        fork(watchStoreSagaActionsRequest),
        fork(watchBreadCrumbNavRequest),
        fork(watchResetProductList),
        fork(watchProductSearchDetailRequest),
        fork(watchApplyAdjustmentsRequest),
        fork(watchRemoveAdjustmentsRequest),
        fork(watchAccessTokenProviderRequest),
        fork(watchRefreshTokenProviderRequest),
        fork(watchgetAppliedAdjustmentsRequest),
        fork(watchFindStoresRequest),
        fork(watchFindMoreStoresRequest),
        fork(watchPromotionalBannerActionRequest),
        fork(watchAccountRequest),
        fork(watchSavedItem),
        fork(watchSelectStore),
        fork(watchhamburgerchange),
        fork(watchHoverApi),
        fork(watchfindAStorePage),
        fork(watchMoreFindAStorePage),
        fork(watchPrePopulateStores),
        fork(watchSetMyStore),
        fork(watchSetMyDefaultStore),
        fork(watchSavedItem),
        fork(watchAccountRequest),
        fork(watchMTLToolTipSaga),
        fork(watchVisualLeftNavigationRequest),
        fork(watchAddToCartSaga),
        fork(watchGetAndPreSelectStores),
        fork(watchIrisRequest),
    ];
}
