import React, { useEffect } from 'react'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Doughnut, Line } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'

import SideBar from './SideBar.js'
import { getAllAdminProducts, clearErrors } from '../../actions/productAction'
import './dashboard.css'

const Dashboard = () => {

    const { products } = useSelector(state => state.products)
    const dispatch = useDispatch()

    let outOfStock = 0

    products && products.forEach(item => {
        if (item.stock === 0) {
            outOfStock += 1
        }
    });

    useEffect(() => {
        dispatch(getAllAdminProducts())
    }, [dispatch])

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "Total Amount",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgba(197,72,50)"],
                data: [0, 4000]
            }
        ]
    }

    const doughtnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
            {
                backgroundColor: ["#101820FF", "#F2AA4CFF"],
                hoverBackgroundColor: ["#CC313D", "#F7C5CC"],
                data: [outOfStock, products.length - outOfStock]
            }
        ]
    }

    return (
        <div className="dashboard">
            <SideBar />
            <div className="dashboardContainer">
                <Typography variant="h1" >Dashboard</Typography>

                <div className="dashboardSummary">
                    <div>
                        <p>
                            Total Amount <br /> 1000
                        </p>
                    </div>

                    <div className="dashboardSummaryBox2">
                        <Link to="/admin/products">
                            <p>Product</p>
                            <p>{products && products.length}</p>
                        </Link>

                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>4</p>
                        </Link>

                        <Link to="/admin/users" >
                            <p>
                                Users
                            </p>
                            <p>2</p>
                        </Link>
                    </div>
                </div>

                <div className="lineChart">
                    <Line
                        data={lineState}
                    />
                </div>
                <div className="doughnutChart">
                    <Doughnut
                        data={doughtnutState}
                    />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
