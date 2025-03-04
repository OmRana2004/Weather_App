import { useEffect, useState } from "react";

export const useDate = () => {
    const locate = 'en';
    const [today, setDate] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date())
        }, 60*1000)

        return () => {
            clearInterval(timer)
        }
    },[])

    const day = today.toLocaleDateString(locate, {weekday: 'long'})
    const date = `${day}, ${today.getDate()}, ${today.toLocaleDateString(locate, {month: 'long'})}\n\n`
    const time = today.toLocaleDateString(locate, { hour: 'numeric', hour12: true, minute: 'numeric' })

    return {
        date, time
    }
}