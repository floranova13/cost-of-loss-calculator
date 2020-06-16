import React from 'react'
import styled from 'styled-components'

const Continue = styled.button`
  font-size: 18px;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  border: 3px solid #214080;
  border-radius: 3px;
  background-color: #774C9E;
  color: white;
  display: block;
`

export default ({ handleClick, labelText }) => (
  <Continue type="button" onClick={() => handleClick()}>{labelText}</Continue>
)
