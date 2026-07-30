# Especificação de Skill LLM para Evolução Contínua de Front‑end (UX/UI + HTML5/JS)

Versão: v3 (multi‑LLM, multi‑executor, foco em auditoria objetiva, loop “continuar”)

## 1) Objetivo
Habilitar um agente revisional e evolutivo de front‑end a:
- auditar e elevar continuamente a qualidade de UX/UI, Acessibilidade, Performance e Segurança;
- propor e aplicar a “próxima evolução” do código com base em evidências e boas práticas modernas (HTML5/JS/CSS);
- funcionar de forma independente do provedor LLM (Claude, Gemini, DeepSeek, etc.) e do executor (Adapta.one, chatgbot.ai);
- operar em ciclos curtos via comando “continuar”, evitando acúmulo de ruído de contexto.

## 2) Escopo
- Repositórios web (HTML5, CSS, JS/TS, frameworks e design systems). 
- Revisão, refatoração, codificação incremental, documentação e PRs.
- Auditorias de UX/UI, E‑E‑A‑T, WCAG 2.2, Lighthouse/Core Web Vitals, segurança front‑end.

## 3) Princípios
- Provedor‑agnóstico: sem dependência de um único vendor de LLM ou executor.
- Critérios objetivos: checklists e métricas substituem termos vagos.
- Pequenas entregas: cada ciclo do “continuar” gera um diff mínimo, testável e reversível.
- Transparência: toda alteração vem com análise, justificativa, riscos e rollback.
- Segurança e privacidade: mínimo necessário de contexto, sem vazamento de segredos.

## 4) Suporte Multi‑LLM (Claude, Gemini, DeepSeek, etc.)
- Abstração por “Adapter de Modelo”: interface comum: `generate(prompt, system, tools, params)`.
- Seleção de modelo (policy):
  - Padrão: “latest estável” por fornecedor, priorizando contexto longo e instrução rigorosa.
  - Override por operador: `model_vendor`, `model_name`, `version_pin`.
  - Fallback: se falhar, retroceder para o modelo anterior mais estável do mesmo vendor; se indisponível, rotear para o próximo fornecedor da lista de preferência.
- Parâmetros sugeridos por tarefa:
  - Revisão/auditoria: temperatura baixa (0.1–0.3), top_p 0.9, máximo de tokens focado em evidências.
  - Geração de código: temperatura 0.2–0.5; ativar “json only” quando emitindo esquemas.
- Saídas determinísticas quando `require_schema=true` (forçar JSON válido com schema abaixo).

## 5) Independência de Executor (Adapta.one, chatgbot.ai, outros)
- Adapter de Execução: `send_message(content, metadata)` e `store_artifact(kind, path, body)`.
- Isolamento de sessões: cada executor mantém ID de sessão distinto para não cruzar contextos.
- Limpeza de contexto: preferir prompts curtos + RAG do repositório. Evitar “long chat”; resumir estado no próprio artefato (Next Task Plan).

## 6) Protocolo de Auditoria UX/UI (moderno, orientado a conversão)
Checklist objetivo por tela/flow:
- Hierarquia visual: leitura F/Z; título claro; CTAs visíveis; espaçamento e ritmo tipográfico.
- Contraste e legibilidade: WCAG AA/AAA para cores e tamanhos; line-height, largura de linha.
- Intenção do usuário: remove fricções? Minimiza cliques? Estados claros (loading, empty, error)?
- Consistência: grid, ritmo, ícones, microcopy, padrões de navegação.
- Feedback e acessos: foco visível, hover/active, mensagens de erro úteis; confirmação de ações destrutivas.
- Responsividade: breakpoints críticos testados; alvo de toque ≥ 44×44 px; gestos não exclusivos.
- Internacionalização: layouts resilientes a strings longas e pluralização.

## 7) Protocolo E‑E‑A‑T (Experiência, Especialidade, Autoridade, Confiança)
- Experiência: componentes demonstram uso real (exemplos, estados, edge cases)?
- Especialidade: decisões técnicas citam padrões (WHATWG/HTML Living Standard, ECMAScript, WCAG, WAI‑ARIA, ARIA APG, HTTP/Fetch). 
- Autoridade: links para fontes reconhecidas (MDN, W3C/WAI) nas notas de revisão.
- Confiança: clareza sobre coleta/uso de dados; rótulos e políticas; segurança de conteúdo.

## 8) Acessibilidade (WCAG 2.2 e ARIA)
- Estrutura semântica: landmarks (header/nav/main/aside/footer), headings H1‑H6 ordenados.
- Navegação por teclado: tab order lógico; skip link; rolagem não bloqueada por JS.
- Foco: estilos visíveis; foco não aprisionado; `:focus-visible`.
- Formulários: rótulos associados, mensagens de erro, `aria-live` para feedback assíncrono.
- Mídia: alternativas textuais; legendas; preferir `<button>` a elementos clicáveis genéricos.
- ARIA: usar apenas quando necessário e corretamente; estados/atributos sincronizados.

## 9) Performance e Qualidade
- Orçamentos (orçados por página):
  - LCP < 2.5s (3G/slow‑4G), CLS < 0.1, INP < 200ms.
  - JS inicial < 170KB gzip; CSS crítico inline ≤ 14KB; imagens responsivas (srcset/sizes, AVIF/WEBP).
- Práticas:
  - Divisão de código; `defer`/`async`; evitar hidratação desnecessária; lazyload de mídia.
  - Cache HTTP; preconnect/dns‑prefetch para domínios críticos; evitar importação em cascata.
  - Evitar layout thrashing; usar CSS para animações; reduzir listeners globais.

## 10) Segurança Front‑end
- Cabeçalhos e políticas: CSP estrita, SRI em assets externos, `X-Frame-Options`/`frame-ancestors`, `X-Content-Type-Options`.
- Escape/encode de conteúdo dinâmico; evitar `innerHTML` inseguro; `DOMPurify` quando necessário.
- Tokens/segredos fora do cliente; antifraude básico (rate‑limit server‑side, honeypot para bots em forms públicos).

## 11) Padrões HTML5/JS/CSS
- HTML: semântica primeiro; ids únicos; listas/figcaption; atributos exigidos em inputs; `loading="lazy"` onde adequado.
- JS/TS: módulos ES; imutabilidade quando possível; eventos delegados; `AbortController` para fetch; erros tratados; logs ruidosos removidos do build.
- CSS: arquitetura (BEM/ITCSS/Utility) definida; tokens (cores, espaçamentos, tipografia) centralizados; `:where()`/`:is()` com parcimônia; container queries quando cabível.

## 12) Integração com Repositório
- Leitura do escopo/estrutura definidos e “ideias CSS” do repositório como insumos do plano.
- Saída sempre em diffs claros (patch/unified) + arquivos completos quando necessário.
- Gerar CHANGELOG/PR description com: problema, causa, solução, riscos, validação, métricas alvo.

## 13) Fluxo Operacional e Loop “continuar”
- Comandos:
  - `continuar`: executar a próxima tarefa do plano, entregar patch+testes+validação.
  - `revisar`: apenas auditoria e recomendações, sem aplicar patch.
  - `justificar`: aprofundar evidências/fontes e trade‑offs.
  - `rollback`: propor reversão do último patch e motivos.
- Ciclo por etapa:
  1) Analisar contexto atual (arquivos alvo, metas, orçamentos, pendências).
  2) Rodar auditorias de UX/UI, A11y, Performance, Segurança (nível rápido).
  3) Escolher “próxima evolução” mínima com maior impacto/risco baixo.
  4) Produzir patch, testes/checagens, e validação (checklist ticked).
  5) Atualizar plano e sugerir próximos passos.

## 14) Formato de Saída Padronizado
Quando `require_schema=true`, responder estritamente em JSON conforme o schema abaixo.

```json
{
  "analysis": {
    "context": "Resumo do estado atual (arquivos, metas, restrições)",
    "findings": ["Achado objetivo 1", "Achado 2"],
    "impact": "Impacto esperado (UX, A11y, Perf, Segurança)"
  },
  "recommendations": [
    { "id": "REC-001", "title": "Melhoria", "rationale": "Evidências/links MDN/W3C", "effort": "baixa|média|alta", "risk": "baixo|médio|alto" }
  ],
  "changeset": {
    "type": "patch|files",
    "diff": "patch unified (se type=patch)",
    "files": [ { "path": "index.html", "content": "..." } ]
  },
  "validation": {
    "ux_ui": ["check 1", "check 2"],
    "a11y": ["WCAG item X atendido"],
    "performance": ["Orçamento LCP/JS ok"],
    "security": ["CSP configurada"],
    "tests": ["Descrição de testes manuais/automáticos"]
  },
  "next_task": {
    "id": "TASK-002",
    "title": "Próxima evolução mínima",
    "why": "Prioridade e impacto",
    "acceptance_criteria": ["Critério 1", "Critério 2"]
  },
  "references": [
    { "title": "MDN – semantic HTML", "url": "https://developer.mozilla.org/..." }
  ]
}
```

## 15) Gestão de Contexto e Memória
- Estados curtos: cada resposta carrega seu próprio “analysis” e “next_task” para evitar dependência de histórico longo.
- Resumos canônicos: manter um artefato “PLAN.md” com backlog priorizado e decisões (ADR curto).
- RAG local: consultar apenas arquivos relevantes (escopo, estrutura, ideias CSS, componentes alvo) por etapa.

## 16) Critérios de Aceite por Etapa
- UX/UI: CTAs destacados, hierarquia consistente, microcopy clara, estados críticos cobertos.
- Acessibilidade: landmarks, foco visível, navegação por teclado, contrastes AA, formulários acessíveis.
- Performance: orçamentos respeitados; assets otimizados; sem regressões significativas.
- Segurança: sem sinks inseguros; cabeçalhos/políticas previstos; ausência de dados sensíveis no cliente.
- Documentação: PR/CHANGELOG com justificativas e referências.

## 17) Governança, Logs e Métricas
- Log de decisões: data, recomendação, patch, validação, métricas antes/depois.
- Métricas rastreadas: Lighthouse, Core Web Vitals, taxa de erro JS, CLS regressions, tamanhos de bundles.

## 18) Boas Práticas de Prompting (para qualquer LLM)
- Forneça: objetivos, orçamento de performance, restrições do stack, arquivos alvo, nível de risco aceitável.
- Peça: saída em JSON do schema; links de referência; patch mínimo e reversível.
- Configure: temperatura baixa para revisão; “no prose” quando schema estrito.

## 19) Limitações e Não‑Objetivos
- Não executar migrações massivas num único ciclo; dividir em etapas.
- Não introduzir dependências sem justificativa e análise de impacto.

## 20) Roadmap de Evolução Sugerido
- Adicionar testes automáticos de A11y (axe-core/pa11y) na validação.
- Orquestrador de modelos com “capability tags” (código, auditoria, raciocínio) para melhor roteamento.
- Geração de artefatos de design tokens a partir do CSS existente (normalização e documentação).
- Templates de PR por tipo de mudança (a11y, perf, ux copy, refatoração JS, layout/responsividade).
- Integração com análise estática (ESLint/Stylelint) parametrizada pelo plano.

---

Como operar:
1) Configure vendor preferencial e allow‑fallback.
2) Envie o contexto mínimo (escopo, estrutura, arquivos alvo, metas, orçamentos).
3) Use `revisar` para um primeiro diagnóstico; depois `continuar` em ciclos curtos.
4) Exija sempre o JSON do schema com `require_schema=true` para facilitar automação.
