# Diretriz de Auditoria e Ajuste de SEO — Ecossistema HLF

## 1. Fonte de Verdade

A referência técnica e estratégica primária é o documento
**`ProjetoEcossistemaHLF — Versão Consolidada 2026 final`**.

Em caso de conflito entre esse documento e qualquer diretriz global genérica
de SEO previamente configurada no agente, **o documento consolidado sempre
prevalece**. As diretrizes globais servem apenas como esboço complementar,
não como autoridade sobre este projeto.

## 2. Objetivo da Tarefa

Analisar o repositório do Ecossistema HLF (`edusidegum.github.io/HLF/`) e
identificar oportunidades de melhoria de SEO técnico e orgânico, alinhadas
ao documento consolidado — **sem alterar o núcleo funcional do site**.

## 3. Escopo Permitido (pode analisar e sugerir mudanças)

- Meta tags (title, description, canonical)
- Marcação Schema.org (LocalBusiness, Product, etc.)
- `sitemap.xml` e `robots.txt`
- Hierarquia de headings (H1–H3) e HTML semântico
- Atributos `alt` de imagens
- Linkagem interna entre páginas (clustering topical)
- Consistência de NAP (Nome/Endereço/Telefone) se aplicável

## 4. Escopo Proibido (não alterar sem aprovação explícita)

- Lógica funcional de arquivos `.js` (ex: `bloco-proposta.js` e scripts de
  conversão/tracking)
- Estilos visuais em `.css` — layout, cores, tipografia, responsividade
- Estrutura de CTAs, formulários e fluxo de conversão
- Nomes de arquivos, caminhos ou estrutura de pastas existente
- Qualquer elemento decidido anteriormente na auditoria do
  `projetofinal.txt` (ex: base domain `/HLF/`, canonicals com `.html`
  explícito, `/doc/` via robots.txt, `/scripts/` via robots.txt)

## 5. Processo de Execução

1. Ler e indexar o documento consolidado antes de tocar no repositório.
2. Mapear todas as páginas publicadas do repositório.
3. Para cada página, auditar: title, meta description, canonical, schema,
   headings, alt text, links internos.
4. Comparar os achados com os critérios do documento consolidado (E-E-A-T
   real, information gain, Core Web Vitals/INP, ausência de back-button
   hijacking, sitemap/robots corretos).
5. **Não aplicar nenhuma alteração diretamente nos arquivos originais.**
6. Registrar todas as propostas em uma pasta isolada:
   ```
   /auditoria-seo/
   ```
   Um arquivo markdown por página analisada, nomeado
   `auditoria-[nome-da-pagina].md`.
7. Aguardar aprovação explícita, página por página, antes de qualquer
   modificação no arquivo real — seguindo o método incremental e
   confirmado, um passo por vez.

## 6. Formato de Cada Relatório de Página

```markdown
# Auditoria SEO — [nome-da-página]

| Item          | Estado Atual | Problema Identificado | Sugestão | Risco |
|---------------|--------------|------------------------|----------|-------|
| Title         |              |                        |          |       |
| Meta desc.    |              |                        |          |       |
| Canonical     |              |                        |          |       |
| Schema        |              |                        |          |       |
| Headings      |              |                        |          |       |
| Alt text      |              |                        |          |       |
| Links internos|              |                        |          |       |

**Risco**: Baixo / Médio / Alto
(Alto = qualquer sugestão que tangencie JS/CSS/estrutura de conversão —
deve ser sinalizada e nunca aplicada automaticamente.)
```

## 7. Regra de Ouro

Se uma sugestão de SEO exigir tocar em JS, CSS ou na estrutura de
conversão para funcionar, **ela deve ser reportada como risco alto e
não implementada** — o ganho de SEO nunca justifica comprometer a
funcionalidade ou a experiência de conversão já validada.
