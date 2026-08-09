# Leituras Recomendadas

Registro dos links indicados pela IA mentora durante a liberação de tasks e as
revisões de PR, organizados por fase. Formato: `<link>: descrição breve`.

## Fase 0 — Setup do repositório

- https://www.typescriptlang.org/tsconfig: Referência completa do `tsconfig.json` — quais flags de rigidez existem além do grupo `strict`.
- https://docs.npmjs.com/cli/v10/configuring-npm/package-json: Campos do `package.json` e o que vale preencher desde o início.
- https://nodejs.org/en/about/previous-releases: Calendário de releases/LTS do Node.js, usado pra justificar a versão alvo do projeto.
- https://eslint.org/docs/latest/use/configure/configuration-files#extending-configurations: Sintaxe `"plugin/config"` do `extends` no flat config do ESLint.
- https://github.com/prettier/eslint-config-prettier#installation: Como plugar o `eslint-config-prettier` corretamente no flat config (não é mais um `extends` mágico como no `.eslintrc`).
- https://www.typescriptlang.org/tsconfig/#lib: O que a opção `lib` controla e o que é incluído por padrão quando ela não é definida.
- https://www.typescriptlang.org/tsconfig/#types: Diferença entre `lib` e `types` — inclusão automática de pacotes `@types/*`.
- https://nodejs.org/api/typescript.html: Suporte nativo do Node a TypeScript (type stripping), relevante pra escrever testes em `.ts`.
- https://www.typescriptlang.org/docs/handbook/project-references.html: TypeScript Project References — como separar configs de ambientes diferentes (ex.: backend Node vs. frontend com DOM) num mesmo repositório.
