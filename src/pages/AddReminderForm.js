import React, {useCallback} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {useReminders} from '../contexts/ReminderProvider';
import {useEvents} from '../contexts/EventProvider';
import { useHistory } from 'react-router-dom';
import {IoCheckmarkSharp, IoReturnDownBackSharp} from 'react-icons/io5';
import LabelInput from '../components/LabelInput';
import ErrorMessage from '../components/ErrorMessage';
import { sendEmailCreateReminder } from "../components/Email";
import ValidatieRegels from '../components/Validationrules';
import { useSession } from '../contexts/AuthProvider';

export default function AddReminderForm() {

    const {error, getReminderWithId, saveReminder} = useReminders();
    const {currentEvent} = useEvents();
    const { user } = useSession();

    const history = useHistory();
    const methods = useForm();
    const {handleSubmit} = methods;

    const onSubmit = useCallback(async (data) => {
        const {description, date, time} = data;
        const dateAsISO = new Date(date.split('-')[0], date.split('-')[1]-1, date.split('-')[2], Number(time.split(':')[0])+1, time.split(':')[1]);
        await saveReminder({
            eventId: currentEvent.event.id,
            description,
            date: dateAsISO,
        });
        sendEmailCreateReminder(currentEvent.event.title, user.name, date, time, user.email)
        history.push(`/events/edit/${currentEvent.event.id}`)
    }, [saveReminder, currentEvent.event, user, history]);

    const cancel = useCallback(() => {
        getReminderWithId(null);
        history.push(`/events/edit/${currentEvent.event.id}`);
    }, [getReminderWithId, history, currentEvent.event.id]);

    return(
        <FormProvider {...methods}>
            <ErrorMessage error={error} />
            <div className="flex justify-center border-gray-800 rounded p-2">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className=' border border-gray-800 rounded'>
                <div className='pb-1 mx-2 border-b border-gray-700'>
                <LabelInput
                    label="description"
                    placeholder="Beschrijving"
                    type="text"
                    defaultValue="" 
                    data-cy="description_input"
                />
                </div>
                <div className='pb-1 mx-2 border-b border-gray-700'>
                <LabelInput
                    label="date"
                    placeholder="Datum"
                    type="date"
                    defaultValue="" 
                    validation={ValidatieRegels.datum}
                    data-cy="date_input"
                />
                </div>
                <div className='pb-1 mx-2 mb-2 border-b border-gray-700'>
                <LabelInput
                    label="time"
                    placeholder="Tijd"
                    type="time"
                    defaultValue="" 
                    validation={ValidatieRegels.tijd}
                    data-cy="time_input"
                />
                </div>
                </div>
                <div className='mt-2'>
                <button type="submit" data-cy="submit_reminder" className='text-5xl mx-5 rounded-full border border-green-500'>
                    <IoCheckmarkSharp className="hover:text-white hover:bg-green-300 rounded-full p-1" />
                </button>
                <button onClick={cancel} className='text-5xl rounded-full border border-red-500'>
                    <IoReturnDownBackSharp className='rounded-full hover:bg-red-300 hover:text-white p-1'/>
                </button>
                </div>
            </form>
            </div>
        </FormProvider>
    );
}