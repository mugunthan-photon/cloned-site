import React, { PropTypes, Component } from 'react';
import ClassNames from 'classnames/bind';
import * as styles from './CAMNavPanel.css';

const cx = ClassNames.bind(styles);

export default class CAMNavPanel extends Component {
    static propTypes = {
        navList: PropTypes.objectOf.isRequired,
        route: PropTypes.objectOf.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    constructor() {
        super();
        this.state = {
            activeIndex: '',

        };
        this.navItemClick = this.navItemClick.bind(this);
    }


    navItemClick = (event) => {
        const elements = event.currentTarget.getElementsByTagName('li');

        for (let i = 0; i < elements.length; i += 1) {
            elements[i].className = '';
        }

        event.target.className = 'CAMDashboard-active';

        const value = Number(event.target.value);
        this.setState({
            activeIndex: value,
        });
        this.props.onClick(value);
    }
    render() {
        const list = [];
        const { activeIndex } = this.state;
        const { navList, route } = this.props;
        let activeRoute = '';
        let activeRouteIndex;
        if (route) {
            activeRoute = route.path;
        }

        if (activeRoute === '/rewards/dashboard') {
            activeRouteIndex = 2;
        }

        for (let i = 1; i <= navList.length; i += 1) {
            if (i === activeIndex || (activeRoute && activeRouteIndex === i)) {
                list.push(<li value={i} className={cx('active')}>{navList[i - 1]}</li>);
            } else {
                list.push(<li value={i}>{navList[i - 1]}</li>);
            }
        }
        return (
            <div className={cx('rewardsMenu')}>
                <button onClick={this.navItemClick}>
                    <ul>
                        {list}
                    </ul>
                </button>
            </div>
        );
    }
}
