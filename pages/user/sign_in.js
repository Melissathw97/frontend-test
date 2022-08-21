import { useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { toast } from 'react-toastify'
import Input from '../../components/reusable/input'
import * as Layouts from '../../components/layouts'
import Button from '../../components/reusable/button'
import { userLogin } from '../../components/auth/admin/api'
import { routes } from '../../constants/routes'

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    if (e.target.name) {
      setUserDetails({
        ...userDetails,
        [e.target.name]: e.target.value
      })
    } else {
      setUserDetails({
        ...userDetails,
        [e.currentTarget.name]: ""
      })
    }
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);

    userLogin(userDetails)
      .then(() => {
        Router.push("/dashboard");
      })
      .catch(({ response: { data: { error_messages: errorMessages } } }) => {
        if (errorMessages) errorMessages.forEach(errorMessage => toast.error(errorMessage));
        setIsLoading(false);
      })
  }

  return (
    <Layouts.Auth>
      <form onSubmit={onSubmitHandler} className="flex flex-col rounded-xl bg-white shadow-sm px-9 py-12 w-full max-w-md">
        <h3 className="text-center pb-12">Sign in to continue to Library</h3>

        <Input label="E-mail" name="email" type="email" onChange={handleChange} value={userDetails.email} required />
        <Input type="password" label="Password" name="password" onChange={handleChange} value={userDetails.password} required />

        <div className="divide-y">
          <div className="flex gap-5 items-center justify-between mt-8 mb-8">
            <Link href={routes.user.resetPassword}>
              <a className="text-sm">Forgot password?</a>
            </Link>
            <Button type="submit" loading={isLoading}>
              Sign in
            </Button>
          </div>

          <div className="text-center text-sm pt-6">
            <p>
              Don’t have an account?&nbsp;
              <Link href={routes.user.register}>
                <a className="underline">Register here</a>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </Layouts.Auth>
  )
}

export default Login;