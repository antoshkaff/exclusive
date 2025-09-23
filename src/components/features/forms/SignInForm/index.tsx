'use client';

import sharedStyles from '../shared.module.scss';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { ChangeEvent, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { FADEIN_VARIANTS } from '@/shared/animations/variants/fadeIn';
import Link from 'next/link';
import { ROUTES } from '@/config/routes.config';
import { useAuthActions } from '@/context/AuthContext';

type FormState = {
    email: string;
    password: string;
};

const SignInForm = () => {
    const [values, setValues] = useState<FormState>({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuthActions();

    const handleInput = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            if (error) {
                setError('');
            }

            setValues((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value,
            }));
        },
        [error],
    );

    const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            setIsLoading(true);
            await login(values);
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
                    {isLoading ? 'Loading...' : 'Log in'}
                </Button>
                <Link href={ROUTES.SIGN_UP}>Don't Have An Account?</Link>
            </div>
        </form>
    );
};

export default SignInForm;
