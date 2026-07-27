/**
 * bloco-protecao.js
 * Projeto: freepme — Templates Genéricos para Pequenos Negócios
 * Repositório: https://github.com/edusidegum/menu/freepme/
 * Baseado em: menu/scripts/bloco-protecao.js (idêntico — já era genérico)
 * Adaptações: Nenhuma.
 *
 * ⚠️ NÃO AFETA INDEXAÇÃO:
 *    - Googlebot, Bingbot e crawlers de IA ignoram completamente bloqueios de UI.
 *    - O conteúdo HTML (meta tags, JSON-LD, links, textos) permanece 100% legível
 *      para todos os robôs de busca.
 *    - A proteção atua apenas no navegador do usuário humano (botão direito,
 *      teclas de atalho, seleção de texto, arraste).
 *
 * Ativado por: <meta name="protecao-copia" content="true">
 * Uso:         Injetado automaticamente via bloco-incluir.js (item 5).
 * Licença:     MIT
 */

(function(){
  'use strict';

  /* ================================================================
     BLOQUEAR BOTÃO DIREITO DO MOUSE
     ================================================================ */
  document.addEventListener('contextmenu', function(e){
    e.preventDefault();
    return false;
  });

  /* ================================================================
     BLOQUEAR TECLAS DE ATALHO DE DESENVOLVEDOR
     F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U
     ================================================================ */
  document.addEventListener('keydown', function(e){
    // F12
    if (e.keyCode === 123) {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
      e.preventDefault();
      return false;
    }
    // Ctrl+U (ver código-fonte)
    if (e.ctrlKey && e.keyCode === 85) {
      e.preventDefault();
      return false;
    }
    // Ctrl+S (salvar página)
    if (e.ctrlKey && e.keyCode === 83) {
      e.preventDefault();
      return false;
    }
    // Ctrl+P (imprimir)
    if (e.ctrlKey && e.keyCode === 80) {
      e.preventDefault();
      return false;
    }
  });

  /* ================================================================
     BLOQUEAR SELEÇÃO DE TEXTO COM CTRL+A
     ================================================================ */
  document.addEventListener('keydown', function(e){
    if (e.ctrlKey && e.keyCode === 65) {
      // Permite em inputs e textareas
      var tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
      e.preventDefault();
      return false;
    }
  });

  /* ================================================================
     BLOQUEAR ARRASTE DE ELEMENTOS (imagens, links)
     ================================================================ */
  document.addEventListener('dragstart', function(e){
    e.preventDefault();
    return false;
  });

  /* ================================================================
     DESABILITAR SELEÇÃO DE TEXTO VIA CSS (injeta estilo)
     ================================================================ */
  var style = document.createElement('style');
  style.textContent =
    'body { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }' +
    'input, textarea, [contenteditable] { -webkit-user-select: text; -moz-user-select: text; -ms-user-select: text; user-select: text; }';
  document.head.appendChild(style);

  console.log('[freepme] Proteção anti-cópia ativada. Indexação de busca NÃO é afetada.');
})();
