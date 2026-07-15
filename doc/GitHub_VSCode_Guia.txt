# Guia passo a passo: GitHub Desktop + VS Code (para iniciantes)

Este guia prático te leva do zero até editar localmente, sincronizar com o GitHub, e publicar no GitHub Pages — usando GitHub Desktop e VS Code no Windows.

---

## 0) Pré-requisitos
- GitHub Desktop instalado e logado (Settings > Accounts mostra seu usuário).
- VS Code instalado.
- Git já vem embutido no GitHub Desktop. (Opcional: instalar Git separado.)

Dica: se você editou arquivos direto no GitHub antes, tudo bem — basta “Pull” antes de começar localmente.

---

## 1) Clonar um repositório existente do GitHub
Objetivo: trazer o repo remoto para sua máquina.

1. Abra o GitHub Desktop.
2. File > Clone repository…
3. Aba “URL”: cole a URL do repo (ex.: `https://github.com/edusidegum/menu`).
4. Escolha a pasta local (ex.: `D:\GitHub\menu`).
5. Clique “Clone”.
6. Ao terminar, confirme no painel: “Current repository” deve mostrar o repo certo.

Verificação: Clique em “Open in Visual Studio Code” para abrir a pasta no VS Code.

---

## 2) Sincronizar o que já existe no remoto (Pull)
Sempre puxe as mudanças do remoto antes de editar localmente.

- No GitHub Desktop: Menu Repository > Pull (ou botão “Fetch origin” e depois “Pull origin” se houver mudanças).
- Mensagem “Up to date” = local sincronizado.

---

## 3) Criar uma branch de trabalho (recomendado)
Separar mudanças por tema facilita revisão e evita conflitos.

1. No topo, clique no nome da branch (geralmente `main`).
2. New Branch… (ex.: `feature/ajustes-sitemap`).
3. Create branch.
4. Garanta que “Current branch” agora é a nova branch.

---

## 4) Editar no VS Code
1. Abra no VS Code: GitHub Desktop > Open in Visual Studio Code.
2. Edite os arquivos. Salve (Ctrl+S).
3. O VS Code mostra as mudanças no painel Source Control (Ctrl+Shift+G).

Boas práticas:
- Um conjunto de mudanças por commit, com mensagem curta e clara.
- Arquivos binários grandes (>50 MB) — use Git LFS (ver seção 10).

---

## 5) Commit e Push
1. No GitHub Desktop, escreva a mensagem de commit (ex.: `fix: corrige nome do sitemap e URLs`).
2. Clique “Commit to <sua-branch>”.
3. Clique “Push origin”.

Se for a primeira vez nessa branch, aparecerá “Publish branch” — confirme.

---

## 6) Abrir Pull Request (se seu fluxo usar PR)
1. No GitHub Desktop, botão “Create Pull Request” (ou abra no GitHub > Compare & pull request).
2. Revise o diff, adicione descrição e crie o PR.
3. Faça o merge no GitHub quando aprovado. A branch pode ser deletada após o merge.

Se você trabalha direto na `main`, pode pular o PR e fazer push na `main` (não é o ideal, mas funciona).

---

## 7) Publicação no GitHub Pages
1. No GitHub (web) > Settings > Pages.
2. Configure a branch de publicação (geralmente `main`, pasta `/root` ou `/docs`).
3. Salve. Aguarde 1–2 minutos. 
4. Teste a URL pública (ex.: `https://edusidegum.github.io/menu/`).

Dicas:
- sitemap.xml e robots.txt devem estar na raiz do repositório publicado.
- Sempre faça commit/push e aguarde o Pages atualizar.

---

## 8) Importar uma estrutura externa para dentro do repositório
Cenário: você tem uma pasta fora do repo e quer trazê-la para dentro dele.

1. Garanta que o repo está aberto no VS Code e sincronizado (Pull feito).
2. Crie/seleciona uma branch (ex.: `feature/import-estrutura`).
3. Copie os arquivos/pastas externos para os diretórios corretos do repo (via Explorer ou VS Code Explorer).
4. No GitHub Desktop, confira os “Unstaged changes”.
5. Escreva a mensagem (ex.: `chore: importa estrutura X`).
6. Commit e Push.
7. (Opcional) Abra PR e faça merge.

---

## 9) Quando você editou direto no GitHub e também localmente
- Sempre comece com Repository > Pull.
- Se houver conflitos, o VS Code abre o Merge Editor mostrando “Current” vs “Incoming”.
- Escolha “Accept Current”, “Accept Incoming” ou “Accept Both”, edite se necessário, salve.
- Faça commit de “Merge” no GitHub Desktop e Push.

---

## 10) Arquivos grandes, .gitignore e finais de linha
- Git LFS (arquivos grandes):
  1. Instale Git LFS (https://git-lfs.com/). 
  2. No repo: `git lfs install`.
  3. Rastreie tipos: `git lfs track "*.pdf"` (o Git cria/edita `.gitattributes`).
  4. Adicione e commit normalmente.
- .gitignore: evite commitar arquivos de build temporários. Ex.: `node_modules/`, `*.log`, etc.
- Finais de linha: o VS Code lida bem; se colaborar em diferentes SOs, use `core.autocrlf` conforme necessidade.

---

## 11) Trocar de repositório no GitHub Desktop
- Menu “Current repository” > escolha na lista.
- Para adicionar outro repo: File > Clone repository… (ou “Add local repository” se já existir localmente).

---

## 12) Configurações de identidade (nome/e-mail)
Se necessário, ajuste o autor dos commits:
- GitHub Desktop > File > Options > Git > Name/Email.
- Ou via terminal (global):
  ```bash
  git config --global user.name "Seu Nome"
  git config --global user.email "seu@email"
  ```

---

## 13) Dúvidas comuns e soluções rápidas
- “Push bloqueado / precisa de login”: faça login no GitHub Desktop (File > Options > Accounts). Com 2FA, confirme o navegador.
- “Remote errado”: Repository > Repository settings… > Remote. Ajuste a URL se preciso.
- “Quero começar um repo novo a partir de uma pasta local”: GitHub Desktop > File > New repository… (selecione a pasta) > Create repository > Publish repository.
- “GitHub Pages não atualiza”: verifique Settings > Pages (branch/pasta). Confira se o commit foi para a branch publicada.
- “Quero voltar atrás”: History (GitHub Desktop) > botão direito no commit > Revert (cria um novo commit que desfaz o anterior).

---

## Checklist rápido (sua rotina)
- [ ] Pull antes de começar
- [ ] Nova branch para o que vai fazer
- [ ] Editar no VS Code
- [ ] Commit com mensagem clara
- [ ] Push origin
- [ ] (Opcional) PR + Merge
- [ ] Confirmar publicação no Pages

Pronto — com esse fluxo você edita localmente, mantém tudo sincronizado e publica com segurança. Se quiser, posso gerar um “kit inicial” criando as três pastas locais (menu, HLF, edusidegum), clonando e abrindo cada uma no VS Code, com branches padrão de trabalho.