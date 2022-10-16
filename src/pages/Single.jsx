import React, { useContext, useEffect, useState } from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

import hljs from 'highlight.js'
import 'react-quill/dist/quill.snow.css'
import 'highlight.js/styles/atom-one-dark-reasonable.css'
import ReactQuill from 'react-quill'


const Single = () => {
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const postId = useLocation().pathname.split('/')[2];
    useEffect(() => {
        const fetchPost = async () => {
            const res = await axios.get(`/post/${postId}`);
            console.log(res.data);
            setPost(res.data);
        }
        fetchPost();
    }, [postId])

    const handleDelete = async () => {
        await axios.delete(`/post/${post.id}`);
        navigate("/");
    }

    const modules = {
        syntax: {
            highlight: text => hljs.highlightAuto(text).value,
        },
        toolbar: false
    }

    return (
        <div className='single'>
            {
                post && (
                    <div className='content'>
                        <img src={`../upload/${post.img}`} alt="" />
                        <div className='user'>
                            <img src={post.userImg} alt="" />
                            <div className='info'>
                                <span>{post.username}</span>
                                <p>Posted 2 days ago</p>
                            </div>
                            {
                                currentUser?.username === post.username ?
                                    <div className='options'>
                                        <div className='edit-icon'>
                                            <Link to='/write?edit=2' state={post}>
                                                <EditOutlinedIcon />
                                            </Link>
                                        </div>
                                        <div className='remove-icon'>
                                            <DeleteOutlineOutlinedIcon onClick={handleDelete} />
                                        </div>
                                    </div> : null
                            }
                        </div>
                        <div>
                            <h2>{post.title}</h2>
                            <ReactQuill
                                className='editor'
                                value={post.desc}
                                theme="snow"
                                readOnly={true}
                                modules={modules}
                            />
                        </div>
                    </div>
                )
            }
            <div className='menu'>
                {post && <Menu cat={post.cat} currPostId={post.id} />}
            </div>
        </div>
    )
}

export default Single