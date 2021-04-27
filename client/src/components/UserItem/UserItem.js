import React from 'react';
import { Link } from 'react-router-dom';
import './UserItem.css';

const UserItem = props => {
    const defaultImg = 'https://cdn1.vectorstock.com/i/1000x1000/51/05/male-profile-avatar-with-brown-hair-vector-12055105.jpg';

    return (
        <li>
            <Link to={`/${props.id}/places`} style={{ textDecoration: 'none' }}>
                <div className="user-card">
                    <div className="center">
                        <img src={props.image || defaultImg} alt={'img'}/>
                    </div>
                    <div>
                        <h3>{props.name}</h3>
                        <small>Email: {props.email}</small>
                    </div>
                </div>
            </Link>
        </li>
    )
}

export default UserItem;