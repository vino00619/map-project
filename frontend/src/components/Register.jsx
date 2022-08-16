import "./register.css";
import RoomIcon from "@mui/icons-material/Room";
import { useState, useRef } from "react";
import axios from "axios";
import CancelIcon from '@mui/icons-material/Cancel';


export default function Register({setShowRegister}) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
        await axios.post("http://localhost:8800/api/users/register", newUser);
        setError(false);
        setSuccess(true);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="registerContainer">
      <div className="logo">
        <RoomIcon />
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" ref={nameRef} />
        <input type="email" placeholder="Email-Id" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <button className="registerBtn">Register</button>
        {success && (
          <span className="success">Successfull. You can login now!</span>
        )}{" "}
        {error && <span className="failure">Something went wrong!</span>}
      </form>
      <CancelIcon className="registerCancel" onClick={()=>setShowRegister(false)}
      />
    </div>
  );
}
