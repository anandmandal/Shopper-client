
import { Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export function Payments(props) {
    const [user, setUser] = useState({name: '', email: '', phone: 0, work: '', password: '', cpassword: '' });
    const [cookie, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();
    const [order, setOrder] = useState({ productDetails: [{ title: '', category: '', price: '', description: '', image: '' }], address: { name: '', mobile: 0, pincode: 0, state: '', address: '', locality: '', dstrict: '' }, name: '', email: '', phone: ''});
    

    const amount = props.amount;
    const Address = props.addressdata;
    const Products = props.product;
    useEffect(() => {
        axios({
            method: 'get',
            url:'/users/get'
        }).then(users => {

           var User = users.data;
    
            for (var i = 0; i < User.length; i++) {
                
                if (cookie['email'] === User[i].email) {
                    setUser(User[i]);
                    console.log(User[i]);
                    console.log(user,user.email)
                    setOrder({
                        productDetails:Products,
                        address:Address,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        
                    })
                }
            }
            
           
            
        })
    }, [Products]);
    console.log(order);
    const orderTransactionDetails = async(tsId) => {
        console.log(order);
        const { productDetails, address, name, email, phone } = order;
        const txnId = tsId;
        const res = await fetch("/order", {
            method: 'POST',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({
            productDetails,address,name,email,phone,txnId
            })
        });
        const data = await res.json();
        if (data.message) {
            console.log(data.message);
        }else{
            console.log('Not working');
        }
    }
    
    function HandlePayment() {
        // const { productDetails, address, name, email, phone } = order;
        // const res = await fetch("/order", {
        //     method: 'POST',
        //     headers: { "Content-Type": 'application/json' },
        //     body: JSON.stringify({
        //         productDetails,address,name,email,phone
        //     })
        // });
        // const data = await res.json();
        // if (data.message) {
        //     console.log(data.message);
        // }else{
        //     console.log('Not working');
        // }
      console.log("Handle payment is working");
        var options = {
            key: 'rzp_test_XAeooQx6BvlavB',
            key_secret: 'YT9GV8rY87I1Gssvi4HYfXRq',
            amount: amount * 100,
            currency: 'INR',
            name: 'RazorPay by Shopper',
            description: 'for testing purpose',
            image: 'Client/public/logo192.png',
            
            handler: async function (response) {
                // setOrder({
                //     productDetails:Products,
                //     address:Address,
                //     name: user.name,
                //     email: user.email,
                //     phone: user.phone,
                //     razorpay_payment_id:response.razorpay_payment_id
                // });
                await orderTransactionDetails(response.razorpay_payment_id);
                alert('razorpay payment_id: ' + response.razorpay_payment_id);
                // setTransactionId(response.razorpay_payment_id);
                // console.log(TransactionId);
                alert('Order Submitted\n ThankYou for Order');
                navigate('/home');
            },
            prefill: {
                name: user.name,
                email: user.email,
                contact: user.phone
            },
            notes: {
                address: 'Shopper-Payment'
            },
            theme: {
                color: '#003399'
            }
        };
        var pay = new window.Razorpay(options);
        pay.open();
    }

    return (
        <>
            <Button variant='contained' color='primary' onClick={HandlePayment} disabled={props.proceed}>Proceed to Payment ₹{amount}
            </Button>
        </>
    )
}









// import { Button } from '@mui/material';
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { useCookies } from 'react-cookie';
// import { useNavigate } from 'react-router-dom';

// export function Payments(props) {
//   const [user, setUser] = useState({
//     name: '',
//     email: '',
//     phone: 0,
//     work: '',
//     password: '',
//     cpassword: ''
//   });
//   const [cookie] = useCookies();
//   const navigate = useNavigate();
//   const [order, setOrder] = useState({
//     productDetails: [],
//     address: {
//       name: '',
//       mobile: 0,
//       pincode: 0,
//       state: '',
//       address: '',
//       locality: '',
//       district: ''
//     },
//     name: '',
//     email: '',
//     phone: ''
//   });

//   const amount = props.amount;
//   const Address = props.address;
//   const Products = props.product;

//   useEffect(() => {
//     axios
//       .get('/users/get')
//       .then((response) => {
//         const users = response.data;
//         const foundUser = users.find((user) => user.email === cookie.email);

//         if (foundUser) {
//           setUser(foundUser);

//           setOrder({
//             productDetails: Products,
//             address: Address,
//             name: foundUser.name,
//             email: foundUser.email,
//             phone: foundUser.phone
//           });
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching user data:', error);
//       });
//   }, [Products, cookie.email]);

//   const orderTransactionDetails = async (tsId) => {
//     try {
//       console.log(order)
//       const { productDetails, address, name, email, phone } = order;
//       const txnId = tsId;
      
//       const response = await fetch('/order', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           productDetails,
//           address,
//           name,
//           email,
//           phone,
//           txnId
//         })
//       });

//       const data = await response.json();

//       if (data.message) {
//         console.log(data.message);
//       } else {
//         console.error('Order not submitted successfully');
//       }
//     } catch (error) {
//       console.error('Error submitting order:', error);
//     }
//   };

//   const handlePayment = () => {
//     const options = {
//       key: 'rzp_test_3iuNeABONDfa0z',
//       key_secret:'3Tr19wSueoSJnJYMdaa3sfT2',
//       amount:amount * 100,
//       currency:'INR',
//       name:'RazorPay by Shopper',
//       description:'for testing purpose',
//       image:'E:\shopping-app\Client\public\logo192.png',

//       handler: async function (response) {
//         await orderTransactionDetails(response.razorpay_payment_id);
//         alert('razorpay payment_id: ' + response.razorpay_payment_id);
//         alert('Order Submitted\n Thank you for your order');
//         navigate('/home');
//       },
//       prefill: {
//         name: user.name,
//         email: user.email,
//         contact: user.phone
//       },
//       notes: {
//         address: 'Shopper-Payment'
//       },
//       theme: {
//         color: '#003399'
//       }
//     };

//     const pay = new window.Razorpay(options);
//     pay.open();
//   };

//   return (
//     <Button
//       variant="contained"
//       color="primary"
//       onClick={handlePayment}
//       disabled={props.proceed}
//     >
//       Proceed to Payment ₹{amount}
//     </Button>
//   );
// }
