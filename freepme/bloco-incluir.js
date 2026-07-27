/**
 * bloco-incluir.js  —  v2.3
 * Projeto: freepme — Templates Genéricos para Pequenos Negócios
 * Repositório: https://github.com/edusidegum/menu/freepme/
 *
 * Correções v2.3:
 *   - console.warn substituído por console.log em todas as funções
 *
 * Inclui: cookies, GA4/GTM condicional, link política LGPD, crédito autor.
 * Proteção anti-cópia APENAS se <meta name="protecao-copia" content="true">.
 *
 * Uso: <script src="https://edusidegum.github.io/menu/freepme/bloco-incluir.js" defer></script>
 * Licença: MIT
 */
(function(){
  'use strict';
  var BASE = 'https://edusidegum.github.io/menu/freepme/';

  function getOrCreateFooter() {
    var footer = document.querySelector('footer');
    if (!footer) {
      footer = document.createElement('footer');
      footer.style.cssText = 'text-align:center;padding:24px 16px;font-size:0.82rem;color:#999;border-top:1px solid #e0e0e0;margin-top:40px;';
      document.body.appendChild(footer);
    }
    return footer;
  }

  function injectCookies() {
    try {
      var div = document.createElement('div');
      div.id = 'bloco-cookies-container';
      document.body.appendChild(div);
      fetch(BASE + 'bloco-cookies.html')
        .then(function(r){ if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
        .then(function(html){
          var urlPolitica = window.location.origin + '/privacidade.html';
          html = html.replace(/\{\{URL_POLITICA\}\}/g, urlPolitica);
          div.innerHTML = html;
          var scripts = div.querySelectorAll('script');
          scripts.forEach(function(s){
            var ns = document.createElement('script');
            if (s.src) ns.src = s.src; else ns.textContent = s.textContent;
            document.body.appendChild(ns);
          });
        })
        .catch(function(err){ console.log('[freepme] bloco-cookies:', err.message); });
    } catch(e) { console.log('[freepme] Erro cookies:', e.message); }
  }

  function injectGA4GTM() {
    try {
      fetch(BASE + 'bloco-ga4-gtm.html')
        .then(function(r){ if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
        .then(function(html){
          var div = document.createElement('div');
          div.style.display = 'none';
          div.innerHTML = html;
          document.head.appendChild(div);
          var scripts = div.querySelectorAll('script');
          scripts.forEach(function(s){
            var ns = document.createElement('script');
            if (s.src) ns.src = s.src; else ns.textContent = s.textContent;
            document.head.appendChild(ns);
          });
        })
        .catch(function(err){ console.log('[freepme] bloco-ga4-gtm:', err.message); });
    } catch(e) { console.log('[freepme] Erro GA4:', e.message); }
  }

  function injectLinkPolitica() {
    try {
      var footer = getOrCreateFooter();
      var ld = document.createElement('div');
      ld.style.marginBottom = '8px';
      ld.innerHTML = '<a href="/privacidade.html" style="color:#2563eb;text-decoration:none;font-weight:500;">Política de Privacidade (LGPD)</a>';
      footer.insertBefore(ld, footer.firstChild);
    } catch(e) { console.log('[freepme] Erro link LGPD:', e.message); }
  }

  function injectCreditoAutor() {
    try {
      var metaCredito = document.querySelector('meta[name="credito-autor"]');
      if (metaCredito && metaCredito.getAttribute('content') === 'false') return;
      var footer = getOrCreateFooter();
      var textoCredito = (metaCredito && metaCredito.getAttribute('content') !== 'true')
        ? metaCredito.getAttribute('content')
        : 'Projeto Visibilidade — por Eduardo Sidegum';
      var credito = document.createElement('div');
      credito.style.cssText = 'margin-top:6px;font-size:0.78rem;color:#aaa;';
      credito.innerHTML = textoCredito + ' <a href="https://edusidegum.github.io/edusidegum/" target="_blank" rel="noopener" style="color:#2563eb;text-decoration:none;font-weight:500;" title="Eduardo Sidegum — Portfólio">🔗</a>';
      footer.appendChild(credito);
    } catch(e) { console.log('[freepme] Erro crédito:', e.message); }
  }

  function injectProtecao() {
    try {
      var meta = document.querySelector('meta[name="protecao-copia"]');
      if (!meta || meta.getAttribute('content') !== 'true') return;
      var script = document.createElement('script');
      script.src = BASE + 'bloco-protecao.js';
      script.defer = true;
      script.onerror = function(){ console.log('[freepme] bloco-protecao não carregado.'); };
      document.head.appendChild(script);
    } catch(e) { console.log('[freepme] Erro proteção:', e.message); }
  }

  function init() {
    injectCookies();
    injectGA4GTM();
    injectLinkPolitica();
    injectCreditoAutor();
    injectProtecao();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
