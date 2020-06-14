import React from 'react'

export default ({ getter, setter, name }) => (
  <>
    <h3>{name}</h3>
    <input type="checkbox" value={getter} onChange={() => setter(!getter)} />
  </>
)
