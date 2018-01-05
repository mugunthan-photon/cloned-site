import React from 'react';
import Banner from 'yoda-core-components/lib/components/Banner/Banner';
import classNames from 'classnames/bind';
import Layout from '../Layout';
import styles from '../Layout.css';

const cx = classNames.bind(styles);

const stories = [{
    name: 'Layout',
    story: () => (
        <Layout>
            <section>
                <section className={cx('row')}>
                    <div className={cx('col12')}>
                        <div className={cx('gridLook')}>All 12 Col Containers</div>
                    </div>
                </section>

                <section className={cx('row')}>
                    <div className={cx('sm12', 'md3', 'lg4', 'xl4')}>
                        <div className={cx('gridLook')}>Small - 12, Med - 3, Large - 4, Extra Large - 4</div>
                    </div>
                    <div className={cx('sm12', 'md9', 'lg8', 'xl8')}>
                        <div className={cx('gridLook')}>Small - 12, Med - 9, Large - 8, Extra Large - 8</div>
                    </div>
                </section>

                <section className={cx('row')}>
                    <div className={cx('sm2', 'md3', 'lg4', 'xl4')}>
                        <div className={cx('gridLook')}>Small - 2, Med - 3, Large - 4, Extra Large - 4</div>
                    </div>
                    <div className={cx('sm2', 'md3', 'lg4', 'xl4')}>
                        <div className={cx('gridLook')}>Small - 2, Med - 3, Large - 4, Extra Large - 4</div>
                    </div>
                    <div className={cx('sm2', 'md3', 'lg4', 'xl4')}>
                        <div className={cx('gridLook')}>Small - 2, Med - 3, Large - 4, Extra Large - 4</div>
                    </div>
                    <div className={cx('sm2', 'md3', 'lg4', 'xl4')}>
                        <div className={cx('gridLook')}>Small - 2, Med - 3, Large - 4, Extra Large - 4</div>
                    </div>
                    <div className={cx('sm2', 'md3', 'lg4', 'xl4')}>
                        <div className={cx('gridLook')}>Small - 2, Med - 3, Large - 4, Extra Large - 4</div>
                    </div>
                    <div className={cx('sm2', 'md3', 'lg4', 'xl4')}>
                        <div className={cx('gridLook')}>Small - 2, Med - 3, Large - 4, Extra Large - 4</div>
                    </div>
                </section>

                <section className={cx('row')}>
                    <div className={cx('sm12', 'md6', 'lg6', 'xl6')}>
                        <div className={cx('gridLook')}>Small - 12, Med - 6, Large - 6, Extra Large - 6</div>
                    </div>
                    <div className={cx('sm12', 'md6', 'lg6', 'xl6')}>
                        <div className={cx('gridLook')}>Small - 12, Med - 6, Large - 6, Extra Large - 6</div>
                    </div>
                </section>

                <section className={cx('row')}>
                    <div className={cx('col4')}>
                        <div className={cx('gridLook')}>Small - 4, Med - 4, Large - 4, Extra Large - 4</div>
                    </div>
                    <div className={cx('col4')}>
                        <div className={cx('gridLook')}>Small - 4, Med - 4, Large - 4, Extra Large - 4</div>
                    </div>
                    <div className={cx('col4')}>
                        <div className={cx('gridLook')}>Small - 4, Med - 4, Large - 4, Extra Large - 4</div>
                    </div>
                </section>

                <section className={cx('row')}>
                    <div className={cx('col4')}>
                        <div className={cx('banner-image')}>
                            <Banner href="http://m.jcpenney.com/jsp/rewards/rewardsHome.jsp" bannerImageUrl="http://m.jcpenney.com/mobile/images/pg00001_m550007_47100016.gif" altText="Banner Rewards" target="_blank" ariaLabel="rewards page link" />
                        </div>
                    </div>
                    <div className={cx('col4')}>
                        <div className={cx('banner-image')}>
                            <Banner href="http://m.jcpenney.com/jsp/rewards/rewardsHome.jsp" bannerImageUrl="http://m.jcpenney.com/mobile/images/pg00001_m550007_47100016.gif" altText="Banner Rewards" target="_blank" ariaLabel="rewards page link" />
                        </div>
                    </div>
                    <div className={cx('col4')}>
                        <div className={cx('banner-image')}>
                            <Banner href="http://m.jcpenney.com/jsp/rewards/rewardsHome.jsp" bannerImageUrl="http://m.jcpenney.com/mobile/images/pg00001_m550007_47100016.gif" altText="Banner Rewards" target="_blank" ariaLabel="rewards page link" />
                        </div>
                    </div>
                </section>

                <section className={cx('row')}>
                    <div className={cx('sm6', 'md3', 'lg3', 'xl3')}>
                        <div className={cx('gridLook')}>Small - 6, Med - 3, Large - 3, Extra Large - 3</div>
                    </div>
                    <div className={cx('sm6', 'md3', 'lg3', 'xl3')}>
                        <div className={cx('gridLook')}>Small - 6, Med - 3, Large - 3, Extra Large - 3</div>
                    </div>
                    <div className={cx('sm6', 'md3', 'lg3', 'xl3')}>
                        <div className={cx('gridLook')}>Small - 6, Med - 3, Large - 3, Extra Large - 3</div>
                    </div>
                    <div className={cx('sm6', 'md3', 'lg3', 'xl3')}>
                        <div className={cx('gridLook')}>Small - 6, Med - 3, Large - 3, Extra Large - 3</div>
                    </div>
                </section>
            </section>
        </Layout>
    ),
}];

export default stories;
