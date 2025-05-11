import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './LoginPage.css';
import { login } from './api';

export default function LoginPage({ setLoggedIn }) {
    const navigate = useNavigate();

    const LoginSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),    
        password: Yup.string().required('Password is required'),
    });

    const handleSubmit = async (values, { setSubmitting, setErrors, setStatus }) => {
        try {
            await login(values);
            setLoggedIn(true);
            navigate('/');
            console.log('Login successful');
        } catch (e) {
            setStatus('Invalid username or password');
            setErrors({ password: 'Invalid username or password' });
            console.error(e);
        } finally {
            setSubmitting(false);
        }
    };

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
                {isSubmitting && (
                    <div className="login-form-loading-overlay">
                    <p>Logging In...</p>
                    </div>
                )}
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
