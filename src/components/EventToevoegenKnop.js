import React from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function EventToevoegenKnop() {

  return (
    <div>
      <button className="text-xl md:text-3xl lg:text-5xl pt-1">
        <Link to="/events/add">
          <IoAddCircleOutline className="text-gray-700 hover:text-white hover:bg-gray-700 rounded-full" />
        </Link>
      </button>
    </div>
  );
}
