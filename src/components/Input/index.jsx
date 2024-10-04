import React from 'react'
import { Controller } from "react-hook-form";
import {InputContainer, InputText, IconContainer } from './styles';

const Input = ({leftIcon, name, control, ...rest}) => {
  return (
    <InputContainer>
      {leftIcon ? (<IconContainer>{leftIcon}</IconContainer>) : null}
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={( { field }) => <InputText { ...field } {...rest}/>}
      />      
    </InputContainer>
  )
}

export { Input }; 