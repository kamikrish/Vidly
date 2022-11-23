import React, { useState } from 'react';
import Joi from "joi-browser";
import { handleSubmit, rederInput, renderButton } from './helpers/form';


export default function RegisterForm() {
  const [data,setData]=useState({username:"",password:"",name:""});
  const [errors,setErrors]=useState({});
  
  const schema={
    username:Joi.string().required().email().label("username"),
    password:Joi.string().required().min(5).label("password"),
    name:Joi.string().required().label("Name"),
  };

  const doSubmit=()=>{
    console.log("Submitted");
  };

  return (
    <div className="container">
            <h1>Register</h1>
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
                {rederInput(
                 "Name",
                 "name",
                 "text",
                 schema,
                 data,
                 setData,
                 errors,
                 setErrors
                )}
                {renderButton(data,schema)}
            </form>
        </div>
  );
}
