import axios from 'axios';

export const apiCall = async (apiConfig, promisePayload) => {
    try {
        const requestConfig = {
            method: apiConfig.action,
            url: apiConfig.apiPath,
            params: apiConfig.params,
            data: apiConfig.data,
        };
        const response = await axios(requestConfig)
            .then((res) => {
                return {
                    ...res,
                    ...(promisePayload && { promisePayload })
                };
            })
            .catch((error) => {
                return error
            });

        return response;

    } catch (ex) {
        return false;
    }
};

export const defaultHeader = () => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'text/plain',
        'requestStartTime': new Date(),
    };
    return headers;
};