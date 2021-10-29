import React, { useState } from 'react'
import { SpeedDial, SpeedDialAction } from '@material-ui/lab'
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { ShoppingCart } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { logout } from '../../../actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import { Backdrop } from '@material-ui/core';
import './userOptions.css'

const UserOptions = ({ user }) => {
    const [open, setOpen] = useState(false)
    const history = useHistory()
    const alert = useAlert()
    const dispatch = useDispatch()
    const { cartItems } = useSelector(state => state.cart)

    const options = [
        { icon: <ListAltIcon />, name: "Orders", fun: orders },
        { icon: <PersonIcon />, name: "Profile", fun: profile },
        { icon: <ShoppingCart style={{ color: cartItems.length > 0 ? "tomato" : "unset" }} />, name: `Cart(${cartItems.length})`, fun: cart },
        { icon: <ExitToAppIcon />, name: "Logout", fun: logoutUser },
    ]
    if (user.role === "admin") {
        options.unshift({
            icon: <DashboardIcon />,
            name: "Dashboard",
            fun: dashboard
        })
    }

    function orders() {
        history.push('/orders')
    }
    function logoutUser() {
        alert.success("Logout Successfully")
        dispatch(logout())
    }
    function profile() {
        history.push('/account')
    }
    function dashboard() {
        history.push('/dashboard')
    }
    function cart() {
        history.push('/cart')
    }
    return (
        <>
            <Backdrop open={open} style={{ zIndex: "10" }} />
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction="down"
                className="speedDial"
                icon={
                    <img src={user.avatar.url ? user.avatar.url : './images/user.jpg'} alt="profile" className="speedDialIcon" />
                }
            >
                {
                    options.map(item => <SpeedDialAction
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.fun}
                        tooltipOpen={window.innerWidth < 600 ? true : false}
                    />)
                }

            </SpeedDial>
        </>
    )
}

export default UserOptions
