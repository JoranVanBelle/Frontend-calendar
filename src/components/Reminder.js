import React, {memo} from 'react';
import { useCallback } from 'react';
import { useReminders } from '../contexts/ReminderProvider';
import { useHistory } from 'react-router-dom';

const Reminder = memo(({id, description, date}) => {

    const {getReminderWithId} = useReminders();
    const history = useHistory();

    const dateAsString = useCallback(() => {
        return date.substring(0, date.indexOf("T"));
    }, [date])

    const timeAsString = useCallback(() => {
        return date.substring(date.indexOf("T")+1, 16);
    }, [date]);

    const handleUpdate = useCallback(() => {
        getReminderWithId(id);
        history.push(`/reminders/edit/${id}`)
    }, [getReminderWithId, id, history])

    return (
        <div onClick={handleUpdate} data-cy="reminder" className=' my-1 py-0.5 text-center border border-gray-400 hover: cursor-pointer rounded-lg bg-gra'>
            <span data-cy="reminder_title">
            {description ? description : "Geen beschrijving"}
            </span>
            <br/>
            <span data-cy="reminder_date">
                {dateAsString().split('-').reverse('').join('-')}
            </span>
            <br/>
            <span data-cy="reminder_time">
                {timeAsString(date)}
            </span>
        </div>
    )
});

export default Reminder;
