import React, { useEffect } from 'react'
import { CgMouse } from 'react-icons/all'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

import './home.css'
import ProductCard from './ProductCard'
import MetaData from '../layout/MetaData'
import { getProduct, clearErrors } from '../../actions/productAction'
import Loading from '../layout/loader/Loading'

const Home = () => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const { loading, error, products } = useSelector(state => state.products)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProduct())
    }, [dispatch, error, alert])


    return (
        <>
            {
                loading ? <Loading /> : (
                    <>
                        <MetaData title="Ecommerce App" />
                        <div className="banner">
                            <p>Welcome to Ecommerce</p>
                            <h1>Find Amazing Products Here</h1>
                            <a href="#container" >
                                <button>
                                    Scroll <CgMouse />
                                </button>
                            </a>
                        </div>
                        <h1 className="homeHeading">Featured Products</h1>

                        <div className="container" id="container">
                            {
                                products && products.map((product) => <ProductCard product={product} />)
                            }

                        </div>
                    </>
                )
            }
        </>
    )
}

export default Home
