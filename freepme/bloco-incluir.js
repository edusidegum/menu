/**
 * bloco-incluir.js
 * Projeto: freepme — Templates Genéricos para Pequenos Negócios
 * Repositório: https://github.com/edusidegum/menu/freepme/
 * Baseado em: menu/scripts/bloco-incluir.js
 * Adaptações: BASE aponta para freepme/ (não compartilhado/).
 *              Inclui: cookies, GA4/GTM condicional, link política LGPD, crédito autor.
 *              Proteção anti-cópia injetada APENAS se <meta name="protecao-copia" content="true">.
 * Uso:        <script src="https://edusidegum.github.io/menu/freepme/bloco-incluir.js" defer></script>
 * Licença:    MIT
 */

(function(){
  'use strict';

  /* ================================================================
     CONFIGURAÇÃO
     ================================================================ */
  var BASE = 'https://edusidegum.github.io/menu/freepme/';

  /* ================================================================
     1. INJETAR BLOCO DE COOKIES (banner LGPD)
     ================================================================ */
  function injectCookies() {
    var div = document.createElement('div');
    div.id = 'bloco-cookies-container';
    document.body.appendChild(div);

    fetch(BASE + 'bloco-cookies.html')
      .then(function(r){ return r.text(); })
      .then(function(html){
        // Substitui placeholder da URL da política
        var urlPolitica = window.location.origin + '/politicadeprivacidade.html';
        html = html.replace(/{{URL_POLITICA}}/g, urlPolitica);

        div.innerHTML = html;

        // Executa scripts inline do bloco (o banner de cookies tem scripts inline)
        var scripts = div.querySelectorAll('script');
        scripts.forEach(function(s){
          var newScript = document.createElement('script');
          if (s.src) {
            newScript.src = s.src;
          } else {
            newScript.textContent = s.textContent;
          }
          document.body.appendChild(newScript);
        });
      })
      .catch(function(err){
        console.warn('[freepme] bloco-cookies não carregado:', err.message);
      });
  }

  /* ================================================================
     2. INJETAR GA4 / GTM (condicional — só carrega após aceite)
     ================================================================ */
  function injectGA4GTM() {
    // Não carrega imediatamente — o bloco-ga4-gtm.html já verifica lgpd_cookies
    // Injetamos o bloco no <head> para que o listener do evento fique pronto
    fetch(BASE + 'bloco-ga4-gtm.html')
      .then(function(r){ return r.text(); })
      .then(function(html){
        var div = document.createElement('div');
        div.style.display = 'none';
        div.innerHTML = html;
        document.head.appendChild(div);

        // Executa scripts
        var scripts = div.querySelectorAll('script');
        scripts.forEach(function(s){
          var newScript = document.createElement('script');
          if (s.src) {
            newScript.src = s.src;
          } else {
            newScript.textContent = s.textContent;
          }
          document.head.appendChild(newScript);
        });
      })
      .catch(function(err){
        console.warn('[freepme] bloco-ga4-gtm não carregado:', err.message);
      });
  }

  /* ================================================================
     3. INJETAR LINK DA POLÍTICA DE PRIVACIDADE NO RODAPÉ
     ================================================================ */
  function injectLinkPolitica() {
    var footer = document.querySelector('footer');
    if (!footer) {
      // Cria um footer mínimo se não existir
      footer = document.createElement('footer');
      footer.style.cssText = 'text-align:center;padding:24px 16px;font-size:0.82rem;color:#999;border-top:1px solid #e0e0e0;margin-top:40px;';
      document.body.appendChild(footer);
    }

    var linkDiv = document.createElement('div');
    linkDiv.style.marginBottom = '8px';
    linkDiv.innerHTML =
      '<a href="/politicadeprivacidade.html" ' +
      'style="color:#2563eb;text-decoration:none;font-weight:500;">Política de Privacidade (LGPD)</a>';
    footer.insertBefore(linkDiv, footer.firstChild);
  }

  /* ================================================================
     4. INJETAR CRÉDITO DO AUTOR (configurável via <meta>)
        - <meta name="credito-autor" content="false"> → NÃO injeta crédito
        - <meta name="credito-autor" content="Desenvolvido por <e/> e-Sid"> → texto customizado
        - Sem meta → padrão: "Projeto Visibilidade — por Eduardo Sidegum"
        O link para https://edusidegum.github.io/edusidegum/ está sempre presente
        (exceto quando false), inserido como ícone 🔗 discreto.
     ================================================================ */
  function injectCreditoAutor() {
    // Verifica se crédito está desativado
    var metaCredito = document.querySelector('meta[name="credito-autor"]');
    if (metaCredito && metaCredito.getAttribute('content') === 'false') return;

    // Define o texto do crédito
    var textoCredito;
    if (metaCredito && metaCredito.getAttribute('content') && metaCredito.getAttribute('content') !== 'true') {
      textoCredito = metaCredito.getAttribute('content');
    } else {
      textoCredito = 'Projeto Visibilidade — por Eduardo Sidegum';
    }

    var footer = document.querySelector('footer');
    if (!footer) {
      footer = document.createElement('footer');
      footer.style.cssText = 'text-align:center;padding:24px 16px;font-size:0.82rem;color:#999;border-top:1px solid #e0e0e0;margin-top:40px;';
      document.body.appendChild(footer);
    }

    var credito = document.createElement('div');
    credito.style.cssText = 'margin-top:6px;font-size:0.78rem;color:#aaa;';
    credito.innerHTML =
      textoCredito +
      ' <a href="https://edusidegum.github.io/edusidegum/" ' +
      'target="_blank" rel="noopener" ' +
      'style="color:#aaa;text-decoration:none;" ' +
      'title="Desenvolvido por Eduardo Sidegum">🔗</a>';
    footer.appendChild(credito);
  }

  /* ================================================================
     5. INJETAR PROTEÇÃO ANTI-CÓPIA (opcional)
        Ativado por <meta name="protecao-copia" content="true">
        NÃO afeta indexação: Googlebot ignora bloqueios de UI e lê o HTML.
     ================================================================ */
  function injectProtecao() {
    var meta = document.querySelector('meta[name="protecao-copia"]');
    if (!meta || meta.getAttribute('content') !== 'true') return;

    var script = document.createElement('script');
    script.src = BASE + 'bloco-protecao.js';
    script.defer = true;
    document.head.appendChild(script);
  }

  /* ================================================================
     EXECUÇÃO PRINCIPAL
     ================================================================ */
  function init() {
    injectCookies();        // Banner LGPD
    injectGA4GTM();         // GA4 + GTM (condicional)
    injectLinkPolitica();   // Link para política de privacidade no rodapé
    injectCreditoAutor();   // Crédito do autor (configurável)
    injectProtecao();       // Proteção anti-cópia (opcional)
  }

  // Aguarda DOM pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
