import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './crud.css'
export function CrudCreate() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [idError, setIdError] = useState('');

    useEffect(() => {
        axios({
            method: 'get',
            url: `/products/get`
        })
            .then(response => {
                setProducts(response.data);

            })
    }, []);

    //function to varify ProductId available 
    function VerifyId(e) {
        var ID = parseInt(e.target.value);
        console.log(products)
        for (var product of products) {
            if (product.id === ID) {
                console.log(product.id+" INSIDE "+ID)
                setIdError("Product Id already used, Try another");
                break;
            }
            else {
                setIdError('');
            }
        }
    }
    return (
        <div className='container-fluid'  >
            <h2>Add New Product</h2>
            <Formik
                initialValues={{
                    id: 0,
                    title: "",
                    price: 0,
                    description: "",
                    category: "",
                    image: "",
                    quantity: 0
                }}
                onSubmit={
                   async (values) => {
                        // axios({
                        //     method: 'post',
                        //     url: '/addproducts',
                        //     data: values
                        // }).then(() => {
                        //     alert("Product added");
                        //     navigate("/products");
                        // })
                        const res = await fetch(`/addproduct`, {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(values)
                        });
                       const data = await res.json();
                       if (data.message) {
                           window.alert(data.message)
                       } else {
                           window.alert(data.error);

                       }

                    }
                }
            >
                {
                    <Form>
                        <dl>
                            <dt className='form-label'>Product Id</dt>
                            <dd><Field name="id" type="text" className='form-control w-50' onKeyUp={VerifyId} />
                            </dd>
                            <dd className='text-danger'>{idError}</dd>
                            <dt className='form-label' >Title</dt>
                            <dd> <Field name="title" className='form-control w-50' type="text" />  </dd>
                            <dt className='form-label' >Category</dt>
                            <dd> <Field name="category" className='form-control w-50' as="select" >
                                <option value='-1'>Select the category</option>
                                <option value="men's clothing">Men's clothing</option>
                                <option value="women's clothing">Women's clothing</option>
                                <option value="jewelery">Jewelery</option>
                                <option value="electronics">Electronics</option>
                            </Field>
                            </dd>
                            <dt className='form-label'>Price</dt>
                            <dd> <Field name="price" className='form-control w-50' type="number" /></dd>
                            <dt className='form-label'>Product Description</dt>
                            <dd> <Field name="description" className='form-control w-50' type="text" /></dd>
                            <dt className='form-label'>Quantity</dt>
                            <dd> <Field name="quantity" type="number" className='form-control w-50' />
                            </dd>
                            <dt className='form-label'>Image Source</dt>
                            <dd><Field name="image" className='form-control w-50' type="text" /></dd>
                        </dl>
                        <button className="btn btn-primary w-25">Add Product</button>
                        <button className='btn btn-info w-25 ms-1' type='button' onClick={() => navigate('/products')}>
                            View products
                        </button>
                    </Form>
                }

            </Formik>
        </div>
    )

}
