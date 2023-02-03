import React from "react";
import { Route, Routes} from "react-router-dom";
import Home from "./Home";
import Submit from "./Submit";
import Data from "./Data";
function App() {
  
  return (
    <>
        <Routes>
        <Route path="/" element={<Home/>}/>
           <Route path="/about" element={<Submit/>}/>
           <Route path="/next" element={<Data/>}/>
        </Routes>
    </>
  )
}

export default App;
