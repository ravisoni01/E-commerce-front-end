import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

import './resetPassword.css'
import Loading from '../layout/loader/Loading'
import MetaData from '../layout/MetaData'
import { LockOpen, Lock, VpnKey } from '@material-ui/icons'
import { clearErrors, resetPassword } from '../../actions/userAction'


const ResetPassword = ({ match }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const alert = useAlert()

    const { error, success, loading } = useSelector(state => state.forgotPassword)

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const resetPasswordSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData()

        myForm.set("password", password)
        myForm.set("confirmPassword", confirmPassword)
        dispatch(resetPassword(match.params.token, myForm))
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (success) {
            alert.success("Password updated successfully..")

            history.push('/login')

        }
    }, [alert, dispatch, error, success, history])



    return (
        <>
            {
                loading ? <Loading /> : (
                    <>
                        <MetaData title="Update Password..." />
                        <div className="resetPasswordConatiner">
                            <div className="resetPasswordBox">
                                <h2 className="resetPasswordHeading">Update Password</h2>
                                <form
                                    className="resetPasswordForm"
                                    encType="multipart/form-data"
                                    onSubmit={resetPasswordSubmit}
                                >


                                    <div >
                                        <LockOpen />
                                        <input
                                            type="password"
                                            placeholder="New Password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
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
                                        value="Update"
                                        className="resetPasswordBtn"
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

export default ResetPassword
