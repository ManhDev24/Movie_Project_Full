import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../routes/path'
import Navbar from '../Home/Navbar'
interface AuthLayoutProps {
  children: React.ReactNode
}
const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const navigate = useNavigate()
  return (
    <div className=" h-screen overflow-hidden">
      <Navbar />
      <div className="w-full h-full flex items-center justify-center bg-[#f5f5f5] bg-[url('/img/background.jpg')]">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center flex items-center justify-center mb-8 cursor-pointer">
            <img src="/vite.svg" width={80} onClick={() => navigate(PATH.HOME)} alt="Logo" />
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
