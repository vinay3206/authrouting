import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as ACTIONS from "../../store/actions/index";
import { Redirect } from "react-router-dom";
import { Button, Card, Col, Container, Form } from "react-bootstrap";

const SignIn = (props) => {
  const dispatch = useDispatch();

  const authState = useSelector((state) => {
    return state.auth;
  });

  const [form, setForm] = useState({
    username: "",
    password: "",
    invalid: false,
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    const { username, password } = form;
    
    console.log("attempting signin dispatch ", username, password);

    dispatch(ACTIONS.auth(username, password));

  };
  console.log("AS");
  console.log(authState);

  if (authState.isLoggedIn) return <Redirect to="/" />;
  else
    return (
      <div>
        <Container >
          <form noValidate autoComplete="off">
            <Card xs={6}>
              <Container className="p-5">
             
                <h2>Please sign in using the form below</h2>
                <Col >
                  <Col xs={12}>
                  <Form.Group controlId="username">
                    <Form.Control
                      // id="username"
                      name="username"
                      variant="outlined"   
                      type="email"                   
                      required
                      onChange={onChange}
                      placeholder="Your Email"
                      value="just click signin"
                    />
                    </Form.Group>
                  </Col>

                  <Col xs={12}>
                  <Form.Group controlId="password">
                    <Form.Control
                      type="password"
                      name="password"
                      required
                      variant="outlined"                      
                      onChange={onChange}
                      placeholder="Password"
                      value="just click signin"
                    />
                    </Form.Group>
                  </Col>

                  <Col xs={12}>
                    <Button 
                      variant="primary"                      
                      onClick={handleSignIn}
                    >
                      Sign In
                    </Button>
                  </Col>
                </Col>
                
                {/* <Col item xs={12}>
                  <Button variant="contained" href="/signup">
                    Not Registered? - Sign Up
                  </Button>
                </Col> */}
             
              </Container>
              <p></p>
            </Card>
          </form>
        </Container> 
      </div>
    );
};

export default SignIn;
