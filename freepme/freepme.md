# freepme — Arquivos Genéricos (Templates)

**Repositório:** `https://github.com/edusidegum/menu/freepme/`

Modelos prontos para qualquer projeto do ecossistema. Todos os projetos apontam para esta subpasta.

---

## Estrutura

menu/ └── freepme/ ├── politicadeprivacidade.html ← LGPD genérica ├── bloco-cookies.html ← Banner de cookies (injetado) ├── bloco-ga4-gtm.html ← GA4 + GTM condicional (injetado) ├── bloco-incluir.js ← Motor de injeção (cookies, GA4, LGPD, autor, proteção) ├── bloco-protecao.js ← Proteção anti-cópia (opcional) └── README.md ← Este arquivo


---

## Como usar em qualquer projeto

Adicione **uma única linha** no `<head>` do `index.html`:

```html
<script src="https://edusidegum.github.io/menu/freepme/bloco-incluir.js" defer></script>

```
Placeholders para substituir
Arquivo	Placeholder	Descrição
politicadeprivacidade.html	{{NOME_EMPRESA}}	Nome do negócio
politicadeprivacidade.html	{{EMAIL_CONTATO}}	E-mail de contato (DPO)
politicadeprivacidade.html	{{DATA_ATUALIZACAO}}	Data da última revisão (ex: 27/07/2026)
politicadeprivacidade.html	{{URL_BASE}}	URL raiz do projeto
politicadeprivacidade.html	{{ANO}}	Ano corrente
bloco-cookies.html	{{URL_POLITICA}}	Substituído automaticamente pelo JS
bloco-ga4-gtm.html	{{GTM_ID}}	ID do Google Tag Manager (ex: GTM-XXXXXXX)
bloco-ga4-gtm.html	{{GA4_MEASUREMENT_ID}}	ID do GA4 (ex: G-XXXXXXXXXX)


bloco-incluir.js (carregado no <head>)
 │
 ├─[1] fetch bloco-cookies.html → injeta no <body>
 │      └─ Se aceito: dispara evento lgpd_cookies_aceitos
 │
 ├─[2] fetch bloco-ga4-gtm.html → injeta no <head>
 │      └─ Internamente verifica localStorage lgpd_cookies === 'aceitos'
 │
 ├─[3] Cria/usa <footer> com link para politicadeprivacidade.html
 │
 ├─[4] Adiciona crédito "Projeto Visibilidade — por Eduardo Sidegum"
 │
 └─[5] Se <meta name="protecao-copia" content="true"> → carrega bloco-protecao.js

⚠️ Indexação — Nota Importante
bloco-protecao.js bloqueia apenas interações de UI (botão direito, teclas, seleção).
NÃO afeta indexação. Googlebot, Bingbot e crawlers de IA ignoram bloqueios de UI e leem o HTML estático normalmente.
politicadeprivacidade.html usa noindex, follow para não competir com a página principal nos rankings.
Licença: MIT — uso livre para qualquer pequeno negócio. Mantenedor: Eduardo Sidegum — github.com/edusidegum



