import { useForm, FormProvider } from "react-hook-form";
import { IoReturnDownBackSharp, IoCheckmarkSharp, IoTrashSharp, IoNotificationsOutline } from "react-icons/io5";
import { Link, useHistory } from "react-router-dom";
import LabelInput from "../components/LabelInput";
import LabelSelect from "../components/LabelSelect";
import { useEvents } from "../contexts/EventProvider";
import ReminderOverzicht from "../components/ReminderOverzicht";
import { useCallback, useEffect } from "react";
import ValidatieRegels from "../components/Validationrules";
import { toDateInputString, toTimeInputString } from "../components/DateToString";
import { useReminders } from "../contexts/ReminderProvider";
import ErrorMessage from "../components/ErrorMessage";
import { useSession } from "../contexts/AuthProvider";

export default function EditEventForm() {

  const { currentEvent, saveEvent, deleteEvent, getEventWithId } = useEvents();
  const {refreshReminders} = useReminders();

  const history = useHistory();
  const methods = useForm();
  const { handleSubmit, setValue } = methods;
  const { error:e } = useSession();

  useEffect(() => {
    refreshReminders();
    if (currentEvent && (Object.keys(currentEvent).length !== 0 || currentEvent.constructor !== Object)) {
      const dateAsString = toDateInputString(new Date(currentEvent.event.date));
      setValue('Datum', dateAsString);
      const timeAsString = toTimeInputString(new Date(currentEvent.event.date));
      setValue('Starttijd', timeAsString);
      setValue('Titel', currentEvent.event.title);
      setValue('Beschrijving', currentEvent.event.description);
      setValue('Type', currentEvent.event.type);
    } else {
      history.push('/');
    }
  }, [currentEvent, setValue, refreshReminders, history])

  const onSubmit = useCallback(async (data) => {
    const {Titel, Beschrijving, Datum, Starttijd, Type} = data;
    const dateAsISO = new Date(Datum.split('-')[0], Datum.split('-')[1]-1, Datum.split('-')[2], Number(Starttijd.split(':')[0])+1, Starttijd.split(':')[1]);
    await saveEvent({
      id: currentEvent.event.id,
      userId: currentEvent.user.id,
      title: Titel,
      description: Beschrijving,
      date: dateAsISO,
      type: Type,
    });
    history.push('/')

  }, [currentEvent, saveEvent, history]);

  const handleDelete = useCallback(async () => {
    history.push('/');
    await deleteEvent(currentEvent.event.id);
  }, [currentEvent, deleteEvent, history]);

  const cancel = useCallback(() => {
    getEventWithId(null);
  }, [getEventWithId]);

  return (
    <FormProvider {...methods}>
      <ErrorMessage error={e} />
      <div className="h-screen overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)} className="m-5">
          <div className="grid grid-cols-6 gap-10 border border-gray-800 rounded pr-2 pb-1 pl-2 pt-1 lg:pt-2 lg:pb-1">
            <div className="sm:col-span-2 lg:col-span-3 border border-gray-800 rounded px-2">
              <ReminderOverzicht />
            </div>
            <div className="sm:col-span-4 lg:col-span-3 border border-gray-800 rounded px-2 w-full pl-0 m-0">
              <div className="lg:border-b border-gray-500 pb-2 mx-2">
                <LabelInput
                  label="Titel"
                  placeholder="Titel"
                  type="text"
                  defaultValue="" 
                  validation={ValidatieRegels.titel}
                  data-cy="edit_title"
                />
              </div>
              <div className="lg:border-b border-gray-500 pb-2 mx-2">
                <LabelInput
                  label="Beschrijving"
                  placeholder="Beschrijving"
                  type="text"
                  defaultValue=""
                  data-cy="edit_description"
                />
              </div>
              <div className="lg:border-b border-gray-500 pb-2 mx-2">
                <LabelInput
                  label="Datum"
                  placeholder="Datum"
                  type="date"
                  defaultValue=""
                  validation={ValidatieRegels.datum}
                  data-cy="edit_date"
                />
              </div>
              <div className="lg:border-b border-gray-500 pb-2 mx-2">
                <LabelInput
                  label="Starttijd"
                  placeholder="Tijd"
                  type="time"
                  defaultValue=""
                  validation={ValidatieRegels.tijd}
                  data-cy="edit_time"
                />
              </div>
              <div className="pb-2 mx-2 mb-2 lg:border-b border-gray-700">
                <LabelSelect
                  label="Type"
                  options={["School", "Werk", "Vrije tijd"]}
                  validation={ValidatieRegels.type}
                  data-cy="edit_type"
                />
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex justify-center sm:mt-1 lg:my-5 mx-auto">
              <button className="sm:text-4xl md:text-5xl ml-5 rounded-full border border-yellow-500" data-cy="create_reminder">
                <Link to='/reminders/add'>
                  <IoNotificationsOutline className="hover:text-white hover:bg-yellow-300 rounded-full p-1"/>
                </Link>
              </button>
              <button className="sm:text-4xl md:text-5xl mx-5 rounded-full border border-red-500" data-cy="delete_event" onClick={handleDelete}>
                  <IoTrashSharp className="hover:text-white hover:bg-red-300 rounded-full p-1" />
              </button>
              <button type="submit" data-cy="update_event" className="sm:text-4xl md:text-5xl rounded-full border border-green-500">
                <IoCheckmarkSharp className="hover:text-white hover:bg-green-300 rounded-full p-1" />
              </button>
              <button onClick={cancel} data-cy="cancel" className="sm:text-4xl md:text-5xl ml-5 rounded-full border border-red-500">
                <Link to='/'>
                <IoReturnDownBackSharp className="hover:text-white hover:bg-red-300 rounded-full p-1" />
                </Link>
              </button>
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
