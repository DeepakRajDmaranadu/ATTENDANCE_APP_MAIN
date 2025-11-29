import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'

const RegisterPage = () => {
    const Navigator=useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/auth/register', { email, password })
            toast.success(response.data.message)
            Navigator('/')
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message); // show backend error
            } else {
                toast.error("Something went wrong!");
            }
        }
    }
    return (
        <div>
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="text-center text-2xl font-bold mb-4">Create Account</h2>
                        <h1>username : {email}</h1>
                        <h1>password : {password}</h1>

                        <form onSubmit={handlesubmit}>
                            {/* Email Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Email ID</span>
                                </label>
                                <input onChange={(e) => { setEmail(e.target.value) }}
                                    type="email"
                                    placeholder="example@email.com"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            {/* Password Field */}
                            <div className="form-control mt-3">
                                <label className="label">
                                    <span className="label-text font-medium">Password</span>
                                </label>
                                <input onChange={(e) => { setPassword(e.target.value) }}
                                    type="password"
                                    placeholder="Enter your password"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            {/* Confirm Password Field */}
                            <div className="form-control mt-3">
                                <label className="label">
                                    <span className="label-text font-medium">Confirm Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Re-enter your password"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            {/* Register Button */}
                            <div className="form-control mt-6">
                                <button className="btn btn-primary w-full">Register</button>
                            </div>
                        </form>

                        {/* Already have an account */}
                        <p className="text-center mt-3 text-sm">
                            Already have an account?{" "}
                            <Link className="link link-primary" to='/login'>
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
