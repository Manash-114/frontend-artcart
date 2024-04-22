import React from 'react'

const TextError = (props) => {
  return (
    <div className='error' style={{ color: 'red' }}>
      {props.children}
    </div>
  )
}

export default TextError
