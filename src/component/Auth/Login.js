import Navbar from "../../layout/Navbar";
import { useForm } from 'react-hook-form';
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

const Login = () => {

    const { register, handleSubmit,reset,trigger,setError,formState } = useForm({mode:'onChange'} );
    const { errors,isSubmitting,isValid } = formState;
    const history= useHistory();


    const onSubmit = (data )=>{ 
      console.log(data)
      return new Promise(resolve => {
        axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post(`api/login`,data).then(
          res=>{
            resolve();
            reset();
            if(res.data.status===200){
              localStorage.setItem('auth_token',res.data.token)
              localStorage.setItem('auth_user',res.data.user_name)
              history.push('/');
                          Swal.fire({
                              title: 'welcome!',
                              text: 'bienvenue'+res.data.user_name,
                              icon: 'success',
                              confirmButtonText: 'Ok'
                            })
            }else if(res.data.status===401){
              Swal.fire({
                title: 'inconnu!',
                text: 'verifiez vos identifiant',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
            }
                      }
                    ).catch(error=>{
                        resolve();
                      if(error.response.status===422){
                        for(var [error,errorText] of Object.entries(error.response.data.errors))
                        {
                          setError(`${error}`, {
                                message: `${errorText}`,
                            });
          
                      // console.log(error,":",errorText);
                        }
                      }else if(error.response.status===500){
                         Swal.fire({
                      title: 'Erreur server!',
                      text: 'base de donne',
                      icon: 'error',
                      confirmButtonText: 'Ok'
                    })
                      }
                    });
                  });
      })

      };



    return ( 
        <div>
        <Navbar />
        <div className="container py-5">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header">
                        <h4>Login</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                           
                            <div className="form-floating  mb-5">
                                <input type="text" id="email" name="email" placeholder="email" 
                                 className="form-control"
                                 {...register("email", {
                                   required: "email is required",
                                   pattern:{
                                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                     message: "Invalid email address",
                                   }
                                 })}
                                 onKeyUp={()=>{
                                   trigger("email")
                                 }}/>
                                <label htmlFor="email">email</label>
                                {errors.email && ( <small className="text-danger"> {errors.email.message} </small>)}
                            </div>
                            <div className="form-floating  mb-5">
                                <input type="text" id="password" name="password" placeholder="password" 
                                className="form-control"
                                {...register("password", {
                                  required: "password is required",
                                  minLength: {
                                    value: 8,
                                    message: "Minimum Required length is 10",
                                  },
                                  maxLength: {
                                    value: 50,
                                    message: "Maximum allowed length is 50 ",
                                  }
                                })}
                                onKeyUp={()=>{
                                  trigger("password")
                                }}/>
                                <label htmlFor="password">password</label>
                                {errors.password && ( <small className="text-danger">{errors.password.message}</small>)}
                            </div>
                           
                            <div className="d-grid gap-2  col-6 mx-auto">
                            <button disabled={isSubmitting||!isValid}   
                             className="btn btn-outline-secondary">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                               Secondary</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
     );
}
 
export default Login;