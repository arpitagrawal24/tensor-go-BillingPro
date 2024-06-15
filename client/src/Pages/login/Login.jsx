import { useContext, useState } from 'react';
import "./Login.css";
import DarkContext from '../../context/dark/darkContext';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const darkContext = useContext(DarkContext);
    const { dark } = darkContext;

    const loginWithGoogle = () => {
        setLoading(true);
        console.log("login with google");
        window.open(`${import.meta.env.VITE_SERVER_URL}/auth/google`, "_self");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic
        setLoading(true);
        setTimeout(() => {
            // Simulate login success or failure
            setLoading(false);
            setError('Invalid username or password'); // Example error
        }, 2000);
    }

    return (
        <div className={`login-page ${dark ? 'dark' : ''}`}>
            <h1 style={{ textAlign: "center", marginBottom: "10px" }}>Login</h1>
            <div className="form">
                {error && <p className="error">{error}</p>}
                <form className='login-form' onSubmit={handleSubmit}>
                    <input type="text" placeholder='Username' required />
                    <input type="password" placeholder='Password' required />
                    <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
                    <p className='message'>Not registered? <a href="#">Create an account</a></p>
                </form>
                <button className='login-with-google-btn' onClick={loginWithGoogle} disabled={loading}>
                    {loading ? 'Redirecting...' : 'Sign In With Google'}
                </button>
            </div>
        </div>
    );
}

export default Login;
