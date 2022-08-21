import { useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { toast } from 'react-toastify'
import { routes } from '../../constants/routes'
import Input from '../../components/reusable/input'
import * as Layouts from '../../components/layouts'
import Button from '../../components/reusable/button'
import { userRegister } from '../../components/auth/admin/api'

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: '',
    name: '',
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

    userRegister(userDetails)
      .then(() => {
        Router.push("/dashboard");
      })
      .catch(({ response: { data: { error_messages: errorMessages } } }) => {
        errorMessages.forEach(errorMessage => toast.error(errorMessage))
        setIsLoading(false);
      })
  }

  return (
    <Layouts.Auth>
      <form onSubmit={onSubmitHandler} className="flex flex-col rounded-xl bg-white shadow-sm px-9 py-12 w-full max-w-md">
        <h3 className="text-center pb-12">Register to Library</h3>

        <Input label="E-mail" name="email" type="email" onChange={handleChange} value={userDetails.email} required />
        <Input label="Name" name="name" onChange={handleChange} value={userDetails.name} required />
        <Input type="password" label="Password" name="password" onChange={handleChange} value={userDetails.password} required />

        <div className="divide-y">
          <div className="flex gap-5 items-center justify-end mt-8 mb-8">
            <Button type="submit" loading={isLoading}>
              Register
            </Button>
          </div>

          <div className="text-center text-sm pt-6">
            <p>
              Already have an account?&nbsp;
              <Link href={routes.user.login}>
                <a className="underline">Sign in here</a>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </Layouts.Auth>
  )
}

export default Register;