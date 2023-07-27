import React,{ useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './css/login/login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Auth = async(e) =>{
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/login',{
                email : email,
                password : password,
            });
            navigate("/home");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }
    const handleRegister = () => {
        navigate("/register"); 
    };

    return (
        <section className="hero-login is-fullheight is-fullwidth">
        <div className='judul-login'>
            <p>Login to Your Account</p>
        </div>
        <div className="hero-body">
            <div className="container-login">
                <div className="columns is-centered">
                    <div className="column is-4-desktop">
                        <form onSubmit={Auth}>
                            <p className='has-text-centered'>{msg}</p>
                            <div className="inputan-login">
                                    <input type="text" className="input custom-input" placeholder='Email'
                                    value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="inputan-login">
                                    <input type="password" className="input custom-input" placeholder='Password'
                                    value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className="button-submit">
                                <button className='button'>Login to Your Account</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div className='ket-login'>
            <p>Don’t have an account yet?&nbsp;&nbsp;
            <a href="" onClick={handleRegister}>Register</a></p>
            <br></br>
            <p>Allah comes in between a person and a believer's heart</p>
        </div>
        </section>
    )
}

export default Login
