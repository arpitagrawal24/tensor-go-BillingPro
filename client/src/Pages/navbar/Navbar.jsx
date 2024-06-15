import { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import './Navbar.css';
import DarkContext from '../../context/dark/darkContext';
import iconSun from '../../assets/images/icon-sun.svg';
import iconMoon from '../../assets/images/icon-moon.svg';

const Navbar = () => {
    const [userdata, setUserdata] = useState({});
    const [loading, setLoading] = useState(true);
    const darkContext = useContext(DarkContext);
    const { dark, toggleDarkMode } = darkContext;

    const getUser = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/login/success`, { withCredentials: true });
            setUserdata(response.data.user);
        } catch (error) {
            console.error('Error fetching user data', error);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        window.open(`${import.meta.env.VITE_SERVER_URL}/logout`, '_self');
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <header className={dark ? 'dark' : ''} aria-label="Main Navigation">
            <nav>
                <div className="left">
                    <h1><NavLink to="/dashboard">Billing Pro</NavLink></h1>
                </div>
                <div className="right">
                    <ul>
                        {loading ? (
                            <li>Loading...</li>
                        ) : Object.keys(userdata).length > 0 ? (
                            <>
    
                                <li onClick={logout} role="button" tabIndex={0}>Logout</li>
                                <li>
                                    <img src={userdata?.image} className="user-image" alt="User Profile" />
                                </li>
                            </>
                        ) : (
                            <li>
                                <NavLink to="/">Login</NavLink>
                            </li>
                        )}
                        <li id="mode-toggle" onClick={toggleDarkMode} role="button" tabIndex={0}>
                            {dark ? (
                                <img src={iconSun} alt="Switch to light mode" />
                            ) : (
                                <img src={iconMoon} alt="Switch to dark mode" />
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
