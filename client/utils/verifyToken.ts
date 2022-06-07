import axios from "axios"
import { Dispatch } from "react"

const setAuthHeaders = (token: string ) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}

const verifyToken = async (dispatch: any) => {
    // if (localStorage.getItem())
}