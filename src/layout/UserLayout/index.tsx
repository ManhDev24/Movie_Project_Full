import React from 'react'

import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { HomeLayout } from '../Home'

const UserLayout = () => {
    return (
        <div>
            
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    )
}

export default UserLayout
