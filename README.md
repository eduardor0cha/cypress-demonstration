# Cypress Demonstration

Este repositório tem como objetivo demonstrar os exemplos utilizados no tutorial de como utilizar a ferramenta [Cypress](https://www.cypress.io/) contido nesse arquivo.

---

## Instalação e primeiros passos

Para adicionar o Cypress ao seu projeto, basta rodar:

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

Abra a aplicação:

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

Após escolher o browser a ser utilizado, clique na opção de criar uma nova spec. O Cypress criará um arquivo com um código exemplo em [cypress/e2e/spec.cy.ts](cypress/e2e/spec.cy.ts). Você pode deletar o conteúdo dele, ou apenas deletá-lo por completo, visto que ele é apenas um arquivo exemplo.

> De acordo com o cypress, os arquivos de teste e2e devem atender ao seguinte modelo: `cypress/e2e/**/**.cy.{js,jsx,ts,tsx}`.
>
> Devido à grande quantidade de comandos, assertions e outros recursos, apenas alguns dos principais serão citados aqui. Para obter a lista completa com as instruções de uso de cada um, acesse a [tabela de conteúdos](https://docs.cypress.io/api/table-of-contents).

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

- O `describe` serve para descrever o bloco de testes que ele envolverá.

- `it` é o teste em si. Ele carrega uma descrição sobre o que se espera acontecer durante o teste.

- `cy` será o objeto pelo qual serão chamados os metodos e afirmações.

---

Antes de continuar, note que ele usa o `cy.visit()`. Esse método executa uma visita ao url passado como argumento. Portanto, como nesse repositório a página estará em localhost na porta 3000, certifique-se de estar com o projeto rodando na sua máquina:

Execute:

```bash
npm run start
```

ou

```bash
yarn start
```

Aproveite para acompanhar a lógica do código observando a interface da página que será aberta.

---

Como o objetivo desse teste em questão é fazer login. Logo, temos que digitar as informações dentro dos campos corretos. O comando `get()` busca o elemento com base em um seletor passado. Assim como ocorre no CSS, por exemplo.

Note que no código, é passado o seletor `.input-email`. Assim como no CSS, esse ponto no início serve para indicar que estamos buscando pela classe do elemento. Analogamente, se quisermos buscar pelo id, basta usar `#` no início. E assim ocorrendo com as mais variadas formas de seletor.

- Caso o Cypress não consiga encontrar o elemento, ele retornará um erro.

Uma vez encontrado o elemento, você pode usar mais comandos ou assertions para testar o que deseja.

> Observe no código, que logo após o `cy.get(".input-email")`, é chamado o método `type()`. Ele digita dentro do elemento algo passado como argumento, simulando a digitação feita por um usuário. Ou seja, ao final dessa linha de código, vemos que o elemento é buscado, encontrado, e sofre uma ação.

Após os dois campos serem preenchidos, o botão precisa ser clicado. Primeiramente, ele precisa ser selecionado, assim como os inputs. Agora isso foi feito diretente, apenas para demonstrar outras formas de busca de elementos:

```typescript
cy.contains("Entrar").click();
```

Veja que foi utilizado o método `contains()`. Ele busca o elemento pelo texto que ele contém. Ou seja, ele pode ser usado para testar se determinado elemento contém determinado texto ou não.

Com ele, foi possível localizar o botão ao pesquisar pelo texto "Entrar". E uma vez encontrado, basta usar o comando `click()`, e o Cypress simulará um click em cima do elemento.

Inclusive, ao selecionar a ação de click no lado esquerdo, é possível ver a marcação em vermelho do local do click.

![Simulação do click](/.github/images/simulacao-click.png)

Ao fazer o login, a pessoa é redirecionada para a página home. Com isso, podemos verificar até mesmo se o URL é válido ou não.

```typescript
cy.url().should("include", "/home");
```

Com esse código dentro do teste, o Cypress verifica se o url atual inclui o caminho "/home". Inclusive, é possível ver na imagem anterior, que esse teste da URL obteve sucesso.

Não se esqueça de visitar a documentação do Cypress para ler sobre os outros comandos e assertions. Pois os mostrados até então, são apenas uma pequena parcela de todos os disponíveis.

---

## Criando testes de API

Os testes para API são
