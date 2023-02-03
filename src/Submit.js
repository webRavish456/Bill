import React, { useEffect, useState } from "react";
import Depo from "./Depo.png";
import { useNavigate } from 'react-router-dom';
import "./submit.css";
import { ToWords } from 'to-words';
import axios from "axios";
function Submit()
{
    const [item,setitem]=useState([{
        BillAdd:"",
        ShipAdd:"",
        Dsin:"",
        GST:"",
        MRP:"",
        Quantity:"",
        Item:"",
        HSN:"",
        Discount:"",
    }])

    const navigate = useNavigate();

    function home()
    {
        navigate("/");
        
    }

   useEffect(()=>{
     const fetchdata=async ()=>{
        const {data}=await axios.get("https://invoice-4qqo.onrender.com/datas/about");
        setitem(data);
     };
     fetchdata();
   },[])

  

   const subtotal=(item.reduce((total,currentItem) =>  total = total + (currentItem.Quantity * currentItem.MRP.$numberDecimal * currentItem.Discount)/100 , 0 ));
   const cgst=(item.reduce((total,currentItem) =>  total =  total + (currentItem.Quantity * currentItem.MRP.$numberDecimal * currentItem.Discount*currentItem.GST.$numberDecimal )/20000 , 0 ));
   const sgst=(item.reduce((total,currentItem) =>  total = total + (currentItem.Quantity * currentItem.MRP.$numberDecimal * currentItem.Discount*currentItem.GST.$numberDecimal )/20000 , 0 ));
   let total=(subtotal+cgst+sgst);

 if(isNaN(total))
 {
    total=0;
    const toWords=new ToWords();
    var words=toWords.convert(total.toFixed(2),{currency:true});
 }
 else{
    const toWords=new ToWords();
    var words=toWords.convert(total.toFixed(2),{currency:true});
 }

         const date= new Date().toLocaleDateString();
        

      return (
        <>
          <div className="cloud"> 
             <div className="header">
             <div className="logo">
             <button className="button" onClick={home}>Home</button>
          <img src={Depo} alt="logo"/>
          </div>
          <div className="head">
          <h1 style={{minInlineSize:"34rem"}}><center>Depo Solutions Private Limited</center></h1>
          <address><center>7/1/A, Christopher Road, Topsia, Kolkata-700046  West Bengal GSTIN: 19AAJCD1058P1Z4 </center></address>
          </div>
          </div>
          <h1 className="h1">Proforma Invoice</h1>
       
          <table style={{width:"100%"}}>
           <tr>  
                 <td style={{width:"50%"}}> <div className="depo"> <td className="td1">#</td>
                   <td className="td2">: DEPO/KOL/PI/000007</td></div>
                   <div className="depo">
                   <td className="td1">Estimate Date</td>
                   <td className="td2">:{date}</td>
                   </div>
                
                 </td>
                 <td> <div className="depo"> <td className="td1">Place of Supply</td>
                   <td className="td2">: West Bengal</td></div>
                 </td>
               
           </tr>
           <tr>
                  <td style={{color:"gray",backgroundColor:"lightgray",fontWeight:"bold"}}>Bill To</td>
                  <td style={{color:"gray",backgroundColor:"lightgray",fontWeight:"bold"}}>Ship To</td>
           </tr>
                    
                        <td className="add">{item[0].BillAdd}</td>
                        <td className="add">{item[0].ShipAdd}</td>
                         
          </table>
          <table style={{width:"100%"}} >
                 <tr className="table">
                  <th>#</th>
                  <th style={{width:"20%"}}>Items & Description</th>
                  <th>HSN/SAC</th>
                  <th>Qty</th>
                  <th>Rate</th>
                  <th>Discount</th>
                  <th rowSpan="2">CGST
                  <div  className="th">
                     <td className="td">%</td>
                     <div className="vl"></div>
                     <td className="td">Amt</td></div>
                     </th>
                     <th rowSpan="2">SGST
                  <div  className="th">
                     <td className="td">%</td>
                     <div className="vl"></div>
                     <td className="td">Amt</td></div>
                     </th>
                 
                  <th>Amount</th>
                  </tr>
                  <tbody className="tbody">
                  
                  {
                    item.map((cur)=>{
                    
                    return(
                        <>
                        <tr>
                        <td className="inc"></td>
                        <td>{cur.Item}
                          <td className="td3">SKU:{cur.Dsin}</td></td>
                        <td><center>{cur.HSN}</center></td>
                        <td><center>{cur.Quantity}  Pcs</center></td>
                        <td><center>{cur.MRP.$numberDecimal}</center></td>
                        <td><center>{cur.Discount}%</center></td>
                        <td>
                       <div  className="th1">
                     <td className="td">{cur.GST.$numberDecimal/2}%</td>
                     <div className="vl2"></div>
                     <td className="td">{(cur.Quantity * cur.MRP.$numberDecimal * cur.Discount*cur.GST.$numberDecimal )/20000}</td></div>
                       </td>
                  
                     <td>
                       <div  className="th1">
                     <td className="td">{cur.GST.$numberDecimal/2}%</td>
                     <div className="vl2"></div>
                     <td className="td">{(cur.Quantity * cur.MRP.$numberDecimal * cur.Discount*cur.GST.$numberDecimal )/20000}</td></div>
                       </td>
                        <td><center>{(cur.Quantity * cur.MRP.$numberDecimal * cur.Discount)/100}</center></td>
                        </tr>
                       
                        </>
                    )
                      
                  })
                 }
                
                  </tbody>
          </table>
                           
                               
                          <div>
                             <div>
                                <p>Total In Words</p>
                                <p><b>{words}</b></p>
                             </div>
                             <div className="total">
                             <div> <div className="depo"> <td className="td1">Sub Total</td>
                              <td className="td1">: {subtotal.toFixed(2)}</td></div>
                            </div>
                            <div> <div className="depo"> <td className="td1">CGST(9%)</td>
                              <td className="td1">: {cgst.toFixed(2)}</td></div>
                            </div>
                            <div> <div className="depo"> <td className="td1">SGST(9%)</td>
                              <td className="td1">: {sgst.toFixed(2)}</td></div>
                            </div>
                                 <div> <div className="depo"> <td className="td1"><b>Total</b></td>
                              <td className="td2">: {total.toFixed(2)}</td></div>
                            </div>
                             </div>
                             <div className="sig">
                                 <div>Authorized Signature</div>
                             </div>
                          </div>
                          <p>Looking forward for your business</p>
          <div>
                 

          </div>
</div> 
        </>
      )
}
export default Submit;