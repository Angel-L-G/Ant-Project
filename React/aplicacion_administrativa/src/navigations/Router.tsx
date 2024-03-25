import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../screens/Login';

type Props = {}

const Router = (props: Props) => {
  return (
    <div style={{width: "100%", height: "100%", background: "#F3F3F3"}}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Router
