import React from 'react';
import { useNavigate,useParams } from 'react-router-dom';

export default function MovieFrom() {
    const {id} =useParams();
    const navigate=useNavigate();
  return (
    <div>
        <h1>movie From {id}</h1>
        <button className='btn btn-primary' onClick={()=>navigate("/")}>Save</button>
    </div>
  );
};
