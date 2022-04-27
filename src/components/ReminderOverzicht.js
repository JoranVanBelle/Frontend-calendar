import { useCallback } from 'react';
import { useEvents } from '../contexts/EventProvider';
import {useReminders} from '../contexts/ReminderProvider';
import ErrorMessage from './ErrorMessage';
import Reminder from './Reminder';

export default function ReminderOverzicht() {

  const { error, loading, reminders } = useReminders();
  const { currentEvent } = useEvents();

  const remindersWithEventId = useCallback(() => {
    return reminders.filter((r) => {
      return r.reminder.eventId === currentEvent.event.id
    })
  }, [reminders, currentEvent.event.id])

  const remindersSorted = useCallback(() => {
    return remindersWithEventId().sort((r1, r2) => new Date(r1.reminder.date) - new Date( r2.reminder.date))
  }, [remindersWithEventId])

  if(error) return (
    <div>
      <ErrorMessage error={error}/>
      <p className='text-red-500'>U bent te lang aangemeld<br/>Gelieve de pagina te refreshen</p>
    </div>
    )
  if(loading) return <div>Laden...</div>
  return (
    <div>
      {remindersSorted().map(
        (r) => {
          return (
            <div key={r.reminder.id} >
              <Reminder {...r.reminder} />
            </div>
          )
        }
      )} 
    </div>
  );
}
