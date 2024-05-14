import React, { useEffect, useState } from "react";
import axios from "axios";
import './user-Dashboard.css';
import { useCookies } from "react-cookie";

export function UserDashboard() {
  const [cookie, setCookie, removeCookie] = useCookies();
  const [userDet, setUserDet] = useState({});
  const email = cookie['email'];
  useEffect(() => {
    axios({
        method: 'get',
        url: '/users/get'
    }).then(users => {
        var user = users.data;

        for (var i = 0; i < user.length; i++) {
            
            if (email === user[i].email) {
                setUserDet(user[i]);

            }
        }
    })
} , [email]);

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-6 mb-4 mb-lg-0">
              <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                <div className="row g-0">
                  <div className="col-md-4 gradient-custom text-center text-white"
                    style={{ borderTopLeftRadius: ".5rem", borderBottomLeftRadius: ".5rem" }}>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                      alt="Avatar" className="img-fluid my-5" style={{ width: "80px" }} />
                    <h5>{userDet.name}</h5>
                    <p>{userDet.work }</p>
                    <i className="far fa-edit mb-5"></i>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-4">
                      <h6>Information</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Email</h6>
                          <p className="text-muted">{userDet.email}</p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Phone</h6>
                          <p className="text-muted">{userDet.phone}</p>
                        </div>
                        <div className="row pt-1"></div>
                      </div>
                      <div className="col-6 mb-3">
                          <h6>Password</h6>
                          <p className="text-muted">{userDet.password}</p>
                        </div>
                        
                      <h6>DB details</h6>
                      <hr className="mt-0 mb-4" ></hr>
                        <div className="row pt-1">
                          <div className="col-6 mb-3">
                            <h6>Unique Id</h6>
                            <p className="text-muted">{userDet._id}</p>
                          </div>
                          <div className="col-6 mb-3">
                            <h6>Registration date</h6>
                            <p className="text-muted">{userDet.date}</p>
                          </div>
                        </div>
                        <div className="d-flex justify-content-start">
                          <a href="#!"><i className="fab fa-facebook-f fa-lg me-3"></i></a>
                          <a href="#!"><i className="fab fa-twitter fa-lg me-3"></i></a>
                          <a href="#!"><i className="fab fa-instagram fa-lg"></i></a>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </>
  )
}