import {useContext} from 'react';
import { AuthContext } from '../auth/AuthContext';
export default function Profile() {
    const { user, logout } = useContext(AuthContext);
    if (!user) {
        // karena udah di protected di App() harusnya
        return <div>Loading.</div>;
    }
    return (
        <div className="profile-container">
            <h2>Profile</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
};
    