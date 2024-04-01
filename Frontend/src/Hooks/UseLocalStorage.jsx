import React from 'react'
import { useState, useEffect } from 'react'

const UseLocalStorage = (key, initialValue) => {
    
    // Retrieve the stored value from local storage
    const storedValue = localStorage.getItem(key);
    const initial = storedValue ? JSON.parse(storedValue) :initialValue;

      // Create a state variable to track the value
    const [value, setValue] = useState(initial);

    // Update the value in local storage whenever it changes
    const updateValue = (newValue) =>{
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    };

     // Use useEffect to sync local storage with the state
    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

  return [value, updateValue];
}

export default UseLocalStorage;