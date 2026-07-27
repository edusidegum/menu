/**
 * bloco-protecao.js  —  v2.3
 * Projeto: freepme — Templates Genéricos para Pequenos Negócios
 * Repositório: https://github.com/edusidegum/menu/freepme/
 *
 * ⚠️ NÃO AFETA INDEXAÇÃO:
 *    - Googlebot, Bingbot e crawlers de IA ignoram completamente bloqueios de UI.
 *    - Atua apenas no navegador do usuário humano (botão direito, teclas, seleção, arraste).
 *    - NÃO interage com o <footer> — apenas event listeners e <style>.
 *
 * Correções v2.3:
 *   - Bloqueios Ctrl+S (salvar) e Ctrl+P (imprimir) removidos.
 *     Não agregam segurança real, prejudicam UX do visitante.
 *
 * Ativado por: <meta name="protecao-copia" content="true">
 * Uso: Injetado automaticamente via bloco-incluir.js (item 5).
 * Licença: MIT
 */
(function(){
  'use strict';

  // Bloquear botão direito
  document.addEventListener('contextmenu', function(e){
    e.preventDefault(); return false;
  });

  // Bloquear teclas de desenvolvedor
  document.addEventListener('keydown', function(e){
    if (e.keyCode === 123) { e.preventDefault(); return false; } // F12
    if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
      e.preventDefault(); return false; // Ctrl+Shift+I/J/C
    }
    if (e.ctrlKey && e.keyCode === 85) { e.preventDefault(); return false; } // Ctrl+U
  });

  // Bloquear Ctrl+A (seleção total) em não-inputs
  document.addEventListener('keydown', function(e){
    if (e.ctrlKey && e.keyCode === 65) {
      var tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
      e.preventDefault(); return false;
    }
  });

  // Bloquear arraste
  document.addEventListener('dragstart', function(e){
    e.preventDefault(); return false;
  });

  // CSS: desabilitar seleção
  var style = document.createElement('style');
  style.textContent =
    'body { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }' +
    'input, textarea, [contenteditable] { -webkit-user-select: text; -moz-user-select: text; -ms-user-select: text; user-select: text; }';
  document.head.appendChild(style);
  console.log('[freepme] Proteção anti-cópia ativada. Indexação NÃO afetada.');
})();
