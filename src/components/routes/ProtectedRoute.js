import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { loading, isAuthenticated } = useSelector(state => state.user)

    return (
        <>
            {
                !loading && (
                    <Route
                        {...rest}
                        render={(props) => {
                            if (isAuthenticated === false) {
                                return <Redirect to="/login" />
                            }
                            return <Component {...props} />
                        }}
                    />
                )
            }
        </>
    )
}

export default ProtectedRoute
