import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export function CrudEdit() {
    const params = useParams();
    const [products, setProducts] = useState({
        id: 0,
        title: "", price: 0, description: "", category: "", image: "", quantity:0
    });
    const navigate = useNavigate();
    const category = ["category", "electronics", "jewelery", "men's clothing", "women's clothing"]
    useEffect(() => {
        axios({
            method: 'get',
            url: `/products/get/${params.id}`
        })
            .then(response => {
                setProducts(response.data);
            })

    }, []);
    var name, value;
    function handleInputs(e) {
        name = e.target.name;
        value = e.target.value;
        setProducts({ ...products, [name]: value });
    }

   async function PostData(e) {
        e.preventDefault();
        const { title, price, description, category, image, quantity } = products;

       const res = await fetch(`/products/update/${params.id}`, {
           method: 'PUT',
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify({
               title, price, description, category, image, quantity
           })
       });
       const data = await res.json();
       if (data) {
           window.alert(data.message);
       } else {
           window.alert(data.error);
       }

    }


    return (
        <div className='container-fluid' >
            <h2 style={{ textAlign: 'center', marginTop: '5px' }}>Edit Product-{products.id }</h2>
            <form className='form' method='POST'>
                <div className='mt-3' style={{ textAlign: 'center', width: "1500px" }}>

                    <div className='mt-3'><TextField style={{ background: 'transparent' }} className='form-control w-50' type="text" label="Title" variant="outlined" value={products.title} onChange={handleInputs} name='title' /></div>

                    <div className='mt-3'><TextField style={{ background: 'transparent' }} className='form-control w-50' type="number" label="Price" variant="outlined" value={products.price} onChange={handleInputs} name='price' color="warning" /></div>

                    <div className='mt-3'><TextField style={{ background: 'transparent' }} className='form-control w-50' type="text" label="Description" variant="outlined" value={products.description} onChange={handleInputs} name='description' color="warning" /></div>

                    <div className='mt-3'><TextField className='form-control w-50 bg-transparent' type="text" label="Image" variant="outlined" value={products.image} onChange={handleInputs} name='image' color="warning" /></div>

                    <div className='mt-3'><TextField className='form-control w-50 bg-transparent' type="number" label="Quantity" variant="outlined" value={products.quantity} onChange={handleInputs} name='quantity' color="warning" /></div>


                    <div>
                        <InputLabel className='mt-3' >Category</InputLabel>
                        <Select
                            className='form-control w-50 bg-transparent' onChange={handleInputs} name='category'
                            value={products.category}
                            label="Category">
                            <MenuItem value={category[0]}>{category[0]}</MenuItem>
                            <MenuItem value={category[1]}>{category[1]}</MenuItem>
                            <MenuItem value={category[2]}>{category[2]}</MenuItem>
                            <MenuItem value={category[3]}>{category[3]}</MenuItem>
                            <MenuItem value={category[4]}>{category[4]}</MenuItem>
                        </Select>
                    </div>
            
                    <div style={{ textAlign: 'center' }}>
                        <Button variant="contained" className='mt-2 w-50' onClick={PostData}>Submit</Button>
                    </div>
                </div>
             </form>
            <Link className='btn shadow' to={'/cruddetails/' + products._id}> See Your Changes </Link>
        
            
        </div >
    )
}