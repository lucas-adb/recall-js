## Task do roadmap

<!-- ex.: Fase 1, todo 1.2 -->

## O que foi implementado

<!-- Descreva o comportamento, não a implementação linha a linha. -->

## Decisões de design

<!-- Alternativas consideradas e por que esta foi escolhida.
     Se a decisão for estrutural, linke o ADR correspondente em docs/adr/. -->

## Casos de teste cobertos

<!-- Liste os comportamentos testados, incluindo casos de erro e borda.
     Indique o tipo de teste (unit / contract / integration / e2e). -->

## Dependências novas

<!-- Nenhuma, ou: nome do pacote + justificativa + é devDependency ou runtime? -->

## Dúvidas para a mentora

<!-- Pelo menos uma dúvida real sobre trade-off, algoritmo ou padrão usado.
     Não é opcional — faz parte do Definition of Done. -->

## Checklist (Definition of Done)

- [ ] Tipos em modo `strict`, sem supressões não justificadas
- [ ] Testes do tipo apropriado à camada, cobrindo erro/borda
- [ ] CI verde (`tsc --noEmit` + testes)
- [ ] ADR criado, se aplicável
- [ ] Nenhuma dependência de runtime nova sem justificativa
- [ ] Contract tests existentes passaram sem alteração (se este PR troca um adapter)
