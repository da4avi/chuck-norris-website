import './App.css'
import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './auth/Context'

function App() {
    return (
        <AuthProvider>
            <AppRoutes/>
        </AuthProvider>
    )
}
export default App
