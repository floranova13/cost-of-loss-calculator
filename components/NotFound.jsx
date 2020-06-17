import React from 'react'
import styled from 'styled-components'

const Message = styled.div`
  font-size: 24px;
  text-align: center;
  color: #333333;
  font-weight: bold;
`

export default ({ message }) => (
  <Message>{message}</Message>
)
