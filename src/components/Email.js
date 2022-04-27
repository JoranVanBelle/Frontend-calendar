import config from '../config.json';
import * as emailjs from 'emailjs-com'

const SERVICE_ID = config.emailjs.service_id;
const CREATE_EVENT_TEMPLATE_ID = config.emailjs.createEventTemplate_id;
const CREATE_REMINDER_TEMPLATE_ID = config.emailjs.createReminderTemplate_id;
const USER_ID = config.emailjs.user_id;

export const sendEmailCreateEvent = (event_title, name, date, time, email) => {

    const template_params = {
        'event_title': event_title,
        'name': name,
        'date': date,
        'time': time,
        'email': email
    };

    emailjs.init(USER_ID);
    const response = emailjs.send(SERVICE_ID, CREATE_EVENT_TEMPLATE_ID, template_params, USER_ID);
    return response
};

export const sendEmailCreateReminder = (event_title, name, date, time, email) => {

    const template_params = {
        'reminder_title': event_title,
        'name': name,
        'date': date,
        'time': time,
        'email': email
    };

    emailjs.init(USER_ID);
    const response = emailjs.send(SERVICE_ID, CREATE_REMINDER_TEMPLATE_ID, template_params, USER_ID);
    return response
};