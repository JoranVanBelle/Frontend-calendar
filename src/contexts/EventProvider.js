import { createContext, useState, useCallback, useEffect, useContext, useMemo } from "react";
import * as eventApi from '../api/events';
import { useSession } from "./AuthProvider";

const EventContext = createContext();
export const useEvents = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const [initialLoad, setInitialLoad] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentEvent, setCurrentEvent] = useState({});
  const { ready: authReady } = useSession();

  const refreshEvents = useCallback( async () => {
    try {
        setError('');
        setLoading(true);
        const data = await eventApi.getAllEvents();
        setEvents(data.data);
    } catch (error) {
        setError(error);
    } finally {
        setLoading(false);
    }
}, []);

const saveEvent = useCallback(
  async ({id, userId, title, description, date, type }) => {
    setError('');
    setLoading(true);
  try {
    await eventApi.saveEvent({ id, userId, title, description, date, type });
    await refreshEvents();
  } catch(error) {
    setError(error)
  } finally {
    setLoading(false);
  } 
}, [refreshEvents]);

const deleteEvent = useCallback(async (id) => {
  try {
    setError('');
    setLoading(true);
    await eventApi.deleteEvent(id);
    await refreshEvents()
  } catch (error) {
    setError(error)
  }finally {
    setLoading(false);
  } 
}, [refreshEvents]);

const getEventWithId = useCallback((id) => {
  setCurrentEvent(id === null ? {} : events.find((e) => e.event.id === id));
}, [events]); 

useEffect(() => {
  if (authReady && !initialLoad) {
  refreshEvents();
  setInitialLoad(true);
  }
}, [authReady, initialLoad, refreshEvents]);


const value = useMemo(() => ({
  events, 
  loading,
  error,
  currentEvent,
  saveEvent,
  deleteEvent,
  getEventWithId
}), [events, loading, error, currentEvent, saveEvent, deleteEvent, getEventWithId]);
  return (
    <EventContext.Provider value= {value}>
      {children}
    </EventContext.Provider>
  );
};
