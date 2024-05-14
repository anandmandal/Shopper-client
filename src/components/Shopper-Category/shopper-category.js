//in this we access all category products by useparams()

import { useState, useEffect } from 'react';
import { useParams ,Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import './shopper-category.css';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareSharpIcon from '@mui/icons-material/ShareSharp';
import Rating from '@mui/material/Rating';

export function ShopperCategory() {
    const params = useParams();
    const [products, setProducts] = useState([]);
    // const[sortProduct,setsortProducts]=useState([])
    const navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies({background:''});
 
    function buyNowClick(e) {
    navigate(`/details/${e}`)
    }
    // function handleSort(e) {
    //     var sorted = sortProduct;
    //     if (e.target.value === 'asscending') {
    //         setsortProducts(sorted.sort((s1, s2) => s1.price - s2.price));
    //     }
    //     else if (e.target.value === 'descending') {
    //         setsortProducts(sorted.sort((s1, s2) => s2.price - s1.price));
    //     } else {
    //         setsortProducts(sorted)
    //     }
    // }
    

    
    // useEffect(() => {
    //     if (cookie["UserId"] == undefined) {
    //         navigate("/login");
    //     }
    //     axios({
    //         method: 'get',
    //         url: `http://fakestoreapi.com/products/category/${params.catName}`
            
    //     }).then((response) => {
    //         setProducts(response.data);
    //     })
    // }, [params.catName]);

    //to know the details of clickekd product
    // useEffect(() => {
    //     axios({
    //         method: 'get',
    //         url: `http://127.0.0.1:5000/details/${params:id}`
    //     }).then(response => {
    //         setFavStyle(response.data);
    //     })
    // }, []);
 

    useEffect(() => {
        if (cookie["email"] ===undefined) {
            navigate("/login");
        }
        axios({
            method: 'get',
            url: `/products/category/${params.catName}`
            
        }).then((response) => {
            setProducts(response.data);
            
        })
        
    }, [params.catName]);

    return (
        <div className='container-fluid' >
            <div className='d-flex justify-content-between '>
                <h2 className='mt-4 ms-3'>Shopper Category: <b>{params.catName}</b></h2>
                {/* <div className='mt-2'>
                    <select onChange={handleSort}>
                        <option value='sort' >Sort</option>
                        <option value='asscending'>Low to high</option>
                        <option value='descending'>High to low</option>
                    </select>
                </div> */}
            </div>
            <div className='d-flex flex-wrap'>
            {
                    products.map(product =>
                        <div className="card m-3 p-2" key={product.id} style={{ width: '280px' }}>
                            <Link to={'/details/' + product._id}>
                            <img src={product.image} height='200px' width='100px' className="card-img-top" />
                            </Link>
                            <div className='fav-share-icon'>
                            <CardContent>
                                <div>
                                {product.title}
                                </div>
                                <b>₹{product.price }</b>
                            </CardContent>
                            
                            <CardActions>
                                    <FavoriteBorderOutlinedIcon   />
                                <ShareSharpIcon />
                            </CardActions>
                            </div>
                            {/* footer cart button */}
                            <div className='card-footer d-flex justify-content-between mt-auto'>
                                
                                <Button size='small' variant='contained' value={product._id} onClick={() => { buyNowClick(product._id) }} style={{ backgroundColor: 'black' }}>Buy Now</Button>
                                <Rating className='mt-2' size="small" key={product._id} defaultValue={() => {
                                    var sum=0;
                                    var count=0;
                                    product.usersRating.map(rat => {
                                        sum = sum + rat.rate;
                                        count = count + 1;
                                    })
                                    return parseInt(sum/count);
                                }}
                                readOnly /> 
                            </div>

                        </div>
                
                        )
                }
            </div>
            
        </div>
    )
}