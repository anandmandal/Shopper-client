import { Rating } from '@mui/material';
import React from 'react'

const ShowReview = ({ products }) => {
  
  return (
    <div className='bg-light m-3 p-4 shadow '>
      
          {
        products.usersRating.map(rate => 
                
                  <div key={rate._id}>
                      <details>
                    <summary ><label className='form-label' style={{ fontWeight: 'bold', marginLeft: '4px' }}>{rate.name} <Rating name="size-small" defaultValue={parseInt(rate.rate)} size="small" readOnly />
                    </label></summary>
                          <p className='bg-light m-1 p-1 '><i className="bi bi-chat-right-dots"></i> {rate.message}</p>
                          
                      </details>
                      <hr/> 
                    </div>
              )
          }

        </div>
  )
}

export default ShowReview;