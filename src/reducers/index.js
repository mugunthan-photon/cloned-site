import DepartmentsReducer from './DepartmentsReducer';
import MarketingContentReducer from './MarketingContentReducer';
import OrdersReducer from './OrdersReducer';
import OptInReducer from './OptInReducer';
import ProductSearchReducer from './ProductSearchReducer';
import ProductCartridgeReducer from './ProductCartridgeReducer';
import NavigationMenuReducer from './NavigationMenuReducer';
import SessionReducer from './SessionReducer';
import ListsReducer from './ListsReducer';
import CartReducer from './CartReducer';
import LatLongReducer from './LatLongReducer';
import ItemCountReducer from './ItemCountReducer';
import MarketingZonesReducer from './MarketingZonesReducer';
import DepartmentVisualNavigationReducer from './DepartmentVisualNavigationReducer';
import DesktopDepartmentVisualNavReducer from './DesktopDepartmentVisualNavReducer';
import ProductPromotionListReducer from './ProductPromotionListReducer';
import CouponsReducer from './CouponsReducer';
import StoreReducer from './StoreReducer';
import BreadCrumbNavReducer from './BreadCrumbNavReducer';
import ProductSearchDetailReducer from './ProductSearchDetailReducer';
import AdjustmentReducer from './AdjustmentReducer';
import ApiErrorReducer from './ApiErrorReducer';
import AppliedAdjustmentsReducer from './AppliedAdjustmentsReducer';
import DeleteAdjustmentReducer from './DeleteAdjustmentReducer';
import UpdatedAdjustmentReducer from './UpdatedAdjustmentReducer';
import MessagesReducer from './MessagesReducer';
import savedItemResponseReducer from './SavedItemResponseReducer';
import DigitalAnalyticsReducer from './DigitalAnalyticsReducer';
import FindStoresReducer from './FindStoresReducer';
import UpdateAdjustmentStatusReducer from './UpdateAdjustmentStatusReducer';
import LoadingReducer from './LoadingReducer';
import OfferDetailsReducer from './PromotionalBannerReducer';
import BarcodeStatusReducer from './BarcodeStatusReducer';
import SavedItemsReducer from './SavedItemsReducer';
import AccountReducer from './AccountReducer';
import FindAStorePageReducer from './FindAStorePageReducer';
import HamburgerReducer from './HambergurReducer';
import MTLSavedLists from './SavedListToolTip';
import GalleryStoreReducer from './GalleryStoreReducer';
import DepartmentVisualLeftNavigationReducer from './DepartmentVisualLeftNavigationReducer';
import ErrorPageReducer from './ErrorPageReducer';
import AddToCartReducer from './AddToCartReducer';
import AccessTokenProviderReducer from './AccessTokenProviderReducer';
import OverlayReducer from './OverlayReducer';
import ProductComparisionReducer from './ProductComparisionReducer';
import RegionReducer from './FetchRegionReducers/FetchRegionReducer';
import ObtainRegionZoneReducer from './FetchRegionReducers/ObtainRegionZoneReducer';
import ShowPreviewZoneReducer from './ShowPreviewZoneReducer';
import IrisReducer from './IrisReducer';

const rootReducer = {
    departments: DepartmentsReducer,
    marketingContent: MarketingContentReducer,
    stores: OrdersReducer,
    productSearchResults: ProductSearchReducer,
    subscriptionStatus: OptInReducer,
    navigationMenuList: NavigationMenuReducer,
    productCartridge: ProductCartridgeReducer,
    session: SessionReducer,
    cartData: CartReducer,
    latLong: LatLongReducer,
    bagItemCount: ItemCountReducer,
    marketingZones: MarketingZonesReducer,
    departmentsVisualNavigation: DepartmentVisualNavigationReducer,
    desktopDepartmentVisualNav: DesktopDepartmentVisualNavReducer,
    productPromotions: ProductPromotionListReducer,
    coupons: CouponsReducer,
    list: ListsReducer,
    selectedStore: StoreReducer,
    breadCrumbsData: BreadCrumbNavReducer,
    productSearchDetailResult: ProductSearchDetailReducer,
    couponApplicationState: AdjustmentReducer,
    apiErrorMsgs: ApiErrorReducer,
    appliedAdjustments: AppliedAdjustmentsReducer,
    deleteAdjustment: DeleteAdjustmentReducer,
    isAdjustmentsUpdated: UpdatedAdjustmentReducer,
    messages: MessagesReducer,
    savedItemStatus: savedItemResponseReducer,
    analyticsClickEvent: DigitalAnalyticsReducer,
    findStoresDetails: FindStoresReducer,
    updateAdjustmentStatus: UpdateAdjustmentStatusReducer,
    isLoading: LoadingReducer,
    promotionalBannerData: OfferDetailsReducer,
    isShowBarcodeOpen: BarcodeStatusReducer,
    savedItems: SavedItemsReducer,
    accounts: AccountReducer,
    hambergurMenu: HamburgerReducer,
    findAStorePageInfo: FindAStorePageReducer,
    ErrorPage: ErrorPageReducer,
    tokenInfo: AccessTokenProviderReducer,
    MTLSavedLists,
    addToCartSite: AddToCartReducer,
    galleryStoreReducer: GalleryStoreReducer,
    departmentsVisualLeftNavigation: DepartmentVisualLeftNavigationReducer,
    regionalPricing: RegionReducer,
    showOverlay: OverlayReducer,
    compareProducts: ProductComparisionReducer,
    regionZonefromLocation: ObtainRegionZoneReducer,
    showPreviewZone: ShowPreviewZoneReducer,
    irisData: IrisReducer,
};


export default rootReducer;
