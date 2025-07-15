import React, { use } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Navigate } from 'react-router'

function PrivateRoutes({children}) {
    const {user, loading} = use(AuthContext)
    if(loading) {
        return <div className="flex justify-center items-center h-screen">
            <span className="loading loading-ring loading-xl"></span>
        </div>
    }
    if (!user) {
        return <Navigate to="/login" />
    }
    return children;
}

export default PrivateRoutes