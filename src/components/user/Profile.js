import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import MetaData from '../layout/MetaData'
import Loading from '../layout/loader/Loading'
import './profile.css'

const Profile = () => {
    const { user, loading, isAuthenticated } = useSelector(state => state.user)
    const history = useHistory()
    useEffect(() => {
        if (isAuthenticated === false) {
            history.push('/login')
        }
    }, [history, isAuthenticated])
    return (
        <>
            {
                loading ? <Loading /> : (
                    <>
                        <MetaData title={user.name} />
                        <div className="profileContainer">
                            <div>
                                <h1>
                                    My Profile
                                </h1>
                                <img src={user.avatar.url} alt="profile" />
                                <Link to="/me/update" >Edit Profile</Link>
                            </div>
                            <div>
                                <div>
                                    <h4>Full Name</h4>
                                    <p>{user.name}</p>
                                </div>
                                <div>
                                    <h4>Email</h4>
                                    <p>{user.email}</p>
                                </div>
                                <div>
                                    <h4>Joined On</h4>
                                    <p>{String(user.createdAt).substr(0, 10)}</p>
                                </div>

                                <div>
                                    <Link to="/orders">My Orders</Link>
                                    <Link to="/password/update">Change Password</Link>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Profile
