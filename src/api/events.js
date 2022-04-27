import { axios } from '.';

export const getAllEvents = async () => {
    const {data} = await axios.get(
        `/events`, {
            params: {
                limit: 9000,
                offset: 0,
            }
        }
    );
    return data;
};

export const saveEvent = async ({
    id,
    userId,
    title,
    description,
    date,
    type,
}) => {
    const { data } = await axios({
        method:id ? 'put' : 'post',
        url: `/events/${id ?? ''}`,
        data:{ 
            userId,
            title,
            description,
            date,
            type,
        }
    });
      return data;
};

export const deleteEvent = async (id) => {
    await axios.delete(`/events/${id}`);
};
