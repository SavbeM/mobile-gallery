import {applyMiddleware, combineReducers, createStore} from 'redux';
import ThunkMiddleware from 'redux-thunk';
import {imagesReducer} from './imagesReducer';

const reducers = combineReducers({
    images: imagesReducer,
});

const store = createStore(reducers, applyMiddleware(ThunkMiddleware))

export type RootState = ReturnType<typeof reducers>;

export default store;
