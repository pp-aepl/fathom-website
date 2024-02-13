
import React from 'react'
import { FaCheck } from 'react-icons/fa6'
function FormStep({ currentStep, steps }) {
  return (
    <>
        <ul className="formStep">
            {steps.map((step) => (
            <li key={step.id} className={`${step.id <= currentStep ? "fillActive" : ""} `} >
                <span className='check'><FaCheck /></span>
                <span className='number'>{step.id}</span> {step.label}
            </li>
            ))}
        </ul>
    </>
  )
}

export default FormStep
