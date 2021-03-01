import './App.css';
import { Routes } from "./routing/routes";
import { BrowserRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import * as ACTIONS from './store/actions/index'
import { useCallback, useEffect } from 'react';

const App = props => {

  const dispatch = useDispatch();
  
  const checkAuthState =  useCallback(() => dispatch(ACTIONS.checkAuthState()),[dispatch])

  const logoutAction = () => { } //dispatch(ACTIONS.logout());

  const authState = useSelector(state => {
    return state.auth
  })

  console.log("AUTH ", authState)

  useEffect(() => {
    checkAuthState();
  }, [checkAuthState])

  const handleLogout = async () => {
    console.log('[HOME] handleLogout')
    logoutAction()
  }

  const childProps = { 
    ...authState,
    handleLogout: handleLogout,
  }
  
  if (authState.loading)
    return <h1>Loading.. </h1>  
  else
    return (
      <Container fluid className="App p-0">
        <header>
          <NavBar />
        </header>
        {/* <p>Is authenticated: {authState.isAuthenticated}</p> */}
        <Routes childProps={childProps} />

      </Container>
    );
}
const AppWithRouter = () => (
  <BrowserRouter >
    <App />
  </BrowserRouter >
)

export default AppWithRouter
