import React from "react";
import EventToevoegenKnop from "./EventToevoegenKnop";
import OverzichtDag from "./OverzichtDag";
import LabelOverzicht from './LabelOverzicht'

export default function SideBar() {


  return (
    <aside className="border p-5 w-24 md:w-40 lg:w-64">
      <div>
        <OverzichtDag />
      </div>
      <div className="sm:mt-3 lg:mt-5 mb-2">
        <LabelOverzicht />
      </div>
      <div data-cy="create_event_button" className="absolute pl-5 md:pl-10 lg:pl-20">
        <EventToevoegenKnop />
      </div>
    </aside>
  );
}
