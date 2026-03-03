# FFXIV TTRPG — Habilidades Completas para Foundry VTT
## Referência: Player Book + Gamemaster Book

> Este documento detalha **todas as habilidades** do sistema, separadas por categoria:
> - 🧬 **Habilidades de Raça** — Traits passivos das raças/tribos
> - ⚔️ **Habilidades de Classe (Job)** — Ativas e passivas de cada job
> - 👹 **Habilidades de Inimigo** — Ataques e mecânicas dos inimigos do GM Book
> - 🌟 **Habilidades de Limit Break** — LBs compartilhados por papel

---

## 📐 LEGENDA DE FORMATAÇÃO

```
[LVL XX]     → Nível de desbloqueio da habilidade
[PRIMARY]    → Ação Primária (usa Primary Action)
[SECONDARY]  → Ação Secundária (usa Secondary Action)
[INSTANT]    → Ação Instantânea / Reação (fora do turno)
[PASSIVE]    → Passiva permanente (não precisa de ação)
[TRAIT]      → Trait da raça (vantagem em checks)

[PHYS]       → Dano Físico (vs Defense)
[MAGIC]      → Dano Mágico (vs Magic Defense)
[HEAL]       → Cura (restaura HP)
[BUFF]       → Buff em aliado(s)
[DEBUFF]     → Debuff em inimigo(s)
[AOE]        → Área de Efeito
[DOT]        → Damage over Time (dano por rodada)
[HOT]        → Heal over Time (cura por rodada)
[SHIELD]     → Escudo que absorve dano

MP X         → Custo em MP para usar a habilidade
RANGE: X     → Alcance em tiles do grid
TARGET: X    → Alvo(s) afetados
```

---

# 🧬 HABILIDADES DE RAÇA

> As raças no FFXIV TTRPG fornecem **bônus de atributo** e **Profile Traits**.
> Profile Traits concedem um dado de **Vantagem** em certas rolagens de Check fora de combate.
> Raças **não** têm habilidades ativas em combate — são puramente passivas/narrativas.

---

## HYUR

### Midlander Hyur
**Lore:** Os Hyur são a raça mais numerosa de Eorzea, adaptáveis e versáteis. Os Midlanders habitam as planícies e cidades, sendo conhecidos por seu equilíbrio entre força e inteligência.

**Bônus de Atributo:** +1 STR, +1 VIT *(balanceado — adequado para qualquer job)*

**[TRAIT] Versatilidade Humana**
- Tipo: Passivo / Profile Trait
- Efeito: Vantagem em 1 Check de atributo **à escolha do jogador durante criação de personagem**
- *No Foundry: Flag de trait selecionável no momento da criação do personagem.*

**[TRAIT] Adaptabilidade**
- Tipo: Passivo / Profile Trait
- Efeito: 1 vez por sessão, pode rerrolar um Check de qualquer atributo (exceto em combate)
- *Implementação: botão "Reroll" na ficha, disponível 1x/sessão, reseta manualmente pelo GM.*

---

### Highlander Hyur
**Lore:** Os Highlanders são maiores e mais robustos que seus primos Midlanders, oriundos de terras montanhosas. Conhecidos por sua força física e resistência.

**Bônus de Atributo:** +2 STR, +1 VIT

**[TRAIT] Punhos de Ferro**
- Tipo: Profile Trait
- Efeito: Vantagem em Checks de STR envolvendo força bruta (levantar, empurrar, quebrar objetos)

**[TRAIT] Constituição Robusta**
- Tipo: Passivo
- Efeito: +2 HP máximo (bônus fixo ao calcular Max HP)

---

## ELEZEN

### Wildwood Elezen
**Lore:** Habitantes das florestas de Eorzea, os Wildwood têm visão aguçadíssima e são os melhores arqueiros do continente. Orgulhosos e reservados.

**Bônus de Atributo:** +1 DEX, +1 INT

**[TRAIT] Visão Aguçada**
- Tipo: Profile Trait
- Efeito: Vantagem em Checks de MND/INT relacionados a percepção visual, leitura de mapas ou identificar ameaças à distância
- *Lore: "Os Wildwood enxergam detalhes que outros simplesmente ignoram."*

**[TRAIT] Sentidos da Floresta**
- Tipo: Passivo
- Efeito: Nunca é surpreendido enquanto estiver em ambientes naturais (florestas, campos abertos)

---

### Duskwight Elezen
**Lore:** Os Duskwight vivem nas cavernas e ruínas de Eorzea, sendo conhecidos por seus sentidos de audição excepcionais e habilidade em combate próximo.

**Bônus de Atributo:** +1 INT, +1 MND

**[TRAIT] Audição Sobrenatural**
- Tipo: Profile Trait
- Efeito: Vantagem em Checks de MND para detectar criaturas ou pessoas que tentem se aproximar furtivamente

**[TRAIT] Filho das Sombras**
- Tipo: Profile Trait
- Efeito: Vantagem em Checks de DEX para se mover silenciosamente ou se esconder em ambientes com pouca luz

---

## LALAFELL

### Plainsfolk Lalafell
**Lore:** Os Lalafell das planícies são mercadores e viajantes incansáveis, conhecidos por sua agilidade mental e habilidade para fazer negócios.

**Bônus de Atributo:** +1 DEX, +1 MND

**[TRAIT] Ágil como o Vento**
- Tipo: Profile Trait
- Efeito: Vantagem em Checks de DEX para escapar de restrições físicas, espremer por espaços apertados ou realizar acrobacias

**[TRAIT] Perspicácia Comercial**
- Tipo: Profile Trait
- Efeito: Vantagem em Checks de MND para perceber enganação, mentiras ou avaliar o valor de itens/objetos

---

### Dunesfolk Lalafell
**Lore:** Os Dunesfolk habitam os desertos, desenvolvendo resistência à magia e conexão com a astrologia primitiva de seus ancestrais.

**Bônus de Atributo:** +1 DEX, +1 INT

**[TRAIT] Resistência Arcana**
- Tipo: Passivo
- Efeito: Reduz o dano de magias em 1 (mínimo 0) — representa a resistência mágica inata dos Dunesfolk

**[TRAIT] Leitura das Estrelas**
- Tipo: Profile Trait
- Efeito: Vantagem em qualquer Check de INT para interpretar fenômenos naturais, previsões ou textos antigos

---

## MIQO'TE

### Seekers of the Sun (Miqo'te Solar)
**Lore:** Caçadores diurnos devotos à deusa solar Azeyma, com pupilas verticais e instintos predatórios afiados. Independentes e territoriais.

**Bônus de Atributo:** +1 STR, +1 DEX

**[TRAIT] Instinto Predatório**
- Tipo: Profile Trait
- Efeito: Vantagem em Checks de DEX para rastrear alvos, preparar emboscadas ou detectar movimentos de inimigos

**[TRAIT] Garras Afiadas**
- Tipo: Passivo
- Efeito: Em situações de desarmamento, Miqo'te Seekers podem usar suas garras naturais como arma improvisada (1d4 Physical, Melee, sem custo de equipamento)

---

### Keepers of the Moon (Miqo'te Lunar)
**Lore:** Caçadores noturnos com olhos adaptados à escuridão e forte ligação com a Lua. Solícitos mas secre tosos, vivem em pequenos grupos matriarcais.

**Bônus de Atributo:** +1 DEX, +1 MND

**[TRAIT] Visão Noturna**
- Tipo: Passivo
- Efeito: Não sofre penalidade em Checks de percepção em ambientes escuros; inimigos não têm vantagem ao atacar em escuridão

**[TRAIT] Laços do Grupo**
- Tipo: Profile Trait
- Efeito: Vantagem em Checks de MND para entender intenções e emoções de aliados, ou para trabalhar em coordenação com a party

---

## ROEGADYN

### Sea Wolves (Roegadyn do Mar)
**Lore:** Descendentes de bárbaros do mar, os Sea Wolves são guerreiros e marinheiros poderosos, conhecidos por sua ferocidade e lealdade tribal.

**Bônus de Atributo:** +2 STR, +1 VIT

**[TRAIT] Corpo de Ferro**
- Tipo: Passivo
- Efeito: +3 HP máximo (representando a robustez física superior dos Roegadyn)

**[TRAIT] Rugido de Guerra**
- Tipo: Profile Trait
- Efeito: Vantagem em Checks de STR para intimidar inimigos fora de combate; aliados recebem +1 dado de Vantagem em seu próximo Check após ouvir o rugido (1x por cena)

---

### Hellsguard (Roegadyn das Chamas)
**Lore:** Os Hellsguard são mercenários e guardas de portais vulcânicos, com resistência ao calor e afinidade com a magia de fogo.

**Bônus de Atributo:** +1 STR, +1 MND

**[TRAIT] Resistência ao Fogo**
- Tipo: Passivo
- Efeito: Reduz dano do tipo Fire em 2 (mínimo 0)

**[TRAIT] Vontade de Aço**
- Tipo: Profile Trait
- Efeito: Vantagem em Checks de STR ou MND para resistir a efeitos de medo, coerção ou intimidação

---

## VIERA

### Rava Viera
**Lore:** As Viera de pele escura das selvas de Golmore, guerreiras ágeis que protegem suas florestas com arcos e espadas. Seguem a Lei da Selva.

**Bônus de Atributo:** +2 DEX, +1 MND

**[TRAIT] Passo Silencioso**
- Tipo: Profile Trait
- Efeito: Vantagem em Checks de DEX para mover-se sem ser detectada em ambientes naturais; pode mover-se em velocidade normal sem penalidade em stealth

**[TRAIT] Ouvidos das Selvas**
- Tipo: Passivo
- Efeito: Vantagem em Checks de MND de percepção auditiva; detecta sons a distâncias dobradas em relação a outras raças

---

### Veena Viera
**Lore:** As Viera de pele clara das florestas montanhosas do norte, mais introspectivas e mágicas que suas primas Rava.

**Bônus de Atributo:** +1 DEX, +1 INT

**[TRAIT] Toque da Natureza**
- Tipo: Profile Trait
- Efeito: Vantagem em Checks de INT para identificar plantas, animais, terrenos e fenômenos naturais

**[TRAIT] Ligação Arcana**
- Tipo: Profile Trait
- Efeito: Vantagem em Checks de INT para identificar magias, efeitos mágicos ou pergaminhos arcanos

---

## HROTHGAR

### Helions (Hrothgar do Sol)
**Lore:** Os Helions são servis das rainhas-sol de Ilsabard, leais e protetores por natureza. Constituição física avassaladora.

**Bônus de Atributo:** +2 STR, +1 VIT

**[TRAIT] Carga do Leão**
- Tipo: Profile Trait
- Efeito: Vantagem em Checks de STR para derrubar, empurrar ou avançar contra oponentes físicos; pode mover inimigos de tamanho Médio 1 tile ao acertar (fora de combate)

**[TRAIT] Brado Territorial**
- Tipo: Profile Trait
- Efeito: Vantagem em Checks de MND (intimidação/presença) quando confrontando inimigos no território do grupo

---

### The Lost (Hrothgar Exilados)
**Lore:** Os exilados de Ilsabard, sem rainha, são mercenários e viajantes endurecidos pela solidão e pela luta pela sobrevivência.

**Bônus de Atributo:** +1 STR, +1 DEX, +1 VIT *(3 tribos únicas — bônus distribuído)*

**[TRAIT] Sobrevivente nato**
- Tipo: Profile Trait
- Efeito: Vantagem em Checks de qualquer atributo relacionados a sobrevivência em ambientes hostis (fome, clima extremo, terreno perigoso)

**[TRAIT] Garras de Predador**
- Tipo: Passivo
- Efeito: Igual ao Seekers of the Sun — pode usar garras naturais como arma improvisada (1d4 Physical, Melee)

---

# ⚔️ HABILIDADES DE CLASSE (JOBS)

> **Tipos de Ação:**
> - `[PRIMARY]` = Consome a Primary Action do turno
> - `[SECONDARY]` = Consome a Secondary Action (ou Movement via Focus)
> - `[INSTANT]` = Reação, usável fora do próprio turno
> - `[PASSIVE]` = Sempre ativo, sem custo de ação

> **Progressão:** Habilidades desbloqueiam nos níveis 1, 5, 10, 15, 20, 25, 30 (depois de 5 em 5 até 60)

---

## 🛡️ PALADIN

**Papel:** Tank defensivo com capacidade de suporte/cura de emergência
**Stat Principal:** STR (ataque físico) + MND (Holy Spirit)
**Arma:** Espada e Escudo (exige ambos para certas habilidades)
**Recurso Especial:** Nenhum gauge — foco em modos (Sword Oath / Shield Oath)

---

### 🗡️ Habilidades de Ataque

**Fast Blade** `[LVL 1] [PRIMARY] [PHYS]`
- MP: 0 | RANGE: Melee | TARGET: Single
- *O ataque básico do Paladin com a espada.*
- Efeito: Dano físico (1d6 + STR). **Combo Opener** — habilita Riot Blade.
- Foundry: `damage: "1d6", combo.enables: "riot_blade"`

**Riot Blade** `[LVL 4] [PRIMARY] [PHYS]`
- MP: 0 | RANGE: Melee | TARGET: Single
- *Golpe combinado que flui do Fast Blade.*
- Efeito: Dano físico (2d6 + STR). **Requer Combo de Fast Blade**; restaura 1 MP se em combo.
- Foundry: `damage: "2d6", combo.from: "fast_blade", combo.restoreMP: 1`

**Royal Authority** `[LVL 10] [PRIMARY] [PHYS]`
- MP: 0 | RANGE: Melee | TARGET: Single
- *O golpe mais poderoso da sequência básica do Paladin.*
- Efeito: Dano físico (3d6 + STR). **Requer Combo de Riot Blade**; aplica **Sword Oath** por 2 turnos (+1d6 de dano em todas as habilidades físicas).
- Foundry: `damage: "3d6", combo.from: "riot_blade", effect.onCombo: "sword_oath_2t"`

**Atonement** `[LVL 20] [PRIMARY] [PHYS]`
- MP: 0 | RANGE: Melee | TARGET: Single
- *Golpe puro de expiação — disponível após Royal Authority.*
- Efeito: Dano físico alto (3d6+2 + STR). Só disponível quando **Sword Oath** estiver ativo.
- Foundry: `damage: "3d6+2", requires: "sword_oath_active"`

**Holy Spirit** `[LVL 5] [PRIMARY] [MAGIC]`
- MP: 1 | RANGE: Long (5 tiles) | TARGET: Single
- *Projétil de energia sagrada. Pode ser usado à distância.*
- Efeito: Dano mágico tipo Holy (2d6 + MND). Sempre disponível independente do Oath.
- Foundry: `damage: "2d6", type: "holy", mpCost: 1`

**Circle of Scorn** `[LVL 15] [PRIMARY] [PHYS+DOT] [AOE]`
- MP: 0 | RANGE: Self (área ao redor) | TARGET: Enemies within 2 tiles
- *O Paladin crava a espada no chão, irradiando energia que queima os inimigos.*
- Efeito: Dano físico (1d6 + STR) em AOE circular raio 2. Aplica **Burns** (DoT: 1d4 dano no Round-Up por 2 turnos).
- Foundry: `aoeShape: "circle", aoeSize: 2, effect: "burns_dot_2t"`

**Confiteor** `[LVL 30] [PRIMARY] [MAGIC] [AOE]`
- MP: 2 | RANGE: Self (cone frontal) | TARGET: Enemies in cone
- *Rajada de energia sagrada que diminui com a distância.*
- Efeito: Dano mágico Holy em cone de 3 tiles. Dano: 3d6 (perto) / 2d6 (longe).
- Foundry: `aoeShape: "cone", aoeSize: 3, damage: "3d6"` 

---

### 🛡️ Habilidades de Defesa e Suporte

**Shield Bash** `[LVL 2] [PRIMARY] [PHYS]`
- MP: 0 | RANGE: Melee | TARGET: Single
- *Empurra o escudo com força. Interrompe ações inimigos.*
- Efeito: Dano físico baixo (1d4 + STR) + aplica **Interrupt** (cancela 1 habilidade que o inimigo esteja preparando).
- Foundry: `damage: "1d4", effect: "interrupt"`

**Shield Oath** `[LVL 1] [SECONDARY]`
- MP: 0 | RANGE: Self | TARGET: Self
- *Modo defensivo. Reduz dano recebido mas limita o poder ofensivo.*
- Efeito: Paladin entra em Shield Oath. Ganha +2 Defense permanente enquanto ativo. Habilidades físicas causam -1d6 de dano. Desativa Sword Oath.
- Foundry: `toggleMode: "shield_oath", defense: +2, damagePenalty: -1d6`

**Bulwark** `[LVL 8] [SECONDARY]`
- MP: 0 | RANGE: Self | TARGET: Self
- *Levanta o escudo para bloquear o próximo impacto.*
- Efeito: Até o próximo ataque que acertar o Paladin, reduz o dano em metade. Dura até ser ativado ou fim do turno do inimigo.
- Foundry: `effect: "block_next_hit_50percent", duration: "until_hit"`

**Cover** `[LVL 15] [INSTANT]`
- MP: 0 | RANGE: Adjacent (1 tile) | TARGET: 1 Ally
- *O Paladin se põe entre o aliado e o atacante.*
- Condição: **Gatilho** — quando um aliado adjacente for alvo de um ataque.
- Efeito: O Paladin redireciona o ataque para si mesmo. O aliado não recebe dano; o Paladin recebe em seu lugar (sem resistência).
- Foundry: `trigger: "ally_targeted_adjacent", effect: "redirect_damage_to_self"`

**Clemency** `[LVL 25] [PRIMARY] [HEAL]`
- MP: 2 | RANGE: Short (3 tiles) | TARGET: 1 Ally (ou self)  
- *Canaliza energia curativa para um aliado em apuros.*
- Efeito: Restaura HP (3d6 + MND). Único healer de emergência do Paladin — usar demais significa não atacar.
- Foundry: `heal: "3d6", mpCost: 2`

**Divine Veil** `[LVL 30] [SECONDARY]`
- MP: 1 | RANGE: Self | TARGET: Self (efeito se espalha)
- *Cria um campo de proteção divina ao redor do Paladin.*
- Efeito: Aplica **Veil** no Paladin. Quando o Paladin receber cura nos próximos 2 turnos, todos os aliados em 3 tiles ganham um **Shield** de 1d6 (absorve dano).
- Foundry: `effect: "divine_veil_2t"`, `trigger: "on_heal_received"`

**Hallowed Ground** `[LVL 30+] [SECONDARY]`
- MP: 3 | RANGE: Self | TARGET: Self
- *A proteção máxima do Paladin — invulnerabilidade temporária.*
- Efeito: Por 1 turno completo (até o próximo turno do Paladin), o Paladin é **Invulnerável** (imune a todo dano).
- Foundry: `effect: "invulnerable_1t", mpCost: 3`

---

### 🔺 Habilidades de Enmity

**Enmity Combo (implícito)**
- Fast Blade → Riot Blade gera Enmity moderado
- Royal Authority → gera Enmity alto

**Provoke** `[LVL 5] [SECONDARY]`
- MP: 0 | RANGE: Medium (5 tiles) | TARGET: 1 Enemy
- *Desafia abertamente o inimigo para atraí-lo.*
- Efeito: Imediatamente maximiza o Enmity do Paladin em relação ao alvo (passa a ser o alvo prioritário do inimigo).
- Foundry: `effect: "maximize_enmity_on_target"`

**Shirk** `[LVL 20] [SECONDARY]`
- MP: 0 | RANGE: Medium | TARGET: 1 Ally
- *Transfere ameaça para outro membro do grupo.*
- Efeito: Transfere 25% do Enmity atual do Paladin em relação a todos os inimigos para o aliado alvo.
- Foundry: `effect: "transfer_enmity_25percent_to_ally"`

---

## 🪓 WARRIOR

**Papel:** Tank ofensivo com alto self-sustain e dano brutal
**Stat Principal:** STR
**Arma:** Greataxe (machado de guerra enorme)
**Recurso Especial:** ⚡ **Beast Gauge** (0–100) — acumula ao atacar, gasta em habilidades poderosas

---

### 🗡️ Habilidades de Ataque

**Heavy Swing** `[LVL 1] [PRIMARY] [PHYS]`
- MP: 0 | RANGE: Melee | TARGET: Single
- Efeito: Dano físico (1d6 + STR). **Combo Opener** — habilita Maim. Ganha +5 Beast Gauge.
- Foundry: `damage: "1d6", combo.enables: "maim", effect: "+5_beast_gauge"`

**Maim** `[LVL 4] [PRIMARY] [PHYS]`
- MP: 0 | RANGE: Melee | TARGET: Single  
- Efeito: Dano físico (2d6 + STR). **Requer Combo de Heavy Swing**; aplica **Maim** no alvo por 2 turnos (–1 Defense). Ganha +10 Beast Gauge em combo.
- Foundry: `damage: "2d6", combo.from: "heavy_swing", effect.onCombo: "debuff_defense_-1_2t", beastGauge: +10`

**Storm's Eye** `[LVL 10] [PRIMARY] [PHYS]`
- MP: 0 | RANGE: Melee | TARGET: Single
- Efeito: Dano físico (2d6+2 + STR). **Requer Combo de Maim**; aplica **Storm's Eye** no Warrior por 3 turnos (+1d6 de dano em all physical abilities). Ganha +20 Beast Gauge em combo.
- Foundry: `combo.from: "maim", effect.onCombo: "storms_eye_buff_3t", beastGauge: +20`

**Storm's Path** `[LVL 10] [PRIMARY] [PHYS]`
- MP: 0 | RANGE: Melee | TARGET: Single
- *Alternativa ao Storm's Eye — drena a vida do inimigo.*
- Efeito: Dano físico (2d6 + STR). **Requer Combo de Maim**; recupera HP igual a metade do dano causado. Ganha +20 Beast Gauge.
- Foundry: `combo.from: "maim", effect: "lifesteal_50percent", beastGauge: +20`

**Fell Cleave** `[LVL 20] [PRIMARY] [PHYS]`
- MP: 0 | Beast Gauge: 50 | RANGE: Melee | TARGET: Single
- *Uma machadada devastadora que consome a Fúria da Besta.*
- Efeito: Dano físico massivo (4d6 + STR). Gasta 50 de Beast Gauge.
- Foundry: `damage: "4d6", cost: {beastGauge: 50}`

**Decimate** `[LVL 25] [PRIMARY] [PHYS] [AOE]`
- MP: 0 | Beast Gauge: 50 | RANGE: Self (area) | TARGET: Enemies within 2 tiles
- *Versão AOE do Fell Cleave — para quando cercado de inimigos.*
- Efeito: Dano físico (3d6 + STR) em todos os inimigos em 2 tiles. Gasta 50 Beast Gauge.
- Foundry: `aoeShape: "circle", aoeSize: 2, damage: "3d6", cost: {beastGauge: 50}`

**Upheaval** `[LVL 15] [SECONDARY] [PHYS]`
- MP: 0 | Beast Gauge: 20 | RANGE: Melee | TARGET: Single
- *Levanta e arremessa o machado com violência extrema.*
- Efeito: Dano físico (2d6 + STR). Gasta 20 de Beast Gauge.
- Foundry: `damage: "2d6", cost: {beastGauge: 20}`

**Tomahawk** `[LVL 5] [PRIMARY] [PHYS]`
- MP: 0 | RANGE: Long (6 tiles) | TARGET: Single
- *Arremessa o machado para iniciar o combate à distância e puxar a atenção do inimigo.*
- Efeito: Dano físico (1d6 + STR). Geração de **Enmity alta** — puxa o alvo para focar no Warrior.
- Foundry: `damage: "1d6", effect: "high_enmity_generation"`

---

### 🐉 Habilidades de Cooldown e Survivability

**Thrill of Battle** `[LVL 8] [SECONDARY]`
- MP: 0 | RANGE: Self | TARGET: Self
- Efeito: Aumenta Max HP em +20% e restaura o HP pelo mesmo valor por 1 turno. Após o turno, Max HP volta ao normal (mas HP ganho permanece).
- Foundry: `effect: "temp_maxhp_+20percent_1t_then_heal"`

**Vengeance** `[LVL 12] [SECONDARY]`
- MP: 1 | RANGE: Self | TARGET: Self
- Efeito: Por 2 turnos, sempre que o Warrior receber dano físico, o atacante recebe 1d4 de dano refletido imediatamente.
- Foundry: `effect: "reflect_physical_1d4_2t"`

**Raw Intuition** `[LVL 15] [INSTANT]`
- MP: 0 | RANGE: Self | TARGET: Self
- Condição: Após o Warrior receber dano físico direto.
- Efeito: Reduz o próximo ataque físico recebido pelo Warrior à metade (mitigation instantânea).
- Foundry: `trigger: "on_physical_hit_received", effect: "reduce_next_physical_50percent"`

**Nascent Flash** `[LVL 18] [INSTANT]`  
- MP: 1 | RANGE: Adjacent | TARGET: 1 Ally (ou self)
- Condição: Pode ser usado em qualquer fase.
- Efeito: O Warrior e o aliado alvo recuperam HP igual à metade do próximo ataque que o Warrior causar neste turno. (Se Warrior causar 10 dano, ambos curam 5.)
- Foundry: `trigger: "on_next_warrior_attack", heal: "50percent_of_damage_dealt"`

**Inner Chaos** `[LVL 30+] [PRIMARY] [PHYS]`
- MP: 0 | Beast Gauge: 100 | RANGE: Melee | TARGET: Single
- *O auge da fúria do Warrior — um golpe de dano catastrófico.*
- Efeito: Dano físico imenso (6d6 + STR). Automaticamente um **Critical Hit** se o Beast Gauge estava em 100 ao usar.
- Foundry: `damage: "6d6", cost: {beastGauge: 100}, autoCrit: "if_gauge_was_full"`

**Inner Release** `[LVL 20] [SECONDARY]`
- MP: 0 | RANGE: Self | TARGET: Self
- *O Warrior libera a Besta Interior — modo de poder absoluto por curta duração.*
- Efeito: Por 2 turnos: habilidades não gastam Beast Gauge; Fell Cleave/Decimate causam Critical Hit automaticamente; o Warrior é imune a Knockback.
- Foundry: `effect: "inner_release_2t"` (flag especial que bypassa custo e força crits)

---

### 🔺 Habilidades de Enmity e AOE

**Overpower** `[LVL 5] [PRIMARY] [PHYS] [AOE]`
- MP: 0 | RANGE: Self (cone) | TARGET: Enemies in front (cone 2 tiles)
- Efeito: Dano físico (1d6 + STR) em cone. Gera Enmity em todos os alvos atingidos. Ganha +3 Beast Gauge por inimigo atingido.
- Foundry: `aoeShape: "cone", aoeSize: 2, effect: "enmity_all_targets", beastGauge: "+3_per_target"`

**Shake It Off** `[LVL 25] [SECONDARY] [AOE]`
- MP: 1 | RANGE: Self (aura) | TARGET: All allies within 3 tiles
- *O Warrior chama os aliados para a proteção de sua presença intimidadora.*
- Efeito: Todos os aliados em 3 tiles recebem **Shield** de 1d6 (absorve dano) por 1 turno.
- Foundry: `aoeShape: "circle", aoeSize: 3, target: "allies", effect: "shield_1d6_1t"`

**Provoke** `[LVL 5] [SECONDARY]` — Igual ao Paladin
**Shirk** `[LVL 20] [SECONDARY]` — Igual ao Paladin

---

## 🌑 DARK KNIGHT

**Papel:** Tank mágico-físico com alto dano e gerenciamento de MP
**Stat Principal:** STR (físico), INT parcial (grit mágico)
**Arma:** Greatsword (espadão de lâmina negra)
**Recurso Especial:** 🌑 **Darkside** — modo que consome MP passivamente para aumentar dano; **Blood Gauge** (0–100)

---

### 🗡️ Habilidades de Ataque

**Hard Slash** `[LVL 1] [PRIMARY] [PHYS]`
- MP: 0 | RANGE: Melee | TARGET: Single
- Efeito: Dano físico (1d6 + STR). Combo Opener → habilita Syphon Strike.
- Foundry: `damage: "1d6", combo.enables: "syphon_strike"`

**Syphon Strike** `[LVL 4] [PRIMARY] [PHYS]`
- MP: 0 | RANGE: Melee | TARGET: Single
- Efeito: Dano físico (2d6 + STR). Requer Combo de Hard Slash; restaura 1 MP em combo. Habilita Souleater.
- Foundry: `damage: "2d6", combo.from: "hard_slash", combo.restoreMP: 1`

**Souleater** `[LVL 10] [PRIMARY] [PHYS]`
- MP: 0 | RANGE: Melee | TARGET: Single
- Efeito: Dano (2d6+2 + STR). Requer Combo de Syphon Strike; recupera HP igual ao dano causado (**lifesteal**). Ganha +20 Blood Gauge em combo.
- Foundry: `damage: "2d6+2", combo.from: "syphon_strike", effect: "lifesteal_full", bloodGauge: +20`

**Bloodspiller** `[LVL 20] [PRIMARY] [PHYS]`
- MP: 0 | Blood: 50 | RANGE: Melee | TARGET: Single
- *A versão single-target do gasto de Blood Gauge.*
- Efeito: Dano físico alto (4d6 + STR). Gasta 50 Blood Gauge.
- Foundry: `damage: "4d6", cost: {bloodGauge: 50}`

**Quietus** `[LVL 25] [PRIMARY] [PHYS] [AOE]`
- MP: 0 | Blood: 50 | RANGE: Self (area) | TARGET: All enemies within 2 tiles
- Efeito: Dano (2d6 + STR) para todos os inimigos a 2 tiles. Recupera HP baseado no número de inimigos atingidos.
- Foundry: `aoeShape: "circle", aoeSize: 2, damage: "2d6", effect: "heal_per_target_hit"`

**Plunge** `[LVL 10] [SECONDARY] [PHYS]`
- MP: 0 | RANGE: Medium (até 4 tiles) | TARGET: Single
- *O Dark Knight se lança em alta velocidade contra o alvo.*
- Efeito: Move até 4 tiles em linha reta e causa dano físico (2d6 + STR) ao alvo. Ignora terreno de movimento (mas não paredes). 2 cargas.
- Foundry: `effect: "dash_4tiles", damage: "2d6", charges: 2`

**Edge of Shadow** `[LVL 25] [PRIMARY] [MAGIC]`
- MP: 2 | RANGE: Medium | TARGET: Single
- *Projeta uma lâmina de sombra pura contra o inimigo.*
- Efeito: Dano mágico Darkness (3d6 + STR). Só disponível quando **Darkside** estiver ativo. Ganha +10 Blood Gauge.
- Foundry: `damage: "3d6", type: "dark", mpCost: 2, requires: "darkside_active", bloodGauge: +10`

---

### 🌑 Habilidades de Defesa e Dark Arts

**Darkside** `[LVL 1] [SECONDARY] [PASSIVE]`
- MP: -1 por turno | RANGE: Self | TARGET: Self
- *Ativar o modo Darkside consome MP mas amplifica todo dano causado.*
- Efeito: Enquanto ativo, drena 1 MP por turno e amplia o dano de todas as habilidades (+1d6). Desativa automaticamente se MP = 0.
- Foundry: `toggleMode: "darkside", mpDrainPerTurn: 1, damageBonus: "+1d6"`

**The Blackest Night** `[LVL 15] [INSTANT]`
- MP: 1 | RANGE: Short (3 tiles) | TARGET: Self ou 1 Ally
- *Um escudo de trevas que, ao ser destruído, libera MP de volta.*
- Efeito: Aplica **Dark Shield** no alvo com absorção de 2d6 de dano. Se o shield for completamente destruído, restaura 2 MP para o Dark Knight.
- Foundry: `effect: "shield_2d6"`, `trigger: "if_shield_broken: restore_2mp"`

**Dark Mind** `[LVL 8] [INSTANT]`
- MP: 0 | RANGE: Self | TARGET: Self
- Condição: Após receber dano mágico.
- Efeito: Reduz o próximo dano mágico recebido em 50%.
- Foundry: `trigger: "on_magic_hit_received", effect: "reduce_next_magic_50percent"`

**Reprisal** `[LVL 20] [INSTANT]`
- MP: 0 | RANGE: Short | TARGET: 1 Enemy
- Efeito: Aplica **Reprisal** no inimigo por 1 turno — reduz TODO dano do inimigo em 10%.
- Foundry: `effect: "debuff_enemy_damage_-10percent_1t"`

**Living Shadow** `[LVL 30] [SECONDARY]`
- MP: 3 | Blood: 50 | RANGE: Melee (posiciona na área) | TARGET: —
- *Invoca uma cópia sombria do Dark Knight que ataca independentemente.*
- Efeito: Surge uma entidade "Living Shadow" no campo por 3 turnos. Cada turno, ela automaticamente ataca o alvo com maior Enmity por 2d6 dano Darkness.
- Foundry: `spawnToken: "living_shadow", behaviour: "auto_attack_high_enmity_target", duration: 3t, damage: "2d6"`

**Salted Earth** `[LVL 15] [PRIMARY] [MAGIC] [AOE]`
- MP: 2 | RANGE: Short (coloca em tile escolhido) | TARGET: Zone 2x2 tiles
- *Cria uma zona de terra salgada que corrói tudo que toca.*
- Efeito: Coloca uma zona de Darkness de 2×2 tiles. No Round-Up Phase por 3 turnos: todos inimigos na zona tomam 1d6 Darkness. (DoT de zona)
- Foundry: `aoeShape: "circle", aoeSize: 2, effect: "dot_zone_1d6_3t_roundup"`

**Provoke** e **Shirk** — iguais aos outros Tanks.

---

---

## 💚 WHITE MAGE

**Papel:** Healer puro — maior poder de cura bruta do jogo
**Stat Principal:** MND (todas as curas e danos escalam com MND)
**Arma:** Cane / Planta Staff
**Recurso Especial:** 🌸 **Lily Gauge** (0–3 Lilies) — acumula ao curar; gasto em habilidades gratuitas de cura

---

### 🏥 Habilidades de Cura

**Cure** `[LVL 1] [PRIMARY] [HEAL]`
- MP: 1 | RANGE: Short (3 tiles) | TARGET: 1 Ally
- Efeito: Restaura HP (2d6 + MND). Ao curar, ganha **+1 Lily** (máx 3).
- Foundry: `heal: "2d6", effect: "+1_lily_gauge"`

**Cure II** `[LVL 5] [PRIMARY] [HEAL]`
- MP: 2 | RANGE: Short | TARGET: 1 Ally
- *Cura mais potente, melhor custo-benefício para situações graves.*
- Efeito: Restaura HP (3d6+3 + MND). Ganha +1 Lily.
- Foundry: `heal: "3d6+3", mpCost: 2, effect: "+1_lily_gauge"`

**Cure III** `[LVL 20] [PRIMARY] [HEAL] [AOE]`
- MP: 3 | RANGE: Short (centro no alvo) | TARGET: Alvo + Aliados em 2 tiles ao redor
- *Explosão de energia curativa que beneficia o grupo todo.*
- Efeito: Restaura HP (2d6 + MND) para o alvo principal e todos os aliados a 2 tiles do alvo.
- Foundry: `heal: "2d6", aoeShape: "circle", aoeSize: 2, mpCost: 3, target: "ally_and_adjacent"`

**Medica** `[LVL 8] [PRIMARY] [HEAL] [AOE]`
- MP: 2 | RANGE: Self (aura) | TARGET: All allies within 3 tiles
- *Onda de energia curativa centrada no White Mage.*
- Efeito: Restaura HP (1d6+2 + MND) em todos os aliados em 3 tiles. Não gera Lily.
- Foundry: `heal: "1d6+2", aoeShape: "circle", aoeSize: 3, target: "all_allies_in_range"`

**Medica II** `[LVL 15] [PRIMARY] [HEAL] [AOE] [HOT]`
- MP: 3 | RANGE: Self (aura) | TARGET: All allies within 3 tiles
- *Versão mais avançada — healiza e aplica regen.*
- Efeito: Restaura HP imediato (1d6 + MND) + aplica **Regen** (HOT: recupera 1d4 HP no Round-Up por 3 turnos) em todos os aliados em 3 tiles.
- Foundry: `heal: "1d6", aoeShape: "circle", aoeSize: 3, effect: "regen_hot_1d4_3t"`

**Regen** `[LVL 5] [SECONDARY] [HOT]`
- MP: 1 | RANGE: Short | TARGET: 1 Ally
- Efeito: Aplica **Regen** em 1 aliado (HOT: recupera 1d6 HP no Round-Up por 3 turnos).
- Foundry: `effect: "regen_hot_1d6_3t", mpCost: 1`

**Raise** `[LVL 10] [PRIMARY] [SPECIAL]`
- MP: 3 | RANGE: Short | TARGET: 1 Ally (caído/K.O.)
- *Ressuscita um aliado derrotado ainda durante o combate.*
- Efeito: Reativa um aliado K.O. com **25% do HP máximo**. O aliado não pode agir neste turno, mas age normalmente no próximo.
- Foundry: `effect: "revive_25percent_hp", mpCost: 3`

---

### 🌸 Habilidades de Lily Gauge

**Afflatus Solace** `[LVL 15] [PRIMARY] [HEAL]`
- MP: 0 | Lily: 1 | RANGE: Short | TARGET: 1 Ally
- *Cura poderosa sem custo de MP — usa a Lily acumulada.*
- Efeito: Restaura HP (4d6 + MND). Gasta 1 Lily. Gera 1 **Blood Lily** (ao acumular 3 = desbloqueia Afflatus Misery).
- Foundry: `heal: "4d6", cost: {lily: 1}, effect: "+1_blood_lily"`

**Afflatus Rapture** `[LVL 20] [PRIMARY] [HEAL] [AOE]`
- MP: 0 | Lily: 1 | RANGE: Self (aura) | TARGET: All allies within 3 tiles
- *AOE de cura sem custo de MP.*
- Efeito: Restaura HP (2d6 + MND) para todos os aliados em 3 tiles. Gasta 1 Lily. Gera 1 Blood Lily.
- Foundry: `heal: "2d6", aoeSize: 3, cost: {lily: 1}, effect: "+1_blood_lily"`

**Afflatus Misery** `[LVL 25] [PRIMARY] [MAGIC] [AOE]`
- MP: 0 | Blood Lily: 3 | RANGE: Long | TARGET: Single (com splash)
- *O contragolpe do White Mage — toda a dor curada, devolvida como dano.*
- Efeito: Dano mágico imenso (6d6 + MND) no alvo primário + 2d6 nos inimigos adjacentes. Gasta todas as 3 Blood Lilies.
- Foundry: `damage: "6d6", splash: "2d6_adjacent", cost: {bloodLily: 3}`

---

### 🌟 Habilidades de Suporte e Dano

**Stone** `[LVL 1] [PRIMARY] [MAGIC]`
- MP: 1 | RANGE: Long (6 tiles) | TARGET: Single
- *Projétil de pedra — dano de fora de combate corpo a corpo.*
- Efeito: Dano mágico Earth (2d6 + MND).
- Foundry: `damage: "2d6", type: "earth", mpCost: 1`

**Glare** `[LVL 20] [PRIMARY] [MAGIC]`
- MP: 1 | RANGE: Long | TARGET: Single
- *Versão avançada do Stone — dano Unaspected (ignora resistências elementais).*
- Efeito: Dano mágico Unaspected (3d6 + MND). Substitui Stone.
- Foundry: `damage: "3d6", type: "unaspected", mpCost: 1`

**Assize** `[LVL 15] [PRIMARY] [MAGIC+HEAL] [AOE]`
- MP: 0 | RANGE: Self (aura 3 tiles) | TARGET: Enemies (dano) + Allies (cura)
- *Habilidade dupla — afeta inimigos e aliados ao mesmo tempo.*
- Efeito: Dano mágico Holy (2d6 + MND) em todos os inimigos em 3 tiles + cura (2d6 + MND) em todos os aliados em 3 tiles. Restaura 2 MP.
- Foundry: `damage_aoe: "2d6_enemies", heal_aoe: "2d6_allies", restoreMP: 2`

**Asylum** `[LVL 12] [SECONDARY] [HEAL] [AOE]`
- MP: 2 | RANGE: Medium (posiciona em tile) | TARGET: Zone 2×2 tiles
- *Cria um santuário curador no mapa.*
- Efeito: Coloca zona sagrada de 2×2 tiles. No Round-Up Phase por 3 turnos: aliados na zona recebem cura (1d4 + MND).
- Foundry: `placeHealZone: true, aoeSize: 2, hot: "1d4_per_roundup_3t"`

**Plenary Indulgence** `[LVL 25] [SECONDARY]`
- MP: 1 | RANGE: Self (aura) | TARGET: All allies within 3 tiles
- *Amplifica a próxima onda de cura da Lily.*
- Efeito: Aplica **Confession** por 2 turnos. Enquanto ativo, a próxima habilidade de Lily (Solace/Rapture) cura todos os aliados em 3 tiles adicionalmente.
- Foundry: `effect: "confession_2t"` (modifica próxima Lily para ser também AOE)

**Presence of Mind** `[LVL 20] [SECONDARY]`
- MP: 1 | RANGE: Self | TARGET: Self
- *Acelera o raciocínio do White Mage — mais habilidades por turno.*
- Efeito: Por 2 turnos, o White Mage pode usar uma Primary Action adicional de cura/dano por turno (não substitui a Primary Action principal).
- Foundry: `effect: "extra_action_heal_or_damage_2t", mpCost: 1`

---

## 📗 SCHOLAR

**Papel:** Healer tático — escudos, barreiras e suporte com a Faerie
**Stat Principal:** MND
**Arma:** Codex (livro mágico)
**Recurso Especial:** ✨ **Aetherflow** (0–3 cargas) + 🧚 **Faerie** (pet autônomo)

---

### 🛡️ Habilidades de Escudo (Barrier Healing)

**Adloquium** `[LVL 1] [PRIMARY] [HEAL+SHIELD]`
- MP: 2 | RANGE: Short | TARGET: 1 Ally
- *Cura e coloca um escudo protetor no aliado.*
- Efeito: Cura (2d6 + MND) + aplica **Galvanize Shield** (absorve próximos 2d6 de dano).
- Foundry: `heal: "2d6", shield: "2d6", mpCost: 2`

**Succor** `[LVL 5] [PRIMARY] [HEAL+SHIELD] [AOE]`
- MP: 2 | RANGE: Self (aura 3 tiles) | TARGET: All allies
- *Versão AOE do Adloquium — escudo para todos ao redor.*
- Efeito: Cura AOE (1d6 + MND) + aplica **Catalyze Shield** (absorve 1d6 de dano) em todos aliados em 3 tiles.
- Foundry: `heal: "1d6", shield: "1d6", aoeSize: 3, mpCost: 2`

**Deployment Tactics** `[LVL 20] [INSTANT]`
- MP: 1 | RANGE: Short | TARGET: 1 Ally (com Galvanize)
- *Espalha o escudo do aliado para os adjacentes instante.*
- Condição: O alvo deve ter o efeito **Galvanize** ativo.
- Efeito: Copia o Galvanize Shield do alvo para todos os aliados em 2 tiles do alvo.
- Foundry: `trigger: "manual_use"`, `requires: "galvanize_on_target"`, `effect: "spread_galvanize_to_adjacent"`

**Expedient** `[LVL 30] [SECONDARY]`
- MP: 2 | RANGE: Self (aura) | TARGET: All allies within 3 tiles
- *Cria um campo de proteção móvel — aliados dentro ficam mais rápidos e resistentes.*
- Efeito: Por 2 turnos, aliados em 3 tiles ganham +1 tile de movimento E recebem -15% dano.
- Foundry: `effect: "speed_+1_and_damage_-15percent_2t", aoeSize: 3`

---

### ✨ Aetherflow e Habilidades Especiais

**Aetherflow** `[LVL 10] [SECONDARY]`
- MP: 0 | RANGE: Self | TARGET: Self
- *Canaliza energia do éter — recarrega as cargas de Aetherflow.*
- Efeito: Recupera 3 cargas de **Aetherflow**. Restaura 1 MP.
- Foundry: `effect: "restore_3_aetherflow_charges", restoreMP: 1`

**Lustrate** `[LVL 10] [INSTANT] [HEAL]`
- MP: 0 | Aetherflow: 1 | RANGE: Short | TARGET: 1 Ally
- *Cura de emergência instantânea usando Aetherflow.*
- Efeito: Cura (3d6 + MND) imediatamente. Gasta 1 Aetherflow.
- Foundry: `heal: "3d6", cost: {aetherflow: 1}`

**Sacred Soil** `[LVL 15] [SECONDARY] [HEAL]`
- MP: 0 | Aetherflow: 1 | RANGE: Medium | TARGET: Zone 2×2
- *Território sagrado que protege aliados dentro dele.*
- Efeito: Posiciona zona de 2×2 tiles. No Round-Up Phase por 3 turnos, aliados dentro recebem cura (1d4) e -10% dano.
- Foundry: `placeHealZone: true, aoeSize: 2, hot: "1d4_3t", damageReduction: "10percent_3t", cost: {aetherflow: 1}`

**Indomitability** `[LVL 20] [INSTANT] [HEAL] [AOE]`
- MP: 0 | Aetherflow: 1 | RANGE: Self (aura 3 tiles) | TARGET: All allies
- *Cura AOE de emergência.*
- Efeito: Cura imediata (2d6 + MND) em todos os aliados em 3 tiles. Gasta 1 Aetherflow.
- Foundry: `heal: "2d6", aoeSize: 3, cost: {aetherflow: 1}`

**Energy Drain** `[LVL 25] [PRIMARY] [MAGIC]`
- MP: 0 | Aetherflow: 1 | RANGE: Long | TARGET: Single Enemy
- *Drena a energia do inimigo para beneficiar o Scholar.*
- Efeito: Dano mágico Unaspected (2d6 + MND). Restaura 1 MP. Gasta 1 Aetherflow.
- Foundry: `damage: "2d6", restoreMP: 1, cost: {aetherflow: 1}`

---

### 🧚 Habilidades da Faerie

**Summon Eos** `[LVL 1] [SECONDARY] [PET]`
- MP: 0 | RANGE: Self (Faerie aparece adjacente) | TARGET: —
- *Invoca a Fada Eos — cura passiva e suporte.*
- Efeito: Eos aparece no campo. No Round-Up Phase, se algum aliado em 3 tiles do Scholar estiver abaixo de 50% HP, Eos automaticamente cura esse aliado por 1d6 + MND. Dura até morrer ou ser dispensada.
- Foundry: `spawnPet: "eos", behaviour: "auto_heal_low_hp_ally_roundup"`

**Summon Selene** `[LVL 1] [SECONDARY] [PET]`
- MP: 0 | RANGE: Self | TARGET: —
- *Invoca a Fada Selene — versão de suporte e buffs.*
- Efeito: Selene aparece no campo. A cada Round-Up Phase, aplica +1 dado de Vantagem em um Check de um aliado aleatório no próximo turno.
- Foundry: `spawnPet: "selene", behaviour: "auto_advantage_random_ally_roundup"`

**Fey Wind** `[LVL 10] [SECONDARY]`
- MP: 0 | RANGE: Eos/Selene deve estar ativa | TARGET: All allies within 3 tiles of Scholar
- Condição: Eos ou Selene em campo.
- Efeito: A Faerie ativa emite uma rajada — todos os aliados em 3 tiles ganham +1 tile de movimento pelo próximo turno.
- Foundry: `requires: "faerie_active"`, `effect: "speed_+1_next_turn_all_allies_3tiles"`

**Fey Illumination** `[LVL 15] [INSTANT]`
- MP: 0 | Condição: Faerie em campo | TARGET: All allies within 3 tiles
- Efeito: A Faerie irradia luz protetora — todos os aliados em 3 tiles ganham **+2 Magic Defense** por 1 turno.
- Foundry: `requires: "faerie_active"`, `effect: "magic_defense_+2_1t_all_allies_3tiles"`

**Dissipation** `[LVL 25] [SECONDARY]`
- MP: 0 | RANGE: Self | TARGET: Self (Faerie é absorvida)
- *O Scholar absorve a própria Faerie para ganhar poder imediato.*
- Efeito: Dispensa a Faerie. Ganha imediatamente 3 cargas de Aetherflow + +2 MND por 3 turnos. Faerie não pode ser resummoned por 3 turnos.
- Foundry: `effect: "+3_aetherflow + mnd_+2_3t"`, `removePet: "faerie"`, `petCooldown: 3`

**Raise** `[LVL 10]` — mesma versão que White Mage.

---

## ⭐ ASTROLOGIAN

**Papel:** Healer de suporte — buffs via Cards + cura versátil
**Stat Principal:** MND
**Arma:** Star Globe (esfera celestial)
**Recurso Especial:** 🃏 **Arcanum Cards** — baralho de 6 cartas com efeitos únicos de buff

---

### 🏥 Habilidades de Cura

**Benefic** `[LVL 1] [PRIMARY] [HEAL]`
- MP: 1 | RANGE: Short | TARGET: 1 Ally
- Efeito: Cura (2d6 + MND). Em Critical Hit → aplica **Harmony** (o próximo Benefic II no alvo é gratuito).
- Foundry: `heal: "2d6", crit_effect: "harmony_buff"`

**Benefic II** `[LVL 8] [PRIMARY] [HEAL]`
- MP: 2 | RANGE: Short | TARGET: 1 Ally
- Efeito: Cura forte (3d6+3 + MND). Se **Harmony** estiver ativo no alvo, custa 0 MP.
- Foundry: `heal: "3d6+3", mpCost: 2, conditional_mp_free: "harmony_active"`

**Helios** `[LVL 5] [PRIMARY] [HEAL] [AOE]`
- MP: 2 | RANGE: Self (aura 3 tiles) | TARGET: All allies
- Efeito: Cura AOE (1d6+2 + MND) em todos os aliados em 3 tiles.
- Foundry: `heal: "1d6+2", aoeSize: 3`

**Aspected Helios** `[LVL 15] [PRIMARY] [HEAL+HOT] [AOE]`
- MP: 3 | RANGE: Self (aura 3 tiles) | TARGET: All allies
- Efeito: Cura imediata (1d6 + MND) + aplica **Aspected** (Regen HOT 1d4 por 3 turnos) em todos em 3 tiles.
- Foundry: `heal: "1d6", hot: "1d4_3t", aoeSize: 3`

**Essential Dignity** `[LVL 10] [INSTANT] [HEAL]`
- MP: 1 | RANGE: Short | TARGET: 1 Ally
- *Cura de emergência proporcional ao HP perdido do aliado.*
- Efeito: Cura (1d6 + MND). Se o alvo estiver abaixo de 50% HP → cura é dobrada. Abaixo de 25% → cura é triplicada.
- Foundry: `heal: "1d6"`, `conditional_heal_multiplier: [hp<50: x2, hp<25: x3]`

**Earthly Star** `[LVL 20] [SECONDARY] [AOE]`
- MP: 2 | RANGE: Medium (posiciona em tile) | TARGET: Zone 2×2 tiles
- *Planta uma estrela que pode curar aliados OU explodir causando dano.*
- Efeito: Coloca **Earthly Star** em 2×2 tiles. Por 2 turnos, aliados na zona curam 1d4 por Round-Up. Ao usar **Stellar Detonation** (Secondary gratuita): a estrela explode — cura todos aliados na zona (3d6) e causa dano em inimigos (2d6 Unaspected).
- Foundry: `spawnObject: "earthly_star"`, `hot: "1d4_2t"`, `detonation_action: "heal_3d6_allies + damage_2d6_enemies"`

**Celestial Intersection** `[LVL 25] [SECONDARY] [HEAL+SHIELD]`
- MP: 0 | RANGE: Short | TARGET: 1 Ally (2 cargas)
- Efeito: Cura (1d6 + MND) + aplica Shield (1d6) no alvo. 2 cargas.
- Foundry: `heal: "1d6", shield: "1d6", charges: 2`

**Raise** `[LVL 10]` — mesma versão dos outros Healers.

---

### 🃏 Sistema de Cartas (Arcanum)

**Draw** `[LVL 1] [SECONDARY]`
- MP: 0 | RANGE: Self | TARGET: Self
- *Compra uma carta do baralho divino.*
- Efeito: Compra 1 carta aleatória do baralho (ver tabela abaixo). Pode ter 1 carta em mão simultaneamente. 2 cargas, recarrega a cada 2 turnos.
- Foundry: `drawRandomCard: true, charges: 2`

**Redraw** `[LVL 5] [SECONDARY]`
- MP: 0 | RANGE: Self | TARGET: Self
- Efeito: Devolve a carta atual e compra outra. Pode ser feito apenas 1x após cada Draw.
- Foundry: `replaceCurrentCard: true, once_per_draw: true`

**Play** `[LVL 1] [SECONDARY] [BUFF]`
- MP: 0 | Requer carta em mão | RANGE: Short | TARGET: 1 Ally
- *Joga a carta comprada em um aliado.*
- Efeito: Aplica o efeito da carta no aliado (ver tabela). A carta é consumida.
- Foundry: `useCard: true, applyCardEffect: "current_card"`

#### Tabela de Cartas — Efeitos

| Carta | Efeito (2 turnos) | Stat Beneficiado |
|-------|-------------------|-----------------|
| **The Balance** | +1d6 de dano em ataques Físicos ou Mágicos | STR / INT |
| **The Arrow** | +1 tile de Speed + +1d4 iniciativa nos próximos combates | DEX |
| **The Spire** | +3 HP máximo temporário (absorve primeiro dano) | VIT |
| **The Ewer** | Regenera +2 MP + MND +1 para próxima cura | MND/MP |
| **The Bole** | +2 Defense E +2 Magic Defense | VIT |
| **The Spear** | Próximo ataque é automaticamente Direct Hit | DEX/INT |

*No Foundry: cada carta é um Active Effect de 2 turnos aplicado ao aliado.*

**Divination** `[LVL 25] [SECONDARY] [BUFF] [AOE]`
- MP: 2 | RANGE: Self (aura 4 tiles) | TARGET: All allies
- *O Astrologian lê o futuro e alinha os astros a favor da party.*
- Efeito: Todos os aliados em 4 tiles ganham +1d4 de dano em todos os ataques por 2 turnos.
- Foundry: `effect: "damage_bonus_+1d4_2t"`, `aoeSize: 4`, `target: "all_allies"`

**Minor Arcana** `[LVL 20] [SECONDARY]`
- MP: 0 | 1 carta em mão | RANGE: —
- *Transforma a carta atual em um poder maior.*
- Efeito: A carta em mão é convertida em **Lord of Crowns** (dano AOE) ou **Lady of Crowns** (cura AOE) aleatoriamente.
  - **Lord of Crowns**: Dano mágico (2d6) em todos inimigos em 3 tiles (Primary Action no próximo turno)
  - **Lady of Crowns**: Cura (2d6) em todos aliados em 3 tiles (Primary Action no próximo turno)
- Foundry: `convertCard: "minor_arcana"`, `randomResult: ["lord_of_crowns", "lady_of_crowns"]`

---

## 🥋 MONK

**Papel:** DPS físico melee, alta velocidade, Positional Attacks e Chakra
**Stat Principal:** STR
**Arma:** Fists / Claws (punhos e garras)
**Recurso Especial:** 🔵 **Chakra Gauge** (0–5) — acumula em combate; gasto em ataques especiais

---

### 🗡️ Combos e Ataques

**Bootshine** `[LVL 1] [PRIMARY] [PHYS]`
- MP: 0 | RANGE: Melee | TARGET: Single
- *Chute inicial rápido — abre o Combo.*
- Efeito: Dano físico (1d6 + STR). **Positional (Flanco)**: se atacar pelo flanco, causa Critical Hit automaticamente. Habilita True Strike.
- Foundry: `damage: "1d6", positional: {flank: "auto_crit"}, combo.enables: "true_strike"`

**True Strike** `[LVL 4] [PRIMARY] [PHYS]`
- MP: 0 | RANGE: Melee | TARGET: Single
- Efeito: Dano físico (2d6 + STR). Requer Combo de Bootshine. **Positional (Costas)**: +1d6 de dano adicional.
- Foundry: `damage: "2d6", combo.from: "bootshine", positional: {rear: "+1d6"}`

**Snap Punch** `[LVL 10] [PRIMARY] [PHYS]`
- MP: 0 | RANGE: Melee | TARGET: Single
- Efeito: Dano físico (2d6+2 + STR). Requer Combo de True Strike. **Positional (Flanco)**: +1d6. Ganha +1 Chakra.
- Foundry: `damage: "2d6+2", combo.from: "true_strike", positional: {flank: "+1d6"}, chakra: +1`

**Twin Snakes** `[LVL 8] [PRIMARY] [PHYS]`
- MP: 0 | RANGE: Melee | TARGET: Single
- *Combo alternativo — começa uma cadeia diferente.*
- Efeito: Dano (1d6+1 + STR). Habilita Demolish. Aplica **Disciplined Fist** no Monk por 2 turnos (+1d4 dano em todos os ataques físicos).
- Foundry: `damage: "1d6+1", combo.enables: "demolish", effect: "disciplined_fist_+1d4_2t"`

**Demolish** `[LVL 12] [PRIMARY] [PHYS+DOT]`
- MP: 0 | RANGE: Melee | TARGET: Single
- Efeito: Dano (2d6 + STR). Requer Combo de Twin Snakes. **Positional (Costas)**: aplica **Demolish DoT** (1d4 por Round-Up por 3 turnos).
- Foundry: `damage: "2d6", combo.from: "twin_snakes", positional: {rear: "dot_1d4_3t"}`

**Six-Sided Star** `[LVL 25] [PRIMARY] [PHYS]`
- MP: 0 | Chakra: 3 | RANGE: Melee | TARGET: Single
- *Golpe giratório devastador — gasta Chakra.*
- Efeito: Dano físico alto (4d6 + STR). Ganha +1 tile de Movement pelo próximo turno. Gasta 3 Chakra.
- Foundry: `damage: "4d6", cost: {chakra: 3}, effect: "speed_+1_next_turn"`

**Meditation** `[LVL 15] [SECONDARY]`
- MP: 0 | RANGE: Self | TARGET: Self
- Efeito: Ganha +2 Chakra. Fora de combate, recupera 5 Chakra instantaneamente.
- Foundry: `effect: "+2_chakra"`

---

### 🌀 Habilidades de Chakra

**Howling Fist** `[LVL 10] [PRIMARY] [PHYS] [AOE]`
- MP: 0 | Chakra: 5 | RANGE: Self (cone) | TARGET: Enemies in front (3 tiles)
- *Grito de guerra que empurra energia para fora em cone.*
- Efeito: Dano físico (3d6 + STR) em cone 3 tiles. Gasta todos os 5 Chakra.
- Foundry: `damage: "3d6", aoeShape: "cone", aoeSize: 3, cost: {chakra: 5}`

**The Forbidden Chakra** `[LVL 20] [INSTANT] [PHYS]`
- MP: 0 | Chakra: 5 | RANGE: Melee | TARGET: Single
- *Libera energia de Chakra reprimida num único golpe concentrado.*
- Efeito: Dano físico altíssimo (5d6 + STR). Gasta todos os 5 Chakra.
- Foundry: `damage: "5d6", cost: {chakra: 5}`

---

### 🔥 Habilidades de Suporte e Utilitários

**Mantra** `[LVL 15] [SECONDARY] [BUFF] [AOE]`
- MP: 1 | RANGE: Self (aura 3 tiles) | TARGET: All allies
- Efeito: Por 2 turnos, todas as curas recebidas por aliados em 3 tiles são **+25% mais eficazes**. (Multiplicador de cura — sinergiza com Healers.)
- Foundry: `effect: "heal_amplify_+25percent_2t"`, `aoeSize: 3`

**Riddle of Fire** `[LVL 20] [SECONDARY] [BUFF]`
- MP: 1 | RANGE: Self | TARGET: Self
- Efeito: Por 2 turnos, o Monk causa +1d6 de dano em todos os ataques físicos.
- Foundry: `effect: "damage_bonus_+1d6_physical_2t"`

**Perfect Balance** `[LVL 25] [SECONDARY]`
- MP: 0 | RANGE: Self | TARGET: Self
- *Loop de combo perfeito — ignora requisitos de posição.*
- Efeito: Por 2 ataques, o Monk não precisa atender às Positional requirements para obter bônus de flanco/costas — todos os bônus posicionais são aplicados automaticamente.
- Foundry: `effect: "ignore_positionals_2attacks"`

---

## 🐉 DRAGOON

**Papel:** DPS físico melee, saltos para reposicionamento e dano aéreo
**Stat Principal:** STR
**Arma:** Spear / Lance (lança longa)
**Recurso Especial:** 🔴 **Life of the Dragon** — gauge que ativa Nastrond após Geirskogul

---

### 🗡️ Combos e Ataques

**True Thrust** `[LVL 1] [PRIMARY] [PHYS]`
- MP: 0 | RANGE: Melee | TARGET: Single
- Efeito: Dano físico (1d6 + STR). Combo Opener → habilita Vorpal Thrust E Disembowel.
- Foundry: `damage: "1d6", combo.enables: ["vorpal_thrust", "disembowel"]`

**Vorpal Thrust** `[LVL 4] [PRIMARY] [PHYS]`
- MP: 0 | RANGE: Melee | TARGET: Single
- Efeito: Dano físico (2d6 + STR). Requer Combo de True Thrust → habilita Full Thrust.
- Foundry: `damage: "2d6", combo.from: "true_thrust", combo.enables: "full_thrust"`

**Full Thrust** `[LVL 10] [PRIMARY] [PHYS]`
- MP: 0 | RANGE: Melee | TARGET: Single
- *Estocada máxima do Dragoon — finalizador de alto dano.*
- Efeito: Dano físico (3d6+2 + STR). Requer Combo de Vorpal Thrust.
- Foundry: `damage: "3d6+2", combo.from: "vorpal_thrust"`

**Disembowel** `[LVL 8] [PRIMARY] [PHYS+DEBUFF]`
- MP: 0 | RANGE: Melee | TARGET: Single
- *Alternativo ao Vorpal Thrust — reduz a resistência do inimigo.*
- Efeito: Dano físico (2d6 + STR). Requer Combo de True Thrust. Aplica **Chaos Thrust DoT** por 3 turnos (1d4 por Round-Up).
- Foundry: `damage: "2d6", combo.from: "true_thrust", effect: "chaos_thrust_dot_1d4_3t"`

**Chaos Thrust** `[LVL 10] [PRIMARY] [PHYS+DOT]`
- MP: 0 | RANGE: Melee | TARGET: Single
- *Estocada que penetra e causa sangramento.*
- Efeito: Dano físico (2d6+1 + STR). **Positional (Costas)**: DoT adicional (1d6 por Round-Up por 3 turnos). Requer Combo de Disembowel.
- Foundry: `damage: "2d6+1", combo.from: "disembowel", positional: {rear: "dot_1d6_3t"}`

---

### 🦅 Habilidades de Salto (Jump Abilities)

**Jump** `[LVL 10] [PRIMARY] [PHYS]`
- MP: 0 | RANGE: Medium (4 tiles — ignora terreno entre) | TARGET: Single
- *Salta para sobre do inimigo e cai com a lança.*
- Efeito: Move imediatamente para o tile do inimigo (ignora obstáculos no caminho) e causa dano físico (3d6 + STR). Após o ataque, retorna 1 tile para trás automaticamente.
- Foundry: `effect: "jump_to_target_ignore_terrain"`, `damage: "3d6"`, `postJump: "return_1tile"`

**Spineshatter Dive** `[LVL 15] [PRIMARY] [PHYS]`
- MP: 0 | RANGE: Long (6 tiles) | TARGET: Single (com splash AOE ao pousar)
- *Mergulha em alta velocidade, causando dano no ponto de impacto.*
- Efeito: Salta até 6 tiles, causa dano físico (3d6 + STR) no alvo + dano AOE (1d6) nos inimigos adjacentes ao ponto de pouso.
- Foundry: `jump: {range: 6}, damage: "3d6"`, `splash: "1d6_adjacent"`

**Dragonfire Dive** `[LVL 20] [PRIMARY] [PHYS] [AOE]`
- MP: 1 | RANGE: Long (6 tiles) | TARGET: Zone de 2×2 ao pousar
- *O salto mais poderoso — cria uma explosão de chamas ao pousar.*
- Efeito: Salta e pousa numa zona de 2×2 tiles, causando dano físico+fogo (4d6 + STR) em todos os inimigos na zona.
- Foundry: `jump: {range: 6}, aoeShape: "circle", aoeSize: 2, damage: "4d6", type: "fire_phys"`

**Stardiver** `[LVL 30+] [PRIMARY] [PHYS] [AOE]`
- MP: 2 | Range: Long | TARGET: Zone ampla (3 tiles raio)
- *O ultimate dos saltos — devastação em grande escala.*
- Efeito: Salto imenso, pousa em raio de 3 tiles, dano físico (5d6 + STR) em TOdos os inimigos no raio.
- Foundry: `jump: {range: 8}, aoeShape: "circle", aoeSize: 3, damage: "5d6"`

---

### 🔴 Habilidades de Suporte e Dragon Gauge

**Life Surge** `[LVL 5] [INSTANT]`
- MP: 0 | RANGE: Self | TARGET: Self
- Efeito: O próximo ataque físico do Dragoon é automaticamente **Critical Hit** + recupera HP igual ao dano causado.
- Foundry: `effect: "next_attack_auto_crit_and_lifesteal", oneshot: true`

**Lance Charge** `[LVL 8] [SECONDARY] [BUFF]`
- MP: 0 | RANGE: Self | TARGET: Self
- Efeito: Por 2 turnos, +1d4 de dano em todos os ataques físicos. 
- Foundry: `effect: "damage_+1d4_physical_2t"`

**Dragon Sight** `[LVL 20] [SECONDARY] [BUFF]`
- MP: 1 | RANGE: Short | TARGET: 1 Ally + Self
- *Compartilha o poder da visão do dragão com um aliado.*
- Efeito: O Dragoon e o aliado escolhido ganham +1d6 de dano em todos os ataques por 2 turnos. O aliado deve estar em 3 tiles.
- Foundry: `effect: "damage_+1d6_2t"`, `target: "self_and_1_ally_3tiles"`

**Geirskogul** `[LVL 25] [PRIMARY] [PHYS]`
- MP: 0 | RANGE: Long (linha reta 5 tiles) | TARGET: All enemies in line
- *Estouro de energia em linha reta.*
- Efeito: Dano físico (3d6 + STR) em linha reta de 5 tiles. Ativa **Life of the Dragon** por 3 turnos.
- Foundry: `aoeShape: "line", aoeSize: 5, damage: "3d6"`, `effect: "life_of_dragon_3t"`

**Nastrond** `[LVL 25] [PRIMARY] [PHYS]`
- MP: 0 | Requer: Life of the Dragon ativo | RANGE: Long linha 5 tiles | TARGET: All in line
- Efeito: Dano físico muito alto (4d6 + STR) em linha reta. Só disponível durante Life of the Dragon.
- Foundry: `requires: "life_of_dragon_active"`, `damage: "4d6"`, `aoeShape: "line"`, `aoeSize: 5`

---

---

## 🥷 NINJA

**Papel:** DPS físico melee — alta mobilidade, debuffs e Ninjutsus devastadores
**Stat Principal:** DEX
**Arma:** Daggers (duas adagas)
**Recurso Especial:** 🟣 **Ninki Gauge** (0–100) + 🤲 **Mudras** (Ten / Chi / Jin)

---

### Combos Base

**Spinning Edge** `[LVL 1] [PRIMARY] [PHYS]`
- Dano (1d6 + DEX). Combo Opener → habilita Gust Slash. +5 Ninki.
- Foundry: `damage: "1d6", combo.enables: "gust_slash", ninki: +5`

**Gust Slash** `[LVL 4] [PRIMARY] [PHYS]`
- Dano (2d6 + DEX). Req. Combo de Spinning Edge → habilita Aeolian Edge/Armor Crush. +5 Ninki.
- Foundry: `damage: "2d6", combo.from: "spinning_edge", ninki: +5`

**Aeolian Edge** `[LVL 10] [PRIMARY] [PHYS]`
- Dano (2d6+2 + DEX). Req. Combo de Gust Slash. **Positional (Costas)**: +1d6. +10 Ninki.
- Foundry: `damage: "2d6+2", combo.from: "gust_slash", positional: {rear: "+1d6"}, ninki: +10`

**Armor Crush** `[LVL 15] [PRIMARY] [PHYS+DEBUFF]`
- Dano (2d6 + DEX). Req. Combo de Gust Slash. **Positional (Flanco)**: reduz Defense do alvo em –1 por 2 turnos. +10 Ninki.
- Foundry: `damage: "2d6", positional: {flank: "debuff_defense_-1_2t"}, ninki: +10`

---

### 🤲 Sistema de Mudras e Ninjutsu

> Mudras são gestos que combinados criam Ninjutsus poderosos. Cada Mudra é uma **Secondary Action**. Combinando 2-3 Mudras em sequência (mesmo turno via Focus), culmina no Ninjutsu.

**Ten** `[LVL 5] [SECONDARY]` — Iniciar sequência Mudra (vento)
**Chi** `[LVL 8] [SECONDARY]` — Segunda Mudra (terra)
**Jin** `[LVL 12] [SECONDARY]` — Terceira Mudra (gelo)

#### Tabela de Ninjutsus por Sequência

| Sequência | Ninjutsu | Efeito |
|-----------|----------|--------|
| Ten | **Fuma Shuriken** `[PHYS]` | Dano físico à distância (2d6 + DEX), RANGE: Long |
| Ten + Chi | **Katon** `[MAGIC] [AOE]` | Dano mágico Fogo (2d6 + DEX) em círculo 2 tiles |
| Ten + Jin | **Hyoton** `[MAGIC]` | Dano mágico Gelo (2d6 + DEX) + aplica **Bind** (alvo não pode mover por 1 turno) |
| Chi + Ten | **Raiton** `[MAGIC]` | Dano mágico Raio alto (3d6 + DEX), RANGE: Medium |
| Chi + Jin | **Doton** `[MAGIC] [DOT] [AOE]` | Coloca zona de 2×2 tiles — DoT Raio (1d4) por 3 turnos no Round-Up |
| Jin + Chi | **Suiton** `[MAGIC]` | Dano mágico Água (2d6) + aplica estado **Wet** (próximo ataque físico no alvo é Direct Hit automático) |
| Ten + Chi + Jin | **Huton** `[BUFF]` | Aplica **Huton** no Ninja: +1 tile Speed + +1d4 dano por 2 turnos. Sem dano direto. |
| Jin + Ten + Chi | **Forked Raiju** `[PHYS]` | Dano físico muito alto (4d6 + DEX). Req. Suiton ou Huton ativos. |

*Foundry: Cada Mudra é rastreada como flag; ao combinar, dispara o Ninjutsu correspondente automaticamente.*

---

### 🎯 Habilidades de Dano e Debuff

**Trick Attack** `[LVL 10] [PRIMARY] [PHYS+DEBUFF]`
- MP: 0 | RANGE: Melee | TARGET: Single
- *O golpe mais icônico do Ninja — maximiza dano da party.*
- Efeito: Dano físico (2d6 + DEX) **Positional (Costas)**: aplica **Trick Attack Debuff** (alvo recebe +10% de todo dano por 2 turnos).
- Foundry: `damage: "2d6", positional: {rear: "vulnerability_+10percent_2t"}`

**Mug** `[LVL 15] [PRIMARY] [PHYS]`
- MP: 0 | RANGE: Melee | TARGET: Single
- Efeito: Dano (1d6 + DEX) + gera +40 Ninki.
- Foundry: `damage: "1d6", ninki: +40`

**Bhavacakra** `[LVL 20] [PRIMARY] [PHYS]`
- Ninki: 50 | RANGE: Melee | TARGET: Single
- *Gasto de Ninki para dano concentrado.*
- Efeito: Dano muito alto (4d6 + DEX). Gasta 50 Ninki.
- Foundry: `damage: "4d6", cost: {ninki: 50}`

**Hellfrog Medium** `[LVL 20] [PRIMARY] [MAGIC] [AOE]`
- Ninki: 50 | RANGE: Medium | TARGET: Single + Adjacent
- Efeito: Dano mágico (3d6) no alvo + splash (1d6) nos adjacentes. Gasta 50 Ninki.
- Foundry: `damage: "3d6", splash: "1d6_adjacent", cost: {ninki: 50}`

**Bunshin** `[LVL 25] [SECONDARY]`
- Ninki: 50 | RANGE: Self | TARGET: Self
- *Cria uma sombra que replica os ataques.*
- Efeito: Por 3 turnos, cada ataque físico do Ninja gera automaticamente 1 ataque adicional da sombra por 1d6 dano físico. Gasta 50 Ninki.
- Foundry: `effect: "shadow_replicate_1d6_3t", cost: {ninki: 50}`

**Ten Chi Jin** `[LVL 30] [SECONDARY]`
- MP: 0 | RANGE: — | TARGET: —
- *Convergência das três Mudras — executa três Ninjutsus seguidos em 1 turno.*
- Efeito: Por 1 turno, o Ninja pode usar 3 Mudras e executar 3 Ninjutsus diferentes como Secondary Actions (conta como 1 ação). Cada Ninjutsu tem custo 0.
- Foundry: `effect: "triple_ninjutsu_in_one_turn"` (special state flag)

**Shade Shift** `[LVL 5] [SECONDARY]`
- MP: 0 | RANGE: Self | TARGET: Self
- Efeito: Cria **Shadow** — o próximo ataque que atingir o Ninja é completamente absorvido (0 dano).
- Foundry: `effect: "absorb_next_hit_1t"`

---

## ⚔️ SAMURAI

**Papel:** DPS físico melee de altíssimo dano — Sen, Kenki e Iaijutsu
**Stat Principal:** STR
**Arma:** Katana
**Recurso Especial:** 🌸 **Sen** (3 tipos: ❄️ Setsu / 🌙 Getsu / 🌸 Ka) + ⚡ **Kenki Gauge** (0–100)

---

### Combos e Geração de Sen

**Hakaze** `[LVL 1] [PRIMARY] [PHYS]`
- Dano (1d6 + STR). Combo Opener → habilita Jinpu E Shifu. +5 Kenki.
- Foundry: `damage: "1d6", combo.enables: ["jinpu", "shifu"], kenki: +5`

**Jinpu** `[LVL 4] [PRIMARY] [PHYS]`
- Dano (1d6+1 + STR). Req. Combo Hakaze. Aplica **Fugetsu** (+1d4 dano por 3 turnos). Habilita Gekko.
- Foundry: `damage: "1d6+1", combo.from: "hakaze", effect: "fugetsu_+1d4_3t", combo.enables: "gekko"`

**Shifu** `[LVL 8] [PRIMARY] [PHYS]`
- Dano (1d6+1 + STR). Req. Combo Hakaze. Aplica **Fuka** (+1 Speed por 3 turnos). Habilita Kasha.
- Foundry: `damage: "1d6+1", combo.from: "hakaze", effect: "fuka_+1speed_3t", combo.enables: "kasha"`

**Gekko** `[LVL 10] [PRIMARY] [PHYS]`
- Dano (2d6+1 + STR). Req. Combo Jinpu. **Positional (Costas)**: ganha ❄️ **Setsu**. Always: +10 Kenki.
- Foundry: `damage: "2d6+1", combo.from: "jinpu", positional: {rear: "gain_setsu"}, kenki: +10`

**Kasha** `[LVL 12] [PRIMARY] [PHYS]`
- Dano (2d6+1 + STR). Req. Combo Shifu. **Positional (Flanco)**: ganha 🌸 **Ka**. Always: +10 Kenki.
- Foundry: `damage: "2d6+1", combo.from: "shifu", positional: {flank: "gain_ka"}, kenki: +10`

**Yukikaze** `[LVL 15] [PRIMARY] [PHYS]`
- Dano (2d6 + STR). Req. Combo Hakaze. Ganha 🌙 **Getsu**. Aplica **Slashing Vulnerability** (–1 Defense por 2 turnos). +10 Kenki.
- Foundry: `damage: "2d6", combo.from: "hakaze", effect: "gain_getsu + debuff_defense_-1_2t", kenki: +10`

---

### 🔥 Iaijutsu — O Sistema Principal

**Iaijutsu** `[LVL 10] [PRIMARY] [PHYS]`
- MP: 0 | RANGE: varies | TARGET: varies
- *Golpe de desenho da katana — poder proporcional ao número de Sen acumulados.*
- Efeito depende dos Sen em mão:
  - **1 Sen** → **Higanbana**: Dano (2d6 + STR) + DOT pesado (2d6 por Round-Up por 3 turnos)
  - **2 Sen** → **Tenka Goken**: Dano AOE (3d6 + STR) em cone 3 tiles
  - **3 Sen** → **Midare Setsugekka**: Dano single massivo (6d6 + STR) — o maior dano single do Samurai
- Foundry: `dynamicEffect: "sen_count_determines_ability"` — sistema de verificação de Sen

**Tsubame-gaeshi** `[LVL 20] [INSTANT]`
- MP: 0 | RANGE: auto-target (mesmo do Iaijutsu anterior) | Condição: imediatamente após Iaijutsu
- *Replica o Iaijutsu instantaneamente, sem gastar Sen.*
- Efeito: Repete o último Iaijutsu com 75% do dano original. Não consome Sen.
- Foundry: `trigger: "after_iaijutsu"`, `effect: "replicate_last_iaijutsu_75percent"`

---

### Habilidades de Kenki e Suporte

**Kenki** `[LVL 18] [SECONDARY] [PHYS]`
- Kenki: 25 | RANGE: Melee | TARGET: Single
- *Descarga de Kenki acumulado.*
- Efeito: Dano (2d6 + STR). Gasta 25 Kenki. 2 cargas.
- Foundry: `damage: "2d6", cost: {kenki: 25}, charges: 2`

**Hissatsu: Guren** `[LVL 25] [PRIMARY] [PHYS] [AOE]`
- Kenki: 25 | RANGE: Medium (linha 5 tiles) | TARGET: Enemies in line
- *Corte em linha reta de enorme poder.*
- Efeito: Dano físico (4d6 + STR) em linha de 5 tiles. 
- Foundry: `aoeShape: "line", aoeSize: 5, damage: "4d6", cost: {kenki: 25}`

**Meikyo Shisui** `[LVL 25] [SECONDARY]`
- MP: 0 | RANGE: Self | TARGET: Self
- *O Samurai entra em estado de iluminação marcial.*
- Efeito: Por 2 ataques, as habilidades de combo não requerem a cadeia anterior — pode usar Gekko/Kasha/Yukikaze diretamente (e ainda ganham Sen).
- Foundry: `effect: "bypass_combo_requirements_2attacks"`

**Third Eye** `[LVL 10] [INSTANT]`
- MP: 0 | Condição: qualquer fase | TARGET: Self
- Efeito: Reduz o próximo dano recebido em 10%. Se ativo ao tomar dano, ganha +10 Kenki.
- Foundry: `effect: "reduce_next_hit_10percent"`, `onTrigger: "+10_kenki"`

---

## 🎵 BARD

**Papel:** DPS físico de longo alcance + suporte via Songs e buffs de party
**Stat Principal:** DEX
**Arma:** Bow (arco)
**Recurso Especial:** 🎶 **Songs** (músicas ativas simultâneamente) + 📊 **Soul Voice** (0–100) + 🎶 **Coda**

---

### Ataques Básicos e Combos

**Heavy Shot** `[LVL 1] [PRIMARY] [PHYS]`
- Dano (1d6 + DEX). Tem 20% de chance de ativar **Straight Shot Ready** (buff).
- Foundry: `damage: "1d6"`, `proc: {chance: 20, effect: "straight_shot_ready"}`

**Straight Shot** `[LVL 4] [PRIMARY] [PHYS]`
- Dano (2d6 + DEX). Se **Straight Shot Ready** ativo: custa 0 MP, é Direct Hit automático. Ganha +10 Soul Voice.
- Foundry: `damage: "2d6", conditional_direct_hit: "straight_shot_ready_active", soulVoice: +10`

**Venomous Bite** `[LVL 5] [PRIMARY] [PHYS+DOT]`
- Dano (1d6 + DEX) + aplica **Venomous Bite DoT** (1d4 por Round-Up por 3 turnos). Ganha +10 Soul Voice quando DoT ticks.
- Foundry: `damage: "1d6"`, `dot: "1d4_3t_gives_10soul_voice"`

**Windbite** `[LVL 10] [PRIMARY] [PHYS+DOT]`
- Dano (1d6 + DEX) + aplica **Windbite DoT** de vento (1d4 por Round-Up por 3 turnos).
- Foundry: `damage: "1d6"`, `dot: "1d4_wind_3t"`

**Quick Nock** `[LVL 15] [PRIMARY] [PHYS] [AOE]`
- Dano (1d6 + DEX) em todos inimigos num cone de 3 tiles.
- Foundry: `aoeShape: "cone"`, `aoeSize: 3`, `damage: "1d6"`

---

### 🎶 Songs — O Sistema Principal do Bard

> Apenas 1 Song por vez pode estar ativa. Songs são passivas — fornecem efeitos contínuos enquanto ativas.

**Mage's Ballad** `[LVL 5] [SECONDARY]`
- MP: 0 | Dura: 3 turnos | Efeito passivo:
  - Party em 3 tiles: regen de MP (+1 MP por Round-Up)
  - A cada acerto com DoT no Round-Up: chance de resetar cooldown de **Bloodletter**
  - Ao terminar: ganha 🎶 **Mage's Coda**
- Foundry: `activateSong: "mages_ballad"`, `duration: 3`, `passiveEffect: "party_mp_regen_1_roundup"`

**Army's Paeon** `[LVL 10] [SECONDARY]`
- MP: 0 | Dura: 3 turnos | Efeito passivo:
  - Party em 3 tiles: +1 tile Speed
  - A cada acerto de Physical em Round-Up: ganha 1 **Repertoire** (máx 4)
  - Ao terminar: ganha 🎶 **Army's Coda**
- Foundry: `activateSong: "armys_paeon"`, `passiveEffect: "party_speed_+1"`

**The Wanderer's Minuet** `[LVL 15] [SECONDARY]`
- MP: 0 | Dura: 3 turnos | Efeito passivo:
  - A cada acerto crítico: ganha 1 **Repertoire** (máx 3)
  - Habilita **Pitch Perfect** enquanto ativa
  - Ao terminar: ganha 🎶 **Wanderer's Coda**
- Foundry: `activateSong: "wanderers_minuet"`, `enables: "pitch_perfect"`

---

### Habilidades de Burst e Instants

**Bloodletter** `[LVL 8] [INSTANT] [PHYS]`
- MP: 0 | RANGE: Short | Dano (2d6 + DEX). 2 cargas.
- Foundry: `damage: "2d6"`, `charges: 2`

**Pitch Perfect** `[LVL 20] [INSTANT] [PHYS]`
- Repertoire: 1-3 | Requer: Wanderer's Minuet ativa
- *Dano proporcional ao Repertoire acumulado.*
- 1 Repertoire: Dano 2d6 | 2: Dano 3d6 | 3: Dano 4d6 (Direct Hit automático)
- Foundry: `requires: "wanderers_minuet_active"`, `dynamicDamage: "repertoire_count"`

**Empyreal Arrow** `[LVL 12] [PRIMARY] [PHYS]`
- Dano (3d6 + DEX). Sempre ganha +10 Soul Voice. Resetável por Song procs.
- Foundry: `damage: "3d6"`, `soulVoice: +10`

**Apex Arrow** `[LVL 25] [PRIMARY] [PHYS] [AOE]`
- Soul Voice: 20-100 | RANGE: Long (linha 5 tiles)
- *Disparo de energia pura — poder proporcional ao Soul Voice.*
- Efeito: Dano em linha de 5 tiles; mais Soul Voice = mais dano. Mínimo: 2d6. Máximo (100): 5d6.
- Foundry: `dynamicDamage: "soul_voice / 20 = dice_count"`, `aoeShape: "line"`

**Refulgent Arrow** `[LVL 25] [PRIMARY] [PHYS]`
- Proc: ativado automaticamente após certos procs de Song
- Dano (3d6 + DEX) com Direct Hit automático.
- Foundry: `proc: {trigger: "song_proc", effect: "refulgent_ready"}`, `damage: "3d6"`, `auto_direct_hit: true`

**Troubadour** `[LVL 20] [INSTANT] [BUFF] [AOE]`
- MP: 1 | Party em 4 tiles
- Por 1 turno, todos os aliados recebem –15% dano.
- Foundry: `effect: "party_damage_reduction_15percent_1t"`, `aoeSize: 4`

**Battle Voice** `[LVL 25] [SECONDARY] [BUFF] [AOE]`
- MP: 1 | Party em 4 tiles
- Por 2 turnos, +15% de chance de Direct Hit em todos os ataques da party.
- Foundry: `effect: "party_direct_hit_rate_+15percent_2t"`

---

## 🔫 MACHINIST

**Papel:** DPS físico de longo alcance — turrets mecânicas e explosões de calor
**Stat Principal:** DEX
**Arma:** Firearms / Guns (pistola, rifle)
**Recurso Especial:** 🔥 **Heat Gauge** (0–100) + 🔋 **Battery Gauge** (0–100)

---

### Combos e Ataques

**Split Shot** `[LVL 1] [PRIMARY] [PHYS]`
- Dano (1d6 + DEX). Combo Opener → habilita Slug Shot. +5 Heat.
- Foundry: `damage: "1d6", combo.enables: "slug_shot", heat: +5`

**Slug Shot** `[LVL 4] [PRIMARY] [PHYS]`
- Dano (2d6 + DEX). Req. Combo Split Shot. → habilita Clean Shot. +5 Heat.
- Foundry: `damage: "2d6", combo.from: "split_shot", heat: +5`

**Clean Shot** `[LVL 10] [PRIMARY] [PHYS]`
- Dano (2d6+2 + DEX). Req. Combo Slug Shot. +20 Battery. +5 Heat.
- Foundry: `damage: "2d6+2", combo.from: "slug_shot", battery: +20, heat: +5`

**Heated Variants** `[LVL 15]` — Ao atingir Overheat (100 Heat), as habilidades viram versões **Heated** com +1d6 cada automaticamente.

---

### 🔥 Overheat e Weapons

**Hypercharge** `[LVL 15] [SECONDARY]`
- Heat: 50 | RANGE: Self | TARGET: Self
- *Entra em modo Overheat — todos os ataques são potencializados.*
- Efeito: Por 2 turnos, todas as Primary Actions de ataque ganham +1d6 de dano. Gasta 50 Heat.
- Foundry: `cost: {heat: 50}`, `effect: "attack_bonus_+1d6_2t"`, `activates: "overheat_mode"`

**Heat Blast** `[LVL 15] [PRIMARY] [PHYS]` *(apenas durante Overheat)*
- Dano (1d4 + DEX). Disponível ilimitado vezes durante Overheat (substitui Primary Action). Não gera Heat. Reseta cooldown de Ricochet/Gauss Round.
- Foundry: `requires: "overheat_active"`, `damage: "1d4"`, `effect: "reset_ricochet_gauss"`

**Drill** `[LVL 20] [PRIMARY] [PHYS]`
- Dano alto (3d6 + DEX). Independente de combo. Não gera Heat (é uma weaponskill especial).
- Foundry: `damage: "3d6"`

**Air Anchor** `[LVL 25] [PRIMARY] [PHYS]`
- Dano (3d6+2 + DEX). +20 Battery. Independente de combo.
- Foundry: `damage: "3d6+2", battery: +20`

**Wildfire** `[LVL 15] [SECONDARY]`
- MP: 0 | TARGET: 1 Enemy
- *Aplica uma mina no inimigo que explode após X ataques.*
- Efeito: O inimigo fica com **Wildfire** — após 6 ataques do Machinist, explode causando dano igual a 2x o número de ataques que atingiram (máx 12d4).
- Foundry: `applyDebuff: "wildfire"`, `trigger: "6_machinist_hits"`, `damage: "hit_count x 2d4"`

---

### 🔋 Battery Gauge — Turrets e Robôs

**Rook Autoturret** `[LVL 10] [SECONDARY] [PET]`
- Battery: 50 | Coloca turret adjacente
- *Turret mecânica que ataca automaticamente.*
- Efeito: Turret com HP próprio (5 HP). A cada Round-Up Phase, ataca o inimigo mais próximo por 1d6 + DEX. Dura 3 turnos ou até ser destruída.
- Foundry: `spawnTurret: "rook"`, `behaviour: "auto_attack_nearest_roundup"`, `turretHP: 5`

**Automaton Queen** `[LVL 25] [SECONDARY] [PET]`
- Battery: 80-100 | RANGE: Campo de batalha
- *Robô autônomo de combate — a maior invenção do Machinist.*
- Efeito: Invoca Automaton Queen. Ela age na Fase dos Inimigos (agindo como aliada), atacando 2x por turno com (2d6 + DEX). Dura 3 turnos. Mais Battery = mais HP (80: 15 HP / 100: 25 HP).
- Foundry: `spawnPet: "automaton_queen"`, `behaviour: "attacks_2x_per_enemy_phase"`, `duration: 3`

**Ricochet** `[LVL 8] [INSTANT] [PHYS]`
- Dano (2d6 + DEX) em alvo único. RANGE: Long. 3 cargas.
- Foundry: `damage: "2d6", charges: 3`

**Gauss Round** `[LVL 8] [INSTANT] [PHYS]`
- Dano (1d6+2 + DEX) em alvo único. RANGE: Short. 3 cargas.
- Foundry: `damage: "1d6+2", charges: 3`

**Tactician** `[LVL 20] [INSTANT] [BUFF] [AOE]`
- Party em 4 tiles — por 1 turno, todos recebem –15% dano.
- Foundry: `effect: "party_damage_reduction_15percent_1t"`, `aoeSize: 4`

---

## 🔥 BLACK MAGE

**Papel:** DPS mágico de destruição pura — maior dano do jogo, gerenciamento de estados elementais
**Stat Principal:** INT
**Arma:** Staff (cajado)
**Recurso Especial:** 🔴 **Astral Fire** / 🔵 **Umbral Ice** (estados mutuamente exclusivos) + 📖 **Polyglot** (0–2)

---

### Estados Elementais — A Mecânica Central

| Estado | Efeito Fire Spells | Efeito Ice Spells | Regen de MP |
|--------|-------------------|------------------|-------------|
| **Astral Fire** | +Dano +Custo | Custo dobrado | Nenhum |
| **Umbral Ice** | Dano reducido | Custo 0 | +2 MP por Round-Up |
| **Neutro** | Normal | Normal | Normal |

---

### Magias de Fogo (Astral Fire)

**Fire** `[LVL 1] [PRIMARY] [MAGIC]`
- MP: 1 | Dano (2d6 + INT). Aplica/mantém **Astral Fire** por 3 turnos. 
- Em Astral Fire: +1d6 de dano extra, mas MP adicional gasto.
- Foundry: `damage: "2d6", mpCost: 1, effect: "astral_fire_3t", bonus_in_AF: "+1d6"`

**Fire III** `[LVL 12] [PRIMARY] [MAGIC]`
- MP: 2 | Dano (3d6 + INT). Instantaneamente aplica **Astral Fire III** (máximo, 3 pilhas). Sempre obtém o efeito máximo.
- Foundry: `damage: "3d6", mpCost: 2, effect: "astral_fire_max"`

**Fire IV** `[LVL 20] [PRIMARY] [MAGIC]`
- MP: 0 *(free em Astral Fire)* | Req: Astral Fire ativo | Dano (4d6 + INT).
- Disponível somente durante Astral Fire. Cada uso gera 1 **Umbral Heart** (máx 3 — protege contra alto custo de Flare).
- Foundry: `requires: "astral_fire_active"`, `damage: "4d6"`, `effect: "+1_umbral_heart"`

**Flare** `[LVL 15] [PRIMARY] [MAGIC] [AOE]`
- MP: All remaining | Req: Astral Fire | RANGE: AOE círculo 2 tiles
- *Explosão de fogo máxima — usa TODA a MP restante.*
- Efeito: Dano (4d6 + INT) em AOE círculo 2 tiles. Gasta todo o MP. Cada **Umbral Heart** reduz o custo em 1 MP.
- Foundry: `spendAllMP: true, aoeShape: "circle", aoeSize: 2, damage: "4d6"`

---

### Magias de Gelo (Umbral Ice)

**Blizzard** `[LVL 1] [PRIMARY] [MAGIC]`
- MP: 1 | Dano (1d6 + INT). Muda para **Umbral Ice** por 3 turnos.
- Foundry: `damage: "1d6"`, `effect: "umbral_ice_3t"`

**Blizzard III** `[LVL 10] [PRIMARY] [MAGIC]`
- MP: 1 | Dano (2d6 + INT). Aplica **Umbral Ice III** (máximo) imediatamente.
- Foundry: `damage: "2d6"`, `effect: "umbral_ice_max"`

**Blizzard IV** `[LVL 20] [PRIMARY] [MAGIC]`
- MP: 0 *(free em Umbral Ice)* | Req: Umbral Ice | Dano (2d6 + INT) + gera 3 **Umbral Hearts**.
- Foundry: `requires: "umbral_ice_active"`, `damage: "2d6"`, `effect: "+3_umbral_hearts"`

**Freeze** `[LVL 25] [PRIMARY] [MAGIC] [AOE]`
- MP: 0 *(free em Umbral Ice)* | AOE círculo 2 tiles | Req: Umbral Ice
- Dano (2d6 + INT) AOE. Aplica **Bind** (alvo não move por 1 turno) em todos atingidos.
- Foundry: `requires: "umbral_ice_active"`, `aoeShape: "circle"`, `aoeSize: 2`, `effect: "bind_1t_all"`

---

### Magias de Raio (DoT) e Especiais

**Thunder III** `[LVL 5] [PRIMARY] [MAGIC+DOT]`
- MP: 2 | Dano (2d6 + INT) + DoT Raio (2d4 por Round-Up por 3 turnos).
- Em Direct Hit: DoT duração dobrada (6 turnos).
- Foundry: `damage: "2d6"`, `dot: "2d4_lightning_3t"`, `crit_effect: "dot_duration_x2"`

**Xenoglossy** `[LVL 20] [PRIMARY] [MAGIC]`
- Polyglot: 1 | Dano muito alto (5d6 + INT). Sem restrição elemental — ignora estados AF/UI. Instant.
- Foundry: `damage: "5d6"`, `isInstant: true`, `cost: {polyglot: 1}`

**Paradox** `[LVL 25] [PRIMARY] [MAGIC]`
- MP: 0 | Req: Astral Fire III + ter entrado por Blizzard transição
- *O paradoxo — gerado pela transição perfeita entre estados.*
- Efeito: Dano (4d6 + INT). Disponível ao fazer a transição AF→UI perfeita.
- Foundry: `requires: "transition_state_perfect"`, `damage: "4d6"`

**Amplifier** `[LVL 15] [SECONDARY]`
- MP: 0 | Ganha 1 **Polyglot** instantaneamente.
- Foundry: `effect: "+1_polyglot"`

**Leylines** `[LVL 10] [SECONDARY]`
- MP: 1 | Coloca zona 2×2 no mapa
- *Canais de éter no chão — Black Mage dentro faz magias mais rápidas.*
- Efeito: Zona de Leylines de 2×2. Black Mage dentro: pode usar Primary Actions extras (+1 magia de fogo/gelo por turno enquanto dentro da zona). Dura 3 turnos.
- Foundry: `placeZone: "leylines"`, `effect: "extra_spell_action_inside_zone"`, `duration: 3`

**Transpose** `[LVL 5] [SECONDARY]`
- MP: 0 | Troca instantaneamente o estado elemental (AF → UI ou UI → AF).
- Foundry: `effect: "swap_elemental_state"`

**Sleep** `[LVL 1] [PRIMARY] [MAGIC+DEBUFF]`
- MP: 1 | TARGET: Single Enemy
- Aplica **Sleep** (inimigo não pode agir por 1 turno; cancela se receber dano).
- Foundry: `effect: "sleep_1t_until_hit"`

---

## 🌟 SUMMONER

**Papel:** DPS mágico versátil — invocações poderosas e dano elemental
**Stat Principal:** INT
**Arma:** Book / Scepter (livro de invocação)
**Recurso Especial:** ☀️ **Aethercharge** + Fases de invocação (Carbuncle → Egi → Demi-Bahamut/Phoenix)

---

### Ataques Base

**Ruin** `[LVL 1] [PRIMARY] [MAGIC]`
- MP: 1 | Dano (2d6 + INT). Req: nenhuma invocação ativa.
- Foundry: `damage: "2d6", mpCost: 1`

**Ruin II** `[LVL 5] [PRIMARY] [MAGIC]`
- MP: 1 | Dano (2d6+1 + INT). Disponível em qualquer momento.
- Foundry: `damage: "2d6+1", mpCost: 1`

**Outburst** `[LVL 10] [PRIMARY] [MAGIC] [AOE]`
- MP: 1 | AOE círculo 2 tiles | Dano (2d6 + INT) em todos inimigos na área.
- Foundry: `aoeShape: "circle"`, `aoeSize: 2`, `damage: "2d6"`

**Physick** `[LVL 4] [SECONDARY] [HEAL]`
- MP: 1 | Cura (1d6 + MND). Cura de emergência do Summoner.
- Foundry: `heal: "1d6", mpCost: 1`

**Resurrection** `[LVL 12] [PRIMARY] [SPECIAL]`
- MP: 3 | Revive aliado com 25% HP. Equal ao Raise dos Healers.
- Foundry: `effect: "revive_25percent_hp", mpCost: 3`

---

### 🔮 Sistema de Egis (Fases de Invocação)

**Aethercharge** `[LVL 1] [SECONDARY]`
- MP: 0 | RANGE: Self | TARGET: Self
- *Ativa o ciclo de invocações — começa a sequência de Egi.*
- Efeito: Ganha as 3 Arcana: **Ruby** (Fire/Ifrit), **Topaz** (Earth/Titan), **Emerald** (Wind/Garuda). Cada Arcana pode invocar 1 Egi. Também amplia Ruin/Outburst em +1d6 por 3 turnos.
- Foundry: `grantArcana: ["ruby", "topaz", "emerald"]`, `effect: "ruin_boost_+1d6_3t"`

**Summon Ruby (Ifrit-Egi)** `[LVL 8] [SECONDARY] [PET]`
- Arcana: Ruby | Dura 4 ações
- Efeito: Invoca Ifrit-Egi. O Summoner pode usar:
  - **Ruby Ruin** (Primary): Dano Fogo (3d6 + INT)
  - **Ruby Rite** (Secondary): AOE Fogo círculo 2 tiles (2d6)
- Foundry: `summonEgi: "ruby"`, `unlocks: ["ruby_ruin", "ruby_rite"]`

**Summon Topaz (Titan-Egi)** `[LVL 10] [SECONDARY] [PET]`
- Arcana: Topaz | Dura 4 ações
- Efeito: Invoca Titan-Egi:
  - **Topaz Ruin** (Primary): Dano Terra (3d6 + INT) com splash adjacente (1d6)
  - **Titan's Favor** (Instant): +2 Defense por 1 turno (mitigation aciona automaticamente ao receber dano)
- Foundry: `summonEgi: "topaz"`, `unlocks: ["topaz_ruin", "titans_favor_instant"]`

**Summon Emerald (Garuda-Egi)** `[LVL 12] [SECONDARY] [PET]`
- Arcana: Emerald | Dura 4 ações
- Efeito: Invoca Garuda-Egi:
  - **Emerald Ruin** (Primary): Dano Vento (2d6 + INT) 3x rápido (3 rolls menores)
  - **Emerald Rite** (Secondary): AOE Vento cone (2d6)
- Foundry: `summonEgi: "emerald"`, `unlocks: ["emerald_ruin", "emerald_rite"]`

---

### 🐉 Demi-Invocações

**Summon Demi-Bahamut** `[LVL 20] [SECONDARY] [PET]`
- MP: 0 | Req: Todas as 3 Arcanas gastas (ciclo completo) | Dura 3 turnos
- *Invoca o Demi-Bahamut — a invocação mais icônica do Summoner.*
- Efeito: Demi-Bahamut age na Enemy Phase (como aliado). A cada Round-Up Phase, usa **Wyrmwave** (dano Unaspected 3d6 no inimigo). No último turno, usa **Akh Morn** (AOE 5d6 em 2 tiles raio).
- Foundry: `spawnDemi: "bahamut"`, `wyrmwave: "3d6_per_roundup"`, `finalAction: "akh_morn_5d6_aoe"`

**Summon Demi-Phoenix** `[LVL 25] [SECONDARY] [PET]`
- MP: 0 | Req: Ciclo completo após Bahamut | Dura 3 turnos
- *A Fênix cura E ataca — a invocação de cura do Summoner.*
- Efeito: A cada Round-Up Phase, Demi-Phoenix usa **Fountain of Fire** (dano Fire 3d6) E **Scarlet Flame** (cura 1d6 em aliado com menor HP). No último turno, **Revelation** (AOE Holy 5d6, cura todos aliados 2d6).
- Foundry: `spawnDemi: "phoenix"`, `roundup: "fountain_3d6 + scarlet_1d6_heal"`, `finalAction: "revelation_aoe"`

**Searing Light** `[LVL 20] [SECONDARY] [BUFF] [AOE]`
- MP: 1 | Party em 4 tiles — +1d4 dano em todos os ataques por 2 turnos.
- Foundry: `effect: "party_damage_+1d4_2t"`, `aoeSize: 4`

---

# 🌟 HABILIDADES DE LIMIT BREAK (Compartilhadas)

> Limit Breaks são habilidades de grupo — qualquer personagem do papel adequado pode usar (por consenso da party). Consomem 1, 2 ou 3 cargas do **Limit Break Gauge** compartilhado.

| Papel | LB Lv.1 | LB Lv.2 | LB Lv.3 |
|-------|---------|---------|---------|
| **Tank** | **Shield Wall** — Party –25% dano por 1 turno | **Stronghold** — Party –40% dano por 1 turno | **Last Bastion** — Party **invulnerável** por 1 turno |
| **Healer** | **Healing Wind** — Cura party (2d6 HP) | **Breath of the Earth** — Cura party (4d6 HP + Regen 3t) | **Pulse of Life** — **Revive toda a party** com 50% HP |
| **Melee DPS** | **Braver** — Single 6d6 Physical | **Bladedance** — Single 10d6 Physical | **Final Heaven** — Single **16d6** Physical (a mais alta do jogo) |
| **Phys Ranged** | **Big Shot** — Single 5d6 Physical | **Desperado** — AOE círculo 3 raio, 4d6 | **Sagittarius Arrow** — Single Long Range **14d6** Physical |
| **Magic DPS** | **Skyshard** — AOE magic 4d6 círculo 2 tiles | **Starstorm** — AOE magic 6d6 círculo 3 tiles | **Meteor** — AOE catastrófico **10d6** — todo o campo de batalha |

---

# 👹 HABILIDADES DE INIMIGOS

> Os inimigos do FFXIV TTRPG são categorizados por **Tier** (nível de ameaça) e **Tipo de AOE**.
> Cada inimigo tem HP/Defense próprios e um **padrão de ataque** pré-definido.

---

## Tipos de Inimigos

| Tipo | HP | Características |
|------|-----|----------------|
| **Minion** | Baixo (2-10) | Weak, attack in groups, simple AI |
| **Standard** | Médio (15-40) | Moderate damage, 1-2 abilities |
| **Elite** | Alto (40-80) | Multiple mechanics, enhanced AOE patterns |
| **Boss** | Muito alto (80-200+) | Phase-based, complex AOE, Enrage timer |

---

## Habilidades Genéricas de Inimigos

### Ataques Físicos Básicos

**Basic Attack (Melee)** `[PRIMARY] [PHYS]`
- RANGE: Melee | TARGET: Combatant with highest Enmity
- Efeito: Dano físico (X d6 + nível do inimigo) ao alvo de maior Enmity.
- Foundry: `damage: "NdM", target: "highest_enmity"`

**Basic Attack (Ranged)** `[PRIMARY] [PHYS]`
- RANGE: Long | TARGET: Qualquer adventurer na LOS
- Efeito: Dano físico (X d6) ao alvo. Inimigos ranged.
- Foundry: `damage: "NdM"`, `range: "long"`

### AOE de Aviso (Telegrafados)

> No FFXIV TTRPG, ataques de área de boss são **anunciados** na fase do inimigo com marcadores visuais, e **resolvem no Round-Up Phase**. Players têm 1 turno para escapar.

**Circle AOE** `[ENEMY PHASE] → [RESOLVE: ROUND-UP]`
- Coloca marcador de círculo vermelho em X tiles do grid
- Round-Up: Todos os adventurers no círculo recebem dano (X d6)
- *Foundry: Desenha círculo translúcido vermelho no canvas; resolve automaticamente no Round-Up*

**Line AOE (Cleave)** `[ENEMY PHASE] → [RESOLVE: ROUND-UP]`
- Linha vermelha do inimigo até um alvo (ou numa direção)
- Round-Up: Todos na linha recebem dano
- *Foundry: Desenha linha no canvas com direção do boss*

**Cone AOE (Front Cleave)** `[ENEMY PHASE] → [RESOLVE: ROUND-UP]`  
- Cone vermelho na direção que o inimigo está virado
- Round-Up: Todos no cone recebem dano
- *Foundry: Cone rotacionado na facing direction do token inimigo*

**Donut AOE** `[ENEMY PHASE] → [RESOLVE: ROUND-UP]`
- Anel vermelho ao redor do inimigo — **centro é seguro**
- Round-Up: Todos no anel (fora do centro, dentro do limite externo) tomam dano
- *Foundry: Dois círculos concêntricos — externo vermelho, interno verde (safe zone)*

**Cardinal Cross** `[ENEMY PHASE] → [RESOLVE: ROUND-UP]`
- Quatro linhas saindo do inimigo nas 4 direções cardinais (N/S/L/O)
- Round-Up: Todos em qualquer das 4 linhas recebem dano
- *Foundry: Cruz formada por 4 linhas no canvas + 4 tiles diagonais são Safe Zones*

**Stack Marker** `[ENEMY PHASE] → [RESOLVE: ROUND-UP]`
- Marcador azul em um adventurer específico — indica Stack (empilhar)
- Efeito: Se todos os aliados estiverem adjacentes ao alvo no Round-Up, o dano é dividido pela party (ex: 10d6 ÷ 4 = 2-3d6 cada)
- *Foundry: Círculo azul brilhante no token alvo — incentiva grouping*

**Spread Marker** `[ENEMY PHASE] → [RESOLVE: ROUND-UP]`
- Marcadores em **múltiplos** ou **todos** os adventurers
- Efeito: Se 2 adventurers com marker estiverem adjacentes, ambos recebem +50% dano extra
- *Foundry: Círculos laranjas em cada token afetado — incentiva spreading*

---

## Habilidades de Inimigos — Debuffs e Mecânicas Especiais

**Bind** `[INSTANT] [DEBUFF]`
- TARGET: 1 adventurer | Duração: 1-2 turnos
- Efeito: Alvo não pode se mover pelo próximo turno (ainda pode usar Primary/Secondary Actions normalmente).
- Foundry: `effect: "bind_no_movement_Xt"`

**Silence** `[DEBUFF]`
- Efeito: Alvo não pode usar habilidades de categoria MAGIC pelo próximo turno.
- Foundry: `effect: "silence_no_magic_1t"`

**Slow** `[DEBUFF]`
- Efeito: Reduz o Speed do alvo em –2 tiles por 2 turnos.
- Foundry: `effect: "speed_-2_2t"`

**Poison** `[DOT]`
- Efeito: Alvo recebe 1d4 de dano no Round-Up Phase por 3 turnos.
- Foundry: `dot: "1d4_3t_roundup"`

**Vulnerability Up** `[DEBUFF]`
- Efeito: Alvo recebe +25% de dano de todas as fontes por 2 turnos.
- Foundry: `effect: "damage_received_+25percent_2t"`

**Bleed** `[DOT]`
- Efeito: Dano físico 1d6 no Round-Up por 2 turnos. Não afetado por Magic Defense.
- Foundry: `dot: "physical_1d6_2t"`

**Doom** `[DEBUFF + DEATH]`
- Efeito: Contador regressivo de 2 turnos. Se não for curado 100% HP antes do Round-Up do 2º turno → KO instantâneo.
- Foundry: `effect: "doom_2t_heal_to_full_or_ko"`

**Enrage** `[PASSIVE — BOSS ONLY]`
- Efeito: Após X rodadas (definido pelo GM), o boss ativa **Enrage** — começa a usar Basic Attack em todos os adventurers a cada Enemy Phase. O dano sobe +50% por turno até TPK.
- Foundry: `passiveTrigger: "round_>_X"`, `effect: "enrage_escalating_damage"`

---

## Exemplos de Padrão de Boss (GM Reference)

### Padrão: Boss Básico (Starter Set Level 20)

**Turno 1 (Fase Inimigo):**
- Usa Basic Melee Attack no maior Enmity
- Coloca **Circle AOE** de 2 tiles num adventurer aleatório → resolve Round-Up

**Turno 2 (Fase Inimigo):**
- Usa **Cleave (Front Line AOE)** em cone frontal → resolve Round-Up
- Usa Basic Melee Attack no maior Enmity

**Turno 3 (Fase Inimigo — se HP < 50%):**
- Ativa **Phase 2**: usa **Cardinal Cross AOE** (players precisam ir para as diagonais) → resolve Round-Up
- Dano aumentado (+1d6 em todos os ataques)

**Round-Up Phase (todo turno):**
- Ativa todos os AOEs pendentes
- Aplica/avança DoTs nos adventurers afetados

---

*Documento gerado em: 03/03/2026 — baseado em Player Book + Gamemaster Book FFXIV TTRPG*
*Para implementação em Foundry VTT, use as tags `Foundry:` como referência de propriedades para o sistema.*


