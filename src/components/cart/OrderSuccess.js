import React from 'react'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { CheckCircle } from '@material-ui/icons'

import './success.css'

const OrderSuccess = () => {
    return (
        <div className="orderSuccess">
            <CheckCircle />
            <Typography>
                Your Order has been Placed successfully
            </Typography>

            <Link to="/order/me" >View Orders</Link>
        </div>
    )
}

export default OrderSuccess
