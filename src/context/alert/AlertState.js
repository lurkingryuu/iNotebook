import React, { useState } from 'react';
import AlertContext from './AlertContext';

function AlertState(props) {
    const [alert, setAlert] = useState(null);

    const showAlert = async (message, type) => {
        setAlert({ type, message});
        await setTimeout(() => {
            setAlert(null);
        }, 2500);
    }
    return (
        <AlertContext.Provider value={{ alert, showAlert }}>
            {props.children}
        </AlertContext.Provider>
    );
}

export default AlertState;