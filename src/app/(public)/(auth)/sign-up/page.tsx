import React from 'react';
import { Metadata } from 'next';
import sharedStyles from '@/app/(public)/(auth)/styles.module.scss';
import SignUpForm from '@/components/features/forms/SignUpForm';

export const metadata: Metadata = {
    title: 'Sign up',
    robots: {
        index: false,
    },
};

const SignUpPage = () => {
    return (
        <>
            <div className={sharedStyles.titleContainer}>
                <h2>Create an account</h2>
                <span>Enter your details below</span>
            </div>
            <SignUpForm />
        </>
    );
};

export default SignUpPage;
