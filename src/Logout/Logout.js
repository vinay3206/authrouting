import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const Logout = props => {
  const { handleLogout } = props

  const authState = useSelector(state => {
    return state.auth
  })

  useEffect(() => { 
    console.log('[Logout]  componentDidMount')
    handleLogout()
  }, [handleLogout])
  

  console.log('LOG OUT AUTHSTATE ' + authState)
  
  return <Redirect to="/" />
}
