import React from 'react'
import styled from 'styled-components'

const Continue = styled.button`
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  border: 3px solid #214080;
  border-radius: 3px;
  background-color: #774C9E;
  color: white;
  width: 210px;
  height: 45px;
  cursor: pointer;
  transition: border-color 1.5s, color 1.5s, transform 1.5s;
  margin-left: 105px;

  :hover {
    color: #B8CCEA;
    border-color: #B8CCEA;
    transform: scale(1.15);
  }
`

const Mark = styled.img`
  margin-left: 60px;
  height: 53px;
  width: 53px;
`

const Container = styled.div`
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default ({ handleClick, labelText }) => (
  <Container>
    <Continue type="button" onClick={() => handleClick()}>{labelText}</Continue>
    <Mark src="./img/oa-mark-two.png" alt="Open Avenues Foundation Mark" />
  </Container>

)
