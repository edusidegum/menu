/* ============================================================
   dinamico.js — Painel de Controle Edu Sidegum
   Busca novas pastas na raiz do repositório via GitHub API
   Cache: 360 minutos (6 horas) em localStorage
   ============================================================ */

(async function () {
    'use strict';

    const STORAGE_KEY = 'painel_pastas_cache';
    const CACHE_MINUTOS = 360;
    const API_URL = 'https://api.github.com/repos/edusidegum/edusidegum.github.io/contents/';
    const EXCLUIDAS = new Set(['menu', '.github', 'assets', 'img', 'css', 'js', 'node_modules']);

    // ── Lista base com status conhecidos ──
    const STATUS_CONHECIDOS = {
        hypedrink:        { status: 'ativo',    data: '2026-06-09' },
        clientepremium:   { status: 'ativo',    data: '2026-06-09' },
        cadastro:         { status: 'ativo',    data: '2026-06-09' },
        novoconsultor:    { status: 'ativo',    data: '2026-06-09' },
        wille:            { status: 'ativo',    data: '2026-06-09' },
        sndlimp:          { status: 'ativo',    data: '2026-06-09' },
        transformacao21:  { status: 'pendente', data: '—' }
    };

    // ── Helpers ──
    function hoje() {
        const d = new Date();
        return d.getFullYear() + '-' +
               String(d.getMonth() + 1).padStart(2, '0') + '-' +
               String(d.getDate()).padStart(2, '0');
    }

    function tag(status) {
        if (status === 'ativo') {
            return '<span class="tag-status tag-on">● ativo</span>';
        }
        return '<span class="tag-status tag-off">● pendente</span>';
    }

    // ── 1. Tenta carregar do cache ──
    function lerCache() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            const cache = JSON.parse(raw);
            const idadeMin = (Date.now() - cache.timestamp) / 60000;
            if (idadeMin < CACHE_MINUTOS) {
                console.log('📦 Cache válido (' + Math.round(idadeMin) + ' min) — usando localStorage');
                return cache.pastas;
            }
            console.log('⏳ Cache expirado (' + Math.round(idadeMin) + ' min) — buscando API...');
            return null;
        } catch (e) {
            return null;
        }
    }

    function gravarCache(pastas) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                timestamp: Date.now(),
                pastas: pastas
            }));
        } catch (e) { /* quota excedida — ignora */ }
    }

    // ── 2. Busca pastas da API do GitHub ──
    async function buscarGitHub() {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('GitHub API: HTTP ' + res.status);

        const itens = await res.json();
        if (!Array.isArray(itens)) throw new Error('Resposta inesperada da API');

        const pastas = itens
            .filter(item => item.type === 'dir' && !EXCLUIDAS.has(item.name.toLowerCase()))
            .map(item => item.name)
            .sort((a, b) => a.localeCompare(b, 'pt-BR'));

        console.log('📁 Pastas encontradas no GitHub:', pastas);
        return pastas;
    }

    // ── 3. Merge: conhecidas + novas ──
    function mergePastas(pastasGitHub) {
        const resultado = [];

        for (const nome of pastasGitHub) {
            if (STATUS_CONHECIDOS[nome]) {
                resultado.push({
                    nome,
                    status: STATUS_CONHECIDOS[nome].status,
                    data: STATUS_CONHECIDOS[nome].data
                });
            } else {
                // Nova pasta descoberta!
                resultado.push({
                    nome,
                    status: 'ativo',
                    data: hoje()
                });
            }
        }

        return resultado;
    }

    // ── 4. Renderiza a tabela ──
    function renderizar(pastas) {
        const tbody = document.querySelector('table tbody');
        if (!tbody) return;

        tbody.innerHTML = pastas.map((p, i) => `
            <tr>
                <td>${i + 1}</td>
                <td>${p.nome}</td>
                <td><a href="https://edusidegum.github.io/${p.nome}/" target="_blank" rel="noopener">${p.nome} ↗</a></td>
                <td><a href="https://github.com/edusidegum/${p.nome}" target="_blank" rel="noopener">repo ↗</a></td>
                <td>${tag(p.status)}</td>
                <td>${p.data}</td>
            </tr>
        `).join('');
    }

    // ── 5. Execução principal ──
    try {
        let pastas = lerCache();

        if (!pastas) {
            const githubPastas = await buscarGitHub();
            pastas = mergePastas(githubPastas);
            gravarCache(pastas);
        }

        renderizar(pastas);
        console.log('✅ Painel atualizado — ' + pastas.length + ' diretórios');

    } catch (err) {
        console.warn('⚠️ Falha ao buscar GitHub API — mantendo tabela estática:', err.message);
        // Tenta cache expirado como fallback
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const cache = JSON.parse(raw);
                renderizar(cache.pastas);
                console.log('🔄 Fallback: cache expirado usado');
            }
        } catch (_) { /* sem fallback — mantém HTML estático */ }
    }

})();
