import React, { Component, useState } from "react";
import { BrowserRouter, Routes, Route, Link, NavLink} from "react-router-dom";
import "./shopper-index.css";
import { ShopperCategory } from "../Shopper-Category/shopper-category";
import { ShopperDetails } from "../Shopper-Details/shopper_Products_Details";
import { ShopperHome } from "../shopper-Home/shopper-home";
import { ShopperJewelery } from "../shopper-jewelery/shopper-jwelery";
import { ShoppingRegister } from "../Shopper-Register/shopper-register";
import{ForgetLogin, ShopperLogin} from "../Shopper-Login/shopper-login"
import { ShopperInvalid } from "../Shopper-invalid/shopper-invalid";
import { CrudIndex } from "../Shopper-CRUD/crud-index";
import { CrudCreate } from "../Shopper-CRUD/crud-create";
import { CrudDetails } from "../Shopper-CRUD/crud-details";
import { CrudEdit } from "../Shopper-CRUD/crud-edit";
import { UserDashboard } from "../shopper-4-icons/user-dasboard/user-Dashboard";
import { Button, Menu, MenuItem } from "@mui/material";
import { useCookies } from "react-cookie";
import { SearchComponent } from "../shopper-4-icons/search-box/search-component";
import { useSelector } from "react-redux";

import { ShopperCart } from "../Shopper-cart-view/shopper-cart-details";
import { CheckOut } from "../Shopper-cart-view/Checkout";
export function ShopperIndex() {
    
    const [cookie, setCookie, removeCookie] = useCookies();
    

    const [values, setvalues] = useState(null);
    const open = Boolean(values);
    const [mode, setMode] = useState('darkMode');
    const [icon,setIcon]=useState('bi bi-moon-fill')
    function ThemeChange() {
        if(mode=='darkMode'){
            setMode('lightMode');
            setIcon('bi bi-brightness-high')
        }
        else {
            setMode('darkMode');
            setIcon('bi bi-moon-fill')
        }
    }
    const handleClick = (event) => {
        setvalues(event.currentTarget);
    };
    const handleClose = () => {
        setvalues(null);
    };
  
    //function to signout click to delete the cookies
    function SignOutClick() {
        removeCookie("email");
        removeCookie("name");
        removeCookie("loginAs");
        
    }
    //cart count
    const countstate = useSelector((state) => state.store.cartCount);
    console.log(countstate)
    

    return (
        <div className={mode}>
        <div className="container-fluid d-block" >
                <BrowserRouter>
                    
            
                    {cookie["loginAs"] === undefined?(<><header className="header position-top shadow-lg " style={{ background: '#ffffff' }}>
                        <div style={{margin:'auto'}} ><h2 className="p-2 logo ">Shopper<span style={{ color: '#e6b800' }}>.</span></h2></div>
                    </header></>)
                     :( cookie["loginAs"] === 'customer'?(<header className="header position-top shadow " style={{ background: '#ffffff' }}>
                <div ><h2 className="p-2 logo">Shopper<span style={{color:'#e6b800'}}>.</span></h2></div>
                    <nav className="header-button d-flex" >
                        <div ><Link to='/home' className='btn btnhead'>Home</Link></div>
                        {/* <div ><Link to='products' className='btn btnhead'>Products</Link></div> */}
                        <div ><Link to='register' className='btn btnhead'>Register</Link></div>
                        <div ><Link to="category/men's clothing" className='btn btnhead'>Men</Link></div>
                        <div ><Link to="category/women's clothing" className='btn btnhead'>Women</Link></div>
                        <div ><Link to='category/jewelery' className='btn btnhead'>Jewelery</Link></div>
                        <div ><Link to='category/electronics' className='btn btnhead'>Electronics</Link></div>
                    </nav>
                    <hr/>
                    <div className="icons">
                       <div> <Link to ="/search" title="Search" className="bi bi-search me-2 iconhead"></Link></div>
                            <div className="me-2 " ><NavLink to='/cart' role='presentation' className='me-2 iconhead bi bi-cart3 badge' title="Cart">{countstate}</NavLink></div>
                        {/* <span title="Favourites" className="bi bi-heart me-2 iconhead"></span> */}
                        <div className="me-2 "><span title="Account" onClick={handleClick} className="bi bi-person iconhead" ></span></div>
                        

                        <Menu
                            
                            id="basic-menu"
                            anchorEl={values}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose}>Hello! -{cookie["name"]}</MenuItem>
                            <Link to='/dashboard' className="text-dark text-decoration-none"> <MenuItem onClick={handleClose} >My account</MenuItem></Link>
                            <Link to='/login'><MenuItem onClick={SignOutClick}>Logout <span className='bi bi-box-arrow-right text-dark'>  </span></MenuItem></Link>
                                    <MenuItem onClick={ThemeChange}  title='click to change the mode'><span className={icon} /> {mode }</MenuItem>

                        </Menu>
                    
                            </div>
                            
                        </header>)
                            // shopper
                            : ( <header className="header position-top shadow " style={{background:'#ffffff'}}>
                            <div ><h2 className="p-2 logo">Shopper<span style={{color:'#e6b800'}}>.</span></h2></div>
                                <nav className="header-button d-flex" >
                                <div ><Link to='/home' className='btn btnhead'>Home</Link></div>
                                    <div ><Link to='products' className='btn btnhead'>Products</Link></div>
                                    <div ><Link to='register' className='btn btnhead'>Register</Link></div>
                                   
                                </nav>
                                <hr/>
                                <div className="icons">
                                   <div> <Link to ="/search" title="Search" className="bi bi-search me-2 iconhead"></Link></div>
                                       
                                    {/* <span title="Favourites" className="bi bi-heart me-2 iconhead"></span> */}
                                    <div className="me-2 "><span title="Account" onClick={handleClick} className="bi bi-person iconhead" ></span></div>
                                    
            
                                    <Menu
                                        
                                        id="basic-menu"
                                        anchorEl={values}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem onClick={handleClose}>Hello! -{cookie["name"]}</MenuItem>
                                        <Link to='/dashboard' className="text-dark text-decoration-none"> <MenuItem onClick={handleClose} >My account</MenuItem></Link>
                                        <Link to='/login'><MenuItem onClick={SignOutClick}>Logout <span className='bi bi-box-arrow-right text-dark'>  </span></MenuItem></Link>
                                        <MenuItem onClick={ThemeChange}  title='click to change the mode'><span className={icon} /> {mode }</MenuItem>
            
                                    </Menu>
                                    
                                        </div>
                                        
                            </header>))
                    }
                {/* <div className="subhead">
                            <i className='bi bi-gift-fill icon-gift'></i>⚡️ HAPPY HOLIDAY DEALS ON EVERYTHING ⚡️<i className='bi bi-gift-fill icon-gift'></i>
                        </div> */}
                    
                    
                    {/* ------------------------Header end-----------------------  */}
                
                <Routes>
                        <Route path='/' element={<ShopperHome />}></Route>
                        <Route path='home' element={<ShopperHome />}></Route>
                        <Route path="category/:catName" element={<ShopperCategory />}></Route>
                        <Route path="details/:id" element={< ShopperDetails />} />
                        <Route path="/register" element={<ShoppingRegister />} />
                        <Route path="/login" element={<ShopperLogin />} />
                        <Route path="/forget" element={<ForgetLogin/>}/>
                        <Route path="/invalid" element={<ShopperInvalid />} />
                        <Route path="/search" element={<SearchComponent />}/>
                        <Route path='/cart' element={<ShopperCart />}/>
                        <Route path="products" element={<CrudIndex />} />
                        <Route path="/NewProduct" element={<CrudCreate />} />
                        <Route path="/cruddetails/:id" element={<CrudDetails />} />
                        <Route path="/crudedit/:id" element={<CrudEdit />} />
                        <Route path="/cart/checkout" element={<CheckOut />} />

                        <Route path="/dashboard" element={<UserDashboard />}/>
                </Routes>
                    
                    
            </BrowserRouter>
            </div>
         </div>
    )
}