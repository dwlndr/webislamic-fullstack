import React,{ useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './css/register/register.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/"); 
    };

    const Register = async(e) =>{
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users',{
                name : name,
                email : email,
                password : password,
                confPassword : confPassword
            });
            navigate("/");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
        <section className="hero-register has-background-grey-light is-fullheight is-fullwidth">
        <div className='judul-register'>
            <p>Register New Account</p>
        </div>
        <div className="hero-body">
            <div className="container-register">
                <div className="columns is-centered">
                    <div className="column is-4-desktop">
                        <form onSubmit={ Register }>
                        <p className='has-text-centered'>{msg}</p>
                            <div className="inputan-register">
                                    <input type="text" className="input" placeholder='Name'
                                    value={name} onChange={(e)=> setName(e.target.value)}/>
                            </div>
                            <div className="inputan-register">
                                    <input type="text" className="input" placeholder='Email'
                                    value={email} onChange={(e)=> setEmail(e.target.value)}/>
                            </div>
                            <div className="inputan-register">
                                    <input type="password" className="input" placeholder='Password'
                                    value={password} onChange={(e)=> setPassword(e.target.value)}/>
                            </div>
                            <div className="inputan-register">
                                    <input type="password" className="input" placeholder='Confirm Password'
                                    value={confPassword} onChange={(e)=> setConfPassword(e.target.value)}/>
                            </div>
                            <div className="button-submit">
                                <button className='button'>Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div className='ket-register'>
            <p>Already Have an account?&nbsp;&nbsp;
            <a href="" onClick={handleLogin}>Login</a></p>
        </div>
        </section>
    )
}

export default Register
