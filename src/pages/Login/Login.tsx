import { useContext } from "react";
import { Button, Input } from "../../components";
import { AuthCTX } from "../../contexts/AuthCTX";

function Login(): JSX.Element {
  const { login } = useContext(AuthCTX);

  function submit(e) {
    e.preventDefault();
    login("teste@teste.com", "123456");
  }

  return (
    <div className="cyp-p-login">
      <h1>Cypress Demonstration</h1>
      <div className="cyp-p-login__login-area">
        <h1>Fazer login</h1>
        <form onSubmit={(e) => submit(e)}>
          <Input className="input-email" placeholder="E-mail" />
          <Input
            className="input-password"
            placeholder="Senha"
            type="password"
          />
          <Button type="submit">Entrar</Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
