import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import * as reminderApi from '../api/reminders';
import { useSession } from "./AuthProvider";

const reminderContext = createContext();
export const useReminders = () => useContext(reminderContext);

export const ReminderProviver = ({children}) => {
    const [initialLoad, setInitialLoad] = useState(false);
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentReminder, setCurrentReminder] = useState({});
    const { ready: authReady } = useSession();

    const refreshReminders = useCallback(async () => {
        try {
            setError('');
            setLoading(true);
            const data = await reminderApi.getAllReminders();
            setReminders(data.data);
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false);
        }
    }, []);

    const saveReminder = useCallback(
        async ({id, eventId, description, date}) => {
            setError('');
            setLoading(true);
            try {
                await reminderApi.saveReminder({id, eventId, description, date});
                await refreshReminders();
            } catch(error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }, [refreshReminders]);

    const deleteReminder = useCallback(async (id) => {
        try {
            setError('');
            setLoading(true);
            await reminderApi.deleteReminder(id);
            await refreshReminders();
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [refreshReminders]);

    const getReminderWithId = useCallback((id) => {
        setCurrentReminder(id === null ? {} : reminders.find((r) => r.reminder.id === id));
    }, [reminders]);

    const getRemindersWithEventId = useCallback((eventId) => {
        setReminders(eventId === null ? {} : reminders.find((r) => r.reminder.eventId === eventId));
    }, [reminders]);

    useEffect(() => {
        if(authReady && !initialLoad) {
            refreshReminders();
            setInitialLoad(true)
        }
    }, [authReady, initialLoad, refreshReminders]);

    const value = useMemo(() => ({
        reminders,
        loading,
        error,
        currentReminder,
        saveReminder,
        deleteReminder,
        getReminderWithId,
        getRemindersWithEventId,
        refreshReminders,
    }), [reminders, loading, error, currentReminder, saveReminder, deleteReminder, getReminderWithId, getRemindersWithEventId, refreshReminders]);

    return (
        <reminderContext.Provider value={value}>
            {children}
        </reminderContext.Provider>
    )
};
