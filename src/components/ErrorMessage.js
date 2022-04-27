function parseErrorCode(code) {
    if(!code || code === 'INTERNAL_SERVER_ERROR') return 'Onbekende error';

    if (code === 'VALIDATION_FAILED') return 'Validatie is gefaald';
    if (code === 'UNAUTHORIZED') return 'Ongeldigde authorisatie';
    if (code === 'FORBIDDEN') return 'Geen toestemming';

    return 'Onbekende error';
}

function parseError(error) {
    let title = "Onbekende error";
    let message = error || 'Er ging iets mis, neem contact op via https://joranvanbelle.github.io/';

    if (typeof error === 'object' && error.response?.data) {
        title = parseErrorCode(error.response.data.code);
        message = error.response.data.message;
    }

    return {
        title,
        message
    }
}

export default function ErrorMessage({error}) {
    if (!error) return null;

    const { title, message } = parseError(error);

    return (
        <p className="text-red-500">
            {title} <br/>
            {message}
        </p>
    );
};
