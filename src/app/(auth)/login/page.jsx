import Link from 'next/link'


import {Button} from '@/components/Button'
import {TextField} from '@/components/Fields'
import {Logo} from '@/components/Logo'
import {SlimLayout} from '@/components/SlimLayout'


export const metadata = {
    title: 'Sign In',
}

export default function Login({searchParams}) {
    return (
        <div className="-mt-20">

            <SlimLayout>
                <div className="flex">

                    <Logo/>
                </div>
                <h2 className="mt-20 text-lg font-semibold text-gray-900">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-sm text-gray-700">
                    Don’t have an account?{' '}
                    <Link
                        href="/register"
                        className="font-medium text-blue-600 hover:underline"
                    >
                        Sign up
                    </Link>{' '}
                    for a free.
                </p>
                <form method="post"
                      action="/auth/sign-in" className="mt-10 grid grid-cols-1 gap-y-8">
                    <TextField
                        label="Work email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                    />
                    <div>


                        <Button type="submit" variant="solid" color="blue" className="w-full">
            <span>
              Sign in <span aria-hidden="true">&rarr;</span>
            </span>
                        </Button>
                    </div>
                    <p className="text-red-600">
                        {searchParams.error}
                    </p>
                </form>
            </SlimLayout>

        </div>
    )
}
