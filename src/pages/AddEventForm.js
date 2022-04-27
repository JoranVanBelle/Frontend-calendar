import React, { useCallback } from 'react';
import { FormProvider, useForm } from "react-hook-form";
import { IoCheckmarkSharp, IoReturnDownBackSharp } from "react-icons/io5";
import { Link, useHistory } from "react-router-dom";
import LabelInput from "../components/LabelInput";
import LabelSelect from "../components/LabelSelect";
import { useEvents } from "../contexts/EventProvider";
import ValidatieRegels from '../components/Validationrules';
import ErrorMessage from '../components/ErrorMessage';
import { sendEmailCreateEvent } from "../components/Email";
import { useSession } from '../contexts/AuthProvider';

export default function AddEventForm() {

  const history = useHistory();
  const methods = useForm();

  const { error, saveEvent, getEventWithId } = useEvents();
  const { user } = useSession();

  const {
    handleSubmit,
  } = methods;

  const onSubmit = useCallback(async (data) => {
    try {
      const {Titel, Beschrijving, Datum, Starttijd, Type, Herhaling} = data;
    if(Herhaling.toLowerCase() === "dagelijks") {
      for (let i = 0; i <= 31; i++){
        const dateAsISO = new Date(Datum.split('-')[0], Datum.split('-')[1]-1, Number(Datum.split('-')[2]) + i, Number(Starttijd.split(':')[0])+1, Starttijd.split(':')[1]);
        await saveEvent({
          title: Titel,
          userId: '7f28c5f9-d711-4cd6-ac15-d13d71abff70',
          description: Beschrijving,
          date: dateAsISO,  
          type: Type,
        });
      }
    } else if (Herhaling.toLowerCase() === "wekelijks") {
      for (let i = 0; i <= 12; i++){
        const dateAsISO = new Date(Datum.split('-')[0], Datum.split('-')[1]-1, Number(Datum.split('-')[2]) + (i*7), Number(Starttijd.split(':')[0])+1, Starttijd.split(':')[1]);
        await saveEvent({
          title: Titel,
          userId: '7f28c5f9-d711-4cd6-ac15-d13d71abff70',
          description: Beschrijving,
          date: dateAsISO,  
          type: Type,
        });
      }
    } else if (Herhaling.toLowerCase() === "maandelijks") {
      for (let i = 0; i <= 12; i++){
        const dateAsISO = new Date(Datum.split('-')[0], Datum.split('-')[1]-1 + i, Datum.split('-')[2], Number(Starttijd.split(':')[0])+1, Starttijd.split(':')[1]);
        await saveEvent({
          title: Titel,
          userId: '7f28c5f9-d711-4cd6-ac15-d13d71abff70',
          description: Beschrijving,
          date: dateAsISO,  
          type: Type,
        });
      }
    }
    else { 
      const dateAsISO = new Date(Datum.split('-')[0], Datum.split('-')[1]-1, Datum.split('-')[2], Number(Starttijd.split(':')[0])+1, Starttijd.split(':')[1]);
      await saveEvent({
        title: Titel,
        userId: '7f28c5f9-d711-4cd6-ac15-d13d71abff70',
        description: Beschrijving,
        date: dateAsISO,  
        type: Type,
      });
    }
    getEventWithId(null);
    sendEmailCreateEvent(Titel, user.name, Datum, Starttijd, user.email);
    history.push('/')
    } catch (error) {
      
    }

  }, [saveEvent, history, getEventWithId, user]);

  const cancel = useCallback(() => {
    getEventWithId(null);
  }, [getEventWithId]);

  return (
    <FormProvider {...methods}>
      <ErrorMessage error={error} />
        <div className="items-center mx-5">
          <form onSubmit={handleSubmit(onSubmit)} className="m-5">
            <div className="grid grid-cols-2">
              <div className='border-b pb-1 border-gray-500 mx-2'>
                <LabelInput
                    label="Titel"
                    placeholder="Titel"
                    type="text"
                    defaultValue=""
                    validation={ValidatieRegels.titel}
                    data-cy="titel_input"
                  />
              </div>
              <div className='border-b pb-1 border-gray-500 mx-2'>
                <LabelInput
                    label="Beschrijving"
                    placeholder="Beschrijving"
                    type="text"
                    defaultValue=""
                    data-cy="beschrijving_input"
                  />
              </div>
              <div className='border-b pb-1 border-gray-500 mx-2'>
                <LabelInput
                    label="Datum"
                    placeholder="Datum"
                    type="date"
                    defaultValue=""
                    validation={ValidatieRegels.datum}
                    data-cy="datum_input"
                  />
              </div>
              <div className='border-b pb-1 border-gray-500 mx-2 w-full'>
                <LabelInput
                    label="Starttijd"
                    placeholder="Tijd"
                    type="time"
                    defaultValue=""
                    validation={ValidatieRegels.tijd}
                    data-cy='tijd_input'
                  />
              </div>
              <div className='pb-2 mx-2 border-b border-gray-700'>
                <LabelSelect
                  label="Type"
                  options={["School", "Werk", "Vrije tijd"]}
                  validation={ValidatieRegels.type}
                  data-cy="type_input"
                />
              </div>
              <div className='pb-2 mx-2 border-b border-gray-700'>
                <LabelSelect
                label="Herhaling"
                type="text"
                defaultValue="Geen herhaling"
                options={["Dagelijks", "Wekelijks", "Maandelijks"]}
                data-cy="herhaling_input"
                />
              </div>
            </div>
          <div className="col-span-6 sm:col-span-3">
            <div className="flex justify-center my-5 mx-auto">
              <button onClick={cancel} data-cy="cancel_event" className="mr-5 rounded-full border border-red-500">
                <Link to='/'>
                  <IoReturnDownBackSharp className="text-5xl hover:text-white hover:bg-red-300 rounded-full p-1" />
                </Link>
              </button>
              <button type="submit" data-cy="submit_event" className="ml-5 rounded-full border border-green-500">
                <IoCheckmarkSharp className="text-5xl hover:text-white hover:bg-green-300 rounded-full p-1" />
              </button>
            </div>
          </div>
      </form>
    </div>
    </FormProvider>
    
  );
}
