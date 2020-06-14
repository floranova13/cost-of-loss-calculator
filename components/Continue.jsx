import React from 'react'
import styled from 'styled-components'

const Continue = styled.button`
  font-size: 18px;
  margin: 10px;
  text-align: center;
  border: 3px solid grey;
  border-radius: 3px;
  background-color: black;
  color: white;
`

export default ({ handleClick, labelText }) => (
  <Continue type="button" onClick={() => handleClick()}>{labelText}</Continue>
)
