import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DataGrid } from '@material-ui/data-grid'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../layout/MetaData'
import { Edit, Delete } from '@material-ui/icons'

import { clearErrors, getAllAdminProducts, deleteProduct } from '../../actions/productAction'
import './SideBar'
import './productList.css'
import SideBar from './SideBar'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstant'

const ProductList = ({ history }) => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const { error, products } = useSelector(state => state.products)
    const { error: deleteError, isDeleted } = useSelector(state => state.deleteProduct)

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }
        if (isDeleted) {
            alert.success("Product Deleted Successfully.")
            history.push('/admin/dashboard')
            dispatch({ type: DELETE_PRODUCT_RESET })
        }

        dispatch(getAllAdminProducts())
    }, [dispatch, error, alert, isDeleted, history, deleteError])

    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
        {
            field: "name",
            headerName: "Name",
            minWidth: 300,
            flex: 1
        },
        { field: "stock", headerName: "Stock", type: "number", minWidth: 150, flex: 0.3 },
        { field: "price", headerName: "Price", type: "number", minWidth: 150, flex: 0.5 },
        {
            field: "actions",
            headerName: "Actions",
            type: "number",
            minWidth: 150,
            flex: 0.3,
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/admin/products/${params.getValue(params.id, "id")}`}>
                            <Edit />
                        </Link>
                        <Delete onClick={() => deleteProductHandler(params.getValue(params.id, "id"))} />
                    </>
                )
            }
        }
    ]

    const rows = []

    products && products.forEach(item => {
        rows.push({
            id: item._id,
            stock: item.stock,
            price: item.price,
            name: item.name
        })
    });

    return (
        <>
            <MetaData title="All Products - Admin" />

            <div className="dashboard">
                <SideBar />

                <div className="productListContainer">
                    <h1 id="productListHeading" >All Products</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </>
    )
}

export default ProductList
