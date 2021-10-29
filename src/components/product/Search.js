import React, { useState } from 'react'
import './search.css'
import MetaData from '../layout/MetaData'

const Search = ({ history }) => {
    const [keyword, setKeyword] = useState("")

    const searchSubmitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            history.push(`/products/${keyword}`)
        }
        else {
            history.push("/products")
        }
    }
    return (
        <>
            <MetaData title="Search a product.." />
            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input
                    type="text"
                    placeholder="Search a product..."
                    onChange={(e) => setKeyword(e.target.value)
                    }
                />
                <input type="submit" value="search" />
            </form>
        </>
    )
}

export default Search
