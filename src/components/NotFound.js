import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className='container nf'>
    <div className='not-found'>
      <h1>404 | Not Found</h1>
      <p><Link to='/register'>Register</Link> now to use</p>
    </div>
    </section>
  )
}

export default NotFound
