# 🦖 Jogo 2D — Aventura do Dinossauro

## 📖 Descrição do Projeto

Este projeto consiste no desenvolvimento de um jogo de plataformas 2D, realizado no âmbito da unidade curricular de **Desenvolvimento de Jogos Web e Móveis**, da Universidade da Beira Interior.

O jogo foi desenvolvido utilizando **JavaScript, Three.js e Rapier2D**, permitindo implementar gráficos, animações, movimentação, física e deteção de colisões.

O jogador controla um dinossauro que deve percorrer o cenário, saltar entre plataformas, recolher moedas e evitar perder todas as vidas.

O projeto foi desenvolvido progressivamente, com a introdução de novas funcionalidades em cada ficha prática.

## 🛠️ Tecnologias Utilizadas

- **JavaScript** — lógica e funcionalidades do jogo.
- **Three.js** — criação e renderização do cenário 2D.
- **Rapier2D** — simulação física e deteção de colisões.
- **HTML5 e CSS3** — menus, HUD e interfaces.
- **Vite** — ambiente de desenvolvimento e compilação.
- **lil-gui** — painel Inspector para testar propriedades do jogo.
- **Git e GitHub** — controlo de versões.

## 🎮 Funcionalidades Implementadas

### 1. Movimento e Física
- Movimento horizontal do jogador.
- Sistema de salto e salto duplo.
- Gravidade e colisões com plataformas.
- Câmara que acompanha a personagem.
- Limites do cenário e deteção de quedas.

### 2. Moedas e Pontuação
- Moedas distribuídas pelo mapa.
- Recolha através de colisões do tipo trigger.
- Sistema de pontuação.
- Efeitos sonoros ao recolher moedas.
- Apresentação da pontuação no HUD.

### 3. Sistema de Vidas
- Três vidas disponíveis.
- Perda de vida ao cair do cenário.
- Representação visual das vidas.
- Ecrã de Game Over quando as vidas acabam.
- Apresentação da pontuação final.

### 4. Checkpoints e Respawn
- Checkpoints distribuídos pelo cenário.
- Ativação através de triggers.
- Armazenamento da posição do último checkpoint.
- Respawn no checkpoint ativado.
- Respawn na última plataforma quando não existe checkpoint ativo.

### 5. Sistema de Pausa
- Pausa e continuação através da tecla ESC.
- Interrupção das atualizações do jogo e da física.
- Menu de pausa com as opções Continuar e Sair.
- Música de fundo interrompida durante a pausa.

### 6. Cenário e Nuvens
- Cenário com plataformas, moedas e elementos decorativos.
- Utilização de Prefabs para criar objetos reutilizáveis.
- Dois tipos de nuvens.
- Movimento automático das nuvens.
- Criação das nuvens através do `Level1Manager`.

### 7. Sistema de Animações
Foi desenvolvido um sistema de animações baseado num **Animator e num Animation Controller**.

O dinossauro possui cinco estados de animação:

| Animação | Descrição |
|---|---|
| Idle | Personagem parada |
| Walk | Personagem a andar lentamente |
| Run | Personagem a correr |
| Jump | Personagem a saltar |
| Dead | Personagem a morrer |

As transições entre animações são controladas automaticamente através de parâmetros como a velocidade horizontal, a velocidade vertical e o estado da personagem.

A animação de morte é reproduzida antes do respawn ou da transição para o Game Over.

## 🕹️ Controlos

| Tecla | Ação |
|---|---|
| A / Seta esquerda | Mover para a esquerda |
| D / Seta direita | Mover para a direita |
| Espaço | Saltar / Salto duplo |
| Shift + direção | Andar lentamente |
| ESC | Pausar / Continuar |

## 📁 Organização do Projeto

O projeto encontra-se organizado em módulos:

- `src/Animation/` — animações e controllers.
- `src/Scripts/` — lógica do jogador, física, animações, pontuação e gestão do jogo.
- `src/Prefabs/` — objetos reutilizáveis, como plataformas, moedas e nuvens.
- `src/Scenes/` — construção e configuração dos níveis.
- `src/Materials/` — criação de sprites e materiais.
- `public/assets/` — imagens, sprites e ficheiros de áudio.

Esta organização facilita a manutenção do código e a implementação de novas funcionalidades.

## 🚀 Como Executar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/Simao-PB/jogo2d.git
cd jogo2d
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

Abrir o endereço apresentado no terminal, normalmente:

`http://localhost:5173/`

### 4. Criar a versão de produção

```bash
npm run build
```

### 5. Testar a versão de produção

```bash
npm run preview
```

## 📌 Evolução do Projeto

| Versão | Funcionalidades |
|---|---|
| v1.0 | Estrutura inicial do jogo |
| v2.0 | Movimento e desenvolvimento dos menus |
| v3.0 | Moedas, recolha e sistema de pontuação |
| v4.0 | Saltos, física, câmara e vidas |
| v5.0 | Pausa, checkpoints, música e nuvens |
| v6.0 | Animator, Controller e animações Idle, Walk, Run, Jump e Dead |

## 🎯 Objetivo do Projeto

O objetivo principal deste projeto é aplicar os conceitos de desenvolvimento de videojogos, nomeadamente:

- Programação orientada a objetos.
- Organização modular de código.
- Criação e reutilização de Prefabs.
- Implementação de sistemas de física e colisões.
- Gestão de estados e animações.
- Desenvolvimento de interfaces para videojogos.
- Utilização de controlo de versões com Git e GitHub.

## 🎓 Contexto Académico

**Unidade Curricular:** Desenvolvimento de Jogos Web e Móveis  
**Instituição:** Universidade da Beira Interior  
**Linguagem principal:** JavaScript  
**Motor gráfico:** Three.js  
**Motor de física:** Rapier2D  
**Versão:** v6.0 — Ficha 7

---

**Projeto desenvolvido para fins académicos, com evolução progressiva através das fichas práticas da unidade curricular.**
