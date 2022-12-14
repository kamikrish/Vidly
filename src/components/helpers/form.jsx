import React from 'react'
import Joi, { errors } from "joi-browser"

export const validate=(data,schema)=>{
    const result=Joi.validate(data,schema,{
        abortEarly:false,
    });
    if(!result.error) return null;

    const formErrors ={};
    for (let item of result.error.details){
        formErrors[item.path[0]]=item.message;
    }
    return formErrors;
};
export const validatePrperty = ({id,value},schema)=>{
    const obj={[id]:value};
    const currentSchema ={[id]:schema[id]};
    const {error}=Joi.validate(obj,currentSchema);
    return error ? error.details[0].message :null;
    
};

export const handleChange = (e,schema,data,setData,errors,setErrors)=>{
    const {id,value}=e.target;
    setData((prevState)=>({
        ...prevState,
        [id]:value,
    }));
    const errorMessage = validatePrperty({id,value});
    if(errorMessage){
        setErrors((prevState)=>({
            ...prevState,
            [id]:errorMessage,
        }));
    }
    else delete errors[id];
};

export const handleSubmit =(e,data,schema,errors,setErrors,doSubmit) =>{
    e.preventDefault();
    setErrors(validate(data,schema) ?? {});
    doSubmit();
};


export const rederInput=(
    label,
    id,
    type,
    schema,
    data,
    setData,
    errors,
    setErrors
)=>{
    return (
        <div className='form-group mt-3'>
            <label htmlFor={id}>{label}</label>
            <input
            autoFocus
            onChange={(e)=> handleChange(e,schema,data,setData,errors,setErrors)
            }
            id={id}
            type={type}
            className="form-control mt-2"
            />
            {errors[id] && <div className='alert alert-danger'>{errors[id]}</div>}
        </div>
    );
};

export const renderButton =(data,schema)=>{
    return (
        <div className='mt-3'>
                <button disabled={validate(data,schema)} className="btn btn-primary">Login</button>   
        </div>
    );
};