import React from 'react';
import sharedStyles from '../styles.module.scss';
import { Metadata } from 'next';
import SignInForm from '@/components/features/forms/SignInForm';

export const metadata: Metadata = {
    title: 'Sign in',
    robots: {
        index: false,
    },
};

const SignInPage = () => {
    return (
        <>
            <div className={sharedStyles.titleContainer}>
                <h2>Log in to Exclusive</h2>
                <span>Enter your details below</span>
            </div>
            <SignInForm />
        </>
    );
};

export default SignInPage;
