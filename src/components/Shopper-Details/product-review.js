import React from 'react'
import { Rating } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductReview = () => {
    const [userRating, setUserRating] = useState({ name: '', rate: 0, message: '' });
    const params = useParams();
    const [Rate, setRate] = useState(0);

    function handleInput(e) {
        const id = e.target.id;
        const value = e.target.value;

        setUserRating({ ...userRating, [id]: value, });
    }

    //send data to backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, rate, message } = userRating;

        const res = await fetch(`/reviewproduct/${params.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name:name, rate:Rate, message:message
            })
        });
        const data = await res.json();
        if (data) {
            alert(data.message);
            setUserRating({ name: '', rate: 0, message: '' });
            setRate(0);
        }
    }
    return (
        <div className='bg-light m-3 p-4 shadow' style={{position:'relative' }}>
            <h5><u>Review Section</u></h5>
            <form method='POST'>
                <label>Name</label>
                <input className='form-control' type='text' id='name' value={userRating.name} placeholder='name' onChange={handleInput}  />
                <label>Message</label>
                <textarea className='form-control' type='text' id='message' placeholder='message...' value={userRating.message} onChange={handleInput} />
                <div className='input-group mt-2'>
                <label>Rate: </label>
                    <Rating name="simple-controlled" id='rate' value={Rate} onChange={(event, newValue) => {
                        setRate(newValue);
                    }} />
                </div>
                <button className='btn btn-primary mt-2' onClick={handleSubmit}>submit</button>
            </form>
        </div>
    )
}

export default ProductReview;