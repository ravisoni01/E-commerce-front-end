import React, { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { Rating } from '@material-ui/lab'

import './productDetails.css'
import { getProductDetails, clearErrors, newReview } from "../../actions/productAction"
import ReviewCard from './ReviewCard.js'
import Loading from '../layout/loader/Loading'
import MetaData from '../layout/MetaData'
import { addToCart } from '../../actions/cartAction'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
} from '@material-ui/core'
import { NEW_REVIEW_RESET } from '../../constants/productConstant'

const ProductDetails = ({ match }) => {
    const alert = useAlert()
    const dispatch = useDispatch()
    const { loading, error, product } = useSelector(state => state.productDetails)

    const { success, error: reviewError } = useSelector((state) => state.newReview)

    const [quantity, setQuantity] = useState(1)
    const [open, setOpen] = useState(false)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")

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

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true)
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (reviewError) {
            alert.error(reviewError)
            dispatch(clearErrors())
        }
        if (success) {
            alert.success("Review Submitted Successfully")
            dispatch({
                type: NEW_REVIEW_RESET
            })
        }
        dispatch(getProductDetails(match.params.id))
    }, [dispatch, match.params.id, error, alert, success, reviewError])

    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5
    }

    const reviewSubmitHandler = () => {
        const myForm = new FormData()

        myForm.set("rating", rating)
        myForm.set("comment", comment)
        myForm.set("productId", match.params.id)
        dispatch(newReview(myForm))
        setOpen(false)
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
                                <Rating {...options} />
                                <span className="details_block_2-span">({product.numOfReviews} reviews)</span>
                            </div>

                            <div className="details_block_3">
                                <h1>{`₹${product.price}`}</h1>
                                <div className="details_block_3_1">
                                    <div className="details_block_3_1_1">
                                        <button onClick={decreaseQuantity} >-</button>
                                        <input readOnly value={quantity} type="number" />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>{" "}
                                    <button disable={product.stock < 1 ? true : false} onClick={addToCartHandler} >Add To Cart</button>
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

                            <button onClick={submitReviewToggle} className="submitReview" >Submit Review</button>
                        </div>
                    </div>

                    <h3 className="reviewsHeading">REVIEWS</h3>

                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className="submitDialog">
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                            />

                            <textarea
                                className="submitDialogTextArea"
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            >
                            </textarea>
                        </DialogContent>
                        <DialogActions>
                            <Button color="secondary" onClick={submitReviewToggle} >Cancel</Button>
                            <Button color="primary" onClick={reviewSubmitHandler} >Submit</Button>
                        </DialogActions>
                    </Dialog>


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
