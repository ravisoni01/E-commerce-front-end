import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { useAlert } from 'react-alert'

import MetaData from '../layout/MetaData'
import Loading from '../layout/loader/Loading'
import { getOrderDetails, clearErrors } from '../../actions/orderAction'
import './orderDetails.css'

const OrdersDetail = ({ match }) => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, order, error } = useSelector(state => state.orderDetails)



    const data = () => {



        console.log(order.shippingInfo.phoneNo)
        // setVal(order.shippingInfo.phoneNo)
    }
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getOrderDetails(match.params.id))

    }, [dispatch, alert, match.params.id, error])
    return (
        <>
            {
                loading ? <Loading /> : (
                    <>
                        <MetaData title="Order Details" />

                        <div className="orderDetailsPage">
                            <div className="orderDetailsContainer">
                                <Typography component="h1">
                                    Order ${order && order._id}
                                </Typography>
                                <Typography>
                                    Shipping Info
                                </Typography>
                                <div className="orderDetailsContainerBox">
                                    <div>
                                        <p>Phone:</p>
                                        <span>{order && order.shippingInfo.phoneNo}</span>
                                    </div>




                                    <div>
                                        <p>Address:</p>
                                        <span>
                                            {order && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                                        </span>
                                    </div>
                                </div>
                                <Typography>Payment</Typography>
                                <div className="orderDetailsContainerBox">
                                    <div>
                                        <p
                                            className={
                                                order && order.paymentInfo.status === "succeeded"
                                                    ? "greenColor" : "redColor"
                                            }
                                        >
                                            {
                                                order && order.paymentInfo.status === "succeeded"
                                                    ? "PAID" : "NOT PAID"
                                            }
                                        </p>
                                    </div>
                                    <div>
                                        <p>Amount:</p>
                                        <span>{order && order.totalPrice}</span>
                                    </div>

                                    <Typography>Order Status:</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div style={{ margin: 0 }}>
                                            <p className={
                                                order && order.paymentInfo.status === "Delivered"
                                                    ? "greenColor" : "redColor"
                                            }
                                            >
                                                {order && order.orderStatus}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="orderDetailsCartItems">
                                        <p className="orderItemHeading">Order Items:</p>
                                        <div className="orderDetailsCartItemsContainer">
                                            {
                                                order &&
                                                order.orderItems.map((item) => (
                                                    <div key={item.product}>
                                                        <img src={item.image} alt="product" />
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>{" "}
                                                        <span>
                                                            {item.quantity} X {item.price} =
                                                            <b>{item.price * item.quantity}</b>
                                                        </span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default OrdersDetail
