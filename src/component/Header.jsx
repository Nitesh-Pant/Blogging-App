import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {localURL1, localURL2} from '../api'

function Header() {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const local = localStorage.getItem('userId')
        const token = localStorage.getItem('bloggingToken')
        fetch(`${localURL1}users/me?userId=${local}`, {
            method: 'GET',
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
                console.log(responseJson)
                setUserData(responseJson[0]);
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                alert('An error occurred during login');
            });
    }, [])
    return (
        <div>
            <nav className="navbar navbar-light" style={{ backgroundColor: "#e3f2fd" }}>
                <Link to={`/profile/${userData.id}`}>
                    <a className="navbar-brand" >{userData.username}</a>
                </Link>
                <Link to={`/home`}>
                    <h2>Blogging-App</h2>
                </Link>
                <Link to="/new-blog">
                    <button type="button" className="btn btn-success">New Blog</button>
                </Link>

            </nav>
        </div>
    )
}

export default Header