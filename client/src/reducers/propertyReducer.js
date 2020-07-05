import {GET_PROPERTIES, ADD_PROPERTY, DELETE_PROPERTY, PROPERTIES_LOADING} from "../actions/types";

const initialState = {
    properties: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_PROPERTIES:
            return{
                ...state,
                //Payload is the list of properties
                properties: action.payload,
                loading: false
            };
        case DELETE_PROPERTY:
            return{
                ...state,
                //payload is an id of the item to delete
                properties: state.properties.filter(property => property._id !== action.payload)
            };
        case ADD_PROPERTY:
            return{
                ...state,
                //This syntax adds the new item (stored in payload) to the list of existing items (in state.items)
                items: [action.payload, ...state.properties]
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