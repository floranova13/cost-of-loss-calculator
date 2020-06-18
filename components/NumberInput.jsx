import React from 'react'
import styled from 'styled-components'
import validateNum from '../utils/numberInput'

const Name = styled.h3`
  color: #333333;
  font-size: 24px;
  font-weight: 600;
`

const NumberInput = styled.input`
  display: inline-block;
  text-align: center;
  color: #333333;
  font-size: 24px;
  font-weight: 600;
`

export default ({ getter, setter, name }) => (
  <>
    <Name>{name}</Name>
    <div>
      <NumberInput
        type="number"
        min="0"
        value={getter}
        onChange={event => setter(validateNum(event.target.value))}
      />
    </div>
  </>
)
