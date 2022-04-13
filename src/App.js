import React, { createContext, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import Products from "./components/Products";
import Cart from "./components/Cart";

import { data } from "./data";  

export const BooksContext=createContext();

export default function App() {
  const [state, setState] = useState({bookList:data,cart:[]})

  const addToCart=(book)=>setState({...state,
    cart:state.cart.find((cartItem)=>cartItem.id===book.id)
  ?state.cart.map((cartItem)=>
    cartItem===book.id
    ?{...cartItem,count:cartItem.count+1}
    :cartItem
    ):
    [...state.cart,{...book,count:1}]
  });

const increase = (id) =>{
  setState({...state,cart:state.cart.map(cartItem=>cartItem.id===id ? {...cartItem,count:cartItem.count+1}:cartItem)})
}
const decrease = (id) =>{
  setState({...state,cart:state.cart.map(cartItem=>cartItem.id===id ? {...cartItem,count:cartItem.count>1 ? cartItem.count-1:1}:cartItem)})
}


const removeFromCart = (id)=>setState({
  ...state,
  cart:state.cart.filter(cartItem => cartItem.id !== id)
})
  return (
    <BooksContext.Provider value={{state:state,addToCart,increase,decrease,removeFromCart}}>
    <div>
    <Routes>
      <Route exact path="/" element={<Products/>} />
      <Route path="/cart" element={<Cart/>} />
    </Routes>
    </div>
    </BooksContext.Provider>
  );
}
