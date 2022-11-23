import React, { useState } from 'react';
import Joi from "joi-browser";

import { validate,handleChange,handleSubmit, renderButton, rederInput } from './helpers/form';

export default function LoginForm() {
    const [data,setData]=useState({username:"",password:""});
    const [errors,setErrors]=useState({});

    const schema={
        username:Joi.string().required("Username"),
        password:Joi.string().required("Password"),

    };

    const doSubmit=()=>{
        console.log("Submitted");
    };


  return (
    <div className="container">
            <h1>Login</h1>
            <form onSubmit={(e)=>handleSubmit(e,data,schema,errors,setErrors,doSubmit)} className="container w-50 m-auto">
                {rederInput(
                 "Username",
                 "username",
                 "text",
                 schema,
                 data,
                 setData,
                 errors,
                 setErrors
                )}
                {rederInput(
                 "Password",
                 "password",
                 "password",
                 schema,
                 data,
                 setData,
                 errors,
                 setErrors
                )}
                {renderButton(data,schema)}
            </form>
        </div>
  )
}
