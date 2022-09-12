# Cypress Demonstration

Este repositório tem como objetivo demonstrar os exemplos utilizados no tutorial de como utilizar a ferramenta [Cypress](https://www.cypress.io/) contido nesse arquivo.

- Clone o repositório para a sua máquina com:

  ```bash
  git clone https://github.com/eduardor0cha/cypress-demonstration.git
  cd cypress-demonstration/
  ```

- E instale as dependências com:

  ```bash
  yarn
  ```

  ou

  ```bash
  npm install
  ```

---

## Instalação e primeiros passos

Para adicionar o Cypress como dependência ao seu próprio projeto, basta rodar:

```bash
npm install cypress --save-dev
```

ou

```bash
yarn add cypress --dev
```

Para que o TypeScript funcione corretamente com o Cypress, crie um arquivo `tsconfig.json` dentro da pasta `/cypress`, contendo o seguinte conteúdo:

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["es5", "dom"],
    "types": ["cypress", "node"]
  },
  "include": ["**/*.ts"]
}
```

Abra a aplicação com o comando:

```bash
npx cypress open
```

ou

```bash
yarn cypress open
```

1. Escolha o tipo de teste a ser feito. E2E servirá para testar a aplicação como um todo. Já o teste de componente testa, como o nome já diz, cada componente isoladamente. Utilizaremos o E2E.
   ![Janela inicial](/.github/images/janela1.png)

2. Ele irá mostrar alguns arquivos de configuração. Basta rolar a tela até o botão de continuar, e dar prosseguimento.
   ![Janela de configuração](/.github/images/janela-configuracao.png)

3. Agora escolha qual navegador será utilizado para rodar os testes.
   ![Janela de escolha do navegador](/.github/images/janela-navegadores.png)

---

## Criando um teste de interface

Após escolher o browser a ser utilizado, clique na opção de criar uma nova spec. O Cypress criará um arquivo com um código exemplo em [cypress/e2e/spec.cy.ts](cypress/e2e/spec.cy.ts).

> _Specs são os arquivos onde os testes serão programados_

- Você pode deletar o conteúdo arquivo do código exemplo, ou apenas deletá-lo por completo, visto que ele é apenas um arquivo exemplo.

- De acordo com o cypress, os arquivos de teste e2e devem atender ao seguinte modelo: `cypress/e2e/**/**.cy.{js,jsx,ts,tsx}`. Ou seja:

  1. O arquivo ou o diretório onde este estará deve estar contido dentro do diretório `cypress/e2e/`;

  2. O arquivo pode conter qualquer nome, atentando-se apenas à extensão ele. A extensão deve ser constituída por `.cy` seguido da extensão que indica a linguagem de programação a ser usada, podendo ser `.js`, `.jsx`, `.ts` ou `tsx`. Ex: `spec.cy.ts`.

Devido à grande quantidade de comandos, assertions e outros recursos, apenas alguns dos principais serão citados aqui. Para obter a lista completa com as instruções de uso de cada um, acesse a [tabela de conteúdos](https://docs.cypress.io/api/table-of-contents).

Observe o seguinte código contido em [spec.cy.ts](/cypress/e2e/spec.cy.ts):

```typescript
describe("Primeiro teste", () => {
  it("fazer login", () => {
    cy.visit("http://localhost:3000");

    cy.get(".input-email").type("teste@teste.com");
    cy.get(".input-password").type("123456");
    cy.contains("Entrar").click();

    cy.url().should("include", "/home");
  });
});
```

- O `describe` recebe umas string e uma função como parâmetros, onde a string descreve o bloco de testes que serão passados dentro da função que elee recebe como parâmetro;

- `it` também recebe uma string e uma função. Porém, ele é o teste em si. A string descreve o que é esperado naquele teste, e a função é justamente como o teste funcionará.

- `cy` será o objeto pelo qual serão chamados os metodos e afirmações. Ou seja, é por meio dele que utilizaremos as funcionaliddes do Cypress na execução do teste.

---

Antes de continuar, note que ele usa o método `cy.visit()`. Ele executa uma visita ao url passado como argumento. Logo, o url deve ser referente à pagina que queremos testar.

> _Como neste repositório a página estára rodando no localhost, na porta 3000, certifique-se de que o projeto está rodando na sua máquina:_
>
> Execute:
>
> ```bash
> npm run start
> ```
>
> ou
>
> ```bash
> yarn start
> ```

Aproveite para acompanhar a lógica do código observando a interface da página que será aberta.

---

Como o objetivo desse teste em questão é fazer login. Logo, temos que digitar as informações dentro dos campos corretos. O comando `get()` busca o elemento com base em um seletor CSS passado. _Por exemplo, se um elemento possui um id `navbar`, podemos buscá-lo através do código `cy.get("#navbar")`_.

- Note que no código, é passado o seletor `.input-email`. Assim como no CSS, esse ponto no início serve para indicar que estamos buscando pela classe do elemento. Analogamente, se quisermos buscar pelo id, basta usar `#` no início. E assim ocorrendo com as mais variadas formas de seletor. E caso o Cypress não consiga encontrar o elemento, ele retornará um erro.

- Uma vez encontrado o elemento, você pode usar mais comandos ou assertions para testar o que deseja.

- Observe no código, que logo após o `cy.get(".input-email")`, é chamado o método `type()`. Ele digita dentro do elemento algo passado como argumento, simulando a digitação feita por um usuário. Ou seja, ao final dessa linha de código, vemos que o elemento é buscado, encontrado, e sofre uma ação.

Após os dois campos serem preenchidos, o botão precisa ser clicado. Primeiramente, ele precisa ser selecionado, assim como os campos. Agora isso foi feito diferentemente, apenas para demonstrar outras formas de busca de elementos:

```typescript
cy.contains("Entrar").click();
```

Veja que foi utilizado o método `contains()`. Ele busca o elemento pelo texto que ele contém. Ou seja, ele pode ser usado para testar se determinado elemento contém determinado texto ou não.

Com ele, foi possível localizar o botão ao pesquisar pelo texto "Entrar" (Já que ele possui o texto "Entrar" no seu interior). E uma vez encontrado, basta usar o comando `click()`, e o Cypress simulará um click em cima do elemento, da mesma forma que um usuário faria.

Inclusive, ao selecionar a ação de click no lado esquerdo, é possível ver a marcação em vermelho do local do click.

![Simulação do click](/.github/images/simulacao-click.png)

Ao fazer o login, a pessoa é redirecionada para a página home. Com isso, podemos verificar até mesmo se o URL é válido ou não (se o usuário foi redirecionado e se foi redirecionado para o local correto).

```typescript
cy.url().should("include", "/home");
```

Com esse código dentro do teste, o Cypress verifica se o url atual inclui o caminho "/home". Inclusive, é possível ver na imagem anterior, que esse teste da URL obteve sucesso. Logo, ao fazer login, o usuário é, de fato, redirecionado para o local esperado.

---

## Criando um teste unitário

Basicamente, testes uniários servem para testar as partes do sistema, cada uma de forma indepentente das outras. Nos exemplos a seguir, faremos testes de API. Tomaremos como objeto de teste a `AuthAPI` contida neste projeto, testando o método de login.

Apesar de testes unitários não serem testes E2E, iremos colocar os arquivos de teste unitários dentro do diretório `cypress/e2e/`. Pois para adicionar uma pasta específica para os unit tests, seria necessárias configurações mais avançadas que variam de acordo com a estrutura de cada projeto.

O arquivo destinado para os nossos testes relacionados à AuthAPI será o `AuthAPI.cy.ts`, contido na pasta mencionada. Observe o seu conteúdo:

```ts
import AuthAPI from "../../src/api/AuthAPI";

describe("AuthAPI", () => {
  it("deve retornar os dados do usuário ao fazer login", async () => {
    cy.intercept("POST", "https://api-teste.com/api/auth/login", {
      statusCode: 200,
      fixture: "login-response.json",
    });

    const api = new AuthAPI();
    const response = await api.login("teste@teste.com", "123456");
    expect(response);
    expect(response.id);
    expect(response.name);
    expect(response.username);
    expect(response.age);
  });

  it("deve retornar um erro ao tentar logar com dados inválidos", async () => {
    cy.intercept("POST", "https://api-teste.com/api/auth/login", {
      statusCode: 400,
    });

    const api = new AuthAPI();
    expect(await api.login("teste@teste.com", "123456")).not.true;
  });
});
```

Note que a estutura principal é a mesma dos testes E2E, composta por `describe` e `it`. A principal diferença agora, é que não utilizaremos mais comandos e assertions relacionados à interface como o `.get` ou o `.visit`, por exemplo.

Ao fazer o teste, é interessante que não se faça requisições ao backend, visto que isso gera uma demanda desnecessária para o sistema. Com isso, se faz necessária a simulação das respostas vindas da API.

---

### Intercept

A principal forma de fazer essa simulação é através do método `.intercept`, o qual monitora as requisições feitas e tem a capacidade de interceptá-las. Podendo barrar aquela requisição e devolver uma resposta se passando pelo destino.

Ele pode ser usado com diferentes formatos de parâmetros. Dentre eles:

```ts
cy.intercept("MÉTODO HTTP", "URL de destino", { resposta });
```

A `resposta` pode ser composta por vários atributos, dentre elas `statusCode`,
`body`, `fixture`, etc.

- `body`: Este recebe um JSON, o qual será o conteúdo da resposta simulada;

- `fixture`: Já este, substitui o `body` quando ele não é definido, também sendo a resposta da requisição.

  - Fixtures nada mais são que dados pré-definidos dentro do projeto. Elas são armazenadas dentro do diretório `cypress/fixtures/`.

  - Cada fixture é composta por um arquivo `.json`, que armazena os dados.

  - Dentro do método `.intercept`, podemos usá-las através do atributo `fixture` do objeto de resposta. Especificando-a através do nome do arquivo fixture correspondente:

    ```ts
    cy.intercept("POST", "https://api-teste.com/api/auth/login", {
      statusCode: 200,
      fixture: "login-response.json",
    });
    ```

    No arquivo `login-response.json`, localizado no diretório `cypress/fixtures`, há os dados a serem utilizados. Os quais, serão utilizados como resposta na resposta falsa que o `intercept` enviará:

    ```json
    {
      "id": 1,
      "name": "Test User",
      "username": "testuser",
      "age": 20
    }
    ```

---

### Expect

Para testar, de fato, os dados recebidos através da API (no caso dos testes, são os dados falsos recebidos da interceptação) usamos o `expect()`. Ele nos dá a possibilidade de passa algo como argumento dentro dele, e testar o dado através de **assertions**.

- Assertions são afirmações em que o argumento do `expect()` deve atender para que o teste seja dado como bem sucedido. Observe o exemplo:

  ```ts
  expect(response).eq("teste");
  ```

  Note que é passado uma variável dentro do `expect`, e logo em seguida vem a assertion `.eq` (equal - _igual_), que indica que a variável passada (`response`) deverá ser igual ao argumento passado dentro de `.eq`. Ou seja, `response` derá ser igual a "teste". Caso contrário, o teste falhará.

  > **O conjunto de assertions usados é o Chai. Para conseguir usar tais assertions, é necessário instalar o pacote do Chai, com:**
  >
  > ```bash
  > npm install --save-dev chai @types/chai
  > ```
  >
  > ou
  >
  > ```bash
  > yarn add chai @types/chai --dev
  > ```

---

### Executando o teste unitário

Devido ao fato de que nesses testes não será testada a interface, não se faz necessário o uso da aplicação gráfica do Cypress. Mas é claro, que ainda pode-se utilizá-la utilizando o comando já mencionado anteriormente:

```bash
npx cypress open
```

Porém, podemos executar os testes diretamente da linha de comando utilizando:

```bash
npx cypress run
```

Esse comando rodará todos os testes e entregará os resultados.

> O uso do comando **run** trás um recurso que pode ser considerado um infortúnio: o Cypress gerará um vídeo do teste toda vez que for rodado, e tirará screenshots dos erros que por ventura ocorrerem.
>
> Caso você queira desabilitar essa funcionalidade, basta adicionar as seguintes linhas ao arquivo `cypress.config.ts`:
>
> ```ts
> screenshotOnRunFailure: false,
> video: false,
> ```
>
> Coloque como mostrado a seguir:
>
> ```bash
> import { defineConfig } from "cypress";
>
> export default defineConfig({
>  e2e: {
>    setupNodeEvents(on, config) {
>      // implement node event listeners here
>    },
>  },
>  screenshotOnRunFailure: false,
>  video: false,
> });
> ```

---

Não esqueça de visitar os seguintes sites para obter um conhecimento maior acerca dos métodos, comandos e assertions disponíveis:

- [Tabela de conteúdos](https://docs.cypress.io/api/table-of-contents)

- [Documentação do Chai](https://www.chaijs.com/api/bdd/)
