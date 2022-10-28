import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useLocation } from 'react-router-dom'
import { BACKEND_API } from '../constants';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const cat = useLocation().search;

    useEffect(() => {
        setIsLoading(true);
        axios.get(`${BACKEND_API}/post${cat}`)
            .then(res => {
                setPosts(res.data)
                setIsLoading(false);
            })
            .catch(err => setIsLoading(false))
    }, [cat])


    return (
        <div className='home'>
            <div className='posts'>
                {
                    isLoading ? <CircularProgress className='spinner' />
                        : posts.map(post => {
                            return (
                                <div className='post' key={post.id}>
                                    <div className='img'>
                                        <img src={`${post.img}`} alt="" />
                                    </div>
                                    <div className='content'>
                                        <h1>{post.title}</h1>
                                        <div className='description'>{post.intro}</div>
                                        <Link className='link' to={`/post/${post.id}`}>
                                            <button>Read More</button>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
        </div>
    )
}

export default Home