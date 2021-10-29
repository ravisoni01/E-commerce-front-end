import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'

import './products.css'
import { clearErrors, getProduct } from '../../actions/productAction'
import Loading from '../layout/loader/Loading'
import ProductCard from '../home/ProductCard'
import MetaData from '../layout/MetaData'

const Products = ({ match }) => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 25000])
    const [category, setCategory] = useState("")
    const [ratings, setRatings] = useState(0)

    const { products, loading, error, productsCount, resultPerPage } = useSelector(state => state.products)
    const keyword = match.params.keyword
    console.log(productsCount)
    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice)
    }
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings))
    }, [dispatch, alert, error, keyword, currentPage, price, category, ratings])

    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Top",
        "Attire",
        "Camera",
        "SmartPhone"
    ]
    return (
        <>
            {
                loading ? <Loading /> : (
                    <>
                        <MetaData title="Products.." />
                        <div>
                            <h2 className="productsHeading">Products</h2>
                            <div className="products">
                                {
                                    products && products.map((product) => (
                                        <ProductCard key={product._id} product={product} />
                                    ))
                                }
                            </div>
                        </div>


                        {
                            keyword &&
                            <>
                                <div className="filterBox">
                                    <Typography>Price</Typography>
                                    <Slider
                                        value={price}
                                        onChange={priceHandler}
                                        valueLabelDisplay="auto"
                                        aria-labelledby="range-slider"
                                        min={0}
                                        max={25000}
                                    />
                                </div>

                                <Typography className="categorytitle">Categories</Typography>
                                <ul className="categoryBox">
                                    {
                                        categories.map((category) => (
                                            <li
                                                className="category-link"
                                                key={category}
                                                onClick={() => setCategory(category)}
                                            >
                                                {category}
                                            </li>
                                        ))
                                    }
                                </ul>

                                <fieldset className="field">
                                    <Typography component="legend">Ratings Above</Typography>
                                    <Slider
                                        value={ratings}
                                        onChange={(e, newRating) => {
                                            setRatings(newRating);
                                        }}
                                        aria-labelledby="continuous-slider"
                                        valueLabelDisplay="auto"
                                        min={0}
                                        max={5}
                                    />
                                </fieldset>
                            </>
                        }

                        {
                            resultPerPage < productsCount && (
                                <div className="paginationBox">
                                    <Pagination
                                        activePage={currentPage}
                                        itemsCountPerPage={resultPerPage}
                                        totalItemsCount={productsCount}
                                        onChange={setCurrentPageNo}
                                        nextPageText="Next"
                                        prevPageText="Prev"
                                        firstPageText="1st"
                                        lastPageText="Last"
                                        itemClass="page-item"
                                        linkClass="page-link"
                                        activeClass="pageItemActive"
                                        activeLinkClass="pageLinkActive"
                                    />

                                </div>
                            )
                        }
                    </>
                )
            }
        </>
    )
}

export default Products
