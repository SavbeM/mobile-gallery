import {Action, AnyAction, Dispatch, Reducer} from "redux";
import {ImageActions, ImageItemI, ImagesReducerStateI} from "../types";
import {DATA_PENDING, FETCH_IMAGES_ERROR, FETCH_IMAGES_SUCCESS} from "./actions";
import {getAllImages} from "../API/requests";
import {ThunkAction} from "redux-thunk";
import {RootState} from "./store";
import {AxiosError} from "axios";


export const initialState: ImagesReducerStateI  = {
    images: [],
    error: null,
    pending: false
}



export const dataPendingActionCreator = () => {
  return { type:  DATA_PENDING }
}

export const fetchImagesErrorActionCreator = (error: Error | AxiosError) => {
    return { type: FETCH_IMAGES_ERROR, error  }
}

export const fetchImagesSuccessActionCreator = (images: Array<ImageItemI>) => {
    return {type: FETCH_IMAGES_SUCCESS, images}
}


export const fetchDataThunk = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(dataPendingActionCreator())
        try {
            const response = await getAllImages();
            dispatch(fetchImagesSuccessActionCreator(response))
        } catch (error: any) {
            dispatch(fetchImagesErrorActionCreator(error))
        }
    }
}



export const imagesReducer: Reducer<ImagesReducerStateI, ImageActions> = (state = initialState, action: ImageActions): ImagesReducerStateI => {
    switch (action.type) {
        case DATA_PENDING:
            return { ...state, pending: true, error: null };
        case FETCH_IMAGES_SUCCESS:
            return { ...state, pending: false, images: [...action.images]}
        case FETCH_IMAGES_ERROR:
            return { ...state, pending: false, error: action.error };
        default:
            return state;
    }
}
