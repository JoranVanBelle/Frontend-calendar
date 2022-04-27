import React, { useEffect, useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useReminders } from '../contexts/ReminderProvider';
import LabelInput from '../components/LabelInput';
import ValidatieRegels from '../components/Validationrules';
import { toDateInputString, toTimeInputString } from '../components/DateToString';
import { IoCheckmarkSharp, IoReturnDownBackSharp, IoTrashSharp } from 'react-icons/io5';
import {useHistory} from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { useSession } from '../contexts/AuthProvider';

export default function EditReminderForm(id) {

    const {reminders, currentReminder, getReminderWithId, saveReminder, deleteReminder} = useReminders();

    const history = useHistory();
    const methods = useForm();
    const {handleSubmit, setValue} = methods
    const { error } = useSession();

    const onSubmit = useCallback(async (data) => {
        const {description, date, time} = data
        const dateAsISO = new Date(date.split('-')[0], date.split('-')[1]-1, date.split('-')[2], Number(time.split(':')[0])+1, time.split(':')[1]);
        await saveReminder({
            id: currentReminder.reminder.id,
            eventId: currentReminder.reminder.eventId,
            description,
            date: dateAsISO,
        });
        history.push(`/events/edit/${currentReminder.reminder.eventId}`)
    }, [currentReminder, saveReminder, history]);

    const cancel = useCallback(() => {
        getReminderWithId(null);
        history.push(`/events/edit/${currentReminder.reminder.eventId}`);
    }, [getReminderWithId, currentReminder, history]);

    const getReminderById = useCallback(() => {
        (reminders.filter((r) => r.reminder.id === id ?? getReminderWithId(id)));
    }, [reminders, id, getReminderWithId]);

    useEffect(() => {
        if (currentReminder && (Object.keys(currentReminder).length !== 0 || currentReminder.constructor !== Object)) {
            const dateAsString = toDateInputString(new Date(currentReminder.reminder.date));
            setValue('date', dateAsString);
            const timeAsString = toTimeInputString(new Date(currentReminder.reminder.date));
            setValue('time', timeAsString);
            setValue('description', currentReminder.reminder.description)
        }
    }, [currentReminder, setValue, getReminderById]);

    const handleDelete = useCallback(async () => {
        await deleteReminder(currentReminder.reminder.id);
        history.push(`/events/edit/${currentReminder.reminder.eventId}`)
    }, [currentReminder, deleteReminder, history]);

    return (
        <FormProvider {...methods}>
            <ErrorMessage error={error} />
            <div className="flex justify-center border-gray-800 rounded p-2">
                <form onSubmit={handleSubmit(onSubmit)} className='text-center'>
                    <div className=' border border-gray-800 rounded'>
                    <div className='pb-1 mx-2 border-b border-gray-700'>
                        <LabelInput
                            label="description"
                            placeholder="Beschrijving"
                            type="text"
                            defaultValue="" 
                            data-cy="edit_description"
                        />
                    </div>
                    <div className='pb-1 mx-2 border-b border-gray-700'>
                        <LabelInput
                            label="date"
                            placeholder="Datum"
                            type="date"
                            defaultValue="" 
                            validation={ValidatieRegels.datum}
                            data-cy="edit_date"
                        />
                    </div>
                    <div className='pb-1 mx-2 mb-2 border-b border-gray-700'>
                        <LabelInput
                            label="time"
                            placeholder="Tijd"
                            type="time"
                            defaultValue="" 
                            validation={ValidatieRegels.tijd}
                            data-cy="edit_time"
                        />   
                    </div>
                    </div>
                    <div className='mt-2'>
                        <button  data-cy="delete_reminder" className='text-5xl rounded-full border border-red-500' onClick={handleDelete}>
                            <IoTrashSharp className='rounded-full hover:text-white hover:bg-red-300 p-1'/>
                        </button>
                        <button data-cy="update_reminder" type="submit" className='text-5xl mx-5 rounded-full border border-green-500'>
                            <IoCheckmarkSharp className="hover:text-white hover:bg-green-300 rounded-full p-1" />
                        </button>
                        <button data-cy="cancel" onClick={cancel} className='text-5xl rounded-full border border-red-500'>
                                <IoReturnDownBackSharp className='rounded-full hover:bg-red-300 hover:text-white p-1'/>
                        </button>
                    </div>
                </form>
            </div>
        </FormProvider>
    )
}
