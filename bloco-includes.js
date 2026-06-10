// ══════════ INCLUDE DINÂMICO ═══════════
// Salve em: https://edusidegum.github.io/menu/bloco-includes.js
// Adicione no <head> de cada página: <script src="https://edusidegum.github.io/menu/bloco-includes.js" defer></script>

(function() {
  const BASE = 'https://edusidegum.github.io/menu/';

  function injetar(arquivo, seletorAlvo, posicao) {
    fetch(BASE + arquivo)
      .then(r => r.text())
      .then(html => {
        const alvo = document.querySelector(seletorAlvo);
        if (alvo) alvo.insertAdjacentHTML(posicao, html);
      })
      .catch(() => {});
  }

  // Banner de cookies → antes do </body>
  injetar('bloco-cookies.html', 'body', 'beforeend');

  // GA4 / GTM → dentro do <head>
  injetar('bloco-ga4-gtm.html', 'head', 'beforeend');

  // Link "Política de Privacidade" → último item do rodapé
  document.addEventListener('DOMContentLoaded', function() {
    var footer = document.querySelector('footer') || document.querySelector('.footer') || document.body;
    var div = document.createElement('div');
    div.style.cssText = 'text-align:center;margin-top:12px;font-size:0.7rem;color:#888;';
    div.innerHTML = '<a href="' + BASE + 'politicadeprivacidade.html" style="color:#888;text-decoration:none;">Política de Privacidade</a>';
    footer.appendChild(div);
  });

})();
