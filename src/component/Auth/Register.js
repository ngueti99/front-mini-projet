import Navbar from "../../layout/Navbar";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { useState } from "react";
const Register = () => {
    const history= useHistory();
    const { register, handleSubmit, formState,reset,trigger,setError } = useForm({
      mode:'onChange'
    }
    );
  // const [errorsInput,setErrorsInput]=useState()
    const { errors,isSubmitting,isValid } = formState;
  //gestion des inputs
//     const [registerInput,SetRegisterInput]=useState({
//       name:'',
//       email:'',
//       password:'',
//     });
// const handleInput=(e)=>{
//   e.presist()
// }


//chargement des datas dans la bd
    const onSubmit =  (data )=>{ 
        console.log(data);
  
        return new Promise(resolve => {
          // setTimeout(() => {
          //     resolve();
          // }, 2000);
        axios.get('/sanctum/csrf-cookie')
        .then(response => {
            axios.post(`/api/register`,data).then((res)=>{
              //gestion du success
              
                localStorage.setItem('auth_token',res.data.token)
              localStorage.setItem('auth_user',res.data.user_name)
              resolve();
              reset()
              history.push('/');
              Swal.fire({
                  title: 'welcome!',
                  text: 'bienvenue'+res.data.user_name,
                  icon: 'success',
                  confirmButtonText: 'Ok'
                })
         
                  
            })
            //gestion des erreurs
            .catch(error => {
              console.log(error.response);
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
             
            })
        })
        .catch(err=>{
          resolve();
          console.log(err)
          Swal.fire({
            title: 'desole!',
            text: 'verifiez votre connection',
            icon: 'error',
            confirmButtonText: 'Ok'
          })

        }); 
      })
      };
 

    return ( 
        <div>
        <Navbar/>
        <div className="container py-5">
        <div className="row justify-content-center">
            <div className="col-md-6 ">
                <div className="card shadow">
                    <div className="card-header">
                        <h4>Register</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-floating  mb-5">
                                <input type="text" id="name" name="name" placeholder="name" 
                                // onChange={handleInput} value={registerInput.name}
                                className="form-control"
                                        {...register("name", {
                                            required: "name is required",
                                        })}
                                        onKeyUp={()=>{
                                            trigger("name")
                                        }}/>
                                <label htmlFor="name">name</label>
                                {errors.name && (<small className="text-danger">{errors.name.message}</small>)}
                            </div>
                            <div className="form-floating  mb-5">
                                <input type="text" id="email" name="email" placeholder="email" 
                                // onChange={handleInput} value={registerInput.email}
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
                                <input type="password" id="password" name="password" placeholder="password" 
                                // onChange={handleInput} value={registerInput.password}
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
                            <div className="form-floating  mb-5">
                                <input type="password" id="confirm_password" name="confirm_password" placeholder="confirm_password" 
                                // onChange={handleInput} value={registerInput.confirm_password}
                               className="form-control"
                               {...register("confirm_password", {
                                 required: "confirme password is required",
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
                                 trigger("confirm_password")
                               }}/>
                                <label htmlFor="confirm_password">confirme password</label>
                                {errors.password && ( <small className="text-danger">{errors.password.message}</small>)}
                            </div>
                            <div className="d-grid gap-2  col-6 mx-auto">
                            <button  
                            disabled={isSubmitting||!isValid}  
                            className="btn btn-outline-secondary"
                            >
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                              inscrire
                            </button>
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
 
export default Register;