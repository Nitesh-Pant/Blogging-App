import React, { useEffect, useState } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import { localURL1, localURL2 } from '../api'

function Home() {
    const [blogs, setBlogs] = useState(null);
    const [selectedTag, setSelectedTag] = useState('All')
    const [search, setSearch] = useState(null)
    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('bloggingToken')

        fetch(`${localURL1}blog/getBlogs?tag=${selectedTag}`, {
            method: 'Get',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((responseJson) => {
                setBlogs(responseJson);
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                alert('An error occurred during login');
            });
    }, [selectedTag]);

    const searchCall = () => {
        const token = localStorage.getItem('bloggingToken')

        fetch(`${localURL1}blog/searchBlogs?query=${search}`, {
            method: 'Get',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((responseJson) => {
                setBlogs(responseJson);
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                alert('An error occurred during login');
            });
    }

    const blogContainerStyle = {
        border: '1px solid #ccc',
        padding: '16px',
        marginBottom: '16px',
        margin: '16px 35px 16px 35px    '
    };

    const headingStyle = {
        fontSize: '24px',
        marginBottom: '8px',
    };

    const infoContainerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '8px',
    };

    const leftInfoStyle = {
        marginRight: '16px',
    };

    const tags = [
        'All',
        'Education',
        'Coding',
        'Tech',
        'Lifestyle',
        'Fashion',
        'Food',
        'Sports',
        'Travel',
        'Health',
        'Finance'
    ]

    const color = [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'dark'
    ]

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short',
        };
        return new Date(dateString).toLocaleString('en-US', options);
    };

    return (
        <div>
            <Header />
            <div>
                <div style={{ margin: '10px 0px' }}>
                    <input className="form-control" type="search" placeholder="Search" style={{ width: '300px', display: 'inline-block' }} onChange={(e) => setSearch(e.target.value)} />
                    <button type="button" className="btn btn-primary" onClick={() => searchCall()}>Search</button>
                </div>
                <br></br>
                {tags.map((tag) => (
                    <div key={tag} style={{ display: 'flex', display: 'inline-block', margin: '5px', backgroundColor: selectedTag === tag ? 'lightgrey' : 'transparent', border: '1px solid black', padding: '5px' }} onClick={() => setSelectedTag(tag)}>{tag}</div>
                ))}
            </div>
            {blogs &&
                blogs.map((item, index) => (
                    <div key={index} style={blogContainerStyle} className={`card text-white bg-${color[Math.floor(Math.random() * 7)]} mb-3`}>
                        <h1 style={headingStyle}>{item.title}
                            <span className="badge badge-light" style={{ border: '1px solid' }}>New</span></h1>
                        <p>
                            {isExpanded || item.blog.length <= 500 ? (
                                item.blog
                            ) : (
                                item.blog.length > 500 ? (
                                    <span>
                                        {item.blog.slice(0, 500)}
                                        <span onClick={() => setIsExpanded(true)}>... view full blog</span>
                                    </span>
                                ) : (
                                    item.blog
                                ))
                            }
                        </p>
                        <div style={infoContainerStyle}>
                            <div style={leftInfoStyle}>
                                <Link to={`/profile/${item.userId}`}>
                                    <span style={{ color: 'white' }}><b>{item.username}</b></span>
                                </Link>
                            </div>
                            <div>
                                <span>{formatDate(item.created_at)}</span>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default Home;
