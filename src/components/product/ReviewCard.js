import React from 'react'
import ReactStars from 'react-rating-stars-component'

const ReviewCard = ({ review }) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        value: review.rating,
        isHalf: true,
        size: window.innerWidth < 600 ? 20 : 25
    }
    return (
        <div className="reviewCard">
            <img src="/images/user.jpg" alt="user" />
            <p>
                {review.name}
            </p>
            <ReactStars {...options} />
            <span>
                {review.comment}
            </span>
        </div>
    )
}

export default ReviewCard