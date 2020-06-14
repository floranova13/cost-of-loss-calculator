import React from 'react'
import styled from 'styled-components'

const Row = styled.tr`
  text-align: center;
`

export default ({ valOne, valTwo, valThree, valFour }) => (
  <Row>
    <td>{valOne}</td>
    <td>{valTwo}</td>
    <td>{valThree}</td>
    <td>{valFour}</td>
  </Row>
)
