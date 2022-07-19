import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {AppState, AppDispatch} from '../redux/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;