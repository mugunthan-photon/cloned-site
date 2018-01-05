import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import AddToCart from './AddToCart/AddToCart';
import CreatePasswordInput from './CreatePasswordInput/CreatePasswordInput';
import GoogleMaps from './GoogleMaps/GoogleMaps';
import MarketingOptInSection from './MarketingOptInSection/MarketingOptInSection';
import ProductCard from './ProductCard/ProductCard';
import ScrollTop from './ScrollTop/ScrollTop';
import AppBanner from './AppBanner/AppBanner';
import DepartmentVisualLeftNav from './DepartmentVisualLeftNav/DepartmentVisualLeftNav';
import GridHeader from './GridHeader/GridHeader';
import MarketingZone from './MarketingZone/MarketingZone';
import ProductCartridge from './ProductCartridge/ProductCartridge';
import SelectOptions from './SelectOptions/SelectOptions';
import YodaFooter from './YodaFooter/YodaFooter';
import ApplyCouponInputBox from './ApplyCouponInputBox/ApplyCouponInputBox';
import DepartmentVisualNav from './DepartmentVisualNav/DepartmentVisualNav';
import Hamburger from './Hamburger/Hamburger';
import MarketingZones from './MarketingZones/MarketingZones';
import SerialCodeInputModal from './SerialCodeInputModal/SerialCodeInputModal';
import YodaGetTheApp from './YodaGetTheApp/YodaGetTheApp';
import BarCode from './BarCode/Barcode';
import DisplayApiErrorMessage from './DisplayApiErrorMessage/DisplayApiErrorMessage';
import Header from './Header/Header';
import Messages from './Messages/Messages';
import ProductPromotionCard from './ProductPromotionCard/ProductPromotionCard';
import ShowBarCode from './ShowBarCode/ShowBarCode';
import YodaHeader from './YodaHeader/Header';
import BelowGrid from './BelowGrid/BelowGrid';
import ErrorPage from './ErrorPage/ErrorPage';
import HelpSection from './HelpSection/HelpSection';
import NavigationMenu from './NavigationMenu/NavigationMenu';
import ProductPromotionList from './ProductPromotionList/ProductPromotionList';
import SiteComponent from './SiteComponent/SiteComponent';
import YodaTooltip from './YodaTooltip/YodaTooltip';
import BreadCrumbNav from './BreadCrumbNav/BreadCrumbNav';
import FetchRegion from './FetchRegion/FetchRegion';
import HotDeals from './HotDeals/HotDeals';
import PasswordRequirements from './PasswordRequirements/PasswordRequirements';
import ProductSearch from './ProductSearch/ProductSearch';
import SlidePanel from './SlidePanel/SlidePanel';
import checkout from './checkout/ShippingThreshold/ShippingThresholdHeader';
import CAMNavPanel from './CAMNavPanel/CAMNavPanel';
import FindAStore from './FindAStore/FindAStore';
import IconTooltip from './IconTooltip/IconTooltip';
import PasswordStrengthMeter from './PasswordStrengthMeter/PasswordStrengthMeter';
import ProgressBar from './ProgressBar/ProgressBar';
import Slider from './Slider/Slider';
import CartridgeList from './CartridgeList/CartridgeList';
import FindAStorePage from './FindAStorePage/FindAStorePage';
import Layout from './Layout/Layout';
import PromotionalBanner from './PromotionalBanner/PromotionalBanner';
import StoreCard from './StoreCard/StoreCard';
import CouponAppliedModal from './CouponAppliedModal/CouponAppliedModal';
import FindStores from './FindStores/FindStores';
import ListProductCard from './ListProductCard/components/ProductCompare/ProductCompare';
import PreRender from './PreRender/PreRender';
import SaveForLater from './SaveForLater/SaveForLater';
import TimerWrapper from './TimerWrapper/TimerWrapper';
import CouponCard from './CouponCard/CouponCard';
import Footer from './Footer/Footer';
import Loading from './Loading/Loading';
import Pricing from './Pricing/Pricing';
import SavedListProductCard from './SavedListProductCard/SavedListProductCard';
import Tooltip from './Tooltip/Tooltip';
import CouponList from './CouponList/CouponList';
import GetTheApp from './GetTheApp/GetTheApp';
import LocationFinder from './LocationFinder/LocationFinder';
import ProductBadges from './ProductBadges/BundleBadge';
import SavedListToolTip from './SavedListToolTip/SavedListToolTip';
import VideoPlayer from './VideoPlayer/VideoPlayer';
//import siteSprite from '../../src/assets/sprite.svg';

window.__SERVER__ = false;
window.AddToCart = AddToCart;
window.CreatePasswordInput = CreatePasswordInput;
window.GoogleMaps = GoogleMaps;
window.MarketingOptInSection = MarketingOptInSection;
window.ProductCard = ProductCard;
window.ScrollTop = ScrollTop;
window.AppBanner = AppBanner;
window.DepartmentVisualLeftNav = DepartmentVisualLeftNav;
window.GridHeader = GridHeader;
window.MarketingZone = MarketingZone;
window.ProductCartridge = ProductCartridge;
window.SelectOptions = SelectOptions;
window.YodaFooter = YodaFooter;
window.ApplyCouponInputBox = ApplyCouponInputBox;
window.DepartmentVisualNav = DepartmentVisualNav;
window.Hamburger = Hamburger;
window.MarketingZones = MarketingZones;
window.SerialCodeInputModal = SerialCodeInputModal;
window.YodaGetTheApp = YodaGetTheApp;
window.BarCode = BarCode;
window.DisplayApiErrorMessage = DisplayApiErrorMessage;
window.Header = Header;
window.Messages = Messages;
window.ProductPromotionCard = ProductPromotionCard;
window.ShowBarCode = ShowBarCode;
window.YodaHeader = YodaHeader;
window.BelowGrid = BelowGrid;
window.ErrorPage = ErrorPage;
window.HelpSection = HelpSection;
window.NavigationMenu = NavigationMenu;
window.ProductPromotionList = ProductPromotionList;
window.SiteComponent = SiteComponent;
window.YodaTooltip = YodaTooltip;
window.BreadCrumbNav = BreadCrumbNav;
window.FetchRegion = FetchRegion;
window.HotDeals = HotDeals;
window.PasswordRequirements = PasswordRequirements;
window.ProductSearch = ProductSearch;
window.SlidePanel = SlidePanel;
window.checkout = checkout;
window.CAMNavPanel = CAMNavPanel;
window.FindAStore = FindAStore;
window.IconTooltip = IconTooltip;
window.PasswordStrengthMeter = PasswordStrengthMeter;
window.ProgressBar = ProgressBar;
window.Slider = Slider;
window.CartridgeList = CartridgeList;
window.FindAStorePage = FindAStorePage;
window.Layout = Layout;
window.PromotionalBanner = PromotionalBanner;
window.StoreCard = StoreCard;
window.CouponAppliedModal = CouponAppliedModal;
window.FindStores = FindStores;
window.ListProductCard = ListProductCard;
window.PreRender = PreRender;
window.SaveForLater = SaveForLater;
window.TimerWrapper = TimerWrapper;
window.CouponCard = CouponCard;
window.Footer = Footer;
window.Loading = Loading;
window.Pricing = Pricing;
window.SavedListProductCard = SavedListProductCard;
window.Tooltip = Tooltip;
window.CouponList = CouponList;
window.GetTheApp = GetTheApp;
window.LocationFinder = LocationFinder;
window.ProductBadges = ProductBadges;
window.SavedListToolTip = SavedListToolTip;
window.VideoPlayer = VideoPlayer;

window.configureStore = configureStore;
window.Provider = Provider;
window.siteSprite = siteSprite;

export {
    AddToCart,
    CreatePasswordInput,
    GoogleMaps,
    MarketingOptInSection,
    ProductCard,
    ScrollTop,
    AppBanner,
    DepartmentVisualLeftNav,
    GridHeader,
    MarketingZone,
    ProductCartridge,
    SelectOptions,
    YodaFooter,
    ApplyCouponInputBox,
    DepartmentVisualNav,
    Hamburger,
    MarketingZones,    
    SerialCodeInputModal,
    YodaGetTheApp,
    BarCode,
    DisplayApiErrorMessage,
    Header,
    Messages,
    ProductPromotionCard,
    ShowBarCode,
    YodaHeader,
    BelowGrid,
    ErrorPage,
    HelpSection,
    NavigationMenu,
    ProductPromotionList,
    SiteComponent,
    YodaTooltip,
    BreadCrumbNav,
    FetchRegion,
    HotDeals,
    PasswordRequirements,
    ProductSearch,
    SlidePanel,
    checkout,
    CAMNavPanel,
    FindAStore,
    IconTooltip,
    PasswordStrengthMeter,
    ProgressBar,
    Slider,
    CartridgeList,
    FindAStorePage,
    Layout,    
    PromotionalBanner,
    StoreCard,
    CouponAppliedModal,
    FindStores,
    ListProductCard,
    PreRender,
    SaveForLater,
    TimerWrapper,
    CouponCard,
    Footer,
    Loading,
    Pricing,
    SavedListProductCard,
    Tooltip,
    CouponList,
    GetTheApp,
    LocationFinder,
    ProductBadges,
    SavedListToolTip,
    VideoPlayer,
    siteSprite,
};
