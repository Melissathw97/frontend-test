import { useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { userLogin } from '../../api/auth'
import { routes } from '../../constants/routes'
import { useAuth } from '../../components/auth'
import Input from '../../components/reusable/input'
import Button from '../../components/reusable/button'

const Login = () => {

  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (isAuthenticated) router.push("/dashboard")

  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);

    userLogin(userDetails)
      .then(() => {
        router.push("/dashboard");
      })
      .catch(error => {
        const {
          response: {
            data: {
              error_messages: errorMessages
            } = {} = {}
          } = {}
        } = error;

        if (errorMessages) {
          toast.error(errorMessages[0])
        } else {
          toast.error(error)
        }

        setIsSubmitting(false);
      })
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col rounded-xl bg-white shadow-sm px-5 sm:px-9 py-12 w-full max-w-md">
      <h3 className="text-center pb-12">Sign in to continue to Library</h3>

      <Input
        label="E-mail" name="email"
        type="email"
        onChange={handleChange}
        value={userDetails.email}
        required
      />
      <Input type="password" label="Password" name="password" onChange={handleChange} value={userDetails.password} required />

      <div className="divide-y">
        <div className="flex gap-5 items-center justify-between mt-4 mb-6">
          <Link href={routes.user.resetPassword}>
            <a className="text-sm">Forgot password?</a>
          </Link>
          <Button type="submit" loading={isSubmitting}>
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
  )
}

export default Login;