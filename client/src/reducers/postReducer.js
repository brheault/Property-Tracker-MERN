import {GET_POSTS, ADD_POST, DELETE_POST, POSTS_LOADING} from "../actions/types";

const initialState = {
    items: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_ITEMS:
            return{
                ...state,
                items: action.payload,
                loading: false
            };
        case DELETE_ITEM:
            return{
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            };
        case ADD_ITEM:
            return{
                ...state,
                //This syntax adds the new item (stored in payload) to the list of existing items (in state.items)
                items: [action.payload, ...state.items]
            }
        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}