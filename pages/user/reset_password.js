import Link from 'next/link'
import Button from '../../components/reusable/button'
import { routes } from '../../constants/routes';

const ResetPassword = () => {
  return (
    <div className="bg-secondary min-h-screen flex-center px-5">
      <div className="flex flex-col rounded-xl bg-white shadow-sm px-9 py-12 w-full max-w-md">
        <h3 className="text-center pb-12">Forgot your password? We get it.</h3>
        <p className="text-center pb-12">
          Unfortunately, we're still working on this page.
          <br />
          Do register an account with us instead.
        </p>

        <div className="flex justify-end">
          <Link href={routes.user.register}>
            <Button>
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword;