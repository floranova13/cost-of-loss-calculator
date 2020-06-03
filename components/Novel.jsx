import React from 'react'

export default ({ id, title, author }) => (
  <div key={id} className="novel">{`${title} by ${author}`}</div>
)
