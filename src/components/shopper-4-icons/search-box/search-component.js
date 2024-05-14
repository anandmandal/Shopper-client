import React, { useContext, useEffect, useState } from "react";
import { ButtonGroup,Button } from '@mui/material'
import { SearchRounded } from "@mui/icons-material";
import './search-component.css';
import CardContent from '@mui/material/CardContent';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';

export function SearchComponent() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [key, setKey] = useState('');

    const searchHandle = async(event) => {
        event.preventDefault();
        if (key) {
            let result = await fetch(`/search/${key}`);
        result =await result.json();
        if (result) {
            setProducts(result);
        }
        } else {
            alert('enter someting to search..')
       }
       
    }
    //buy now
    function buyNowClick(e) {
        navigate(`/details/${e}`)
        }

    return (
        <div className="center">
            <form className="form-input mb-3" role="search" onSubmit={searchHandle}>
            <ButtonGroup >
                <input id='inputBox' placeholder="search..." type='text' onChange={(e)=>setKey(e.target.value)} />
                
                <Button id='btn' type="submit"><SearchRounded id='icon'/></Button>
            </ButtonGroup>
            </form>
           
            
            <div className='d-flex flex-wrap justify-content-center'>
                
            {
                  products.length>0?  products.map(product =>
                        <div className="card m-3 p-2" key={product.id} style={{ width: '280px' }}>
                            <Link to={'/details/' + product._id}>
                            <img src={product.image} height='180px' width='100px' className="card-img-top" />
                            </Link>
                            <div className='fav-share-icon'>
                            <CardContent>
                                <div variant='body1' component="div">
                                {product.title}
                                </div>
                                <b>₹{product.price }</b>
                            </CardContent>
                            
                            </div>
                            {/* footer cart button */}
                            <div className='card-footer d-flex justify-content-between mt-auto'>
                            <Rating className='mt-2' size="small" key={product._id} defaultValue={() => {
                                    var sum=0;
                                    var count=0;
                                    product.usersRating.map(rat => {
                                        sum = sum + rat.rate;
                                        count = count + 1;
                                    })
                                    return parseFloat(sum / count);
                                }}
                                readOnly /> 
                                <Button size='small' variant='contained' value={product._id} onClick={() => { buyNowClick(product._id) }} style={{ backgroundColor: 'black' }}>Buy Now</Button>
                            </div>

                        </div>
                
                    )
                        :!key?(<h4>Type someting</h4>):<h1>NO RESULT FOUND</h1>
                }
            </div>
        </div>
    )
}
