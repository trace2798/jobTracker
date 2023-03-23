import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

// global context and useNavigate later

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};
// if possible prefer local state
// global state

const Register = () => {
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate();

  const { user, isLoading, showAlert, displayAlert, registerUser, loginUser } =
    useAppContext();
  // global context and useNavigate later
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  /**
   * When the user types in the input field, the handleChange function will update the state of the
   * component with the value of the input field.
   * @param e - the event object
   */
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  /**
   * If the email, password, and name (if not a member) fields are not filled out, display an alert.
   * @param e - the event object
   * @returns The values object.
   */
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
  };
  
  /* This code uses the React Hook useEffect to run a function when the component is mounted or updated. 
  The function checks if the user variable is truthy and, if so, sets a timeout of 3 seconds before navigating to the "/" route.
  The dependencies array ([user, navigate]) ensures that the effect will only run when either user or navigate changes. */
  
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        {/*  A ternary operator that will show the heading, if it is a member it will show login else register  */}
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}

        {/* name input. If the value of member is false(meaning he/she/they is not a registered user ) then we  display the name field.*/}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {/* email field */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />

        {/* password field */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>
        <p>
          {/*
           * A button that toggles between "Register" and "Login" if the user is a member.
           * @param {boolean} isMember - whether or not the user is a member.
           */}
          {/* A ternary operator. t is used to conditionally generate a string based on the value of the isMember property of the values object. 
          If the value of isMember is true, the string "Not a member yet?" is generated. If the value of isMember is false, the string "Already a member?" is generated. */}
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          {/*A button that toggles the state of the form. */}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
