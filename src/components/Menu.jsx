import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Menu = ({ cat, currPostId }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/post?cat=${cat}`);
                console.log('current post id: ', currPostId)
                console.log(res.data);
                setPosts(res.data.filter(post => post.id !== currPostId));
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [cat, currPostId])

    return (
        <div className='menu'>
            <h1>Other posts you may like</h1>
            {posts && posts.map(post => {
                return (
                    <div className='post' key={post.id}>
                        <img src={`../upload/${post.img}`} alt="" />
                        <h2>{post.title}</h2>
                        <button>Read More</button>
                    </div>
                )
            })}
        </div>
    )
}

export default Menu