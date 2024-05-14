import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
import { removeFromCart } from "../../redux/Actions-Slice/cart-Slicer";
import { NavLink, useNavigate } from "react-router-dom";
import './shopper-cart.css'


export function ShopperCart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useSelector((state) => state.store.cartItems)
    const [error, setError] = useState('');


    //handle trash
    function handleTrash(prod) {
       
            dispatch(removeFromCart(prod));
            console.log(prod);
       
    }
    //handle click
    function handleClick(e) {
        navigate(`/details/${e}`);
    }
    function handleBtn() {
        if (state.length == 0) {
            setError('Cart is empty');
        }
        else {
            navigate('checkout');
        }
    }
    return (
        <>
        <div className="container-fluid">
        <table className="table table-hover">
                <thead>
                    <tr className='text-center' >
                        <th>products</th>
                        <th>Title</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                     {
                        state.map(product =>
                            <tr key={product._id} >   
                                <td className='text-center'><img src={product.image} width='50px' height='50px' onClick={()=>{handleClick(product._id)}} /></td>

                                <td className='title'>{product.title}</td>
                                <td  className='text-center'><Button  variant="contained" style={{backgroundColor:'red'}} onClick={()=>{handleTrash(product)}}  value={product.id}><DeleteForeverIcon style={{color:'white'}}/></Button></td>
                            </tr>)
                    }
                </tbody>
                </table>
                <div className="checkoutElement align-center">
                    
                    <div>
                    <button className="checkoutBtn" onClick={handleBtn}>Check Out</button>
                    </div>
                </div>
                <h2 className='text-danger checkoutElement'>{error}</h2>
        </div>
        </>
    )
}