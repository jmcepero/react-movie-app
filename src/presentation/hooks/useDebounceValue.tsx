import { useEffect, useState } from "react"

export const useDebounceValue = (input: string = '', time: number = 1000) => {

    const [debouncedValue, setDebouncedValue] = useState(input);

    useEffect(() => {

        const timeOut = setTimeout(() => {
            setDebouncedValue(input)
        }, time);

        return () => {
            clearTimeout(timeOut);
        }

    }, [input])

    return debouncedValue
}