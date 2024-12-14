'use client';

import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './Modal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Heading from '../Heading';

import toast from 'react-hot-toast';
import Button from '../Button';
import { useRouter } from 'next/navigation';
import useLoginModal from '@/app/hooks/useLoginModal';
import Input from '../inputs/Input';

const LoginModal = () => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            name: '',
            contactPhone: '',
            password: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false,
        })
        .then((callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                toast.success('Logged In');
                router.refresh();
                loginModal.onClose();
            } else if (callback?.error) {
                toast.error(callback.error || 'An error occurred during login');
            }
        })
        .catch(() => {
            setIsLoading(false);
            toast.error('An unexpected error occurred. Please try again.');
        });
    };

    const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal]);

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title='Welcome back!'
                subtitle="Login to your account"
                center
            />
            <Input
                id='email'
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id='password'
                label='Password'
                type='password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={() => {
                    setIsLoading(true);
                    signIn('google').catch(() => {
                        setIsLoading(false);
                        toast.error('Google sign-in failed. Please try again.');
                    });
                }}
                disabled={isLoading}
                aria-label="Sign in with Google"
            />

            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='justify-center flex flex-row items-center gap-2'>
                    <div>First time using Elite Fields?</div>
                    <div
                        onClick={toggle}
                        className='text-neutral-800 cursor-pointer hover:underline'
                        role="button"
                        tabIndex={0}
                        aria-label="Sign up"
                    >
                        Sign up
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title='Login'
            actionLabel={isLoading ? 'Logging in...' : 'Continue'}
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default LoginModal;
