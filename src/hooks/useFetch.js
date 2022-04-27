import {
    useState,
    useEffect,
} from 'react';
import axios from 'axios';

export function useFetch(uri) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setError('');
                setLoading(true);
                const response = await axios.get(uri);
                setData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [uri]);

    return {
        data,
        loading,
        error
    };
}