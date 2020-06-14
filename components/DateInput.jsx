import React from 'react'

export default ({ getter, setter, name }) => (
  <>
    <h3>{name}</h3>
    <input type="date" value={getter} onChange={event => setter(event.target.value)} />
  </>
)
