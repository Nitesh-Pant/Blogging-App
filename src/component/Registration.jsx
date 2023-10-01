import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { localURL1, localURL2 } from '../api'

function Registration() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();


    const submitForm = (e) => {
        e.preventDefault();
        console.log({ username, password });
        const data = { username, password };

        fetch(`${localURL1}users/register`, {
            method: 'POST',
            headers: {
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
                alert(responseJson.message);
                navigate('/login');
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                alert('An error occurred during login');
            });
    };

    return (
        <div style={{
            width: '50%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: '5px 10px #888888',
        }}>
            <form onSubmit={(e) => submitForm(e)} className="login-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <small id="usernameHelp" className="form-text text-muted">
                        We'll never share your username with anyone else.
                    </small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="checkMeOut" />
                    <label className="form-check-label" htmlFor="checkMeOut">
                        Check me out
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Registration