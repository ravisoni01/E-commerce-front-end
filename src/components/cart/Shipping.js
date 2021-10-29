import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PinDrop, Home, LocationCity, Phone, TransferWithinAStation, Public } from '@material-ui/icons'
import { Country } from 'country-state-city'
import { useAlert } from 'react-alert'

import './shipping.css'
import { saveShippingInfo } from '../../actions/cartAction'
import CheckOutSteps from './CheckOutSteps.js'
import MetaData from '../layout/MetaData'

const Shipping = ({ history }) => {

    const dispatch = useDispatch()

    const { shippingInfo } = useSelector(state => state.cart)
    const alert = useAlert()

    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [state, setState] = useState(shippingInfo.state)
    const [country, setCountry] = useState(shippingInfo.country)
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)

    const shippingSubmit = (e) => {
        e.preventDefault()
        if (phoneNo.length < 10 || phoneNo.length > 10) {
            alert.error("Phone Number Should be 10 digit")
            return
        }
        dispatch(saveShippingInfo({ address, city, state, country, pinCode, phoneNo }))
        history.push('/order/confirm')
    }
    return (
        <>
            <MetaData title="Shipping Details" />

            <CheckOutSteps activeStep={0} />

            <div className="shippingContainer">
                <div className="shippingBox">
                    <h2 className="shippingHeading">Shipping Details</h2>

                    <form
                        className="shippingForm"
                        encType="multipart/form-data"
                        onSubmit={shippingSubmit}
                    >
                        <div>
                            <Home />
                            <input
                                type="text"
                                placeholder="Address"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        <div>
                            <LocationCity />
                            <input
                                type="text"
                                placeholder="City"
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>

                        <div>
                            <PinDrop />
                            <input
                                type="text"
                                placeholder="Pin Code"
                                required
                                value={pinCode}
                                onChange={(e) => setPinCode(e.target.value)}
                            />
                        </div>

                        <div>
                            <Phone />
                            <input
                                type="number"
                                placeholder="Phone Number"
                                required
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                            />
                        </div>

                        <div>
                            <Public />
                            <select
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="">Country</option>
                                {
                                    Country && Country.getAllCountries().map((item) => (
                                        <option value={item.isoCode} key={item.isoCode}>

                                            {item.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div>
                            <TransferWithinAStation />
                            <input
                                type="text"
                                placeholder="State"
                                required
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </div>

                        <input
                            type="submit"
                            value="Continue"
                            className="shippingBtn"
                            disabled={state ? false : true}
                        />

                    </form>

                </div>
            </div>
        </>
    )
}

export default Shipping
