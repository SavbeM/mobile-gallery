import {DATA_PENDING, FETCH_IMAGES_ERROR, FETCH_IMAGES_SUCCESS} from "./store/actions";
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "./store/store";
import {AnyAction} from "redux";

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

type User = {
    username: string,
    name: string
    bio: string
}

type Urls = {
    small_s3: string
    full: string
}

interface TagsI{
    type: string,
    title: string
}

export type FullScreenImageRouteParams = {
    uri: string;
    id: string
    headerShown: boolean
};

export type RootStackParamList = {
    Home: { title: string };
    FullScreenImage: FullScreenImageRouteParams
};

export interface ImageItemI {
    id: string
    width: number
    height: number
    description: string
    color: string
    user: User
    urls: Urls
    tags: TagsI
    likes: number
}

export interface ImagesReducerStateI {
    images: Array<ImageItemI>,
    error: any
    pending: boolean
}

export type DataPendingActionType = {
    type: typeof DATA_PENDING
}

export type FetchImagesErrorActionType = {
    type: typeof FETCH_IMAGES_ERROR
    error: any
}

export type FetchImagesSuccessActionType = {
    type: typeof FETCH_IMAGES_SUCCESS
    images: Array<ImageItemI>
}


export type ImageActions = DataPendingActionType | FetchImagesErrorActionType | FetchImagesSuccessActionType
