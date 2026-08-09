# Recall — Treino de Entrevistas JS/TS com Repetição Espaçada

Um app de repetição espaçada (SRS) onde os cards são perguntas comuns de entrevista
de JavaScript/TypeScript. Construído incrementalmente, em fases, como projeto de
aprendizado profundo de linguagem, arquitetura, banco de dados e testes — com o
mínimo de frameworks e bibliotecas possível.

O conteúdo dos cards (as próprias perguntas de entrevista que você cadastra) reforça
o aprendizado dos conceitos que você está implementando no motor do app. É uma
recursão proposital: você aprende JS/TS _construindo_ o app e _estudando para_ o app.

## Filosofia

- **Poucas dependências de runtime.** Preferimos APIs nativas do Node.js e do browser
  a frameworks. Ferramentas de desenvolvimento (test runner, linter, formatter) são
  aceitáveis como `devDependencies` — o crivo rígido é sobre o que roda em produção.
- **Um projeto só, evoluindo.** Sem trocar de ideia a cada fase. O sistema cresce em
  camadas sobre a mesma base de domínio.
- **Git e PR como unidade de trabalho.** Cada todo do roadmap vira um PR pequeno e
  revisável.
- **IA como mentora, não como autora.** A IA nunca escreve a solução. Ela questiona,
  aponta lacunas, cobra testes e indica leitura. Veja [`MENTOR.md`](./MENTOR.md).
- **Testes por propósito, não por hábito.** Cada fase tem um tipo de teste
  predominante (unit, contract, integration, E2E) e você deve saber justificar por
  que aquele tipo se aplica ali.

## Como funciona o ciclo de trabalho

1. Você lê o próximo todo em [`ROADMAP.md`](./ROADMAP.md).
2. Antes de codar, você pede pra IA (colando `MENTOR.md` como instrução de sistema/
   contexto do projeto) uma leitura prévia sobre o tema do todo — ela indica 2–3
   links, nunca a solução.
3. Você escreve os testes antes ou junto da implementação.
4. Você abre um PR usando o template em
   [`.github/PULL_REQUEST_TEMPLATE.md`](./.github/PULL_REQUEST_TEMPLATE.md).
5. A IA revisa seguindo o protocolo do `MENTOR.md`: arquitetura, tipos, testes,
   perguntas socráticas, leitura complementar.
6. PR aprovado → próximo todo é liberado.

> **Dica prática:** no Claude, isso funciona bem como um Projeto — coloque
> `MENTOR.md` no contexto/instruções do projeto, e cole o diff do PR (ou peça pra IA
> ler o repo) a cada revisão.

## Estrutura de fases (visão geral)

| Fase         | Entrega                 | Foco                                    |
| ------------ | ----------------------- | --------------------------------------- |
| 0            | Setup do repo           | Git, TS strict, CI                      |
| 1            | Domínio puro (SM-2)     | Algoritmos, TS avançado, unit tests     |
| 2            | Persistência em arquivo | Repository pattern, I/O nativo          |
| 3            | Migração para SQLite    | SQL, migrations manuais, contract tests |
| 4            | API REST + Postgres     | HTTP nativo, camadas, Docker            |
| 5            | Auth & segurança        | JWT nativo, hashing, rate limiting      |
| 6            | Design System           | Web Components, Shadow DOM, a11y        |
| 7            | Integração full-stack   | Front vanilla TS, Observer, E2E         |
| 8 (opcional) | Evolução de sistema     | Cache, jobs, ADRs, trade-offs de escala |

Detalhes de cada fase, quebrados em PRs, estão em [`ROADMAP.md`](./ROADMAP.md).

## Stack (restrita de propósito)

- **Linguagem:** TypeScript em modo `strict`
- **Runtime:** Node.js (versão LTS atual)
- **Banco:** SQLite (fases 1–3) → PostgreSQL (fase 4+), via Docker
- **Testes:** test runner nativo do Node (`node:test`) ou Vitest — decisão que você
  deve justificar em um ADR (veja `docs/adr/`)
- **Front-end:** Web Components nativos, sem React/Vue/Svelte
- **CI:** GitHub Actions

## Estrutura de diretórios sugerida

```
recall/
├── MENTOR.md
├── ROADMAP.md
├── README.md
├── docs/
│   └── adr/              # Architecture Decision Records
├── src/
│   ├── domain/           # entidades e regras de negócio puras (fase 1+)
│   ├── infra/            # adapters de persistência (fase 2+)
│   ├── http/             # camada de API (fase 4+)
│   └── ui/               # web components e front (fase 6+)
├── tests/
│   ├── unit/
│   ├── contract/
│   ├── integration/
│   └── e2e/
└── .github/
    ├── workflows/        # CI
    └── PULL_REQUEST_TEMPLATE.md
```

## Licença

Defina conforme preferir (MIT é um padrão razoável para projeto de aprendizado).
