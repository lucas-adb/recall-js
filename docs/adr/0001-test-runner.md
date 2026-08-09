# ADR 0001: node:test será a ferramenta de testes

**Status:** Aceito

**Data:** 2026-08-08

**Task relacionada:** Fase 0, todo 0.2

## Contexto

Escolher qual ferramenta utilizar como test runner no projeto.

## Decisão

O node:test foi escolhido por ser a opção nativa. Evita instalar uma lib a mais.

### Alternativas consideradas

- **Vitest** lib bastante completa, com boa documentação e popular / não é nativa

## Consequências

### Positivas

- Menor boilerplate

### Negativas / trade-offs aceitos

- Biblioteca "nova" no ecossistema node. Mais enxuta que as outras opções.
- Menor número de tutoriais.

### O que isso implica para decisões futuras

- Usar outras ferramentas de testes compatíveis com o nativo do node.
