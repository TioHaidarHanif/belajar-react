import {useContext, useState} from 'react';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, user } = useContext(AuthContext);
    const navigate = useNavigate();
    if (user) {
        // Jika sudah login, redirect ke halaman profile
        navigate('/profile');
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // ini sumbernya dari authConntext.jsx
            // dia function  nya berarti dalam bentuk context yang aku tangkep ya
            // ? kenapa bentuk nya context?

            await login(email, password);
            navigate('/profile'); // Redirect to home after successful login
        }
        catch (error) {
            console.error("Login failed:", error);
            alert("Login failed. Please check your credentials.");
        }
    };
    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        // ?apa kegunaan onChange ini?
                        // oh aku tau, jadi ini kan setEmail itu dari useState, jadi state email disini du isi sama value yang baru
                        // jadi setiap ada perubahanm, bakal di update yang email nya
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}