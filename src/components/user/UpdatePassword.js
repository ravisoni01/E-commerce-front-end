import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

import './updatePassword.css'
import Loading from '../layout/loader/Loading'
import MetaData from '../layout/MetaData'
import { LockOpen, Lock, VpnKey } from '@material-ui/icons'
import { clearErrors, updatePassword } from '../../actions/userAction'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstant'

const UpdatePassword = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const alert = useAlert()

    const { error, isUpdated, loading } = useSelector(state => state.profile)

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (isUpdated) {
            alert.success("Profile update successfully..")

            history.push('/account')
            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }
    }, [alert, dispatch, error, isUpdated, history])

    const updatePasswordSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData()

        myForm.set("oldPassword", oldPassword)
        myForm.set("newPassword", newPassword)
        myForm.set("confirmPassword", confirmPassword)

        dispatch(updatePassword(myForm))
    }


    return (
        <>
            {
                loading ? <Loading /> : (
                    <>
                        <MetaData title="Update Password..." />
                        <div className="updatePasswordConatiner">
                            <div className="updatePasswordBox">
                                <h2 className="updatePasswordHeading">Update Profile</h2>
                                <form
                                    className="updatePasswordForm"
                                    encType="multipart/form-data"
                                    onSubmit={updatePasswordSubmit}
                                >

                                    <div className="signUpPassword">
                                        <VpnKey />
                                        <input
                                            type="password"
                                            placeholder="Old Password"
                                            required
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                        />
                                    </div>

                                    <div className="signUpPassword">
                                        <LockOpen />
                                        <input
                                            type="password"
                                            placeholder="New Password"
                                            required
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>

                                    <div className="signUpPassword">
                                        <Lock />
                                        <input
                                            type="password"
                                            placeholder="Confirm Password"
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>



                                    <input
                                        type="submit"
                                        value="Change"
                                        className="updatePasswordBtn"
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

export default UpdatePassword
