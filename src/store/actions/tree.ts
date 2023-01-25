import axios from "../../axios/axios"

export function loadingStart() {
    return {
        type: "start_loading",
    }
}

export function fetchDataSuccess(data: any) {
    return {
        type: "data_success",
        data,
    }
}

export async function fetchData(dispatch: any) {
    dispatch(loadingStart())

    const url = "../data.json"

    const response = await axios.get(url)
    const data = response.data

    dispatch(fetchDataSuccess(data))
}
