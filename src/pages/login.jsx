import {AuthLayout} from '@/components/AuthLayout'
import {Button} from '@/components/Button'
import {TextField} from '@/components/Fields'
import {Formik} from "formik";
import {toast} from "react-toastify";
import {signIn} from "next-auth/react";

const Login = () => {
    const initialValues = {
        username: '',
        password: '',
    }

    const onSubmit = async (values, {setSubmitting}) => {
        setSubmitting(true)
        try {
            const result = await signIn('credentials', {
                redirect: false, username: values.username, password: values.password
            });
            if (result?.error) {
                toast.error(result.error);
            } else {
                window.location.href = '/';
            }
        }catch (e) {
            toast.error(e.message)
        }finally {
            setSubmitting(false)
        }
    }

    return (
        <>
            <AuthLayout
                title="Sign In - Qalam"
            >
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {({values, handleChange, isSubmitting, handleSubmit}) => (
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                <TextField
                                    label="Username"
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    value={values.username}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Password"
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={values.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <Button type="submit" disabled={isSubmitting} color="cyan" className="mt-8 w-full">
                                {isSubmitting ? 'Signing in...' : 'Sign in'}
                            </Button>
                            {isSubmitting && (
                                <p className='text-center text-gray-500 text-sm mt-2'>Your fav tool Qalam is doing some useless shit...</p>
                            )}
                        </form>
                    )}
                </Formik>
            </AuthLayout>
        </>
    )
}

export default Login
