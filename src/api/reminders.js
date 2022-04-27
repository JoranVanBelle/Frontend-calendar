import { axios } from ".";

export const getAllReminders = async () => {
    const {data} = await axios.get(`/reminders`, {
        params: {
            limit: 9000,
            offset: 0,
        }
    });
    return data;
};

export const saveReminder = async ({id, eventId, description, date}) => {
    const {data} = await axios ({
        method: id ? 'put' : 'post',
        url: `/reminders/${id ?? ''}`,
        data: {
            eventId, 
            description, 
            date
        },
    });
    return data;
};

export const deleteReminder = async (id) => {
    await axios.delete(`/reminders/${id}`);
};
