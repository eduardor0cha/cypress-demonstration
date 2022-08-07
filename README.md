# Cypress Demonstration

Este repositório tem como objetivo demonstrar os exemplos utilizados no tutorial de como utilizar a ferramenta [Cypress](https://www.cypress.io/) contido nesse arquivo.

## Instalação e primeiros passos

Para adicionar o Cypress ao seu projeto, basta rodar:

```bash
npm install cypress --save-dev
# ou
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

A aplicação:

```bash
npx cypress open
# ou
yarn cypress open
```

1. Escolha o tipo de teste a ser feito. E2E servirá para testar a aplicação como um todo. Já o teste de componente testa, como o nome já diz, cada componente isoladamente. Utilizaremos o E2E.
   ![Janela inicial](/.github/images/janela1.png)

2. Ele irá mostrar alguns arquivos de configuração. Basta rolar a tela até o botão de continuar, e dar prosseguimento.
   ![Janela de configuração](/.github/images/janela-configuracao.png)

3. Agora escolha qual navegador será utilizado para rodar os testes.
   ![Janela de escolha do navegador](/.github/images/janela-navegadores.png)
