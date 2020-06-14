import React from 'react'

export default ({ getter, setter, name }) => (
  <>
    <h3>{name}</h3>
    <input type="number" step="0.01" min="0" value={getter} onChange={event => setter(event.target.value)} />
  </>
)
