import React from 'react'
import { ReactNavbar } from 'overlay-navbar'



const Header = () => {
    return <ReactNavbar
        burgerColorHover="white"
        link1Text="Home"
        link2Text="Products"
        link3Text="Contact"
        link4Text="About"
        link1Url="/"
        link2Url="/products"
        link3Url="/contact"
        link4Url="/about"
        link1Size="1.3vmax"
        link1Color="white"
        nav1justifyContent="flex-end"
        nav2justifyContent="flex-end"
        nav3justifyContent="flex-start"
        nav4justifyContent="flex-start"
        link1ColorHover="#eb4034"
        profileIconUrl="/login"
        profileIconColorHover="#eb4034"
        searchIconColorHover="#eb4034"
        cartIconColorHover="#eb4034"
        cartIconMargin="1vmax"
        link1Margin="1vmax"
        logo={'./images/logo.png'}

    />
}

export default Header
