//in this we access all category products by useparams()

import { useState, useEffect } from 'react';
import { useParams ,Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import './shopper-home.css'
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareSharpIcon from '@mui/icons-material/ShareSharp';
import Rating from '@mui/material/Rating';



export function ShopperProducts() {
    const params = useParams();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies({background:''});
 
    function buyNowClick(e) {
    navigate(`/details/${e}`)
    }
    

    useEffect(() => {
        if (cookie["email"] == undefined) {
            navigate("/login");
        }
        axios({
            method: 'get',
            url: `/products/get`
            
        }).then((response) => {
            setProducts(response.data);
        })
    },[]);

    return (
        <div className='container-fluid' >
            <div className='headings'><h2 className='text-center mt-5 heading'>Products</h2></div>
            <div className='d-flex flex-wrap justify-content-center'>
            {
                    products.map(product =>
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
                }
            </div>
        </div>
    )
}