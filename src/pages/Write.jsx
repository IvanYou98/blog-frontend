import React from 'react'

import hljs from 'highlight.js'
import 'react-quill/dist/quill.snow.css'
import 'highlight.js/styles/atom-one-dark-reasonable.css'
import ReactQuill from 'react-quill'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import moment from "moment"
import axios from 'axios'

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
    const [photo, setPhoto] = useState();

    const upload = async () => {
        if (photo) {
            try {
                const formData = new FormData();
                formData.append("file", photo);
                const res = await axios.post("/upload", formData);
                return res.data;
            } catch (err) {
                console.log(err);
            }
        }
    };


    const handlePublish = async (e) => {
        e.preventDefault();
        const imgUrl = await upload();
        try {
            state
                ? await axios.put(`/post/${state.id}`, {
                    title,
                    desc: content,
                    cat: cat,
                    img: photo ? imgUrl : state.img,
                })
                : await axios.post(`/post/`, {
                    title,
                    desc: content,
                    cat: cat,
                    img: photo ? imgUrl : "",
                    date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                });
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
                    <input
                        style={{ display: 'none' }}
                        id="file-picker"
                        onChange={e => setPhoto(e.target.files[0])}
                        type="file" />
                    <label htmlFor="file-picker" className='file'>
                        Upload Image
                    </label>
                    <div className='buttons'>
                        <button>Save as a draft</button>
                        <button onClick={handlePublish}>Publish</button>
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