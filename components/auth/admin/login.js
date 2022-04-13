import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { api, routes } from './api'
import { toast } from 'react-toastify';
import Input from '../../reusable/input'
import Button from '../../reusable/button'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isloaded: true,
      error: false,
      err_msg: "",
    };
  }

  handleChange = (e) => {
    if (e.target.name) {
      this.setState({ [e.target.name]: e.target.value });
    } else {
      this.setState({ [e.currentTarget.name]: "" });
    }
  }

  login = (e) => {
    e.preventDefault();
    this.setState({ isloaded: false, error: false })
    api.post(routes.sign_in, {
      admin: {
        email: this.state.email,
        password: this.state.password} 
    })
    .then(res => {
      if (res.headers.authorization) {
        const token = res.headers.authorization;
        Cookies.set('adminToken', token, { expires: 7 }); // 7 days expiry
        api.defaults.headers.Authorization = token;
      }
      Router.reload();
    })
    .catch(err => {
      this.setState({ error: true, isloaded: true });
      toast.error(JSON.stringify(err.response?.data?.error || err.response?.data?.message || err.message || "An unexpected error has occurred"))
    })
  }

  render () {
    return (
      <div className="bg-secondary min-h-screen flex-center px-5">
        <h3 className="text-white fixed top-5 left-5">Griter</h3>
        <form onSubmit={this.login} className="flex flex-col rounded-xl bg-white shadow-sm px-9 py-12 w-full max-w-md">
          <h3 className="text-center pb-12">Sign in to continue to Griter Admin</h3>

          <Input label="Your email or phone number" name="email" onChange={this.handleChange} value={this.state.email} required/>
          <Input type="password" label="Password" name="password" onChange={this.handleChange} value={this.state.password} required/>                                

          <div className="flex gap-5 items-center justify-between mt-8">
            <Link href="/auth/reset-password"><a className="text-sm">Forgot password?</a></Link>
            <Button type="submit" loading={!this.state.isloaded}>Login</Button>
          </div>
        </form>
      </div>
    )
  }
}

export default Login;