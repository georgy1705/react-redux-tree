import { Action } from "../../models/models"

const initialState = {
    treeData: [],
    treeProperties: [],
    selectedTitle: "",
    loading: false,
}

export default function treeReducer(state = initialState, action: Action) {
    switch (action.type) {
        case "data_success":
            return {
                ...state,
                loading: false,
                treeData: [action.data],
            }
        case "start_loading":
            return {
                ...state,
                loading: true,
            }
        case "set_properties":
            return {
                ...state,
                treeProperties: action.data,
            }
        case "set_edit_data":
            return {
                ...state,
                treeProperties: action.data,
            }
        case "set_selected_title":
            return {
                ...state,
                selectedTitle: action.data,
            }
        default:
            return state
    }
}
