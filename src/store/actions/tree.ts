import axios from "../../axios/axios"
import { Properties, TreeProps } from "../../models/models"

export function loadingStart() {
    return {
        type: "start_loading",
    }
}

export function fetchDataSuccess(data: TreeProps) {
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

export function fetchDataProperties(data: Properties[]) {
    return {
        type: "set_properties",
        data,
    }
}

export function fetchSelectedTitle(data: string) {
    return {
        type: "set_selected_title",
        data,
    }
}

export function fetchEditData(
    treeProperties: Properties[],
    value: string | undefined,
    id: string | undefined
) {
    const data = treeProperties.map((item) =>
        item.id === id ? { ...item, editValue: value } : item
    )

    return {
        type: "set_edit_data",
        data,
    }
}
