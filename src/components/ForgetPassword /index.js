import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../Firebase";

const ForgetPassword = (props) => {
  const firebase = useContext(FirebaseContext);

  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .passwordReset(email)
      .then(() => {
        setError(null);
        setSuccess(
          `Consultez votre email ${email} pour changer le mot de passe.`
        );
        setEmail("");
        setTimeout(() => {
          props.history.push("/login");
        }, 5000);
      })
      .catch((error) => {
        setError(error);
        setEmail("");
      });
  };

  const disabled = email === "";
  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftForget"></div>
        <div className="formBoxRight"></div>
        <div className="formContent">
          <form onSubmit={handleSubmit}>
            {success && (
              <span
                style={{
                  border: "1px solid green",
                  background: "green",
                  color: "#fffff",
                }}
              >
                {success}
              </span>
            )}
            {error && (
              <span
                style={{
                  border: "1px solid green",
                  background: "pink",
                  color: "#fffff",
                }}
              >
                {error.message}
              </span>
            )}

            <h2>Mot de passe oublié ?</h2>
            <div className="inputBox">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                required
              />
              <label htmlFor="email">Email</label>
            </div>
            <button disabled={disabled}>récupérer</button>
          </form>
          <div className="linkContainer">
            <Link className="simpleLink" to="/login">
              Deja inscrit? connectez vous !!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
