
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
export function ShoppingRegister() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: '', email: '', phone: '', work: '', password: '', cpassword: '' });
    const[formStyle,setFormStyle]=useState({border:''})
    let name, value;
   
    function handleInputs(e) {
      
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });

           
    }
   
    const PostData = async (e) => {
        e.preventDefault();
        const { name, email, phone, work, password, cpassword } = user;

        const res = await fetch("/register", {
            method: 'POST',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword
            })
        });
        const data = await res.json();
        if (data.message) {
            setFormStyle({border:"3px solid green"})
            window.alert(data.message);
            console.log("Registration Successfull");
            navigate('/login');
        }
        else {
            setFormStyle({border:"3px solid red"})
            window.alert(data.error);
            console.log("Invalid Registeration");
        }

    }

    return (
        <div className='container-fluid w-75'>
            <h3 className="text-center mt-2">Register User</h3>
            <div className="mt-5">
                
                
                        <form className="d-flex justify-content-between "  method="POST" >

                            <div className=" p-4 rounded col-6 shadow" style={formStyle}>
                                <label className='form-label'>Name</label>
                                <div ><input className='form-control w-100' type="text" name="name" value={user.name} onChange={handleInputs}/></div>
                                <label className='form-label'>Email</label>
                                <div><input className='form-control w-100' type="text" name="email" value={user.email} onChange={handleInputs}/></div>
                                <label className='form-label'>Phone</label>
                                <div><input className='form-control w-100' type="text" name="phone" value={user.phone} onChange={handleInputs}/></div>
                                <label className='form-label'>Work</label>
                                <div><input className='form-control w-100' type="text" name="work" value={user.work} onChange={handleInputs}/></div>
                                <label className='form-label'>Password</label>
                                <div><input className='form-control w-100' type="password" name="password" value={user.password} onChange={handleInputs}/></div>
                                <label className='form-label'>Confirm Password</label>
                                <div><input className='form-control w-100' type="password" name="cpassword" value={user.cpassword} onChange={handleInputs}/></div>
                                <div className="form-group form-button mt-3">
                                <input type='submit' name='register' className="btn btn-primary w-25 " value="register" onClick={PostData} />
                                </div>
                                
                                <div>
                                    <Link to="/login">Existing Users</Link>
                                </div>
                            </div>
                            <div className="col-4">
                                <img src='ShopperImg/free-registration-desk.webp' width='500px' height='500px' />
                            </div>
                        </form>
                
            </div>

        </div>
    )
}