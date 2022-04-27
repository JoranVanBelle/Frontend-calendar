import React, { useCallback } from "react";
import { useEvents } from "../contexts/EventProvider";
import decideColor from './ColorGiver';

function showEventsToday(eventsToday) {
  
  return (eventsToday().map(
    (e) => {return (
    <div className={`truncate ${decideColor(e.event.type)} rounded-md mb-1 font-sans text-center`} key={e.event.id}>
      {e.event.title}
    </div>
    )}))
}

export default function OverzichtDag() {
  
  const {events} = useEvents();

  const eventsToday = useCallback(() => {
    const dag = new Date();
    return events.filter((e) => {
      const d1 = e.event.date.split('T')[0];
      const d2 = new Date(dag.getFullYear(), dag.getMonth(), dag.getDate()+1).toISOString().split('T')[0];
      return d1 === d2;
    });
  }, [events]);

  return (
    <div className="border border-gray-300 rounded pb-2 px-1 pt-1">
      <h1 className="sm:text-sm lg:text-xl text-gray-700 mb-2 font-sans text-center border border-gray-200 rounded bg-gray-100">Planning van vandaag</h1>
      <div>
      {showEventsToday(eventsToday)}
      </div>
    </div>
  );
}
