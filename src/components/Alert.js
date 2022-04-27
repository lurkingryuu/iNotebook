import React, { useContext } from 'react'
import AlertContext from '../context/alert/AlertContext';

export default function Alert() {
  const {alert} = useContext(AlertContext);

  const capitalise = (word)=>{
    if (word==='danger') word='error';
    return word[0].toUpperCase() + word.slice(1);
  }

  return (
     <div style={{height: "50px"}}>
        {alert && <div className={`alert alert-${alert.type} fade show`} role="alert">
        <strong>{capitalise(alert.type)} :</strong> {alert.message}.
        </div>}
    </div>
  )
}
