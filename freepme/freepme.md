# freepme — Arquivos Genéricos (Templates)

**Repositório:** `https://github.com/edusidegum/menu/freepme/`
Modelos prontos para qualquer projeto do ecossistema. Todos os projetos apontam para esta subpasta.

---

## Estruturamenu/
└── freepme/
├── politicadeprivacidade.html   ← LGPD genérica (copiar como privacidade.html no projeto)
├── bloco-cookies.html           ← Banner de cookies (injetado)
├── bloco-ga4-gtm.html           ← GA4 + GTM condicional (injetado)
├── bloco-incluir.js             ← Motor de injeção v2.3 (console.log)
├── bloco-protecao.js            ← Proteção anti-cópia v2.3 (sem Ctrl+S/P)
└── README.md                    ← Este arquivoCódigo
**Arquivos obrigatórios na raiz de cada projeto** (não estão no `freepme/`, mas devem ser criados):meu-projeto/
├── .nojekyll          ← Arquivo VAZIO — desativa o Jekyll (obrigatório!)
├── _config.yml        ← Configuração mínima do GitHub Pages
├── index.html
├── nativa.html
├── privacidade.html   ← Cópia de freepme/politicadeprivacidade.html com placeholders substituídos
├── robots.txt
├── llms.txt
└── sitemap.xmlCódigo
> **Por que `.nojekyll` é obrigatório:** O GitHub Pages processa sites via Jekyll por padrão. O Jekyll (Liquid) interpreta `{{ }}` como variáveis de template e quebra placeholders como `{{URL_POLITICA}}`. O arquivo `.nojekyll` (vazio) desativa completamente o Jekyll e serve os arquivos como HTML estático puro. Sem ele, o site pode quebrar silenciosamente.

---

## Como usar em qualquer projeto

Adicione **uma única linha** no `<head>` do `index.html`:
```html
<script src="https://edusidegum.github.io/menu/freepme/bloco-incluir.js" defer></script>Isso automaticamente:
```
#FuncionalidadeCondição1Banner de cookies (LGPD)Sempre2GA4 + GTMSó carrega após aceite de cookies3Link "Política de Privacidade" no rodapéSempre4Crédito "Projeto Visibilidade — por Eduardo Sidegum"Sempre (configurável via meta tag)5Proteção anti-cópiaSe houver <meta name="protecao-copia" content="true">Placeholders para substituirFormato padronizado: todos os placeholders usam NOME_EM_MAIUSCULAS (sem {{}}), compatível com ou sem .nojekyll.

ArquivoPlaceholderDescriçãopoliticadeprivacidade.htmlNOME_DA_EMPRESANome do negóciopoliticadeprivacidade.htmlEMAIL_CONTATOE-mail de contato (DPO)politicadeprivacidade.htmlDATA_ATUALIZACAOData da última revisão (ex: 27/07/2026)politicadeprivacidade.htmlURL_BASEURL raiz do projetobloco-ga4-gtm.htmlGTM_IDID do Google Tag Manager (ex: GTM-XXXXXXX)bloco-ga4-gtm.htmlGA4_MEASUREMENT_IDID do GA4 (ex: G-XXXXXXXXXX)
Nota sobre {{URL_POLITICA}} no bloco-cookies.html: este placeholder usa {{}} porque é substituído em tempo de execução pelo bloco-incluir.js (regex), não em tempo de build. Não requer .nojekyll porque o arquivo é carregado via fetch(), não processado pelo Jekyll.

Nota sobre o ano: o rodapé da politicadeprivacidade.html gera o ano dinamicamente via JavaScript (new Date().getFullYear()). Nenhum placeholder de ano é necessário.
Nomenclatura dos arquivos

Arquivo no freepme/ (fonte)Arquivo no projeto do cliente (destino)politicadeprivacidade.htmlprivacidade.htmlRegra: o template fonte mantém o nome longo em freepme/. Ao copiar para o projeto do cliente, renomear para privacidade.html. O bloco-incluir.js já aponta para /privacidade.html (via window.location.origin).Diagrama de InjeçãoCódigobloco-incluir.js (carregado no <head>)
 │
 ├─[1] fetch bloco-cookies.html → injeta no <body>  [try/catch — log silencioso]
 │      └─ Se aceito: dispara evento lgpd_cookies_aceitos
 │
 ├─[2] fetch bloco-ga4-gtm.html → injeta no <head>  [try/catch — log silencioso]
 │      └─ Internamente verifica localStorage lgpd_cookies === 'aceitos'
 │
 ├─[3] Cria/usa <footer> com link para /privacidade.html  [null check]
 │
 ├─[4] Adiciona crédito "Projeto Visibilidade — por Eduardo Sidegum"  [null check]
 │
 └─[5] Se <meta name="protecao-copia" content="true"> → carrega bloco-protecao.jsIndexação — Nota Importante
bloco-protecao.js bloqueia apenas interações de UI (botão direito, teclas, seleção). NÃO afeta indexação. Googlebot, Bingbot e crawlers de IA ignoram bloqueios de UI e leem o HTML estático normalmente.
privacidade.html (cópia de politicadeprivacidade.html) usa noindex, follow para não competir com a página principal nos rankings.
bloco-protecao.js não interage com o <footer> — apenas adiciona event listeners e um <style>. Não requer null check de footer.
Licença: MIT — uso livre para qualquer pequeno negócio.
Mantenedor: Eduardo Sidegum — github.com/edusidegum
