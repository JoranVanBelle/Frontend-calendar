import React from 'react';
import { FormProvider, useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import LabelInput from '../components/LabelInput';
import ValidatieRegels from "../components/Validationrules"; 
import { useLogin, useSession } from '../contexts/AuthProvider';
import ErrorMessage from '../components/ErrorMessage';

export default function Login() {

    const login = useLogin();

    const methods = useForm()
    const history = useHistory();
    const { loading, error, isAuthed } = useSession();
    const {
        handleSubmit,
    } = methods;

    useEffect(() => {
        if(isAuthed) {
            history.replace('/')
        }
    }, [history, isAuthed]);

    const handleLogin = useCallback(async ({ Email, Wachtwoord }) => {
        const succes = await login(Email, Wachtwoord);

        if (succes) {
            history.replace('/')
        }
    }, [login, history]);

    const handleRegister = useCallback(() => {
        history.replace('/register')
    }, [history])

    return(
        <FormProvider {...methods}>
            <div className=" bg-loginregi bg-cover min-h-screen h-screen">
            <div className="fixed bottom-0 left-1/3 w-1/3 mx-auto sm:pb-2 sm:text-xs lg:pb-40 bg-white py-16 px-16 rounded-t-lg border border-gray-700 bg-opacity-80">
                <h1  className='sm:text-lg  sm:pb-1 lg:text-3xl lg:pb-10 text-gray-700'>Log in</h1>
                <form onSubmit={handleSubmit(handleLogin)} className="grid grid-cols-1 gap-y-4">
                    <div className="border-b border-gray-500 pb-1">
                        {
                            error ? (
                                <ErrorMessage error={error} />
                             ) : null
                        }
                        <LabelInput 
                        label="Email"
                        type="email"
                        defaultValue=""
                        placeholder="Uw e-mail"
                        validation={ValidatieRegels.email}
                        data-cy="email_input"
                        />
                    </div>
                    <div className="border-b border-gray-500 pb-1">
                        <LabelInput 
                        label="Wachtwoord"
                        type="password"
                        defaultValue=""
                        placeholder="Wachtwoord"
                        validation={ValidatieRegels.password}
                        data-cy="password_input"
                        />
                    </div>
                    <div className="flex flex-row justify-center sm:pt-8 pt-10">
                        <button type="submit" disabled={loading} data-cy="submit_btn" className="lg:text-lg disabled:opacity-50 text-white bg-gray-800 py-2 rounded-3xl w-full">
                            Login
                        </button>
                    </div>
                    <div className="flex flex-row mx-auto">
                        <p className="sm:pr-1 lg:text-sm sm:text-xs text-gray-700">Nog geen account?</p>
                        <p onClick={handleRegister} className="hover: cursor-pointer border-b border-gray-700 text-gray-700 lg:text-sm sm:text-xs">
                            Registreer!
                        </p>
                    </div>
                </form>
            </div>
            </div>
        </FormProvider>
    )
}
