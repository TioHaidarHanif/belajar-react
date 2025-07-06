import axios from 'axios';
const API = axios.create({
    baseURL: 'https://apibackendtio.mynextskill.com/api/',
});


API.interceptors.request.use((req) => {
    /**
     * Retrieves the authentication token from the browser's local storage.
     * 
     * @constant {string|null} token - The token stored in local storage, or null if no token is found.
     */
    const token = localStorage.getItem('token');

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
}
);
export default API;