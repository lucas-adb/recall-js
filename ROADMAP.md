# 🗺️ Roadmap — Recall

Cada fase é dividida em todos. **Um todo = um PR.** As leituras específicas de cada
todo são entregues pela IA mentora no momento da liberação da task (protocolo em
`MENTOR.md`) — aqui você encontra apenas objetivo, requisitos e critério de teste,
de propósito, para não entregar a solução antes da hora.

---

## Fase 0 — Setup do repositório

**Foco:** git, TypeScript em modo strict, CI, convenções.

- [x] **0.1** Inicializar repo, `package.json`, `tsconfig.json` em modo `strict`
      (todas as flags de rigidez ligadas). Critério: `tsc --noEmit` roda limpo em um
      arquivo vazio.
- [x] **0.2** Configurar test runner (`node:test` ou Vitest — decisão vai virar seu
      primeiro ADR). Critério: um teste trivial passa via `npm test`.
- [x] **0.3** Configurar CI (GitHub Actions) rodando type-check + testes a cada PR.
      Critério: badge de status funcionando no README.
- [x] **0.4** Configurar linter/formatter básico (ESLint + Prettier, como
      `devDependencies`). Critério: script `npm run lint` sem erros.
- [x] **0.5** Criar `docs/adr/0001-test-runner.md` documentando a escolha do 0.2.

---

## Fase 1 — Domínio puro: motor de repetição espaçada

**Foco:** sintaxe e tipos de TS, algoritmos, TDD. Sem I/O — tudo em memória.

- [ ] **1.1** Modelar as entidades `Card` (pergunta, resposta, metadados) e `Review`
      (histórico de uma revisão) como tipos TS. Critério: nenhuma lógica ainda, só
      modelagem — mas já pensando em quais campos o algoritmo do SM-2 vai precisar.
- [ ] **1.2** Implementar o cálculo de próximo intervalo (algoritmo tipo SM-2):
      dado um `Card` e uma nota de qualidade da resposta (0–5), calcular o próximo
      intervalo e o novo "fator de facilidade". Critério: unit tests cobrindo primeira
      revisão, revisões sucessivas, lapso (nota baixa reinicia o intervalo), e limite
      máximo de intervalo.
- [ ] **1.3** Implementar a seleção de "cards devidos hoje" a partir de uma lista de
      `Card`s. Critério: unit test com data controlada (não `Date.now()` direto — pense
      em como isolar isso pra teste).
- [ ] **1.4** Escrever a primeira leva de cards reais (10–15 perguntas de entrevista
      JS/TS) como fixtures de teste. Critério: nenhum código de produção — só dados.

---

## Fase 2 — Persistência em arquivo

**Foco:** `fs/promises`, Repository pattern, separação domínio/infraestrutura.

- [ ] **2.1** Definir a interface `CardRepository` (contrato: salvar, buscar por id,
      listar, atualizar histórico de review) — só a interface, sem implementação.
      Critério: o domínio da Fase 1 não deve importar nada desta interface na direção
      errada (infra depende de domínio, não o contrário).
- [ ] **2.2** Implementar um adapter `FileCardRepository` usando `fs/promises`
      (JSON em disco). Critério: **contract tests** que testam a interface, não a
      implementação — esses testes serão reaproveitados nas Fases 3 e 4.
- [ ] **2.3** CLI mínima (`node:process.argv` ou `readline`) para: adicionar card,
      listar cards devidos, registrar uma revisão. Critério: integration test
      simulando um fluxo completo via CLI.

---

## Fase 3 — Migração para SQLite

**Foco:** SQL, migrations manuais, Dependency Inversion na prática.

- [ ] **3.1** Escrever a migration inicial (schema SQL manual, sem ORM) para
      `cards` e `reviews`. Critério: script de migration idempotente (rodar duas vezes
      não quebra).
- [ ] **3.2** Implementar `SqliteCardRepository` implementando a mesma interface
      da Fase 2. Critério: **os contract tests da Fase 2.2 devem passar sem alteração**
      contra este novo adapter. Se precisar mudar o teste, pare e questione o design
      antes de continuar.
- [ ] **3.3** Escrever ADR comparando os dois adapters (arquivo vs. SQLite): o que
      mudou na performance, na complexidade de query, no que ficou mais difícil.
- [ ] **3.4** Migrar a CLI da Fase 2.3 para usar o `SqliteCardRepository` via
      injeção de dependência (não instanciar direto dentro da lógica de negócio).

---

## Fase 4 — API REST nativa + PostgreSQL

**Foco:** protocolo HTTP, arquitetura em camadas, Docker, SQL relacional "de verdade".

- [ ] **4.1** Subir PostgreSQL via Docker Compose. Critério: `docker compose up`
      sobe um banco acessível localmente, com script de seed.
- [ ] **4.2** Escrever as migrations para Postgres (podem divergir ligeiramente do
      schema SQLite — pense em tipos nativos do Postgres que fazem sentido aqui).
- [ ] **4.3** Implementar `PostgresCardRepository` com o driver `pg` cru (sem ORM).
      Critério: os mesmos contract tests da Fase 2 passam contra este terceiro adapter.
- [ ] **4.4** Construir servidor HTTP nativo (`node:http`, sem Express) com rotas:
      `POST /cards`, `GET /cards/due`, `POST /reviews`. Critério: separação clara
      Controller → Service → Repository; integration tests batendo na API real.
- [ ] **4.5** Tratamento de erro centralizado (middleware próprio, sem framework).
      Critério: teste garantindo que erros de domínio viram status HTTP corretos
      (ex.: card não encontrado → 404, payload inválido → 400).

---

## Fase 5 — Autenticação & Segurança

**Foco:** JWT nativo, hashing, rate limiting, validação de input.

- [ ] **5.1** Modelar `User` e implementar cadastro/login. Critério: senha nunca
      armazenada em texto puro — decisão de hashing (`node:crypto` vs. biblioteca)
      documentada em ADR.
- [ ] **5.2** Implementar emissão e verificação de JWT nativamente (sem lib de JWT
      pronta, pelo menos numa primeira tentativa — se decidir usar uma, justifique em
      ADR o porquê de não valer a pena reimplementar assinatura HMAC).
- [ ] **5.3** Middleware de autenticação nas rotas de cards/reviews. Critério: teste
      de caso malicioso (token adulterado, token expirado, rota sem header).
- [ ] **5.4** Rate limiting básico (in-memory, por IP ou por usuário). Critério:
      teste simulando excesso de requisições e validando o bloqueio.
- [ ] **5.5** Validação de input consistente (schema de validação manual ou
      biblioteca leve, decisão via ADR). Critério: testes de payloads malformados.

---

## Fase 6 — Design System isolado

**Foco:** Web Components, Shadow DOM, tokens de CSS, acessibilidade. Sem lógica de
negócio — componentes puros de UI.

- [ ] **6.1** Definir tokens de design (cores, espaçamento, tipografia) como CSS
      custom properties. Critério: documento simples listando os tokens e seu uso.
- [ ] **6.2** Componente `<review-card>` (Custom Element + Shadow DOM) exibindo
      pergunta/resposta com estado de "revelado/oculto". Critério: unit test de
      componente isolado (sem dados reais da API).
- [ ] **6.3** Componente `<rating-buttons>` para dar nota de 0–5 na revisão,
      emitindo um evento customizado. Critério: teste validando o evento disparado.
- [ ] **6.4** Auditoria de acessibilidade básica (labels, foco por teclado,
      contraste). Critério: checklist manual documentada + pelo menos um teste
      automatizado de foco/teclado.

---

## Fase 7 — Integração full-stack

**Foco:** consumo real da API, gerenciamento de estado sem framework, E2E.

- [ ] **7.1** Camada de estado reativo simples (padrão Observer/pub-sub, escrito à
      mão) conectando os componentes da Fase 6 aos dados da API. Critério: unit test
      do mecanismo de notificação, independente do DOM.
- [ ] **7.2** Tela principal: lista de cards devidos hoje, consumindo
      `GET /cards/due`. Critério: integration test do fluxo de fetch + render.
- [ ] **7.3** Fluxo de revisão completo: mostrar card → usuário avalia →
      `POST /reviews` → próximo card. Critério: primeiro teste E2E (Playwright) cobrindo
      essa jornada.
- [ ] **7.4** Heatmap semanal de revisões (estilo GitHub contributions), calculando
      percentual de cards revisados vs. devidos por dia. Critério: unit test do cálculo
      de percentuais + teste visual/E2E básico do componente.

---

## Fase 8 (opcional) — Evolução de sistema

**Foco:** design de sistemas sob restrições novas, trade-offs, observabilidade.

- [ ] **8.1** ADR: como o sistema se comportaria com 10 mil usuários simultâneos?
      Identifique o gargalo mais provável antes de otimizar.
- [ ] **8.2** Cache de "cards devidos hoje" (in-memory ou Redis — decisão via ADR).
      Critério: teste validando invalidação do cache após uma nova revisão.
- [ ] **8.3** Job em background para lembrete diário (ex.: `node-cron` ou
      implementação manual de scheduler). Critério: teste do agendamento, não do envio
      real de notificação.
- [ ] **8.4** Sincronização entre abas/dispositivos via SSE ou WebSockets. Critério:
      ADR justificando a escolha entre os dois antes de implementar.
- [ ] **8.5** Revisão retrospectiva: reler os ADRs de todas as fases e escrever um
      documento final sobre o que você mudaria se recomeçasse o projeto hoje.

---

## Como pedir a próxima task

Ao terminar e ter um PR aprovado, peça à IA mentora (com `MENTOR.md` no contexto):

> "Aprovei o PR da task X.Y. Libere a próxima task do roadmap."

Ela deve responder no formato do protocolo de liberação de task definido em
`MENTOR.md` — nunca pulando direto para código.
