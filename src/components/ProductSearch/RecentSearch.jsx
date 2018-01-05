import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
import config from './ProductSearch.config';

export default class RecentSearch {
    static getData = () => {
        const data = Cookies.load('recentSearchData');
        if (data) return JSON.parse(data);
        return [];
    };

    static getRecentData = () => {
        const recentSearchValue = RecentSearch.getData().map(item => (
            { term: item }
        ));
        return recentSearchValue;
    }

    static clearData = (domain = '.jcpenney.com') => { Cookies.remove('recentSearchData', domain); };

    static setData = (query, deptName, max = config.data.maxCacheItem, domain = '.jcpenney.com') => {
        if (typeof query === 'undefined') return;

        const queryTrim = query.trim().toLowerCase();
        if (queryTrim === '') return;
        const searchText = queryTrim.replace(/[-]/gi, '+');
        let data = searchText;
        if (deptName) {
            data = `${searchText} ${deptName}`;
        }

        const recentSearchValue = RecentSearch.getData();
        let term = [data];

        if (recentSearchValue.length) term = recentSearchValue;
        if (recentSearchValue.length && (recentSearchValue.indexOf(data) === -1)) {
            term.unshift(data);
            if (recentSearchValue.length > max) {
                term.pop();
            }
        }

        const cookie = JSON.stringify(term);
        const encodeCookie = encodeURIComponent(cookie);
        Cookies.save('recentSearchData', encodeCookie, 30, domain);
    }
}
