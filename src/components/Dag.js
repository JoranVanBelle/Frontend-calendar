import React, { useCallback } from 'react';
import {useEvents} from '../contexts/EventProvider';
import Event from './Event';
import { useSession } from '../contexts/AuthProvider';

function currentDayIndicator(dag) {
  let datum =
    dag.getDate() +
    " " +
    dag.toLocaleString("default", {
      month: "long"
    }) +
    " " +
    dag.getFullYear();
  let huidigeDag = new Date();
  let currentDay =
    huidigeDag.getDate() +
    " " +
    huidigeDag.toLocaleString("default", {
      month: "long"
    }) +
    " " +
    huidigeDag.getFullYear();

  return datum === currentDay ? "text-green-500 font-bold" : "";
};

export default function Dag({dag, weekind}) {

  const { events } = useEvents();
  const { user } = useSession();

  const placeEvents = useCallback(() => {
    return events.filter((e) => {
      const d1 = e.event.date.split('T')[0];
      const d2 = new Date(dag.getFullYear(), dag.getMonth(), dag.getDate()+1).toISOString().split('T')[0]; // Op verkeerde plaats in kalender view
      return d1 === d2 && e.user.id === user.id;
    });
  }, [events, dag, user]);


  return ( 
    <div className = "border border-gray-300">
      {/* Dagen bovenaan kalender weergeven */}  
      <header> 
        {weekind === 0 ? ( 
        <p className = "text-left text-xs font-semibold font-sans uppercase" > 
        {dag.toLocaleDateString("nl-BE", {weekday: "short"})} 
        </p>
      ) : (
        ""
      )
    } 
    <p className={`${currentDayIndicator(dag)} text-lg font-semibold`} >
    {dag.getDate()}
    </p > 
    </header> 
    <div>
    {placeEvents().map(
        (e) => {
        return (
        <div key={e.event.id} >
          <Event {...e.event} />
        </div>
        );
        })}
    </div>
    </div >
  
  );
};
