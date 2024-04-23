import axios from "axios";
import { useState } from "react";

const useCrud = (base) => {
    const [apiData, setApiData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    //read
    const getApi = (path) => {
        const url = `${base}${path}/`;
        axios.get(url)
            .then(res => setApiData(res.data))
            .catch(err => console.log(err))
            .finally(() => {
                setIsLoading(false);
            })
    }

    //create
    const postApi = (path, data) => {
        const url = `${base}${path}/`;
        axios.post(url, data)
            .then(res => {
                setHasError(false);
                setApiData([...apiData, res.data]);
                console.log(res.data);
            })
            .catch(err => {
                setHasError(true);
                console.log(err)
            })
    }

    //delete
    const deleteApi = (path, id) => {
        const url = `${base}${path}/${id}/`;
        axios.delete(url)
            .then(() => {
                setApiData(apiData.filter(user => user.id !== id));
                console.log('delete success');
            })

            .catch(err => console.log(err));
    }

    //update
    const patchApi = (path, data, id) => {
        const url = `${base}${path}/${id}/`;
        axios.patch(url, data)
            .then(res => {
                setApiData(apiData.map((user) => user.id === id ? res.data : user));
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }

    return [apiData, getApi, postApi, deleteApi, patchApi, isLoading, setIsLoading, hasError, setHasError];
}

export default useCrud;