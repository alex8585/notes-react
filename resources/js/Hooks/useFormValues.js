import { useState,useEffect } from 'react';

export default function useFormValues(initialState) {  
    const [values, setValues] = useState(initialState);

    // useEffect(()=> {
    //     if(curentItem) {
    //         setValues(()=>({...curentItem}))
    //     }
    // },[curentItem])

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setValues(values => ({
            ...values,
            [key]: value
        }));
    }

    function setCurrent(newWalues) {
        setValues(values => ({
            ...values,
            ...newWalues
        }));
    }

    function resetFormValues() {
        setValues(values => ({
            ...initialState
        }));
    }

    return [values, handleChange, resetFormValues, setCurrent];
}