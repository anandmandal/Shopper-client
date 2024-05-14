import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';


export function CrudDetails() {

    const params = useParams();
    const [products, setProducts] = useState({ id: 0, title: "", price: 0, description: "", category: "", image: "", quantity: 0 });
    useEffect(() => {
        axios({
            method: 'get',
            url: `/products/get/${params.id}`
        })
            .then(response => {
                setProducts(response.data);
            })
    }, []);

    return (

        <div className='container-fluid '>
            <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Product Details - {products.id}</h2>
            <div className='crud-index-prod-detail-box shadow-lg' >
                <div>
                    <div style={{ float: 'left', marginTop: '70px', marginLeft: '20px' }}>

                        <div ><img src={products.image} width="200px" height='200px' /></div>
                    </div>
                    <div style={{ float: 'right', width: '700px', margin: '5px' }}>
                        <div className='fw-bold'>Title</div>
                        <div className='form'>{products.title}</div>
                        <div className='fw-bold'>Category</div>
                        <div className='form'>{products.category}</div>
                        <div className='fw-bold'>Price</div>
                        <div className='form'>₹{products.price}</div>
                        <div className='fw-bold'>Description</div>
                        <div className='form'>{products.description}</div>
                        <div className='fw-bold'>Quantity</div>
                        <div className='form'>{products.quantity}</div>

                    </div>

                    <Link to="/products" className='btn btn-primary mt-5 w-25 align-center'>See all Products</Link>


                </div>

            </div>
        </div>
    )
}