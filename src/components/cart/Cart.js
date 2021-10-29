import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RemoveShoppingCart } from '@material-ui/icons'

import './cart.css'
import CartItemCard from './CartItemCard'
import { addToCart, removeItemFromCart } from '../../actions/cartAction'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const Cart = ({ history }) => {

    const dispatch = useDispatch()
    const { cartItems } = useSelector(state => state.cart)

    const increaseQty = (id, quantity, stock) => {
        const qty = quantity + 1
        if (stock <= quantity) {
            return
        }
        dispatch(addToCart(id, qty))
    }
    const decreaseQty = (id, quantity) => {
        const qty = quantity - 1
        if (1 >= quantity) {
            return
        }
        dispatch(addToCart(id, qty))
    }

    const deleteCartItems = (id) => {
        dispatch(removeItemFromCart(id))
    }

    const checkOutHandler = () => {
        history.push('/login?redirect=shipping')
    }
    return (
        <>
            {
                cartItems.length === 0 ? (

                    <div className="emptyCart">
                        <RemoveShoppingCart />

                        <Typography>
                            No Product in Your Cart
                        </Typography>
                        <Link to="/products" >View Product</Link>
                    </div>

                ) : (
                    <>
                        <div className="cartPage">
                            <div className="cartHeader">
                                <p>Product</p>
                                <p>Quantity</p>
                                <p>SubTotal</p>
                            </div>

                            {
                                cartItems && cartItems.map((item) => (
                                    <div className="cartContainer" key={item.product}>
                                        <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                                        <div className="cartInput">
                                            <button onClick={() => decreaseQty(item.product, item.quantity)}>-</button>
                                            <input type="number" readOnly value={item.quantity} />
                                            <button onClick={() => increaseQty(item.product, item.quantity, item.stock)} >+</button>
                                        </div>
                                        <p className="cartSubTotal">
                                            {
                                                `₹${item.price * item.quantity}`
                                            }
                                        </p>
                                    </div>
                                ))
                            }

                            <div className="cartGrossProfit">
                                <div></div>
                                <div className="cartGrossProfitBox">
                                    <p>Gross Total</p>
                                    <p>{`₹${cartItems.reduce(
                                        (acc, item) => acc + item.quantity * item.price, 0

                                    )}`}</p>
                                </div>
                                <div></div>
                                <div className="checkOutBtn">
                                    <button onClick={checkOutHandler} >Check Out</button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Cart
