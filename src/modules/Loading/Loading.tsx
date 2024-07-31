import React from 'react'
import 'antd/dist/reset.css'

const LoadingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-4">
        <img src="/img/logo.png" alt="Loading" className="w-32 h-auto" />
      </div>
      <div className="w-full max-w-xs">
        <div className="relative pt-1">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-700">Loading...</div>
          </div>
          <div className="flex h-2 mb-4 mt-2">
            <div className="w-1/4 bg-blue-500 animate-pulse" />
            <div className="w-1/4 bg-blue-400 animate-pulse" />
            <div className="w-1/4 bg-blue-300 animate-pulse" />
            <div className="w-1/4 bg-blue-200 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingPage
