import React, { createContext, useReducer } from 'react'
import apts from '../data/apts'


const initialState = { apts }
const AptContext = createContext({})

const actions = {
    createApt(state, action)  {
        const apt = action.payload
        apt.id = Math.random()
        return {
            ...state,
            apts: [...state.apts, apt]
        }
    },
    updateApt(state, action) {
        const updated = action.payload
        return {
            ...state,
            apts: state.users.map(apt_data => apt_data.id === updated.id ? updated : apt_data)
        }
    },
    deleteApt(state, action) {
        const apt = action.payload
        return {
            // ...state,
            apts: state.apts.filter(apt_data => apt_data.id !== apt.id)
        }
    }
}

export const AptsProvider = props => {

    function reducer(state, action) {
        const func = actions[action.type]
        return func ? func(state, action) : state
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <AptContext.Provider value={{ state, dispatch }}>
            {props.children}
        </AptContext.Provider>
    )
}

export default AptContext;