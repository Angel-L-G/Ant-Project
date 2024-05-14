import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../screens/Login';
import Main from '../screens/Main';

type Props = {}

const Router = (props: Props) => {
  return (
    <div style={{ width: "100%", height: "100%"}}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/main" element={<Main />}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Router
