import { Formik, Form, Field } from "formik";
import axios from 'axios';
import './shopper-login.css'
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@mui/material";
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import { useEffect, useState } from "react";
export function ShopperLogin() {
    const navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loginAs, setLoginAs] = useState('');

    useEffect(() => {
        axios({
            method: 'get',
            url: '/users/get'
        }).then(users => {
            var user = users.data;
    
            for (var i = 0; i < user.length; i++) {
                
                if (email === user[i].email) {
                    setName(user[i].name);
    
                }
            }
        })
    } , [email]);

    const loginUser = async (e) => {
        
        e.preventDefault();
        const res = await fetch('/signup', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await res.json();

        if (data.message) {
            window.alert(data.message);
            console.log("login successful")
            setCookie('email', email);
            setCookie('loginAs', loginAs);
            setCookie('name',name)
            navigate('/home')
        } else {
            window.alert(data.error);
            console.log("invalid credientials")
            navigate('/invalid')


        }
    }

    return (
        <div className="container-fluid d-flex w-5" >
            <div width="50%">
                <img src='ShopperImg/lock-3d.png' className="loginImg" style={{ marginTop: '12%', marginLeft: '10%' }} />
            </div>
            <div style={{ marginTop: '8%', marginLeft: '15%' }}>
                <h1 ><AccountCircleSharpIcon style={{ fontSize: '50px' }} /> Login</h1>


                <form className="loginForm" method='post'>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="seller" onClick={(e)=>{setLoginAs(e.target.value)} } />
                            <label className="form-check-label" htmlFor="inlineRadio1">as a Seller</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="customer" onClick={(e) => { setLoginAs(e.target.value) }} />
                            <label className="form-check-label" htmlFor="inlineRadio2">as a Customer</label>
                    </div>
                    <div>
                        <label className="mb-2">Email</label>
                        <input type="text" className='form-control' onChange={(e) => setEmail(e.target.value)} name="email" value={email} />
                        <label className="mb-2">Password</label>
                        <input type="password" className='form-control' onChange={(e) => setPassword(e.target.value)} name="password" value={password} />
                        <div style={{ float: 'right', fontSize: '13px', buttonStyle: "none" }} className="text-hover btn" onClick={() => { navigate('/forget') }}>Forget password</div>
                    </div>
                    <button className="loginbtn rounded p-2" onClick={loginUser} >Login</button>
                    <Button href="/register" variant='text' style={{ color: 'black' }}>New User?<u>Register</u></Button>
                </form>




            </div>
        </div>
    )
}

//forgot password

export function ForgetLogin() {
    const [phone, setPhone] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const VerifyUser = (e) => {
        e.preventDefault();
        axios({
            method: 'get',
            url: '/users/get'
        }).then(users => {
            var user = users.data;

            for (var i = 0; i < user.length; i++) {
                // var temp=phone===user[i].phone;
                if (email === user[i].email) {
                    alert('your data found');
                    setPassword(user[i].password);

                }
            }
            if (password != '') {
                alert("Your Password is " + password);
                navigate('/login')
            } else {
                alert("phone number or email does not exist");
            }

        })

    }

    return (
        <div className="container-fluid d-flex w-5" >
            <div width="50%">
                <img src='ShopperImg/lock-3d.png' className="loginImg" style={{ marginTop: '12%', marginLeft: '10%' }} />
            </div>
            <div style={{ marginTop: '8%', marginLeft: '15%' }}>
                <h1><AccountCircleSharpIcon style={{ fontSize: '50px' }} /> User Verification</h1>


                <form className="loginForm" method='post'>
                    <div>
                        <label className="mb-2">Email</label>
                        <input type="text" className='form-control' onChange={(e) => setEmail(e.target.value)} name="email" value={email} />
                        <label className="mb-2">Registered Phone Number</label>
                        <input type="text" className='form-control' onChange={(e) => setPhone(e.target.value)} name="phone" value={phone} />
                    </div>
                    <div className="btn-group w-100 mt-2">
                        <Button variant="contained" className="w-75" onClick={VerifyUser} >Send</Button>
                        <Button href="/login" variant="contained" style={{ backgroundColor: 'black' }} >Login</Button>
                    </div>
                    <Button href="/register" variant='text' style={{ color: 'black' }}>New User?<u>Register</u></Button>
                </form>




            </div>
        </div>
    )
}
