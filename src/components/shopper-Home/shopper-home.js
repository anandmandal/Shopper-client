import './shopper-home.css';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { ShopperProducts } from './Products';
import { current } from '@reduxjs/toolkit';
import Carousel from 'react-bootstrap/Carousel';





export function ShopperHome() {
  const [cookie, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  useEffect(() => {
    if (cookie["email"] == undefined) {
      navigate('/login');
    }
  })

  return (
    <div className='container-fluid mt-2'>
      <div style={{ display: 'block', padding: "30px" }}>
        <Carousel>
          <Carousel.Item interval={1500}>
            <img
              className="d-block w-100"
              height='400px' src="/ShopperImg/PremiumVector1.png"
              alt="Image One"
            />
            <Carousel.Caption>
              <p>Sample Text for Image One</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img
              className="d-block w-100"
              height='400px' src="/ShopperImg/PremiumVector2.png"
              alt="Image Two"
            />
            <Carousel.Caption>
              <p>Sample Text for Image Two</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img
              className="d-block w-100"
              height='400px' src="/ShopperImg/PremiumVector3.png"
              alt="Image Three"
            />
            <Carousel.Caption>
              <p>Sample Text for Image Three</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img
              className="d-block w-100"
              height='400px' src="/ShopperImg/PremiumVector4.png"
              alt="Image four"
            />
            <Carousel.Caption>
              <p>Sample Text for Image Four</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img
              className="d-block w-100"
              height='400px' src="/ShopperImg/PremiumVector5.png"
              alt="Image five"
            />
            <Carousel.Caption>
              <p>Sample Text for Image Five</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img
              className="d-block w-100"
              height='400px' src="/ShopperImg/PremiumVector6.png"
              alt="Image six"
            />
            <Carousel.Caption>
              <p>Sample Text for Image six</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img
              className="d-block w-100"
              height='400px' src="/ShopperImg/slide2.jpg"
              alt="Image seven"
            />
            <Carousel.Caption>
              <p>Sample Text for Image Seven</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img
              className="d-block w-100"
              height='400px' src="/ShopperImg/slide3.jpg"
              alt="Image Eight"
            />
            <Carousel.Caption>
              <p>Sample Text for Image Eight</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img
              className="d-block w-100"
              height='400px' src="/ShopperImg/slide5.jpg"
              alt="Image Nine"
            />
            <Carousel.Caption>
              <p>Sample Text for Image Nine</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <div>
        {
          cookie['loginAs'] == "customer" ? (<ShopperProducts />)
            : (<div className='text-center'>
              
              <hr className='home-hr'></hr>
              <h1 style={{textShadow:'2px 2px 4px'}}>Welcome {cookie['name']}</h1>
              <h3 style={{textShadow:'2px 2px 3px yellow'}}>you joined as a {cookie['loginAs']}</h3>
              
              <hr className='home-hr '></hr>
            </div>)
        }
      </div>

    </div>
  )
}