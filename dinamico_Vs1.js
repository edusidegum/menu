// ══════════ PAINEL DINÂMICO • STATUS + DATA DO INDEX ═══════════
// Salve em: https://edusidegum.github.io/menu/dinamico.js
// Adicione no <head>: <script src="dinamico.js" defer></script>

(function() {
  const SITES = [
    { dir: 'hypedrink',       repo: 'hypedrink' },
    { dir: 'clientepremium',  repo: 'clientepremium' },
    { dir: 'cadastro',        repo: 'cadastro' },
    { dir: 'novoconsultor',   repo: 'novoconsultor' },
    { dir: 'wille',           repo: 'wille' },
    { dir: 'sndlimp',         repo: 'sndlimp' },
    { dir: 'transformacao21', repo: 'transformacao21' }
  ];

  const LINHAS = document.querySelectorAll('table tbody tr');
  // Fallback: se não houver tbody, pega todas as tr e pula a primeira (cabeçalho)
  const TRs = LINHAS.length ? LINHAS : document.querySelectorAll('table tr');

  SITES.forEach(function(site, i) {
    // Pega a linha correspondente (pula cabeçalho se não tiver tbody)
    var tr = LINHAS.length ? LINHAS[i] : TRs[i + 1];
    if (!tr) return;

    var tds = tr.querySelectorAll('td');
    var tdStatus = tds[4]; // coluna Status
    var tdData   = tds[5]; // coluna Data Index

    // 1. STATUS: fetch HEAD no site
    fetch('https://edusidegum.github.io/' + site.dir + '/', { method: 'HEAD' })
      .then(function(res) {
        if (tdStatus) {
          if (res.ok) {
            tdStatus.innerHTML = '● <span style="color:#4caf50;">ativo</span>';
          } else {
            tdStatus.innerHTML = '● <span style="color:#F5A623;">offline</span>';
          }
        }
        // 2. DATA: último commit do index.html via GitHub API
        return fetch('https://api.github.com/repos/edusidegum/' + site.repo + '/commits?path=index.html&page=1&per_page=1');
      })
      .then(function(res) {
        if (!res.ok) throw new Error('API erro');
        return res.json();
      })
      .then(function(data) {
        if (tdData && data.length > 0) {
          var d = new Date(data[0].commit.committer.date);
          var iso = d.toISOString().split('T')[0]; // YYYY-MM-DD
          tdData.textContent = iso;
        }
      })
      .catch(function() {
        // Se GitHub API falhar, usa Last-Modified do HEAD como fallback
        fetch('https://edusidegum.github.io/' + site.dir + '/', { method: 'HEAD' })
          .then(function(r) {
            var lm = r.headers.get('Last-Modified');
            if (lm && tdData) {
              var d = new Date(lm);
              tdData.textContent = d.toISOString().split('T')[0];
            }
          })
          .catch(function(){});
      });
  });

})();
