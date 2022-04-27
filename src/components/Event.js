import React from 'react';
import decideColor from './ColorGiver';
import { useEvents } from '../contexts/EventProvider';
import {useHistory} from 'react-router-dom'
import { useCallback } from 'react';

const Event = ({id, userId, title, description, date, type}) => {

    const history = useHistory();
    const {getEventWithId} = useEvents();
    const handleUpdate = useCallback(() => {
    getEventWithId(id);
    history.push(`/events/edit/${id}`)
    }, [getEventWithId, id, history]);
    
    return (

        <div onClick={handleUpdate} data-cy="event_title" className={`truncate ${decideColor(type)} rounded-md mb-1 font-sans mx-0.5 text-center hover: cursor-pointer overflow-scroll`} >
            {title}
        </div>
    );
};

export default Event;
