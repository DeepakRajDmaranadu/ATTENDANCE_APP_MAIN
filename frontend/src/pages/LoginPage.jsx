import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './LoginPage.css' // 👈 Import the CSS file

const LoginPage = () => {
  const Navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      Navigate('/dashboard')
    }
  }, [Navigate])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handlesubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/auth/login', { email, password })
      const { token, user } = response.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      toast.success(response.data.message)
      Navigate('/dashboard')
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Something went wrong!')
      }
    }
  }

  return (
    <div className="login-bg flex items-center justify-center min-h-screen">
      <div className="glass-card w-96 p-8">
        <h2 className="text-center text-2xl font-bold mb-6 glow-text">Login</h2>

        <form onSubmit={handlesubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-gray-300 font-medium">Email</span>
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="example@email.com"
              className="glass-input input w-full"
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-gray-300 font-medium">Password</span>
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="glass-input input w-full"
              required
            />
          </div>

          <div className="form-control mt-6">
            <button className="glass-btn w-full">Login</button>
          </div>
        </form>

        <p className="text-center mt-4 text-sm text-gray-400">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
