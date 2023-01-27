import axios from "../../axios/axios"
import { Properties, TreeProps, Node } from "../../models/models"

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

export function fetchActiveTreeItem(data: string) {
    return {
        type: "set_active_tree",
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
    id: string | undefined,
    treeData: Node[],
    activeId: string
) {
    const dataElement = treeProperties.map((item) =>
        item.id === id ? { ...item, editValue: value } : item
    )

    let data = treeData

    const rec = (data: any) => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === activeId) data[i].properties = dataElement

            if (!!data[i].children) {
                rec(data[i].children)
            }
        }
    }

    rec(data)

    return {
        type: "set_edit_data",
        data,
    }
}
