# Guia de Uso de IA/LLMs — Prompt Estruturado & Fluxo por Área

> Documento consolidado e refinado para revisão.  
> Baseado em duas interações anteriores: framework de prompting e categorização de LLMs por domínio de uso.

---

## 1. Framework de Prompt — Como Obter Respostas Técnicas e Confiáveis

### 1.1 Objetivo

Obter respostas corretas, embasadas tecnicamente, com fontes confiáveis, evitando alucinações e superficialidade.

### 1.2 Estrutura do Prompt (6 dimensões)

| Dimensão | Instrução | Por que funciona |
|---|---|---|
| **Clareza** | Defina tema, contexto e objetivo. Evite "me fale sobre X"; prefira "explique X considerando Y e Z". | Reduz ambiguidade e impede que o modelo escolha um recorte irrelevante. |
| **Fontes** | "Forneça referências confiáveis (documentação oficial, artigos acadêmicos, normas técnicas). NÃO use blogs pessoais ou conteúdo opinativo." | Força o modelo a priorizar fontes de alta qualidade no treinamento e, quando acoplado a search/RAG, direciona a busca. |
| **Revisão crítica** | "Revise sua resposta, verifique consistência e corrija possíveis contradições." | Obriga o modelo a reavaliar a própria saída — a taxa de contradições internas cai significativamente. |
| **Tom** | "Seja assertivo e técnico, não apenas gentil ou concordante." | Contrabalança o viés de agradabilidade do RLHF, que tende a diluir rigor técnico em favor de polidez. |
| **Escopo temporal** | "Considere apenas informações publicadas até [data]" ou "priorize os últimos X anos." | Evita que o modelo misture versões obsoletas de normas, APIs ou frameworks. |
| **Declaração de ignorância** | "Se não houver fonte confiável disponível, declare explicitamente a limitação em vez de inferir." | Reduz alucinações por preenchimento — o modelo é forçado a reconhecer lacunas. |

### 1.3 Template de Prompt (copie e adapte)

```
Explique [tema específico] de forma técnica e detalhada, considerando [contexto Y e Z].

Requisitos:
- Cite apenas fontes confiáveis (documentação oficial, artigos acadêmicos, normas técnicas).
- Evite blogs pessoais ou conteúdo opinativo.
- Priorize informações publicadas nos últimos [X] anos.
- Seja assertivo e crítico — não apenas concorde com a visão dominante.
- Apresente também visões alternativas ou limitações da abordagem.
- Se não houver fonte confiável disponível para algum ponto, declare a limitação.
- Revise sua resposta para eliminar inconsistências ou contradições.
- Apresente as referências ao final.
```

### 1.4 Técnicas Complementares

- **Modelo A gera, Modelo B critica** — Use um LLM para produzir o conteúdo e outro para atuar como revisor cético. Isso reduz viés de confirmação e melhora a qualidade final mais do que qualquer prompt individual.
- **Controle de temperatura** — Documentos formais: ~0.2 (baixa variabilidade). Brainstorming criativo: ~0.8–1.0 (alta variabilidade). O mesmo modelo se comporta de forma radicalmente diferente conforme esse parâmetro.
- **Contexto limpo** — Para novos assuntos, inicie um chat separado. Misturar tópicos polui a janela de contexto e aumenta a chance de contaminação cruzada.

---

## 2. Fluxo de Uso de LLMs por Área

### 2.1 Matriz de Decisão

| Área | Modelos recomendados | Critério de escolha | Notas |
|---|---|---|---|
| 📚 **Aprendizado / Estudo técnico** | Claude, Gemini, o1, DeepSeek-R1 | Explicação estruturada, didática, reasoning visível | Modelos com cadeia de raciocínio exposta (o1, R1) são pedagogicamente superiores — o "como" importa mais que a resposta final. |
| 🔍 **Pesquisa e fundamentação** | Perplexity, Copilot, Gemini (com grounding) | Integração a fontes confiáveis, verificação em tempo real | Claude e GPT-4 **sem search** são ruins para fatos recentes — alucinam com confiança. Prefira modelos com RAG ou acesso à web. |
| 📝 **Elaboração de documentos** | GPT-4, Claude | Redação formal, estilo, estrutura | Use temperatura baixa (~0.2). Para documentos longos, alimente o modelo com outline antes do texto completo. |
| 💻 **Programação — Geração** | CodeLlama, DeepSeek-Coder, Qwen-Coder | Velocidade, custo, especialização em sintaxe | Modelos especializados são mais rápidos e baratos para geração bruta de código. |
| 💻 **Programação — Revisão/Debug** | Claude 3.5 Sonnet, GPT-4, o1 | Reasoning profundo, detecção de edge cases | Para revisão e depuração, modelos maiores com reasoning forte vencem. O custo maior se justifica pela qualidade. |
| ⚙️ **Automação / Workflow** | GPT-4, Claude, Gemini (com function calling) | Tool use, integração com APIs | Modelos com suporte nativo a function calling são ordens de grandeza melhores para integrar com planilhas, CRMs, calendários. Modelos só-texto não bastam. |
| 🎨 **Criatividade / Ideação** | GPT-4, Claude | Versatilidade criativa, temperatura alta | Use temperatura ~0.8–1.0. Para brainstorming, peça múltiplas alternativas divergentes antes de convergir. |
| 🛡️ **Validação / Contraponto** | Qualquer modelo diferente do gerador | Viés complementar | O modelo revisor deve ser diferente do gerador. Claude gera → GPT-4 critica (ou vice-versa). Isso reduz viés de confirmação. |

### 2.2 Regras de Ouro por Domínio

1. **Fatos → modelo com search.** Nunca confie em conhecimento interno para informações recentes ou específicas.
2. **Código → separe geração de revisão.** Use modelo especializado para gerar, modelo com reasoning forte para revisar.
3. **Documentos formais → temperatura baixa + outline primeiro.**
4. **Brainstorming → temperatura alta + múltiplas iterações.**
5. **Automação → exija function calling.** Sem isso, o modelo não consegue interagir com sistemas externos de forma confiável.
6. **Sempre que possível, use dois modelos em papéis complementares** (gerador + revisor).

---

## 3. Referência Rápida — Checklist

Antes de enviar um prompt, verifique:

- [ ] O tema está claramente delimitado (contexto, escopo, objetivo)?
- [ ] Exigi fontes confiáveis e rejeitei conteúdo opinativo?
- [ ] Defini escopo temporal (se relevante)?
- [ ] Pedi revisão crítica da própria resposta?
- [ ] Instruí o tom desejado (assertivo/técnico vs. criativo/exploratório)?
- [ ] Escolhi o modelo certo para a tarefa (search, código, documento, criatividade)?
- [ ] A temperatura está adequada ao objetivo?
- [ ] Se for uma tarefa crítica, planejei validação com um segundo modelo?

---

*Documento gerado para revisão. Feedbacks são bem-vindos antes da versão final.*