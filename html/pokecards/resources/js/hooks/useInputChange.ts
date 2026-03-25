import { useState } from 'react';


export function useInputChange(state: any) {
    const [formValues, setFormValues] = useState(state);

    const handleValuesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target } = e;
        const { name, value } = target;

        console.log('id', name);
        console.log('value', value);

        setFormValues((prev: object) => ({
            ...prev,
            [name]: value,
        }));
    };



    return [formValues, handleValuesChange];
}
