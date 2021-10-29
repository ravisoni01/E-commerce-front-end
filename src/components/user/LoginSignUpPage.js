import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

import './loginSignUpPage.css'
import Loading from '../layout/loader/Loading'
import { MailOutline, LockOpen, Face, Lock } from '@material-ui/icons'
import { login, clearErrors, register } from '../../actions/userAction'

const LoginSignUpPage = ({ history, location }) => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, error, isAuthenticated } = useSelector(state => state.user)

    const loginTab = useRef(null)
    const registerTab = useRef(null)
    const switcherTab = useRef(null)

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const { name, email, password } = user

    const [avatar, setAvatar] = useState()
    const [avatarPreview, setAvatarPreview] = useState('/images/user.jpg')

    const redirect = location.search ? location.search.split('=')[1] : '/account'

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (isAuthenticated) {
            history.push(redirect)
        }
    }, [alert, dispatch, error, isAuthenticated, history, location])
    const switchTab = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral")
            switcherTab.current.classList.remove("shiftToRight")

            registerTab.current.classList.remove("shiftToNeutralForm")
            loginTab.current.classList.remove("shiftToLeft")
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight")
            switcherTab.current.classList.remove("shiftToNeutral")

            registerTab.current.classList.add("shiftToNeutralForm")
            loginTab.current.classList.add("shiftToLeft")
        }
    }
    const loginSubmit = (e) => {
        e.preventDefault()
        dispatch(login(loginEmail, loginPassword))
    }
    const registerSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData()
        myForm.set("name", name)
        myForm.set("email", email)
        myForm.set("password", password)
        myForm.set("avatar", avatar)
        dispatch(register(myForm))
    }

    const registerDataChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
        else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }
    return (
        <>
            {
                loading ? <Loading /> : (
                    <>
                        <div className="loginSignUpConatiner">
                            <div className="loginSignUpBox">
                                <div>
                                    <div className="login_signUp_toggle">
                                        <p onClick={(e) => switchTab(e, "login")}>LOGIN</p>
                                        <p onClick={(e) => switchTab(e, "register")}>REGISTER</p>
                                    </div>
                                    <button ref={switcherTab}></button>
                                </div>
                                <form className="loginForm" ref={loginTab} onSubmit={loginSubmit} >
                                    <div className="loginEmail">
                                        <MailOutline />
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            required
                                            value={loginEmail}
                                            onChange={(e) => setLoginEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="loginPassword">
                                        <LockOpen />
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            required
                                            value={loginPassword}
                                            onChange={(e) => setLoginPassword(e.target.value)}
                                        />
                                    </div>
                                    <Link to="/password/forget">Forget Password?</Link>
                                    <input
                                        type="submit"
                                        value="Login"
                                        className="loginBtn"
                                    />
                                </form>
                                <form
                                    className="signUpForm"
                                    ref={registerTab}
                                    encType="multipart/form-data"
                                    onSubmit={registerSubmit}
                                >
                                    <div className="signUpName">
                                        <Face />
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            required
                                            name="name"
                                            value={name}
                                            onChange={registerDataChange}
                                        />
                                    </div>
                                    <div className="signUpEmail">
                                        <MailOutline />
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            required
                                            name="email"
                                            value={email}
                                            onChange={registerDataChange}
                                        />
                                    </div>
                                    <div className="signUpPassword">
                                        <Lock />
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            required
                                            name="password"
                                            value={password}
                                            onChange={registerDataChange}
                                        />
                                    </div>

                                    <div id="registerImage">
                                        <img src={avatarPreview} alt="Avatar Preview" />
                                        <input
                                            type="file"
                                            name="avatar"
                                            accept="image/*"
                                            onChange={registerDataChange}
                                        />

                                    </div>
                                    <input
                                        type="submit"
                                        value="Register"
                                        className="signUpBtn"
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

export default LoginSignUpPage