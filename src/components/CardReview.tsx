import React from 'react'

interface ReviewProps {
    text: string;
    // user: {
    //     id: string;
    //     profile_url: string;
    //     image_url: string;
    //     name: string;
    // }
}

const CardReview: React.FC<ReviewProps> = ({text}) => {
  return (
    <div className="card">
        <div className="card-body">
            {text}
        </div>
    </div>
  )
}

export default CardReview