import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Configure axios to include CSRF token from the meta tag or the cookie
let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

// Alternative approach using the XSRF-TOKEN cookie (Laravel sets this automatically)
window.axios.defaults.withCredentials = true;
window.axios.defaults.headers.common['X-XSRF-TOKEN'] = 
    document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] || '';
