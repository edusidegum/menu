## 1. Apresentação e Objetivo do Manual

Este manual consolida boas práticas de engenharia de software aplicadas a ecossistemas de sites estáticos hospedados em GitHub Pages ou infraestrutura equivalente. O objetivo é fornecer a múltiplos agentes e programadores um guia rigoroso de arquitetura, SEO técnico e governança documental, garantindo alta performance, conformidade com E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) e uma estrutura de arquivos padronizada para manutenção escalável.

## 2. Briefing Obrigatório: Diagnóstico Pré-Implementação

Nenhum código deve ser escrito antes da resposta clara às seguintes questões. O diagnóstico precede a intervenção técnica:

1. **Escopo de Navegação:** O projeto utilizará uma topbar/menu universal do ecossistema ou requer estrutura exclusiva?
2. **Governança de Legais:** Os documentos de Política de Privacidade e Termos de Uso serão centralizados em um repositório core ou replicados localmente com parametrização?
3. **Estratégia de Indexação:** Quais páginas devem ser indexadas pelos buscadores e quais devem permanecer sob diretiva `noindex`?
4. **Rastreamento:** O container de tagueamento já está criado? Haverá necessidade de medição de conversões específicas (WhatsApp, formulários, leads)?
5. **Segurança de Conteúdo:** Existe necessidade de proteção seletiva contra cópia em blocos específicos de texto ou imagens?

## 3. Premissas Globais de Arquitetura

A arquitetura baseia-se no princípio de baixo acoplamento e reutilização inteligente. Em ambientes estáticos, a organização de pastas substitui a lógica de banco de dados para fins de governança.

- **Menu/Topbar:** Não deve ser assumido como universal; trate como componente específico de projeto, salvo decisão contrária no briefing.
- **Footer/Legais:** Devem ser centralizados sempre que possível para garantir conformidade jurídica em todo o ecossistema.
- **Runtime:** Evite usar origens externas inadequadas para scripts ou estilos em produção.
- **Proteção:** A proteção contra cópia é uma barreira superficial e deve ser aplicada de forma seletiva para não degradar a experiência do usuário.

## 4. Estrutura Final de Pastas e Arquivos

A árvore de diretórios abaixo é o padrão obrigatório para todos os agentes. A raiz deve permanecer limpa, contendo apenas os pontos de entrada e arquivos de configuração de busca.

```text
/ (raiz)
├── index.html              # Página principal institucional
├── 404.html                # Tratamento de erro 404
├── robots.txt              # Governança de rastreamento
├── sitemap.xml             # Mapa do site para buscadores
├── README.md               # Documentação técnica do repositório
├── site.webmanifest        # Metadados de PWA/Mobile (opcional)
├── assets/                 # Recursos estáticos
│   ├── css/                # Folhas de estilo
│   ├── js/                 # Scripts
│   ├── img/                # Imagens otimizadas
│   ├── fonts/              # Fontes locais
│   └── icons/              # Favicons e ícones de interface
├── doc/                    # Documentação legal (Privacidade, Termos)
├── valor/                  # Arquivos de tabelas, preços ou dados operacionais
└── data/                   # Arquivos JSON de configuração ou conteúdo dinâmico
```

Atenção: as pastas `doc/` e `valor/` servem para organização e governança de indexação. Elas não bloqueiam o acesso direto via URL. Conteúdo sensível não deve ser armazenado em repositórios públicos.

## 5. SEO Técnico e E-E-A-T Aplicado

Para ambientes de 2026 em diante, os algoritmos priorizam autoridade do autor e precisão técnica. A implementação deve seguir:

- **Canonical:** Toda página deve possuir uma tag canonical absoluta e coerente com a URL final de publicação.
- **Metadados Sociais:** `og:url` deve ser idêntica à URL canônica.
- **Governança de Indexação:** Documentos legais e páginas de “Em Obras” devem utilizar `noindex`.
- **Schema.org:** Implementar JSON-LD mínimo para `WebSite`, `Organization` e `Person` quando aplicável.
- **Performance:** Minimizar o uso de JavaScript pesado que bloqueie a interação do usuário.

## 6. Componentes e Snippets Reutilizáveis

### 6.1. Head Padrão (SEO & Metadados)

```html
<!-- Head SEO padrão -->
```

### 6.2. Bloco-Incluir.js (Orquestrador de Includes)

Este script centraliza a inclusão de componentes sem duplicar código. Deve ser chamado com o atributo `defer`.

```javascript
(function() {
  const BASE = 'https://exemplo.com/menu/';

  function injetar(arquivo, seletor, posicao) {
    fetch(BASE + arquivo + '.html?v=1.0.2')
      .then(r => r.text())
      .then(html => {
        const alvo = document.querySelector(seletor);
        if (alvo) alvo.insertAdjacentHTML(posicao, html);
      });
  }

  injetar('compartilhado/bloco-cookies', 'body', 'beforeend');
  injetar('compartilhado/bloco-gtm-head', 'head', 'beforeend');

  document.addEventListener('DOMContentLoaded', () => {
    const f = document.querySelector('footer');
    if (f) {
      const div = document.createElement('div');
      div.innerHTML = ' marca/referência';
      f.appendChild(div);
    }
  });
})();
```

### 6.3. Bloco-Protecao.js (Seletivo)

```javascript
// Proteção aplicada apenas em elementos com data-protected="true"
document.addEventListener('copy', (e) => {
  if (e.target.closest('[data-protected="true"]')) {
    e.preventDefault();
    alert('Cópia restrita para este conteúdo.');
  }
});
```

## 7. Classificação de Materiais e Templates

| Item | Classificação | Ação Recomendada |
|---|---|---|
| `em_obras.html` | Padrão Reutilizável | Usar como placeholder com `noindex` |
| `topbarfixa.html` | Componente Parametrizado | Ajustar links conforme briefing |
| `bloco-incluir.js` | Componente Parametrizado | Orquestrador central de dependências |
| Política de Privacidade | Anexo Jurídico Aprovado | Publicar em `/doc/` com canonical |
| Proteção Global (Body) | Anti-padrão | Remover; usar proteção seletiva |
| Origem inadequada de runtime | Anti-padrão | Remover; usar paths de produção |

## 8. Kit Completo de Projeto (Anexos Saneados)

### 8.1. Modelo: `doc/politica-de-privacidade.html`

Status: texto material aprovado.
Diretriz: publicar com `noindex, follow` quando houver necessidade de rastreamento de links sem indexação do conteúdo.

### 8.2. Modelo: `doc/termos-de-uso.html`

Status: texto material aprovado.
Diretriz: estabelecer a relação entre a operação do projeto, autoria e responsabilidade de conteúdo, com independência comercial quando aplicável.

### 8.3. Modelo: `robots.txt`

```text
User-agent: *
Allow: /
Disallow: /doc/
Disallow: /valor/
Sitemap: https://[DOMINIO]/sitemap.xml
```

## 9. Anti-padrões e Erros a Evitar

1. **Duplicação de Tags:** Nunca incluir mais de um canonical ou `<meta charset>` por documento.
2. **Falsa Privacidade:** Tratar pastas como se estivessem protegidas por senha quando não estão.
3. **Canonical Ausente:** Publicar páginas sem definir a URL oficial.
4. **Inconsistência de Paths:** Misturar pastas antigas com o padrão oficial sem necessidade.
5. **Referência Obsoleta:** Manter menções a arquivos antigos dentro de textos novos.

## 10. Checklist Final de Implementação

- [ ] A estrutura de pastas segue a árvore oficial?
- [ ] O arquivo `index.html` possui canonical absoluta?
- [ ] O `bloco-incluir.js` está chamando apenas os componentes necessários?
- [ ] Documentos em `doc/` estão com `noindex` ativo quando aplicável?
- [ ] As imagens estão na pasta correta com atributos de dimensões?
- [ ] O sistema de rastreamento está centralizado?
- [ ] O `README.md` descreve a finalidade do projeto?

---

*Documento elaborado em 13 de julho de 2026. As informações contidas são de responsabilidade do solicitante e devem ser aplicadas por profissionais qualificados.*