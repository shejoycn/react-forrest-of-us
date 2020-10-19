import React, { useState } from "react"
import Axios from "axios"

function RegisterForm() {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      await Axios.post("/register", { username, password, email })
      console.log("user was successfully created")
    } catch (e) {
      console.log("error occured : e ==>" + e)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username-register" className="text-muted mb-1">
          <small>Username</small>
        </label>
        <input onChange={e => setUsername(e.target.value)} id="username-register" name="username" className="form-control" type="text" placeholder="Pick a username" autoComplete="off" />
      </div>
      <div className="form-group">
        <label htmlFor="email-register" className="text-muted mb-1">
          <small>Email</small>
        </label>
        <input onChange={e => setEmail(e.target.value)} id="email-register" name="email" className="form-control" type="text" placeholder="you@example.com" autoComplete="off" />
      </div>
      <div className="form-group">
        <label htmlFor="password-register" className="text-muted mb-1">
          <small>Password</small>
        </label>
        <input onChange={e => setPassword(e.target.value)} id="password-register" name="password" className="form-control" type="password" placeholder="Create a password" />
      </div>
      <button type="submit" className="py-3 mt-4 btn btn-lg btn-success btn-block">
        Sign up for ComplexApp
      </button>
    </form>
  )
}

export default RegisterForm
