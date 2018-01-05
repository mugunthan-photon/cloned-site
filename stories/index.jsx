import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import RestClient from 'yoda-interfaces/lib/RestClient/RestClient';
import { LoadSVG } from 'yoda-core-components/lib/helpers';
import coreSprite from 'yoda-core-components/lib/assets/sprite.svg';
import headerStories from '../src/components/Header/__stories';
import yodaHeader from '../src/components/YodaHeader/__stories';
import YodaTooltip from '../src/components/YodaTooltip/__stories';
import helpSectionStories from '../src/components/HelpSection/__stories';
import marketingOptInSectionStories from '../src/components/MarketingOptInSection/__stories';
import findAStoreStories from '../src/components/FindAStore/__stories';
import locationFinderStories from '../src/components/LocationFinder/__stories';
import footerStories from '../src/components/Footer/__stories';
import layoutStories from '../src/components/Layout/__stories';
import DepartmentVisualNavStories from '../src/components/DepartmentVisualNav/__stories';
import productCartridgeStories from '../src/components/ProductCartridge/__stories';
import hotDealsStories from '../src/components/HotDeals/__stories';
import cartridgeListStories from '../src/components/CartridgeList/__stories';
import productSearchStories from '../src/components/ProductSearch/__stories';
import storeCardStories from '../src/components/StoreCard/__stories';
import certonaLoaderStories from '../src/helpers/CertonaLoader/__stories';
import NavigationMenuStories from '../src/components/NavigationMenu/__stories';
import GoogleMapsStories from '../src/components/GoogleMaps/__stories';
import productCardStories from '../src/components/ProductCard/__stories';
import MarketingZoneStories from '../src/components/MarketingZone/__stories';
import MarketingZonesStories from '../src/components/MarketingZones/__stories';
import productPromotionCardStories from '../src/components/ProductPromotionCard/__stories';
import productPromotionStories from '../src/components/ProductPromotionList/__stories';
import checkoutShippingThresholdStories from '../src/components/checkout/ShippingThreshold/__stories';
import CouponListStories from '../src/components/CouponList/__stories';
import couponCardStories from '../src/components/CouponCard/__stories';
import SelectOptionsStories from '../src/components/SelectOptions/__stories';
import breadCrumbNavStories from '../src/components/BreadCrumbNav/__stories';
import barCodeSVGStories from '../src/components/BarCode/__stories';
import showBarCodeStories from '../src/components/ShowBarCode/__stories';
import PasswordStrengthMeter from '../src/components/PasswordStrengthMeter/__stories';
import CreatePasswordInputStories from '../src/components/CreatePasswordInput/__stories';
import listProductCardStories from '../src/components/ListProductCard/__stories';
import pricingStories from '../src/components/Pricing/__stories';
import ToolTipStories from '../src/components/Tooltip/__stories';
import BelowGridStories from '../src/components/BelowGrid/__stories';
import applyCouponInputBoxStories from '../src/components/ApplyCouponInputBox/__stories';
import serialCodeInputModalStories from '../src/components/SerialCodeInputModal/__stories';
import displayApiErrorMessageStories from '../src/components/DisplayApiErrorMessage/__stories';
import couponAppliedModalStories from '../src/components/CouponAppliedModal/__stories';
import messagesStories from '../src/components/Messages/__stories';
import findStoresStories from '../src/components/FindStores/__stories';
import rootReducer from '../src/reducers';
import CommonMiddleware from '../src/middlewares/CommonMiddleware';
import rootSaga from '../src/sagas';
import sprite from '../src/assets/sprite.svg';
import ProgressBarStories from '../src/components/ProgressBar/__stories';
import ErrorPagesStories from '../src/components/ErrorPage/__stories';
import PromotionalBanner from '../src/components/PromotionalBanner/__stories';
import FindAStorePageStories from '../src/components/FindAStorePage/__stories';
import ProductBadgesStories from '../src/components/ProductBadges/__stories';
import DepartmentVisualLeftNav from '../src/components/DepartmentVisualLeftNav/__stories';
import IconTooltip from '../src/components/IconTooltip/__stories';
import YodaFooter from '../src/components/YodaFooter/__stories';
import GridHeader from '../src/components/GridHeader/__stories';
import TimerWrapper from '../src/components/TimerWrapper/__stories';
import SocialShare from '../src/components/SocialShare/__stories';
import YodaDropdown from '../src/components/YodaDropdown/__stories';
import IrisParser from '../src/components/IrisParser/__stories';
import GoogleAds from '../src/components/GoogleAds/__stories';
import SeoBlock from '../src/components/SeoBlock/__stories';
import IRISCouponCard from '../src/components/IRISCouponCard/__stories';
import IRISCouponList from '../src/components/IRISCouponList/__stories';
import IRISCouponAppliedModal from '../src/components/IRISCouponAppliedModal/__stories';
import IRISShowPrintButton from '../src/components/IRISShowPrintButton/__stories';

RestClient.setContext({ cookie: 'DPClusterC1', host: 'm-dt-test1.jcpenney.com' });
const sagaMiddleware = createSagaMiddleware();
const middleWare = [sagaMiddleware, CommonMiddleware];

const store = createStore(combineReducers(rootReducer), compose(applyMiddleware(...middleWare)));
store.runSaga = sagaMiddleware.run;
store.runSaga(rootSaga);

const siteComponentStories = storiesOf('Site Components', module);
const helperStories = storiesOf('Helpers', module);

siteComponentStories.addDecorator(getStory => (
    <div>
        <LoadSVG svgPaths={[coreSprite, sprite]}/>
        <Provider store={store}>
            { getStory() }
        </Provider>
    </div>
));

const addStories = (stories) => {
    stories.forEach((element) => {
        siteComponentStories.addWithInfo(
            element.name,
            element.story, {
                inline: true,
                header: true,
            });
    }, this);
};

const addHelperStories = (stories) => {
    stories.forEach((element) => {
        helperStories.addWithInfo(
            element.name,
            element.story, {
                inline: true,
                header: true,
            });
    }, this);
};

addStories(IRISCouponCard);
addStories(IRISCouponList);
addStories(IRISShowPrintButton);
addStories(IRISCouponAppliedModal);
addStories(TimerWrapper);
addStories(YodaFooter);
addStories(PromotionalBanner);
addStories(headerStories);
addStories(yodaHeader);
addStories(YodaTooltip);
addStories(IconTooltip);
addStories(BelowGridStories);
addStories(listProductCardStories);
addStories(pricingStories);
addStories(helpSectionStories);
addStories(marketingOptInSectionStories);
addStories(DepartmentVisualNavStories);
addStories(productCardStories);
addStories(productCartridgeStories);
addStories(hotDealsStories);
addStories(productPromotionCardStories);
addStories(productPromotionStories);
addStories(layoutStories);
addStories(productCartridgeStories);
addStories(productSearchStories);
addStories(footerStories);
addStories(GoogleMapsStories);
addStories(findAStoreStories);
addStories(locationFinderStories);
addStories(storeCardStories);
addStories(NavigationMenuStories);
addStories(checkoutShippingThresholdStories);
addStories(PasswordStrengthMeter);
addStories(MarketingZoneStories);
addStories(MarketingZonesStories);
addStories(CouponListStories);
addStories(couponCardStories);
addStories(CreatePasswordInputStories);
addHelperStories(certonaLoaderStories);
addStories(SelectOptionsStories);
addStories(breadCrumbNavStories);
addStories(barCodeSVGStories);
addStories(showBarCodeStories);
addStories(applyCouponInputBoxStories);
addStories(serialCodeInputModalStories);
addStories(displayApiErrorMessageStories);
addStories(couponAppliedModalStories);
addStories(messagesStories);
addStories(ToolTipStories);
addStories(findStoresStories);
addStories(ProgressBarStories);
addStories(ErrorPagesStories);
addStories(cartridgeListStories);
addStories(FindAStorePageStories);
addStories(ProductBadgesStories);
addStories(DepartmentVisualLeftNav);
addStories(GridHeader);
addStories(SocialShare);
addStories(YodaDropdown);
addStories(IrisParser);
addStories(GoogleAds);
addStories(SeoBlock);
