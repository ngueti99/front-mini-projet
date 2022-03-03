import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom"
const Navbar= () => {
  const history= useHistory();
const logoutSubmit=(e)=>{
e.preventDefault();

axios.post(`/api/logout`).then(
  res=>{
    localStorage.removeItem('auth_token',res.data.token)
              localStorage.removeItem('auth_user')
              localStorage.removeItem('auth_token')
              history.push('/');
                          Swal.fire({
                              title: 'deconnection!',
                              text: 'A bientot',
                              icon: 'success',
                              confirmButtonText: 'Ok'
                            })
  }
).catch()

}

  var authbuttons='';
  if(!localStorage.getItem('auth_token')){
    authbuttons=(<ul> 
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                  </ul>);
  }else{
    authbuttons=(<ul><li  className="nav-item">
                    <button onClick={logoutSubmit} className=" nav-link btn btn-danger btn-sm text-white" to="#!">Logout</button>
                    </li>
                  </ul>);
  }
    return ( 
      <nav className="navbar navbar-expand-lg navbar-light bg-primary shadow sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">Navbar</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
           {authbuttons}

            {/* <li className="nav-item">
              <Link className="nav-link disabled" to="#" tabindex="-1" aria-disabled="true">Disabled</Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
     );
}
 
export default Navbar
;