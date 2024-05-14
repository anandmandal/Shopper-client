//return of shopping category
<div className='container-fluid' style={{ backgroundColor: '#d6d6f5' }} >
            <h2>Shopper Category: {params.catName}</h2>
            <div className='d-flex flex-wrap'>
            {
                    products.map(product =>
                        <div className="card m-2 p-2" key={product.id} style={{width:'200px'}}>
                            <img src={product.image} height='150' className="card-img-top" />
                            <div className="card-header" style={{height:'100px'}}>
                                <p>{product.title}</p>
                            </div>
                            <div className='card-footer'>
                              <Link to={'/details/' + product.id} className='btn btn-primary w-100'>Details</Link>
                            </div>

                        </div>
                
                        )
                }
            </div>
        </div>