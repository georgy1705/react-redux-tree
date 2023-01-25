import { Action } from "../../models/models"

const initialState = {
    treeData: [],
    loading: false
}


export default function treeReducer(state = initialState, action: Action) {
    switch (action.type) {
        case 'data_success':
            return {
                ...state, loading: false, treeData: [action.data]
            }
        case 'start_loading':
            return {
                ...state, loading: true
            }
        default:
            return state
    }
}