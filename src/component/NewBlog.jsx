import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {localURL1, localURL2} from '../api'

function NewBlog() {
    const [title, setTitle] = useState('');
    const [blog, setBlog] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const navigate = useNavigate();

    const handleTagChange = (e) => {
        const selectedOptions = Array.from(e.target.options)
            .filter((option) => option.selected)
            .map((option) => option.value);

        setSelectedTags(selectedOptions);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ 'title': title, 'blog': blog, 'tags': selectedTags.toString() })
        const data = { 'userId': localStorage.getItem('userId'), 'title': title, 'blog': blog, 'tags': selectedTags.toString() }
        const token = localStorage.getItem('bloggingToken')

        fetch(`${localURL1}blog/create`, {
            method: 'POST',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((responseJson) => {
                alert('successfull');
                navigate('/home');
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                alert('An error occurred during login');
            });
    };

    const containerStyle = {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    };

    const titleStyle = {
        marginBottom: '10px',
        fontSize: '24px',
        fontWeight: 'bold',
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
    };

    const inputStyle = {
        marginBottom: '10px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '3px',
    };

    return (
        <div style={containerStyle}>
            <h2 style={titleStyle}>Create a New Blog</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={inputStyle}
                />
                <textarea
                    rows="6"
                    placeholder="Blog"
                    value={blog}
                    onChange={(e) => setBlog(e.target.value)}
                    style={inputStyle}
                ></textarea>
                <select
                    multiple
                    value={selectedTags}
                    onChange={handleTagChange}
                    style={inputStyle}
                >
                    <option value="Tech">Tech</option>
                    <option value="Coding">Coding</option>
                    <option value="Education">Education</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Food">Food</option>
                    <option value="Sports">Sports</option>
                    <option value="Travel">Travel</option>
                    <option value="Finance">Finance</option>
                    <option value="Health">Health</option>
                </select>
                <button type="submit" className="btn btn-primary" disabled={!title || !blog || !selectedTags}>
                    Create Blog
                </button>
            </form>
        </div>
    );
}

export default NewBlog;
