import axios from 'axios';
window.axios = axios;

window.axios.defaults.withCredentials = true;
window.axios.defaults.withXSRFToken = true;
axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export default axios;
