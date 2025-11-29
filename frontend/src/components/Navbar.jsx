import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="flex-1">
                    <Link className="btn btn-ghost text-xl" to='/'>daisyUI</Link>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <Link to='/login'>Login</Link>

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
