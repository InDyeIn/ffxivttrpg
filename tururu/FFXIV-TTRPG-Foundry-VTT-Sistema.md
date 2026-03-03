# FFXIV TTRPG — Sistema Foundry VTT
## Documento de Planejamento Completo v1.0

> **Baseado em:** Final Fantasy XIV TTRPG — Player Book (Guia do Jogador) + Gamemaster Book (Guia do Mestre)  
> **Referências de desenvolvimento:** DnD5e, Pathfinder 2e, Lancer (Foundry VTT)

---

## 📋 Índice

1. [Visão Geral do Sistema](#visão-geral)
2. [Estrutura de Arquivos (Foundry VTT)](#estrutura-de-arquivos)
3. [Data Models](#data-models)
4. [Raças (Tribes)](#raças)
5. [Jobs (Classes)](#jobs)
6. [Mecânicas de Combate](#mecânicas-de-combate)
7. [Sistema de Habilidades](#sistema-de-habilidades)
8. [Equipamento e Itens](#equipamento-e-itens)
9. [Automação](#automação)
10. [HUD e Interface](#hud-e-interface)
11. [Compendios](#compendios)
12. [Plano de Implementação](#plano-de-implementação)

---

## 🌍 Visão Geral do Sistema

### Filosofia do Sistema
O FFXIV TTRPG é um sistema d20 oficial da Square Enix que recria fielmente o MMORPG Final Fantasy XIV em formato de RPG de mesa. Diferentemente de D&D 5e, o sistema prioriza:
- **Combate em grid** com marcadores de AOE que resolvem em fases
- **Papéis de grupo definidos** (Tank, Healer, DPS) com mecânicas específicas como Enmity
- **Sistema de Jobs** fixo ao invés de multiclassing livre
- **Sem permadeath**: party wipe = reset da fase de batalha
- **Sem rests**: HP/MP se restaura completamente fora de combate

### Dados Utilizados
| Dado | Uso |
|------|-----|
| d20  | Checks e ataques (precisão) |
| d6   | Dano e efeitos aleatórios |

### Estrutura de Turno
```
FASE DE ADVENTURER → FASE DE INIMIGO → ROUND-UP PHASE (efeitos de área)
```

---

## 📁 Estrutura de Arquivos (Foundry VTT)

```
ffxiv-ttrpg/                          ← pasta do sistema em /Data/systems/
├── system.json                        ← manifest principal do sistema
├── template.json                      ← templates de Actor e Item
├── ffxiv.js                          ← entry point principal
│
├── module/
│   ├── documents/
│   │   ├── actor.mjs                 ← FfxivActor (lógica de personagens/inimigos)
│   │   └── item.mjs                  ← FfxivItem (habilidades, equipamentos, etc.)
│   ├── sheets/
│   │   ├── actor-sheet.mjs           ← Sheet principal do personagem
│   │   ├── enemy-sheet.mjs           ← Sheet do inimigo (GM)
│   │   └── item-sheet.mjs            ← Sheet de habilidade/item
│   ├── data/
│   │   ├── actor-data.mjs            ← Definições de DataModel para Actor
│   │   ├── item-data.mjs             ← Definições de DataModel para Item
│   │   └── job-data.mjs              ← Dados de Jobs (habilidades, progressão)
│   ├── helpers/
│   │   ├── dice.mjs                  ← Lógica de rolagem (d20+attr, Direct Hit, Crit)
│   │   ├── chat-message.mjs          ← Formatação de mensagens de chat
│   │   ├── combat.mjs                ← Lógica de combate (fases, AOE markers)
│   │   ├── effects.mjs               ← Active Effects (buffs/debuffs)
│   │   └── macros.mjs                ← Macros úteis
│   ├── hud/
│   │   ├── combat-hud.mjs            ← HUD de combate inspirado no Argon
│   │   ├── action-bar.mjs            ← Barra de habilidades rápida
│   │   └── aoe-marker.mjs            ← Sistema de marcadores de AOE no canvas
│   └── apps/
│       ├── limit-break-tracker.mjs   ← Tracker de Limit Break do grupo
│       └── enmity-tracker.mjs        ← Tracker de Enmity por inimigo
│
├── templates/
│   ├── actors/
│   │   ├── adventurer-sheet.hbs      ← Template Handlebars da ficha
│   │   └── enemy-sheet.hbs
│   ├── items/
│   │   ├── ability-sheet.hbs         ← Habilidades (Primary/Secondary/Instant)
│   │   ├── weapon-sheet.hbs
│   │   └── armor-sheet.hbs
│   └── chat/
│       ├── roll-card.hbs             ← Card de rolagem no chat
│       └── ability-card.hbs          ← Card de uso de habilidade
│
├── packs/                            ← Compendios
│   ├── races.db                      ← As 7 raças
│   ├── jobs.db                       ← 13 jobs com todas as habilidades
│   ├── abilities.db                  ← Todas as habilidades por job/nível
│   ├── weapons.db                    ← Armas padrão
│   ├── armors.db                     ← Armaduras padrão
│   ├── consumables.db                ← Poções, Ethers, Phoenix Down
│   ├── enemies.db                    ← Inimigos pré-feitos (do GM Book)
│   └── macros.db                     ← Macros de automação
│
├── styles/
│   └── ffxiv.css                     ← Estilo visual inspirado na UI do FFXIV
│
└── lang/
    ├── pt-BR.json                    ← Português do Brasil
    └── en.json                       ← Inglês
```

---

## 🧩 Data Models

### Actor: Adventurer (Personagem Jogador)

```javascript
// template.json — Actor type: "adventurer"
{
  "attributes": {
    "str": { "value": 0 },           // Força — dano físico (Tank/Melee DPS)
    "dex": { "value": 0 },           // Destreza — dano físico ranged (Bard, Ninja, Machinist, Dancer)
    "vit": { "value": 0 },           // Vitalidade — afeta Max HP
    "int": { "value": 0 },           // Inteligência — dano mágico (DPS mágico)
    "mnd": { "value": 0 }            // Mente — cura e magias de suporte (Healer)
  },
  "derived": {
    "hp": { "value": 0, "max": 0 },  // HP atual / máximo
    "mp": { "value": 5, "max": 5 },  // MP atual / máximo (padrão: 5 MP)
    "defense": { "value": 0 },       // Defesa física (dificuldade para acertar com Phys)
    "magicDefense": { "value": 0 },  // Defesa mágica (dificuldade para acertar com Magic)
    "speed": { "value": 3 },         // Quadrados de movimento por turno
    "vigilance": { "value": 0 }      // Percepção passiva (pré-calculada)
  },
  "profile": {
    "race": "",                       // ID da raça (Hyur, Elezen, etc.)
    "tribe": "",                      // Variante da raça (ex: Midlander/Highlander)
    "job": "",                        // Job atual (Paladin, Warrior, etc.)
    "level": 1,                       // Nível atual (1-60)
    "xp": 0                          // XP (ou milestone system)
  },
  "traits": [],                       // Profile Traits (vantagem em checks específicos)
  "biography": "",
  "limitBreak": {
    "value": 0,                       // Compartilhado pelo grupo (via TokenHUD ou app)
    "max": 3
  },
  "enmity": {                         // Usado pelo Tank
    "active": false,
    "target": null
  },
  "statusEffects": [],               // Lista de status ativos (Poison, Bind, etc.)
  "actions": {
    "primary": true,                  // Ação primária disponível
    "secondary": true,                // Ação secundária disponível
    "instant": true,                  // Instant disponível
    "movement": true                  // Movimento disponível
  }
}
```

### Actor: Enemy (Inimigo/NPC)

```javascript
// template.json — Actor type: "enemy"
{
  "hp": { "value": 0, "max": 0 },
  "defense": { "value": 0 },
  "magicDefense": { "value": 0 },
  "speed": { "value": 3 },
  "level": 1,
  "role": "standard",                // standard | elite | minion | boss
  "size": "medium",                  // small | medium | large | huge | gargantuan
  "enemyType": "humanoid",          // humanoid | beast | undead | primal | etc.
  "aoeMarkers": [],                  // Marcadores AOE ativos (resolvem no Round-Up)
  "abilities": [],                   // Habilidades do inimigo
  "enmityList": {},                  // {actorId: valor} — quem tem mais hate
  "loot": []
}
```

### Item Types

| Tipo | Descrição |
|------|-----------|
| `ability` | Habilidade de Job (Primary/Secondary/Instant/Limit Break) |
| `weapon` | Arma equipada (bônus de ataque e dano) |
| `armor` | Armadura/acessório (bônus de defesa) |
| `consumable` | Poção, Ether, Phoenix Down, etc. |
| `trait` | Profile Trait (vantagem em checks) |
| `status` | Efeito de status (Poison, Bind, Slow, etc.) |

### Item: Ability

```javascript
{
  "type": "ability",
  "system": {
    "job": "blackmage",              // Job dono desta habilidade
    "level": 1,                      // Nível de desbloqueio
    "actionType": "primary",         // primary | secondary | instant | limit_break
    "category": "magic",             // physical | magic | unique | heal
    "mpCost": 0,                     // Custo em MP (0 = sem custo)
    "range": "melee",                // melee | short | medium | long | self | aoe
    "target": "single",             // single | aoe | self | ally | all_allies
    "aoeShape": null,               // null | circle | cone | line | cross
    "aoeSize": 0,                    // em quadrados (tiles)
    "aoeDelay": 0,                   // rounds antes de resolver (0 = imediato)
    "damage": {
      "formula": "2d6",
      "type": "fire"                 // physical | fire | ice | wind | earth | lightning | water | dark | holy | unaspected
    },
    "heal": {
      "formula": "0"
    },
    "effects": [],                   // Active Effects aplicados ao usar
    "trigger": null,                 // Condição para Instant (ex: "quando aliado toma dano")
    "combo": {
      "from": null,                  // Habilidade anterior no combo
      "bonus": null                  // Efeito extra quando parte de combo
    },
    "proc": {
      "condition": null,             // Condição para o proc
      "effect": null                 // Efeito do proc
    },
    "limitBreakLevel": 0,            // 1 | 2 | 3 (se for Limit Break)
    "description": "",
    "flavorText": ""
  }
}
```

---

## 🧬 Raças

O sistema possui **7 raças** com **2 variantes (tribes)** cada. As raças têm diferenças cosméticas e pequenas variações nos atributos iniciais, mas não afetam significativamente o combate.

| Raça | Tribe 1 | Tribe 2 | Bônus Atributo |
|------|---------|---------|----------------|
| **Hyur** | Midlander | Highlander | STR/VIT (Midlander: balanced) |
| **Elezen** | Wildwood | Duskwight | DEX/INT |
| **Lalafell** | Plainsfolk | Dunesfolk | DEX/MND |
| **Miqo'te** | Seekers of the Sun | Keepers of the Moon | STR/DEX ou DEX/MND |
| **Roegadyn** | Sea Wolf | Hellsguard | STR/VIT ou VIT/MND |
| **Viera** | Rava | Veena | DEX/MND |
| **Hrothgar** | Helions | The Lost | STR/VIT |

### Implementação no Foundry
- Cada raça como **Item tipo "race"** no compendio
- Ao arrastar a raça para a ficha, aplica automaticamente os bônus de atributo
- Trait de raça automático: "+1 dado de vantagem em [check específico]"

---

## ⚔️ Jobs (Classes)

### 13 Jobs Disponíveis (A Realm Reborn + Heavensward, nível até 60)

#### 🛡️ Tanks
Tanks utilizam **Enmity** — mecânica que garante que o inimigo os ataque preferencialmente. Primariamente usam **STR** para dano. Alta Defense.

**Paladin**
- Papel: Tank com suporte e mitigation
- Stat Principal: STR
- Habilidades Chave:
  - `Cover` (Instant): Interpõe-se para proteger um aliado, recebendo o dano no lugar
  - `Bulwark` (Secondary): +X Defense por 1 turno
  - `Holy Spirit` (Primary, Magic): Ataque mágico Holy, usado quando tiver espada+escudo
  - `Clemency` (Primary, Heal): Cura único (Paladin pode curar em emergências)
  - `Circle of Scorn` (Primary, AOE): AOE ao redor do Paladin com DoT
  - `Sword Oath` / `Shield Oath` (Secondary): Alterna entre modo ataque e modo defesa

**Warrior**
- Papel: Tank com alto dano e self-sustain
- Stat Principal: STR  
- Recurso Especial: **Beast Gauge** (acumula durante combate)
- Habilidades Chave:
  - `Tomahawk` (Primary): Ataque de longo alcance para iniciar e manter Enmity
  - `Upheaval` (Secondary): Usa Beast Gauge para dano extra
  - `Inner Release` (Secondary): Modo poderoso — habilidades não custam Beast Gauge
  - `Nascent Flash` (Instant): Auto-cura baseada no dano causado
  - `Shake It Off` (Secondary): AOE of mitigation para toda a party

**Dark Knight**
- Papel: Tank com dano mágico e gerenciamento de MP
- Stat Principal: STR
- Recurso Especial: **Darkside** (gasta MP para aumentar dano)
- Habilidades Chave:
  - `Living Shadow` (Secondary): Invoca uma sombra que ataca independentemente
  - `Dark Mind` (Instant): Reduz dano mágico recebido
  - `The Blackest Night` (Instant): Escudo para aliado; quando quebra, ganha MP
  - `Plunge` (Secondary): Dash de ataque, atravessa o campo de batalha
  - `Salted Earth` (Primary, AOE): Cria zona de dano persistente no grid

---

#### 💚 Healers  
Healers usam **MND** como stat principal. Responsáveis por restaurar HP e aplicar buffs/regen.

**White Mage**
- Papel: Healer puro, maior poder de cura bruta
- Stat Principal: MND
- Recurso Especial: **Lily** (acumula ao curar, gasta para curas grátis)
- Habilidades Chave:
  - `Cure` / `Cure II` / `Cure III` (Primary, Heal): Cura básica → cura grande → cura AOE
  - `Regen` (Secondary): HoT (heal over time) em um aliado
  - `Medica` / `Medica II` (Primary, Heal): Cura todos os aliados próximos
  - `Asylum` (Secondary, AOE): Cria zona de cura no grid
  - `Assize` (Primary): Cura E dano — recupera MP
  - `Plenary Indulgence` (Secondary): Amplifica a próxima cura da Lily

**Scholar**
- Papel: Healer tático com escudos e pet (Faerie)
- Stat Principal: MND  
- Recurso Especial: **Aetherflow** (MP extra para habilidades especiais) + **Faerie**
- Habilidades Chave:
  - `Adloquium` (Primary, Heal): Cura + aplica **Galvanize Shield** (absorve dano)
  - `Succor` (Primary, Heal, AOE): Cura AoE + Catalyze Shield em todos
  - `Summon Eos` / `Summon Selene` (Secondary): Invoca Faerie que cura automaticamente
  - `Fey Illumination` (Instant): Faerie aplica buff de Magic Defense na party
  - `Deployment Tactics` (Instant): Espalha o escudo de um aliado para todos ao redor
  - `Aetherflow` (Secondary): Recupera 3 cargas de Aetherflow

**Astrologian**
- Papel: Healer de suporte com buffs de Cards
- Stat Principal: MND
- Recurso Especial: **Arcanum Cards** — joga cartas que concedem buffs à party
- Habilidades Chave:
  - `Benefic` / `Benefic II` (Primary, Heal): Cura básica e cura com chance de Crit
  - `Helios` (Primary, Heal, AOE): Cura todos os aliados
  - `Draw` (Secondary): Compra uma carta aleatória
  - `Play` (Secondary): Joga uma carta — cada carta tem efeito diferente:
    - The Balance: +STR/INT (dano físico/mágico)
    - The Arrow: +DEX/SPD
    - The Spire: +VIT
    - The Ewer: +MND / regenera MP
    - The Bole: +Defense
    - The Spear: +Crit rate
  - `Divination` (Secondary, AOE): Buff de dano para toda a party
  - `Earthly Star` (Secondary, AOE): Coloca uma estrela no grid — detona para cura/dano

---

#### ⚔️ Melee DPS

**Monk**
- Papel: DPS físico corpo a corpo, alta velocidade de ação
- Stat Principal: STR
- Recurso Especial: **Chakra** (acumula, gasta para habilidades poderosas)
- Mecânica Especial: **Positional Attacks** — bônus de dano atacando pelo flanco/costas
- Habilidades Chave:
  - `Bootshine` → `True Strike` → `Snap Punch` (combo de 3): Combo base
  - `Twin Snakes` → `Demolish`: Combo alternativo com buffs
  - `Six-Sided Star` (Primary): Dano alto, aumenta Movement por 1 turno
  - `Perfect Balance` (Secondary): Próximas habilidades contam como se começassem combo
  - `Riddle of Fire` (Secondary): +dano por X turnos
  - Meditação (Secondary): Recupera Chakra

**Dragoon**
- Papel: DPS físico corpo a corpo, foco em saltos e lances
- Stat Principal: STR
- Mecânica Especial: **Jumps** — habilidades de salto ignoram terreno, causam dano ao pousar
- Habilidades Chave:
  - `True Thrust` → `Vorpal Thrust` → `Full Thrust` (combo de 3): Combo base
  - `Chaos Thrust` → `Phlebotomize`: Combo alternativo com DoT
  - `Jump` (Primary): Salta em um inimigo a distância média, ignora colliders
  - `Spineshatter Dive` (Primary): Salta com AOE ao pousar
  - `Dragon Sight` (Secondary): "Bond" com aliado — ambos ganham +dano
  - `Dragonfire Dive` (Primary, AOE): Dano em área grande ao pousar

**Ninja**
- Papel: DPS físico ágil com debuffs e Ninjutsus
- Stat Principal: DEX
- Recurso Especial: **Mudras** — combinações de 3 sinais que criam Ninjutsus únicos
- Mecânica: **Trick Attack** — debuffa inimigo para receber mais dano da party
- Habilidades Chave:
  - `Spinning Edge` → `Gust Slash` → `Aeolian Edge` (combo): Combo base
  - `Mudra` (Secondary): Ativa modo Mudra. Usar 3 Mudras em sequência:
    - Ten + Chi + Jin = **Hyoton** (Ice, single)
    - Ten + Jin + Chi = **Huton** (Wind, buff de velocidade)
    - Chi + Ten = **Katon** (Fire, AOE)
    - Jin + Chi = **Raiton** (Thunder, single high damage)
  - `Trick Attack` (Primary): Aplica debuff Vulnerability ao inimigo
  - `Bunshin` (Secondary): Cria sombra que replica ataques

**Samurai**
- Papel: DPS físico de alto dano com medidores duplos
- Stat Principal: STR
- Recurso Especial: **Sen** (3 tipos: Setsu/Getsu/Ka) + **Kenki**
- Habilidades Chave:
  - `Hakaze` → `Jinpu` / `Shifu` (bifurcação): Combo base com buffs
  - `Iaijutsu` (Primary): Gasta Sen acumulados — efeito depende de quantos Sen:
    - 1 Sen = **Higanbana** (DoT)
    - 2 Sen = **Tenka Goken** (AOE)
    - 3 Sen = **Midare Setsugekka** (dano máximo single)
  - `Tsubame-gaeshi` (Instant): Repete o último Iaijutsu instantaneamente
  - `Meikyo Shisui` (Secondary): Próximas habilidades não precisam de combo

---

#### 🏹 Physical Ranged DPS

**Bard**
- Papel: DPS físico de longo alcance + suporte de grupo via Songs
- Stat Principal: DEX
- Recurso Especial: **Songs** — músicas que concedem buffs passivos à party durante combate
- Habilidades Chave:
  - `Heavy Shot` → `Straight Shot` (combo): Combo base
  - `Mage's Ballad` (Secondary): Música — buffa party com regen de MP
  - `Army's Paeon` (Secondary): Música — buffa velocidade de ataque
  - `The Wanderer's Minuet` (Secondary): Música — habilita Pitch Perfect (dano burst)
  - `Apex Arrow` (Primary): Dano baseado na Soul Voice Gauge acumulada
  - `Troubadour` (Instant): Party-wide damage reduction

**Machinist**
- Papel: DPS físico de longo alcance com turrets e ferramentas mecânicas
- Stat Principal: DEX
- Recurso Especial: **Heat Gauge** + **Battery Gauge**
- Habilidades Chave:
  - `Split Shot` → `Slug Shot` → `Clean Shot` (combo): Combo base
  - `Turret Queen` (Secondary): Implanta uma turret que ataca autonomamente (Battery)
  - `Wildfire` (Secondary): Aplica wildfire no inimigo — explode ao final causando dano massivo
  - `Hypercharge` (Secondary): Converte Heat em ataques rápidos extra
  - `Automaton Queen` (Secondary): Invoca robô autônomo que ataca por turnos (High Battery)

---

#### 🔮 Magical Ranged DPS

**Black Mage**
- Papel: DPS mágico de altíssimo dano com gerenciamento de Elemental State
- Stat Principal: INT
- Recurso Especial: **Astral Fire / Umbral Ice** — estados que alteram completamente o gameplay
- Mecânica:
  - **Astral Fire**: Aumenta dano de Fire mas sobe custo de MP de Ice
  - **Umbral Ice**: Regenera MP rapidamente, reduz custo de Ice mas weakens Fire
- Habilidades Chave:
  - `Fire` / `Fire III` / `Fire IV` (Primary): Dano fogo, mantém Astral Fire
  - `Blizzard` / `Blizzard III` / `Blizzard IV` (Primary): Muda para Umbral Ice, regen MP
  - `Thunder III` (Primary): Aplica DoT de raio ao inimigo
  - `Xenoglossy` (Primary, Instant): Ataque rápido sem restricões elementais
  - `Leylines` (Secondary): Coloca zona no grid — se ficar nela, cast mais rápido
  - `Amplifier` (Secondary): Converte estado atual em Polyglot (mais Xenoglossy)

**Summoner**
- Papel: DPS mágico com pets (Egis/Demi-Primals)
- Stat Principal: INT
- Recurso Especial: **Aethercharge** + Fases de invocação (Carbuncle → Egi → Demi-Primal)
- Habilidades Chave:
  - `Ruin` / `Ruin II` (Primary): Ataque mágico básico
  - `Summon Garuda/Titan/Ifrit` (Secondary): Invoca Egi com habilidades únicas (4 turnos)
  - `Demi-Bahamut` (Secondary): Invoca Bahamut por X turnos — usa **Wyrmwave** nos aliados
  - `Demi-Phoenix` (Secondary): Invoca Phoenix — **Fountain of Fire** e cura party
  - `Searing Light` (Secondary): Buff de dano de grupo

---

## 🗡️ Mecânicas de Combate

### Estrutura de Rodada
```
[Início da Rodada]
    ↓
[FASE DOS ADVENTURERS] — cada jogador age em ordem de iniciativa
    ├── Movimento (até Speed tiles)
    ├── Ação Primária (Primary Action)
    ├── Ação Secundária (Secondary Action) — pode substituir Movimento por Focus
    └── Ação Instantânea (Instant) — reativa em qualquer fase
    ↓
[FASE DOS INIMIGOS] — GM age com todos os inimigos
    └── Inimigos atacam, se movem, ativam habilidades
    ↓  
[ROUND-UP PHASE] — resolução de efeitos de área
    ├── AOE markers se resolvem (dano em personagens que não saíram da zona)
    ├── DoTs se ativam (Poison, Burn, etc.)
    ├── HoTs se ativam (Regen, etc.)
    └── Duração de buffs/debuffs reduz em 1
```

### Sistema de Rolagem (Checks)

| Tipo | Fórmula | Contra |
|------|---------|--------|
| **Attack Roll** | d20 + Atributo | Defense / Magic Defense do alvo |
| **Skill Check** | d20 + Atributo | CRL (10/12/15/18) definido pelo GM |
| **Opposition Check** | d20 + Atributo | d20 + Atributo do oponente |

#### Resultados de Ataque
| Resultado | Efeito |
|-----------|--------|
| < Defense | **Miss** → nenhum dano (raro — o sistema é mais permissivo) |
| ≥ Defense | **Hit** → dano normal |
| ≥ Defense + bônus | **Direct Hit** → dano adicional (rolar dado extra de dano) |
| Natural 20 | **Critical Hit** → dano dobrado (ou cura dobrada) |
| Natural 1 | Apenas uma falha normal — **não há "Critical Miss"** |

#### Difficulty Levels (Checks fora de combate)
| Dificuldade | CRL |
|-------------|-----|
| Easy | 10 |
| Average | 12 |
| Hard | 15 |
| Very Hard | 18 |

### Sistema de AOE (Área de Efeito)

AOEs são marcadores colocados no grid que **resolvem no Round-Up Phase**:

```
Turno 1 (Fase do Inimigo):
  → Boss usa "Meteor" → Coloca marcador de AOE em X tiles do grid
  → Players são avisados visualmente (marcador colorido no canvas)

Round-Up Phase do mesmo turno:
  → Se player ainda está no tile marcado → recebe o dano
  → Se player se moveu para fora → evita o dano
```

**Formas de AOE:**
- **Circle** (círculo): Area ao redor de um ponto central
- **Cone** (cone): Projeção frontal no formato V
- **Line** (linha): Linha reta do caster até destino
- **Cross** (cross): Cruz centrada no alvo
- **Donut** (anel): AOE em anel — centro é seguro
- **Cardinal** (4 direções): Atinge 4 eixos cardinais simultaneamente

### Enmity (Hate/Aggro)

**Mecânica:**
- Tanks têm habilidades que **geram Enmity** (Tomahawk, Provoke, etc.)
- Inimigos atacam preferencialmente **quem tem mais Enmity**
- Se jogador não-Tank tiver Enmity mais alto → inimigo troca de alvo

**No Foundry:**
- HUD de Enmity visível no lado do GM
- Barra de Enmity por inimigo por personagem
- Automação: ao usar habilidade de Enmity → atualiza o tracking automaticamente
- Indicador visual no token quando tem Enmity máximo

### Limit Break

**Sistema:**
- Gauge de **3 seções** compartilhadas por toda a party
- Carrega durante combate (ex: receber dano, matar inimigos)
- Gastar 1 carga = **Limit Break de Nível 1** (uma habilidade por papel de job)
- Gastar 2 cargas = **Limit Break de Nível 2**  
- Gastar 3 cargas = **Limit Break de Nível 3** (ultimate poderoso)

**LBs por Papel:**
| Papel | LB 1 | LB 2 | LB 3 |
|-------|------|------|------|
| Tank | Shield Wall (party -25% damage) | Stronghold (party -40% damage) | Last Bastion (party invulnerável) |
| Healer | Healing Wind (cura menor party) | Breath of the Earth (cura grande party) | Pulse of Life (revive toda a party) |
| Melee DPS | Braver (dano single) | Bladedance (dano grande single) | Final Heaven (dano massivo single) |
| Physical Ranged | Big Shot (dano single) | Desperado (dano área) | Sagittarius Arrow (dano massivo long range) |
| Magical DPS | Skyshard (dano magic AOE) | Starstorm (dano magic grande AOE) | Meteor (dano catastrófico AOE) |

### Progressão e Níveis

O sistema usa **Milestones** não XP tradicional:

| Milestone | Nível Atingido |
|-----------|---------------|
| Início | Nível 1 |
| Fim da 1ª fase da campanha | Nível 10-20 |
| Meio da campanha | Nível 30 |
| Final do segundo arco | Nível 40 |
| Final da campanha | Nível 50 |
| Post-game / Heavensward | Nível 60 |

**Habilidades por Nível:** Cada Job tem uma lista de habilidades que desbloqueiam em cada nível (pré-definidas, sem escolha).

---

## ✨ Sistema de Habilidades

### Tipos de Ação
| Tipo | Descrição | Economia de Ação |
|------|-----------|-----------------|
| **Primary Action** | Ação principal do turno (ataques, magias ofensivas) | 1 por turno |
| **Secondary Action** | Ação de suporte (buffs, itens, invocar pets) | 1 por turno (ou usa movimento) |
| **Instant** | Reação — usada durante turno alheio | 1 por "gatilho" |
| **Focus** | Sacrifica movimento para obter uma Secondary Action extra | - |

### Categorias de Habilidade
- **Physical** — dano físico, usa STR ou DEX
- **Magic** — dano mágico, usa INT ou MND
- **Unique** — mecânicas especiais do Job específico
- **Heal** — restaura HP de aliados

### Proc Effects
Alguns ataques têm **Proc Effects** — efeitos que se ativam baseados em condições:
- Ex: "Se Critical Hit → aplica [Efeito X]"
- Ex: "Se alvo tiver [Debuff Y] → dano aumentado"
- Ex: "Se HP < 50% → habilidade muda de efeito"

### Combo System
Alguns Jobs têm cadeias de combo:
```
Ability A → se usada após A, Ability B ganha [bônus]
            → se usada após B, Ability C ganha [bônus maior]
```
No Foundry, isso é rastreado automaticamente com Active Effects.

---

## 🎒 Equipamento e Itens

### Armas

| Tipo | Usado por | Bônus |
|------|-----------|-------|
| Sword + Shield | Paladin | Defense alta |
| Greataxe | Warrior | STR alto, dano alto |
| Greatsword | Dark Knight | STR + Magic hybrid |
| Spear | Dragoon | STR, habilita Jumps |
| Claws / Fists | Monk | STR, multi-hit |
| Katana | Samurai | STR, Iaijutsu |
| Daggers | Ninja | DEX, Mudras |
| Bow | Bard | DEX, ranged |
| Gun / Tools | Machinist | DEX, turrets |
| Staff | Black Mage | INT alto |
| Book / Scepter | Summoner | INT |
| Cane | White Mage | MND |
| Codex | Scholar | MND |
| Star Globe | Astrologian | MND |

### Armaduras

| Tipo | Usado por | Bônus |
|------|-----------|-------|
| Heavy Armor | Tanks | Defense alta |
| Medium Armor | Melee DPS | Balance defesa/agilidade |
| Light Armor | Physical Ranged | DEX bonus |
| Robes | Magical DPS | Magic Defense, INT |
| Healing Robes | Healers | MND, Magic Defense |

### Consumíveis

| Item | Efeito |
|------|--------|
| Potion (Hi/X) | Restaura HP (valor pequeno/médio/grande) |
| Ether (Hi/X) | Restaura MP (1/2/3 MP) |
| Phoenix Down | Revive personagem com HP baixo |
| Elixir | Restaura HP e MP completamente |
| Hi-Elixir | Como Elixir, mais forte |
| Antidote | Remove Poison |
| Eye Drops | Remove Blind |
| Echo Drops | Remove Silence |
| Maiden's Kiss | Remove Toad |
| Remedy | Remove múltiplos status negativos |

### Augmentação de Equipamento
- Armas e armaduras podem ser **aumentadas** com materiais raros
- +1 ao atributo relevante por nível de augmentação
- Requer NPC ferreiro + Gil + Materiais

---

## 🤖 Automação

### Priority 1 — Core Automations (Essencial)

#### Rolagem de Ataque Automatizada
```javascript
// Quando player clica em uma habilidade de ataque:
async function rollAttack(item, actor, target) {
  const roll = await new Roll(`1d20 + @attr.${item.system.primaryStat}`).evaluate();
  
  const targetDefense = item.system.category === 'magic' 
    ? target.system.derived.magicDefense 
    : target.system.derived.defense;
    
  let result = 'hit';
  if (roll.total >= targetDefense + 5) result = 'directHit'; // Direct Hit
  if (roll.result === 20) result = 'crit';                    // Critical Hit
  if (roll.total < targetDefense) result = 'miss';
  
  // Rolar dano automaticamente baseado no resultado
  const damageRoll = await rollDamage(item, result);
  
  // Aplicar dano automaticamente ao target (se configurado)
  if (game.settings.get('ffxiv-ttrpg', 'autoDamage')) {
    await applyDamage(target, damageRoll.total, item.system.damage.type);
  }
  
  // Renderizar card no chat
  await renderRollCard(item, actor, target, roll, damageRoll, result);
}
```

#### AOE Marker Automation
```javascript
// Quando inimigo usa habilidade com AOE:
async function placeAOEMarker(ability, origin) {
  const markerData = {
    x: origin.x,
    y: origin.y,
    shape: ability.system.aoeShape,   // circle, cone, line, cross, donut
    size: ability.system.aoeSize,      // em tiles
    delay: ability.system.aoeDelay,   // rounds antes de resolver
    damage: ability.system.damage,
    sourceId: origin.id
  };
  
  // Desenha o marcador no canvas com cor vermelha translúcida
  await canvas.drawings.createDocument({
    type: 'e',  // ellipse/circle
    fillColor: '#ff000044',
    strokeColor: '#ff0000',
    ...convertMarkerToDrawing(markerData)
  });
  
  // Agenda resolução no Round-Up Phase
  game.combat.setFlag('ffxiv-ttrpg', 'pendingAOE', [
    ...game.combat.getFlag('ffxiv-ttrpg', 'pendingAOE') ?? [],
    markerData
  ]);
}

// No Round-Up Phase, processar todos os AOEs pendentes:
async function resolveAOEMarkers() {
  const pending = game.combat.getFlag('ffxiv-ttrpg', 'pendingAOE') ?? [];
  for (const marker of pending) {
    const tokensInZone = getTokensInAOE(marker);
    for (const token of tokensInZone) {
      await applyDamage(token.actor, marker.damage);
      ChatMessage.create({ content: `${token.name} foi atingido por ${marker.sourceName}!` });
    }
    await removeAOEMarker(marker);
  }
}
```

#### MP Cost Automation
```javascript
// Ao usar habilidade com custo MP:
async function spendMP(actor, cost) {
  const currentMP = actor.system.derived.mp.value;
  if (currentMP < cost) {
    ui.notifications.warn(`${actor.name} não tem MP suficiente!`);
    return false;
  }
  await actor.update({ 'system.derived.mp.value': currentMP - cost });
  return true;
}
```

#### Status Effects (Active Effects) Automation
```javascript
// Status effects padrão com duração automática:
const STATUS_EFFECTS = {
  'poison': {
    label: 'Poison',
    icon: 'icons/magic/unholy/blood-drip-droplet.webp',
    changes: [{ key: 'system.statusEffects.poison', mode: 5, value: true }],
    duration: { rounds: 3 }
  },
  'blind': {
    label: 'Blind', 
    icon: 'icons/magic/unholy/debuff-eye-purple.webp',
    changes: [{ key: 'system.attributes.accuracy', mode: 2, value: -2 }],
    duration: { rounds: 2 }
  },
  // ... outros status
};
```

### Priority 2 — Advanced Automations

#### Combo Tracking
```javascript
// Rastrear estado de combo para cada ator:
async function checkCombo(actor, usedAbility) {
  const lastAbility = actor.getFlag('ffxiv-ttrpg', 'lastAbility');
  const comboRequirement = usedAbility.system.combo.from;
  
  if (comboRequirement && lastAbility === comboRequirement) {
    // Aplicar bônus de combo
    await actor.setFlag('ffxiv-ttrpg', 'comboActive', true);
    return usedAbility.system.combo.bonus;
  }
  
  await actor.setFlag('ffxiv-ttrpg', 'lastAbility', usedAbility.id);
  return null;
}
```

#### Enmity Tracking
```javascript
// Atualizar enmity automaticamente ao atacar:
async function updateEnmity(attacker, target, threat) {
  const enmityList = target.getFlag('ffxiv-ttrpg', 'enmityList') ?? {};
  enmityList[attacker.id] = (enmityList[attacker.id] ?? 0) + threat;
  await target.setFlag('ffxiv-ttrpg', 'enmityList', enmityList);
  
  // Verificar se inimigo deve mudar de alvo
  const highestEnmity = Object.entries(enmityList).sort((a, b) => b[1] - a[1])[0];
  if (highestEnmity[0] !== target.system.currentTarget) {
    await target.update({ 'system.currentTarget': highestEnmity[0] });
    ChatMessage.create({ content: `${target.name} muda de alvo para ${highestEnmity[0]}!` });
  }
}
```

#### Limit Break Tracker (Party-wide)
```javascript
// App dedicado ao Limit Break visível para toda a party:
class LimitBreakTracker extends Application {
  static get defaultOptions() {
    return { ...super.defaultOptions, template: 'templates/apps/limit-break-tracker.hbs' };
  }
  
  getData() {
    return {
      current: game.settings.get('ffxiv-ttrpg', 'limitBreakValue'),
      max: 3
    };
  }
  
  // Chamado quando evento de combate gera LB (matar inimigo, levar dano crítico, etc.)
  static async increment(amount = 1) {
    const current = game.settings.get('ffxiv-ttrpg', 'limitBreakValue');
    await game.settings.set('ffxiv-ttrpg', 'limitBreakValue', Math.min(3, current + amount));
    ui.limitBreakTracker?.render();
  }
}
```

#### Phase Management (Combat Automation)
```javascript
// Hook no Foundry para gerenciar fases da rodada:
Hooks.on('updateCombat', async (combat, changed) => {
  if (!changed.round && !changed.turn) return;
  
  // Detectar início do Round-Up Phase (após último combatant)
  if (isLastCombatant(combat)) {
    await resolveAOEMarkers();
    await resolveDotsTicks();
    await resolveHotsTicks();
    await decrementEffectDurations();
  }
  
  // Renovar ações do adventurer no início do seu turno
  if (isAdventurerTurn(combat)) {
    const actor = combat.combatants.get(combat.current.combatantId).actor;
    await actor.update({
      'system.actions.primary': true,
      'system.actions.secondary': true,
      'system.actions.movement': true
    });
  }
});
```

---

## 🖥️ HUD e Interface

### Ficha do Personagem (Actor Sheet)

#### Seções Principais:
1. **Header**: Nome, raça, job (com ícone do job), nível, nível, portrait
2. **Stats Block**: STR/DEX/VIT/INT/MND com barras visuais
3. **Derived Stats**: HP bar, MP bar (com números), Defense, Magic Defense, Speed
4. **Actions Tab**: Lista de habilidades com ícones, agrupadas por tipo (Primary/Secondary/Instant)
5. **Equipment Tab**: Weapon e Armor equipados, slots de consumíveis
6. **Biography Tab**: Background, perfil, notas
7. **Effects Tab**: Status efeitos ativos (visível e gerenciável)

#### Inspiração Visual
- **Fonte de inspiração**: UI do FFXIV (barras de recursos coloridas, ícones de job)
- Palette: Dark Navy + Gold + White (cores do FFXIV)
- HP Bar: Vermelho/Verde gradiente
- MP Bar: Azul
- Barras de recurso especial por Job: Cor única por job

### Combat HUD (Token HUD em Combate)

Inspirado no **Argon Combat HUD** do DnD5e/PF2e, adaptado para FFXIV TTRPG:

```
[Portrait do Personagem]
         |
[HP ████████░░] [MP ██████░░░░]
         |
[▶ PRIMARY] [▷ SECONDARY] [⚡ INSTANT]
[Skill 1] [Skill 2] [Skill 3] [Skill 4] [Skill 5]
         |
[Recurso Especial: ██████░░] (se aplicável)
         |
[Limit Break Party: [■][■][□]]
         |
[SPEED: 3 tiles restantes] [STATUS: ...]
```

**Features do Combat HUD:**
- Exibe HP/MP atualizando em tempo real
- Todas as habilidades do turno atual clicáveis
- Indica ações disponíveis (Primary ✓ / Secondary ✗ — já usada)
- Tracking de recurso especial do job (Beast Gauge, Chakra, etc.)
- Ícone de Limit Break compartilhado
- Indicador de tiles de movimento restantes

### AOE Visual no Canvas

Cada tipo de AOE tem visualização diferente no mapa:
- **Circle**: Círculo vermelho translúcido
- **Cone**: Cone vermelho na direção do boss
- **Line**: Linha vermelha do boss ao alvo
- **Cross**: Cruz no alvo
- **Donut**: Anel com centro seguro (verde) e exterior vermelho
- **Cardinal**: 4 linhas nos eixos cardinais

**Animação:** Marcadores pulsam levemente para indicar perigo iminente. Ao aproximar do Round-Up Phase, mudam de cor (laranja → vermelho) como aviso.

### GM Interface

Para o GM:
- **Enmity Tracker** por inimigo: Mostra barra de hate de cada personagem vs. cada inimigo
- **Boss HP Bar** centralizada na tela (visão dos jogadores)
- **AOE Controls**: Ferramentas para colocar AOE markers no canvas com um clique
- **Phase Indicator**: Mostra em qual fase a rodada está (Adventurer/Enemy/Round-Up)
- **Enemy Actions Tracker**: Lista de ações que inimigos podem tomar no turno

---

## 📦 Compendios

### Estrutura de Compendios

| Pack | Tipo | Conteúdo |
|------|------|----------|
| `ffxiv.races` | Item | 7 raças (2 tribes cada) com bônus e traits |
| `ffxiv.jobs` | Item | 13 jobs com lore e progression overview |
| `ffxiv.abilities-paladin` | Item | Todas as habilidades do Paladin (nível 1-60) |
| `ffxiv.abilities-warrior` | Item | Todas as habilidades do Warrior |
| `ffxiv.abilities-darkknight` | Item | Todas as habilidades do Dark Knight |
| `ffxiv.abilities-whitemage` | Item | Todas as habilidades do White Mage |
| `ffxiv.abilities-scholar` | Item | Todas as habilidades do Scholar |
| `ffxiv.abilities-astrologian` | Item | Todas as habilidades do Astrologian |
| `ffxiv.abilities-monk` | Item | Todas as habilidades do Monk |
| `ffxiv.abilities-dragoon` | Item | Todas as habilidades do Dragoon |
| `ffxiv.abilities-ninja` | Item | Todas as habilidades do Ninja |
| `ffxiv.abilities-samurai` | Item | Todas as habilidades do Samurai |
| `ffxiv.abilities-bard` | Item | Todas as habilidades do Bard |
| `ffxiv.abilities-machinist` | Item | Todas as habilidades do Machinist |
| `ffxiv.abilities-blackmage` | Item | Todas as habilidades do Black Mage |
| `ffxiv.abilities-summoner` | Item | Todas as habilidades do Summoner |
| `ffxiv.weapons` | Item | Armas de cada job (Lv.1/30/40/50/60) |
| `ffxiv.armors` | Item | Armaduras por papel (Lv.1/30/40/50/60) |
| `ffxiv.consumables` | Item | Poções, Ethers, Phoenix Down, Remedies |
| `ffxiv.status-effects` | Item | Poison, Blind, Silence, Slow, Bind, etc. |
| `ffxiv.enemies` | Actor | Inimigos pré-montados do Gamemaster Book |
| `ffxiv.bosses` | Actor | Bosses dos cenários oficiais |
| `ffxiv.macros` | Macro | Macros de automação e conveniência |
| `ffxiv.rollTables` | RollTable | Tabelas de loot e eventos |
| `ffxiv.scenes` | Scene | Mapas dos cenários oficiais |

---

## 🗺️ Plano de Implementação (Fases)

### 🔴 FASE 0 — Versão Mínima Jogável (MVP)
**Objetivo:** Ficha funcional básica + rolagem manual

- [ ] `system.json` com versão 1.0.0
- [ ] `template.json` com Actor (adventurer, enemy) e Item (ability, weapon, armor, consumable)
- [ ] Sheet básica de Adventurer: atributos, HP, MP, Defense
- [ ] Sheet básica de Enemy: HP, Defense
- [ ] Rollable de d20 + atributo clicando no stat
- [ ] Lista de habilidades clicável na ficha com mensagem básica no chat
- [ ] 4 jobs iniciais (Warrior, White Mage, Dragoon, Black Mage) com habilidades populadas
- [ ] Compendio básico de armas e armaduras
- [ ] README de instalação

**Tempo estimado:** 2-3 semanas

---

### 🟡 FASE 1 — Sistema Core Completo
**Objetivo:** Mecânicas de combate funcionando

- [ ] Initiative tracker integrado com fases (Adventurer/Enemy/Round-Up)
- [ ] Auto-rolagem de ataque (d20 + attr vs Defense)
- [ ] Detecção automática de Hit/Direct Hit/Critical Hit
- [ ] Auto-aplicação de dano ao target (opcional via setting)
- [ ] Sistema de MP com custo automático
- [ ] Active Effects para status (Poison, Blind, Silence, Bind, Slow)
- [ ] Duração de efeitos reduzindo por turno automaticamente
- [ ] Todos os 13 jobs com habilidades (Lv. 1-30)
- [ ] Compendios de habilidades completos
- [ ] Raças com bônus de atributo

**Tempo estimado:** 4-6 semanas

---

### 🟢 FASE 2 — Automação Avançada + HUD
**Objetivo:** Experiência próxima dos sistemas premium

- [ ] AOE Marker system no canvas (6 formas)
- [ ] AOE resolve automático no Round-Up Phase
- [ ] Combat HUD com habilidades rápidas (inspirado no Argon)
- [ ] Enmity Tracker para GM
- [ ] Limit Break Tracker compartilhado
- [ ] Combo tracking automático
- [ ] Recurso especial de Job por ator (Beast Gauge, Chakra, etc. — ao menos 4 jobs)
- [ ] Todos os 13 jobs com habilidades completas (Lv. 1-60)
- [ ] Inimigos pré-montados do GM Book
- [ ] Macros de conveniência no compendio
- [ ] Estilo visual FFXIV (CSS customizado)

**Tempo estimado:** 6-10 semanas

---

### 🔵 FASE 3 — Polimento e Features Opcionais
**Objetivo:** Sistema para publicação/comunidade

- [ ] Localização PT-BR completa
- [ ] Localização EN completa
- [ ] Documentação de usuário (README)
- [ ] Phase Management completo (hooks automáticos)
- [ ] AOE animation visual (pulsação, mudança de cor)
- [ ] Integração com Token HUD nativa do Foundry
- [ ] Bosses dos cenários oficiais (com mecânicas especiais)
- [ ] Cenários/Mapas dos 3 aventuras oficiais
- [ ] Card Drawing system para Astrologian
- [ ] Mudra input system para Ninja
- [ ] Sistema de Augmentação de equipamento
- [ ] Pets autônomos (Scholar Faerie, Summoner Egis)
- [ ] Personal Quests tracking
- [ ] Publication no Foundry Package Browser

**Tempo estimado:** 10-16 semanas

---

## ⚙️ Configurações do Sistema (Settings)

```javascript
// Configurações ajustáveis pelo GM no painel de settings:
game.settings.register('ffxiv-ttrpg', 'autoDamage', {
  name: 'Aplicar Dano Automaticamente',
  hint: 'Ao acertar um ataque, aplica o dano automaticamente ao alvo.',
  scope: 'world', config: true, type: Boolean, default: false
});

game.settings.register('ffxiv-ttrpg', 'showAOEMarkers', {
  name: 'Mostrar Marcadores de AOE',
  hint: 'Exibe marcadores visuais no canvas para ataques em área.',
  scope: 'world', config: true, type: Boolean, default: true
});

game.settings.register('ffxiv-ttrpg', 'enmityTracking', {
  name: 'Tracking de Enmity',
  scope: 'world', config: true, type: Boolean, default: true
});

game.settings.register('ffxiv-ttrpg', 'limitBreakValue', {
  name: 'Valor do Limit Break',
  scope: 'world', config: false, type: Number, default: 0,
  range: { min: 0, max: 3, step: 1 }
});

game.settings.register('ffxiv-ttrpg', 'autoRollDamage', {
  name: 'Rolar Dano Automaticamente',
  hint: 'Ao clicar em uma habilidade de dano, rola o dano junto com o ataque.',
  scope: 'client', config: true, type: Boolean, default: true
});
```

---

## 🔗 Referências e Recursos

### Sistemas para Estudar como Referência
- **[DnD5e System](https://github.com/foundryvtt/dnd5e)** — estrutura de Attack/Damage rolls, Active Effects
- **[Pathfinder 2e System](https://github.com/foundryvtt/pf2e)** — automação, condições, HUD, strutura de compendios
- **[Lancer System](https://github.com/Eranziel/foundryvtt-lancer)** — sistema tático em grid com mecânicas complexas, boa referência para fases de combate

### Recursos de Desenvolvimento
- **Foundry VTT API Docs**: https://foundryvtt.com/api/
- **Foundry Community Wiki**: https://foundryvtt.wiki/
- **Boilerplate System**: https://github.com/League-of-Foundry-Developers/FoundryVTT-system-tutorial

### Mídia e Assets
- **Job Icons**: Sprites oficiais do FFXIV (verificar licença de uso)
- **UI Sounds**: Sons de habilidade do FFXIV (verificar licença)
- **Maps**: Usar Dungeondraft ou Inkarnate para mapas compatíveis com FFXIV aesthetic

---

*Documento criado em: 03/03/2026 — v1.0.0*  
*Próxima revisão: Após feedback do Mestre*
