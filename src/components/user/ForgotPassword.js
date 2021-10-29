import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

import './forgotPassword.css'
import Loading from '../layout/loader/Loading'
import MetaData from '../layout/MetaData'
import { MailOutline } from '@material-ui/icons'
import { clearErrors, forgotPassword } from '../../actions/userAction'


const ForgotPassword = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const alert = useAlert()

    const [email, setEmail] = useState("")

    const { error, message, loading } = useSelector(state => state.forgotPassword)


    const forgotPasswordSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData()
        myForm.set("email", email)
        dispatch(forgotPassword(myForm))
    }

    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (message) {
            alert.success(message)
        }


    }, [alert, dispatch, message, error])

    return (
        <>
            {
                loading ? <Loading /> : (
                    <>
                        <MetaData title="Forgot Password..." />
                        <div className="forgotPasswordConatiner">
                            <div className="forgotPasswordBox">
                                <h2 className="forgotPasswordHeading">Forgot Password</h2>
                                <form
                                    className="forgotPasswordForm"
                                    onSubmit={forgotPasswordSubmit}
                                >

                                    <div className="forgotPasswordEmail">
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



                                    <input
                                        type="submit"
                                        value="Send"
                                        className="forgotPasswordBtn"
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

export default ForgotPassword
