import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/signup.css";
import { Alert } from "@mui/material";

export default function SignUpPage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkedPassword, setCheckedPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  // const navigate = useNavigate();

  const handleChangePrenom = (event) => {
    setLastname(event.target.value);
  };
  const handleChangeNom = (event) => {
    setFirstname(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleChangeCheckedPassword = (event) => {
    setCheckedPassword(event.target.value);
  };

  // const handleButtonClick = (event) => {
  //   event.preventDefault();
  //   navigate("/login");
  // };

  const sendRegisterData = (event) => {
    event.preventDefault();

    if (password === checkedPassword) {
      console.info("email", email);
      console.info("password", password);
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/user`, {
          firstname,
          lastname,
          email,
          password,
        })

        .then((response) => {
          setSuccess(response.data.message);
          setError(false);
          console.info(response);
        })
        .catch((err) => {
          if (
            err.response.data.error === `"firstname" is not allowed to be empty`
          ) {
            setError("Le Prenom ne peut pas être vide");
          } else if (
            err.response.data.error === `"firstname" must be a valid name`
          ) {
            setError("Mettre un prenom valide");
          } else if (
            err.response.data.error === `"lastname" is not allowed to be empty`
          ) {
            setError("Le Prenom ne peut pas être vide");
          } else if (
            err.response.data.error === `"lastname" must be a valid name`
          ) {
            setError("Mettre un nom valide");
          } else if (
            err.response.data.error === `"email" is not allowed to be empty`
          ) {
            setError("L'email ne peut pas être vide");
          } else if (
            err.response.data.error === `"email" must be a valid email`
          ) {
            setError("Mettre un email valide");
          } else if (
            err.response.data.error === `"password" is not allowed to be empty`
          ) {
            setError("Merci de donner un password");
          } else if (
            err.response.data.error ===
            `"password" length must be at least 8 characters long`
          ) {
            setError("Le mot de passe doit faire au moins 8 caractères");
          } else if (err.response.data.error === 1062) {
            setError("L'email est déjà enregistré");
          } else {
            console.error(err.response.data.error);
          }
          setSuccess(false);
        });
    } else {
      setError("Les mots de passe ne correspondent pas");
      console.error("Les mots de passe ne correspondent pas");
    }
  };

  return (
    <div className="register_formulaire">
      <form onSubmit={sendRegisterData}>
        <input type="text" placeholder="Prenom" onChange={handleChangePrenom} />
        <br />
        <br />
        <input type="text" placeholder="Nom" onChange={handleChangeNom} />
        <br />
        <br />
        <input
          type="email"
          placeholder="Adresse email"
          onChange={handleChangeEmail}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={handleChangePassword}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="confirmation du mot de passe"
          onChange={handleChangeCheckedPassword}
        />
        <br />
        <br />
        <button className="btn-create" type="submit">
          Créer un compte
        </button>

        <br />

        <Link to="/login" className="btn-deja">
          Déjà membre ?
        </Link>
        {/* <button className="btn-deja" type="submit" onClick={handleButtonClick}>
          Déjà membre
        </button> */}
      </form>

      {success && (
        <Alert severity="success">
          {/* <AlertTitle>Utilisateur créée avec succés</AlertTitle> */}
          {success}
        </Alert>
      )}
      {error && (
        <Alert severity="error">
          {/* <AlertTitle>Merci de remplir tous les champs obligatoires</AlertTitle> */}
          {error}
        </Alert>
      )}
    </div>
  );
}
