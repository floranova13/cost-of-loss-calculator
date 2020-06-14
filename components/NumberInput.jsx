import React from 'react'

export default ({ getter, setter, name, step }) => (
  <>
    <h3>{name}</h3>
    <input type="number" step={step} min="0" value={getter} onChange={event => setter(event.target.value)} />
  </>
)
