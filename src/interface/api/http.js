const handleHttpError = async (err) => {
    let error;
    try {
        error = await err.json();
    } catch (e) {
        error = {
            message: e.statusText,
        }
    }
    return new Error(error.message);
}

const HandleHttpRequest = async (method, url, data) => {
    const response = await fetch(url, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    if (response.status === 200 || response.status === 201) {
        try {
            const jsonResult = await response.json();
            return jsonResult;
        } catch(e) {
            return null;
        }
    } else {
        return handleHttpError(response);
    }
};

export { HandleHttpRequest };