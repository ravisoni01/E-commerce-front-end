import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
    const { loading, isAuthenticated, user } = useSelector(state => state.user)

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

                            if (isAdmin === true && user.role !== "admin") {
                                return <Redirect to="/account" />
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
