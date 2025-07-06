import {useState} from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
export default function Register(){
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            // ini maksuntnya nge masukin data form yang awal, 
            ...form,
            // terus ngemasukin data yang baru diinput dari form
            [name]: value
            // jadi data yang lama bakal ditimpa sama data yang baru
            // karena kalo lagnsung data baru, bisa jadi ada bagian yang hilang karena data baru nya engga elngkap

            //istilahnya itu spread operator dan computed property names
        });
    };
    const handleRegister = async (e) => {
        e.preventDefault();
        try{
            await API.post('/auth/register', form);
            alert('Registration successful! You can now login.');
            navigate('/login'); // Redirect to login page after successful registration 

        } catch{
            console.error("Registration failed:", error);
            alert("Registration failed. Please try again.");
        }
    }

        return (
            <div className="register-container">
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password_confirmation">Confirm Password:</label>
                        <input
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            value={form.password_confirmation}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        );

    
}