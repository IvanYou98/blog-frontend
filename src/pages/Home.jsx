import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
const Home = () => {
    const [posts, setPosts] = useState([]);
    const cat = useLocation().search;

    useEffect(() => {
        axios.get(`/post${cat}`)
            .then(res => setPosts(res.data))
    }, [cat])

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }

    return (
        <div className='home'>
            <div className='posts'>
                {
                    posts.map(post => {
                        return (
                            <div className='post' key={post.id}>
                                <div className='img'>
                                    <img src={`../upload/${post.img}`} alt="" />
                                </div>
                                <div className='content'>
                                    <h1>{post.title}</h1>
                                    <div className='description'>{getText(post.desc)}</div>
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