import React,{useState, useEffect} from 'react'
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import './css/home/home.css';

import Navbar from './Navbar'

const Home = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const [currentDate, setCurrentDate] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const date = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        setCurrentDate(formattedDate);
        refreshToken();
        getUsers(); 
    },[]);

    const refreshToken = async() => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                navigate('/');
            }
        }
    }


    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
          try {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
          } catch (error) {
            navigate('/');
            return Promise.reject(error);
          }
        }
        return config;
      }, (error) => {
        return Promise.reject(error);
      });

    const getUsers = async() =>{
        const response = await axiosJWT.get('http://localhost:5000/users',{
            headers:{
                Authorization : `Bearer ${token}`
            } 
        });
    setUsers(response.data);
    }

    return (
        <div>
            <Navbar/>
            <section className="hero is-fullheight is-fullwidth">
                <div className="hero-body-home">
                <p>{currentDate}</p>
                    <div className='container-home'>
                        <h1>ٱلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّٰهِ وَبَرَكَاتُهُ</h1>
                        <h2>Welcome Back, {name}</h2>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
