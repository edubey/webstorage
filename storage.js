var util = {};

util.getBrowserStorage = function () {
    var obj = {};
    var Storage = function (type) {
        function createCookie(name, value, days) {
            var date, expires;

            if (days) {
                date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toGMTString();

            } else {
                expires = "";

            }
            document.cookie = name + "=" + value + expires + "; path=/";
        }

        function readCookie(name) {
            var nameEQ = name + "=",
                ca = document.cookie.split(';'),
                i, c;

            for (i = 0; i < ca.length; i++) {
                c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1, c.length);
                }

                if (c.indexOf(nameEQ) == 0) {
                    return c.substring(nameEQ.length, c.length);
                }
            }
            return null;
        }

        function setData(data) {
            data = JSON.stringify(data);
            createCookie('localStorage', data, 365);

        }

        function clearData() {
            createCookie('localStorage', '', 365);
        }

        function getData() {
            var data = readCookie('localStorage');
            return data ? JSON.parse(data) : {};
        }


        // initialise if there's already data
        var data = getData();

        function numKeys() {
            var n = 0;
            for (var k in data) {
                if (data.hasOwnProperty(k)) {
                    n += 1;
                }
            }
            return n;
        }

        return {
            clear: function () {
                data = {};
                clearData();
                this.length = numKeys();
            },
            getItem: function (key) {
                key = encodeURIComponent(key);
                data = getData();
                return data[key] === undefined ? null : data[key];
            },
            key: function (i) {
                var ctr = 0;
                for (var k in data) {
                    if (ctr == i) return decodeURIComponent(k);
                    else ctr++;
                }
                return null;
            },
            removeItem: function (key) {
                data = getData();
                key = encodeURIComponent(key);
                delete data[key];
                setData(data);
                this.length = numKeys();
            },
            setItem: function (key, value) {
                data = getData();
                key = encodeURIComponent(key);
                data[key] = String(value);
                setData(data);
                this.length = numKeys();
            },
            length: 0
        };
    };

    if (!window.localStorage) window.localStorage = new Storage('local');
    if (!window.sessionStorage) window.sessionStorage = new Storage('session');

    // Return localStorage based on its support in current device
    obj.getLocalStorage = function () {
        var storage;
        try {
            // Check if localStorage support
            localStorage.setItem('test', '');
            localStorage.removeItem('test');
            storage = localStorage;

        } catch (err) {
            storage = getStorage('local');
        }
        return storage;
    }

    // Return sessionStorage based on its support in current device
    obj.getSessionStorage = function () {
        var storage;
        try {
            // Check if sessionStorage support
            sessionStorage.setItem('test', '');
            sessionStorage.removeItem('test');
            storage = sessionStorage;
        } catch (err) {
            storage = getStorage('local');
        }
        return storage;
    }


    // Singleton instance localStorage or sessionStorage object
    var instance;

    function getStorage(type) {
        if (!instance) {
            instance = new Storage(type);
        }
        return instance;
    }
    return obj;
};


// Global object to use browser localStorage
var customLocalStorage = util.getBrowserStorage().getLocalStorage();

// Global object to use browser sessionStorage
var customSessionStorage = util.getBrowserStorage().getSessionStorage();
