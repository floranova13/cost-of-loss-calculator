import React from 'react'

export default ({ getter, setter, name }) => (
  <>
    <h3>{name}</h3>
    <input type="text" value={getter} onChange={event => setter(event.target.value)} />
  </>
)
