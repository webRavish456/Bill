import React, {useState } from "react";
import { useNavigate } from 'react-router-dom';
import Depo from "./Depo.png";
import "./index.css";
function Home()
{
    const [user,setuser]=useState({
        BillAdd:"",
        ShipAdd:"",
        Dsin:"",
        Item:"",
        MRP:"",
        HSN:"",
        GST:"",
        Quantity:"",
        Discount:""
      })
      const navigate = useNavigate();
    
    
     const handleinput=(e)=>
     {
           const name=e.target.name;
           const value=e.target.value;
           setuser({...user,[name]:value});
    
     }
    
    const scrolling=(e)=>
    {
        e.target.style.height='16px';
        e.target.style.height=`${e.target.scrollHeight}px`;
    }
    
      async function postdata(e)
     {
           e.preventDefault();
           const {BillAdd,ShipAdd, Dsin,Item,MRP,Discount,HSN, GST,   Quantity}=user;
         
           if(!Dsin || !Item || !MRP ||!Discount || !HSN || !GST ||  !Quantity)
      {
          alert("Please filled all the data")
          navigate("/");
      }
           const res= await fetch("https://invoice-4qqo.onrender.com/submit", {
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({
              BillAdd,ShipAdd,  Dsin,Item,MRP,Discount,HSN, GST,   Quantity 
            })
           });
    
           const re= await res.json();
           setuser({   BillAdd:"",
           ShipAdd:"",
           Dsin:"",
           Item:"",
           MRP:"",
           HSN:"",
           GST:"",
           Quantity:"",
           Discount:""})
       
     }
     function forward()
     {
        navigate("/next");
  
     }
     function move()
     {
        navigate("/about");
     }
      return (
        <>
             <div className="bdy">
              <div className="header">
              <div className="logo">
              <img src={Depo} alt="logo"/>
              </div>
              <div className="head">
              <h1 style={{minInlineSize:"34rem"}}><center>Depo Solutions Private Limited</center></h1>
              <address><center>7/1/A, Christopher Road, Topsia, Kolkata-700046  West Bengal GSTIN: 19AAJCD1058P1Z4 </center></address>
              </div>
              </div>
              <div className="form1">
              <form method="POST">
              <label  htmlFor="BillAdd">Billing Address</label><br></br>
              <textarea onKeyDown={scrolling} className="bill" value={user.BillAdd} name="BillAdd" onChange={handleinput} row={1} required={true} /><br></br>
              <label htmlFor="ShipAdd">Shipping Address</label><br></br>
              <textarea onKeyDown={scrolling} className="bill"   value={user.ShipAdd} name="ShipAdd" onChange={handleinput}  row={1} required={true} /><br></br>
              <label htmlFor="Dsin" >DSIN</label><br></br>
              <input type="text" value={user.Dsin} name="Dsin" onChange={handleinput} required={true}/><br></br>
              <label htmlFor="Item" >Item</label><br></br>
              <textarea onKeyDown={scrolling} className="bill"  value={user.Item} name="Item" onChange={handleinput}  row={1}  required={true}/><br></br>
              <label htmlFor="Quantity" >Quantity</label><br></br>
              <input type="number" value={user.Quantity} name="Quantity" onChange={handleinput}  required={true}/><br></br>
              <label htmlFor="Discount" >Discount</label><br></br>
              <input type="number" value={user.Discount} name="Discount" onChange={handleinput}  required={true}/><br></br>
              <label htmlFor="HSN" >HSN Code</label><br></br>
              <input type="number" value={user.HSN} name="HSN" onChange={handleinput} required={true}/><br></br>
              <label htmlFor="GST" >GST</label><br></br>
              <input type="number" value={user.GST} name="GST" onChange={handleinput} required={true}/><br></br>
              <label htmlFor="MRP" className="mrp">MRP</label><br></br>
              <input type="number" value={user.MRP} name="MRP" onChange={handleinput}  required={true}/><br></br><br></br>
              <button className="but" onClick={(e)=>{forward();postdata(e)}}>Next</button>
            </form>
            <button className="but" onClick={(e)=>{move();postdata(e)}}>Submit</button>
            </div>
            </div>
        </>
          
        
      );
}
export default Home;
