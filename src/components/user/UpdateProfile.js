import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

import './updateProfile.css'
import Loading from '../layout/loader/Loading'
import MetaData from '../layout/MetaData'
import { MailOutline, LockOpen, Face } from '@material-ui/icons'
import { clearErrors, loadUser, updateProfile } from '../../actions/userAction'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstant'

const UpdateProfile = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const alert = useAlert()
    const [avatar, setAvatar] = useState()
    const [avatarPreview, setAvatarPreview] = useState('/images/user.jpg')

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const { user } = useSelector(state => state.user)
    const { error, isUpdated, loading } = useSelector(state => state.profile)

    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setAvatarPreview(user.avatar.url)
        }
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (isUpdated) {
            alert.success("Profile update successfully..")
            dispatch(loadUser())
            history.push('/account')
            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }
    }, [alert, dispatch, error, isUpdated, history, user])

    const updateProfileSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData()
        myForm.set("name", name)
        myForm.set("email", email)
        myForm.set("avatar", avatar)
        dispatch(updateProfile(myForm))
    }

    const updateProfileDataChange = (e) => {

        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])


    }
    return (

        <>
            {
                loading ? <Loading /> : (
                    <>
                        <MetaData title="Update Profile..." />
                        <div className="updateProfileConatiner">
                            <div className="updateProfileBox">
                                <h2 className="updateProfileHeading">Update Profile</h2>
                                <form
                                    className="updateProfileForm"
                                    encType="multipart/form-data"
                                    onSubmit={updateProfileSubmit}
                                >
                                    <div className="updateProfileName">
                                        <Face />
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            required
                                            name="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="updateProfileEmail">
                                        <MailOutline />
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            required
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>


                                    <div id="updateProfileImage">
                                        <img src={avatarPreview} alt="Avatar Preview" />
                                        <input
                                            type="file"
                                            name="avatar"
                                            accept="image/*"
                                            onChange={updateProfileDataChange}
                                        />

                                    </div>
                                    <input
                                        type="submit"
                                        value="Update"
                                        className="updateProfileBtn"
                                        disabled={loading ? true : false}
                                    />
                                </form>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default UpdateProfile
