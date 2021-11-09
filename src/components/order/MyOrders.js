import React, { useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { Launch } from '@material-ui/icons'

import { clearErrors, myOrders } from '../../actions/orderAction'
import Loading from '../layout/loader/Loading'
import MetaData from '../layout/MetaData'
import './myOrders.css'

const MyOrders = () => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, error, orders } = useSelector(state => state.myOrders)
    const { user } = useSelector(state => state.user)

    const columns = [
        { field: "id", headerName: "Orders ID", minWidth: 270, flex: 1 },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered"
                    ? "greenColor"
                    : "redColor"
            }
        },
        { field: "itemQty", headerName: "Items Qty", type: "number", minWidth: 150, flex: 0.3 },
        { field: "amount", headerName: "Amount", type: "number", minWidth: 270, flex: 0.5 },
        {
            field: "actions",
            headerName: "Actions",
            type: "number",
            minWidth: 150,
            flex: 0.3,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/order/${params.getValue(params.id, "id")}`}>
                        <Launch />
                    </Link>
                )
            }
        }
    ]
    const rows = []
    orders && orders.forEach((item, index) => {
        rows.push({
            itemQty: item.orderItems.length,
            id: item._id,
            status: item.orderStatus,
            amount: item.totalPrice
        })
    });

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(myOrders())
    }, [dispatch, alert, error])


    return (
        <>
            <MetaData title={`${user.name} - Orders`} />
            {
                loading ? <Loading /> : (
                    <div className="myOrdersPage">
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            className="myOrdersTable"
                            autoHeight
                        />
                        <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
                    </div>



                )
            }
        </>
    )
}

export default MyOrders
