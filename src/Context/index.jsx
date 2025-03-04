import { useContext, createContext, useState, useEffect, use } from "react";
import axios, { Axios } from "axios";

const StateContext = createContext()

export const StateContextProvider = ({children}) => {
    const [weather, setWether] = useState({})
    const [values, setValues] = useState([])
    const [place, setPlace] = useState('Jaipur')
    const [thisLocation, setLocation] = useState('')

    // fetch api
    const fetchWether = async() => {
        const options = {
            method: 'GET',
            url: ' https://visual-crossing-weather.p.rapidapi.com/forecast',
            params: {
                aggregateHours: '24',
                location: place,
                contentType: 'json',
                unitGroup: 'metric',
                shortColumnNames: 0,
            },
            headers: {
                'X-RapidAPI-Key' : import.meta.env.VITE_API_KEY,
                'X-RapidAPI-Host' : 'visual-crossing-weather.p.rapidapi.com'
            }
        }

        try{
            const response = await axios.request(options);
            console.log(response.data)
            const thisData = Object.values(response.data.locations)[0]
            setLocation(thisData.address)
            setValues(thisData.values)
            setWether(thisData.values[0])
        } catch(e) {
            console.error(e);
            // if the api throws the error..
            alert('This place dose not exist')
        }
    }

    useEffect(() => {
        fetchWether()
    }, [place])

    useEffect(() => {
        console.log(values)
    },[values])

    return (
        <StateContext.Provider value={{
            weather,
            setPlace,
            values,
            thisLocation,
            
        }}>
            {children}
            </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)