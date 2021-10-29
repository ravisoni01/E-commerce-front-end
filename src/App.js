import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import WebFont from 'webfontloader';
import { useDispatch, useSelector } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js'

import './App.css';
import Header from './components/layout/header/Header'
import Footer from './components/layout/footer/Footer'
import Home from './components/home/Home.js'
import ProductDetails from './components/product/ProductDetails.js'
import Products from './components/product/Products.js'
import Search from './components/product/Search.js'
import LoginSignUpPage from './components/user/LoginSignUpPage';
import { loadUser } from './actions/userAction';
import UserOptions from './components/layout/header/UserOptions.js'
import Profile from './components/user/Profile'
import UpdateProfile from './components/user/UpdateProfile.js'
import UpdatePassword from './components/user/UpdatePassword.js'
import ForgotPassword from './components/user/ForgotPassword.js'
import ResetPassword from './components/user/ResetPassword.js'
import Cart from './components/cart/Cart.js'
import Shipping from './components/cart/Shipping.js'
import ConfirmOrder from './components/cart/ConfirmOrder.js'
import Payment from './components/cart/Payment.js'
import ProtectedRoute from './components/routes/ProtectedRoute'
import OrderSuccess from './components/cart/OrderSuccess.js'
import MyOrders from './components/order/MyOrders'

function App() {
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useSelector(state => state.user)

  const [stripeApiKey, setStripeApiKey] = useState("")

  async function getStripeApiKey() {
    const { data } = await axios.get('/api/v1/stripeapikey')
    setStripeApiKey(data.stripeApiKey)
    console.log(data)
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto"]
      }
    })

    dispatch(loadUser())
    getStripeApiKey()
  }, [])
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Route exact path='/' component={Home} />
      <Route exact path='/product/:id' component={ProductDetails} />
      <Route exact path='/products' component={Products} />
      <Route path='/products/:keyword' component={Products} />
      <Route exact path='/search' component={Search} />
      <Route exact path='/login' component={LoginSignUpPage} />

      <ProtectedRoute exact path='/account' component={Profile} />
      <ProtectedRoute exact path='/me/update' component={UpdateProfile} />
      <ProtectedRoute exact path='/password/update' component={UpdatePassword} />

      <Route exact path='/password/forget' component={ForgotPassword} />
      <Route exact path='/password/reset/:token' component={ResetPassword} />

      <Route exact path='/cart' component={Cart} />

      <ProtectedRoute exact path='/shipping' component={Shipping} />
      <ProtectedRoute exact path='/order/confirm' component={ConfirmOrder} />

      {
        stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute exact path='/process/payment' component={Payment} />
          </Elements>
        )
      }

      <ProtectedRoute exact path='/success' component={OrderSuccess} />
      <ProtectedRoute exact path='/orders' component={MyOrders} />

      <Footer />
    </Router>
  );
}

export default App;
