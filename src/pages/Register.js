import React, { useMemo } from 'react';
import { FormProvider, useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import LabelInput from '../components/LabelInput';
import { useRegister, useSession } from '../contexts/AuthProvider' ;
import ErrorMessage from '../components/ErrorMessage';

export default function Register() {

    const { error, loading, isAuthed} = useSession();
    const register = useRegister();
    const methods = useForm()
    const history = useHistory();

    const {
        handleSubmit,
        getValues
    } = methods

    useEffect(() => {
        if (isAuthed) {
            history.replace('/')
        }
    }, [isAuthed, history]);


    const ValidationRules = useMemo(() => ({
        Naam: {
            required: "Gebruikersnaam is verplicht",
        },
        Email: {
            required: "Email is verplicht",
          },
          Wachtwoord: {
            required: "Wachtwoord is verplicht",
            minLength: { value: 10, message: "Wachtwoord moet minstens 10 karakters bevatten" },
          },
          Herhaling: {
            required: "Herhaal uw wachtwoord",
            validate: {
              notIdentical: value => {
                const password = getValues('Wachtwoord');
                return password === value ? null : 'Wachtwoord en de herhaling verschillen'
              }
            }
          },
          name: {
            required: true,
          }
    }), [getValues]);

    const handleRegister = useCallback(async ({ Naam, Email, Wachtwoord}) => {
        const succes = await register({
            name: Naam,
            email: Email,
            password: Wachtwoord,
        });

        if(succes) {
            history.replace('/');
        }
    }, [register, history]);

    const handleLogin = useCallback(() => {
        history.replace('/login')
    }, [history])

    return(
        <FormProvider {...methods}>
            <div className="bg-loginregi bg-cover min-h-screen">
                <div className="fixed bottom-0 left-1/3 w-1/3 bg-white pt-16 sm:pb-2 lg:pb-24 px-16 rounded-t-lg border border-gray-700 bg-opacity-80">
                    <h1 className='sm:text-lg  sm:pb-1 lg:text-3xl lg:pb-10 text-gray-700'>Registreren</h1>
                    <form onSubmit={handleSubmit(handleRegister)} className="grid grid-cols-1 lg:gap-y-4 sm:gap-y-1">
                        {
                            error ? (
                                <ErrorMessage error={error}/>
                            ) : null
                        }
                        <div className="border-b border-gray-500 py-2 sm:py-1">
                            <LabelInput 
                            label="Naam"
                            type="text"
                            defaultValue=""
                            placeholder="Uw naam"
                            validation={ValidationRules.Naam}
                            />
                        </div>
                        <div className="border-b border-gray-500 py-2 sm:py-1">
                            <LabelInput 
                            label="Email"
                            type="email"
                            defaultValue=""
                            placeholder="Uw e-mail"
                            validation={ValidationRules.Email}
                            />
                        </div>
                        <div className="border-b border-gray-500 py-2 sm:py-1">
                            <LabelInput 
                            label="Wachtwoord"
                            type="password"
                            defaultValue=""
                            placeholder="Wachtwoord - min. 10 karakters"
                            validation={ValidationRules.Wachtwoord}
                            />
                        </div>
                        <div className="border-b border-gray-500 py-2 sm:py-1">
                            <LabelInput 
                            label="Harhaling wachtwoord"
                            type="password"
                            defaultValue=""
                            placeholder="Herhaling wachtwoord"
                            validation={ValidationRules.Herhaling}
                            />
                        </div>
                        <div className="flex flex-row justify-center">
                            <button type="submit" disabled={loading} className="disabled:opacity-50 text-white bg-gray-800 py-2 rounded-3xl w-full">
                                Registeren
                            </button>
                        </div>
                        <div className='flex flex-row mx-auto sm:text-xs'>
                            <p className='px-1 text-gray-700 lg:text-sm'>Al een account?</p>
                            <p onClick={handleLogin} className='hover: cursor-pointer border-b border-gray-700 text-gray-700 lg:text-sm'>
                                Login!
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </FormProvider>
    )
}
