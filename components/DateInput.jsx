import React from 'react'
import styled from 'styled-components'

const Name = styled.h3`
  color: #333333;
  font-size: 24px;
  font-weight: 600;
`

const DateInput = styled.input`
  text-align: center;
  color: #333333;
  font-size: 24px;
  width: 300px;
  height: 30px;
`

export default ({ getter, setter, name }) => (
  <>
    <Name>{name}</Name>
    <DateInput type="date" value={getter} onChange={event => setter(event.target.value)} />
  </>
)
