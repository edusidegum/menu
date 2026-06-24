/* ============================================================
   novo_dir_dinamico.js — Painel de Controle Edu Sidegum
   Monta a tabela completa via GitHub API
   Cache: 360 min (localStorage)  |  Force: ?refresh na URL
   ============================================================ */

(function () {
    'use strict';

    const STORAGE_KEY = 'painel_v2_cache';
    const CACHE_MIN = 360;
    const API_REPOS  = 'https://api.github.com/users/edusidegum/repos?per_page=100&sort=updated';
    const FORCE = /[?&]refresh/.test(location.search);

    // Pastas/repos que NUNCA aparecem na tabela
    const EXCLUIDOS = new Set(['menu', 'edusidegum.github.io', '.github']);

    // ── Helpers ──
    const fmtData = (iso) => {
        if (!iso) return '—';
        return iso.slice(0, 10); // "2026-06-23"
    };

    const tag = (s) => {
        if (s === 'ativo')    return '<span class="tag-status tag-on">● ativo</span>';
        if (s === 'pendente') return '<span class="tag-status tag-off">● pendente</span>';
        return '<span class="tag-status tag-checking">● verificando</span>';
    };

    // ── Cache ──
    function lerCache() {
        if (FORCE) return null;
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            const c = JSON.parse(raw);
            if ((Date.now() - c.ts) / 60000 < CACHE_MIN) {
                console.log('📦 Cache (' + Math.round((Date.now() - c.ts) / 60000) + ' min)');
                return c.dados;
            }
        } catch (_) {}
        return null;
    }

    function gravarCache(dados) {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ ts: Date.now(), dados })); } catch (_) {}
    }

    // ── Busca repositórios ──
    async function buscarRepos() {
        const res = await fetch(API_REPOS);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const todos = await res.json();
        if (!Array.isArray(todos)) throw new Error('Resposta inválida');

        return todos
            .filter(r => !r.fork && !r.archived && !r.disabled && !EXCLUIDOS.has(r.name) && !r.name.startsWith('.'))
            .map(r => ({
                nome:      r.name,
                site:      'https://edusidegum.github.io/' + r.name + '/',
                repo:      r.html_url,
                has_pages: r.has_pages,
                pushed:    r.pushed_at
            }))
            .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    }

    // ── Verifica se o site está no ar ──
    async function verificarSite(url) {
        try {
            const ctrl = new AbortController();
            const timer = setTimeout(() => ctrl.abort(), 4000);
            const res = await fetch(url, { method: 'HEAD', signal: ctrl.signal });
            clearTimeout(timer);
            return res.ok;
        } catch (_) {
            return false;
        }
    }

    // ── Renderiza a tabela ──
    function renderizar(dados) {
        const tbody = document.querySelector('table tbody');
        if (!tbody) return;

        if (!dados.length) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:30px;color:#666;">Nenhum repositório encontrado</td></tr>';
            return;
        }

        tbody.innerHTML = dados.map((p, i) => `
            <tr>
                <td>${i + 1}</td>
                <td>${p.nome}</td>
                <td><a href="${p.site}" target="_blank" rel="noopener">${p.nome} ↗</a></td>
                <td><a href="${p.repo}" target="_blank" rel="noopener">repo ↗</a></td>
                <td>${tag(p.status)}</td>
                <td>${p.data}</td>
            </tr>
        `).join('');
    }

    // ── MAIN ──
    (async function main() {
        const tbody = document.querySelector('table tbody');

        // 1. Tenta cache
        const cache = lerCache();
        if (cache) {
            renderizar(cache);
            console.log('✅ ' + cache.length + ' projetos (cache)');
            return;
        }

        // 2. Busca GitHub
        let repos;
        try {
            repos = await buscarRepos();
        } catch (err) {
            console.warn('⚠️ API falhou:', err.message);
            // fallback: cache expirado
            try {
                const raw = localStorage.getItem(STORAGE_KEY);
                if (raw) {
                    renderizar(JSON.parse(raw).dados);
                    tbody && (tbody.innerHTML += '<tr><td colspan="6" style="text-align:center;color:#ffc107;font-size:0.75rem;">⚠️ Dados em cache (API indisponível)</td></tr>');
                    return;
                }
            } catch (_) {}
            tbody && (tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:30px;color:#ff6b6b;">❌ Não foi possível carregar os dados</td></tr>');
            return;
        }

        // 3. Mostra tabela com status "verificando"
        const preliminar = repos.map(r => ({
            ...r,
            status: 'verificando',
            data: fmtData(r.pushed)
        }));
        renderizar(preliminar);

        // 4. Verifica cada site em paralelo
        const resultados = await Promise.allSettled(
            repos.map(async (r) => {
                const online = await verificarSite(r.site);
                return {
                    ...r,
                    status: online ? 'ativo' : 'pendente',
                    data: fmtData(r.pushed)
                };
            })
        );

        const final = resultados.map(r => r.status === 'fulfilled' ? r.value : {
            ...repos[resultados.indexOf(r)],
            status: 'pendente',
            data: '—'
        });

        // Reordena após resolver (mantém alfabética)
        final.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));

        // 5. Renderiza final + grava cache
        renderizar(final);
        gravarCache(final);
        console.log('✅ ' + final.length + ' projetos verificados');
    })();

})();
