import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './LoginPage.css';

export default function LoginPage() {
    const [loading, setLoading] = useState(false);

    const LoginSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),    
        password: Yup.string().required('Password is required'),
    });

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        setLoading(true);
        // Simulate an async operation (e.g., API call) with a delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        alert(`Username: ${values.username}\nPassword: ${values.password}`);
        setSubmitting(false);
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <p className="loading-text">Loading...</p>
            </div>
        );
    }

    return (
        
        <div className="login-container">
        <h1 className="login-header">Log In</h1>
        <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
        >
            {({ isSubmitting }) => (
            <Form className="login-form">
                <div className="form-group">
                <label htmlFor="username">Username</label>
                <Field type="text" id="username" name="username" />
                <ErrorMessage name="username" component="div" className="form-error" />
                </div>

                <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage name="password" component="div" className="form-error" />
                </div>

                <button type="submit" disabled={isSubmitting} className="submit-button">
                {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </Form>
            )}
        </Formik>
        </div>
    );
}
