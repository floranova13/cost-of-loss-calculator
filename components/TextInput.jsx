import React from 'react'
import styled from 'styled-components'

const Name = styled.h3`
  color: #333333;
  font-size: 24px;
  font-weight: 600;
`

const TextInput = styled.input`
  text-align: center;
  color: #333333;
  font-size: 24px;
  font-weight: 600;
`

export default ({ getter, setter, name }) => (
  <>
    <Name>{name}</Name>
    <TextInput type="text" value={getter} onChange={event => setter(event.target.value)} />
  </>
)
