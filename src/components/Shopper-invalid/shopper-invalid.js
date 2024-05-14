import { Link } from "react-router-dom";
export function ShopperInvalid() {

    
    return (
        <div className="text-danger text-center" style={{display:'flex',justifyContent:'center'}}>

            
            <div>
                <h3>Invalid User Name / Password</h3>
                <br></br>
                <Link to="/login" className="btn btn-warning">Try again</Link>
            </div>
        </div>
    )
}