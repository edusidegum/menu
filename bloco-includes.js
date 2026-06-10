// ══════════ INCLUDE DINÂMICO ═══════════
// Salve em: https://edusidegum.github.io/menu/bloco-includes.js
// Adicione no <head>: <script src="https://edusidegum.github.io/menu/bloco-includes.js" defer></script>

(function() {
  const BASE = 'https://edusidegum.github.io/menu/';

  function injetar(arquivo, seletorAlvo, posicao) {
    return fetch(BASE + arquivo)
      .then(r => r.text())
      .then(html => {
        const alvo = document.querySelector(seletorAlvo);
        if (alvo) alvo.insertAdjacentHTML(posicao, html);
      })
      .catch(() => {});
  }

  // Banner de cookies
  injetar('bloco-cookies.html', 'body', 'beforeend');

  // GA4 / GTM
  injetar('bloco-ga4-gtm.html', 'head', 'beforeend');

  // ═══ LÓGICA COOKIES (delegação no document — sempre funciona) ═══
  document.addEventListener('click', function(e) {
    if (e.target.id === 'btn-aceitar-cookies') {
      var banner = document.getElementById('cookie-banner');
      if (banner) banner.style.display = 'none';
      localStorage.setItem('lgpd_cookies_aceitos', '1');
    }
  });

  // ═══ VERIFICA SE JÁ ACEITOU (polling até o banner existir) ═══
  function esconderSeAceito() {
    var banner = document.getElementById('cookie-banner');
    if (banner && localStorage.getItem('lgpd_cookies_aceitos') === '1') {
      banner.style.display = 'none';
      return true;
    }
    return false;
  }
  if (!esconderSeAceito()) {
    var tentativas = 0;
    var timer = setInterval(function() {
      tentativas++;
      if (esconderSeAceito() || tentativas > 20) clearInterval(timer);
    }, 300);
  }

  // ═══ LINK "POLÍTICA DE PRIVACIDADE" NO RODAPÉ ═══
  document.addEventListener('DOMContentLoaded', function() {
    var footer = document.querySelector('footer') || document.querySelector('.footer') || document.body;
    var div = document.createElement('div');
    div.style.cssText = 'text-align:center;margin-top:12px;font-size:0.7rem;color:#888;';
    div.innerHTML = '<a href="' + BASE + 'politicadeprivacidade.html" style="color:#888;text-decoration:none;">Política de Privacidade</a>';
    footer.appendChild(div);
  });

})();

	