import React from 'react'
import { Link } from 'react-router-dom'

import './cartItemCart.css'

const CartItemCard = ({ item, deleteCartItems }) => {
    return (
        <div className="cartItemCard">
            <img src={item.image} alt="sdfaf" />
            <div>
                <Link to={`/product/${item.id}`} >{item.name}</Link>
                <span>{`Price:₹${item.price}`}</span>
                <p onClick={() => deleteCartItems(item.product)}>remove</p>
            </div>
        </div>
    )
}

export default CartItemCard
