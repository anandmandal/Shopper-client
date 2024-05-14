import React, { useEffect, useState } from "react";
import './Checkout.css'
import * as yup from "yup";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Payments } from "./payments.js";
export function CheckOut() {
    const state = useSelector((state) => state.store.cartItems)
    const [address, setAddress] = useState({ name: '',mobile: 91,pincode: 0,state: '',address: '',locality: '',district: ''});
    const navigate = useNavigate();
    const [sum, setSum] = useState(0);
     
    useEffect(() => {
        totalSum();
    }, []);
    function totalSum() {
        var amount=0;
        state.map(prod => {
           amount= amount + prod.price
                })
        setSum(parseInt(amount));  
    }
     //address
    const[proceedBtn,setProceedBtn]=useState(true)
    

    return (
        <>
            <div className="container-fluid ">
                <div className="row">
                        <div className="col-8 address-book">
                        <h2 className="text-center mt-2"> Add your Address</h2>
                        <Formik
                            initialValues={{
                                name: '',
                                mobile: 0,
                                pincode: 0,
                                state: '',
                                address: '',
                                locality: '',
                                district: '',
                                
                            }}
                            validationSchema={
                                yup.object({
                                name: yup.string().required().max(20,'too long!'),
                                mobile:yup.number().required(),
                                pincode: yup.number().required(),
                                state: yup.string().required(),
                                address: yup.string().required(),
                                locality: yup.string().required(),
                                district: yup.string().required(),
                                })
                            }
                            onSubmit={
                                (values) => {
                                    setAddress(values);
                                    setProceedBtn(false);
                                    alert('Address added ')
                                    
                                }
                            }
                        >
                            <Form className='bg-light m-3 p-4 shadow '>
                                
                                <label className="form-label">Full Name</label>
                                <div ><Field className='input-box form-control w-50' name='name' type='text' /></div>
                                <div className="text-danger" ><ErrorMessage  name='name' /></div>
                                <label className="form-label">Mobile</label>
                                <div ><Field className='input-box form-control w-25' name='mobile' type='number' /></div>
                                <div className="text-danger"><ErrorMessage name='mobile' /></div>
                                <label className="form-label">Pincode</label>
                                <div><Field className='input-box form-control w-25' name='pincode' type='number' /></div>
                                <div className="text-danger"><ErrorMessage name='pincode' /></div>
                                <label className="form-label">State</label>
                                <div><Field className='input-box form-control w-25' name='state' type='text' /></div>
                                <div className="text-danger"><ErrorMessage name='state' /></div>
                                <label className="form-label">Address</label>
                                <div><Field className='input-box form-control w-50' name='address' type='text' /></div>
                                <div className="text-danger"><ErrorMessage  name='address' /></div>
                                <label className="form-label">Locality</label>
                                <div><Field className='input-box form-control w-50' name='locality' type='text' /></div>
                                <div className="text-danger"><ErrorMessage name='locality' /></div>
                                <label className="form-label">District</label>
                                <div><Field className='input-box form-control w-25' name='district' type='text' /></div>
                                <div className="text-danger"><ErrorMessage name='district' /></div>
                                
                                <button className='btn btn-dark mt-3 w-50' type="submit" disabled={!proceedBtn}>submit</button>
                                
                        </Form>
                            
                       </Formik>
                     </div>

                <div className='col-4 h-50 mt-5 bg-light shadow'>
                        <h4>Total checkout </h4>
                        {
                        state.map(product =>
                            <div key={product._id} className='d-flex justify-content-between' >   
                                <div className='text-center'><img src={product.image} width='50px' height='50px'  /></div>

                                <div>₹{product.price}</div>

                            </div>)
                        }
                        <hr className="horizontal"/>
                        <div className='d-flex justify-content-between'>
                            <div >Total Amount</div>
                            <div >₹{sum }</div>
                        </div>
                        <hr className="horizontal" />
                        <div>Address</div>
                        <div className='mb-2'>{address.address.toUpperCase()}</div>
                        <Payments amount={sum} product={state} proceed={proceedBtn} addressdata={address} ></Payments>
                        <hr className="horizontal" />
                        {/* <div>Payment Method</div>
                        <select className="w-100 h-2 form-select" onChange={handleSelection}>
                        <option value='-1'>Choose any one</option>
                            <option value='card'>Card</option>
                            <option value='upi'>UPI</option>
                            <option value='cod'>Cash on delivery</option>
                        </select>
                        <div className="mt-5">
                        {component}
                        </div>
                        <div className="d-flex justify-content-end align-item-bottom">
                        <button className="darkbtn form-control" onClick={orderDone}>Proceed for payment</button>
                        </div> */}
                    </div>
                    
                </div>
                
        </div>
        </>
    )
}
function COD() {
    return (
        <div>
            <h5>
        Your order payment will be 
        at the time of delivery.
            </h5>
        </div>
    )
}
function UPI() {
    const [upi, setUpi] = useState('');
    const [message, errorMessage] = useState('');
    const [style,setStyle]=useState({color:''})
    function upiCheck(e) {
        let regex = new RegExp(/^[a-zA-Z0-9.-]{2,256}@[a-zA-Z][a-zA-Z]{2,64}$/);
        if (e.target.value == null) {
            errorMessage('Enter upi id');
            setStyle({color:'black'})
        }
        if (regex.test(e.target.value)) {
            setUpi(e.target.value);
            errorMessage('verified, valid upi')
            setStyle({color:'green'})
        }
        else {
            setUpi(e.target.value)
            errorMessage('Invalid upi')
            setStyle({color:'red'})
        }
}
    return (
        <div>
            <label className="form-label">Enter Upi id</label>
            <div className="input-group">
                <input className="form-control input-box w-75" type='text' value={upi} onChange={upiCheck} />
                
                <button><div className='bi bi-arrow-right-square '/></button>
            </div>
            <div style={style} >{ message}</div>
        </div>
    )
}
function Card() {
    const [imgSrc, setImgSrc] = useState('');
    function handleCard(e) {
        var ch = e.target.value
        var char = ch.charAt(0);
        if(char=='2'||char==4||char=='6'){
            
            setImgSrc("/Images/rupaycard.png")
        }
        else if(char=='1'||char=='3'||char=='5'){
            
            setImgSrc("/Images/visacard.jpeg")
        }
        else if(char=='7'||char=='8'||char=='9'){
           setImgSrc("/Images/mastercard.jpeg")
        }else{
            setImgSrc("/Images/paypalcard.jpeg")
        }
     }
    return (
        <div className="container-fluid border border-dark rounded">
            <dl>
                <dt className="form-label">Name on Card</dt>
                <dd><input className="form-control w-75" type='text' /></dd>
                <dt className="form-label">Number</dt>
                <div className="input-group">
                    <input className="form-control w-75" type='number' onChange={handleCard} />
                    <img src={imgSrc} alt='...' width='50px' height='50px'  />
                </div>
                <div className="d-flex justify-content-space">
                    <div>
                     <dt className="form-label">End month/year</dt>
                     <dd><input type='text' className=" form-control w-25" /></dd>
                    </div>
                    <div>
                     <dt className="form-label">CVV</dt>
                     <dd><input type='password' className=" form-control w-25" /></dd>
                    </div>

                </div>
              </dl>
        </div>

    )
}