import React, {useState, useEffect } from 'react';
export default function withFormValues(WrappedComponent, defaltFields={}) {

    return function(props) {

        const {  curentItem } = props;
        const [values, setValues] = useState(defaltFields);

        useEffect(()=> {
            if(curentItem) {
                setValues(()=>({...curentItem}))
            }
        },[curentItem])

        
        
        function handleChange(e) {
            const key = e.target.name;
            const value = e.target.value;
            setValues(values => ({
                ...values,
                [key]: value
            }));
        }

        // function handleChangEditor(event, editor) {
        //     const data = editor.getData();
        //     setValues(values => ({
        //         ...values,
        //         'body': data
        //     }));
        // }

        return (<WrappedComponent
            values={values}
            setValues={setValues}
            handleChange={handleChange} 
            //handleChangEditor={handleChangEditor} 
            {...props} />);

    };

}