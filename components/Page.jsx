import React from 'react'
import styled from 'styled-components'

const Page = styled.div`
  margin: 60px auto 0;
  text-align: center;
  width: 60%;
`


export default ({ children }) => (
  <div className="page">{children}</div>
)
