import React, { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from 'react-rating-stars-component'
import { useAlert } from 'react-alert'

import './productDetails.css'
import { getProductDetails, clearErrors } from "../../actions/productAction"
import ReviewCard from './ReviewCard.js'
import Loading from '../layout/loader/Loading'
import MetaData from '../layout/MetaData'
import { addToCart } from '../../actions/cartAction'

const ProductDetails = ({ match }) => {
    const alert = useAlert()
    const dispatch = useDispatch()
    const { loading, error, product } = useSelector(state => state.productDetails)

    const [quantity, setQuantity] = useState(1)

    const increaseQuantity = () => {
        if (product.stock <= quantity) return
        const qty = quantity + 1
        setQuantity(qty)
    }

    const decreaseQuantity = () => {
        if (1 >= quantity) return
        const qty = quantity - 1
        setQuantity(qty)
    }

    const addToCartHandler = () => {
        dispatch(addToCart(match.params.id, quantity))
        alert.success("Item Added To Cart")
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProductDetails(match.params.id))
    }, [dispatch, match.params.id, error, alert])

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        value: product.ratings,
        isHalf: true,
        size: window.innerWidth < 600 ? 20 : 25
    }

    return (
        <>
            {loading ? <Loading /> : (
                <>
                    <MetaData title={`${product.name}`} />
                    <div className="productDetail">
                        <div>
                            <Carousel>
                                {product.images &&
                                    product.images.map((item, i) => (
                                        <img className="carouselImg"
                                            key={item.url}
                                            src={item.url}
                                            alt={`${i} slide`}
                                        />
                                    ))
                                }
                            </Carousel>
                        </div>
                        <div>
                            <div className="details_block_1">
                                <h2>{product.name}</h2>
                                <p>Product #{product._id}</p>
                            </div>
                            <div className="details_block_2">
                                <ReactStars {...options} />
                                <span>({product.numOfReviews} reviews)</span>
                            </div>

                            <div className="details_block_3">
                                <h1>{`₹${product.price}`}</h1>
                                <div className="details_block_3_1">
                                    <div className="details_block_3_1_1">
                                        <button onClick={decreaseQuantity} >-</button>
                                        <input readOnly value={quantity} type="number" />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>{" "}
                                    <button onClick={addToCartHandler} >Add To Cart</button>
                                </div>
                                <p className={product.stock < 1 ? "redColor" : "greenColor"}>
                                    Status:{" "}
                                    <b>
                                        {
                                            product.stock < 1 ? "OutOfStock" : "InStock"
                                        }
                                    </b>
                                </p>
                            </div>

                            <div className="details_block_4">
                                Description : <p>{product.description}</p>
                            </div>

                            <button className="submitReview" >Submit Review</button>
                        </div>
                    </div>

                    <h3 className="reviewsHeading">REVIEWS</h3>
                    {
                        product.reviews && product.reviews[0] ? (
                            <div className="reviews">
                                {
                                    product.reviews && product.reviews.map(((review) => <ReviewCard review={review} />))
                                }
                            </div>
                        ) : (
                            <p className="noReviews" >
                                No Reviews Yet
                            </p>
                        )
                    }
                </>
            )}
        </>
    )
}

export default ProductDetails
