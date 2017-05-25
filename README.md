# webstorage
JS library to support localStorage/SessionStorage

* Devices like iPad, iPhone may not allow user to leverage localStorage / sessionStorage in private browsing mode.
* This solution is a wrapper on top in localStorage and sessionStorage available in browser. In case these feature are not available in browser, it stores the data in cookie.

* How to use

For localStorage
customLocalStorage.setItem("user_name", "john");

For sessionStorage
customSessionStorage.setItem("user_name", "john");
