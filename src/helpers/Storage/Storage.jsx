import Cookies from 'yoda-core-components/lib/helpers/Cookies/Cookies';
import LocalStorage from 'yoda-core-components/lib/helpers/LocalStorage/LocalStorage';
/*
 * Store need to show on Classic and Yoda with Secure and Non-secure page
 * If site is in non-secure, common value need to be maintained as it need to be in cookie
 * If not, it can live in local storage
 */
class Storage {
    constructor() {
        /* istanbul ignore else */
        if (!__SERVER__) {
            this.ssl = window.location.protocol === 'https:';
        }
    }

    save = (key, value, withKey) => {
        if (!this.ssl) {
            Cookies.save(key, value);
        } else {
            LocalStorage.setData(key, value, withKey);
        }
    }

    load = (key, withKey) => {
        let value;
        if (!this.ssl) {
            value = Cookies.load(key);
        } else {
            value = LocalStorage.getData(key, withKey);
        }
        return value;
    }

    remove = (key) => {
        if (!this.ssl) {
            Cookies.remove(key);
        } else {
            LocalStorage.removeData(key);
        }
    }
}

export default new Storage();
