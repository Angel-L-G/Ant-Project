import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Main from '../screens/Main';

type Props = {}

const Router = (props: Props) => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/main" element={<Main />}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Router
