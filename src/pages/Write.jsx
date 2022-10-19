import React from 'react'
import hljs from 'highlight.js'
import 'react-quill/dist/quill.snow.css'
import 'highlight.js/styles/atom-one-dark-reasonable.css'
import ReactQuill from 'react-quill'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import moment from "moment"
import axios from 'axios'
import { BACKEND_API } from '../constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

hljs.configure({
    languages: ['javascript', 'python', 'java'],
})

const modules = {
    syntax: {
        highlight: text => hljs.highlightAuto(text).value,
    },
    toolbar: [
        [{ font: [] }],
        [{ header: [] }],
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['code-block'],
    ],
    clipboard: {
        matchVisual: false,
    },
}

const Write = ({ props }) => {
    const navigate = useNavigate();
    const state = useLocation().state;
    const [content, setContent] = useState(state?.desc || "");
    const [title, setTitle] = useState(state?.title || "");
    const [cat, setCat] = useState(state?.cat || "")
    const [img, setImg] = useState(state?.img || "")
    const [isPublishing, setIsPublishing] = useState(false);

    const handlePublish = async (e) => {
        e.preventDefault();
        setIsPublishing(true);
        try {
            state
                ? await axios.put(`${BACKEND_API}/post/${state.id}`, {
                    title,
                    desc: content,
                    cat: cat,
                    img: img
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                })
                : await axios.post(`${BACKEND_API}/post/`, {
                    title,
                    desc: content,
                    cat: cat,
                    img: img,
                    date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
            setIsPublishing(false);
            navigate("/")
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='create-post'>
            <div className='content'>
                <input type="text"
                    value={title}
                    placeholder='Title'
                    onChange={e => setTitle(e.target.value)}
                />
                <div className='editor-container'>
                    <ReactQuill
                        className='editor'
                        value={content}
                        onChange={setContent}
                        theme="snow"
                        modules={modules}
                    />
                </div>
            </div>
            <div className='menu'>
                <div className='item'>
                    <h1>Publish</h1>
                    <span>
                        <b>Status: </b> Draft
                    </span>
                    <span>
                        <b>Visibility:</b> Public
                    </span>
                    <label htmlFor="imgUrl" className='file'>
                        Image Url
                    </label>
                    <input id="imgUrl" type="text" onChange={e => setImg(e.target.value)} value={img} />
                    <div className='buttons'>
                        <button>Save as a draft</button>
                        <button onClick={handlePublish}> {
                            isPublishing
                                ? <FontAwesomeIcon icon={faSpinner} className='spinner' />
                                : "Publish"
                        }
                        </button>
                    </div>
                </div>
                <div className='item'>
                    <h1>Category</h1>
                    <div className='cat'>
                        <input type="radio" value="frontend" id="dev-radio" checked={cat === "frontend"} onChange={e => setCat(e.target.value)} />
                        <label htmlFor="dev-radio">Front End</label>
                    </div>
                    <div className='cat'>
                        <input type="radio" value="backend" id="algo-radio" checked={cat === "backend"} onChange={e => setCat(e.target.value)} />
                        <label htmlFor="algo-radio">Back End</label>
                    </div>
                    <div className='cat'>
                        <input type="radio" value="algo" id="algo-radio" checked={cat === "algo"} onChange={e => setCat(e.target.value)} />
                        <label htmlFor="algo-radio">Algo</label>
                    </div>
                </div>
            </div>

        </div>

    )
}


export default Write;