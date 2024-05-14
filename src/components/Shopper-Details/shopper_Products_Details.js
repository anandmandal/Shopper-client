import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import './shopper-details.css';
import { addToCart,removeFromCart } from "../../redux/Actions-Slice/cart-Slicer";
import { useDispatch } from "react-redux";
import ProductReview from "./product-review";
import ShowReview from "./Shopper-review-show";

export function ShopperDetails() {
    const [products, setProducts] = useState({ id: 0, title: "", price: 0, description: "", category: "", image: "", usersRating:[{name:'',rate:0,message:''}] });
    const [cartbtn, setcartbtn] = useState('Add to Cart');
    const params = useParams();
    const dispatch = useDispatch();
    function handleCartBtn(product) {
        if (cartbtn === 'Add to Cart') {
            setcartbtn('Remove from Cart');
            dispatch(addToCart(product));
        } else {
            dispatch(removeFromCart(product));
            setcartbtn('Add to Cart')
        }
    }
    
  
    var count = parseInt(products.usersRating.length);
        const reviewStar = () => {
       
        var sum = 0;
        var avgRate;
        products.usersRating.map(rat => {
            sum = sum + parseFloat(rat.rate)
        });
        
        avgRate = sum / count;
            return avgRate;  
    }


    useEffect(() => {
        axios({
            method: 'get',
            url:`/products/get/${params.id}`
        }).then(response => {
            setProducts(response.data);
        })
       
    }, [products]);
    // reviewStar();
    return (
        <div className="mt-3">
             <div className="container-fluid"  >
            <h2 className="text-center">Details</h2>
            <div className="row">
                <div className="col-4">
            <img src={products.image} className='img-inside' />
                </div>
                <div className="col-6 ms-5">
                    <dl>
                        <dt className="title-head">Title</dt>
                        <dd className="title">{products.title}</dd>
                        <dt className="title-head">Price</dt>
                        <dd className="title">₹{products.price}</dd>
                        <dt className="title-head">Rating</dt>
                        <dd className="title"><span className="bi bi-star-fill text-warning"></span>  {reviewStar()} [{count}]</dd>
                        <dt className="title-head">Description</dt>
                        <dd className="title">{ products.description}</dd>
                    </dl>
                        <div>
                        <Button size='small' variant='contained' onClick={()=>{handleCartBtn(products)}}  className="me-3 btncart" style={{backgroundColor:'#ff1a1a'}}><AddShoppingCartIcon />{cartbtn}</Button>
                            <Button href={'/category/' + products.category} variant='outlined' >Back to {products.category}</Button>
                    </div>
                </div>
            </div>
        </div>
            <div className="d-flex bg-light m-3 p-4 shadow justify-space-between">
            <div className=" col-6 ">
                <ShowReview products={products} />
             </div>
            <div className="col-6">
            
            <ProductReview />
            </div>
            </div>
       </div>
    )
}