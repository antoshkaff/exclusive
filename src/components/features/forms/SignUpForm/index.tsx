'use client';

import sharedStyles from '../shared.module.scss';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { FADEIN_VARIANTS } from '@/shared/animations/variants/fadeIn';
import Link from 'next/link';
import { ROUTES } from '@/config/routes.config';
import { useAuthActions } from '@/context/AuthContext';

type FormState = {
    email: string;
    password: string;
};

const SignUpForm = () => {
    const { register } = useAuthActions();

    const [values, setValues] = useState<FormState>({
        email: '',
        password: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (error) setError(null);
            const { name, value } = e.target;
            setValues((s) => ({ ...s, [name]: value }));
        },
        [error],
    );

    const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            setIsLoading(true);
            await register(values);
        } catch (e) {
            setError((e as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className={sharedStyles.form} onSubmit={handleSubmit}>
            <Input
                name={'email'}
                size={'md'}
                variant={'border'}
                placeholder={'Email'}
                type={'email'}
                value={values.email}
                onChange={handleInput}
            />
            <Input
                name={'password'}
                size={'md'}
                variant={'border'}
                placeholder={'Password'}
                type={'password'}
                value={values.password}
                onChange={handleInput}
            />
            {!!error && (
                <motion.span
                    key={error}
                    variants={FADEIN_VARIANTS}
                    initial={'initial'}
                    animate={'animate'}
                    exit={'exit'}
                    className={sharedStyles.form__error}
                >
                    {error || ''}
                </motion.span>
            )}

            <div className={sharedStyles.form__actions}>
                <Button variant={'accent'} type={'submit'}>
                    {isLoading ? 'Loading...' : 'Sign up'}
                </Button>
                <Link href={ROUTES.SIGN_IN}>Already have an account?</Link>
            </div>
        </form>
    );
};

export default SignUpForm;
