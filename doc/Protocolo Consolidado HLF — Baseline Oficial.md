# Estrutura limpa de artefatos — HLF

## Objetivo

Organizar o ecossistema em artefatos separados, com fronteira clara entre:

- norma universal
- norma operacional HLF
- templates de implementação
- inventário de estrutura pública
- áreas bloqueadas e conteúdo sensível
- checklist de validação

A regra é simples: **cada artefato deve ter uma função única**. Nada de misturar norma, código, inventário e contexto editorial no mesmo bloco.

---

## 1) Artefatos canônicos

### 00_documento_mestre.md
**Função:** referência-mãe do ecossistema.

Conteúdo:
- princípios gerais
- governança editorial
- SEO técnico-base
- compliance-base
- performance-base
- regras de publicação
- checklist de validação

**Uso:** documento principal para consulta interna e para orientar geração de páginas e código.

---

### 01_norma_universal.md
**Função:** regras que valem para qualquer projeto do ecossistema.

Conteúdo:
- briefing obrigatório
- decisão de menu por briefing
- decisão de footer por briefing
- canonical e og:url absolutos
- hreflang pt-BR + x-default
- JSON-LD com @graph e @id estáveis
- performance: fontes locais, preload quando aplicável, swap, lazy load
- consistência entre robots.txt, meta robots e sitemap

**Regra:** não conter detalhes específicos de HLF.

---

### 02_norma_hlf.md
**Função:** regras específicas do ecossistema HLF.

Conteúdo:
- separação entre Brasil educativo e mercados legalizados
- páginas com valores, moedas, kits e informações sensíveis
- páginas noindex/nofollow conforme norma interna e legal
- fluxo de conversão permitido
- CTAs autorizados
- distinção entre autoridade, consultoria e oferta
- regras de uso de redes sociais e TikTok

**Regra:** não repetir a norma universal; apenas adaptar ao contexto HLF.

---

### 03_templates_codigo.md
**Função:** repositório técnico de templates reutilizáveis.

Conteúdo:
- head SEO completo
- bloco-incluir.js
- bloco-protecao.js
- topbar
- footer
- bloco-cookies LGPD
- snippets de imagem LCP e lazy
- padrão de WhatsApp com origem por slug

**Regra:** manter apenas código e instruções de uso.

---

### 04_estrutura_pastas.md
**Função:** inventário limpo da arquitetura de diretórios.

Conteúdo:
- estrutura prevista e pública
- estrutura bloqueada
- pastas sensíveis separadas
- regra de não mistura entre conteúdo público e conteúdo de controle

Exemplo de separação:
- públicas previstas: `assets/`, `pages/`, `compartilhado/`, `components/`
- bloqueadas/sensíveis: `doc/`, `data/`, `scripts/` quando definidos como restritos
- áreas de controle: `menu/` quando usada como pasta privada de operação

**Regra:** tudo que é sensível deve ficar em seção separada e explícita.

---

### 05_matriz_robots.md
**Função:** regra única de indexação por tipo de página.

Conteúdo:
- index/follow
- noindex/follow
- noindex/nofollow
- noimageindex quando necessário
- bloqueios por pasta
- casos especiais com valores, moedas, listas, kits e conteúdos privados

**Regra:** uma página só entra na matriz depois de ter intenção e função definidas.

---

### 06_checklist_publicacao.md
**Função:** validação antes de publicar.

Conteúdo:
- intenção principal da página
- entidade reforçada
- CTA permitido
- tipo de indexação
- canonical e og:url
- schema
- links internos
- performance
- compliance
- necessidade de proteção

**Regra:** nenhuma página vai ao ar sem passar por esse checklist.

---

## 2) Estrutura recomendada para salvar no repositório

### Núcleo documental
- `00_documento_mestre.md`
- `01_norma_universal.md`
- `02_norma_hlf.md`
- `03_templates_codigo.md`
- `04_estrutura_pastas.md`
- `05_matriz_robots.md`
- `06_checklist_publicacao.md`

### Anexos operacionais
- `anexos/templates/`
- `anexos/robots/`
- `anexos/schema/`
- `anexos/snippets/`

### Conteúdo bloqueado ou sensível
- `menu/` quando for pasta de controle privada
- `data/` quando armazenar valores, estados, listas ou inventário sensível
- `doc/` quando guardar documentação de trabalho não pública
- `scripts/` quando contiver lógica de negócio protegida ou restrita

---

## 3) O que manter, arquivar ou apagar

### Manter como base principal
- `A_documento_mestre_diretriz_ecossistema_hlf.txt`

### Manter como anexo técnico
- `Anexo — Templates aprovados (para incorporar ao Documento Mestre) (5).md`

### Arquivar ou apagar após migração
- versões antigas e redundantes do documento mestre
- rascunhos que já foram absorvidos pelo núcleo documental
- duplicatas de template já consolidadas em `03_templates_codigo.md`

### Regra prática
Se um arquivo:
- repete a norma central
- mistura tema público e sensível
- mistura regra e implementação
- não adiciona nada novo

então ele deve ser **arquivado** ou **apagado** após conferência.

---

## 4) Fronteiras obrigatórias

### Separar sempre
- norma universal x norma HLF
- público x sensível
- template x regra
- conteúdo editorial x código
- estrutura prevista x pasta bloqueada
- indexável x não indexável

### Não misturar
- valores públicos com páginas indexáveis
- ideias privadas com documentos públicos
- exemplos de código com texto normativo
- regras permanentes com observações pontuais

---

## 5) Regra final de uso

Este conjunto deve ser usado como base única para:

- gerar código
- revisar páginas
- validar SEO
- validar indexação
- organizar diretórios
- evitar contradição documental

**Ordem de preferência:**
1. norma universal
2. norma HLF
3. templates
4. checklist
5. anexos

---

## 6) Próximo passo recomendado

Se quiser, o próximo passo ideal é eu transformar esta estrutura em **arquivos prontos**, um por um, no formato:

- `00_documento_mestre.md`
- `01_norma_universal.md`
- `02_norma_hlf.md`
- `03_templates_codigo.md`
- `04_estrutura_pastas.md`
- `05_matriz_robots.md`
- `06_checklist_publicacao.md`

Assim você já salva tudo separado e limpo.