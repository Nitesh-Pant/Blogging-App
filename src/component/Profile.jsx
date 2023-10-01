import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useParams } from 'react-router-dom';
import {localURL1, localURL2} from '../api'

function Profile() {
    const { userId } = useParams();
    const [blogs, setBlogs] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('bloggingToken')

        fetch(`${localURL1}users/profile?userId=${userId}`, {
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
    }, []);

    if (!blogs) {
        return <div>Loading...</div>;
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
                {blogs &&
                    blogs.map((item, index) => (
                        <div key={index} style={blogContainerStyle} className={`card text-white bg-${color[Math.floor(Math.random() * 7)]} mb-3`}>
                            <h1 style={headingStyle}>{item.title}<span className="badge badge-secondary">New</span></h1>
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
                                    <span><b>{item.username}</b></span>
                                </div>
                                <div>
                                    <span>{formatDate(item.created_at)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Profile;
