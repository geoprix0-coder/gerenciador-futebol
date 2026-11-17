const STORE='gerenciador-futebol-dados-v2';
const LEGACY_STORE='gerenciador-futebol-clubes-v1';
const SEED_2026=[
 ['Athletico Paranaense','PR','A'],['Atlético-MG','MG','A'],['Bahia','BA','A'],['Botafogo','RJ','A'],['Chapecoense','SC','A'],['Corinthians','SP','A'],['Coritiba','PR','A'],['Cruzeiro','MG','A'],['Flamengo','RJ','A'],['Fluminense','RJ','A'],['Grêmio','RS','A'],['Internacional','RS','A'],['Mirassol','SP','A'],['Palmeiras','SP','A'],['Red Bull Bragantino','SP','A'],['Remo','PA','A'],['Santos','SP','A'],['São Paulo','SP','A'],['Vasco da Gama','RJ','A'],['Vitória','BA','A'],
 ['América-MG','MG','B'],['Athletic','MG','B'],['Atlético-GO','GO','B'],['Avaí','SC','B'],['Botafogo-SP','SP','B'],['Ceará','CE','B'],['CRB','AL','B'],['Criciúma','SC','B'],['Cuiabá','MT','B'],['Fortaleza','CE','B'],['Goiás','GO','B'],['Juventude','RS','B'],['Londrina','PR','B'],['Náutico','PE','B'],['Novorizontino','SP','B'],['Operário-PR','PR','B'],['Ponte Preta','SP','B'],['São Bernardo','SP','B'],['Sport','PE','B'],['Vila Nova','GO','B']
];

const ARGENTINA_PRIMERA_2026={
 A:['Platense','Defensa y Justicia','Central Córdoba','Lanús','Deportivo Riestra','Talleres','Boca Juniors','Estudiantes de La Plata','Instituto','Gimnasia de Mendoza','San Lorenzo','Independiente','Newell’s Old Boys','Unión','Vélez Sarsfield'],
 B:['Argentinos Juniors','Aldosivi','Atlético Tucumán','Banfield','Barracas Central','Belgrano','River Plate','Gimnasia La Plata','Estudiantes de Río Cuarto','Independiente Rivadavia','Huracán','Racing Club','Rosario Central','Sarmiento','Tigre']
};
const ARGENTINA_NACIONAL_2026={
 A:['All Boys','Ferro Carril Oeste','Deportivo Madryn','Chaco For Ever','Deportivo Morón','Estudiantes de Buenos Aires','Racing de Córdoba','Los Andes','Mitre de Santiago del Estero','Almirante Brown','Ciudad de Bolívar','Colón','Central Norte','Godoy Cruz','San Telmo','San Miguel','Defensores de Belgrano','Acassuso'],
 B:['Nueva Chicago','Chacarita Juniors','Atlanta','San Martín de Tucumán','Gimnasia y Esgrima de Jujuy','Almagro','San Martín de San Juan','Temperley','Güemes','Tristán Suárez','Agropecuario','Patronato','Gimnasia y Tiro','Deportivo Maipú','Quilmes','Colegiales','Atlético de Rafaela','Midland']
};
const URUGUAY_PRIMERA_2026=[
 ['Albion','Montevideo'],['Boston River','Florida'],['Central Español','Montevideo'],['Cerro','Montevideo'],
 ['Cerro Largo','Cerro Largo'],['Danubio','Montevideo'],['Defensor Sporting','Montevideo'],['Deportivo Maldonado','Maldonado'],
 ['Juventud','Canelones'],['Liverpool','Montevideo'],['Montevideo City Torque','Montevideo'],['Montevideo Wanderers','Montevideo'],
 ['Nacional','Montevideo'],['Peñarol','Montevideo'],['Progreso','Montevideo'],['Racing','Montevideo']
];
const URUGUAY_INTERMEDIO_2026={
 A:['Peñarol','Cerro Largo','Racing','Liverpool','Central Español','Cerro','Defensor Sporting','Boston River'],
 B:['Montevideo City Torque','Nacional','Deportivo Maldonado','Juventud','Albion','Montevideo Wanderers','Danubio','Progreso']
};
const URUGUAY_SEGUNDA_2026={
 A:[['Huracán','Montevideo'],['Atenas','Maldonado'],['Tacuarembó','Tacuarembó'],['La Luz','Montevideo'],['Uruguay Montevideo','Montevideo'],['Cerrito','Montevideo'],['Fénix','Montevideo']],
 B:[['River Plate','Montevideo'],['Oriental','Canelones'],['Rentistas','Montevideo'],['Plaza Colonia','Colonia'],['Paysandú','Paysandú'],['Miramar Misiones','Montevideo'],['Colón','Montevideo']]
};
const ARGENTINA_CLASICOS_2026=[
 ['Vélez Sarsfield','River Plate'],['Barracas Central','Platense'],['Talleres','Rosario Central'],
 ['Sarmiento','Estudiantes de La Plata'],['Defensa y Justicia','Belgrano'],['Argentinos Juniors','Lanús'],
 ['Boca Juniors','Racing Club'],['Independiente Rivadavia','Independiente'],['Unión','Aldosivi'],
 ['Atlético Tucumán','Instituto'],['San Lorenzo','Estudiantes de Río Cuarto'],
 ['Gimnasia La Plata','Gimnasia de Mendoza'],['Central Córdoba','Tigre'],
 ['Huracán','Deportivo Riestra'],['Newell’s Old Boys','Banfield']
];
const ARGENTINA_NACIONAL_CLASICOS_2026=[
 ['All Boys','Nueva Chicago'],['Ferro Carril Oeste','Atlanta'],['Deportivo Madryn','San Martín de Tucumán'],
 ['Chaco For Ever','Gimnasia y Esgrima de Jujuy'],['Deportivo Morón','Almagro'],
 ['Estudiantes de Buenos Aires','Chacarita Juniors'],['Racing de Córdoba','San Martín de San Juan'],
 ['Los Andes','Temperley'],['Mitre de Santiago del Estero','Güemes'],
 ['Almirante Brown','Tristán Suárez'],['Ciudad de Bolívar','Agropecuario'],
 ['Colón','Patronato'],['Central Norte','Gimnasia y Tiro'],['Godoy Cruz','Deportivo Maipú'],
 ['San Telmo','Quilmes'],['San Miguel','Colegiales'],
 ['Defensores de Belgrano','Atlético de Rafaela'],['Acassuso','Midland']
];

const uid=()=>crypto.randomUUID();
const slugify=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
function initialData(){
 const old=JSON.parse(localStorage.getItem(LEGACY_STORE)||'[]');
 const clubs=[];
 const add=(name,state,id,country='Brasil')=>{const key=slugify(name);if(!clubs.some(c=>slugify(c.name)===key&&c.country===country))clubs.push({id:id||key,name,state:state||'',slug:key,country});};
 old.forEach(c=>add(c.name,c.state,c.id,'Brasil'));
 SEED_2026.forEach(([name,state])=>add(name,state,undefined,'Brasil'));
 [...ARGENTINA_PRIMERA_2026.A,...ARGENTINA_PRIMERA_2026.B,...ARGENTINA_NACIONAL_2026.A,...ARGENTINA_NACIONAL_2026.B].forEach(name=>add(name,'',undefined,'Argentina'));
 const byName=(name,country='Brasil')=>clubs.find(c=>slugify(c.name)===slugify(name)&&c.country===country).id;
 const a=SEED_2026.filter(x=>x[2]==='A').map(x=>byName(x[0]));
 const b=SEED_2026.filter(x=>x[2]==='B').map(x=>byName(x[0]));
 const ids=names=>names.map(byName);
 const argA=[...ARGENTINA_PRIMERA_2026.A,...ARGENTINA_PRIMERA_2026.B].map(n=>byName(n,'Argentina'));
 const argB=[...ARGENTINA_NACIONAL_2026.A,...ARGENTINA_NACIONAL_2026.B].map(n=>byName(n,'Argentina'));
 const argentina=[{id:'arg-primera-apertura-2026',name:'Primera División · Torneo Apertura',country:'Argentina',division:'Primera División',format:'2026 · 2 zonas de 15 · 16 fechas + playoffs',argentinaType:'primera',phase:'Apertura',zones:{A:ids(ARGENTINA_PRIMERA_2026.A),B:ids(ARGENTINA_PRIMERA_2026.B)},classicPairs:ARGENTINA_CLASICOS_2026.map(p=>p.map(byName)) ,participants:argA},
 {id:'arg-primera-clausura-2026',name:'Primera División · Torneo Clausura',country:'Argentina',division:'Primera División',format:'2026 · mesmas zonas · localías invertidas + playoffs',argentinaType:'primera',phase:'Clausura',zones:{A:ids(ARGENTINA_PRIMERA_2026.A),B:ids(ARGENTINA_PRIMERA_2026.B)},classicPairs:ARGENTINA_CLASICOS_2026.map(p=>p.map(byName)),participants:argA},
 {id:'arg-nacional-2026',name:'Primera Nacional',country:'Argentina',division:'Primera Nacional',format:'2026 · 2 zonas de 18 · 36 datas · 2 acessos',argentinaType:'nacional',zones:{A:ids(ARGENTINA_NACIONAL_2026.A),B:ids(ARGENTINA_NACIONAL_2026.B)},classicPairs:ARGENTINA_NACIONAL_CLASICOS_2026.map(p=>p.map(byName)),participants:argB}];
 return {clubs,seasons:[{id:'season-2026',year:2026,status:'Preparação',createdAt:new Date().toISOString(),competitions:[{id:'serie-a',name:'Campeonato Brasileiro · Série A',country:'Brasil',division:'A',participants:a,format:'A definir'},{id:'serie-b',name:'Campeonato Brasileiro · Série B',country:'Brasil',division:'B',participants:b,format:'A definir'},...argentina]}]};
}
let data=JSON.parse(localStorage.getItem(STORE)||'null');
let clubs=[],seasons=[];
if(!data||!Array.isArray(data.clubs)||!Array.isArray(data.seasons)||!data.seasons.length){
 data=initialData();
 clubs=data.clubs;
 seasons=data.seasons;
 save();
}else{
 clubs=data.clubs;
 seasons=data.seasons;
}
const view=document.querySelector('#view'),title=document.querySelector('#page-title');
const labels={inicio:'Painel inicial',competicoes:'Competições',clubes:'Clubes',selecoes:'Seleções',temporadas:'Temporadas',partidas:'Partidas',classificacao:'Classificação',historico:'Histórico'};
const CONTINENTS=['América do Norte','América do Sul','Europa','Ásia','África','Oceania'];
const COUNTRY_CONTINENT=Object.fromEntries(['Brasil','Argentina','Uruguai','Colômbia','Chile','Paraguai','Equador','Peru','Venezuela','Bolívia','Guiana','Suriname'].map(country=>[slugify(country),'América do Sul']));
let activeCompetitionContinent=null;

const SELECTIONS_STORE='wfs-selections-ranking-v1';
const SELECTION_MATCHES_STORE='wfs-selections-matches-v1';
const SELECTION_RANK_HISTORY_STORE='wfs-selections-rank-history-v1';
const FRIENDLY_DRAW_STORE='wfs-international-friendly-draw-v1';

const WORLDCUP_2026_RULES={
 UEFA:{name:'Europa · UEFA',slots:'16 vagas diretas',format:'12 grupos de 4 ou 5 seleções, em turno e returno. Os 12 líderes classificam-se diretamente. Os 12 segundos colocados e quatro seleções vindas da Liga das Nações disputam quatro caminhos de playoffs; os quatro vencedores ficam com as vagas restantes.',stages:['Fase de grupos: 12 grupos de 4 ou 5, ida e volta','Playoffs: 16 seleções em 4 caminhos eliminatórios']},
 CONMEBOL:{name:'América do Sul · CONMEBOL',slots:'6 diretas + 1 na repescagem intercontinental',format:'As 10 seleções disputam uma liga única em turno e returno, totalizando 18 partidas por seleção. As seis primeiras classificam-se diretamente e a sétima disputa a repescagem intercontinental.',stages:['Liga única: 10 seleções, 18 rodadas, ida e volta']},
 CONCACAF:{name:'América do Norte, Central e Caribe · CONCACAF',slots:'3 diretas em campo + 2 na repescagem intercontinental; Canadá, México e EUA já classificados como anfitriões',format:'Preliminar entre as quatro seleções de menor ranking, em dois confrontos de ida e volta. Na segunda rodada, 30 seleções são divididas em seis grupos de cinco, em turno único; os dois primeiros avançam. Na rodada final, 12 seleções formam três grupos de quatro, em turno e returno. Os três líderes classificam-se diretamente e os dois melhores segundos vão à repescagem intercontinental.',stages:['Preliminar: 4 seleções, 2 duelos de ida e volta','Segunda rodada: 6 grupos de 5, turno único','Rodada final: 3 grupos de 4, ida e volta']},
 CAF:{name:'África · CAF',slots:'9 diretas + 1 na repescagem intercontinental',format:'54 seleções divididas em nove grupos de seis, em turno e returno. Os nove líderes classificam-se diretamente. Os quatro melhores segundos disputam um playoff continental; o vencedor representa a África na repescagem intercontinental.',stages:['Fase de grupos: 9 grupos de 6, ida e volta','Playoff continental: 4 melhores segundos colocados']},
 AFC:{name:'Ásia · AFC',slots:'8 diretas + 1 na repescagem intercontinental',format:'Primeira rodada: 20 seleções de menor ranking disputam 10 duelos de ida e volta. Segunda rodada: 36 seleções em nove grupos de quatro, ida e volta; as duas primeiras avançam. Terceira rodada: 18 seleções em três grupos de seis, ida e volta; as duas primeiras de cada grupo classificam-se diretamente. Quarta rodada: seis seleções formam dois grupos de três; os líderes classificam-se diretamente. Os segundos colocados disputam um playoff de ida e volta pela vaga asiática na repescagem intercontinental.',stages:['1ª rodada: 20 seleções, 10 duelos de ida e volta','2ª rodada: 9 grupos de 4, ida e volta','3ª rodada: 3 grupos de 6, ida e volta','4ª rodada: 2 grupos de 3, turno único','5ª rodada: playoff de ida e volta']},
 OFC:{name:'Oceania · OFC',slots:'1 direta + 1 na repescagem intercontinental',format:'Primeira fase entre as quatro seleções de menor ranking; a vencedora avança. Segunda fase: oito seleções em dois grupos de quatro, em turno único; as duas primeiras de cada grupo avançam. Terceira fase: semifinais cruzadas e final em jogo único. O campeão classifica-se diretamente e o vice disputa a repescagem intercontinental.',stages:['Preliminar: 4 seleções','Fase de grupos: 2 grupos de 4, turno único','Fase final: semifinais e final em jogo único']}
};
let activeWorldCupQualifier=null;
const WORLDCUP_QUALIFIER_STORE='wfs-worldcup-qualifiers-2026-v1';
let worldCupQualifierDraws=JSON.parse(localStorage.getItem(WORLDCUP_QUALIFIER_STORE)||'{}');
if(!worldCupQualifierDraws||typeof worldCupQualifierDraws!=='object')worldCupQualifierDraws={};

const CONFEDERATION_NAMES={UEFA:'Europa · UEFA',CAF:'África · CAF',AFC:'Ásia · AFC',CONCACAF:'América do Norte, Central e Caribe · CONCACAF',CONMEBOL:'América do Sul · CONMEBOL',OFC:'Oceania · OFC'};
const MATCH_IMPORTANCE=[
 {id:'friendly_outside',label:'Amistoso fora da Data FIFA',weight:5},
 {id:'friendly_inside',label:'Amistoso na Data FIFA',weight:10},
 {id:'nations_group',label:'Liga das Nações · fase de grupos',weight:15},
 {id:'nations_final',label:'Liga das Nações · finais/playoffs',weight:25},
 {id:'qualifiers',label:'Eliminatórias continentais ou da Copa do Mundo',weight:25},
 {id:'continental_group',label:'Torneio continental · grupos/oitavas (antes das quartas)',weight:35},
 {id:'continental_qf',label:'Torneio continental · quartas em diante',weight:40,protectKnockout:true},
 {id:'worldcup_group',label:'Copa do Mundo · grupos/oitavas (antes das quartas)',weight:50},
 {id:'worldcup_qf',label:'Copa do Mundo · quartas em diante',weight:60,protectKnockout:true}
];
const INTERNATIONAL_COMPETITIONS=[
 {name:'Copa do Mundo FIFA',confederation:'FIFA',type:'Torneio mundial',detail:'Fase final mundial e eliminatórias classificatórias'},
 {name:'Eliminatórias da Copa do Mundo',confederation:'FIFA',type:'Qualificatórias',detail:'Disputadas em cada confederação'},
 {name:'Eurocopa',confederation:'UEFA',type:'Torneio continental',detail:'Seleções europeias'},
 {name:'Copa América',confederation:'CONMEBOL',type:'Torneio continental',detail:'Seleções sul-americanas'},
 {name:'Copa Africana de Nações',confederation:'CAF',type:'Torneio continental',detail:'Seleções africanas'},
 {name:'Copa Asiática',confederation:'AFC',type:'Torneio continental',detail:'Seleções asiáticas'},
 {name:'Copa Ouro',confederation:'CONCACAF',type:'Torneio continental',detail:'Seleções da América do Norte, Central e Caribe'},
 {name:'Copa das Nações da OFC',confederation:'OFC',type:'Torneio continental',detail:'Seleções da Oceania'},
 {name:'Liga das Nações da UEFA',confederation:'UEFA',type:'Liga das Nações',detail:'Fase de grupos e fases finais'},
 {name:'Liga das Nações da CONCACAF',confederation:'CONCACAF',type:'Liga das Nações',detail:'Fase de grupos e fases finais'},
 {name:'Amistosos internacionais',confederation:'FIFA',type:'Amistosos',detail:'Partidas oficiais entre seleções'}
];
let nationalTeams=JSON.parse(localStorage.getItem(SELECTIONS_STORE)||'null');
if(!Array.isArray(nationalTeams)||nationalTeams.length!==211){
 const savedSelectionRatings=new Map(nationalTeams.map(t=>[t.id,t.initialRating]));nationalTeams=(window.WFS_SELECTIONS||[]).map(t=>{const initialRating=savedSelectionRatings.get(t.id);return {...t,points:1000,history:[],matches:0,...(initialRating?{initialRating,overall:initialRating.overall,attack:initialRating.attack,defense:initialRating.defense}:{})};});
 localStorage.setItem(SELECTIONS_STORE,JSON.stringify(nationalTeams));
}
let internationalMatches=JSON.parse(localStorage.getItem(SELECTION_MATCHES_STORE)||'[]');
let selectionRankHistory=JSON.parse(localStorage.getItem(SELECTION_RANK_HISTORY_STORE)||'[]');
let activeSelectionTab='ranking',activeSelectionConfederation='Todas',activeSelectionProfileId=null;
let activeFriendlyPage=false;
let internationalFriendlyDraw=JSON.parse(localStorage.getItem(FRIENDLY_DRAW_STORE)||'null');
function saveSelections(){localStorage.setItem(SELECTIONS_STORE,JSON.stringify(nationalTeams));localStorage.setItem(SELECTION_MATCHES_STORE,JSON.stringify(internationalMatches));localStorage.setItem(SELECTION_RANK_HISTORY_STORE,JSON.stringify(selectionRankHistory));}
function getNationalTeam(id){return nationalTeams.find(t=>t.id===id);}
function flagEmoji(iso){
 if(!iso||iso.length!==2)return '🏳️';
 return String.fromCodePoint(...iso.toUpperCase().split('').map(c=>127397+c.charCodeAt(0)));
}
function rankedSelections(list=nationalTeams){
 const sorted=[...list].sort((a,b)=>b.points-a.points||a.name.localeCompare(b.name,'pt-BR'));
 let last=null,rank=0;
 return sorted.map((team,index)=>{if(last===null||Math.abs(team.points-last)>0.000001)rank=index+1;last=team.points;return {...team,rank};});
}
function initializeSelectionRating(team,rank){
 if(team.initialRating&&Number.isFinite(team.initialRating.overall)){
  team.overall=boundedRating(Number.isFinite(team.overall)?team.overall:team.initialRating.overall);
  team.attack=boundedRating(Number.isFinite(team.attack)?team.attack:team.initialRating.attack);
  team.defense=boundedRating(Number.isFinite(team.defense)?team.defense:team.initialRating.defense);
  return;
 }
 const base=Math.round(88-(Math.max(1,rank)-1)*0.19);
 const overall=boundedRating(Number.isFinite(team.overall)?team.overall:base);
 const attack=boundedRating(Number.isFinite(team.attack)?team.attack:overall+randomInt(-5,5));
 const defense=boundedRating(Number.isFinite(team.defense)?team.defense:overall+randomInt(-5,5));
 team.overall=overall;team.attack=attack;team.defense=defense;
 team.initialRating={overall,attack,defense};
}
function selectionRating(team){return {overall:Number(team.overall),attack:Number(team.attack),defense:Number(team.defense)};}
rankedSelections().forEach(team=>initializeSelectionRating(getNationalTeam(team.id),team.rank));
saveSelections();
function selectionMatchExpected(home,away){return 1/(1+Math.pow(10,-((home.points-away.points)/600)));}
function recordInternationalMatch(form){
 const home=getNationalTeam(form.home.value),away=getNationalTeam(form.away.value);
 const homeGoals=Number(form.homeGoals.value),awayGoals=Number(form.awayGoals.value);
 const type=MATCH_IMPORTANCE.find(x=>x.id===form.matchType.value);
 if(!home||!away||home.id===away.id||!Number.isInteger(homeGoals)||!Number.isInteger(awayGoals)||homeGoals<0||awayGoals<0||!type){alert('Confira as seleções, o placar e a importância da partida.');return false;}
 let homeOutcome=homeGoals>awayGoals?1:homeGoals<awayGoals?0:0.5;
 let penaltyWinner=null;
 if(homeGoals===awayGoals&&type.id!=='friendly_inside'&&type.id!=='friendly_outside'){
  const winner=form.penaltyWinner?.value;
  if(winner!=='home'&&winner!=='away'){alert('Para esta partida eliminatória, selecione a seleção vencedora nos pênaltis.');return false;}
  homeOutcome=winner==='home'?0.75:0.5;
  penaltyWinner=winner==='home'?home.id:away.id;
 }
 const expectedHome=selectionMatchExpected(home,away),expectedAway=1-expectedHome;
 let deltaHome=type.weight*(homeOutcome-expectedHome);
 const awayOutcome=homeGoals===awayGoals?(penaltyWinner?(penaltyWinner===away.id?0.75:0.5):0.5):(1-homeOutcome);
 let deltaAway=type.weight*(awayOutcome-expectedAway);
 const protectKnockout=!!type.protectKnockout||!!form.knockoutProtection.checked;
 if(protectKnockout){if(deltaHome<0)deltaHome=0;if(deltaAway<0)deltaAway=0;}
 const beforeHome=home.points,beforeAway=away.points;
 home.points=Number((home.points+deltaHome).toFixed(2));away.points=Number((away.points+deltaAway).toFixed(2));
 home.matches=(home.matches||0)+1;away.matches=(away.matches||0)+1;
 const date=form.matchDate.value||new Date().toISOString().slice(0,10);
 const match={id:uid(),date,home:home.id,away:away.id,homeGoals,awayGoals,type:type.id,typeLabel:type.label,weight:type.weight,protectKnockout,penaltyWinner,homeBefore:beforeHome,awayBefore:beforeAway,homeDelta:Number(deltaHome.toFixed(2)),awayDelta:Number(deltaAway.toFixed(2)),homeAfter:home.points,awayAfter:away.points};
 internationalMatches.unshift(match);
 const rankedAfterMatch=rankedSelections();
 selectionRankHistory.push({date,matchId:match.id,ranks:Object.fromEntries(rankedAfterMatch.map(t=>[t.id,t.rank])),points:Object.fromEntries(rankedAfterMatch.map(t=>[t.id,t.points]))});
 home.history=home.history||[];away.history=away.history||[];
 home.history.unshift({date,opponent:away.id,score:homeGoals+'–'+awayGoals,delta:match.homeDelta,points:home.points});
 away.history.unshift({date,opponent:home.id,score:awayGoals+'–'+homeGoals,delta:match.awayDelta,points:away.points});
 saveSelections();return true;
}
function selectionTabsHtml(){
 return '<div class="selection-tabs">'+[['ranking','Ranking mundial'],['teams','Seleções'],['matches','Partidas e pontuação'],['competitions','Competições']].map(([id,label])=>'<button class="selection-tab '+(activeSelectionTab===id?'active':'')+'" data-selection-tab="'+id+'">'+label+'</button>').join('')+'</div>';
}
function renderSelections(tab=activeSelectionTab){
 activeSelectionTab=tab;title.textContent='Seleções nacionais';
 if(activeSelectionProfileId){renderSelectionProfile(activeSelectionProfileId);return;}
 const total=nationalTeams.length,ranked=rankedSelections();
 let content='<div class="selection-hero"><div><span class="eyebrow">WFS · FUTEBOL INTERNACIONAL MASCULINO</span><h2>Ranking mundial de seleções</h2><p>211 associações filiadas à FIFA · seis confederações · pontuação inicial padronizada</p></div><div class="selection-total"><strong>'+total+'</strong><span>seleções</span></div></div>'+selectionTabsHtml();
 if(tab==='ranking'){
  const list=activeSelectionConfederation==='Todas'?ranked:ranked.filter(t=>t.confederation===activeSelectionConfederation);
  content+='<div class="panel"><div class="panel-head"><div><h3>Classificação mundial</h3><p class="muted">Todas as seleções começaram com 1.000 pontos. Empates de pontuação compartilham a mesma posição.</p></div><select id="selection-confederation"><option>Todas</option>'+Object.keys(CONFEDERATION_NAMES).map(c=>'<option value="'+c+'" '+(activeSelectionConfederation===c?'selected':'')+'>'+CONFEDERATION_NAMES[c]+'</option>').join('')+'</select></div>'+selectionRankingTable(list)+'</div>';
 }else if(tab==='teams'){
  content+='<div class="panel"><div class="panel-head"><div><h3>Diretório de seleções</h3><p class="muted">Cadastro das 211 associações, com bandeira, sigla e confederação.</p></div><input id="selection-search" placeholder="Buscar seleção..." aria-label="Buscar seleção"></div><div class="selection-confed-filter">'+['Todas',...Object.keys(CONFEDERATION_NAMES)].map(c=>'<button class="filter-chip '+(activeSelectionConfederation===c?'active':'')+'" data-team-confed="'+c+'">'+(c==='Todas'?'Todas':c)+'</button>').join('')+'</div><div id="selection-team-table">'+selectionTeamTable(activeSelectionConfederation==='Todas'?nationalTeams:nationalTeams.filter(t=>t.confederation===activeSelectionConfederation))+'</div></div>';
 }else if(tab==='matches'){
  const sortedTeams=nationalTeams.slice().sort((a,b)=>a.name.localeCompare(b.name,'pt-BR'));
  const teamOptions=sortedTeams.map(t=>'<option value="'+t.id+'">'+flagEmoji(t.iso)+' '+esc(t.name)+'</option>').join('');
  const awayOptions=sortedTeams.map((t,i)=>'<option value="'+t.id+'" '+(i===1?'selected':'')+'>'+flagEmoji(t.iso)+' '+esc(t.name)+'</option>').join('');
  content+='<div class="panel"><h3>Registrar resultado internacional</h3><p class="muted">O resultado atualiza imediatamente os pontos das duas seleções pelo modelo SUM inspirado no ranking FIFA.</p><form id="international-match-form"><div class="selection-match-grid"><div class="field"><label>Seleção mandante</label><select name="home" required>'+teamOptions+'</select></div><div class="field"><label>Seleção visitante</label><select name="away" required>'+awayOptions+'</select></div><div class="field"><label>Gols · mandante</label><input name="homeGoals" type="number" min="0" max="30" value="1" required></div><div class="field"><label>Gols · visitante</label><input name="awayGoals" type="number" min="0" max="30" value="0" required></div><div class="field"><label>Importância da partida</label><select name="matchType">'+MATCH_IMPORTANCE.map(t=>'<option value="'+t.id+'">'+t.label+' · peso '+t.weight+'</option>').join('')+'</select></div><div class="field"><label>Data</label><input name="matchDate" type="date" value="'+new Date().toISOString().slice(0,10)+'" required></div><div class="field penalty-field"><label>Vencedora nos pênaltis (se houver empate)</label><select name="penaltyWinner"><option value="">Não houve disputa</option><option value="home">Seleção mandante</option><option value="away">Seleção visitante</option></select></div><div class="field knockout-protection-field"><label><input name="knockoutProtection" type="checkbox"> Fase eliminatória de torneio final (proteger contra perda de pontos)</label></div></div><button class="btn" type="submit">Registrar partida e atualizar ranking</button></form></div>';
  content+='<div class="panel"><div class="panel-head"><h3>Histórico de partidas</h3><span class="tag">'+internationalMatches.length+' REGISTRADAS</span></div>'+(internationalMatches.length?'<div class="table-wrap"><table class="standings selection-match-table"><thead><tr><th>Data</th><th>Partida</th><th>Placar</th><th>Peso</th><th>Variação</th></tr></thead><tbody>'+internationalMatches.map(m=>{const h=getNationalTeam(m.home),a=getNationalTeam(m.away);return '<tr><td>'+esc(m.date)+'</td><td class="team-name">'+flagEmoji(h?.iso)+' '+esc(h?.name||'')+' × '+flagEmoji(a?.iso)+' '+esc(a?.name||'')+'</td><td>'+m.homeGoals+'–'+m.awayGoals+(m.penaltyWinner?' (pên.)':'')+'</td><td>'+m.weight+'</td><td><span class="'+(m.homeDelta>=0?'points-up':'points-down')+'">'+(m.homeDelta>0?'+':'')+m.homeDelta+'</span> / <span class="'+(m.awayDelta>=0?'points-up':'points-down')+'">'+(m.awayDelta>0?'+':'')+m.awayDelta+'</span></td></tr>';}).join('')+'</tbody></table></div>':'<div class="empty">Nenhuma partida internacional registrada.</div>')+'</div>';
 }else{
  if(activeFriendlyPage){content+=renderInternationalFriendliesPage();}else if(activeWorldCupFinal){content+=renderWorldCupFinalPage();}else if(activeWorldCupQualifier==='overview'){content+=renderWorldCupQualifiers();}else if(activeWorldCupQualifier){content+=activeWorldCupQualifierGroup!==null?renderWorldCupQualifierGroup(activeWorldCupQualifier,activeWorldCupQualifierGroup):renderWorldCupQualifierDetail(activeWorldCupQualifier);}else{content+='<div class="panel"><h3>Competições internacionais previstas</h3><p class="muted">Catálogo inicial de competições para as seleções masculinas. Clique em uma competição para abrir sua página.</p>'+INTERNATIONAL_COMPETITIONS.map(c=>'<button type="button" class="competition-row selection-competition-link" data-open-friendly="'+(c.name==='Amistosos internacionais'?'true':'false')+'" data-open-worldcup="'+(c.name==='Eliminatórias da Copa do Mundo'?'true':'false')+'" data-open-worldcup-final="'+(c.name==='Copa do Mundo FIFA'?'true':'false')+'"><div><strong>'+esc(c.name)+'</strong><small>'+esc(c.detail)+'</small></div><span class="tag">'+esc(c.confederation)+'</span></button>').join('')+'</div>';content+='<div class="panel"><h3>Pesos das partidas no ranking</h3><div class="table-wrap"><table class="standings"><thead><tr><th>Tipo de partida</th><th>Peso</th></tr></thead><tbody>'+MATCH_IMPORTANCE.map(t=>'<tr><td class="team-name">'+esc(t.label)+'</td><td>'+t.weight+'</td></tr>').join('')+'</tbody></table></div></div>';
  }
 }
 view.innerHTML=content;
 view.addEventListener('click',e=>{const row=e.target.closest('[data-selection-profile]');if(row&&view.contains(row)){activeSelectionProfileId=row.dataset.selectionProfile;renderSelections(activeSelectionTab);}});
 view.querySelectorAll('[data-open-friendly="true"]').forEach(b=>b.addEventListener('click',()=>{activeFriendlyPage=true;renderSelections('competitions');}));
 view.querySelector('[data-open-worldcup="true"]')?.addEventListener('click',()=>{activeFriendlyPage=false;activeWorldCupQualifier='overview';renderSelections('competitions');});
 view.querySelectorAll('[data-open-worldcup-final="true"]').forEach(b=>b.addEventListener('click',()=>{activeFriendlyPage=false;activeWorldCupQualifier=null;activeWorldCupFinal=true;renderSelections('competitions');}));
 const worldCupFinalBack=document.querySelector('#worldcup-final-back');if(worldCupFinalBack)worldCupFinalBack.addEventListener('click',()=>{activeWorldCupFinal=false;renderSelections('competitions');});
 const icDraw=document.querySelector('#worldcup-intercontinental-draw');if(icDraw)icDraw.addEventListener('click',()=>{drawWorldCupIntercontinental();renderSelections('competitions');});
 const icSim=document.querySelector('#worldcup-intercontinental-simulate');if(icSim)icSim.addEventListener('click',()=>{simulateWorldCupIntercontinental();renderSelections('competitions');});
 const icAdvance=document.querySelector('#worldcup-intercontinental-advance');if(icAdvance)icAdvance.addEventListener('click',()=>{advanceWorldCupIntercontinental();renderSelections('competitions');});
 const icFinals=document.querySelector('#worldcup-intercontinental-simulate-finals');if(icFinals)icFinals.addEventListener('click',()=>{simulateWorldCupIntercontinentalFinals();renderSelections('competitions');});

 view.querySelectorAll('[data-worldcup-confed]').forEach(b=>b.addEventListener('click',()=>{activeWorldCupQualifier=b.dataset.worldcupConfed;activeWorldCupQualifierGroup=null;renderSelections('competitions');}));
 view.querySelector('[data-worldcup-draw]')?.addEventListener('click',e=>drawWorldCupQualifierInitial(e.currentTarget.dataset.worldcupDraw));
 const advanceQualifier=document.querySelector('#worldcup-advance-phase');if(advanceQualifier)advanceQualifier.addEventListener('click',()=>{advanceWorldCupQualifierPhase(activeWorldCupQualifier);renderSelections('competitions');});
 const drawNextQualifier=document.querySelector('#worldcup-draw-next-phase');if(drawNextQualifier)drawNextQualifier.addEventListener('click',()=>{drawWorldCupQualifierNextPhase(activeWorldCupQualifier);renderSelections('competitions');});

 view.querySelectorAll('[data-worldcup-group]').forEach(b=>b.addEventListener('click',()=>{activeWorldCupQualifierGroup=b.dataset.worldcupGroup==='league'?'league':Number(b.dataset.worldcupGroup);renderSelections('competitions');}));
 const groupBack=document.querySelector('#worldcup-group-back');if(groupBack)groupBack.addEventListener('click',()=>{activeWorldCupQualifierGroup=null;renderSelections('competitions');});
 const simulateQualifierRound=document.querySelector('#worldcup-simulate-round');if(simulateQualifierRound)simulateQualifierRound.addEventListener('click',()=>{const draw=worldCupQualifierDraws[activeWorldCupQualifier],key=activeWorldCupQualifierGroup,rounds=key==='league'?draw?.rounds:draw?.groups?.[key]?.rounds,next=rounds?.findIndex(r=>r.matches.some(m=>m.homeGoals===null||m.awayGoals===null));if(next===undefined||next<0)return;simulateWorldCupQualifierRound(activeWorldCupQualifier,key,next);renderSelections('competitions');});
 const simulateQualifierTies=document.querySelector('#worldcup-simulate-ties');if(simulateQualifierTies)simulateQualifierTies.addEventListener('click',()=>{const draw=worldCupQualifierDraws[activeWorldCupQualifier],leg=draw?.ties?.some(t=>t.legs?.[0]?.homeGoals===null)?0:1;simulateWorldCupQualifierTies(activeWorldCupQualifier,leg);renderSelections('competitions');});


 const worldCupBack=document.querySelector('#worldcup-qualifier-back');if(worldCupBack)worldCupBack.addEventListener('click',()=>{activeWorldCupQualifier==='overview'?(activeWorldCupQualifier=null):(activeWorldCupQualifier='overview');renderSelections('competitions');});

 const friendlyBack=document.querySelector('#friendly-back');if(friendlyBack)friendlyBack.addEventListener('click',()=>{activeFriendlyPage=false;renderSelections('competitions');});
 const drawButton=document.querySelector('#friendly-draw');if(drawButton)drawButton.addEventListener('click',drawInternationalFriendlyFixtures);
 const simulateButton=document.querySelector('#friendly-simulate');if(simulateButton)simulateButton.addEventListener('click',simulateInternationalFriendlyFixtures);
 view.querySelectorAll('[data-selection-tab]').forEach(b=>b.addEventListener('click',()=>{activeSelectionConfederation='Todas';if(b.dataset.selectionTab!=='competitions')activeFriendlyPage=false;renderSelections(b.dataset.selectionTab);}));
 const confed=document.querySelector('#selection-confederation');if(confed)confed.addEventListener('change',()=>{activeSelectionConfederation=confed.value;renderSelections('ranking');});
 view.querySelectorAll('[data-team-confed]').forEach(b=>b.addEventListener('click',()=>{activeSelectionConfederation=b.dataset.teamConfed;renderSelections('teams');}));
 const search=document.querySelector('#selection-search');if(search)search.addEventListener('input',()=>{const q=search.value.toLocaleLowerCase('pt-BR');const list=nationalTeams.filter(t=>(activeSelectionConfederation==='Todas'||t.confederation===activeSelectionConfederation)&&(t.name.toLocaleLowerCase('pt-BR').includes(q)||t.fifaName.toLowerCase().includes(q)));document.querySelector('#selection-team-table').innerHTML=selectionTeamTable(list);});
 const matchForm=document.querySelector('#international-match-form');if(matchForm)matchForm.addEventListener('submit',e=>{e.preventDefault();if(recordInternationalMatch(matchForm)){alert('Partida registrada. O ranking mundial e o ranking continental foram atualizados.');renderSelections('ranking');}});
}

function shuffleQualifierTeams(teams){const list=teams.slice();for(let i=list.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[list[i],list[j]]=[list[j],list[i]];}return list;}
function qualifierGroupWinners(groups,count=1){
 const rows=(groups||[]).map(g=>({group:g,table:worldCupQualifierStandings(g.teams,g.rounds||[])}));
 return rows.flatMap(x=>x.table.slice(0,count).map((r,i)=>({...r,groupName:x.group.name,groupRank:i+1})));
}
function qualifierTieAggregate(tie){
 const legs=tie.legs||[];let a=0,b=0;
 legs.forEach(m=>{if(m.homeGoals===null||m.awayGoals===null)return;if(m.home===tie.teams[0].id){a+=m.homeGoals;b+=m.awayGoals;}else{b+=m.homeGoals;a+=m.awayGoals;}});
 return {a,b};
}
function qualifierTieWinner(tie){
 const score=qualifierTieAggregate(tie);if(score.a>score.b)return tie.teams[0].id;if(score.b>score.a)return tie.teams[1].id;
 return tie.penaltyWinner||null;
}
function qualifierAllTiesComplete(ties){
 return !!ties?.length&&ties.every(t=>(t.legs||[]).length>0&&t.legs.every(m=>m.homeGoals!==null&&m.awayGoals!==null)&&(!t.singleLeg||!!qualifierTieWinner(t)));
}
function qualifierAllGroupsComplete(groups){
 return !!groups?.length&&groups.every(g=>g.rounds?.length&&g.rounds.every(r=>r.matches.every(m=>m.homeGoals!==null&&m.awayGoals!==null)));
}
function qualifierNextPhaseName(confederation,phase){
 const labels={UEFA:{1:'Playoffs · semifinais',2:'Playoffs · finais'},CAF:{1:'Playoff continental · semifinais',2:'Playoff continental · final'},AFC:{1:'2ª rodada',2:'3ª rodada',3:'4ª rodada',4:'5ª rodada · playoff'},CONCACAF:{1:'Segunda rodada',2:'Rodada final'},OFC:{1:'Fase de grupos',2:'Semifinais',3:'Final'}};
 return labels[confederation]?.[phase]||'Próxima fase';
}
function qualifierHasNextPhase(confederation,draw){
 const p=Number(draw?.phaseIndex)||0;
 return (confederation==='UEFA'&&p<2)||(confederation==='CAF'&&p<2)||(confederation==='AFC'&&p<4)||(confederation==='CONCACAF'&&p<2)||(confederation==='OFC'&&p<3);
}
function qualifierStageComplete(draw){
 if(draw.ties)return qualifierAllTiesComplete(draw.ties);
 if(draw.groups)return qualifierAllGroupsComplete(draw.groups);
 if(draw.league)return draw.rounds?.length&&draw.rounds.every(r=>r.matches.every(m=>m.homeGoals!==null&&m.awayGoals!==null));
 return false;
}
function qualifierMakeGroups(teams,count,size,doubleRound,namePrefix){
 const groups=Array.from({length:count},(_,i)=>({name:namePrefix+' '+String.fromCharCode(65+i),teams:[],doubleRound:!!doubleRound}));
 const pool=shuffleQualifierTeams(teams);
 pool.forEach((t,i)=>groups[Math.floor(i/size)]?.teams.push({id:t.id,name:t.name,iso:t.iso}));
 groups.forEach(g=>{g.rounds=buildWorldCupQualifierRounds(g.teams.map(t=>t.id),g.doubleRound);});
 return groups;
}
function qualifierMakeTies(teamIds,singleLeg=false){
 const pool=shuffleQualifierTeams(teamIds),ties=[];
 for(let i=0;i<pool.length;i+=2){
  if(!pool[i+1])continue;
  const teams=pool.slice(i,i+2).map(id=>{const t=getNationalTeam(id);return {id:t.id,name:t.name,iso:t.iso};});
  const legs=[{id:uid(),home:teams[0].id,away:teams[1].id,homeGoals:null,awayGoals:null}];
  if(!singleLeg)legs.push({id:uid(),home:teams[1].id,away:teams[0].id,homeGoals:null,awayGoals:null});
  ties.push({teams,legs,singleLeg});
 }
 return ties;
}
function advanceWorldCupQualifierPhase(confederation){
 const draw=worldCupQualifierDraws[confederation];if(!draw||!qualifierStageComplete(draw))return;
 const current=Number(draw.phaseIndex)||0;
 let advancing=[];
 if(draw.ties){
  const winners=draw.ties.map(qualifierTieWinner).filter(Boolean);
  if(confederation==='AFC'&&current===0){
   const preliminary=new Set(draw.ties.flatMap(t=>t.teams.map(x=>x.id)));
   const others=rankedSelections().filter(t=>t.confederation==='AFC'&&!preliminary.has(t.id)).slice(0,26).map(t=>t.id);
   advancing=winners.concat(others);
  }else if(confederation==='CONCACAF'&&current===0){
   const preliminary=new Set(draw.ties.flatMap(t=>t.teams.map(x=>x.id)));
   const hosts=new Set(['CA','MX','US']);
   const others=rankedSelections().filter(t=>t.confederation==='CONCACAF'&&!preliminary.has(t.id)&&!hosts.has(t.iso)).slice(0,28).map(t=>t.id);
   advancing=winners.concat(others);
  }else advancing=winners;
 }else if(draw.groups){
  if(confederation==='OFC'&&current===0){
   const preliminary=new Set(draw.groups.flatMap(g=>g.teams.map(t=>t.id)));
   const winner=qualifierGroupWinners(draw.groups,1).slice(0,1).map(r=>r.id);
   const others=rankedSelections().filter(t=>t.confederation==='OFC'&&!preliminary.has(t.id)).slice(0,7).map(t=>t.id);
   advancing=winner.concat(others);
  }else if(confederation==='CAF'&&current===0)advancing=qualifierGroupWinners(draw.groups,2).filter(r=>r.groupRank===2).sort((a,b)=>b.points-a.points||(b.gf-b.ga)-(a.gf-a.ga)||b.gf-a.gf).slice(0,4).map(r=>r.id);
  else if(confederation==='OFC'&&current===0)advancing=qualifierGroupWinners(draw.groups,1).slice(0,1).map(r=>r.id);
  else if(confederation==='AFC'&&current===1)advancing=qualifierGroupWinners(draw.groups,2).map(r=>r.id);
  else if(confederation==='AFC'&&current===2){const rows=qualifierGroupWinners(draw.groups,4);advancing=rows.filter(r=>r.groupRank===3||r.groupRank===4).map(r=>r.id);}
  else if(confederation==='AFC'&&current===3)advancing=qualifierGroupWinners(draw.groups,2).filter(r=>r.groupRank===2).map(r=>r.id);
  else if(confederation==='CONCACAF'&&current===1)advancing=qualifierGroupWinners(draw.groups,2).map(r=>r.id);
  else if(confederation==='OFC'&&current===1)advancing=qualifierGroupWinners(draw.groups,2).map(r=>r.id);
  else if(confederation==='UEFA'&&current===0){
   const runners=qualifierGroupWinners(draw.groups,2).filter(r=>r.groupRank===2).map(r=>r.id);
   const excluded=new Set(qualifierGroupWinners(draw.groups,1).map(r=>r.id).concat(runners));
   const extra=rankedSelections().filter(t=>t.confederation==='UEFA'&&!excluded.has(t.id)).slice(0,4).map(t=>t.id);
   advancing=runners.concat(extra);
  }
 }else if(draw.league&&confederation==='CONMEBOL')return;
 if(!advancing.length)return;
 draw.history=draw.history||[];
 draw.history.push({phaseIndex:current,phaseName:draw.phaseName||'Fase inicial',groups:draw.groups||null,ties:draw.ties||null,league:draw.league||null,rounds:draw.rounds||null});
 draw.phaseIndex=current+1;
 draw.nextTeams=advancing;
 draw.phasePending=true;
 draw.groups=null;draw.ties=null;draw.league=null;draw.rounds=null;
 localStorage.setItem(WORLDCUP_QUALIFIER_STORE,JSON.stringify(worldCupQualifierDraws));
}
function drawWorldCupQualifierNextPhase(confederation){
 const draw=worldCupQualifierDraws[confederation];if(!draw?.phasePending||!draw.nextTeams?.length)return;
 const ids=draw.nextTeams.slice(),copy=ids.map(id=>{const t=getNationalTeam(id);return {id:t.id,name:t.name,iso:t.iso};}),phase=draw.phaseIndex;
 draw.phasePending=false;draw.nextTeams=null;draw.phaseName=qualifierNextPhaseName(confederation,phase);
 if(confederation==='UEFA'&&phase===1){draw.phaseName='Playoffs · semifinais';draw.ties=qualifierMakeTies(ids,true);}
 else if(confederation==='UEFA'&&phase===2){draw.phaseName='Playoffs · finais';draw.ties=qualifierMakeTies(ids,true);}
 else if(confederation==='CAF'&&phase===1){draw.phaseName='Playoff continental · semifinais';draw.ties=qualifierMakeTies(ids,true);}
 else if(confederation==='CAF'&&phase===2){draw.phaseName='Playoff continental · final';draw.ties=qualifierMakeTies(ids,true);}
 else if(confederation==='AFC'&&phase===1){draw.phaseName='2ª rodada';draw.groups=qualifierMakeGroups(copy,9,4,true,'Grupo');}
 else if(confederation==='AFC'&&phase===2){draw.phaseName='3ª rodada';draw.groups=qualifierMakeGroups(copy,3,6,true,'Grupo');}
 else if(confederation==='AFC'&&phase===3){draw.phaseName='4ª rodada';draw.groups=qualifierMakeGroups(copy,2,3,false,'Grupo');}
 else if(confederation==='AFC'&&phase===4){draw.phaseName='5ª rodada · playoff';draw.ties=qualifierMakeTies(ids,false);}
 else if(confederation==='CONCACAF'&&phase===1){draw.phaseName='Segunda rodada';draw.groups=qualifierMakeGroups(copy,6,5,false,'Grupo');}
 else if(confederation==='CONCACAF'&&phase===2){draw.phaseName='Rodada final';draw.groups=qualifierMakeGroups(copy,3,4,true,'Grupo');}
 else if(confederation==='OFC'&&phase===1){draw.phaseName='Fase de grupos';draw.groups=qualifierMakeGroups(copy,2,4,false,'Grupo');}
 else if(confederation==='OFC'&&phase===2){draw.phaseName='Semifinais';draw.ties=qualifierMakeTies(ids,true);}
 else if(confederation==='OFC'&&phase===3){draw.phaseName='Final';draw.ties=qualifierMakeTies(ids,true);}
 draw.drawnAt=new Date().toLocaleString('pt-BR');
 localStorage.setItem(WORLDCUP_QUALIFIER_STORE,JSON.stringify(worldCupQualifierDraws));
}

let activeWorldCupQualifierGroup=null;
function buildWorldCupQualifierRounds(teamIds,doubleRound=true){
 const teams=teamIds.slice(),rotation=teams.length%2?teams.concat([null]):teams.slice(),size=rotation.length,first=[];
 for(let r=0;r<size-1;r++){
  const matches=[];
  for(let i=0;i<size/2;i++){
   const a=rotation[i],b=rotation[size-1-i];if(!a||!b)continue;
   const home=(r+i)%2===0?a:b,away=home===a?b:a;
   matches.push({id:uid(),home,away,homeGoals:null,awayGoals:null});
  }
  first.push({number:r+1,matches});
  rotation.splice(1,0,rotation.pop());
 }
 return doubleRound?first.concat(first.map((round,i)=>({number:first.length+i+1,matches:round.matches.map(m=>({id:uid(),home:m.away,away:m.home,homeGoals:null,awayGoals:null}))}))):first;
}
function ensureWorldCupQualifierSchedules(confederation){
 const draw=worldCupQualifierDraws[confederation];if(!draw)return;
 if(draw.groups)draw.groups.forEach((g,i)=>{if(!Array.isArray(g.rounds)||!g.rounds.length)g.rounds=buildWorldCupQualifierRounds(g.teams.map(t=>t.id),typeof g.doubleRound==='boolean'?g.doubleRound:confederation!=='CONCACAF'&&confederation!=='OFC');});
 if(draw.league&&!Array.isArray(draw.rounds))draw.rounds=buildWorldCupQualifierRounds(draw.league.map(t=>t.id),true);
 if(draw.ties)draw.ties.forEach(t=>{if(!Array.isArray(t.legs))t.legs=[{id:uid(),home:t.teams[0].id,away:t.teams[1].id,homeGoals:null,awayGoals:null},...(t.singleLeg?[]:[{id:uid(),home:t.teams[1].id,away:t.teams[0].id,homeGoals:null,awayGoals:null}])];});
 localStorage.setItem(WORLDCUP_QUALIFIER_STORE,JSON.stringify(worldCupQualifierDraws));
}
function simulateSelectionGoals(home,away){
 const h=selectionRating(home),a=selectionRating(away);
 const expected=selectionMatchExpected(home,away);
 const strengthDiff=((h.overall-a.overall)*0.045)+((home.points-away.points)/900)+0.18;
 const homeWinChance=1/(1+Math.exp(-strengthDiff));
 const drawChance=0.24;
 const outcomeRoll=Math.random();
 const target=outcomeRoll<drawChance?'draw':outcomeRoll<drawChance+(1-drawChance)*homeWinChance?'home':'away';
 const homeLambda=Math.max(.25,Math.min(3.2,1.35+(h.attack-50)/65+(50-a.defense)/90+.16+(expected-.5)*.35));
 const awayLambda=Math.max(.25,Math.min(3.2,1.15+(a.attack-50)/65+(50-h.defense)/90+(0.5-expected)*.35));
 const poisson=lambda=>{const limit=Math.exp(-lambda);let k=0,p=1;do{k++;p*=Math.random();}while(p>limit&&k<12);return k-1;};
 for(let attempt=0;attempt<40;attempt++){
  const hg=poisson(homeLambda),ag=poisson(awayLambda);
  if((target==='draw'&&hg===ag)||(target==='home'&&hg>ag)||(target==='away'&&hg<ag))return [hg,ag];
 }
 if(target==='draw')return [1,1];
 if(target==='home')return [2,1];
 return [1,2];
}
function recordWorldCupQualifierResult(match){
 const home=getNationalTeam(match.home),away=getNationalTeam(match.away);if(!home||!away||match.homeGoals===null||match.awayGoals===null)return;
 const expected=selectionMatchExpected(home,away),homeOutcome=match.homeGoals>match.awayGoals?1:match.homeGoals<match.awayGoals?0:.5,awayOutcome=1-homeOutcome;
 const weight=MATCH_IMPORTANCE.find(x=>x.id==='qualifiers').weight,homeBefore=home.points,awayBefore=away.points;
 const homeDelta=Number((weight*(homeOutcome-expected)).toFixed(2)),awayDelta=Number((weight*(awayOutcome-(1-expected))).toFixed(2));
 home.points=Number((home.points+homeDelta).toFixed(2));away.points=Number((away.points+awayDelta).toFixed(2));
 home.matches=(home.matches||0)+1;away.matches=(away.matches||0)+1;
 const date=new Date().toISOString().slice(0,10),entry={id:uid(),date,home:home.id,away:away.id,homeGoals:match.homeGoals,awayGoals:match.awayGoals,type:'qualifiers',typeLabel:'Eliminatórias da Copa do Mundo',weight,protectKnockout:false,penaltyWinner:null,homeBefore,awayBefore,homeDelta,awayDelta,homeAfter:home.points,awayAfter:away.points,competition:'Eliminatórias da Copa do Mundo'};
 internationalMatches.unshift(entry);
 home.history=home.history||[];away.history=away.history||[];
 home.history.unshift({date,opponent:away.id,score:match.homeGoals+'–'+match.awayGoals,delta:homeDelta,points:home.points});
 away.history.unshift({date,opponent:home.id,score:match.awayGoals+'–'+match.homeGoals,delta:awayDelta,points:away.points});
 const ranked=rankedSelections();selectionRankHistory.push({date,matchId:entry.id,ranks:Object.fromEntries(ranked.map(t=>[t.id,t.rank])),points:Object.fromEntries(ranked.map(t=>[t.id,t.points]))});
}
function simulateWorldCupQualifierRound(confederation,groupIndex,roundIndex){
 ensureWorldCupQualifierSchedules(confederation);
 const draw=worldCupQualifierDraws[confederation],group=groupIndex==='league'?null:draw?.groups?.[groupIndex],rounds=group?group.rounds:draw?.rounds,round=rounds?.[roundIndex];
 if(!round||round.matches.every(m=>m.homeGoals!==null&&m.awayGoals!==null))return;
 round.matches.forEach(match=>{if(match.homeGoals!==null&&match.awayGoals!==null)return;const result=simulateSelectionGoals(getNationalTeam(match.home),getNationalTeam(match.away));[match.homeGoals,match.awayGoals]=result;recordWorldCupQualifierResult(match);});
 localStorage.setItem(WORLDCUP_QUALIFIER_STORE,JSON.stringify(worldCupQualifierDraws));saveSelections();
}
function simulateWorldCupQualifierTies(confederation,legIndex){
 ensureWorldCupQualifierSchedules(confederation);
 const draw=worldCupQualifierDraws[confederation];if(!draw?.ties)return;
 draw.ties.forEach(tie=>{const match=tie.legs[legIndex];if(!match||match.homeGoals!==null&&match.awayGoals!==null)return;const result=simulateSelectionGoals(getNationalTeam(match.home),getNationalTeam(match.away));[match.homeGoals,match.awayGoals]=result;recordWorldCupQualifierResult(match);if(legIndex===tie.legs.length-1){const aggregate=qualifierTieAggregate(tie);if(aggregate.a===aggregate.b)tie.penaltyWinner=Math.random()<.5?tie.teams[0].id:tie.teams[1].id;}});
 localStorage.setItem(WORLDCUP_QUALIFIER_STORE,JSON.stringify(worldCupQualifierDraws));saveSelections();
}
function worldCupQualifierStandings(teams,rounds){
 const rows=teams.map(t=>({id:t.id,team:t,points:0,played:0,wins:0,draws:0,losses:0,gf:0,ga:0}));
 const map=new Map(rows.map(r=>[r.id,r]));
 (rounds||[]).forEach(round=>(round.matches||[]).forEach(m=>{if(m.homeGoals===null||m.awayGoals===null)return;const h=map.get(m.home),a=map.get(m.away);if(!h||!a)return;h.played++;a.played++;h.gf+=m.homeGoals;h.ga+=m.awayGoals;a.gf+=m.awayGoals;a.ga+=m.homeGoals;if(m.homeGoals>m.awayGoals){h.wins++;h.points+=3;a.losses++;}else if(m.homeGoals<m.awayGoals){a.wins++;a.points+=3;h.losses++;}else{h.draws++;a.draws++;h.points++;a.points++;}}));
 return rows.sort((a,b)=>b.points-a.points||(b.gf-b.ga)-(a.gf-a.ga)||b.gf-a.gf||a.team.name.localeCompare(b.team.name,'pt-BR'));
}
function renderWorldCupQualifierGroup(confederation,groupIndex){
 ensureWorldCupQualifierSchedules(confederation);
 const draw=worldCupQualifierDraws[confederation],league=groupIndex==='league',group=league?null:draw.groups[groupIndex];
 const teams=league?draw.league:group?.teams,rounds=league?draw.rounds:group?.rounds;
 if(!teams||!rounds)return '<div class="panel">Fase não encontrada.</div>';
 const name=league?'Liga única':group.name,done=rounds.filter(r=>r.matches.every(m=>m.homeGoals!==null&&m.awayGoals!==null)).length;
 const next=rounds.findIndex(r=>r.matches.some(m=>m.homeGoals===null||m.awayGoals===null));
 const table=worldCupQualifierStandings(teams,rounds);
 const standings='<div class="table-wrap"><table class="standings"><thead><tr><th>#</th><th>Seleção</th><th>Pts</th><th>J</th><th>V</th><th>E</th><th>D</th><th>GP</th><th>GC</th><th>SG</th></tr></thead><tbody>'+table.map((r,i)=>'<tr><td>'+(i+1)+'</td><td class="team-name">'+flagEmoji(r.team.iso)+' '+esc(r.team.name)+'</td><td>'+r.points+'</td><td>'+r.played+'</td><td>'+r.wins+'</td><td>'+r.draws+'</td><td>'+r.losses+'</td><td>'+r.gf+'</td><td>'+r.ga+'</td><td>'+(r.gf-r.ga)+'</td></tr>').join('')+'</tbody></table></div>';
 const roundHtml=rounds.map((r,i)=>'<section class="round-card"><div class="round-title"><strong>Rodada '+r.number+'</strong><span class="tag">'+(r.matches.every(m=>m.homeGoals!==null&&m.awayGoals!==null)?'Concluída':'Pendente')+'</span></div>'+r.matches.map(m=>{const h=getNationalTeam(m.home),a=getNationalTeam(m.away);return '<div class="fixture"><span class="fixture-team">'+flagEmoji(h?.iso)+' '+esc(h?.name||'')+'</span><strong class="score">'+(m.homeGoals===null?'—':m.homeGoals+' × '+m.awayGoals)+'</strong><span class="fixture-team away">'+flagEmoji(a?.iso)+' '+esc(a?.name||'')+'</span></div>';}).join('')+'</section>').join('');
 return '<div class="worldcup-qualifier-page"><button class="btn btn-secondary" id="worldcup-group-back">← Voltar à eliminatória</button><div class="panel"><span class="eyebrow">ELIMINATÓRIAS FIFA · CICLO 2026</span><h2>'+esc(WORLDCUP_2026_RULES[confederation].name)+' · '+esc(name)+'</h2><p class="muted">Rodadas concluídas: '+done+' de '+rounds.length+'</p><div class="round-controls"><button class="btn" id="worldcup-simulate-round" '+(next<0?'disabled':'')+'>Simular próxima rodada</button></div></div><div class="panel"><h3>Classificação</h3>'+standings+'</div><div class="panel"><h3>Calendário e resultados</h3>'+roundHtml+'</div></div>';
}

function drawWorldCupQualifierInitial(confederation){
 if(worldCupQualifierDraws[confederation]){alert('A fase inicial desta confederação já foi sorteada.');return;}
 const ranked=rankedSelections().filter(t=>t.confederation===confederation),copy=t=>({id:t.id,name:t.name,iso:t.iso});
 let result={confederation,drawnAt:new Date().toLocaleString('pt-BR')};
 if(confederation==='UEFA'||confederation==='CAF'){
  const count=confederation==='UEFA'?12:9,groups=Array.from({length:count},(_,i)=>({name:'Grupo '+String.fromCharCode(65+i),teams:[]}));
  if(confederation==='CAF'){const pool=shuffleQualifierTeams(ranked);pool.forEach((t,i)=>groups[i%count].teams.push(copy(t)));}
  else{const pool=shuffleQualifierTeams(ranked);let cursor=0;groups.forEach((g,i)=>{const size=i<7?5:4;g.teams=pool.slice(cursor,cursor+size).map(copy);cursor+=size;});}
  result.groups=groups;
 }else if(confederation==='CONMEBOL'){result.league=shuffleQualifierTeams(ranked).map(copy);}
 else if(confederation==='AFC'||confederation==='CONCACAF'){
  const lowest=ranked.slice().sort((a,b)=>(Number(b.rank)||0)-(Number(a.rank)||0)).slice(0,confederation==='AFC'?20:4),pool=shuffleQualifierTeams(lowest),ties=[];
  for(let i=0;i<pool.length;i+=2)ties.push({teams:[copy(pool[i]),copy(pool[i+1])]});result.ties=ties;
 }else if(confederation==='OFC'){
  const lowest=ranked.slice().sort((a,b)=>(Number(b.rank)||0)-(Number(a.rank)||0)).slice(0,4);
  result.groups=[{name:'Grupo preliminar',teams:shuffleQualifierTeams(lowest).map(copy)}];
 }
 worldCupQualifierDraws[confederation]=result;ensureWorldCupQualifierSchedules(confederation);localStorage.setItem(WORLDCUP_QUALIFIER_STORE,JSON.stringify(worldCupQualifierDraws));renderSelections('competitions');
}
function renderWorldCupQualifierDetail(confederation){
 const rule=WORLDCUP_2026_RULES[confederation];if(!rule)return '<div class="panel">Confederação não encontrada.</div>';
 const draw=worldCupQualifierDraws[confederation];if(draw)ensureWorldCupQualifierSchedules(confederation);
 const drawButton=draw?'<div class="worldcup-draw-status"><strong>'+(draw.phaseName?esc(draw.phaseName)+' sorteada':'Fase inicial sorteada')+'</strong><span>'+esc(draw.drawnAt||'')+'</span></div>':'<div class="worldcup-draw-action"><p class="muted">O sorteio ainda não foi realizado. Nenhum grupo ou confronto será criado automaticamente.</p><button class="btn" id="worldcup-draw-initial" data-worldcup-draw="'+confederation+'">Sortear fase inicial</button></div>';
 let drawContent='';
 if(draw?.groups)drawContent='<div class="worldcup-drawn-groups">'+draw.groups.map((g,i)=>'<button class="worldcup-drawn-group worldcup-group-open" data-worldcup-group="'+i+'"><h4>'+esc(g.name)+'</h4><span class="muted">'+g.teams.length+' seleções · '+(g.rounds?.length||0)+' rodadas</span>'+g.teams.map(t=>'<div class="worldcup-team-row"><span>'+flagEmoji(t.iso)+' '+esc(t.name)+'</span></div>').join('')+'<strong>Abrir calendário e classificação →</strong></button>').join('')+'</div>';
 if(draw?.ties){
  const legIndex=draw.ties.some(t=>t.legs?.[0]?.homeGoals===null||t.legs?.[0]?.awayGoals===null)?0:1;
  const canSimulate=draw.ties.some(t=>t.legs?.[legIndex]&&t.legs[legIndex].homeGoals===null);
  drawContent='<div class="playoff-panel worldcup-playoff-panel"><div class="playoff-heading"><div><h3>'+esc(draw.phaseName||'Confrontos eliminatórios')+'</h3><p class="muted">'+(draw.ties.every(t=>t.singleLeg)?'Confrontos em jogo único.':'Confrontos em ida e volta, com placar agregado e decisão por pênaltis em caso de empate.')+'</p></div><span class="tag">'+(qualifierAllTiesComplete(draw.ties)?'FASE CONCLUÍDA':'EM DISPUTA')+'</span></div>'+draw.ties.map((tie,i)=>{const aggregate=qualifierTieAggregate(tie),winner=qualifierTieWinner(tie);return '<div class="playoff-tie"><div class="round-title"><strong>'+esc(tie.name||('Confronto '+(i+1)))+'</strong><span class="tag">'+(winner?'Classificado':'Em disputa')+'</span></div>'+tie.teams.map(t=>'<div class="worldcup-team-row"><span>'+flagEmoji(t.iso)+' '+esc(t.name)+'</span></div>').join('')+tie.legs.map((m,j)=>{const h=getNationalTeam(m.home),a=getNationalTeam(m.away);return '<div class="fixture"><span class="fixture-team">'+flagEmoji(h?.iso)+' '+esc(h?.name||'')+'</span><strong class="score">'+(m.homeGoals===null?'—':m.homeGoals+' × '+m.awayGoals)+'</strong><span class="fixture-team away">'+flagEmoji(a?.iso)+' '+esc(a?.name||'')+'</span><small class="leg-label">'+(tie.singleLeg?'Jogo único':j===0?'Jogo de ida':'Jogo de volta')+'</small></div>';}).join('')+'<div class="aggregate-line">'+(tie.singleLeg?'Resultado: ':'Agregado: ')+'<strong>'+aggregate.a+' × '+aggregate.b+'</strong>'+(tie.penaltyWinner?' · Decisão nos pênaltis':'')+(winner?' · <span class="promoted-name">'+esc(getNationalTeam(winner)?.name||'')+' classificado</span>':'')+'</div></div>';}).join('')+(canSimulate?'<div class="playoff-actions"><button class="btn" id="worldcup-simulate-ties">Simular '+(legIndex===0?(draw.ties.every(t=>t.singleLeg)?'confrontos':'jogos de ida'):'jogos de volta')+'</button></div>':'')+'</div>';
 }
 if(draw?.league)drawContent='<button class="worldcup-drawn-group worldcup-group-open" data-worldcup-group="league"><h4>Liga única · 10 seleções</h4><span class="muted">'+(draw.rounds?.length||0)+' rodadas · ida e volta</span>'+draw.league.map((t,i)=>'<div class="worldcup-team-row"><span>'+(i+1)+'. '+flagEmoji(t.iso)+' '+esc(t.name)+'</span></div>').join('')+'<strong>Abrir calendário e classificação →</strong></button>';
 let phaseActions='';
 if(draw?.phasePending)phaseActions='<div class="worldcup-phase-action"><h3>Próxima fase disponível</h3><p class="muted">'+esc(qualifierNextPhaseName(confederation,Number(draw.phaseIndex)||0))+' · '+(draw.nextTeams?.length||0)+' seleções classificadas. O sorteio só será realizado quando você solicitar.</p><button class="btn" id="worldcup-draw-next-phase">Sortear '+esc(qualifierNextPhaseName(confederation,Number(draw.phaseIndex)||0))+'</button></div>';
 else if(draw&&qualifierStageComplete(draw)&&qualifierHasNextPhase(confederation,draw))phaseActions='<div class="worldcup-phase-action"><h3>Fase concluída</h3><p class="muted">Todos os jogos desta etapa foram concluídos e os classificados estão definidos.</p><button class="btn" id="worldcup-advance-phase">Avançar para a próxima fase</button></div>';
 return '<div class="worldcup-qualifier-page"><button class="btn btn-secondary selection-back" id="worldcup-qualifier-back">← Voltar aos continentes</button><div class="panel"><span class="eyebrow">ELIMINATÓRIAS FIFA · CICLO 2026</span><h2>'+esc(rule.name)+'</h2><p class="tag">'+esc(rule.slots)+'</p><p class="muted worldcup-rule-copy">'+esc(rule.format)+'</p><h3>Estrutura oficial</h3><ol class="worldcup-stage-list">'+rule.stages.map(stage=>'<li>'+esc(stage)+'</li>').join('')+'</ol></div><div class="panel"><div class="worldcup-draw-heading"><div><h3>Fase inicial</h3><p class="muted">'+(draw?.phaseName?draw.phaseName:(confederation==='UEFA'?'12 grupos de 4 ou 5 seleções':confederation==='CAF'?'9 grupos de 6 seleções':confederation==='CONMEBOL'?'Liga única com 10 seleções':confederation==='AFC'?'Primeira rodada: 10 confrontos preliminares':confederation==='CONCACAF'?'Primeira rodada: 2 confrontos preliminares':'Fase preliminar: 4 seleções'))+'</p></div>'+drawButton+'</div>'+drawContent+phaseActions+'</div></div>';
}

const WORLDCUP_FINAL_STORE='wfs-worldcup-final-2026-v1';
const WORLDCUP_INTERCONTINENTAL_STORE='wfs-worldcup-intercontinental-2026-v1';
let activeWorldCupFinal=false;
let worldCupIntercontinental=JSON.parse(localStorage.getItem(WORLDCUP_INTERCONTINENTAL_STORE)||'null');
function worldCupStageData(confederation,phase){
 const draw=worldCupQualifierDraws[confederation];if(!draw)return null;
 return (draw.history||[]).find(x=>Number(x.phaseIndex)===phase)||(Number(draw.phaseIndex||0)===phase?draw:null);
}
function worldCupStageComplete(stage){
 if(!stage)return false;
 if(stage.groups)return qualifierAllGroupsComplete(stage.groups);
 if(stage.ties)return qualifierAllTiesComplete(stage.ties);
 if(stage.league)return !!stage.rounds?.length&&stage.rounds.every(r=>r.matches.every(m=>m.homeGoals!==null&&m.awayGoals!==null));
 return false;
}
function worldCupTeamRows(ids){return (ids||[]).filter(Boolean).map(id=>getNationalTeam(id)).filter(Boolean);}
function worldCupQualificationSnapshot(){
 const direct={},playoff={};
 const add=(bucket,key,ids)=>{bucket[key]=worldCupTeamRows(ids).map(t=>t.id);};
 const hosts=worldCupTeamRows(['CA','MX','US'].map(iso=>nationalTeams.find(t=>t.iso===iso)?.id).filter(Boolean)).map(t=>t.id);
 direct.HOSTS=hosts;
 const u0=worldCupStageData('UEFA',0),u2=worldCupStageData('UEFA',2);
 if(u0?.groups&&worldCupStageComplete(u0))add(direct,'UEFA_GROUPS',qualifierGroupWinners(u0.groups,1).map(x=>x.id));
 if(u2?.ties&&worldCupStageComplete(u2))add(direct,'UEFA_PLAYOFFS',u2.ties.map(qualifierTieWinner));
 const cm=worldCupStageData('CONMEBOL',0);
 if(cm?.league&&worldCupStageComplete(cm)){const t=worldCupQualifierStandings(cm.league,cm.rounds);add(direct,'CONMEBOL',t.slice(0,6).map(x=>x.id));add(playoff,'CONMEBOL',t.slice(6,7).map(x=>x.id));}
 const cc=worldCupStageData('CONCACAF',2);
 if(cc?.groups&&worldCupStageComplete(cc)){const t=qualifierGroupWinners(cc.groups,2);add(direct,'CONCACAF',t.filter(x=>x.groupRank===1).map(x=>x.id));add(playoff,'CONCACAF',t.filter(x=>x.groupRank===2).sort((a,b)=>b.points-a.points||(b.gf-b.ga)-(a.gf-a.ga)||b.gf-a.gf).slice(0,2).map(x=>x.id));}
 const af0=worldCupStageData('CAF',0),af2=worldCupStageData('CAF',2);
 if(af0?.groups&&worldCupStageComplete(af0))add(direct,'CAF',qualifierGroupWinners(af0.groups,1).map(x=>x.id));
 if(af2?.ties&&worldCupStageComplete(af2))add(playoff,'CAF',af2.ties.map(qualifierTieWinner));
 const as2=worldCupStageData('AFC',2),as3=worldCupStageData('AFC',3),as4=worldCupStageData('AFC',4);
 if(as2?.groups&&worldCupStageComplete(as2))add(direct,'AFC_THIRD',qualifierGroupWinners(as2.groups,2).map(x=>x.id));
 if(as3?.groups&&worldCupStageComplete(as3))add(direct,'AFC_FOURTH',qualifierGroupWinners(as3.groups,1).map(x=>x.id));
 if(as4?.ties&&worldCupStageComplete(as4))add(playoff,'AFC',as4.ties.map(qualifierTieWinner));
 const oc3=worldCupStageData('OFC',3);
 if(oc3?.ties&&worldCupStageComplete(oc3)&&oc3.ties.length){const f=oc3.ties[0],w=qualifierTieWinner(f);add(direct,'OFC',[w]);add(playoff,'OFC',[f.teams.find(t=>t.id!==w)?.id]);}
 const uniq=a=>[...new Set(a||[])];
 const directByConf={UEFA:uniq([...(direct.UEFA_GROUPS||[]),...(direct.UEFA_PLAYOFFS||[])]),AFC:uniq([...(direct.AFC_THIRD||[]),...(direct.AFC_FOURTH||[])]),CAF:direct.CAF||[],CONMEBOL:direct.CONMEBOL||[],CONCACAF:uniq([...(direct.HOSTS||[]),...(direct.CONCACAF||[])]),OFC:direct.OFC||[]};
 const playoffByConf={AFC:playoff.AFC||[],CAF:playoff.CAF||[],CONMEBOL:playoff.CONMEBOL||[],OFC:playoff.OFC||[],CONCACAF:playoff.CONCACAF||[]};
 const directIds=uniq(Object.values(directByConf).flat()),playoffIds=uniq(Object.values(playoffByConf).flat()).filter(id=>!directIds.includes(id));
 return {directByConf,playoffByConf,directIds,playoffIds,hosts};
}
function worldCupIntercontinentalReady(snap=worldCupQualificationSnapshot()){
 return snap.playoffByConf.AFC.length===1&&snap.playoffByConf.CAF.length===1&&snap.playoffByConf.CONMEBOL.length===1&&snap.playoffByConf.OFC.length===1&&snap.playoffByConf.CONCACAF.length===2&&snap.playoffIds.length===6;
}
function worldCupIntercontinentalSave(){localStorage.setItem(WORLDCUP_INTERCONTINENTAL_STORE,JSON.stringify(worldCupIntercontinental));}
function drawWorldCupIntercontinental(){
 const snap=worldCupQualificationSnapshot();if(!worldCupIntercontinentalReady(snap))return;
 const ranked=rankedSelections(worldCupTeamRows(snap.playoffIds)),seeds=ranked.slice(0,2).map(t=>t.id),unseeded=shuffleQualifierTeams(ranked.slice(2).map(t=>t.id));
 worldCupIntercontinental={phase:'semifinals',seeds,semis:qualifierMakeTies(unseeded,true),finals:[],createdAt:new Date().toISOString()};
 worldCupIntercontinental.semis.forEach((t,i)=>t.name='Semifinal '+(i+1));worldCupIntercontinentalSave();
}
function simulateWorldCupIntercontinental(){
 if(!worldCupIntercontinental||worldCupIntercontinental.phase!=='semifinals')return;
 worldCupIntercontinental.semis.forEach(t=>{const m=t.legs[0];if(m.homeGoals!==null)return;const [h,a]=simulateSelectionGoals(getNationalTeam(m.home),getNationalTeam(m.away));m.homeGoals=h;m.awayGoals=a;if(h===a)t.penaltyWinner=Math.random()<.5?m.home:m.away;recordWorldCupQualifierResult(m);});
 worldCupIntercontinental.phase='semifinals-complete';worldCupIntercontinentalSave();saveSelections();
}
function advanceWorldCupIntercontinental(){
 if(!worldCupIntercontinental||worldCupIntercontinental.phase!=='semifinals-complete')return;
 const winners=worldCupIntercontinental.semis.map(qualifierTieWinner).filter(Boolean);if(winners.length!==2)return;
 worldCupIntercontinental.finals=shuffleQualifierTeams(worldCupIntercontinental.seeds).map((seed,i)=>{const t=qualifierMakeTies([seed,winners[i]],true)[0];t.name='Final '+(i+1);return t;});
 worldCupIntercontinental.phase='finals';worldCupIntercontinentalSave();
}
function simulateWorldCupIntercontinentalFinals(){
 if(!worldCupIntercontinental||worldCupIntercontinental.phase!=='finals')return;
 worldCupIntercontinental.finals.forEach(t=>{const m=t.legs[0];if(m.homeGoals!==null)return;const [h,a]=simulateSelectionGoals(getNationalTeam(m.home),getNationalTeam(m.away));m.homeGoals=h;m.awayGoals=a;if(h===a)t.penaltyWinner=Math.random()<.5?m.home:m.away;recordWorldCupQualifierResult(m);});
 worldCupIntercontinental.phase='complete';worldCupIntercontinentalSave();saveSelections();
}
function renderWorldCupIntercontinental(snap){
 const ready=worldCupIntercontinentalReady(snap),state=worldCupIntercontinental;
 const name=id=>{const t=getNationalTeam(id);return t?flagEmoji(t.iso)+' '+esc(t.name):'A definir';};
 const ties=items=>'<div class="playoff-panel">'+items.map((t,i)=>{const m=t.legs[0],w=qualifierTieWinner(t);return '<div class="playoff-tie"><div class="round-title"><strong>'+esc(t.name||('Confronto '+(i+1)))+'</strong><span class="tag">'+(w?'Concluído':'Pendente')+'</span></div><div class="fixture"><span class="fixture-team">'+name(m.home)+'</span><strong class="score">'+(m.homeGoals===null?'—':m.homeGoals+' × '+m.awayGoals)+'</strong><span class="fixture-team away">'+name(m.away)+'</span><small class="leg-label">Jogo único</small></div>'+(w?'<div class="aggregate-line">Classificado: <strong>'+name(w)+'</strong></div>':'')+'</div>';}).join('')+'</div>';
 let body='';
 if(!state)body='<p class="muted">A repescagem será liberada quando as seis vagas continentais estiverem preenchidas. As duas seleções mais bem colocadas no ranking entram diretamente nas finais.</p>'+(ready?'<button class="btn" id="worldcup-intercontinental-draw">Sortear repescagem internacional</button>':'<span class="tag">Aguardando classificações continentais</span>');
 else if(state.phase==='semifinals'||state.phase==='semifinals-complete')body='<h4>Semifinais</h4>'+ties(state.semis)+(state.phase==='semifinals'?'<button class="btn" id="worldcup-intercontinental-simulate">Simular semifinais</button>':'<button class="btn" id="worldcup-intercontinental-advance">Avançar para as finais</button>');
 else body='<h4>Finais · cabeças de chave</h4><p>'+state.seeds.map(name).join(' · ')+'</p>'+ties(state.finals)+(state.phase==='finals'?'<button class="btn" id="worldcup-intercontinental-simulate-finals">Simular finais</button>':'<span class="tag">Repescagem concluída</span>');
 return '<div class="panel"><span class="eyebrow">ÚLTIMAS VAGAS · FIFA</span><h3>Repescagem internacional</h3><p class="muted">Seis seleções: uma da AFC, uma da CAF, uma da CONMEBOL, uma da OFC e duas da CONCACAF. As duas melhores no ranking no momento do sorteio são cabeças de chave.</p>'+body+'</div>';
}
function renderWorldCupFinalPage(){
 const snap=worldCupQualificationSnapshot(),confeds=[['UEFA','Europa',16],['AFC','Ásia',8],['CAF','África',9],['CONMEBOL','América do Sul',6],['CONCACAF','América do Norte, Central e Caribe',6],['OFC','Oceania',1]];
 const count=code=>snap.directByConf[code]?.length||0;
 const qualified=[...snap.directIds,...(worldCupIntercontinental?.phase==='complete'?worldCupIntercontinental.finals.map(qualifierTieWinner).filter(Boolean):[])];
 const team=id=>{const t=getNationalTeam(id);return t?'<div class="worldcup-team-row">'+flagEmoji(t.iso)+' '+esc(t.name)+'</div>':'';};
 const cards=confeds.map(([code,label,total])=>'<div class="worldcup-slot-card"><strong>'+label+'</strong><span>'+count(code)+' / '+total+' vagas diretas preenchidas</span><div class="worldcup-slot-track"><i style="width:'+Math.min(100,count(code)/total*100)+'%"></i></div><small>'+(count(code)>=total?'Vagas completas':'Aguardando resultados')+'</small>'+((snap.directByConf[code]||[]).length?'<div class="worldcup-qualified-list">'+snap.directByConf[code].map(team).join('')+'</div>':'')+'</div>').join('');
 const repechage=Object.entries(snap.playoffByConf).map(([code,ids])=>'<div class="worldcup-slot-card"><strong>'+code+'</strong><span>'+ids.length+' classificado(s) para a repescagem</span>'+(ids.length?'<div class="worldcup-qualified-list">'+ids.map(team).join('')+'</div>':'<small>Aguardando definição</small>')+'</div>').join('');
 return '<div class="worldcup-qualifier-page"><button class="btn btn-secondary selection-back" id="worldcup-final-back">← Voltar para competições</button><div class="panel"><span class="eyebrow">FIFA · EDIÇÃO 2026</span><h2>Copa do Mundo FIFA</h2><p class="muted">48 seleções · Canadá, México e Estados Unidos como sedes. As vagas são atualizadas conforme as fases das eliminatórias são concluídas.</p><div class="worldcup-final-summary"><div><strong>'+qualified.length+' / 48</strong><span>seleções classificadas</span></div><div><strong>'+snap.hosts.length+'</strong><span>países-sede classificados</span></div><div><strong>'+snap.playoffIds.length+' / 6</strong><span>vagas de repescagem definidas</span></div></div></div><div class="panel"><h3>Países-sede</h3><div class="worldcup-hosts">'+snap.hosts.map(team).join('')+'</div></div><div class="panel"><h3>Vagas por continente</h3><div class="worldcup-slots-grid">'+cards+'</div></div><div class="panel"><h3>Vagas da repescagem internacional</h3><div class="worldcup-slots-grid">'+repechage+'</div></div>'+renderWorldCupIntercontinental(snap)+'<div class="panel"><h3>Classificados para a Copa do Mundo</h3><div class="worldcup-final-qualified">'+(qualified.length?qualified.map(team).join(''):'<p class="muted">Nenhuma seleção classificada ainda. Inicie as eliminatórias para preencher as vagas.</p>')+'</div></div></div>';
}
function renderWorldCupQualifiers(){
 const cards=Object.entries(WORLDCUP_2026_RULES).map(([code,rule])=>'<button type="button" class="competition-open worldcup-confed-card" data-worldcup-confed="'+code+'"><span><strong>'+esc(rule.name)+'</strong><small>'+esc(rule.slots)+'</small></span><span class="competition-open-action">Abrir regulamento →</span></button>').join('');
 const snap=worldCupQualificationSnapshot();
 return '<div class="worldcup-qualifier-page"><button class="btn btn-secondary selection-back" id="worldcup-qualifier-back">← Voltar para competições</button><div class="panel"><span class="eyebrow">WFS · COPA DO MUNDO FIFA 2026</span><h2>Eliminatórias continentais</h2><p class="muted">Regulamentos do ciclo de 2026. Cada confederação mantém seu próprio formato, quantidade de vagas, fases e critérios de repescagem.</p><div class="worldcup-confed-grid">'+cards+'</div></div>'+renderWorldCupIntercontinental(snap)+'</div>';
}
function renderInternationalFriendliesPage(){
 const draw=internationalFriendlyDraw,fixtures=draw?.fixtures||[],simulated=!!draw?.simulated;
 const rows=fixtures.map((m,i)=>{const home=getNationalTeam(m.home),away=getNationalTeam(m.away);const score=m.homeGoals===null||m.homeGoals===undefined?'—':m.homeGoals+' × '+m.awayGoals;return '<tr><td>'+(i+1)+'</td><td class="team-name">'+flagEmoji(home?.iso)+' '+esc(home?.name||'')+'</td><td class="friendly-score">'+score+'</td><td class="team-name">'+flagEmoji(away?.iso)+' '+esc(away?.name||'')+'</td><td>'+(m.homeGoals===null||m.homeGoals===undefined?'Pendente':'Simulado')+'</td></tr>';}).join('');
 return '<div class="friendly-page"><button class="btn btn-secondary selection-back" id="friendly-back">← Voltar para competições</button><div class="panel friendly-intro"><div><span class="eyebrow">WFS · FUTEBOL INTERNACIONAL</span><h2>Amistosos internacionais</h2><p class="muted">Sorteio aleatório de 100 partidas. Cada seleção participa de no máximo uma partida neste sorteio.</p></div><div class="friendly-weight"><strong>Peso 10</strong><span>Amistoso na Data FIFA</span></div></div><div class="panel"><div class="friendly-actions"><div><h3>Programação dos amistosos</h3><p class="muted">'+(fixtures.length?(simulated?'Os 100 jogos já foram simulados e contabilizados no ranking.':'Sorteio pronto: 100 partidas · 200 seleções · 11 seleções de folga.'):'Ainda não há jogos sorteados.')+'</p></div><div class="friendly-buttons"><button class="btn" id="friendly-draw">Sortear jogos</button>'+(fixtures.length&&!simulated?'<button class="btn friendly-simulate" id="friendly-simulate">Simular jogos</button>':'')+'</div></div>'+(fixtures.length?'<div class="table-wrap"><table class="standings friendly-fixture-table"><thead><tr><th>#</th><th>MANDANTE</th><th>PLACAR</th><th>VISITANTE</th><th>STATUS</th></tr></thead><tbody>'+rows+'</tbody></table></div>':'<div class="friendly-empty">Clique em <strong>Sortear jogos</strong> para gerar os 100 confrontos.</div>')+'</div></div>';
}
function drawInternationalFriendlyFixtures(){
 const shuffled=[...nationalTeams].sort(()=>Math.random()-0.5).slice(0,200),fixtures=[];
 for(let i=0;i<200;i+=2){const first=shuffled[i],second=shuffled[i+1],homeFirst=Math.random()<0.5;fixtures.push({id:uid(),home:(homeFirst?first:second).id,away:(homeFirst?second:first).id,homeGoals:null,awayGoals:null});}
 internationalFriendlyDraw={id:uid(),createdAt:new Date().toISOString(),simulated:false,fixtures};
 localStorage.setItem(FRIENDLY_DRAW_STORE,JSON.stringify(internationalFriendlyDraw));renderSelections('competitions');
}
function poissonGoals(lambda){const limit=Math.exp(-lambda);let product=1,count=0;do{count++;product*=Math.random();}while(product>limit&&count<9);return Math.max(0,count-1);}
function simulateInternationalFriendlyFixtures(){
 if(!internationalFriendlyDraw||internationalFriendlyDraw.simulated||internationalFriendlyDraw.fixtures.length!==100)return;
 const date=new Date().toISOString().slice(0,10);
 internationalFriendlyDraw.fixtures.forEach(fixture=>{
  const home=getNationalTeam(fixture.home),away=getNationalTeam(fixture.away);if(!home||!away)return;
  const difference=Math.max(-0.65,Math.min(0.65,(home.points-away.points)/900));
  const homeGoals=poissonGoals(Math.max(0.25,1.35+difference+0.12)),awayGoals=poissonGoals(Math.max(0.2,1.15-difference));
  const simulatedForm={home:{value:home.id},away:{value:away.id},homeGoals:{value:String(homeGoals)},awayGoals:{value:String(awayGoals)},matchType:{value:'friendly_inside'},matchDate:{value:date},penaltyWinner:{value:''},knockoutProtection:{checked:false}};
  if(recordInternationalMatch(simulatedForm)){fixture.homeGoals=homeGoals;fixture.awayGoals=awayGoals;fixture.date=date;}
 });
 internationalFriendlyDraw.simulated=true;internationalFriendlyDraw.simulatedAt=new Date().toISOString();
 localStorage.setItem(FRIENDLY_DRAW_STORE,JSON.stringify(internationalFriendlyDraw));renderSelections('competitions');
}
function renderSelectionProfile(id){
 const team=getNationalTeam(id);if(!team){activeSelectionProfileId=null;renderSelections(activeSelectionTab);return;}
 const ranked=rankedSelections(),current=ranked.find(t=>t.id===id),previous=selectionRankHistory.length>1?selectionRankHistory[selectionRankHistory.length-2].ranks?.[id]:null;
 const history=selectionRankHistory.filter(s=>s.ranks&&Number.isFinite(Number(s.ranks[id])));
 const recent=history.slice(-12),width=720,height=230,pad=34;
 let chart='<div class="selection-chart-empty">Ainda não há histórico de posições suficiente. Registre partidas internacionais para começar a construir a evolução desta seleção.</div>';
 if(recent.length>=2){
  const maxRank=Math.max(10,...recent.map(x=>Number(x.ranks[id]))),x=i=>pad+i*(width-2*pad)/(recent.length-1),y=r=>pad+(Number(r)-1)*(height-2*pad)/(maxRank-1);
  const coords=recent.map((p,i)=>[x(i),y(p.ranks[id])]);
  const path=coords.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ');
  chart='<div class="selection-chart-wrap"><svg class="selection-rank-chart" viewBox="0 0 '+width+' '+height+'" role="img" aria-label="Evolução da posição no ranking mundial">'+[1,Math.ceil(maxRank/2),maxRank].map(r=>'<line x1="'+pad+'" y1="'+y(r)+'" x2="'+(width-pad)+'" y2="'+y(r)+'" class="chart-grid"/><text x="4" y="'+(y(r)+4)+'" class="chart-label">'+r+'º</text>').join('')+'<path d="'+path+'" class="chart-line"/>'+coords.map((p,i)=>'<circle cx="'+p[0]+'" cy="'+p[1]+'" r="4" class="chart-dot"><title>'+recent[i].date+': '+recent[i].ranks[id]+'º lugar</title></circle>').join('')+'<text x="'+pad+'" y="'+(height-5)+'" class="chart-label">'+recent[0].date+'</text><text x="'+(width-pad)+'" y="'+(height-5)+'" text-anchor="end" class="chart-label">'+recent[recent.length-1].date+'</text></svg></div>';
 }else if(recent.length===1){chart='<div class="selection-chart-empty">Primeiro registro: '+recent[0].date+' · '+recent[0].ranks[id]+'º lugar. Mais partidas serão necessárias para formar a linha de evolução.</div>';}
 const rating=selectionRating(team);
 const historyRows=(team.history||[]).slice(0,10).map(h=>{const opponent=getNationalTeam(h.opponent);return '<tr><td>'+esc(h.date)+'</td><td>'+flagEmoji(opponent?.iso)+' '+esc(opponent?.name||'Seleção')+'</td><td>'+esc(h.score)+'</td><td class="'+(h.delta>=0?'points-up':'points-down')+'">'+(h.delta>0?'+':'')+Number(h.delta).toFixed(2)+'</td><td>'+Number(h.points).toFixed(2)+'</td></tr>';}).join('');
 view.innerHTML='<div class="selection-profile"><button class="btn btn-secondary selection-back" id="selection-profile-back">← Voltar para seleções</button><div class="selection-profile-hero"><div class="selection-profile-flag">'+flagEmoji(team.iso)+'</div><div class="selection-profile-name"><span class="eyebrow">WFS · SELEÇÃO NACIONAL</span><h2>'+esc(team.name)+'</h2><p>'+esc(team.fifaName)+' · '+esc(CONFEDERATION_NAMES[team.confederation]||team.confederation)+'</p></div><div class="selection-profile-rank"><strong>'+current.rank+'º</strong><span>Ranking mundial</span></div></div><div class="selection-profile-stats"><div><span>Pontuação atual</span><strong>'+Number(team.points).toFixed(2)+'</strong></div><div><span>Jogos registrados</span><strong>'+Number(team.matches||0)+'</strong></div><div><span>Posição anterior</span><strong>'+(previous?previous+'º':'—')+'</strong></div><div><span>Melhor posição registrada</span><strong>'+(history.length?Math.min(...history.map(h=>Number(h.ranks?.[id]||999)))+'º':'—')+'</strong></div></div><section class="panel selection-profile-panel"><div class="panel-head"><div><h3>Força da seleção</h3><p class="muted">Escala de 1 a 100, seguindo o mesmo modelo de avaliação dos clubes. A força esportiva é independente dos pontos do ranking.</p></div></div><form id="selection-rating-form" class="rating-grid"><div class="field"><label for="selection-rating-overall">Força geral</label><input id="selection-rating-overall" type="number" min="1" max="100" value="'+rating.overall+'" required></div><div class="field"><label for="selection-rating-attack">Ataque</label><input id="selection-rating-attack" type="number" min="1" max="100" value="'+rating.attack+'" required></div><div class="field"><label for="selection-rating-defense">Defesa</label><input id="selection-rating-defense" type="number" min="1" max="100" value="'+rating.defense+'" required></div><button class="btn" type="submit">Salvar força</button></form><div class="rating-bars"><div><span>Geral</span><strong>'+rating.overall+'/100</strong><i><b style="width:'+rating.overall+'%"></b></i></div><div><span>Ataque</span><strong>'+rating.attack+'/100</strong><i><b style="width:'+rating.attack+'%"></b></i></div><div><span>Defesa</span><strong>'+rating.defense+'/100</strong><i><b style="width:'+rating.defense+'%"></b></i></div></div></section><section class="panel selection-profile-panel"><div class="panel-head"><div><h3>Evolução no ranking mundial</h3><p class="muted">A posição é registrada após cada partida internacional. Quanto mais alto o ponto no gráfico, melhor a posição.</p></div><span class="tag">ÚLTIMOS '+recent.length+' REGISTROS</span></div>'+chart+'</section><section class="panel selection-profile-panel"><div class="panel-head"><div><h3>Últimas partidas</h3><p class="muted">Resultados e impacto na pontuação da seleção.</p></div></div>'+(historyRows?'<div class="table-wrap"><table class="standings"><thead><tr><th>DATA</th><th>ADVERSÁRIO</th><th>PLACAR</th><th>VARIAÇÃO</th><th>PONTOS</th></tr></thead><tbody>'+historyRows+'</tbody></table></div>':'<div class="empty">Nenhuma partida registrada para esta seleção.</div>')+'</section></div>';
 document.querySelector('#selection-rating-form').addEventListener('submit',e=>{e.preventDefault();const values=['overall','attack','defense'].map(k=>Number(document.querySelector('#selection-rating-'+k).value));if(values.some(v=>!Number.isInteger(v)||v<1||v>100)){alert('Informe valores inteiros entre 1 e 100.');return;}[team.overall,team.attack,team.defense]=values;saveSelections();renderSelectionProfile(id);});
 document.querySelector('#selection-profile-back').addEventListener('click',()=>{activeSelectionProfileId=null;renderSelections(activeSelectionTab);});
}
function selectionRankingTable(list){
 return '<div class="table-wrap"><table class="standings selection-ranking"><thead><tr><th>POS.</th><th>SELEÇÃO</th><th>CONFEDERAÇÃO</th><th>PONTOS</th><th>JOGOS</th></tr></thead><tbody>'+list.map(t=>'<tr class="selection-clickable" data-selection-profile="'+t.id+'" tabindex="0" role="button"><td>'+t.rank+'º</td><td class="team-name">'+flagEmoji(t.iso)+' '+esc(t.name)+'</td><td>'+t.confederation+'</td><td><strong>'+Number(t.points).toFixed(2).replace(/\\.00$/,'')+'</strong></td><td>'+Number(t.matches||0)+'</td></tr>').join('')+'</tbody></table></div>';
}
function selectionTeamTable(list){
 const sorted=[...list].sort((a,b)=>Number(b.points||0)-Number(a.points||0)||a.name.localeCompare(b.name,'pt-BR'));
 return '<div class="table-wrap"><table class="standings selection-ranking"><thead><tr><th>SELEÇÃO</th><th>CÓDIGO ISO</th><th>CONFEDERAÇÃO</th><th>PONTOS</th></tr></thead><tbody>'+sorted.map(t=>'<tr class="selection-clickable" data-selection-profile="'+t.id+'" tabindex="0" role="button"><td class="team-name">'+flagEmoji(t.iso)+' '+esc(t.name)+'</td><td>'+t.iso+'</td><td>'+t.confederation+'</td><td>'+Number(t.points).toFixed(2).replace(/\\.00$/,'')+'</td></tr>').join('')+'</tbody></table></div>';
}

function save(){seasons.forEach(s=>s.competitions.forEach(c=>{if(c.colombiaTournaments&&c.colombiaActivePhase)c.colombiaTournaments[c.colombiaActivePhase].rounds=c.rounds||[];if(c.ecuadorDivision&&c.ecuadorStage==='final'&&c.rounds?.length)c.ecuadorFinalRounds=JSON.parse(JSON.stringify(c.rounds));if(c.ecuadorDivision&&c.ecuadorStage==='regular'&&c.rounds?.length)c.ecuadorRegularRounds=JSON.parse(JSON.stringify(c.rounds));if(c.venezuelaDivision==='Primera División'&&c.rounds?.length){if(c.venezuelaStage==='regular')c.venezuelaRegularRounds=JSON.parse(JSON.stringify(c.rounds));if(c.venezuelaStage==='quadrangular')c.venezuelaFinalRounds=JSON.parse(JSON.stringify(c.rounds));}if(c.venezuelaDivision==='Segunda División'&&c.venezuelaStage==='regional'&&c.rounds?.length)c.venezuelaRegionalRounds=JSON.parse(JSON.stringify(c.rounds));if(c.boliviaDivision&&c.boliviaStage==='groups'&&c.rounds?.length)c.boliviaGroupRounds=JSON.parse(JSON.stringify(c.rounds));if(c.libertadoresCompetition&&c.libertadoresStage==='groups'&&c.rounds?.length)c.libertadoresGroupRounds=JSON.parse(JSON.stringify(c.rounds));if(c.sudamericanaCompetition&&c.sudamericanaStage==='groups'&&c.rounds?.length)c.sudamericanaGroupRounds=JSON.parse(JSON.stringify(c.rounds));}));data={clubs,seasons};localStorage.setItem(STORE,JSON.stringify(data));}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function getClub(id){return clubs.find(c=>c.id===id);}
function randomInt(min,max){return Math.floor(Math.random()*(max-min+1))+min;}
function boundedRating(value){return Math.max(1,Math.min(100,Math.round(value)));}
function initializeClubRating(club){
 if(club.initialRating&&Number.isFinite(club.initialRating.overall))return;
 const overall=Number.isFinite(club.overall)?boundedRating(club.overall):randomInt(48,84);
 const attack=Number.isFinite(club.attack)?boundedRating(club.attack):boundedRating(overall+randomInt(-9,9));
 const defense=Number.isFinite(club.defense)?boundedRating(club.defense):boundedRating(overall+randomInt(-9,9));
 club.overall=overall;club.attack=attack;club.defense=defense;club.initialRating={overall,attack,defense};
}
function ensureUruguay2026(){
 const findOrAdd=(name,department)=>{let club=clubs.find(c=>slugify(c.name)===slugify(name));if(!club){club={id:uid(),name,state:department||'',slug:slugify(name)};initializeClubRating(club);clubs.push(club);}return club.id;};
 const existing=seasons.find(s=>s.year===2026);if(!existing)return;
 if(existing.competitions.some(c=>c.country==='Uruguai'))return;
 const ids=list=>list.map(([name,department])=>findOrAdd(name,department));
 const primera=ids(URUGUAY_PRIMERA_2026);
 const segundaA=ids(URUGUAY_SEGUNDA_2026.A),segundaB=ids(URUGUAY_SEGUNDA_2026.B);
 const make=(id,name,division,format,participants,extra={})=>({id,name,country:'Uruguai',division,format,participants,...extra});
 existing.competitions.push(
  make('uru-primera-apertura-2026','Liga AUF Uruguaya · Torneo Apertura','Primera División','2026 · 16 clubes · 15 rodadas · turno único',primera,{uruguayType:'primera-apertura',singleRound:true}),
  make('uru-primera-intermedio-a-2026','Torneo Intermedio · Série A','Torneo Intermedio','2026 · 8 clubes · 7 rodadas · turno único',ids(URUGUAY_INTERMEDIO_2026.A.map(name=>[name,URUGUAY_PRIMERA_2026.find(x=>x[0]===name)?.[1]||''])),{uruguayType:'intermedio-serie',singleRound:true}),
  make('uru-primera-intermedio-b-2026','Torneo Intermedio · Série B','Torneo Intermedio','2026 · 8 clubes · 7 rodadas · turno único',ids(URUGUAY_INTERMEDIO_2026.B.map(name=>[name,URUGUAY_PRIMERA_2026.find(x=>x[0]===name)?.[1]||''])),{uruguayType:'intermedio-serie',singleRound:true}),
  make('uru-primera-clausura-2026','Liga AUF Uruguaya · Torneo Clausura','Primera División','2026 · 16 clubes · 15 rodadas · turno único',primera,{uruguayType:'primera-clausura',singleRound:true}),
  make('uru-segunda-competencia-a-2026','Torneo Competencia · Série A','Segunda División Profesional','2026 · 7 clubes · 7 rodadas · turno único',segundaA,{uruguayType:'competencia-serie',singleRound:true}),
  make('uru-segunda-competencia-b-2026','Torneo Competencia · Série B','Segunda División Profesional','2026 · 7 clubes · 7 rodadas · turno único',segundaB,{uruguayType:'competencia-serie',singleRound:true}),
  make('uru-segunda-regular-2026','Segunda División Profesional · Fase Regular','Segunda División Profesional','2026 · 14 clubes · 26 rodadas · ida e volta',[...segundaA,...segundaB],{uruguayType:'segunda-regular'})
 );
}
function migrateUruguayIntermedioCompetition(){
 const season=seasons.find(s=>s.year===2026);if(!season)return;
 const legacyA=season.competitions.find(c=>c.id==='uru-primera-intermedio-a-2026');
 const legacyB=season.competitions.find(c=>c.id==='uru-primera-intermedio-b-2026');
 if(season.competitions.some(c=>c.uruguayType==='intermedio')||(!legacyA&&!legacyB))return;
 const zones={A:[...(legacyA?.participants||[])],B:[...(legacyB?.participants||[])]};
 const ra=legacyA?.rounds||[],rb=legacyB?.rounds||[];
 const rounds=Array.from({length:Math.max(ra.length,rb.length)},(_,i)=>({number:i+1,matches:[...(ra[i]?.matches||[]),...(rb[i]?.matches||[])]}));
 const merged={...(legacyA||legacyB),id:'uru-primera-intermedio-2026',name:'Torneo Intermedio',division:'Primera División',format:'2026 · 2 séries de 8 clubes · 7 rodadas · final entre os líderes',uruguayType:'intermedio',zones,participants:[...zones.A,...zones.B],rounds};
 season.competitions=season.competitions.filter(c=>c!==legacyA&&c!==legacyB);season.competitions.push(merged);
}
function migrateUruguayCompetenciaCompetition(){
 const season=seasons.find(s=>s.year===2026);if(!season)return;const a=season.competitions.find(c=>c.id==='uru-segunda-competencia-a-2026'),b=season.competitions.find(c=>c.id==='uru-segunda-competencia-b-2026');
 if(season.competitions.some(c=>c.uruguayType==='competencia')||(!a&&!b))return;const zones={A:[...(a?.participants||[])],B:[...(b?.participants||[])]},ra=a?.rounds||[],rb=b?.rounds||[];
 const rounds=Array.from({length:Math.max(ra.length,rb.length)},(_,i)=>({number:i+1,matches:[...(ra[i]?.matches||[]),...(rb[i]?.matches||[])]}));const merged={...(a||b),id:'uru-segunda-competencia-2026',name:'Torneo Competencia',division:'Segunda División Profesional',format:'2026 · séries A e B de 7 clubes · 7 rodadas · final entre os líderes',uruguayType:'competencia',zones,participants:[...zones.A,...zones.B],rounds};season.competitions=season.competitions.filter(c=>c!==a&&c!==b);season.competitions.push(merged);
}
const COLOMBIA_PRIMERA_2026=[
 ['Águilas Doradas','Antioquia'],['Alianza FC','Cesar'],['América de Cali','Valle del Cauca'],['Deportivo Pasto','Nariño'],
 ['Atlético Bucaramanga','Santander'],['Atlético Nacional','Antioquia'],['Boyacá Chicó','Boyacá'],['Cúcuta Deportivo','Norte de Santander'],
 ['Deportivo Cali','Valle del Cauca'],['Independiente Medellín','Antioquia'],['Deportivo Pereira','Risaralda'],['Deportes Tolima','Tolima'],
 ['Fortaleza CEIF','Bogotá D.C.'],['Independiente Santa Fe','Bogotá D.C.'],['Internacional de Bogotá','Bogotá D.C.'],['Jaguares de Córdoba','Córdoba'],
 ['Junior','Atlántico'],['Llaneros FC','Meta'],['Millonarios','Bogotá D.C.'],['Once Caldas','Caldas']
];
const COLOMBIA_SEGUNDA_2026=[
 ['Atlético FC','Valle del Cauca'],['Barranquilla FC','Atlántico'],['Boca Juniors de Cali','Valle del Cauca'],['Bogotá FC','Bogotá D.C.'],
 ['Deportes Quindío','Quindío'],['Envigado FC','Antioquia'],['Independiente Yumbo','Valle del Cauca'],['Internacional FC Palmira','Valle del Cauca'],
 ['Leones FC','Antioquia'],['Orsomarso SC','Valle del Cauca'],['Patriotas Boyacá','Boyacá'],['Real Cartagena','Bolívar'],
 ['Real Cundinamarca','Cundinamarca'],['Real Santander','Santander'],['Tigres FC','Bogotá D.C.'],['Unión Magdalena','Magdalena']
];
function ensureColombia2026(){
 const existing=seasons.find(s=>s.year===2026);if(!existing||existing.competitions.some(c=>c.country==='Colômbia'))return;
 const findOrAdd=(name,department)=>{let club=clubs.find(c=>slugify(c.name)===slugify(name));if(!club){club={id:uid(),name,state:department||'',slug:slugify(name)};initializeClubRating(club);clubs.push(club);}return club.id;};
 const ids=list=>list.map(([name,department])=>findOrAdd(name,department));
 const primera=ids(COLOMBIA_PRIMERA_2026),segunda=ids(COLOMBIA_SEGUNDA_2026);
 const make=(id,name,division,format,participants,colombiaType)=>({id,name,country:'Colômbia',division,format,participants,singleRound:true,colombiaType});
 existing.competitions.push(
  make('col-primera-apertura-2026','Liga BetPlay · Apertura','Primera División','2026 · 20 clubes · 19 rodadas · turno único',primera,'primera-apertura'),
  make('col-primera-clausura-2026','Liga BetPlay · Clausura','Primera División','2026 · 20 clubes · 19 rodadas · turno único · mandos invertidos',primera,'primera-clausura'),
  make('col-segunda-apertura-2026','Torneo BetPlay · Apertura','Segunda División','2026 · 16 clubes · 15 rodadas · turno único',segunda,'segunda-apertura'),
  make('col-segunda-clausura-2026','Torneo BetPlay · Clausura','Segunda División','2026 · 16 clubes · 15 rodadas · turno único · mandos invertidos',segunda,'segunda-clausura')
 );
}
function migrateColombiaCompetitions(){
 seasons.forEach(season=>{
  const legacy=season.competitions.filter(c=>c.country==='Colômbia'&&c.colombiaType);
  if(!legacy.length||season.competitions.some(c=>c.country==='Colômbia'&&c.colombiaDivision))return;
  const make=(division,typeA,typeC,id,name)=>{
   const a=legacy.find(c=>c.colombiaType===typeA),b=legacy.find(c=>c.colombiaType===typeC);if(!a&&!b)return null;
   const base=a||b;
   return {...base,id,name,division,country:'Colômbia',colombiaDivision:division,colombiaActivePhase:'Apertura',colombiaTournaments:{Apertura:{label:'Apertura',rounds:a?.rounds||[]},Clausura:{label:'Clausura',rounds:b?.rounds||[]}},participants:[...(a?.participants||b?.participants||[])],singleRound:true,format:division==='Primera División'?'20 clubes · Apertura e Clausura':'16 clubes · Apertura e Clausura'};
  };
  const first=make('Primera División','primera-apertura','primera-clausura','col-primera-2026','Liga BetPlay · Primera División');
  const second=make('Segunda División','segunda-apertura','segunda-clausura','col-segunda-2026','Torneo BetPlay · Segunda División');
  season.competitions=season.competitions.filter(c=>!legacy.includes(c));
  if(first)season.competitions.push(first);if(second)season.competitions.push(second);
 });
}
function colombiaPhaseStats(competition,phase){
 const tournament=competition?.colombiaTournaments?.[phase],stats=new Map();
 (tournament?.rounds||[]).forEach(round=>round.matches.forEach(match=>{
  if(match.homeGoals===null||match.awayGoals===null)return;
  [[match.home,match.homeGoals,match.awayGoals],[match.away,match.awayGoals,match.homeGoals]].forEach(([id,gf,ga])=>{
   if(!stats.has(id))stats.set(id,{id,points:0,played:0,wins:0,draws:0,losses:0,gf:0,ga:0});
   const row=stats.get(id);row.played++;row.gf+=gf;row.ga+=ga;
   if(gf>ga){row.wins++;row.points+=3;}else if(gf<ga)row.losses++;else{row.draws++;row.points++;}
  });
 }));
 return stats;
}
function colombiaTableSort(rows){
 return rows.sort((a,b)=>b.points-a.points||(b.gf-b.ga)-(a.gf-a.ga)||b.gf-a.gf||getClub(a.id).name.localeCompare(getClub(b.id).name,'pt-BR'));
}
function colombiaAnnualTable(year,division='Primera División'){
 const season=seasons.find(s=>s.year===year),comp=season?.competitions.find(c=>c.country==='Colômbia'&&c.colombiaDivision===division);
 if(!comp)return [];
 const totals=new Map(comp.participants.map(id=>[id,{id,points:0,played:0,wins:0,draws:0,losses:0,gf:0,ga:0}]));
 const addMatch=m=>{
  if(!m||m.homeGoals===null||m.awayGoals===null)return;
  [[m.home,m.homeGoals,m.awayGoals],[m.away,m.awayGoals,m.homeGoals]].forEach(([id,gf,ga])=>{
   if(!totals.has(id))totals.set(id,{id,points:0,played:0,wins:0,draws:0,losses:0,gf:0,ga:0});
   const row=totals.get(id);row.played++;row.gf+=gf;row.ga+=ga;
   if(gf>ga){row.wins++;row.points+=3;}else if(gf<ga)row.losses++;else{row.draws++;row.points++;}
  });
 };
 ['Apertura','Clausura'].forEach(phase=>{
  colombiaPhaseStats(comp,phase).forEach((row,id)=>{
   if(!totals.has(id))totals.set(id,{id,points:0,played:0,wins:0,draws:0,losses:0,gf:0,ga:0});
   const total=totals.get(id);['points','played','wins','draws','losses','gf','ga'].forEach(k=>total[k]+=row[k]);
  });
  if(division==='Segunda División'){
   const p=comp.colombiaTournaments?.[phase]?.playoff;
   ['A','B'].forEach(z=>(p?.groupRounds?.[z]||[]).forEach(round=>round.matches.forEach(addMatch)));
   (p?.final?.legs||[]).forEach(addMatch);
  }
 });
 return colombiaTableSort([...totals.values()]);
}
function colombiaPromediosTable(year){
 const currentSeason=seasons.find(s=>s.year===year);
 const currentCompetition=currentSeason?.competitions.find(c=>c.country==='Colômbia'&&c.colombiaDivision==='Primera División');
 if(!currentCompetition)return {years:[],rows:[]};
 const activeIds=new Set(currentCompetition.participants);
 const years=[year-1,year].filter(y=>seasons.some(s=>s.year===y&&s.competitions.some(c=>c.country==='Colômbia'&&c.colombiaDivision==='Primera División')));
 const totals=new Map([...activeIds].map(id=>[id,{id,points:0,played:0}]));
 years.forEach(y=>{
  const season=seasons.find(s=>s.year===y),comp=season?.competitions.find(c=>c.country==='Colômbia'&&c.colombiaDivision==='Primera División');
  if(!comp)return;
  ['Apertura','Clausura'].forEach(phase=>colombiaPhaseStats(comp,phase).forEach((row,id)=>{
   if(!activeIds.has(id))return;
   if(!totals.has(id))totals.set(id,{id,points:0,played:0});
   const total=totals.get(id);total.points+=row.points;total.played+=row.played;
  }));
 });
 const rows=[...totals.values()].map(r=>({...r,average:r.played?r.points/r.played:0}));
 rows.sort((a,b)=>a.average-b.average||a.points-b.points||getClub(a.id).name.localeCompare(getClub(b.id).name,'pt-BR'));
 return {years,rows};
}
function colombiaRelegationDecision(year){
 const table=colombiaPromediosTable(year).rows;
 if(table.length<2)return {ready:false,reason:'Ainda não há partidas suficientes para calcular os dois rebaixamentos.'};
 return {ready:true,relegated:table.slice(0,2).map(r=>r.id),rows:table.slice(0,2),years:colombiaPromediosTable(year).years};
}
function colombiaPromotionTieWinner(tie){
 if(!tie?.legs||tie.legs.some(m=>m.homeGoals===null||m.awayGoals===null))return null;
 let pointsA=0,pointsB=0;
 tie.legs.forEach(m=>{
  const aGoals=m.home===tie.teamA?m.homeGoals:m.awayGoals,bGoals=m.home===tie.teamB?m.homeGoals:m.awayGoals;
  if(aGoals>bGoals)pointsA+=3;else if(bGoals>aGoals)pointsB+=3;else{pointsA++;pointsB++;}
 });
 if(pointsA!==pointsB)return pointsA>pointsB?tie.teamA:tie.teamB;
 const goals=colombiaAggregate(tie);
 if(goals.a!==goals.b)return goals.a>goals.b?tie.teamA:tie.teamB;
 return tie.penaltyWinner||null;
}
function colombiaPromotionStatus(competition){
 const season=seasons.find(s=>s.competitions.includes(competition)),year=season?.year;
 if(!year||competition?.colombiaDivision!=='Segunda División')return {complete:false,ready:false,reason:'Competição de acesso não encontrada.'};
 const tournaments=competition.colombiaTournaments||{},a=tournaments.Apertura?.playoff,b=tournaments.Clausura?.playoff;
 if(a?.stage!=='completed'||b?.stage!=='completed'||!a.champion||!b.champion)return {complete:false,ready:false,reason:'Conclua as fases finais do Apertura e do Clausura para definir os campeões.'};
 const annual=colombiaAnnualTable(year,'Segunda División'),champions=[a.champion,b.champion],same=champions[0]===champions[1],rank=new Map(annual.map((r,i)=>[r.id,i+1])),state=competition.colombiaPromotion||{};
 let direct=[],pair=null,stage='complete',tie=null;
 if(same){
  direct=[champions[0]];
  pair=annual.filter(r=>r.id!==direct[0]).slice(0,2).map(r=>r.id);
  stage='repechage';
 }else{
  const inTop=champions.filter(id=>(rank.get(id)||999)<=2);
  if(inTop.length===2){direct=[...champions];stage='complete';}
  else if(inTop.length===1){
   direct=[inTop[0]];
   const other=champions.find(id=>id!==inTop[0]),best=annual.find(r=>r.id!==inTop[0]&&r.id!==other);
   pair=best?[other,best.id]:null;stage='repechage';
  }else{
   if(!state.grandFinal){pair=[champions[0],champions[1]];stage='grand-final';}
   else{
    const grandWinner=colombiaPromotionTieWinner(state.grandFinal);
    if(!grandWinner){pair=champions;tie=state.grandFinal;stage='grand-final';}
    else{
     direct=[grandWinner];
     const loser=champions.find(id=>id!==grandWinner),best=annual.find(r=>r.id!==champions[0]&&r.id!==champions[1]);
     pair=best?[loser,best.id]:null;stage='repechage';
    }
   }
  }
 }
 if(stage==='repechage'){
  if(!pair||pair.length!==2)return {complete:false,ready:true,direct,reason:'Não há dois clubes elegíveis suficientes na reclasificación para o repechaje.',annual};
  tie=state.repechage||null;
  if(tie){
   const winner=colombiaPromotionTieWinner(tie);
   if(winner)direct=[...direct,winner];
  }
  return {complete:direct.length===2,ready:true,direct,promoted:direct,pair,tie,stage:tie?(colombiaPromotionTieWinner(tie)?'complete':'repechage-playing'):'repechage',annual,reason:direct.length===2?'Dois clubes garantiram o acesso.':'Aguardando o repechaje para definir a segunda vaga.'};
 }
 return {complete:direct.length===2,ready:true,direct,promoted:direct,pair,tie:stage==='grand-final'?state.grandFinal:null,stage,annual,reason:stage==='grand-final'?'A Grande Final definirá o primeiro acesso.':'Os dois campeões conquistaram o acesso direto.'};
}
function colombiaSimulatePromotionTie(tie){
 if(!tie)return false;
 const match=tie.legs.find(m=>m.homeGoals===null||m.awayGoals===null);
 if(!match)return false;
 simulateMatch(match);
 if(tie.legs.every(m=>m.homeGoals!==null&&m.awayGoals!==null)){
  let pa=0,pb=0;tie.legs.forEach(m=>{const ga=m.home===tie.teamA?m.homeGoals:m.awayGoals,gb=m.home===tie.teamB?m.homeGoals:m.awayGoals;if(ga>gb)pa+=3;else if(gb>ga)pb+=3;else{pa++;pb++;}});
  const gd=colombiaAggregate(tie);
  if(pa===pb&&gd.a===gd.b)tie.penaltyWinner=Math.random()<.5?tie.teamA:tie.teamB;
 }
 return true;
}
function colombiaPromotionPanelHtml(competition){
 const s=colombiaPromotionStatus(competition);
 let html='<div class="playoff-panel"><h3>Acesso à Primera División · temporada seguinte</h3>';
 if(!s.ready)return html+'<p class="muted">'+esc(s.reason)+'</p></div>';
 if(s.direct?.length)html+='<p class="muted">Acesso direto: '+s.direct.map(id=>esc(getClub(id)?.name||'')).join(' e ')+(s.direct.length===1?' · 1 vaga definida':'')+'</p>';
 const state=competition.colombiaPromotion=competition.colombiaPromotion||{};
 if(s.stage==='grand-final'){
  if(!state.grandFinal)html+='<p class="muted">Os campeões do Apertura e do Clausura não estão entre os dois primeiros da reclasificación. Será necessária uma Grande Final.</p><button class="btn" id="create-colombia-promotion" data-promotion-stage="grandFinal">Gerar Grande Final</button>';
  else{
   const winner=colombiaPromotionTieWinner(state.grandFinal);
   html+='<div class="round-card"><div class="round-title"><strong>Grande Final pelo acesso</strong><span class="tag">'+(winner?'Concluída':'Em disputa')+'</span></div>'+state.grandFinal.legs.map((m,i)=>'<div class="fixture"><span class="fixture-team">'+clubLink(getClub(m.home),getClub(m.home)?.name||'')+'</span><strong class="score">'+(m.homeGoals===null?'—':m.homeGoals+' × '+m.awayGoals)+'</strong><span class="fixture-team away">'+clubLink(getClub(m.away),getClub(m.away)?.name||'')+'</span><small>Jogo '+(i+1)+'</small></div>').join('')+'</div>';
   if(!winner)html+='<button class="btn" id="simulate-colombia-promotion" data-promotion-stage="grandFinal">Simular '+(state.grandFinal.legs[0].homeGoals===null?'ida':'volta')+'</button>';
   else html+='<p class="muted">Primeiro promovido: '+esc(getClub(winner)?.name||'')+'. O perdedor disputará o repechaje.</p>';
  }
 }else if(s.stage==='repechage'||s.stage==='repechage-playing'){
  if(!state.repechage)html+='<p class="muted">O segundo acesso será decidido entre '+s.pair.map(id=>esc(getClub(id)?.name||'')).join(' e ')+'.</p><button class="btn" id="create-colombia-promotion" data-promotion-stage="repechage">Gerar repechaje</button>';
  else{
   const winner=colombiaPromotionTieWinner(state.repechage);
   html+='<div class="round-card"><div class="round-title"><strong>Repechaje pelo acesso</strong><span class="tag">'+(winner?'Concluído':'Em disputa')+'</span></div>'+state.repechage.legs.map((m,i)=>'<div class="fixture"><span class="fixture-team">'+clubLink(getClub(m.home),getClub(m.home)?.name||'')+'</span><strong class="score">'+(m.homeGoals===null?'—':m.homeGoals+' × '+m.awayGoals)+'</strong><span class="fixture-team away">'+clubLink(getClub(m.away),getClub(m.away)?.name||'')+'</span><small>Jogo '+(i+1)+'</small></div>').join('')+'</div>';
   if(!winner)html+='<button class="btn" id="simulate-colombia-promotion" data-promotion-stage="repechage">Simular '+(state.repechage.legs[0].homeGoals===null?'ida':'volta')+'</button>';
   else html+='<p class="access-confirmation">Segundo promovido: '+esc(getClub(winner)?.name||'')+'</p>';
  }
 }
 if(s.complete)html+='<p class="access-confirmation">Promovidos à Primera División: '+s.promoted.map(id=>esc(getClub(id)?.name||'')).join(' e ')+'.</p>';
 html+='</div>';return html;
}
function colombiaGroupStandings(playoff,zone){
 const ids=playoff?.groups?.[zone]||[],rows=ids.map(id=>({id,club:getClub(id),points:0,played:0,wins:0,draws:0,losses:0,gf:0,ga:0})),map=new Map(rows.map(r=>[r.id,r]));
 (playoff?.groupRounds?.[zone]||[]).forEach(round=>round.matches.forEach(m=>{if(m.homeGoals===null||m.awayGoals===null)return;const h=map.get(m.home),a=map.get(m.away);if(!h||!a)return;h.played++;a.played++;h.gf+=m.homeGoals;h.ga+=m.awayGoals;a.gf+=m.awayGoals;a.ga+=m.homeGoals;if(m.homeGoals>m.awayGoals){h.wins++;h.points+=3;a.losses++;}else if(m.homeGoals<m.awayGoals){a.wins++;a.points+=3;h.losses++;}else{h.draws++;a.draws++;h.points++;a.points++;}}));
 return rows.sort((a,b)=>b.points-a.points||(b.gf-b.ga)-(a.gf-a.ga)||b.gf-a.gf||a.club.name.localeCompare(b.club.name,'pt-BR'));
}
function colombiaAggregate(tie){
 let a=0,b=0;(tie.legs||[]).forEach(m=>{if(m.homeGoals===null||m.awayGoals===null)return;if(m.home===tie.teamA){a+=m.homeGoals;b+=m.awayGoals;}else{b+=m.homeGoals;a+=m.awayGoals;}});
 return {a,b};
}
function colombiaTieWinner(tie){
 if(!tie?.legs||tie.legs.some(m=>m.homeGoals===null||m.awayGoals===null))return null;
 const score=colombiaAggregate(tie);return score.a>score.b?tie.teamA:score.b>score.a?tie.teamB:tie.penaltyWinner||null;
}
function colombiaCreateTie(home,away,name){
 return {name,teamA:home,teamB:away,legs:[{home:away,away:home,homeGoals:null,awayGoals:null},{home,away,homeGoals:null,awayGoals:null}],penaltyWinner:null};
}
function colombiaCreatePlayoffs(competition){
 const phase=competition.colombiaActivePhase||'Apertura',t=competition.colombiaTournaments?.[phase],table=getStandings(competition);
 if(!t||table.length<8||!t.rounds?.length||!t.rounds.every(r=>r.matches.every(m=>m.homeGoals!==null&&m.awayGoals!==null)))return false;
 const first=competition.colombiaDivision==='Primera División',knockout=first&&phase==='Apertura';
 if(knockout)t.playoff={kind:'knockout',stage:'quarterfinals',ties:[[0,7],[1,6],[2,5],[3,4]].map(([a,b],i)=>colombiaCreateTie(table[a].id,table[b].id,'Quartas de final '+(i+1)))};
 else{
  const groups={A:[0,2,4,6].map(i=>table[i].id),B:[1,3,5,7].map(i=>table[i].id)};
  const makeRounds=ids=>{const temp={participants:[...ids],singleRound:false};buildSchedule(temp);return temp.rounds||[];};
  t.playoff={kind:'quadrangular',stage:'groups',groups,groupRounds:{A:makeRounds(groups.A),B:makeRounds(groups.B)},final:null,champion:null};
 }
 return true;
}
function colombiaPlayoffStageDone(p){
 if(!p)return false;
 if(p.kind==='knockout')return (p.ties||[]).length>0&&p.ties.every(t=>!!colombiaTieWinner(t));
 if(p.stage==='groups')return ['A','B'].every(z=>(p.groupRounds[z]||[]).length>0&&p.groupRounds[z].every(r=>r.matches.every(m=>m.homeGoals!==null&&m.awayGoals!==null)));
 if(p.stage==='final')return !!colombiaTieWinner(p.final);
 return p.stage==='completed';
}
function colombiaCreateNextPlayoffStage(competition){
 const t=competition.colombiaTournaments?.[competition.colombiaActivePhase||'Apertura'],p=t?.playoff;if(!p||!colombiaPlayoffStageDone(p))return false;
 if(p.kind==='knockout'){
  const winners=p.ties.map(colombiaTieWinner);
  if(p.stage==='quarterfinals'){p.stage='semifinals';p.ties=[[winners[0],winners[3]],[winners[1],winners[2]]].map((x,i)=>colombiaCreateTie(x[0],x[1],'Semifinal '+(i+1)));return true;}
  if(p.stage==='semifinals'){p.stage='final';p.ties=[colombiaCreateTie(winners[0],winners[1],'Final')];return true;}
  if(p.stage==='final'){p.stage='completed';p.champion=winners[0];return true;}
 }
 if(p.kind==='quadrangular'&&p.stage==='groups'){
  p.history=p.history||[];p.history.push({stage:'groups',groups:p.groups,groupRounds:p.groupRounds});
  const leader=z=>{const ids=p.groups[z],rows=ids.map(id=>({id,points:0,gf:0,ga:0})),map=new Map(rows.map(r=>[r.id,r]));(p.groupRounds[z]||[]).forEach(r=>r.matches.forEach(m=>{if(m.homeGoals===null)return;const h=map.get(m.home),a=map.get(m.away);if(!h||!a)return;h.gf+=m.homeGoals;h.ga+=m.awayGoals;a.gf+=m.awayGoals;a.ga+=m.homeGoals;if(m.homeGoals>m.awayGoals)h.points+=3;else if(m.homeGoals<m.awayGoals)a.points+=3;else{h.points++;a.points++;}}));return rows.sort((a,b)=>b.points-a.points||(b.gf-b.ga)-(a.gf-a.ga)||b.gf-a.gf)[0]?.id;};
  p.stage='final';p.final=colombiaCreateTie(leader('A'),leader('B'),'Final do torneio');return !!p.final.teamA&&!!p.final.teamB;
 }
 if(p.kind==='quadrangular'&&p.stage==='final'){p.stage='completed';p.champion=colombiaTieWinner(p.final);return true;}
 return false;
}
function colombiaSimulatePlayoff(competition){
 const t=competition.colombiaTournaments?.[competition.colombiaActivePhase||'Apertura'],p=t?.playoff;if(!p)return false;
 if(p.kind==='knockout'){
  p.ties.forEach(tie=>{const i=tie.legs[0].homeGoals===null?0:1,m=tie.legs[i];if(m.homeGoals!==null)return;simulateMatch(m);if(i===1){const score=colombiaAggregate(tie);if(score.a===score.b)tie.penaltyWinner=Math.random()<.5?tie.teamA:tie.teamB;}});
  return true;
 }
 if(p.stage==='groups'){
  ['A','B'].forEach(z=>{const round=(p.groupRounds[z]||[]).find(r=>r.matches.some(m=>m.homeGoals===null));if(round)round.matches.forEach(m=>{if(m.homeGoals===null)simulateMatch(m);});});
  return true;
 }
 if(p.stage==='final'){
  const tie=p.final,i=tie.legs[0].homeGoals===null?0:1,m=tie.legs[i];if(m.homeGoals===null){simulateMatch(m);if(i===1){const score=colombiaAggregate(tie);if(score.a===score.b)tie.penaltyWinner=Math.random()<.5?tie.teamA:tie.teamB;}}
  return true;
 }
 return false;
}
function ensureArgentina2026(){
 const findOrAdd=name=>{let club=clubs.find(c=>slugify(c.name)===slugify(name));if(!club){club={id:uid(),name,state:'',slug:slugify(name)};initializeClubRating(club);clubs.push(club);}return club.id;};
 const ids=names=>names.map(findOrAdd);
 const existing=seasons.find(s=>s.year===2026);
 if(!existing)return;
 const make=(id,name,division,format,type,phase,zones,pairs)=>({id,name,country:'Argentina',division,format,argentinaType:type,phase,zones:{A:ids(zones.A),B:ids(zones.B)},classicPairs:pairs.map(p=>p.map(findOrAdd)),participants:[...ids(zones.A),...ids(zones.B)]});
 if(!existing.competitions.some(c=>c.country==='Argentina')){
  existing.competitions.push(
   make('arg-primera-apertura-2026','Primera División · Torneo Apertura','Primera División','2026 · 2 zonas de 15 · 16 datas + playoffs','primera','Apertura',ARGENTINA_PRIMERA_2026,ARGENTINA_CLASICOS_2026),
   make('arg-primera-clausura-2026','Primera División · Torneo Clausura','Primera División','2026 · mesmas zonas · localías invertidas + playoffs','primera','Clausura',ARGENTINA_PRIMERA_2026,ARGENTINA_CLASICOS_2026),
   make('arg-nacional-2026','Primera Nacional','Primera Nacional','2026 · 2 zonas de 18 · 36 datas · 2 acessos','nacional','',ARGENTINA_NACIONAL_2026,ARGENTINA_NACIONAL_CLASICOS_2026)
  );
 }
}
ensureArgentina2026();
ensureUruguay2026();

const CHILE_PRIMERA_2026=[
 ['Audax Italiano','Santiago'],['Cobresal','El Salvador'],['Colo-Colo','Santiago'],['Coquimbo Unido','Coquimbo'],
 ['Deportes Concepción','Concepción'],['Deportes La Serena','La Serena'],['Deportes Limache','Limache'],['Everton','Viña del Mar'],
 ['Huachipato','Talcahuano'],['Ñublense','Chillán'],["O'Higgins",'Rancagua'],['Palestino','Santiago'],
 ['Unión La Calera','La Calera'],['Universidad Católica','Santiago'],['Universidad de Chile','Santiago'],['Universidad de Concepción','Concepción']
];
const CHILE_PRIMERA_B_2026=[
 ['Antofagasta','Antofagasta'],['San Luis','Quillota'],['Cobreloa','Calama'],['Deportes Copiapó','Copiapó'],
 ['Curicó Unido','Curicó'],['Deportes Iquique','Iquique'],['Deportes Recoleta','Recoleta'],['Deportes Santa Cruz','Santa Cruz'],
 ['Deportes Temuco','Temuco'],['Magallanes','San Bernardo'],['Deportes Puerto Montt','Puerto Montt'],['Rangers','Talca'],
 ['San Marcos de Arica','Arica'],['Unión Española','Santiago'],['Unión San Felipe','San Felipe'],['Santiago Wanderers','Valparaíso']
];
function ensureChile2026(){
 const season=seasons.find(s=>s.year===2026);if(!season||season.competitions.some(c=>c.country==='Chile'))return;
 const findOrAdd=(name,city)=>{let club=clubs.find(c=>slugify(c.name)===slugify(name));if(!club){club={id:uid(),name,state:city||'',slug:slugify(name)};initializeClubRating(club);clubs.push(club);}return club.id;};
 const ids=list=>list.map(([name,city])=>findOrAdd(name,city));
 season.competitions.push(
  {id:'chi-primera-2026',name:'Liga de Primera · Chile',country:'Chile',division:'Primera División',chileDivision:'Primera División',participants:ids(CHILE_PRIMERA_2026),format:'2026 · 16 clubes · 30 rodadas · turno e returno'},
  {id:'chi-primera-b-2026',name:'Liga de Ascenso · Primera B',country:'Chile',division:'Primera B',chileDivision:'Primera B',participants:ids(CHILE_PRIMERA_B_2026),format:'2026 · 16 clubes · 30 rodadas · turno e returno + liguilla'}
 );
}
function chileCreateTie(a,b,name){
 return {name,home:a,away:b,legs:[{home:b,away:a,homeGoals:null,awayGoals:null},{home:a,away:b,homeGoals:null,awayGoals:null}],penaltyWinner:null};
}
function chileAggregate(t){
 let a=0,b=0;(t.legs||[]).forEach(m=>{if(m.homeGoals===null||m.awayGoals===null)return;if(m.home===t.home){a+=m.homeGoals;b+=m.awayGoals;}else{b+=m.homeGoals;a+=m.awayGoals;}});
 return {a,b};
}
function chileTieWinner(t){
 if(!t||!t.legs||t.legs.some(m=>m.homeGoals===null||m.awayGoals===null))return null;
 const x=chileAggregate(t);return x.a>x.b?t.home:x.b>x.a?t.away:t.penaltyWinner||null;
}
function chileSimulateTie(t){
 const i=t.legs.findIndex(m=>m.homeGoals===null||m.awayGoals===null);if(i<0)return;
 simulateMatch(t.legs[i]);
 if(i===1){const x=chileAggregate(t);if(x.a===x.b)t.penaltyWinner=Math.random()<.5?t.home:t.away;}
}
function chileCreateTitleTie(c){
 const rows=getStandings(c);if(rows.length<2||rows[0].played===0||rows[0].points!==rows[1].points)return false;
 c.chileTitleTie={home:rows[0].id,away:rows[1].id,match:{home:rows[0].id,away:rows[1].id,homeGoals:null,awayGoals:null},penaltyWinner:null,completed:false};return true;
}
function chileTitleWinner(t){
 if(!t?.completed)return null;
 if(t.match.homeGoals>t.match.awayGoals)return t.home;
 if(t.match.awayGoals>t.match.homeGoals)return t.away;
 return t.penaltyWinner||null;
}
function chileSimulateTitleTie(t){
 if(!t||t.completed)return;
 simulateMatch(t.match);
 if(t.match.homeGoals===t.match.awayGoals)t.penaltyWinner=Math.random()<.5?t.home:t.away;
 t.completed=true;
}
function chileCreatePromotionPlayoff(c){
 const rows=getStandings(c);if(rows.length<8||rows.slice(0,8).some(r=>r.played===0))return false;
 c.chilePlayoffs={stage:'quarterfinals',rounds:[{name:'Primeira fase · Liguilla',ties:[
  chileCreateTie(rows[2].id,rows[7].id,'3º × 8º'),
  chileCreateTie(rows[3].id,rows[6].id,'4º × 7º'),
  chileCreateTie(rows[4].id,rows[5].id,'5º × 6º')
 ]}],awaitingNext:false,completed:false,promoted:null};return true;
}
function chilePlayoffStageDone(p){const r=p?.rounds?.[p.rounds.length-1];return !!r&&r.ties.every(t=>!!chileTieWinner(t));}
function chileCreateNextPromotionStage(c){
 const p=c.chilePlayoffs;if(!p||!chilePlayoffStageDone(p))return false;
 const winners=p.rounds[p.rounds.length-1].ties.map(chileTieWinner),rows=getStandings(c);
 if(p.stage==='quarterfinals'){
  const entrants=[rows[1].id,...winners].sort((a,b)=>rows.findIndex(r=>r.id===a)-rows.findIndex(r=>r.id===b));
  p.rounds.push({name:'Semifinais da Liguilla',ties:[chileCreateTie(entrants[0],entrants[3],'Semifinal 1'),chileCreateTie(entrants[1],entrants[2],'Semifinal 2')]});p.stage='semifinals';
 }else if(p.stage==='semifinals'){
  const sorted=winners.sort((a,b)=>rows.findIndex(r=>r.id===a)-rows.findIndex(r=>r.id===b));
  p.rounds.push({name:'Final da Liguilla',ties:[chileCreateTie(sorted[0],sorted[1],'Final')]});p.stage='final';
 }else if(p.stage==='final'){p.promoted=winners[0];p.completed=true;p.stage='completed';return true;}else return false;
 p.awaitingNext=false;return true;
}
function chileSimulatePromotionStage(c){
 const p=c.chilePlayoffs;if(!p||p.completed||p.awaitingNext)return;
 p.rounds[p.rounds.length-1].ties.forEach(chileSimulateTie);
 if(chilePlayoffStageDone(p))p.awaitingNext=true;
}
function chileRenderTie(t){
 const winner=chileTieWinner(t),a=chileAggregate(t);
 return '<div class="playoff-tie"><div class="round-title"><strong>'+esc(t.name)+'</strong><span class="tag">'+(winner?'Concluída':'Em disputa')+'</span></div>'+t.legs.map((m,i)=>'<div class="fixture"><span class="fixture-team">'+clubLink(getClub(m.home),getClub(m.home)?.name||'')+'</span><strong class="score">'+(m.homeGoals===null?'—':m.homeGoals+' × '+m.awayGoals)+'</strong><span class="fixture-team away">'+clubLink(getClub(m.away),getClub(m.away)?.name||'')+'</span><small class="leg-label">'+(i?'Jogo de volta':'Jogo de ida')+'</small></div>').join('')+'<div class="aggregate-line">Agregado: <strong>'+a.a+' × '+a.b+'</strong>'+(t.penaltyWinner?' · Decisão nos pênaltis':'')+(winner?' · '+esc(getClub(winner)?.name||''):'')+'</div></div>';
}

const ECUADOR_PRIMERA_2026=[['Aucas','Quito'],['Barcelona SC','Guayaquil'],['Delfín','Manta'],['Deportivo Cuenca','Cuenca'],['Emelec','Guayaquil'],['Guayaquil City','Guayaquil'],['Independiente del Valle','Sangolquí'],['LDU Quito','Quito'],['Leones FC','Ibarra'],['Libertad','Loja'],['Macará','Ambato'],['Manta FC','Manta'],['Mushuc Runa','Ambato'],['Orense','Machala'],['Técnico Universitario','Ambato'],['Universidad Católica','Quito']];
const ECUADOR_SERIE_B_2026=[['9 de Octubre','La Troncal'],['22 de Julio','Esmeraldas'],['Atlético FC','Guayaquil'],['Cumbayá','Cayambe'],['Cuenca Juniors','Cuenca'],['El Nacional','Quito'],['Gualaceo','Gualaceo'],['Independiente Juniors','Sangolquí'],['Liga de Portoviejo','Portoviejo'],['San Antonio','Ibarra'],['Vargas Torres','Esmeraldas'],['Vinotinto','Quito']];
function ensureEcuador2026(){
 const s=seasons.find(x=>x.year===2026);if(!s||s.competitions.some(x=>x.country==='Equador'))return;
 const addClub=([name,city])=>{let club=clubs.find(x=>slugify(x.name)===slugify(name));if(!club){club={id:uid(),name,state:city,slug:slugify(name)};initializeClubRating(club);clubs.push(club);}return club.id;};
 const a=ECUADOR_PRIMERA_2026.map(addClub),b=ECUADOR_SERIE_B_2026.map(addClub);
 s.competitions.push({id:'ecu-serie-a-2026',name:'LigaPro · Serie A',country:'Equador',division:'Serie A',ecuadorDivision:'Serie A',ecuadorStage:'regular',participants:a,format:'2026 · 16 clubes · 30 rodadas + hexagonal do título, quadrangular e hexagonal do descenso'},{id:'ecu-serie-b-2026',name:'LigaPro · Serie B',country:'Equador',division:'Serie B',ecuadorDivision:'Serie B',ecuadorStage:'regular',participants:b,format:'2026 · 12 clubes · 22 rodadas + hexagonais de ascenso e descenso'});
}
function ecuadorDoubleRoundRobin(ids){const teams=[...ids];if(teams.length%2)teams.push(null);const n=teams.length,half=n/2,one=[];for(let r=0;r<n-1;r++){const matches=[];for(let i=0;i<half;i++){const x=teams[i],y=teams[n-1-i];if(x&&y){const home=(r+i)%2===0?x:y;matches.push({home,away:home===x?y:x,homeGoals:null,awayGoals:null});}}one.push(matches);teams.splice(1,0,teams.pop());}return one.concat(one.map(ms=>ms.map(m=>({home:m.away,away:m.home,homeGoals:null,awayGoals:null}))));}
function ecuadorStageTable(c,ids){
 const base=getStandings({...c,participants:c.participants,rounds:c.ecuadorRegularRounds||[]}),final=getStandings({...c,participants:ids,rounds:c.rounds||c.ecuadorFinalRounds||[]}),map=new Map(base.map(r=>[r.id,{...r}]));
 final.forEach(r=>{const x=map.get(r.id);if(x)['points','played','wins','draws','losses','gf','ga'].forEach(k=>x[k]+=r[k]);});
 return ids.map(id=>map.get(id)).filter(Boolean).sort((a,b)=>b.points-a.points||(b.gf-b.ga)-(a.gf-a.ga)||b.gf-a.gf||getClub(a.id).name.localeCompare(getClub(b.id).name,'pt-BR'));
}
function ecuadorCreateFinal(c){
 const rounds=c.rounds||[];if(c.ecuadorStage!=='regular'||!rounds.length||rounds.some(r=>r.matches.some(m=>m.homeGoals===null||m.awayGoals===null)))return false;
 const rows=getStandings(c),ids=rows.map(r=>r.id),groups=c.ecuadorDivision==='Serie A'?{title:ids.slice(0,6),sudamericana:ids.slice(6,10),descenso:ids.slice(10,16)}:{ascenso:ids.slice(0,6),descenso:ids.slice(6,12)};
 c.ecuadorRegularRounds=JSON.parse(JSON.stringify(rounds));c.ecuadorGroups=groups;c.ecuadorStage='final';
 const schedules=Object.values(groups).map(group=>ecuadorDoubleRoundRobin(group));
 c.rounds=Array.from({length:Math.max(...schedules.map(x=>x.length))},(_,i)=>({number:i+1,matches:schedules.flatMap(x=>x[i]||[])}));c.ecuadorFinalRounds=JSON.parse(JSON.stringify(c.rounds));
 return true;
}
function ecuadorFinalComplete(c){return c.ecuadorStage==='final'&&(c.rounds||[]).length>0&&c.rounds.every(r=>r.matches.length&&r.matches.every(m=>m.homeGoals!==null&&m.awayGoals!==null));}
const PERU_PRIMERA_2026=[['ADT','Tarma'],['Alianza Atlético','Sullana'],['Alianza Lima','Lima'],['Atlético Grau','Piura'],['Cienciano','Cusco'],['Comerciantes Unidos','Cutervo'],['Cusco FC','Cusco'],['Deportivo Garcilaso','Cusco'],['Deportivo Moquegua','Moquegua'],['FC Cajamarca','Cajamarca'],['Juan Pablo II College','Chongoyape'],['Los Chankas','Andahuaylas'],['FBC Melgar','Arequipa'],['Sport Boys','Callao'],['Sport Huancayo','Huancayo'],['Sporting Cristal','Lima'],['Universitario de Deportes','Lima'],['UTC','Cajamarca']];
const PERU_LIGA2_GROUPS_2026={A:['Academia Deportiva Cantolao','ADA Jaén','Carlos A. Mannucci','Deportivo Llacuabamba','FC San Marcos','Pirata FC','Unión Comercio','Universidad César Vallejo','Universidad San Martín'],B:['Alianza Universidad','Ayacucho FC','Bentín Tacna Heroica','Comerciantes FC','Deportivo Binacional','Estudiantil CNI','Santos FC','Sport Huancayo B','Unión Minas']};
const PERU_CITIES={'ADT':'Tarma','Alianza Atlético':'Sullana','Alianza Lima':'Lima','Atlético Grau':'Piura','Cienciano':'Cusco','Comerciantes Unidos':'Cutervo','Cusco FC':'Cusco','Deportivo Garcilaso':'Cusco','Deportivo Moquegua':'Moquegua','FC Cajamarca':'Cajamarca','Juan Pablo II College':'Chongoyape','Los Chankas':'Andahuaylas','FBC Melgar':'Arequipa','Sport Boys':'Callao','Sport Huancayo':'Huancayo','Sporting Cristal':'Lima','Universitario de Deportes':'Lima','UTC':'Cajamarca','Academia Deportiva Cantolao':'Callao','ADA Jaén':'Jaén','Carlos A. Mannucci':'Trujillo','Deportivo Llacuabamba':'Huamachuco','FC San Marcos':'Huaraz','Pirata FC':'Chiclayo','Unión Comercio':'Tarapoto','Universidad César Vallejo':'Trujillo','Universidad San Martín':'Lima','Alianza Universidad':'Huánuco','Ayacucho FC':'Ayacucho','Bentín Tacna Heroica':'Tacna','Comerciantes FC':'Iquitos','Deportivo Binacional':'Juliaca','Estudiantil CNI':'Iquitos','Santos FC':'Nazca','Sport Huancayo B':'Huancayo','Unión Minas':'Cerro de Pasco'};
function ensurePeru2026(){const s=seasons.find(x=>x.year===2026);if(!s||s.competitions.some(x=>x.country==='Peru'))return;const add=name=>{let club=clubs.find(x=>slugify(x.name)===slugify(name));if(!club){club={id:uid(),name,state:PERU_CITIES[name]||'',slug:slugify(name)};initializeClubRating(club);clubs.push(club);}return club.id;};const first=PERU_PRIMERA_2026.map(([n])=>add(n)),a=PERU_LIGA2_GROUPS_2026.A.map(add),b=PERU_LIGA2_GROUPS_2026.B.map(add);s.competitions.push({id:'per-liga1-apertura-2026',name:'Liga 1 · Apertura',country:'Peru',division:'Primera División',peruDivision:'Primera División',peruPhase:'Apertura',participants:[...first],singleRound:true,format:'2026 · 18 clubes · 17 rodadas · turno único'},{id:'per-liga1-clausura-2026',name:'Liga 1 · Clausura',country:'Peru',division:'Primera División',peruDivision:'Primera División',peruPhase:'Clausura',participants:[...first],singleRound:true,format:'2026 · 18 clubes · 17 rodadas · turno único'},{id:'per-liga2-2026',name:'Liga 2 · Segunda División',country:'Peru',division:'Liga 2',peruDivision:'Liga 2',peruStage:'regional',zones:{A:a,B:b},participants:[...a,...b],format:'2026 · 18 clubes · 2 grupos de 9 · fase regional e fase final'});}
function peruRoundRobin(ids){const teams=[...ids];if(teams.length%2)teams.push(null);const n=teams.length,half=n/2,one=[];for(let r=0;r<n-1;r++){const matches=[];for(let i=0;i<half;i++){const a=teams[i],b=teams[n-1-i];if(a&&b){const home=(r+i)%2===0?a:b;matches.push({home,away:home===a?b:a,homeGoals:null,awayGoals:null});}}one.push(matches);teams.splice(1,0,teams.pop());}return one.concat(one.map(ms=>ms.map(m=>({home:m.away,away:m.home,homeGoals:null,awayGoals:null}))));}
function peruBuildSchedule(c){if(c.peruDivision==='Liga 2'){const a=peruRoundRobin(c.zones.A),b=peruRoundRobin(c.zones.B);c.rounds=Array.from({length:18},(_,i)=>({number:i+1,matches:[...(a[i]||[]),...(b[i]||[])]}));}else{const one=peruRoundRobin(c.participants).slice(0,17);c.rounds=one.map((matches,i)=>({number:i+1,matches}));}}
function peruTable(c,ids,rounds,bonus={}){const valid=new Set(ids),rows=ids.map(id=>({id,club:getClub(id),points:Number(bonus[id]||0),played:0,wins:0,draws:0,losses:0,gf:0,ga:0})),map=new Map(rows.map(r=>[r.id,r]));(rounds||[]).forEach(r=>(r.matches||[]).forEach(g=>{if(g.homeGoals===null||g.awayGoals===null||!valid.has(g.home)||!valid.has(g.away))return;const h=map.get(g.home),a=map.get(g.away);h.played++;a.played++;h.gf+=g.homeGoals;h.ga+=g.awayGoals;a.gf+=g.awayGoals;a.ga+=g.homeGoals;if(g.homeGoals>g.awayGoals){h.wins++;h.points+=3;a.losses++;}else if(g.homeGoals<g.awayGoals){a.wins++;a.points+=3;h.losses++;}else{h.draws++;a.draws++;h.points++;a.points++;}}));return rows.sort((a,b)=>b.points-a.points||(b.gf-b.ga)-(a.gf-a.ga)||b.gf-a.gf||a.club.name.localeCompare(b.club.name,'pt-BR'));}
function peruRegionalTable(c,z){return peruTable(c,c.zones[z],c.peruRegionalRounds||c.rounds||[]);}
function peruFinalTable(c,k){return peruTable(c,c.peruFinalGroups[k],c.peruFinalRounds||c.rounds||[],c.peruBonus||{});}
function peruAnnualTable(year){const s=seasons.find(x=>x.year===year),map=new Map();(s?.competitions||[]).filter(c=>c.peruDivision==='Primera División').forEach(c=>getStandings(c).forEach(r=>{if(!map.has(r.id))map.set(r.id,{...r,points:0,played:0,wins:0,draws:0,losses:0,gf:0,ga:0});const x=map.get(r.id);['points','played','wins','draws','losses','gf','ga'].forEach(k=>x[k]+=r[k]);}));return [...map.values()].sort((a,b)=>b.points-a.points||(b.gf-b.ga)-(a.gf-a.ga)||b.gf-a.gf);}
function peruCreateFinal(c){if(c.peruStage!=='regional'||!c.rounds?.length||c.rounds.some(r=>r.matches.some(m=>m.homeGoals===null||m.awayGoals===null)))return false;const a=peruRegionalTable(c,'A'),b=peruRegionalTable(c,'B');if(a.length!==9||b.length!==9||[...a,...b].some(r=>r.played<16))return false;const bestSecond=[a[1],b[1]].sort((x,y)=>y.points-x.points||(y.gf-y.ga)-(x.gf-x.ga))[0].id;const groups={A:[a[0].id,b[2].id,a[3].id,b[5].id],B:[b[0].id,a[2].id,b[3].id,a[5].id],C:[a[1].id,b[1].id,a[4].id,b[4].id],DA:[a[6].id,b[7].id,a[8].id],DB:[b[6].id,a[7].id,b[8].id]},bonus={};[a[0].id,b[0].id,bestSecond].forEach(id=>bonus[id]=2);[a[1].id,b[1].id,a[2].id,b[2].id].filter(id=>bonus[id]!==2).forEach(id=>bonus[id]=1);[a[8].id,b[8].id].forEach(id=>bonus[id]=-1);c.peruRegionalRounds=JSON.parse(JSON.stringify(c.rounds));c.peruFinalGroups=groups;c.peruBonus=bonus;c.peruStage='final';const schedules=Object.values(groups).map(ids=>peruRoundRobin(ids));c.rounds=Array.from({length:6},(_,i)=>({number:i+1,matches:schedules.flatMap(rs=>rs[i]||[])}));c.peruFinalRounds=JSON.parse(JSON.stringify(c.rounds));return true;}
function peruOverallTable(c){const base=peruTable(c,c.participants,c.peruRegionalRounds||[]),fin=peruTable(c,c.participants,c.peruFinalRounds||[],c.peruBonus||{}),map=new Map(base.map(r=>[r.id,{...r}]));fin.forEach(r=>{const x=map.get(r.id);if(x)['points','played','wins','draws','losses','gf','ga'].forEach(k=>x[k]+=r[k]);});return [...map.values()].sort((a,b)=>b.points-a.points||(b.gf-b.ga)-(a.gf-a.ga)||b.gf-a.gf);}
function peruCreatePlayoffs(c){if(c.peruStage!=='final'||!c.rounds?.length||c.rounds.some(r=>r.matches.some(m=>m.homeGoals===null||m.awayGoals===null)))return false;const groups=['A','B','C'].map(k=>peruFinalTable(c,k)),rank=id=>peruOverallTable(c).findIndex(r=>r.id===id),second=groups.map(g=>g[1].id).sort((a,b)=>rank(a)-rank(b))[0],seeds=[...groups.map(g=>g[0].id),second].sort((a,b)=>rank(a)-rank(b));if(new Set(seeds).size!==4)return false;c.peruFinalRounds=JSON.parse(JSON.stringify(c.rounds));c.peruPlayoffs={stage:'semifinals',semifinals:[chileCreateTie(seeds[0],seeds[3],'Semifinal 1'),chileCreateTie(seeds[1],seeds[2],'Semifinal 2')],final:null,repechage:null,secondAccess:null};c.peruStage='playoffs';c.rounds=[];return true;}
function peruTieDone(t){return !!chileTieWinner(t);}
function peruSimulatePlayoffStage(c){const p=c.peruPlayoffs;if(!p||p.awaitingNext||p.stage==='completed')return;if(p.stage==='second-access'){const x=p.secondAccess;if(!x||x.completed)return;simulateMatch(x.match);if(x.match.homeGoals===x.match.awayGoals)x.penaltyWinner=Math.random()<.5?x.home:x.away;x.completed=true;p.champion=chileTieWinner(p.final);p.promotedSecond=x.match.homeGoals>x.match.awayGoals?x.home:x.match.awayGoals>x.match.homeGoals?x.away:x.penaltyWinner;p.stage='completed';return;}const ties=p.stage==='semifinals'?p.semifinals:p.stage==='final-repechage'?[p.final,p.repechage]:[];ties.filter(Boolean).forEach(t=>{if(!peruTieDone(t))chileSimulateTie(t);});if(ties.length&&ties.every(peruTieDone))p.awaitingNext=true;}
function peruCreateNextPlayoffStage(c){const p=c.peruPlayoffs;if(!p?.awaitingNext)return false;if(p.stage==='semifinals'){const winners=p.semifinals.map(chileTieWinner),losers=p.semifinals.map(t=>chileTieWinner(t)===t.home?t.away:t.home),rank=id=>peruOverallTable(c).findIndex(r=>r.id===id);p.semiLosers=losers;p.final=chileCreateTie(...[...winners].sort((a,b)=>rank(a)-rank(b)),'Final pelo título');p.repechage=chileCreateTie(...[...losers].sort((a,b)=>rank(a)-rank(b)),'Repescagem');p.stage='final-repechage';}else if(p.stage==='final-repechage'){const loser=chileTieWinner(p.final)===p.final.home?p.final.away:p.final.home;p.secondAccess={home:loser,away:chileTieWinner(p.repechage),match:{home:loser,away:chileTieWinner(p.repechage),homeGoals:null,awayGoals:null},penaltyWinner:null,completed:false};p.stage='second-access';p.awaitingNext=false;return true;}else return false;p.awaitingNext=false;return true;}
function peruCreatePrimeraPlayoffs(c){const s=seasons.find(x=>x.competitions.includes(c)),ap=s?.competitions.find(x=>x.peruDivision==='Primera División'&&x.peruPhase==='Apertura'),cl=s?.competitions.find(x=>x.peruDivision==='Primera División'&&x.peruPhase==='Clausura');if(!ap||!cl||c.peruPlayoffs||getStandings(ap).some(r=>r.played<17)||getStandings(cl).some(r=>r.played<17))return false;const aw=getStandings(ap)[0]?.id,cw=getStandings(cl)[0]?.id,annual=peruAnnualTable(s.year),top7=annual.slice(0,7).map(r=>r.id);if(aw===cw){c.peruPlayoffs={stage:'completed',champion:aw};return true;}const qualified=[...new Set([aw,cw].filter(id=>top7.includes(id)))],top2=annual.slice(0,2).map(r=>r.id);top2.forEach(id=>{if(!qualified.includes(id))qualified.push(id);});if(qualified.length===2&&top2.every(id=>qualified.includes(id))){c.peruPlayoffs={stage:'final',final:chileCreateTie(qualified[0],qualified[1],'Final nacional'),semifinals:[]};return true;}annual.slice(0,7).forEach(r=>{if(qualified.length<4&&!qualified.includes(r.id))qualified.push(r.id);});if(qualified.length!==4)return false;qualified.sort((a,b)=>annual.findIndex(r=>r.id===a)-annual.findIndex(r=>r.id===b));c.peruPlayoffs={stage:'semifinals',semifinals:[chileCreateTie(qualified[0],qualified[3],'Semifinal 1'),chileCreateTie(qualified[1],qualified[2],'Semifinal 2')],final:null};return true;}
function peruSimulatePrimera(c){const p=c.peruPlayoffs;if(!p||p.stage==='completed'||p.awaitingNext)return;const ties=p.stage==='semifinals'?p.semifinals:[p.final];ties.filter(Boolean).forEach(t=>{if(!peruTieDone(t))chileSimulateTie(t);});if(ties.length&&ties.every(peruTieDone))p.awaitingNext=true;}
function peruNextPrimera(c){const p=c.peruPlayoffs;if(!p?.awaitingNext)return false;if(p.stage==='semifinals'){const w=p.semifinals.map(chileTieWinner),annual=peruAnnualTable(seasons.find(s=>s.competitions.includes(c)).year);w.sort((a,b)=>annual.findIndex(r=>r.id===a)-annual.findIndex(r=>r.id===b));p.final=chileCreateTie(w[0],w[1],'Final nacional');p.stage='final';}else if(p.stage==='final'){p.champion=chileTieWinner(p.final);p.stage='completed';}p.awaitingNext=false;return true;}
function peruTableHtml(rows,classes={}){return '<div class="table-wrap"><table class="standings"><thead><tr><th>#</th><th>Clube</th><th>P</th><th>J</th><th>V</th><th>E</th><th>D</th><th>GP</th><th>GC</th><th>SG</th></tr></thead><tbody>'+rows.map((r,i)=>'<tr class="'+(classes[r.id]||'')+'"><td>'+(i+1)+'</td><td class="team-name">'+clubLink(r.club,r.club.name)+'</td><td>'+r.points+'</td><td>'+r.played+'</td><td>'+r.wins+'</td><td>'+r.draws+'</td><td>'+r.losses+'</td><td>'+r.gf+'</td><td>'+r.ga+'</td><td>'+(r.gf-r.ga)+'</td></tr>').join('')+'</tbody></table></div>';}

const PARAGUAY_PRIMERA_2026=[
 ['2 de Mayo','Pedro Juan Caballero'],['Cerro Porteño','Asunción'],['Guaraní','Asunción'],['Libertad','Asunción'],
 ['Sportivo Luqueño','Luque'],['Nacional','Asunción'],['Olimpia','Asunción'],['Recoleta FC','Asunción'],
 ['Rubio Ñu','Asunción'],['Sportivo San Lorenzo','San Lorenzo'],['Sportivo Ameliano','Villeta'],['Sportivo Trinidense','Asunción']
];
const PARAGUAY_INTERMEDIA_2026=[
 ['12 de Junio','Villa Hayes'],['3 de Noviembre','Asunción'],['Atlético Tembetary','Villa Elisa'],['Benjamín Aceval','Villa Hayes'],
 ['Deportivo Capiatá','Capiatá'],['Deportivo Santaní','San Estanislao'],['Encarnación FC','Encarnación'],['Fernando de la Mora','Fernando de la Mora'],
 ['General Caballero JLM','Juan León Mallorquín'],['Guaireña FC','Villarrica'],['Independiente FBC','Asunción'],['Paraguarí AC','Paraguarí'],
 ['Resistencia SC','Asunción'],['Sol de América','Villa Elisa'],['Sportivo Carapeguá','Carapeguá'],['Tacuary','Asunción']
];
function paraguayAnnualTable(year){const season=seasons.find(x=>x.year===year),map=new Map();(season?.competitions||[]).filter(c=>c.paraguayDivision==='Primera División').forEach(c=>getStandings(c).forEach(r=>{if(!map.has(r.id))map.set(r.id,{...r,points:0,played:0,wins:0,draws:0,losses:0,gf:0,ga:0});const row=map.get(r.id);['points','played','wins','draws','losses','gf','ga'].forEach(k=>row[k]+=r[k]);}));return [...map.values()].sort((a,b)=>b.points-a.points||(b.gf-b.ga)-(a.gf-a.ga)||b.gf-a.gf||a.club.name.localeCompare(b.club.name,'pt-BR'));}
const VENEZUELA_PRIMERA_2026=['Metropolitanos','Deportivo Táchira','Deportivo La Guaira','UCV','Carabobo','Portuguesa','Academia Puerto Cabello','Estudiantes de Mérida','Caracas','Monagas','Zamora','Rayo Zuliano','Trujillanos','Anzoátegui'];
const VENEZUELA_FUTVE2_2026={A:['Academia Puerto Cabello B','Atlético Barinas','Barquisimeto','Deportivo Lara','El Vigía','Real Frontera','Ureña','Yaracuyanos','Zamora B'],B:['Aragua','Ávila FC','Bolívar','Deportivo Miranda','Dynamo Puerto','Marítimo de La Guaira','Mineros de Guayana','Monagas B']};
function ensureVenezuela2026(){const s=seasons.find(x=>x.year===2026);if(!s||s.competitions.some(c=>c.country==='Venezuela'))return;const add=name=>{let c=clubs.find(x=>slugify(x.name)===slugify(name)&&x.country==='Venezuela');if(!c){c={id:uid(),name,state:'',slug:slugify(name),country:'Venezuela'};initializeClubRating(c);clubs.push(c);}return c.id;};const first=VENEZUELA_PRIMERA_2026.map(add),a=VENEZUELA_FUTVE2_2026.A.map(add),b=VENEZUELA_FUTVE2_2026.B.map(add);s.competitions.push({id:'ven-primera-apertura-2026',name:'Primera División · Apertura',country:'Venezuela',division:'Primera División',venezuelaDivision:'Primera División',venezuelaPhase:'Apertura',participants:[...first],singleRound:true,format:'2026 · 14 clubes · 13 rodadas · turno único + quadrangulares finais'},{id:'ven-primera-clausura-2026',name:'Primera División · Clausura',country:'Venezuela',division:'Primera División',venezuelaDivision:'Primera División',venezuelaPhase:'Clausura',participants:[...first],singleRound:true,format:'2026 · 14 clubes · 13 rodadas · turno único + quadrangulares finais'},{id:'ven-futve2-2026',name:'Liga FUTVE 2',country:'Venezuela',division:'Segunda División',venezuelaDivision:'Segunda División',zones:{A:a,B:b},participants:[...a,...b],format:'2026 · 17 clubes · grupos Centro-Occidental (9) e Centro-Oriental (8) · fase regional e mata-mata'});}
const BOLIVIA_PRIMERA_2026=[
 ['Always Ready','El Alto'],['Bolívar','La Paz'],['The Strongest','La Paz'],['San Antonio Bulo Bulo','Entre Ríos'],
 ['Blooming','Santa Cruz de la Sierra'],['Independiente Petrolero','Sucre'],['Nacional Potosí','Potosí'],['Guabirá','Montero'],
 ['GV San José','Oruro'],['Aurora','Cochabamba'],['Real Tomayapo','Tarija'],['Oriente Petrolero','Santa Cruz de la Sierra'],
 ['Real Oruro','Oruro'],['Universitario de Vinto','Vinto'],['ABB','El Alto'],['Real Potosí','Potosí']
];
const BOLIVIA_CUP_GROUPS_2026={
 A:['San Antonio Bulo Bulo','ABB','Aurora','Real Potosí'],
 B:['Always Ready','Real Oruro','Real Tomayapo','Nacional Potosí'],
 C:['Guabirá','Oriente Petrolero','The Strongest','Universitario de Vinto'],
 D:['Bolívar','GV San José','Blooming','Independiente Petrolero']
};
const BOLIVIA_SIMON_GROUPS_2026={
 A:['Empresa Minera Huanuni','Libertad FC','CD Fatic','Atlético Sucre'],
 B:['Chaco FC','Hiska Nacional','Ingenieros Oruro','26 de Febrero'],
 C:['Atlético Independiente','10 de Noviembre Wilstermann Cooperativas','Atlético Junior','Mineros de Potosí'],
 D:['Virginia USC','Deportivo San Martín','Tiquipaya FC','Universitario de Beni'],
 E:['Universitario de Sucre','Tigres FC','Universitario de Tarija','San Juan FC'],
 F:['Primero de Mayo','CD Guadalajara','Ciudad Nueva Santa Cruz Academia FC','Unión Central Tarija']
};
function ensureBolivia2026(){
 const season=seasons.find(x=>x.year===2026);if(!season||season.competitions.some(c=>c.country==='Bolívia'))return;
 const add=([name,city])=>{let club=clubs.find(x=>slugify(x.name)===slugify(name)&&x.country==='Bolívia');if(!club){club={id:uid(),name,state:city||'',slug:slugify(name),country:'Bolívia'};initializeClubRating(club);clubs.push(club);}return club.id;};
 const first=BOLIVIA_PRIMERA_2026.map(add),byBolivianName=name=>add([name,'']);
 const mapGroups=groups=>Object.fromEntries(Object.entries(groups).map(([key,names])=>[key,names.map(byBolivianName)]));
 const cupGroups=mapGroups(BOLIVIA_CUP_GROUPS_2026),simonGroups=mapGroups(BOLIVIA_SIMON_GROUPS_2026);
 const league={id:'bol-primera-2026',name:'División Profesional · Liga',country:'Bolívia',division:'Primera División',boliviaDivision:'Primera División',participants:[...first],format:'2026 · 16 clubes · 30 rodadas · turno e returno'};
 const cup={id:'bol-copa-2026',name:'Copa de la División Profesional',country:'Bolívia',division:'Copa',boliviaDivision:'Copa de la División Profesional',participants:[...first],boliviaGroups:cupGroups,boliviaStage:'groups',format:'2026 · 16 clubes · 4 grupos de 4 · quartas, semifinais e final'};
 const simon={id:'bol-simon-2026',name:'Copa Simón Bolívar',country:'Bolívia',division:'Segunda División',boliviaDivision:'Copa Simón Bolívar',participants:[...new Set(Object.values(simonGroups).flat())],boliviaGroups:simonGroups,boliviaStage:'groups',format:'2026 · 24 clubes na fase nacional · 6 grupos de 4 · oitavas, quartas, semifinais e final · acesso à División Profesional'};
 buildSchedule(league);buildSchedule(cup);buildSchedule(simon);
 season.competitions.push(league,cup,simon);
}
function boliviaGroupSchedule(c){const schedules=Object.entries(c.boliviaGroups||{}).map(([key,ids])=>venezuelaRoundRobin(ids));const count=Math.max(0,...schedules.map(x=>x.length));c.rounds=Array.from({length:count},(_,i)=>({number:i+1,matches:schedules.flatMap(x=>x[i]||[])}));c.boliviaGroupRounds=JSON.parse(JSON.stringify(c.rounds));c.boliviaStage='groups';}
function repairBoliviaInitialCalendars(){let changed=false;seasons.filter(s=>s.year>=2026).forEach(season=>(season.competitions||[]).forEach(c=>{if(!c.boliviaDivision)return;const hasResults=(c.rounds||[]).some(r=>(r.matches||[]).some(m=>m.homeGoals!==null||m.awayGoals!==null));if(c.boliviaDivision==='Primera División'){if((c.rounds||[]).length!==30&&!hasResults){buildSchedule(c);changed=true;}return;}if(!['Copa de la División Profesional','Copa Simón Bolívar'].includes(c.boliviaDivision))return;c.boliviaStage=c.boliviaStage||'groups';if(c.boliviaStage==='groups'&&(c.rounds||[]).length!==6&&!hasResults){boliviaGroupSchedule(c);changed=true;}}));if(changed)save();}

function boliviaGroupTable(c,key){const rounds=c.boliviaStage==='groups'?(c.rounds||[]):(c.boliviaGroupRounds||[]);return peruTable(c,c.boliviaGroups?.[key]||[],rounds);}
function boliviaGroupPhaseComplete(c){const rounds=c.boliviaStage==='groups'?(c.rounds||[]):(c.boliviaGroupRounds||[]),keys=Object.keys(c.boliviaGroups||{});return keys.length>0&&rounds.length>0&&rounds.every(r=>(r.matches||[]).length>0&&r.matches.every(m=>m.homeGoals!==null&&m.awayGoals!==null))&&keys.every(k=>peruTable(c,c.boliviaGroups[k],rounds).every(r=>r.played===6));}
function boliviaGroupStageDone(c){return c.boliviaStage==='groups'&&boliviaGroupPhaseComplete(c);}
function boliviaCreateKnockout(c){
 if(c.boliviaStage!=='groups'||!boliviaGroupStageDone(c))return false;
 const keys=Object.keys(c.boliviaGroups||{}),tables=Object.fromEntries(keys.map(k=>[k,boliviaGroupTable(c,k)]));
 let qualified=[],stage='quarterfinals';
 if(c.boliviaDivision==='Copa de la División Profesional'){
  if(!['A','B','C','D'].every(k=>tables[k]?.length===4))return false;
  const pairs=[['A',0,'D',1],['C',0,'B',1],['B',0,'C',1],['D',0,'A',1]];
  const ties=pairs.map((p,i)=>chileCreateTie(tables[p[0]][p[1]].id,tables[p[2]][p[3]].id,'Quartas de final '+(i+1)));
  c.boliviaGroupRounds=JSON.parse(JSON.stringify(c.rounds));
  c.boliviaKnockout={stage:'quarterfinals',rounds:[{name:'Quartas de final',ties}],champion:null,runnerUp:null,completed:false,awaitingNext:false};
 }else{
  const thirds=[];
  keys.forEach(k=>{if(tables[k]?.length===4){qualified.push(tables[k][0].id,tables[k][1].id);thirds.push({...tables[k][2],group:k});}});
  thirds.sort((a,b)=>b.points-a.points||(b.gf-b.ga)-(a.gf-a.ga)||b.gf-a.gf||a.club.name.localeCompare(b.club.name,'pt-BR'));
  if(qualified.length!==12||thirds.length!==6)return false;
  qualified.push(...thirds.slice(0,4).map(r=>r.id));
  const seeds=[...qualified].sort((a,b)=>{const ra=keys.flatMap(k=>tables[k]).find(r=>r.id===a),rb=keys.flatMap(k=>tables[k]).find(r=>r.id===b);return rb.points-ra.points||(rb.gf-rb.ga)-(ra.gf-ra.ga)||rb.gf-ra.gf;});
  const ties=Array.from({length:8},(_,i)=>chileCreateTie(seeds[i],seeds[15-i],'Oitavas de final '+(i+1)));
  c.boliviaQualified=seeds;c.boliviaGroupRounds=JSON.parse(JSON.stringify(c.rounds));
  c.boliviaKnockout={stage:'roundOf16',rounds:[{name:'Oitavas de final',ties}],champion:null,runnerUp:null,completed:false,awaitingNext:false};
  stage='roundOf16';
 }
 c.boliviaStage='knockout';c.rounds=[];return true;
}
function boliviaKnockoutDone(p){const r=p?.rounds?.[p.rounds.length-1];return !!r&&r.ties.length>0&&r.ties.every(t=>!!chileTieWinner(t));}
function boliviaSimulateKnockout(c){const p=c.boliviaKnockout;if(!p||p.completed||p.awaitingNext)return;const r=p.rounds?.[p.rounds.length-1];if(!r)return;r.ties.forEach(chileSimulateTie);p.awaitingNext=boliviaKnockoutDone(p);}
function boliviaNextKnockout(c){
 const p=c.boliviaKnockout;if(!p||p.completed||!boliviaKnockoutDone(p))return false;
 const last=p.rounds[p.rounds.length-1],w=last.ties.map(chileTieWinner);if(w.some(x=>!x))return false;
 const stage=p.stage;
 if(stage==='roundOf16'){p.stage='quarterfinals';p.rounds.push({name:'Quartas de final',ties:Array.from({length:4},(_,i)=>chileCreateTie(w[i*2],w[i*2+1],'Quartas de final '+(i+1)))});}
 else if(stage==='quarterfinals'){p.stage='semifinals';p.rounds.push({name:'Semifinais',ties:[chileCreateTie(w[0],w[1],'Semifinal 1'),chileCreateTie(w[2],w[3],'Semifinal 2')]});}
 else if(stage==='semifinals'){p.stage='final';p.rounds.push({name:'Final',ties:[chileCreateTie(w[0],w[1],'Final')]});}
 else if(stage==='final'){p.champion=w[0];const tie=last.ties[0];p.runnerUp=p.champion===tie.home?tie.away:tie.home;p.completed=true;p.stage='completed';p.awaitingNext=false;return true;}
 else return false;
 p.awaitingNext=false;return true;
}
function boliviaKnockoutHtml(p){return (p?.rounds||[]).map(r=>'<h4 class="season-heading">'+esc(r.name)+'</h4>'+r.ties.map(chileRenderTie).join('')).join('');}
function boliviaCreateIndirectPlayoff(c,season){
 if(!c||c.boliviaDivision!=='Primera División'||c.boliviaIndirectPlayoff)return false;
 const rows=getStandings(c),second=season?.competitions?.find(x=>x.boliviaDivision==='Copa Simón Bolívar'),p=second?.boliviaKnockout;
 if(rows.length!==16||rows.some(r=>r.played!==30)||!p?.completed||!p.runnerUp)return false;
 c.boliviaIndirectPlayoff=chileCreateTie(rows[14].id,p.runnerUp,'Playoff de ascenso/descenso indirecto');
 return true;
}
function boliviaSimulateIndirectPlayoff(c){if(!c?.boliviaIndirectPlayoff||chileTieWinner(c.boliviaIndirectPlayoff))return;chileSimulateTie(c.boliviaIndirectPlayoff);}
function boliviaQualifiedGroupIds(c){
 const keys=Object.keys(c.boliviaGroups||{}),tables=Object.fromEntries(keys.map(k=>[k,boliviaGroupTable(c,k)]));
 if(c.boliviaDivision==='Copa de la División Profesional')return new Set(keys.flatMap(k=>(tables[k]||[]).slice(0,2).map(r=>r.id)));
 if(c.boliviaDivision==='Copa Simón Bolívar'){
  const thirds=keys.map(k=>tables[k]?.[2]).filter(Boolean).sort((a,b)=>b.points-a.points||(b.gf-b.ga)-(a.gf-a.ga)||b.gf-a.gf||a.club.name.localeCompare(b.club.name,'pt-BR'));
  return new Set([...keys.flatMap(k=>(tables[k]||[]).slice(0,2).map(r=>r.id)),...thirds.slice(0,4).map(r=>r.id)]);
 }
 return new Set();
}
function boliviaTableView(c,season){
 if(c.boliviaDivision==='Primera División'){
  const rows=getStandings(c),last=rows.slice(-1),playoff=rows.slice(-2,-1),classes=continentalClassesForRows(season,'Bolívia',rows);last.forEach(r=>classes[r.id]='zone-relegation');playoff.forEach(r=>classes[r.id]='zone-playoff');
  return '<div class="argentina-rules"><p>Liga em turno e returno · 30 rodadas. O último colocado é rebaixado diretamente; o penúltimo disputa o playoff de ascenso/descenso contra o vice-campeão da Copa Simón Bolívar.</p></div><div class="table-legend">'+continentalLegendItemsHtml()+'<span class="legend-item relegation">Rebaixamento direto · último colocado</span><span class="legend-item playoff">Playoff de ascenso/descenso · penúltimo colocado</span></div>'+peruTableHtml(rows,classes);
 }
 const qualified=boliviaQualifiedGroupIds(c);
 const tables=Object.keys(c.boliviaGroups||{}).map(k=>{const rows=boliviaGroupTable(c,k),classes=Object.fromEntries(rows.filter(r=>qualified.has(r.id)).map(r=>[r.id,'zone-access']));return '<h3 class="season-heading">Grupo '+k+'</h3>'+peruTableHtml(rows,classes);}).join('');
 const knockout=c.boliviaKnockout?'<h3 class="season-heading">Fase final · Mata-mata</h3><div class="playoff-panel">'+boliviaKnockoutHtml(c.boliviaKnockout)+(c.boliviaKnockout.completed?'<p class="access-confirmation">Campeão: '+esc(getClub(c.boliviaKnockout.champion)?.name||'')+'</p>':'')+'</div>':'';
 const rule=c.boliviaDivision==='Copa Simón Bolívar'?'Os dois primeiros de cada grupo e os quatro melhores terceiros avançam às oitavas. O campeão sobe diretamente.':'Os dois primeiros de cada grupo avançam às quartas de final.';
 const legend=c.boliviaDivision==='Copa Simón Bolívar'?'<div class="table-legend"><span class="legend-item access">Classificados às oitavas · 2 primeiros por grupo + 4 melhores terceiros</span></div>':'<div class="table-legend"><span class="legend-item access">Classificados às quartas · 2 primeiros de cada grupo</span></div>';
 return '<div class="argentina-rules"><p>'+rule+'</p></div>'+tables+legend+knockout;
}
function boliviaTiePanel(c,season){
 if(c.boliviaDivision==='Primera División'){
  const p=c.boliviaIndirectPlayoff,second=season.competitions.find(x=>x.boliviaDivision==='Copa Simón Bolívar');
  if(!p&&getStandings(c).every(r=>r.played===30)&&second?.boliviaKnockout?.completed)return '<div class="playoff-panel"><h3>Ascenso/descenso indirecto</h3><p class="muted">O penúltimo colocado enfrenta o vice-campeão da Copa Simón Bolívar em ida e volta.</p><button class="btn" id="create-bolivia-indirect">Gerar confronto</button></div>';
  if(p){const winner=chileTieWinner(p);return '<div class="playoff-panel"><h3>Ascenso/descenso indirecto</h3>'+chileRenderTie(p)+(winner?'<p class="access-confirmation">Vencedor: '+esc(getClub(winner)?.name||'')+'</p>':'<button class="btn" id="simulate-bolivia-indirect">Simular próxima partida</button>')+'</div>';}
 }
 if(c.boliviaStage==='groups'&&boliviaGroupStageDone(c))return '<div class="playoff-panel"><h3>Fase final · Mata-mata</h3><p class="muted">'+(c.boliviaDivision==='Copa Simón Bolívar'?'Os 16 classificados disputam oitavas, quartas, semifinais e final.':'Os oito classificados disputam quartas, semifinais e final.')+'</p><button class="btn" id="create-bolivia-knockout">Gerar confrontos</button></div>';
 if(c.boliviaStage==='knockout'&&c.boliviaKnockout){const p=c.boliviaKnockout,last=p.rounds[p.rounds.length-1];return '<div class="playoff-panel"><h3>Fase final · '+esc(last.name)+'</h3>'+boliviaKnockoutHtml(p)+(p.completed?'<p class="access-confirmation">Campeão: '+esc(getClub(p.champion)?.name||'')+'</p>' : p.awaitingNext?'<button class="btn" id="next-bolivia-knockout">Gerar próxima fase</button>':'<button class="btn" id="simulate-bolivia-knockout">Simular jogos da fase</button>')+'</div>';}
 return '';
}
function venezuelaAnnualTable(year){const s=seasons.find(x=>x.year===year),map=new Map();(s?.competitions||[]).filter(c=>c.venezuelaDivision==='Primera División').forEach(c=>{const regularRounds=c.venezuelaRegularRounds||(c.venezuelaStage==='regular'?c.rounds:[]);getStandings({...c,rounds:regularRounds||[]}).forEach(r=>{if(!map.has(r.id))map.set(r.id,{...r,points:0,played:0,wins:0,draws:0,losses:0,gf:0,ga:0});const x=map.get(r.id);['points','played','wins','draws','losses','gf','ga'].forEach(k=>x[k]+=r[k]);});});return [...map.values()].sort((a,b)=>b.points-a.points||(b.gf-b.ga)-(a.gf-a.ga)||b.gf-a.gf||a.club.name.localeCompare(b.club.name,'pt-BR'));}
function venezuelaRoundRobin(ids){const teams=[...ids];if(teams.length%2)teams.push(null);const n=teams.length,half=n/2,first=[];for(let r=0;r<n-1;r++){const matches=[];for(let i=0;i<half;i++){const a=teams[i],b=teams[n-1-i];if(a&&b){const home=(r+i)%2===0?a:b;matches.push({home,away:home===a?b:a,homeGoals:null,awayGoals:null});}}first.push(matches);teams.splice(1,0,teams.pop());}return first.concat(first.map(ms=>ms.map(m=>({home:m.away,away:m.home,homeGoals:null,awayGoals:null}))));}
function venezuelaCreateTie(a,b,name){return chileCreateTie(a,b,name);}
function venezuelaTieWinner(t){return chileTieWinner(t);}
function venezuelaSimulateTie(t){chileSimulateTie(t);}
function venezuelaCreatePrimeraFinal(c){if(c.venezuelaStage!=='regular'||!c.rounds?.length||c.rounds.some(r=>r.matches.some(m=>m.homeGoals===null||m.awayGoals===null)))return false;const rows=getStandings(c);if(rows.length!==14||rows.some(r=>r.played!==13))return false;c.venezuelaRegularRounds=JSON.parse(JSON.stringify(c.rounds));c.venezuelaGroups={A:[rows[0].id,rows[3].id,rows[4].id,rows[7].id],B:[rows[1].id,rows[2].id,rows[5].id,rows[6].id]};const schedules=Object.values(c.venezuelaGroups).map(venezuelaRoundRobin).map(rs=>rs.slice(0,6));c.rounds=Array.from({length:6},(_,i)=>({number:i+1,matches:schedules.flatMap(rs=>rs[i]||[])}));c.venezuelaFinalRounds=JSON.parse(JSON.stringify(c.rounds));c.venezuelaStage='quadrangular';return true;}
function venezuelaGroupTable(c,z){const rounds=c.venezuelaStage==='title'?(c.venezuelaFinalRounds||[]):(c.rounds||[]);return peruTable(c,c.venezuelaGroups?.[z]||[],rounds);}
function venezuelaCreatePrimeraTitle(c){if(c.venezuelaStage!=='quadrangular'||!c.venezuelaGroups||!c.rounds?.length||c.rounds.some(r=>r.matches.some(m=>m.homeGoals===null||m.awayGoals===null)))return false;const a=venezuelaGroupTable(c,'A')[0],b=venezuelaGroupTable(c,'B')[0];if(!a||!b||a.played!==6||b.played!==6)return false;c.venezuelaFinalRounds=JSON.parse(JSON.stringify(c.rounds));c.venezuelaGroupWinners={A:a.id,B:b.id};c.venezuelaTitleFinal={home:a.id,away:b.id,match:{home:a.id,away:b.id,homeGoals:null,awayGoals:null},penaltyWinner:null,completed:false};c.venezuelaStage='title';c.rounds=[];return true;}
function venezuelaSimulatePrimeraTitle(c){const f=c.venezuelaTitleFinal;if(!f||f.completed)return;simulateMatch(f.match);if(f.match.homeGoals===f.match.awayGoals)f.penaltyWinner=Math.random()<.5?f.home:f.away;f.champion=f.match.homeGoals>f.match.awayGoals?f.home:f.match.awayGoals>f.match.homeGoals?f.away:f.penaltyWinner;f.completed=true;}
function venezuelaCreateFutve2Final(c){if(c.venezuelaStage!=='regional'||!c.rounds?.length||c.rounds.some(r=>r.matches.some(m=>m.homeGoals===null||m.awayGoals===null)))return false;const a=getStandings({...c,participants:c.zones.A}),b=getStandings({...c,participants:c.zones.B});if(a.length!==9||b.length!==8||a.some(r=>r.played!==16)||b.some(r=>r.played!==14))return false;const q=[a[0].id,a[1].id,a[2].id,a[3].id,b[0].id,b[1].id,b[2].id,b[3].id];c.venezuelaRegionalRounds=JSON.parse(JSON.stringify(c.rounds));c.venezuelaQualified=q;c.venezuelaKnockout={stage:'quarterfinals',rounds:[{name:'Quartas de final',ties:[venezuelaCreateTie(q[0],q[7],'1º Centro-Ocidental × 4º Centro-Oriental'),venezuelaCreateTie(q[1],q[6],'2º Centro-Ocidental × 3º Centro-Oriental'),venezuelaCreateTie(q[4],q[3],'1º Centro-Oriental × 4º Centro-Ocidental'),venezuelaCreateTie(q[5],q[2],'2º Centro-Oriental × 3º Centro-Ocidental')]}],champion:null,completed:false};c.venezuelaStage='knockout';c.rounds=[];return true;}
function venezuelaKnockoutDone(p){const r=p?.rounds?.[p.rounds.length-1];return !!r&&r.ties.length>0&&r.ties.every(t=>!!venezuelaTieWinner(t));}
function venezuelaNextKnockout(c){const p=c.venezuelaKnockout;if(!p||p.completed||!venezuelaKnockoutDone(p))return false;const last=p.rounds[p.rounds.length-1],w=last.ties.map(venezuelaTieWinner);if(w.some(x=>!x))return false;const stage=p.rounds.length;if(stage===1){p.stage='semifinals';p.rounds.push({name:'Semifinais',ties:[venezuelaCreateTie(w[0],w[1],'Semifinal 1'),venezuelaCreateTie(w[2],w[3],'Semifinal 2')]});p.awaitingNext=false;return true;}if(stage===2){p.stage='final';p.rounds.push({name:'Final',ties:[venezuelaCreateTie(w[0],w[1],'Final')]});p.awaitingNext=false;return true;}if(stage===3){p.champion=w[0];p.completed=true;p.stage='completed';p.awaitingNext=false;return true;}return false;}
function venezuelaSimulateKnockout(c){const p=c.venezuelaKnockout;if(!p||p.completed||p.awaitingNext)return;const r=p.rounds?.[p.rounds.length-1];if(!r)return;r.ties.forEach(venezuelaSimulateTie);p.awaitingNext=venezuelaKnockoutDone(p);}
function venezuelaKnockoutHtml(p){return (p?.rounds||[]).map(r=>'<h4 class="season-heading">'+esc(r.name)+'</h4>'+r.ties.map(chileRenderTie).join('')).join('');}
function ensureParaguay2026(){
 const season=seasons.find(x=>x.year===2026);if(!season||season.competitions.some(c=>c.country==='Paraguai'))return;
 const add=([name,city])=>{let club=clubs.find(c=>slugify(c.name)===slugify(name)&&c.country==='Paraguai');if(!club){club={id:uid(),name,state:city||'',slug:slugify(name),country:'Paraguai'};initializeClubRating(club);clubs.push(club);}return club.id;};
 const first=PARAGUAY_PRIMERA_2026.map(add),second=PARAGUAY_INTERMEDIA_2026.map(add);
 season.competitions.push(
  {id:'par-primera-apertura-2026',name:'Copa de Primera · Torneo Apertura',country:'Paraguai',division:'Primera División',paraguayDivision:'Primera División',paraguayPhase:'Apertura',participants:[...first],format:'2026 · 12 clubes · 22 rodadas · turno e returno'},
  {id:'par-primera-clausura-2026',name:'Copa de Primera · Torneo Clausura',country:'Paraguai',division:'Primera División',paraguayDivision:'Primera División',paraguayPhase:'Clausura',participants:[...first],format:'2026 · 12 clubes · 22 rodadas · turno e returno'},
  {id:'par-intermedia-2026',name:'División Intermedia',country:'Paraguai',division:'División Intermedia',paraguayDivision:'División Intermedia',participants:second,format:'2026 · 16 clubes · 30 rodadas · turno e returno'}
 );
}

ensurePeru2026();
ensureEcuador2026();
ensureChile2026();
ensureParaguay2026();
ensureVenezuela2026();
ensureBolivia2026();
repairBoliviaInitialCalendars();
function migrateCountryScopedClubs(){
 const byId=new Map(clubs.map(c=>[c.id,c])),usage=new Map();
 seasons.forEach(season=>(season.competitions||[]).forEach(comp=>{
  const country=comp.country||'Brasil';
  const ids=new Set();
  const visit=v=>{if(!v||typeof v!=='object')return;if(Array.isArray(v)){v.forEach(visit);return;}Object.entries(v).forEach(([k,x])=>{if(['home','away','teamA','teamB','champion','promoted','relegated','penaltyWinner'].includes(k)&&typeof x==='string'&&byId.has(x))ids.add(x);else if(['participants','A','B','title','sudamericana','descenso','ascenso'].includes(k)&&Array.isArray(x))x.forEach(id=>{if(typeof id==='string'&&byId.has(id))ids.add(id);else visit(id);});else visit(x);});};
  visit(comp);
  ids.forEach(id=>{if(!usage.has(id))usage.set(id,new Set());usage.get(id).add(country);});
 }));
 const replacements=new Map();
 usage.forEach((countries,id)=>{
  const club=byId.get(id);if(!club)return;
  const list=[...countries];
  if(list.length===1){club.country=club.country||list[0];return;}
  list.forEach((country,index)=>{let target=club;if(index>0){target={...club,id:uid(),country};clubs.push(target);}else target.country=country;replacements.set(country+'|'+id,target.id);});
 });
 const replaceIn=(value,country,key='')=>{
  if(!value||typeof value!=='object')return;
  if(Array.isArray(value)){value.forEach((x,i)=>{if(typeof x==='string'&&byId.has(x)){const next=replacements.get(country+'|'+x);if(next)value[i]=next;}else replaceIn(x,country,key);});return;}
  Object.entries(value).forEach(([k,x])=>{if(typeof x==='string'&&byId.has(x)&&['home','away','teamA','teamB','champion','promoted','relegated','penaltyWinner'].includes(k)){value[k]=replacements.get(country+'|'+x)||x;}else replaceIn(x,country,k);});
 };
 seasons.forEach(season=>(season.competitions||[]).forEach(comp=>{const country=comp.country||'Brasil';replaceIn(comp,country);}));
 clubs.forEach(club=>{if(!club.country)club.country='Brasil';});
}
migrateCountryScopedClubs();


ensureColombia2026();
migrateColombiaCompetitions();
migrateUruguayIntermedioCompetition();
migrateUruguayCompetenciaCompetition();
seasons.forEach(season=>season.competitions.forEach(competition=>{if(!competition.country)competition.country='Brasil';}));
clubs.forEach(initializeClubRating);
save();
function clubRating(club){initializeClubRating(club);return {overall:Number(club.overall),attack:Number(club.attack),defense:Number(club.defense)};}
function clubLink(club,label){return '<button class="club-link" data-open-club="'+club.id+'">'+esc(label||club.name)+'</button>';}
function latestSeason(){return [...seasons].sort((a,b)=>b.year-a.year)[0];}
function render(page='inicio'){
 title.textContent=page==='competicoes'&&activeCompetitionContinent?'Competições · '+activeCompetitionContinent:(labels[page]||'Painel inicial');
 document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.view===page));
 if(page==='inicio')renderHome();
 else if(page==='clubes')renderClubs();
 else if(page==='selecoes')renderSelections();
 else if(page==='temporadas')renderSeasons();
 else if(page==='competicoes')renderCompetitions(activeCompetitionContinent);
 else {const desc={partidas:'As partidas serão geradas pelo calendário e terão resultados simulados automaticamente.',classificacao:'A classificação será calculada automaticamente a partir dos resultados das partidas.',historico:'As temporadas concluídas e as avaliações dos clubes ficarão registradas aqui.'};view.innerHTML='<div class="panel"><h3>'+labels[page]+'</h3><p class="muted">'+desc[page]+'</p><div class="empty">Este módulo será desenvolvido em uma próxima etapa.</div></div>';}
}
function resetTestMatches(){
 const hasSelectionTestData=nationalTeams.some(t=>Math.abs(Number(t.points)-1000)>0.000001||(t.matches||0)>0||(t.history||[]).length)||internationalMatches.length>0||selectionRankHistory.length>0||!!internationalFriendlyDraw;
 const hasWorldCupQualifierDraws=Object.keys(worldCupQualifierDraws||{}).length>0;
 const hasTestData=hasSelectionTestData||hasWorldCupQualifierDraws||seasons.some(s=>s.year!==2026||s.countryAdvancements||s.competitions.some(c=>(Array.isArray(c.rounds)&&c.rounds.length)||c.playoffs||c.chilePlayoffs||c.chileTitleTie||c.peruPlayoffs||c.peruStage==='final'||c.peruStage==='playoffs'||c.venezuelaStage&&c.venezuelaStage!==(c.venezuelaDivision==='Primera División'?'regular':'regional')||c.venezuelaRegularRounds||c.venezuelaFinalRounds||c.venezuelaRegionalRounds||c.venezuelaGroups||c.venezuelaTitleFinal||c.venezuelaKnockout||c.boliviaStage==='knockout'||c.boliviaGroupRounds||c.boliviaKnockout||c.boliviaIndirectPlayoff));
 if(!hasTestData){alert('O sistema já está no estado inicial da temporada de 2026.');return;}
 if(!confirm('Isso apagará todos os calendários, resultados, mata-matas, temporadas posteriores a 2026, partidas internacionais e sorteios das eliminatórias da Copa do Mundo. O sistema voltará à temporada de 2026, restaurará a força inicial dos clubes e zerará o ranking de seleções para 1.000 pontos por seleção. Os cadastros dos clubes e os participantes de 2026 serão mantidos. Continuar?'))return;
 seasons=seasons.filter(s=>s.year===2026);
 seasons.forEach(s=>{
  delete s.countryAdvancements;
  s.competitions.forEach(c=>{delete c.rounds;delete c.playoffs;delete c.chilePlayoffs;delete c.chileTitleTie;delete c.ecuadorRegularRounds;delete c.ecuadorGroups;if(c.ecuadorDivision){c.ecuadorStage='regular';}delete c.peruPlayoffs;delete c.peruFinalGroups;delete c.peruBonus;delete c.peruRegionalRounds;delete c.peruFinalRounds;if(c.peruDivision==='Liga 2')c.peruStage='regional';delete c.venezuelaRegularRounds;delete c.venezuelaFinalRounds;delete c.venezuelaRegionalRounds;delete c.venezuelaGroups;delete c.venezuelaGroupWinners;delete c.venezuelaTitleFinal;delete c.venezuelaKnockout;delete c.venezuelaQualified;delete c.boliviaGroupRounds;delete c.boliviaKnockout;delete c.boliviaQualified;delete c.boliviaIndirectPlayoff;if(c.boliviaDivision==='Primera División')delete c.boliviaStage;if(c.boliviaDivision==='Copa de la División Profesional'||c.boliviaDivision==='Copa Simón Bolívar')c.boliviaStage='groups';if(c.venezuelaDivision==='Primera División')c.venezuelaStage='regular';if(c.venezuelaDivision==='Segunda División')c.venezuelaStage='regional';});
  s.status='Preparação';
 });
 clubs.forEach(club=>{initializeClubRating(club);club.overall=club.initialRating.overall;club.attack=club.initialRating.attack;club.defense=club.initialRating.defense;});
 nationalTeams=(window.WFS_SELECTIONS||[]).map(t=>({...t,points:1000,history:[],matches:0}));
 internationalMatches=[];selectionRankHistory=[];internationalFriendlyDraw=null;
 localStorage.removeItem(FRIENDLY_DRAW_STORE);worldCupQualifierDraws={};activeWorldCupQualifier=null;localStorage.removeItem(WORLDCUP_QUALIFIER_STORE);worldCupIntercontinental=null;localStorage.removeItem(WORLDCUP_INTERCONTINENTAL_STORE);localStorage.removeItem(WORLDCUP_FINAL_STORE);activeWorldCupFinal=false;activeWorldCupQualifierGroup=null;saveSelections();
 save();render('inicio');alert('O sistema voltou à temporada de 2026. Os jogos e temporadas de teste foram apagados, os clubes tiveram a força restaurada e todas as seleções voltaram a 1.000 pontos.');
}
function renderHome(){
 const season=latestSeason();
 view.innerHTML=`
 <div class="welcome"><span class="eyebrow">SEU UNIVERSO DE FUTEBOL</span><h2>Uma nova temporada começa aqui.</h2><p>Gerencie clubes, organize competições e simule campeonatos. Os resultados criados aqui formarão a história própria do seu futebol.</p></div>
 <div class="grid"><div class="card"><small>CLUBES CADASTRADOS</small><strong>${clubs.length}</strong></div><div class="card"><small>COMPETIÇÕES CADASTRADAS</small><strong>${season.competitions.length}</strong></div><div class="card"><small>TEMPORADAS CADASTRADAS</small><strong>${seasons.length}</strong></div></div>
 <div class="panel"><div class="panel-head"><h3>Primeira temporada · ${season.year}</h3><span class="tag">${esc(season.status)}</span></div>${season.competitions.map(c=>`<div class="competition-row"><div><strong>${esc(c.name)}</strong><small>${c.participants.length} clubes · Formato: ${esc(c.format)}</small></div><span class="tag">Cadastrada</span></div>`).join('')}</div>
 <div class="panel"><h3>Regra de evolução dos clubes</h3><p class="muted">A força muda exclusivamente pelos resultados simulados. Promoção e rebaixamento não alteram ratings automaticamente.</p></div>
 <div class="panel reset-panel"><div><h3>Ferramentas da fase de testes</h3><p class="muted">Apaga tudo que foi simulado, remove as temporadas posteriores e retorna o sistema a 2026. Os clubes e os participantes de 2026 serão preservados.</p></div><button class="btn danger" id="reset-test-games">Resetar jogos de teste</button></div>`;
 document.querySelector('#reset-test-games').addEventListener('click',resetTestMatches);
}
function renderClubDetail(clubId,back={type:'clubs'}){
 const club=getClub(clubId);if(!club)return;const rating=clubRating(club);
 const memberships=seasons.flatMap(s=>s.competitions.filter(c=>c.participants.includes(clubId)).map(c=>({year:s.year,name:c.name}))).sort((a,b)=>b.year-a.year||a.name.localeCompare(b.name,'pt-BR'));
 const titles=seasons.flatMap(s=>s.competitions.map(comp=>({season:s,competition:comp,champion:competitionChampion(comp)})).filter(x=>x.champion===clubId).map(x=>({year:x.season.year,name:competitionTitleName(x.competition)}))).sort((a,b)=>b.year-a.year||a.name.localeCompare(b.name,'pt-BR'));
 view.innerHTML='<div class="competition-detail-head"><button class="btn secondary" id="club-back">← Voltar</button><span class="tag">FICHA DO CLUBE</span></div><div class="panel"><div class="panel-head"><div><span class="eyebrow">CADASTRO DO CLUBE</span><h2>'+esc(club.name)+'</h2><p class="muted">'+esc(club.state||'Estado não informado')+'</p></div><span class="tag">'+memberships.length+' INSCRIÇÕES</span></div><h3>Força da equipe</h3><p class="muted">Escala provisória de 1 a 100. O valor 50 é neutro e pode ser ajustado nesta ficha.</p><form id="club-rating-form" class="rating-grid"><div class="field"><label for="rating-overall">Força geral</label><input id="rating-overall" type="number" min="1" max="100" value="'+rating.overall+'" required></div><div class="field"><label for="rating-attack">Ataque</label><input id="rating-attack" type="number" min="1" max="100" value="'+rating.attack+'" required></div><div class="field"><label for="rating-defense">Defesa</label><input id="rating-defense" type="number" min="1" max="100" value="'+rating.defense+'" required></div><button class="btn" type="submit">Salvar força</button></form><div class="rating-bars"><div><span>Geral</span><strong>'+rating.overall+'/100</strong><i><b style="width:'+rating.overall+'%"></b></i></div><div><span>Ataque</span><strong>'+rating.attack+'/100</strong><i><b style="width:'+rating.attack+'%"></b></i></div><div><span>Defesa</span><strong>'+rating.defense+'/100</strong><i><b style="width:'+rating.defense+'%"></b></i></div></div><h3 class="club-memberships-title">Histórico de competições</h3>'+(memberships.length?memberships.map(m=>'<div class="competition-row"><strong>'+esc(m.name)+'</strong><span class="tag">'+m.year+'</span></div>').join(''):'<div class="empty">Este clube ainda não está inscrito em uma competição.</div>')+'<h3 class="club-memberships-title">Histórico de títulos</h3>'+(titles.length?titles.map(t=>'<div class="competition-row"><strong>🏆 '+esc(t.name)+'</strong><span class="tag">'+t.year+'</span></div>').join(''):'<div class="empty">Nenhum título registrado até o momento.</div>')+'</div>';
 document.querySelector('#club-rating-form').addEventListener('submit',e=>{e.preventDefault();const values=['overall','attack','defense'].map(k=>Number(document.querySelector('#rating-'+k).value));if(values.some(v=>!Number.isInteger(v)||v<1||v>100)){alert('Informe valores inteiros entre 1 e 100.');return;}[club.overall,club.attack,club.defense]=values;save();renderClubDetail(clubId,back);});
 document.querySelector('#club-back').addEventListener('click',()=>{if(back.type==='competition')renderCompetitionDetail(back.seasonId,back.competitionId,back.section);else render('clubes');});
}
function renderClubs(){
 view.innerHTML=`<div class="panel"><div class="panel-head"><h3>Cadastro de clubes</h3><span class="tag">CADASTRO ÚNICO</span></div><p class="muted">Cada clube existe uma única vez no cadastro e pode participar de várias temporadas e divisões.</p><form id="club-form"><div class="form-row"><div class="field"><label for="club-name">Nome do clube</label><input id="club-name" required maxlength="70" placeholder="Ex.: Clube de Futebol"></div><div class="field"><label for="club-state">Estado (UF)</label><input id="club-state" maxlength="2" placeholder="Ex.: MG"></div><button class="btn" type="submit">Adicionar clube</button></div></form></div>
 <div class="panel"><div class="panel-head"><h3>Clubes cadastrados</h3><span class="tag">${clubs.length} REGISTROS</span></div>${clubs.length?'<div class="club-list">'+[...clubs].sort((a,b)=>a.name.localeCompare(b.name,'pt-BR')).map(c=>'<div class="club"><span>'+clubLink(c,c.name)+(c.state?' · '+esc(c.state):'')+'</span></div>').join('')+'</div>':'<div class="empty">Nenhum clube cadastrado.</div>'}</div>`;
 view.querySelectorAll('[data-open-club]').forEach(b=>b.addEventListener('click',()=>renderClubDetail(b.dataset.openClub)));
 document.querySelector('#club-form').addEventListener('submit',e=>{e.preventDefault();const name=document.querySelector('#club-name').value.trim(),state=document.querySelector('#club-state').value.trim().toUpperCase();if(!name)return;if(clubs.some(c=>slugify(c.name)===slugify(name))){alert('Este clube já está cadastrado.');return;}const club={id:uid(),name,state,slug:slugify(name)};initializeClubRating(club);clubs.push(club);save();renderClubs();});
}
function competitionTitleName(competition){
 if(competition.argentinaType==='primera')return 'Primera División · Torneo '+(competition.phase||'');
 if(competition.argentinaType==='nacional')return 'Primera Nacional';
 return competition.name;
}
function competitionChampion(competition){
 if(competition.libertadoresCompetition)return competition.libertadoresStage==='completed'?competition.libertadoresChampion||null:null;
 if(competition.argentinaType==='primera')return competition.argentinaPlayoffs?.completed?competition.argentinaPlayoffs.champion||null:null;
 if(competition.argentinaType==='nacional'){const p=competition.argentinaPlayoffs;return p?.completed?argentinaMatchWinner(p.final):null;}
 const rounds=competition.rounds||[];const complete=rounds.length>0&&rounds.every(r=>r.matches.length>0&&r.matches.every(m=>m.homeGoals!==null&&m.awayGoals!==null));
 return complete?getStandings(competition)[0]?.id||null:null;
}
function countrySeason(country){
 return [...seasons].filter(season=>season.competitions.some(c=>(c.country||'Brasil')===country)).sort((a,b)=>b.year-a.year)[0]||null;
}
function countrySeasonBlockers(country,season){
 if(!season)return ['Nenhuma temporada encontrada para este país.'];
 if(season.countryAdvancements?.[country])return ['A temporada seguinte já foi criada.'];
 if(country==='Uruguai'){const clausura=season.competitions.find(c=>c.country==='Uruguai'&&c.uruguayType==='primera-clausura');if(clausura&&!clausura.uruguayChampionship)uruguayCreatePrimeraFinal(season.year);}
 const competitions=season.competitions.filter(c=>(c.country||'Brasil')===country&&!(country==='Uruguai'&&['intermedio-serie','competencia-serie'].includes(c.uruguayType)));
 if(!competitions.length)return ['Nenhuma competição cadastrada.'];
 const blockers=[];
 competitions.forEach(c=>{
  if(country==='Colômbia'&&c.colombiaTournaments)Object.entries(c.colombiaTournaments).forEach(([phase,t])=>{const rs=t.rounds||[],done=rs.length>0&&rs.every(r=>r.matches.length>0&&r.matches.every(m=>m.homeGoals!==null&&m.awayGoals!==null));if(!done)blockers.push(c.name+' · '+phase+': fase regular ainda não foi concluída.');});
  if(country==='Colômbia'&&c.colombiaDivision==='Primera División'&&!colombiaRelegationDecision(season.year).ready)blockers.push('Primera División: tabela de promedios ainda não pode definir os dois rebaixados.');
  if(country==='Colômbia'&&c.colombiaDivision==='Segunda División'&&!colombiaPromotionStatus(c).complete)blockers.push('Segunda División: os dois acessos à Primera División ainda não foram definidos.');
  if(country==='Colômbia'&&c.colombiaTournaments)Object.entries(c.colombiaTournaments).forEach(([phase,t])=>{if(!t.playoff||t.playoff.stage!=='completed')blockers.push(c.name+' · '+phase+': fase final ainda não foi concluída.');});
  if(country==='Venezuela'&&c.venezuelaDivision==='Primera División'&&c.venezuelaPhase==='Clausura'){if(venezuelaAnnualTable(season.year).some(r=>r.played!==26))blockers.push('Primera División: Apertura e Clausura precisam completar as 26 partidas por clube.');const ap=season.competitions.find(x=>x.venezuelaPhase==='Apertura'),cl=season.competitions.find(x=>x.venezuelaPhase==='Clausura');if([ap,cl].some(x=>!x||x.venezuelaStage!=='title'||!x.venezuelaTitleFinal?.completed))blockers.push('Primera División: quadrangulares e finais dos dois torneios precisam ser concluídos.');}
  if(country==='Venezuela'&&c.venezuelaDivision==='Segunda División'){const regionalRounds=c.venezuelaRegionalRounds||(c.venezuelaStage==='regional'?c.rounds:[]);if(['A','B'].some(z=>getStandings({...c,participants:c.zones[z],rounds:regionalRounds||[]}).some(r=>r.played!==(c.zones[z].length===9?16:14))))blockers.push('Liga FUTVE 2: fase regional ainda tem partidas pendentes.');if(!c.venezuelaKnockout?.completed)blockers.push('Liga FUTVE 2: mata-mata de acesso ainda não foi concluído.');}
  if(country==='Bolívia'&&c.boliviaDivision==='Primera División'){const rows=getStandings(c);if(rows.length!==16||rows.some(r=>r.played!==30))blockers.push('División Profesional: as 30 rodadas precisam ser concluídas por todos os clubes.');if(!chileTieWinner(c.boliviaIndirectPlayoff))blockers.push('División Profesional: o playoff de ascenso/descenso indireto ainda não foi concluído.');}
  if(country==='Bolívia'&&['Copa de la División Profesional','Copa Simón Bolívar'].includes(c.boliviaDivision)){if(!boliviaGroupPhaseComplete(c))blockers.push(c.name+': a fase de grupos ainda tem partidas pendentes.');if(!c.boliviaKnockout?.completed)blockers.push(c.name+': o mata-mata ainda não foi concluído.');}
  if(country==='Paraguai'&&c.paraguayDivision==='Primera División'&&c.paraguayPhase==='Clausura'&&paraguayAnnualTable(season.year).some(r=>r.played<44))blockers.push('Primera División: Apertura e Clausura precisam completar as 44 partidas por clube para definir os rebaixados.');
   if(country==='Paraguai'&&c.paraguayDivision==='División Intermedia'&&getStandings(c).some(r=>r.played<30))blockers.push('División Intermedia: as 30 rodadas precisam ser concluídas para definir os dois acessos.');
   if(country==='Chile'&&c.chileDivision){
   const rows=getStandings(c),regularDone=rows.length===16&&rows.every(r=>r.played===30);
   if(!regularDone){} 
   if(regularDone&&rows.length>1&&rows[0].points===rows[1].points&&!c.chileTitleTie?.completed)blockers.push(c.name+': desempate pelo título ainda não foi concluído.');
   if(c.chileDivision==='Primera B'&&regularDone&&(!c.chilePlayoffs?.completed||!c.chilePlayoffs?.promoted))blockers.push('Primera B: liguilla pelo segundo acesso ainda não foi concluída.');
  }
  const rounds=c.rounds||[];
  const regularDone=rounds.length>0&&rounds.every(r=>r.matches.length>0&&r.matches.every(m=>m.homeGoals!==null&&m.awayGoals!==null));
  if(country==='Equador'){const regular=c.ecuadorStage==='regular'&&regularDone,final=ecuadorFinalComplete(c);if(!regular&&!final)blockers.push(c.name+': fase em andamento ou partidas pendentes.');if(regular)blockers.push(c.name+': gere e conclua a fase final.');}if(country==='Peru'){if(c.peruDivision==='Primera División'){if(!regularDone||rounds.length!==17)blockers.push(c.name+': torneio ainda tem jogos pendentes.');if(c.peruPhase==='Clausura'&&regularDone&&c.peruPlayoffs?.stage!=='completed')blockers.push('Liga 1: playoffs nacionais ainda não foram concluídos.');}else if(c.peruDivision==='Liga 2'&&c.peruPlayoffs?.stage!=='completed')blockers.push('Liga 2: fase final e playoffs de acesso ainda não foram concluídos.');}else if(country!=='Venezuela'&&country!=='Bolívia'&&!regularDone)blockers.push(c.name+': fase regular ainda tem jogos pendentes ou calendário não gerado.');
  if(country==='Argentina'&&!c.argentinaPlayoffs?.completed)blockers.push(c.name+': mata-mata ainda não foi concluído.');
  if(country==='Uruguai'&&c.uruguayType==='primera-clausura'&&!c.uruguayChampionship?.completed)blockers.push('Campeonato Uruguaio: fase final ainda não foi concluída.');
  if(country==='Uruguai'&&c.uruguayType==='intermedio'&&!c.uruguayIntermedioFinal?.completed)blockers.push('Torneo Intermedio: final entre as séries A e B ainda não foi concluída.');
  if(country==='Uruguai'&&c.uruguayType==='competencia'&&!c.uruguayCompetenciaFinal?.completed)blockers.push('Torneo Competencia: final entre as séries A e B ainda não foi concluída.');
  if(country==='Uruguai'&&c.uruguayType==='segunda-regular'&&!c.uruguayAccess?.completed)blockers.push('Segunda División: playoff pelo terceiro acesso ainda não foi concluído.');
  if(country==='Brasil'&&c.division==='B'&&c.participants.length>=6){
   const ties=c.playoffs?.ties||[];
   if(!ties.length||!ties.every(t=>!!playoffWinner(t)))blockers.push(c.name+': playoff de acesso ainda não foi concluído.');
  }
 });
 return [...new Set(blockers)];
}
function countrySeasonReady(country,season){return countrySeasonBlockers(country,season).length===0;}

const LIBERTADORES_COUNTRIES=['Argentina','Brasil','Bolívia','Chile','Colômbia','Equador','Paraguai','Peru','Uruguai','Venezuela'];
function libertadoresDomesticRows(season,country){
 const comps=season.competitions.filter(c=>c.country===country);
 const first=comps.find(c=>country==='Brasil'?c.division==='A':country==='Argentina'?c.argentinaType==='primera':country==='Bolívia'?c.boliviaDivision==='Primera División':country==='Chile'?c.chileDivision==='Primera División':country==='Colômbia'?c.colombiaDivision==='Primera División':country==='Equador'?c.ecuadorDivision==='Serie A':country==='Paraguai'?c.paraguayDivision==='Primera División':country==='Peru'?c.peruDivision==='Primera División':country==='Uruguai'?c.uruguayType==='primera-apertura':country==='Venezuela'?c.venezuelaDivision==='Primera División':false);
 if(!first)return [];
 let rows=[];
 if(country==='Argentina')rows=argentinaAnnualTable(season.year);
 else if(country==='Uruguai')rows=uruguayAnnualTable(season.year);
 else if(country==='Colômbia')rows=colombiaAnnualTable(season.year,'Primera División');
 else if(country==='Paraguai')rows=paraguayAnnualTable(season.year);
 else if(country==='Peru')rows=peruAnnualTable(season.year);
 else if(country==='Venezuela')rows=venezuelaAnnualTable(season.year);
 else if(country==='Equador'){
  const regular=first.ecuadorRegularRounds||(first.ecuadorStage==='regular'?first.rounds:[]);
  const finals=first.ecuadorFinalRounds||(first.ecuadorStage==='final'?first.rounds:[]);
  const base=getStandings({...first,rounds:regular||[]}),final=getStandings({...first,rounds:finals||[]}),map=new Map(base.map(x=>[x.id,{...x}]));
  final.forEach(x=>{const row=map.get(x.id);if(!row)return;['points','played','wins','draws','losses','gf','ga'].forEach(k=>row[k]=(row[k]||0)+(x[k]||0));});
  rows=[...map.values()];
 }else rows=getStandings(first);
 if(!rows.length)rows=getStandings(first);
 return rows.map(row=>({...row,club:getClub(row.id),country})).filter(row=>row.club).sort((a,b)=>(b.points||0)-(a.points||0)||((b.gf||0)-(b.ga||0))-((a.gf||0)-(a.ga||0))||(b.gf||0)-(a.gf||0)||a.club.name.localeCompare(b.club.name,'pt-BR'));
}
function libertadoresBuildQualification(source){
 const tables=Object.fromEntries(LIBERTADORES_COUNTRIES.map(country=>[country,libertadoresDomesticRows(source,country)]));
 const needed={Argentina:7,Brasil:8,'Bolívia':4,Chile:4,'Colômbia':4,'Equador':4,'Paraguai':4,Peru:4,Uruguai:4,Venezuela:4};
 const missing=Object.entries(needed).filter(([country,count])=>(tables[country]||[]).length<count);
 if(missing.length)return {ok:false,reason:'Classificação continental incompleta: '+missing.map(([country,count])=>country+' precisa de '+count+' posições válidas').join('; ')+'.'};
 const result={group:[],phase1:[],phase2:[],extras:[]},used=new Set();
 const add=(country,position,target,label)=>{
  const table=tables[country]||[];
  let row=table[position-1];
  if(!row||used.has(row.id))row=table.slice(Math.max(0,position)).find(x=>!used.has(x.id));
  if(!row)return false;
  used.add(row.id);target.push({id:row.id,country,position:table.findIndex(x=>x.id===row.id)+1,label});
  return true;
 };
 const many=(country,positions,target,label)=>positions.every(position=>add(country,position,target,label));
 if(!many('Argentina',[1,2,3,4,5],result.group,'Vaga direta · Argentina')||
    !many('Brasil',[1,2,3,4,5],result.group,'Vaga direta · Brasil')||
    !many('Chile',[1,2],result.group,'Vaga direta · Chile')||
    !many('Colômbia',[1,2],result.group,'Vaga direta · Colômbia')||
    !many('Bolívia',[1,2],result.group,'Vaga direta · Bolívia')||
    !many('Equador',[1,2],result.group,'Vaga direta · Equador')||
    !many('Paraguai',[1,2],result.group,'Vaga direta · Paraguai')||
    !many('Peru',[1,2],result.group,'Vaga direta · Peru')||
    !many('Uruguai',[1,2],result.group,'Vaga direta · Uruguai')||
    !many('Venezuela',[1,2],result.group,'Vaga direta · Venezuela')||
    !many('Brasil',[6,7],result.phase2,'Fase 2 · Brasil')||
    !many('Colômbia',[3,4],result.phase2,'Fase 2 · Colômbia')||
    !many('Chile',[3,4],result.phase2,'Fase 2 · Chile')||
    !many('Argentina',[6],result.phase2,'Fase 2 · Argentina')||
    !many('Bolívia',[3],result.phase2,'Fase 2 · Bolívia')||
    !many('Equador',[3],result.phase2,'Fase 2 · Equador')||
    !many('Paraguai',[3],result.phase2,'Fase 2 · Paraguai')||
    !many('Peru',[3],result.phase2,'Fase 2 · Peru')||
    !many('Uruguai',[3],result.phase2,'Fase 2 · Uruguai')||
    !many('Venezuela',[3],result.phase2,'Fase 2 · Venezuela')||
    !many('Bolívia',[4],result.phase1,'Fase 1 · Bolívia')||
    !many('Equador',[4],result.phase1,'Fase 1 · Equador')||
    !many('Paraguai',[4],result.phase1,'Fase 1 · Paraguai')||
    !many('Peru',[4],result.phase1,'Fase 1 · Peru')||
    !many('Uruguai',[4],result.phase1,'Fase 1 · Uruguai')||
    !many('Venezuela',[4],result.phase1,'Fase 1 · Venezuela'))return {ok:false,reason:'Não foi possível distribuir as vagas nacionais sem duplicar clubes.'};
 const previous=source.competitions.find(c=>c.libertadoresCompetition&&c.libertadoresStage==='completed')?.libertadoresChampion;
 if(previous&&!used.has(previous)){
  const club=getClub(previous);if(club){used.add(previous);result.extras.push({id:previous,country:club.country||'América do Sul',position:null,label:'Campeão vigente da CONMEBOL Libertadores'});}
 }
 const wildcardCandidates=[...(tables.Brasil||[]).slice(7).map(row=>({row,country:'Brasil'})),...(tables.Argentina||[]).slice(6).map(row=>({row,country:'Argentina'})),...LIBERTADORES_COUNTRIES.flatMap(country=>(tables[country]||[]).slice(4).map(row=>({row,country})))];
 wildcardCandidates.sort((a,b)=>clubRating(b.row.club).overall-clubRating(a.row.club).overall||a.row.club.name.localeCompare(b.row.club.name,'pt-BR'));
 for(const candidate of wildcardCandidates){if(result.extras.length>=2)break;if(used.has(candidate.row.id))continue;used.add(candidate.row.id);result.extras.push({id:candidate.row.id,country:candidate.country,position:(tables[candidate.country]||[]).findIndex(x=>x.id===candidate.row.id)+1,label:'Vaga extra da edição inaugural'});}
 if(result.extras.length!==2)return {ok:false,reason:'Não foi possível preencher as duas vagas extras necessárias para completar os 47 participantes.'};
 result.group.push(...result.extras);
 const all=[...result.group,...result.phase1,...result.phase2];
 if(all.length!==47||new Set(all.map(x=>x.id)).size!==47)return {ok:false,reason:'A distribuição final não atingiu 47 clubes únicos.'};
 return {ok:true,qualifiers:result,participants:all.map(x=>x.id),tables};
}
function libertadoresCreateTie(home,away,name,single=false){
 return {name,home,away,legs:single?[{home,away,homeGoals:null,awayGoals:null,neutral:true}]:[{home:away,away:home,homeGoals:null,awayGoals:null},{home,away,homeGoals:null,awayGoals:null}],penaltyWinner:null};
}
function libertadoresTieScore(tie){
 let home=0,away=0;(tie.legs||[]).forEach(match=>{if(match.homeGoals===null||match.awayGoals===null)return;if(match.home===tie.home){home+=match.homeGoals;away+=match.awayGoals;}else{away+=match.homeGoals;home+=match.awayGoals;}});
 return {home,away};
}
function libertadoresTieWinner(tie){
 if(!tie?.legs?.length||tie.legs.some(match=>match.homeGoals===null||match.awayGoals===null))return null;
 const score=libertadoresTieScore(tie);return score.home>score.away?tie.home:score.away>score.home?tie.away:tie.penaltyWinner||null;
}
function libertadoresSimulateTie(tie){
 const index=(tie.legs||[]).findIndex(match=>match.homeGoals===null||match.awayGoals===null);if(index<0)return;
 simulateMatch(tie.legs[index]);
 if(index===tie.legs.length-1){const score=libertadoresTieScore(tie);if(score.home===score.away)tie.penaltyWinner=Math.random()<.5?tie.home:tie.away;}
}
function libertadoresDrawPairs(ids,label){
 const pool=[...ids].sort((a,b)=>clubRating(getClub(b)).overall-clubRating(getClub(a)).overall);
 const ties=[];
 while(pool.length>=2){
  const first=pool.shift(),country=getClub(first)?.country;
  let index=-1;for(let i=pool.length-1;i>=0;i--)if(getClub(pool[i])?.country!==country){index=i;break;}
  if(index<0)index=pool.length-1;
  const second=pool.splice(index,1)[0];ties.push(libertadoresCreateTie(first,second,label+' '+(ties.length+1)));
 }
 return ties;
}
function libertadoresBuildGroupSchedule(c){
 const groups=c.libertadoresGroups||{},schedules=Object.values(groups).map(ids=>peruRoundRobin(ids));
 c.rounds=Array.from({length:6},(_,i)=>({number:i+1,matches:schedules.flatMap(rounds=>rounds[i]||[])}));
 c.libertadoresGroupRounds=JSON.parse(JSON.stringify(c.rounds));
}
function libertadoresDrawGroups(ids){
 const keys=['A','B','C','D','E','F','G','H'],groups=Object.fromEntries(keys.map(key=>[key,[]])),byCountry=new Map();
 ids.forEach(id=>{const country=getClub(id)?.country||'Outros';if(!byCountry.has(country))byCountry.set(country,[]);byCountry.get(country).push(id);});
 const countries=[...byCountry.entries()].sort((a,b)=>b[1].length-a[1].length||a[0].localeCompare(b[0],'pt-BR'));
 countries.forEach(([country,teams])=>{
  teams.sort((a,b)=>clubRating(getClub(b)).overall-clubRating(getClub(a)).overall);
  teams.forEach(id=>{
   const available=keys.filter(key=>groups[key].length<4&&!groups[key].some(other=>(getClub(other)?.country||'Outros')===country)).sort((a,b)=>groups[a].length-groups[b].length);
   const key=available[0]||keys.filter(x=>groups[x].length<4).sort((a,b)=>groups[a].length-groups[b].length)[0];
   if(key)groups[key].push(id);
  });
 });
 return groups;
}
function libertadoresGroupTable(c,key){return peruTable(c,c.libertadoresGroups?.[key]||[],c.libertadoresGroupRounds||c.rounds||[]);}
function libertadoresGroupsComplete(c){
 const rounds=c.libertadoresGroupRounds||c.rounds||[];
 return rounds.length===6&&rounds.every(round=>round.matches.length>0&&round.matches.every(match=>match.homeGoals!==null&&match.awayGoals!==null));
}
function libertadoresStageLabel(stage){
 return ({preliminary1:'Fase preliminar · Fase 1',preliminary2:'Fase preliminar · Fase 2',preliminary3:'Fase preliminar · Fase 3',groups:'Fase de grupos',round16:'Oitavas de final',quarterfinals:'Quartas de final',semifinals:'Semifinais',final:'Final',completed:'Competição concluída'})[stage]||'CONMEBOL Libertadores';
}
function libertadoresSimulateStage(c){
 if(!c.libertadoresTies?.length||c.libertadoresAwaitingNext)return;
 c.libertadoresTies.forEach(libertadoresSimulateTie);
 if(c.libertadoresTies.every(tie=>!!libertadoresTieWinner(tie))){
  if(c.libertadoresStage==='final'){c.libertadoresChampion=libertadoresTieWinner(c.libertadoresTies[0]);c.libertadoresStage='completed';c.libertadoresAwaitingNext=false;}
  else c.libertadoresAwaitingNext=true;
 }
}
function libertadoresNextStage(c){
 if(!c.libertadoresAwaitingNext||!c.libertadoresTies?.length)return false;
 const winners=c.libertadoresTies.map(libertadoresTieWinner);if(winners.some(id=>!id))return false;
 if(c.libertadoresStage==='preliminary1'){
  const entrants=[...(c.libertadoresQualifiers.phase2||[]).map(x=>x.id),...winners];
  if(entrants.length!==16)return false;
  c.libertadoresTies=libertadoresDrawPairs(entrants,'Fase 2');c.libertadoresStage='preliminary2';
 }else if(c.libertadoresStage==='preliminary2'){
  if(winners.length!==8)return false;
  const seeded=[...winners].sort((a,b)=>clubRating(getClub(b)).overall-clubRating(getClub(a)).overall);
  c.libertadoresTies=[libertadoresCreateTie(seeded[0],seeded[7],'Fase 3 · Confronto 1'),libertadoresCreateTie(seeded[1],seeded[6],'Fase 3 · Confronto 2'),libertadoresCreateTie(seeded[2],seeded[5],'Fase 3 · Confronto 3'),libertadoresCreateTie(seeded[3],seeded[4],'Fase 3 · Confronto 4')];
  c.libertadoresStage='preliminary3';
 }else if(c.libertadoresStage==='preliminary3'){
  c.libertadoresPhase3Losers=c.libertadoresTies.map(tie=>{const winner=libertadoresTieWinner(tie);return winner?tie.home===winner?tie.away:tie.home:null;}).filter(Boolean);
  const groupTeams=[...(c.libertadoresQualifiers.group||[]).map(x=>x.id),...winners];
  if(groupTeams.length!==32)return false;
  c.libertadoresGroups=libertadoresDrawGroups(groupTeams);
  if(Object.values(c.libertadoresGroups).some(group=>group.length!==4))return false;
  c.libertadoresStage='groups';c.libertadoresTies=[];c.libertadoresAwaitingNext=false;
  libertadoresBuildGroupSchedule(c);
 }else if(c.libertadoresStage==='round16'){
  if(winners.length!==8)return false;c.libertadoresTies=libertadoresDrawPairs(winners,'Quartas de final');c.libertadoresStage='quarterfinals';
 }else if(c.libertadoresStage==='quarterfinals'){
  if(winners.length!==4)return false;c.libertadoresTies=libertadoresDrawPairs(winners,'Semifinal');c.libertadoresStage='semifinals';
 }else if(c.libertadoresStage==='semifinals'){
  if(winners.length!==2)return false;c.libertadoresTies=[libertadoresCreateTie(winners[0],winners[1],'Final da CONMEBOL Libertadores',true)];c.libertadoresStage='final';
 }else return false;
 c.libertadoresAwaitingNext=false;return true;
}
function libertadoresCreateRoundOf16(c){
 if(c.libertadoresStage!=='groups'||!libertadoresGroupsComplete(c))return false;
 const keys=['A','B','C','D','E','F','G','H'],winners=keys.map(key=>({group:key,row:libertadoresGroupTable(c,key)[0]})),runners=keys.map(key=>({group:key,row:libertadoresGroupTable(c,key)[1]}));
 if([...winners,...runners].some(x=>!x.row))return false;
 const used=new Set(),ties=[];
 winners.sort((a,b)=>b.row.points-a.row.points||(b.row.gf-b.row.ga)-(a.row.gf-a.row.ga));
 winners.forEach((winner,index)=>{
  const candidates=runners.filter(r=>!used.has(r.row.id)&&r.group!==winner.group);
  candidates.sort((a,b)=>{
   const aSame=(getClub(a.row.id)?.country===getClub(winner.row.id)?.country)?1:0,bSame=(getClub(b.row.id)?.country===getClub(winner.row.id)?.country)?1:0;
   return aSame-bSame||a.row.points-b.row.points;
  });
  const runner=candidates[0];if(!runner)return;
  used.add(runner.row.id);ties.push(libertadoresCreateTie(winner.row.id,runner.row.id,'Oitavas · '+winner.group+'1 × '+runner.group+'2'));
 });
 if(ties.length!==8)return false;
 c.libertadoresStage='round16';c.libertadoresTies=ties;c.libertadoresAwaitingNext=false;c.rounds=[];return true;
}
function libertadoresRosterHtml(title,entries){
 return '<h3 class="season-heading">'+esc(title)+' · '+entries.length+' clubes</h3><div class="club-list">'+entries.map(entry=>{const club=getClub(entry.id);return '<div class="club"><span>'+clubLink(club,club?.name||'Clube')+'</span><small>'+esc(entry.country||club?.country||'')+(entry.position?' · '+entry.position+'º':'')+'</small></div>';}).join('')+'</div>';
}
function libertadoresTableView(c){
 const q=c.libertadoresQualifiers||{};
 if(c.libertadoresStage==='groups'||c.libertadoresStage==='round16'||c.libertadoresStage==='quarterfinals'||c.libertadoresStage==='semifinals'||c.libertadoresStage==='final'||c.libertadoresStage==='completed'){
  let html='<div class="argentina-rules"><p>CONMEBOL Libertadores '+c.libertadoresYear+': 32 clubes na fase de grupos, oito grupos de quatro. Os dois primeiros de cada grupo avançam às oitavas de final; os terceiros colocados encerram sua participação nesta competição.</p></div>';
  if(c.libertadoresGroups)html+=['A','B','C','D','E','F','G','H'].map(key=>'<h3 class="season-heading">Grupo '+key+'</h3>'+peruTableHtml(libertadoresGroupTable(c,key))).join('');
  if(c.libertadoresTies?.length)html+=libertadoresStagePanel(c);
  if(c.libertadoresStage==='completed')html+='<p class="access-confirmation">Campeão da CONMEBOL Libertadores '+c.libertadoresYear+': '+esc(getClub(c.libertadoresChampion)?.name||'')+'</p>';
  return html;
 }
 return '<div class="argentina-rules"><p>Classificação para a edição '+c.libertadoresYear+'. A fase de grupos começa com 28 classificados diretos; quatro vagas serão preenchidas pelos vencedores das três fases preliminares.</p></div>'+
  libertadoresRosterHtml('Classificados diretamente à fase de grupos',q.group||[])+
  libertadoresRosterHtml('Fase 1 · seis clubes',q.phase1||[])+
  libertadoresRosterHtml('Fase 2 · treze classificados diretos',q.phase2||[]);
}
function libertadoresTieHtml(tie){
 const winner=libertadoresTieWinner(tie),score=libertadoresTieScore(tie);
 return '<div class="playoff-tie"><div class="round-title"><strong>'+esc(tie.name)+'</strong><span class="tag">'+(winner?'Concluído':'Em disputa')+'</span></div>'+
  tie.legs.map((match,index)=>'<div class="fixture"><span class="fixture-team">'+clubLink(getClub(match.home),getClub(match.home)?.name||'')+'</span><strong class="score">'+(match.homeGoals===null?'—':match.homeGoals+' × '+match.awayGoals)+'</strong><span class="fixture-team away">'+clubLink(getClub(match.away),getClub(match.away)?.name||'')+'</span></div>').join('')+
  '<div class="aggregate-line">Agregado <strong>'+score.home+' × '+score.away+'</strong>'+(tie.penaltyWinner?' · Pênaltis: '+esc(getClub(tie.penaltyWinner)?.name||''):'')+'</div>'+
  (winner?'<p class="promoted-name">Classificado: '+esc(getClub(winner)?.name||'')+'</p>':'')+'</div>';
}
function libertadoresStagePanel(c){
 if(c.libertadoresStage==='completed')return '<div class="playoff-panel"><h3>Campeão da CONMEBOL Libertadores '+c.libertadoresYear+'</h3><p class="access-confirmation">'+esc(getClub(c.libertadoresChampion)?.name||'')+'</p></div>';
 if(c.libertadoresStage==='groups')return '<div class="playoff-panel"><h3>Fase de grupos</h3><p class="muted">'+(libertadoresGroupsComplete(c)?'Os oito grupos foram concluídos. Gere as oitavas de final.':'Conclua as seis rodadas para liberar as oitavas de final.')+'</p>'+(libertadoresGroupsComplete(c)?'<button class="btn" id="create-libertadores-round16">Gerar oitavas de final</button>':'')+'</div>';
 const ties=c.libertadoresTies||[],stage=libertadoresStageLabel(c.libertadoresStage);
 return '<div class="playoff-panel"><div class="playoff-heading"><div><h3>'+esc(stage)+'</h3><p class="muted">Confrontos eliminatórios em ida e volta, exceto a final, disputada em jogo único.</p></div><span class="tag">'+(c.libertadoresAwaitingNext?'FASE CONCLUÍDA':'ELIMINATÓRIA')+'</span></div>'+
  ties.map(libertadoresTieHtml).join('')+
  (c.libertadoresAwaitingNext?'<button class="btn" id="next-libertadores-stage">Gerar próxima fase</button>':'<button class="btn" id="simulate-libertadores-stage">Simular '+(ties.some(tie=>tie.legs.some(match=>match.homeGoals===null))?'jogos da fase':'jogos')+'</button>')+'</div>';
}
function libertadoresGamesPanel(c,regularDone){
 if(c.libertadoresStage==='groups')return libertadoresStagePanel(c);
 return libertadoresStagePanel(c);
}
function libertadoresMaybeCreateForSeason(source,target){
 if(!source||!target||target.year<2027||target.competitions.some(c=>c.libertadoresCompetition))return false;
 if(!LIBERTADORES_COUNTRIES.every(country=>source.countryAdvancements?.[country]===target.year))return false;
 const built=libertadoresBuildQualification(source);
 if(!built.ok){target.libertadoresPendingReason=built.reason;return false;}
 const comp={id:uid(),name:'CONMEBOL Libertadores',country:'América do Sul',continent:'América do Sul',libertadoresCompetition:true,libertadoresYear:target.year,libertadoresStage:'preliminary1',libertadoresQualifiers:built.qualifiers,libertadoresTies:[],libertadoresAwaitingNext:false,participants:built.participants,rounds:[],format:'47 clubes · três fases preliminares · oito grupos de quatro · mata-mata'};
 const p1=[...(built.qualifiers.phase1||[])].map(x=>x.id).sort((a,b)=>clubRating(getClub(b)).overall-clubRating(getClub(a)).overall);
 comp.libertadoresTies=[libertadoresCreateTie(p1[0],p1[5],'Fase 1 · Confronto 1'),libertadoresCreateTie(p1[1],p1[4],'Fase 1 · Confronto 2'),libertadoresCreateTie(p1[2],p1[3],'Fase 1 · Confronto 3')];
 target.competitions.push(comp);delete target.libertadoresPendingReason;return true;
}

const LIBERTADORES_COUNTRY_SLOTS={
 Argentina:{group:[1,2,3,4,5],phase2:[6],phase1:[]},
 Brasil:{group:[1,2,3,4,5],phase2:[6,7],phase1:[]},
 'Bolívia':{group:[1,2],phase2:[3],phase1:[4]},
 Chile:{group:[1,2],phase2:[3,4],phase1:[]},
 'Colômbia':{group:[1,2],phase2:[3,4],phase1:[]},
 Equador:{group:[1,2],phase2:[3],phase1:[4]},
 Paraguai:{group:[1,2],phase2:[3],phase1:[4]},
 Peru:{group:[1,2],phase2:[3],phase1:[4]},
 Uruguai:{group:[1,2],phase2:[3],phase1:[4]},
 Venezuela:{group:[1,2],phase2:[3],phase1:[4]}
};
function libertadoresLatestQualifyingSeason(){
 return [...seasons].filter(season=>LIBERTADORES_COUNTRIES.every(country=>season.competitions.some(comp=>comp.country===country))).sort((a,b)=>b.year-a.year)[0]||seasons.find(season=>season.year===2026)||null;
}
function libertadoresCountryComplete(country,season){
 if(!season||!season.competitions.some(comp=>comp.country===country))return false;
 if(season.countryAdvancements?.[country]===season.year+1)return true;
 return countrySeasonBlockers(country,season).length===0;
}
function libertadoresCountrySlots(country,season){
 const plan=LIBERTADORES_COUNTRY_SLOTS[country]||{group:[],phase2:[],phase1:[]};
 const complete=libertadoresCountryComplete(country,season),rows=complete?libertadoresDomesticRows(season,country):[];
 const items=[];
 [['Fase de grupos',plan.group],['Fase 2 preliminar',plan.phase2],['Fase 1 preliminar',plan.phase1]].forEach(([phase,positions])=>positions.forEach(position=>{
  const row=complete?rows[position-1]:null;
  items.push({country,phase,position,id:row?.id||null,club:row?.club||null,complete:!!row});
 }));
 return {complete,items};
}
function continentalQualificationClassMap(season,country){
 const rankings=libertadoresDomesticRows(season,country);
 if(!rankings.length)return {};
 const classes={};
 const allCountriesComplete=LIBERTADORES_COUNTRIES.every(name=>libertadoresCountryComplete(name,season));
 if(allCountriesComplete){
  const lib=libertadoresBuildQualification(season),suda=lib.ok?sudamericanaBuildQualification(season):{ok:false};
  if(lib.ok&&suda.ok){
   const libIds=new Set(lib.participants),sudaIds=new Set(suda.participants);
   rankings.forEach(row=>{if(libIds.has(row.id))classes[row.id]='zone-libertadores';else if(sudaIds.has(row.id))classes[row.id]='zone-sudamericana';});
   return classes;
  }
 }
 const plan=LIBERTADORES_COUNTRY_SLOTS[country]||{group:[],phase2:[],phase1:[]};
 const libPositions=new Set([...(plan.group||[]),...(plan.phase2||[]),...(plan.phase1||[])]);
 const lastLib=Math.max(0,...libPositions),sudaCount=country==='Argentina'||country==='Brasil'?6:4;
 rankings.forEach((row,index)=>{
  const position=index+1;
  if(libPositions.has(position))classes[row.id]='zone-libertadores';
  else if(position>lastLib&&position<=lastLib+sudaCount)classes[row.id]='zone-sudamericana';
 });
 return classes;
}
function continentalClassesForRows(season,country,rows,existing={}){
 const all=continentalQualificationClassMap(season,country),result={};
 (rows||[]).forEach(row=>{if(all[row.id])result[row.id]=all[row.id];});
 return {...result,...existing};
}
function continentalLegendItemsHtml(){
 return '<span class="legend-item libertadores">CONMEBOL Libertadores</span><span class="legend-item sudamericana">CONMEBOL Sudamericana</span>';
}
function libertadoresQualificationSnapshot(season){
 const countries=LIBERTADORES_COUNTRIES.map(country=>({country,...libertadoresCountrySlots(country,season)}));
 const allComplete=countries.every(item=>item.complete);
 let extras=[],extraReason='Aguardando a conclusão dos campeonatos nacionais dos dez países.';
 if(allComplete){
  const built=libertadoresBuildQualification(season);
  if(built.ok){extras=(built.qualifiers.extras||[]).map(item=>({...item,phase:'Vaga adicional da edição inaugural'}));extraReason='';}
  else extraReason=built.reason;
 }
 const confirmed=countries.reduce((n,c)=>n+c.items.filter(item=>item.complete).length,0)+extras.length;
 const total=countries.reduce((n,c)=>n+c.items.length,0)+2;
 return {countries,allComplete,extras,extraReason,confirmed,total};
}
function libertadoresHubSourceOptions(){
 return [...seasons].filter(season=>LIBERTADORES_COUNTRIES.every(country=>season.competitions.some(comp=>comp.country===country))).sort((a,b)=>b.year-a.year);
}
function renderLibertadoresHub(sourceYear=null,tab='spots'){
 const options=libertadoresHubSourceOptions(),source=options.find(season=>season.year===Number(sourceYear))||libertadoresLatestQualifyingSeason();
 const editions=seasons.flatMap(season=>season.competitions.filter(comp=>comp.libertadoresCompetition).map(comp=>({season,comp}))).sort((a,b)=>b.comp.libertadoresYear-a.comp.libertadoresYear);
 title.textContent='CONMEBOL Libertadores';
 if(!source){
  view.innerHTML='<div class="competition-detail-head"><button class="btn secondary" id="back-libertadores">← Voltar</button><span class="tag">CONMEBOL</span></div><div class="panel"><h2>Classificação continental</h2><div class="empty">Ainda não há uma temporada nacional cadastrada para acompanhar as vagas.</div></div>';
  document.querySelector('#back-libertadores').addEventListener('click',()=>{activeCompetitionContinent='América do Sul';render('competicoes');});return;
 }
 const targetYear=source.year+1,snapshot=libertadoresQualificationSnapshot(source),editionCards=editions.length?editions.map(({season,comp})=>'<div class="competition-row"><div><strong>CONMEBOL Libertadores · '+comp.libertadoresYear+'</strong><small>'+esc(libertadoresStageLabel(comp.libertadoresStage))+(comp.libertadoresChampion?' · Campeão: '+esc(getClub(comp.libertadoresChampion)?.name||''):' · Em andamento')+'</small></div><button class="btn secondary" data-open-libertadores-edition="'+season.id+'|'+comp.id+'">Abrir edição</button></div>').join(''):'<div class="empty">A primeira edição será disputada em 2027. Ainda não há uma edição em andamento.</div>';
 const nav=[['spots','Vagas para a próxima edição'],['edition','Edições em disputa'],['history','Histórico de campeões']];
 let content='';
 if(tab==='spots'){
  content='<div class="grid"><div class="card"><small>VAGAS GARANTIDAS</small><strong>'+snapshot.confirmed+' / '+snapshot.total+'</strong></div><div class="card"><small>PAÍSES CONCLUÍDOS</small><strong>'+snapshot.countries.filter(c=>c.complete).length+' / 10</strong></div><div class="card"><small>PRÓXIMA EDIÇÃO</small><strong>'+targetYear+'</strong></div></div><p class="muted">As vagas são confirmadas somente quando todas as competições e fases nacionais exigidas daquele país estiverem concluídas. Posições ainda não confirmadas permanecem em aberto.</p>';
  content+=snapshot.countries.map(country=>{
   const entries=country.items.map(item=>'<tr><td>'+item.position+'º</td><td>'+esc(item.phase)+'</td><td>'+(item.club?'<strong>'+esc(item.club.name)+'</strong>':'<span class="muted">'+(country.complete?'Vaga sem clube definido':'Aguardando conclusão do campeonato')+'</span>')+'</td><td>'+(item.club?'<span class="tag">GARANTIDA</span>':'<span class="muted">Pendente</span>')+'</td></tr>').join('');
   return '<section class="country-group"><div class="country-heading"><div><h2>'+esc(country.country)+'</h2><p class="muted">'+(country.complete?'Campeonato nacional concluído · '+country.items.filter(x=>x.club).length+' vaga(s) preenchida(s)':'Aguardando conclusão das competições nacionais')+'</p></div><span class="tag">'+(country.complete?'CONCLUÍDO':'EM ANDAMENTO')+'</span></div><div class="table-wrap"><table class="standings"><thead><tr><th>Posição</th><th>Fase</th><th>Clube</th><th>Status</th></tr></thead><tbody>'+entries+'</tbody></table></div></section>';
  }).join('');
  content+='<section class="playoff-panel"><h3>Vagas adicionais da edição inaugural</h3><p class="muted">'+(snapshot.extras.length?'Vagas adicionais definidas para completar a lista de 47 participantes.':'Essas duas vagas serão preenchidas após a conclusão dos dez campeonatos nacionais, sem retirar as vagas já garantidas por posição.')+'</p>'+(snapshot.extras.length?'<div class="club-list">'+snapshot.extras.map(item=>'<div class="club"><span><strong>'+esc(getClub(item.id)?.name||'Clube')+'</strong><small>'+esc(item.label)+'</small></span><span class="tag">GARANTIDA</span></div>').join('')+'</div>':'<span class="muted">'+esc(snapshot.extraReason)+'</span>')+'</section>';
 }else if(tab==='edition'){
  content='<div class="panel"><h2>Edições da CONMEBOL Libertadores</h2><p class="muted">Acompanhe a edição que já começou e acesse suas partidas, classificação e clubes.</p>'+editionCards+'</div>';
 }else{
  const winners=editions.filter(({comp})=>comp.libertadoresStage==='completed'&&comp.libertadoresChampion);
  content='<div class="panel"><h2>Histórico de campeões</h2><p class="muted">Cada campeão ficará registrado ao término da final de sua edição.</p>'+(winners.length?'<div class="season-list">'+winners.map(({comp})=>'<div class="season-card"><div><strong>'+comp.libertadoresYear+' · '+esc(getClub(comp.libertadoresChampion)?.name||'')+'</strong><small>CONMEBOL Libertadores · Campeão</small></div></div>').join('')+'</div>':'<div class="empty">O histórico será preenchido a partir da primeira edição, em 2027.</div>')+'</div>';
 }
 const selector=options.length>1?'<label class="season-history-select"><span>Campeonato nacional de referência</span><select id="libertadores-source-year">'+options.map(season=>'<option value="'+season.year+'" '+(season.year===source.year?'selected':'')+'>'+season.year+' · vagas '+(season.year+1)+'</option>').join('')+'</select></label>':'<span class="tag">VAGAS '+targetYear+'</span>';
 view.innerHTML='<div class="competition-detail-head"><button class="btn secondary" id="back-libertadores">← América do Sul</button><span class="tag">TORNEIO CONTINENTAL · CONMEBOL</span></div><div class="panel"><div class="panel-head"><div><span class="eyebrow">AMÉRICA DO SUL</span><h2>CONMEBOL Libertadores</h2><p class="muted">Classificação nacional, vagas continentais e edições do torneio.</p></div>'+selector+'</div><div class="competition-tabs">'+nav.map(([key,label])=>'<button class="competition-tab '+(tab===key?'active':'')+'" data-libertadores-tab="'+key+'">'+label+'</button>').join('')+'</div><div class="competition-section">'+content+'</div></div>';
 document.querySelector('#back-libertadores').addEventListener('click',()=>{activeCompetitionContinent='América do Sul';render('competicoes');});
 const sourceSelect=document.querySelector('#libertadores-source-year');if(sourceSelect)sourceSelect.addEventListener('change',()=>renderLibertadoresHub(sourceSelect.value,tab));
 view.querySelectorAll('[data-libertadores-tab]').forEach(button=>button.addEventListener('click',()=>renderLibertadoresHub(source.year,button.dataset.libertadoresTab)));
 view.querySelectorAll('[data-open-libertadores-edition]').forEach(button=>button.addEventListener('click',()=>{const [seasonId,competitionId]=button.dataset.openLibertadoresEdition.split('|');renderCompetitionDetail(seasonId,competitionId);}));
}


const SUDAMERICANA_PRELIM_COUNTRIES=['Bolívia','Chile','Colômbia','Equador','Paraguai','Peru','Uruguai','Venezuela'];
function sudamericanaLibertadoresCoreIds(source,country){
 const plan={Argentina:6,Brasil:7,'Bolívia':4,Chile:4,'Colômbia':4,'Equador':4,'Paraguai':4,Peru:4,Uruguai:4,Venezuela:4};
 return libertadoresDomesticRows(source,country).slice(0,plan[country]||0).map(row=>row.id);
}
function sudamericanaCountrySlots(country,source){
 const complete=libertadoresCountryComplete(country,source),rows=complete?libertadoresDomesticRows(source,country):[];
 const allComplete=LIBERTADORES_COUNTRIES.every(name=>libertadoresCountryComplete(name,source));
 let libIds=new Set();
 if(allComplete){
  const qualified=libertadoresBuildQualification(source);
  if(qualified.ok)libIds=new Set(qualified.participants);
 }
 if(!libIds.size)libIds=new Set(LIBERTADORES_COUNTRIES.flatMap(name=>name===country?sudamericanaLibertadoresCoreIds(source,name):[]));
 const available=rows.filter(row=>!libIds.has(row.id));
 const count=country==='Argentina'||country==='Brasil'?6:4;
 const phase=country==='Argentina'||country==='Brasil'?'Fase de grupos':'Fase preliminar nacional';
 return {complete,items:complete?available.slice(0,count).map((row,index)=>({country,phase,position:rows.findIndex(x=>x.id===row.id)+1,id:row.id,club:row.club,complete:true})):Array.from({length:count},(_,index)=>({country,phase,position:null,id:null,club:null,complete:false,slot:index+1}))};
}
function sudamericanaBuildQualification(source){
 if(!LIBERTADORES_COUNTRIES.every(country=>libertadoresCountryComplete(country,source)))return {ok:false,reason:'Aguardando a conclusão dos campeonatos nacionais dos dez países da CONMEBOL.'};
 const libertadores=libertadoresBuildQualification(source);
 if(!libertadores.ok)return {ok:false,reason:'Não foi possível definir primeiro as vagas da Libertadores: '+libertadores.reason};
 const libIds=new Set(libertadores.participants),tables=libertadores.tables;
 const result={direct:[],preliminary:[],byCountry:{}};
 for(const country of LIBERTADORES_COUNTRIES){
  const available=(tables[country]||[]).filter(row=>!libIds.has(row.id));
  const count=country==='Argentina'||country==='Brasil'?6:4;
  if(available.length<count)return {ok:false,reason:country+': não há clubes suficientes depois da distribuição das vagas da Libertadores.'};
  const selected=available.slice(0,count).map((row,index)=>({id:row.id,country,position:(tables[country]||[]).findIndex(x=>x.id===row.id)+1,label:country==='Argentina'||country==='Brasil'?'Classificado direto à fase de grupos':'Classificado à fase preliminar nacional'}));
  result.byCountry[country]=selected;
  if(country==='Argentina'||country==='Brasil')result.direct.push(...selected);else result.preliminary.push(...selected);
 }
 const all=[...result.direct,...result.preliminary];
 if(result.direct.length!==12||result.preliminary.length!==32||all.length!==44||new Set(all.map(x=>x.id)).size!==44)return {ok:false,reason:'A distribuição da Sudamericana não atingiu 44 clubes únicos (12 diretos e 32 na fase preliminar).'};
 result.libertadoresQualified=[...libIds];
 return {ok:true,qualifiers:result,participants:all.map(x=>x.id)};
}
function sudamericanaPreliminaryTieWinner(tie){return libertadoresTieWinner(tie);}
function sudamericanaBuildPreliminaryTies(qualifiers){
 const ties=[];
 SUDAMERICANA_PRELIM_COUNTRIES.forEach(country=>{
  const teams=[...(qualifiers.byCountry[country]||[])];
  if(teams.length!==4)return;
  ties.push(libertadoresCreateTie(teams[0].id,teams[3].id,'Preliminar · '+country+' · Confronto 1',true));
  ties.push(libertadoresCreateTie(teams[1].id,teams[2].id,'Preliminar · '+country+' · Confronto 2',true));
 });
 return ties;
}
function sudamericanaLibertadoresEdition(season){
 return season?.competitions.find(comp=>comp.libertadoresCompetition&&comp.libertadoresYear===season.year)||null;
}
function sudamericanaPhase3Losers(libertadores){
 const saved=[...(libertadores?.libertadoresPhase3Losers||[])];if(saved.length===4)return saved;
 if(libertadores?.libertadoresStage==='preliminary3'&&(libertadores.libertadoresTies||[]).length===4){
  const derived=libertadores.libertadoresTies.map(tie=>{const winner=libertadoresTieWinner(tie);return winner?tie.home===winner?tie.away:tie.home:null;}).filter(Boolean);
  if(derived.length===4)return derived;
 }
 return saved;
}
function sudamericanaGroupParticipants(c){
 const winners=(c.sudamericanaPreliminaryTies||[]).map(sudamericanaPreliminaryTieWinner);
 const libSeason=seasons.find(season=>season.competitions.includes(c));
 const libertadores=sudamericanaLibertadoresEdition(libSeason),losers=sudamericanaPhase3Losers(libertadores);
 const ids=[...(c.sudamericanaQualifiers?.direct||[]).map(item=>item.id),...winners,...losers];
 return {ids,winners,losers,ready:winners.length===16&&winners.every(Boolean)&&losers.length===4&&ids.length===32&&new Set(ids).size===32};
}
function sudamericanaCreateGroups(c){
 if(c.sudamericanaStage!=='preliminary'||!c.sudamericanaPreliminaryTies?.every(tie=>!!sudamericanaPreliminaryTieWinner(tie)))return false;
 const entrants=sudamericanaGroupParticipants(c);if(!entrants.ready)return false;
 c.sudamericanaPreliminaryWinners=entrants.winners;
 c.sudamericanaLibertadoresTransfers=entrants.losers;
 c.sudamericanaGroupParticipants=[...entrants.ids];
 c.sudamericanaGroups=libertadoresDrawGroups(entrants.ids);
 if(Object.values(c.sudamericanaGroups).some(group=>group.length!==4))return false;
 c.sudamericanaStage='groups';c.sudamericanaTies=[];c.sudamericanaAwaitingNext=false;c.rounds=[];
 const schedules=Object.values(c.sudamericanaGroups).map(ids=>peruRoundRobin(ids));
 c.rounds=Array.from({length:6},(_,i)=>({number:i+1,matches:schedules.flatMap(rounds=>rounds[i]||[])}));
 c.sudamericanaGroupRounds=JSON.parse(JSON.stringify(c.rounds));
 return true;
}
function sudamericanaBuildGroupSchedule(c){
 const schedules=Object.values(c.sudamericanaGroups||{}).map(ids=>peruRoundRobin(ids));
 c.rounds=Array.from({length:6},(_,i)=>({number:i+1,matches:schedules.flatMap(rounds=>rounds[i]||[])}));
 c.sudamericanaGroupRounds=JSON.parse(JSON.stringify(c.rounds));
}
function sudamericanaGroupsComplete(c){
 const rounds=c.sudamericanaGroupRounds||c.rounds||[];
 return rounds.length===6&&rounds.every(round=>round.matches.length===16&&round.matches.every(match=>match.homeGoals!==null&&match.awayGoals!==null));
}
function sudamericanaGroupTable(c,key){return peruTable(c,c.sudamericanaGroups?.[key]||[],c.sudamericanaGroupRounds||c.rounds||[]);}
function sudamericanaLibertadoresThirds(c){
 const season=seasons.find(item=>item.competitions.includes(c)),libertadores=sudamericanaLibertadoresEdition(season);
 if(!libertadores||libertadores.libertadoresStage!=='groups'||!libertadoresGroupsComplete(libertadores))return [];
 return ['A','B','C','D','E','F','G','H'].map(key=>libertadoresGroupTable(libertadores,key)[2]?.id).filter(Boolean);
}
function sudamericanaCreatePlayoffs(c){
 if(c.sudamericanaStage!=='groups'||!sudamericanaGroupsComplete(c))return false;
 const libThirds=sudamericanaLibertadoresThirds(c);if(libThirds.length!==8)return false;
 const runners=['A','B','C','D','E','F','G','H'].map(key=>({group:key,row:sudamericanaGroupTable(c,key)[1]}));
 if(runners.some(item=>!item.row))return false;
 runners.sort((a,b)=>b.row.points-a.row.points||(b.row.gf-b.row.ga)-(a.row.gf-a.row.ga)||b.row.gf-a.row.gf);
 const rankedThirds=libThirds.map(id=>({id,club:getClub(id)})).sort((a,b)=>clubRating(b.club).overall-clubRating(a.club).overall);
 c.sudamericanaTies=runners.map((runner,index)=>libertadoresCreateTie(runner.row.id,rankedThirds[index].id,'Playoff das oitavas · '+runner.group+' × Libertadores 3º '+(index+1)));
 c.sudamericanaStage='playoff8';c.sudamericanaAwaitingNext=false;c.rounds=[];
 return true;
}
function sudamericanaNextStage(c){
 if(!c.sudamericanaAwaitingNext||!c.sudamericanaTies?.length)return false;
 const winners=c.sudamericanaTies.map(libertadoresTieWinner);if(winners.some(id=>!id))return false;
 if(c.sudamericanaStage==='playoff8'){
  const groupWinners=['A','B','C','D','E','F','G','H'].map(key=>sudamericanaGroupTable(c,key)[0]?.id).filter(Boolean);
  if(groupWinners.length!==8||winners.length!==8)return false;
  const rankedGroup=groupWinners.sort((a,b)=>clubRating(getClub(b)).overall-clubRating(getClub(a)).overall),rankedPlayoff=[...winners].sort((a,b)=>clubRating(getClub(b)).overall-clubRating(getClub(a)).overall);
  c.sudamericanaTies=rankedGroup.map((id,index)=>libertadoresCreateTie(id,rankedPlayoff[index],'Oitavas de final · Confronto '+(index+1)));
  c.sudamericanaStage='round16';
 }else if(c.sudamericanaStage==='round16'){
  if(winners.length!==8)return false;c.sudamericanaTies=libertadoresDrawPairs(winners,'Quartas de final');c.sudamericanaStage='quarterfinals';
 }else if(c.sudamericanaStage==='quarterfinals'){
  if(winners.length!==4)return false;c.sudamericanaTies=libertadoresDrawPairs(winners,'Semifinal');c.sudamericanaStage='semifinals';
 }else if(c.sudamericanaStage==='semifinals'){
  if(winners.length!==2)return false;c.sudamericanaTies=[libertadoresCreateTie(winners[0],winners[1],'Final da CONMEBOL Sudamericana',true)];c.sudamericanaStage='final';
 }else return false;
 c.sudamericanaAwaitingNext=false;return true;
}
function sudamericanaSimulateKnockout(c){
 if(c.sudamericanaStage==='final'){
  const tie=c.sudamericanaTies?.[0];if(!tie)return;
  libertadoresSimulateTie(tie);
  if(libertadoresTieWinner(tie)){c.sudamericanaChampion=libertadoresTieWinner(tie);c.sudamericanaStage='completed';c.sudamericanaAwaitingNext=false;}
  return;
 }
 if(!c.sudamericanaTies?.length||c.sudamericanaAwaitingNext)return;
 c.sudamericanaTies.forEach(libertadoresSimulateTie);
 if(c.sudamericanaTies.every(tie=>!!libertadoresTieWinner(tie)))c.sudamericanaAwaitingNext=true;
}
function sudamericanaMaybeCreateForSeason(source,target){
 if(!source||!target||target.year<2027||target.competitions.some(comp=>comp.sudamericanaCompetition))return false;
 if(!LIBERTADORES_COUNTRIES.every(country=>source.countryAdvancements?.[country]===target.year))return false;
 const built=sudamericanaBuildQualification(source);
 if(!built.ok){target.sudamericanaPendingReason=built.reason;return false;}
 const comp={id:uid(),name:'CONMEBOL Sudamericana',country:'América do Sul',continent:'América do Sul',sudamericanaCompetition:true,sudamericanaYear:target.year,sudamericanaStage:'preliminary',sudamericanaQualifiers:built.qualifiers,sudamericanaPreliminaryTies:[],sudamericanaTies:[],sudamericanaAwaitingNext:false,participants:built.participants,rounds:[],format:'44 clubes · fase preliminar nacional · oito grupos de quatro · playoffs e mata-mata'};
 comp.sudamericanaPreliminaryTies=sudamericanaBuildPreliminaryTies(built.qualifiers);
 if(comp.sudamericanaPreliminaryTies.length!==16)return false;
 target.competitions.push(comp);delete target.sudamericanaPendingReason;return true;
}
function sudamericanaRosterHtml(title,entries){
 return '<h3 class="season-heading">'+esc(title)+' · '+entries.length+' clubes</h3><div class="club-list">'+entries.map(entry=>'<div class="club"><span>'+clubLink(getClub(entry.id),getClub(entry.id)?.name||'Clube')+'</span><small>'+esc(entry.country||getClub(entry.id)?.country||'')+(entry.position?' · '+entry.position+'º':'')+'</small></div>').join('')+'</div>';
}
function sudamericanaQualificationSnapshot(source){
 const countries=LIBERTADORES_COUNTRIES.map(country=>({country,...sudamericanaCountrySlots(country,source)}));
 const nationalComplete=countries.every(country=>country.complete),built=nationalComplete?sudamericanaBuildQualification(source):null,complete=!!built?.ok;
 const confirmed=countries.reduce((n,c)=>n+c.items.filter(item=>item.club).length,0),total=44;
 return {countries,complete,nationalComplete,reason:built&&!built.ok?built.reason:'',confirmed,total};
}
function sudamericanaStageName(stage){
 return ({preliminary:'Fase preliminar nacional',groups:'Fase de grupos',playoff8:'Playoff das oitavas de final',round16:'Oitavas de final',quarterfinals:'Quartas de final',semifinals:'Semifinais',final:'Final',completed:'Competição concluída'})[stage]||'CONMEBOL Sudamericana';
}
function sudamericanaTableView(c){
 if(c.sudamericanaStage==='preliminary'){
  return '<div class="argentina-rules"><p>CONMEBOL Sudamericana '+c.sudamericanaYear+': 32 clubes disputam a fase preliminar nacional, em jogo único. Os dois vencedores de cada país avançam à fase de grupos. Os 12 classificados diretos são seis da Argentina e seis do Brasil.</p></div>'+sudamericanaRosterHtml('Classificados diretamente à fase de grupos',c.sudamericanaQualifiers.direct||[])+SUDAMERICANA_PRELIM_COUNTRIES.map(country=>'<h3 class="season-heading">'+esc(country)+'</h3>'+sudamericanaRosterHtml('Representantes da fase preliminar',(c.sudamericanaQualifiers.byCountry[country]||[]))).join('');
 }
 if(c.sudamericanaStage==='groups'||c.sudamericanaStage==='playoff8'||c.sudamericanaStage==='round16'||c.sudamericanaStage==='quarterfinals'||c.sudamericanaStage==='semifinals'||c.sudamericanaStage==='final'||c.sudamericanaStage==='completed'){
  let html='<div class="argentina-rules"><p>CONMEBOL Sudamericana '+c.sudamericanaYear+': oito grupos de quatro. O líder avança às oitavas; o segundo disputa o playoff contra um terceiro colocado da Libertadores. Os terceiros e quartos encerram sua participação.</p></div>';
  if(c.sudamericanaGroups)html+=['A','B','C','D','E','F','G','H'].map(key=>'<h3 class="season-heading">Grupo '+key+'</h3>'+peruTableHtml(sudamericanaGroupTable(c,key))).join('');
  if(c.sudamericanaTies?.length&&c.sudamericanaStage!=='completed')html+=c.sudamericanaTies.map(libertadoresTieHtml).join('');
  if(c.sudamericanaStage==='completed')html+='<p class="access-confirmation">Campeão da CONMEBOL Sudamericana '+c.sudamericanaYear+': '+esc(getClub(c.sudamericanaChampion)?.name||'')+'</p>';
  return html;
 }
 return '<div class="empty">Aguardando a definição da edição.</div>';
}
function sudamericanaGamesPanel(c){
 if(c.sudamericanaStage==='preliminary'){
  const complete=(c.sudamericanaPreliminaryTies||[]).every(tie=>!!sudamericanaPreliminaryTieWinner(tie));
  const lib= sudamericanaLibertadoresEdition(seasons.find(season=>season.competitions.includes(c))),losers=sudamericanaPhase3Losers(lib);
  return '<div class="playoff-panel"><h3>Fase preliminar nacional · 16 confrontos</h3><p class="muted">Cada confronto é em jogo único. Os vencedores avançam. Depois, eles se juntam aos 12 classificados diretos e aos quatro eliminados na terceira fase da Libertadores.</p>'+c.sudamericanaPreliminaryTies.map(tie=>'<div class="round-card"><div class="round-title"><strong>'+esc(tie.name)+'</strong><span class="tag">'+(sudamericanaPreliminaryTieWinner(tie)?'Concluído':'Pendente')+'</span></div>'+tie.legs.map(match=>'<div class="fixture"><span class="fixture-team">'+clubLink(getClub(match.home),getClub(match.home)?.name||'')+'</span><strong class="score">'+(match.homeGoals===null?'—':match.homeGoals+' × '+match.awayGoals+(tie.penaltyWinner?' · pênaltis':''))+'</strong><span class="fixture-team away">'+clubLink(getClub(match.away),getClub(match.away)?.name||'')+'</span></div>').join('')+'</div>').join('')+(complete?(losers.length===4?'<button class="btn" id="create-sudamericana-groups">Gerar fase de grupos</button>':'<p class="muted">Fase preliminar concluída. Aguardando os quatro clubes eliminados na terceira fase da Libertadores '+c.sudamericanaYear+'.</p>'):'<button class="btn" id="simulate-sudamericana-preliminary">Simular fase preliminar</button>')+'</div>';
 }
 if(c.sudamericanaStage==='groups'){
  const complete=sudamericanaGroupsComplete(c),lib=sudamericanaLibertadoresEdition(seasons.find(season=>season.competitions.includes(c))),libComplete=!!lib&&libertadoresGroupsComplete(lib);
  return '<div class="playoff-panel"><h3>Fase de grupos · '+(complete?'Concluída':'Em andamento')+'</h3><p class="muted">Seis rodadas, em turno e returno. Os líderes avançam diretamente às oitavas; os vice-líderes entram no playoff com os terceiros da Libertadores.</p>'+(complete?(libComplete?'<button class="btn" id="create-sudamericana-playoffs">Gerar playoff das oitavas</button>':'<p class="muted">Aguardando a conclusão da fase de grupos da Libertadores '+c.sudamericanaYear+' para gerar os playoffs cruzados.</p>'):'As rodadas são simuladas pelos controles de jogos abaixo.')+'</div>';
 }
 if(c.sudamericanaStage==='completed')return '<div class="playoff-panel"><h3>Campeão da CONMEBOL Sudamericana '+c.sudamericanaYear+'</h3><p class="access-confirmation">'+esc(getClub(c.sudamericanaChampion)?.name||'')+'</p></div>';
 const ties=c.sudamericanaTies||[];
 return '<div class="playoff-panel"><div class="playoff-heading"><div><h3>'+esc(sudamericanaStageName(c.sudamericanaStage))+'</h3><p class="muted">'+(c.sudamericanaStage==='final'?'Final em jogo único.':'Confrontos em ida e volta, com final em jogo único.')+'</p></div><span class="tag">'+(c.sudamericanaAwaitingNext?'FASE CONCLUÍDA':'ELIMINATÓRIA')+'</span></div>'+ties.map(libertadoresTieHtml).join('')+(c.sudamericanaAwaitingNext?'<button class="btn" id="next-sudamericana-stage">Gerar próxima fase</button>':'<button class="btn" id="simulate-sudamericana-stage">Simular '+(c.sudamericanaStage==='final'?'final':'jogos da fase')+'</button>')+'</div>';
}
function sudamericanaMaybeCreateForSeasonAndRepair(source,target){
 if(!source||!target)return false;
 return sudamericanaMaybeCreateForSeason(source,target);
}
function renderSudamericanaHub(sourceYear=null,tab='spots'){
 const options=libertadoresHubSourceOptions(),source=options.find(season=>season.year===Number(sourceYear))||libertadoresLatestQualifyingSeason();
 const editions=seasons.flatMap(season=>season.competitions.filter(comp=>comp.sudamericanaCompetition).map(comp=>({season,comp}))).sort((a,b)=>b.comp.sudamericanaYear-a.comp.sudamericanaYear);
 title.textContent='CONMEBOL Sudamericana';
 if(!source){
  view.innerHTML='<div class="competition-detail-head"><button class="btn secondary" id="back-sudamericana">← Voltar</button><span class="tag">CONMEBOL</span></div><div class="panel"><h2>Classificação continental</h2><div class="empty">Ainda não há uma temporada nacional cadastrada para acompanhar as vagas.</div></div>';
  document.querySelector('#back-sudamericana').addEventListener('click',()=>{activeCompetitionContinent='América do Sul';render('competicoes');});return;
 }
 const targetYear=source.year+1,snapshot=sudamericanaQualificationSnapshot(source);
 const nav=[['spots','Vagas para a próxima edição'],['edition','Edições em disputa'],['history','Histórico de campeões']];
 let content='';
 if(tab==='spots'){
  content='<div class="grid"><div class="card"><small>VAGAS CLASSIFICADAS</small><strong>'+snapshot.confirmed+' / '+snapshot.total+'</strong></div><div class="card"><small>PAÍSES CONCLUÍDOS</small><strong>'+snapshot.countries.filter(c=>c.complete).length+' / 10</strong></div><div class="card"><small>PRÓXIMA EDIÇÃO</small><strong>'+targetYear+'</strong></div></div><p class="muted">Argentina e Brasil classificam seis clubes diretamente à fase de grupos. Os outros oito países classificam quatro clubes cada para a fase preliminar. A lista considera primeiro as vagas já destinadas à Libertadores, para evitar duplicidade.</p>';
  content+=snapshot.countries.map(country=>{
   const entries=country.items.map(item=>'<tr><td>'+(item.position?item.position+'º':'—')+'</td><td>'+esc(item.phase)+'</td><td>'+(item.club?'<strong>'+esc(item.club.name)+'</strong>':'<span class="muted">Aguardando conclusão do campeonato</span>')+'</td><td>'+(item.club?'<span class="tag">'+(snapshot.complete?'GARANTIDA':'PROVISÓRIA')+'</span>':'<span class="muted">Pendente</span>')+'</td></tr>').join('');
   return '<section class="country-group"><div class="country-heading"><div><h2>'+esc(country.country)+'</h2><p class="muted">'+(country.complete?(snapshot.complete?'Vagas nacionais confirmadas':'Campeonato concluído · pré-classificação sujeita ao fechamento continental'):'Aguardando conclusão das competições nacionais')+'</p></div><span class="tag">'+(country.complete?(snapshot.complete?'CONFIRMADO':'PROVISÓRIO'):'EM ANDAMENTO')+'</span></div><div class="table-wrap"><table class="standings"><thead><tr><th>Posição nacional</th><th>Destino</th><th>Clube</th><th>Status</th></tr></thead><tbody>'+entries+'</tbody></table></div></section>';
  }).join('');
 }else if(tab==='edition'){
  content='<div class="panel"><h2>Edições da CONMEBOL Sudamericana</h2><p class="muted">Acompanhe as fases preliminares, grupos, playoffs e mata-mata.</p>'+(editions.length?editions.map(({season,comp})=>'<div class="competition-row"><div><strong>CONMEBOL Sudamericana · '+comp.sudamericanaYear+'</strong><small>'+esc(sudamericanaStageName(comp.sudamericanaStage))+(comp.sudamericanaChampion?' · Campeão: '+esc(getClub(comp.sudamericanaChampion)?.name||''):'')+'</small></div><button class="btn secondary" data-open-sudamericana-edition="'+season.id+'|'+comp.id+'">Abrir edição</button></div>').join(''):'<div class="empty">A primeira edição será disputada em 2027. Ainda não há uma edição em andamento.</div>')+'</div>';
 }else{
  const winners=editions.filter(({comp})=>comp.sudamericanaStage==='completed'&&comp.sudamericanaChampion);
  content='<div class="panel"><h2>Histórico de campeões</h2><p class="muted">Cada campeão ficará registrado ao término da final.</p>'+(winners.length?'<div class="season-list">'+winners.map(({comp})=>'<div class="season-card"><div><strong>'+comp.sudamericanaYear+' · '+esc(getClub(comp.sudamericanaChampion)?.name||'')+'</strong><small>CONMEBOL Sudamericana · Campeão</small></div></div>').join('')+'</div>':'<div class="empty">O histórico será preenchido a partir da primeira edição, em 2027.</div>')+'</div>';
 }
 const selector=options.length>1?'<label class="season-history-select"><span>Campeonato nacional de referência</span><select id="sudamericana-source-year">'+options.map(season=>'<option value="'+season.year+'" '+(season.year===source.year?'selected':'')+'>'+season.year+' · vagas '+(season.year+1)+'</option>').join('')+'</select></label>':'<span class="tag">VAGAS '+targetYear+'</span>';
 view.innerHTML='<div class="competition-detail-head"><button class="btn secondary" id="back-sudamericana">← América do Sul</button><span class="tag">TORNEIO CONTINENTAL · CONMEBOL</span></div><div class="panel"><div class="panel-head"><div><span class="eyebrow">AMÉRICA DO SUL</span><h2>CONMEBOL Sudamericana</h2><p class="muted">Vagas nacionais, edições e histórico de campeões.</p></div>'+selector+'</div><div class="competition-tabs">'+nav.map(([key,label])=>'<button class="competition-tab '+(tab===key?'active':'')+'" data-sudamericana-tab="'+key+'">'+label+'</button>').join('')+'</div><div class="competition-section">'+content+'</div></div>';
 document.querySelector('#back-sudamericana').addEventListener('click',()=>{activeCompetitionContinent='América do Sul';render('competicoes');});
 const sourceSelect=document.querySelector('#sudamericana-source-year');if(sourceSelect)sourceSelect.addEventListener('change',()=>renderSudamericanaHub(sourceSelect.value,tab));
 view.querySelectorAll('[data-sudamericana-tab]').forEach(button=>button.addEventListener('click',()=>renderSudamericanaHub(source.year,button.dataset.sudamericanaTab)));
 view.querySelectorAll('[data-open-sudamericana-edition]').forEach(button=>button.addEventListener('click',()=>{const [seasonId,competitionId]=button.dataset.openSudamericanaEdition.split('|');renderCompetitionDetail(seasonId,competitionId);}));
}

function advanceCountrySeason(country,sourceSeasonId){
 const source=seasons.find(s=>s.id===sourceSeasonId);
 if(!countrySeasonReady(country,source)){alert('Ainda existem jogos pendentes neste país.');return;}
 const sourceComps=source.competitions.filter(c=>(c.country||'Brasil')===country&&!(country==='Uruguai'&&['intermedio-serie','competencia-serie'].includes(c.uruguayType)));
 const divisions={A:sourceComps.find(c=>c.division==='A'),B:sourceComps.find(c=>c.division==='B')};
 const nextParticipants=new Map(sourceComps.map(c=>[c.id,[...c.participants]]));
 const nextZones=new Map();
 const nextGroups=new Map();
 if(country==='Argentina'){
  const first=sourceComps.find(c=>c.argentinaType==='primera'),second=sourceComps.find(c=>c.argentinaType==='nacional');
  if(first&&second){
   const decision=argentinaRelegationDecision(source.year);
   if(!decision.ready){alert(decision.reason);return;}
   const promoted=[second.argentinaPlayoffs?.promotedDirect,second.argentinaPlayoffs?.promotedReduced].filter(Boolean);
   if(promoted.length!==2){alert('O mata-mata da Primera Nacional ainda não definiu os dois clubes promovidos.');return;}
   const relegated=decision.relegated;
   const replaceInZones=(competition,outgoing,incoming)=>{
    const zones={A:[...(competition.zones?.A||[])],B:[...(competition.zones?.B||[])]};
    outgoing.forEach((id,index)=>{
     let zone=Object.keys(zones).find(key=>zones[key].includes(id));
     if(!zone)zone=zones.A.length<=zones.B.length?'A':'B';
     const position=zones[zone].indexOf(id);
     if(position>=0)zones[zone][position]=incoming[index];
     else zones[zone].push(incoming[index]);
    });
    return zones;
   };
   const primeraZones=replaceInZones(first,relegated,promoted);
   const nacionalZones=replaceInZones(second,promoted,relegated);
   sourceComps.filter(c=>c.argentinaType==='primera').forEach(c=>{
    const zones={A:[...primeraZones.A],B:[...primeraZones.B]};
    nextZones.set(c.id,zones);
    nextParticipants.set(c.id,[...zones.A,...zones.B]);
   });
   nextZones.set(second.id,nacionalZones);
   nextParticipants.set(second.id,[...nacionalZones.A,...nacionalZones.B]);
  }
 }
 if(country==='Uruguai'){
  const first=sourceComps.find(c=>c.uruguayType==='primera-apertura'),inter=sourceComps.find(c=>c.uruguayType==='intermedio'),second=sourceComps.find(c=>c.uruguayType==='segunda-regular');
  const decision=uruguayRelegationDecision(source.year);
  if(!first||!inter||!second||!decision.ready){alert('Não foi possível calcular os rebaixamentos da Primera División.');return;}
  const access=second.uruguayAccess,promoted=[...getStandings(second).slice(0,2).map(r=>r.id),access?.promotedThird].filter(Boolean);
  if(promoted.length!==3){alert('O acesso da Segunda División ainda não definiu os três promovidos.');return;}
  const relegated=decision.relegated;
  const oldZones={A:[...(inter.zones?.A||[])],B:[...(inter.zones?.B||[])]};
  const replace=(ids,outgoing,incoming)=>ids.map(id=>{const i=outgoing.indexOf(id);return i>=0?incoming[i]:id;});
  const newFirst=replace(first.participants,relegated,promoted);
  sourceComps.filter(c=>['primera-apertura','primera-clausura'].includes(c.uruguayType)).forEach(c=>nextParticipants.set(c.id,[...newFirst]));
  const zones={A:replace(oldZones.A,relegated,promoted),B:replace(oldZones.B,relegated,promoted)};
  nextZones.set(inter.id,zones);nextParticipants.set(inter.id,[...zones.A,...zones.B]);
  nextParticipants.set(second.id,replace(second.participants,promoted,relegated));
  const rosterSwap=new Map();promoted.forEach((id,i)=>rosterSwap.set(id,relegated[i]));relegated.forEach((id,i)=>rosterSwap.set(id,promoted[i]));
  sourceComps.filter(c=>c.uruguayType==='competencia').forEach(c=>{const zones={A:(c.zones?.A||[]).map(id=>rosterSwap.get(id)||id),B:(c.zones?.B||[]).map(id=>rosterSwap.get(id)||id)};nextZones.set(c.id,zones);nextParticipants.set(c.id,[...zones.A,...zones.B]);});
 }
 if(country==='Colômbia'){
  const first=sourceComps.find(c=>c.colombiaDivision==='Primera División'),second=sourceComps.find(c=>c.colombiaDivision==='Segunda División');
  if(first&&second){
   const relegation=colombiaRelegationDecision(source.year),promotion=colombiaPromotionStatus(second);
   if(!relegation.ready||!promotion.complete||promotion.promoted.length!==2){alert('Não foi possível definir os dois rebaixados e os dois promovidos da Colômbia.');return;}
   const relegated=relegation.relegated,promoted=promotion.promoted;
   nextParticipants.set(first.id,[...first.participants.filter(id=>!relegated.includes(id)),...promoted]);
   nextParticipants.set(second.id,[...second.participants.filter(id=>!promoted.includes(id)),...relegated]);
  }
 }
 if(country==='Equador'){
  const first=sourceComps.find(c=>c.ecuadorDivision==='Serie A'),second=sourceComps.find(c=>c.ecuadorDivision==='Serie B');
  if(first&&second){
   if(!ecuadorFinalComplete(first)||!ecuadorFinalComplete(second)){alert('As fases finais da Serie A e da Serie B precisam ser concluídas.');return;}
   const relegated=ecuadorStageTable(first,first.ecuadorGroups.descenso).slice(-2).map(r=>r.id);
   const promoted=ecuadorStageTable(second,second.ecuadorGroups.ascenso).slice(0,2).map(r=>r.id);
   if(relegated.length!==2||promoted.length!==2){alert('Não foi possível definir os dois promovidos e os dois rebaixados do Equador.');return;}
   nextParticipants.set(first.id,[...first.participants.filter(id=>!relegated.includes(id)),...promoted]);
   nextParticipants.set(second.id,[...second.participants.filter(id=>!promoted.includes(id)),...relegated]);
  }
 }
 if(country==='Peru'){const ap=sourceComps.find(c=>c.peruPhase==='Apertura'),cl=sourceComps.find(c=>c.peruPhase==='Clausura'),second=sourceComps.find(c=>c.peruDivision==='Liga 2'),relegated=peruAnnualTable(source.year).slice(-2).map(r=>r.id),promoted=[second?.peruPlayoffs?.champion,second?.peruPlayoffs?.promotedSecond].filter(Boolean);if(!ap||!cl||!second||relegated.length!==2||promoted.length!==2){alert('Não foi possível definir os dois promovidos e os dois rebaixados do Peru.');return;}[ap,cl].forEach(x=>nextParticipants.set(x.id,[...x.participants.filter(id=>!relegated.includes(id)),...promoted]));nextParticipants.set(second.id,[...second.participants.filter(id=>!promoted.includes(id)),...relegated]);const zones={A:[...second.zones.A],B:[...second.zones.B]};relegated.forEach((id,i)=>{const outgoing=promoted[i];let z=Object.keys(zones).find(k=>zones[k].includes(outgoing));if(!z)z=zones.A.length<=zones.B.length?'A':'B';const at=zones[z].indexOf(outgoing);if(at>=0)zones[z][at]=id;});nextZones.set(second.id,zones);}
 if(country==='Venezuela'){const ap=sourceComps.find(c=>c.venezuelaPhase==='Apertura'),cl=sourceComps.find(c=>c.venezuelaPhase==='Clausura'),second=sourceComps.find(c=>c.venezuelaDivision==='Segunda División'),annual=venezuelaAnnualTable(source.year),relegated=annual.slice(-1).map(r=>r.id),promoted=second?.venezuelaKnockout?.champion;if(!ap||!cl||!second||annual.length!==14||annual.some(r=>r.played!==26)||!ap.venezuelaTitleFinal?.completed||!cl.venezuelaTitleFinal?.completed||!promoted||relegated.length!==1){alert('Não foi possível definir o acesso e o rebaixamento da Venezuela. Conclua os quadrangulares e as finais da Primera División e o mata-mata da Liga FUTVE 2.');return;}[ap,cl].forEach(c=>nextParticipants.set(c.id,[...c.participants.filter(id=>!relegated.includes(id)),promoted]));const zones={A:[...(second.zones?.A||[])],B:[...(second.zones?.B||[])]};let promotedZone=Object.keys(zones).find(z=>zones[z].includes(promoted));if(!promotedZone){alert('O clube campeão da FUTVE 2 não foi encontrado nos grupos da Segunda División.');return;}const promotedIndex=zones[promotedZone].indexOf(promoted);zones[promotedZone][promotedIndex]=relegated[0];nextZones.set(second.id,zones);nextParticipants.set(second.id,[...zones.A,...zones.B]);}
 if(country==='Paraguai'){
   const first=sourceComps.find(c=>c.paraguayDivision==='Primera División'&&c.paraguayPhase==='Apertura'),clausura=sourceComps.find(c=>c.paraguayDivision==='Primera División'&&c.paraguayPhase==='Clausura'),second=sourceComps.find(c=>c.paraguayDivision==='División Intermedia');
   const annual=paraguayAnnualTable(source.year),relegated=annual.slice(-2).map(r=>r.id),promoted=second?getStandings(second).slice(0,2).map(r=>r.id):[];
   if(!first||!clausura||!second||annual.length!==12||annual.some(r=>r.played!==44)||promoted.length!==2||getStandings(second).some(r=>r.played!==30)){alert('Não foi possível definir os dois acessos e os dois rebaixamentos do Paraguai. Confira as 22 rodadas de cada torneio da Primera División e as 30 rodadas da División Intermedia.');return;}
   const nextFirst=[...first.participants.filter(id=>!relegated.includes(id)),...promoted];
   [first,clausura].forEach(c=>nextParticipants.set(c.id,[...nextFirst]));
   nextParticipants.set(second.id,[...second.participants.filter(id=>!promoted.includes(id)),...relegated]);
  }
  if(country==='Chile'){
  const first=sourceComps.find(c=>c.chileDivision==='Primera División'),second=sourceComps.find(c=>c.chileDivision==='Primera B');
  if(first&&second){
   const firstRows=getStandings(first),secondRows=getStandings(second);
   const relegated=firstRows.slice(-2).map(r=>r.id),promoted=[chileTitleWinner(second.chileTitleTie)||secondRows[0]?.id,second.chilePlayoffs?.promoted].filter(Boolean);
   if(promoted.length!==2||relegated.length!==2){alert('Não foi possível definir os dois acessos e os dois rebaixamentos do Chile.');return;}
   nextParticipants.set(first.id,[...first.participants.filter(id=>!relegated.includes(id)),...promoted]);
   // A Primera B mantém 16 participantes: os dois promovidos saem e os dois rebaixados da elite entram.
   // O descenso da última divisão profissional fica fora do simulador, que não inclui a Segunda División.
   nextParticipants.set(second.id,[...second.participants.filter(id=>!promoted.includes(id)),...relegated]);
  }
 }
 if(country==='Bolívia'){
  const first=sourceComps.find(c=>c.boliviaDivision==='Primera División'),cup=sourceComps.find(c=>c.boliviaDivision==='Copa de la División Profesional'),second=sourceComps.find(c=>c.boliviaDivision==='Copa Simón Bolívar');
  const rows=first?getStandings(first):[],simon=second?.boliviaKnockout,indirect=first?chileTieWinner(first.boliviaIndirectPlayoff):null;
  if(!first||!cup||!second||rows.length!==16||rows.some(r=>r.played!==30)||!cup.boliviaKnockout?.completed||!simon?.completed||!simon.champion||!simon.runnerUp||!indirect){alert('Não foi possível definir os acessos e rebaixamentos da Bolívia. Conclua a Liga, a Copa da División Profesional, a Simón Bolívar e o playoff indireto.');return;}
  const directRelegated=rows[15].id,penultimate=rows[14].id,promoted=[simon.champion],relegated=[directRelegated];
  if(indirect===simon.runnerUp){promoted.push(simon.runnerUp);relegated.push(penultimate);}
  const replaceGroups=(groups,outgoing,incoming)=>{
   const next=Object.fromEntries(Object.entries(groups||{}).map(([k,ids])=>[k,[...ids]]));
   for(let i=0;i<outgoing.length;i++){const key=Object.keys(next).find(k=>next[k].includes(outgoing[i]));if(!key)return null;next[key][next[key].indexOf(outgoing[i])]=incoming[i];}
   return next;
  };
  const newCupGroups=replaceGroups(cup.boliviaGroups,relegated,promoted),newSecondGroups=replaceGroups(second.boliviaGroups,promoted,relegated);
  if(!newCupGroups||!newSecondGroups){alert('Não foi possível localizar os clubes promovidos/rebaixados nos grupos bolivianos.');return;}
  nextParticipants.set(first.id,[...first.participants.filter(id=>!relegated.includes(id)),...promoted]);
  nextGroups.set(cup.id,newCupGroups);nextParticipants.set(cup.id,Object.values(newCupGroups).flat());
  nextGroups.set(second.id,newSecondGroups);nextParticipants.set(second.id,Object.values(newSecondGroups).flat());
 }
 if(country==='Brasil'&&divisions.A&&divisions.B){
  const relegated=getStandings(divisions.A).slice(-4).map(r=>r.id);
  const bStandings=getStandings(divisions.B);
  const promoted=[...bStandings.slice(0,2).map(r=>r.id),...(divisions.B.playoffs?.ties||[]).map(playoffWinner).filter(Boolean)];
  const uniquePromoted=[...new Set(promoted)];
  nextParticipants.set(divisions.A.id,[...divisions.A.participants.filter(id=>!relegated.includes(id)),...uniquePromoted]);
  nextParticipants.set(divisions.B.id,[...divisions.B.participants.filter(id=>!uniquePromoted.includes(id)),...relegated]);
 }
 const nextYear=source.year+1;
 let target=seasons.find(s=>s.year===nextYear);
 if(target&&target.competitions.some(c=>(c.country||'Brasil')===country)){
  alert('Já existem competições deste país na temporada '+nextYear+'. Confira a aba Temporadas antes de avançar.');
  return;
 }
 if(!target){target={id:uid(),year:nextYear,status:'Preparação',createdAt:new Date().toISOString(),competitions:[]};seasons.push(target);}
 source.countryAdvancements=source.countryAdvancements||{};
 source.countryAdvancements[country]=nextYear;
 sourceComps.forEach(comp=>{
  const nextCompetition={...Object.fromEntries(Object.entries(comp).filter(([k])=>!['rounds','playoffs','argentinaPlayoffs','uruguayChampionship','uruguayAccess','uruguayIntermedioFinal','uruguayCompetenciaFinal','colombiaPromotion','chilePlayoffs','chileTitleTie','peruPlayoffs','peruFinalGroups','peruBonus','peruRegionalRounds','peruFinalRounds','ecuadorRegularRounds','ecuadorFinalRounds','ecuadorGroups','venezuelaStage','venezuelaRegularRounds','venezuelaFinalRounds','venezuelaRegionalRounds','venezuelaGroups','venezuelaGroupWinners','venezuelaTitleFinal','venezuelaKnockout','venezuelaQualified','boliviaGroups','boliviaStage','boliviaGroupRounds','boliviaKnockout','boliviaQualified','boliviaIndirectPlayoff'].includes(k))),id:uid(),name:comp.name,country,division:comp.division||'',participants:nextParticipants.get(comp.id)||[...comp.participants],...(nextZones.has(comp.id)?{zones:nextZones.get(comp.id)}:{}),...(nextGroups.has(comp.id)?{boliviaGroups:nextGroups.get(comp.id)}:{}),...(comp.peruDivision==='Liga 2'?{peruStage:'regional'}:{}),...(comp.ecuadorDivision?{ecuadorStage:'regular'}:{}),...(comp.colombiaTournaments?{colombiaTournaments:{Apertura:{label:'Apertura',rounds:[]},Clausura:{label:'Clausura',rounds:[]}},colombiaActivePhase:'Apertura',colombiaStageView:'first'}:{}),...(country==='Venezuela'?{venezuelaSeasonInitialized:true}:{}),...(['Copa de la División Profesional','Copa Simón Bolívar'].includes(comp.boliviaDivision)?{boliviaStage:'groups'}:{}),format:comp.format||'A definir'};
  if(country==='Venezuela'||country==='Bolívia')buildSchedule(nextCompetition);
  target.competitions.push(nextCompetition);
 });
 libertadoresMaybeCreateForSeason(source,target);
 sudamericanaMaybeCreateForSeason(source,target);
 save();renderCompetitions();
 alert(country==='Brasil'&&divisions.A&&divisions.B?'Temporada '+nextYear+' criada! Os quatro últimos da Série A foram rebaixados, e os quatro promovidos da Série B foram definidos. As forças acumuladas dos clubes foram preservadas.':country==='Colômbia'?'Temporada '+nextYear+' criada! Promovidos à Primera División: '+(colombiaPromotionStatus(sourceComps.find(c=>c.colombiaDivision==='Segunda División'))?.promoted||[]).map(id=>getClub(id)?.name||'').join(' e ')+'. Os rebaixados também foram substituídos, e as forças dos clubes foram preservadas.':'Temporada '+nextYear+' criada! Os participantes e as forças acumuladas dos clubes foram preservados.');
}
function repairLegacyVenezuelaAdvance(){
 let changed=false;
 seasons.forEach(source=>{
  const nextYear=source.countryAdvancements?.Venezuela,target=seasons.find(x=>x.year===nextYear);
  if(!nextYear||!target)return;
  const sourceComps=source.competitions.filter(c=>c.country==='Venezuela'),targetComps=target.competitions.filter(c=>c.country==='Venezuela');
  if(sourceComps.length!==3||targetComps.length!==3||!targetComps.every(c=>!(c.rounds||[]).length)||targetComps.some(c=>c.venezuelaSeasonInitialized||c.venezuelaStage||c.venezuelaRegularRounds||c.venezuelaFinalRounds||c.venezuelaRegionalRounds||c.venezuelaGroups||c.venezuelaTitleFinal||c.venezuelaKnockout))return;
  const ap=sourceComps.find(c=>c.venezuelaPhase==='Apertura'),cl=sourceComps.find(c=>c.venezuelaPhase==='Clausura'),second=sourceComps.find(c=>c.venezuelaDivision==='Segunda División');
  const annual=venezuelaAnnualTable(source.year),relegated=annual.slice(-1).map(r=>r.id),promoted=second?.venezuelaKnockout?.champion;
  if(!ap||!cl||!second||annual.length!==14||annual.some(r=>r.played!==26)||!ap.venezuelaTitleFinal?.completed||!cl.venezuelaTitleFinal?.completed||!promoted||relegated.length!==1)return;
  const zones={A:[...(second.zones?.A||[])],B:[...(second.zones?.B||[])]},promotedZone=Object.keys(zones).find(z=>zones[z].includes(promoted));
  if(!promotedZone)return;
  zones[promotedZone][zones[promotedZone].indexOf(promoted)]=relegated[0];
  const participants=new Map(sourceComps.map(c=>[c.id,[...c.participants]])),nextZones=new Map();
  [ap,cl].forEach(c=>participants.set(c.id,[...c.participants.filter(id=>id!==relegated[0]),promoted]));
  participants.set(second.id,[...zones.A,...zones.B]);nextZones.set(second.id,zones);
  const resetFields=new Set(['rounds','playoffs','venezuelaStage','venezuelaRegularRounds','venezuelaFinalRounds','venezuelaRegionalRounds','venezuelaGroups','venezuelaGroupWinners','venezuelaTitleFinal','venezuelaKnockout','venezuelaQualified']);
  const rebuilt=sourceComps.map(comp=>{
   const previous=targetComps.find(c=>c.venezuelaDivision===comp.venezuelaDivision&&(c.venezuelaPhase||'')===(comp.venezuelaPhase||''));
   const next={...Object.fromEntries(Object.entries(comp).filter(([k])=>!resetFields.has(k))),id:previous?.id||uid(),participants:participants.get(comp.id)||[...comp.participants],...(nextZones.has(comp.id)?{zones:nextZones.get(comp.id)}:{}),venezuelaSeasonInitialized:true};
   buildSchedule(next);return next;
  });
  const firstIndex=target.competitions.findIndex(c=>c.country==='Venezuela');
  target.competitions=target.competitions.filter(c=>c.country!=='Venezuela');
  target.competitions.splice(firstIndex<0?target.competitions.length:Math.min(firstIndex,target.competitions.length),0,...rebuilt);
  changed=true;
 });
 if(changed)save();
}
function repairLibertadoresEditions(){
 let changed=false;
 [...seasons].sort((a,b)=>a.year-b.year).forEach(source=>{
  const nextYear=source.year+1;
  if(nextYear<2027||!LIBERTADORES_COUNTRIES.every(country=>source.countryAdvancements?.[country]===nextYear))return;
  let target=seasons.find(season=>season.year===nextYear);
  if(!target){target={id:uid(),year:nextYear,status:'Preparação',createdAt:new Date().toISOString(),competitions:[]};seasons.push(target);changed=true;}
  if(!target.competitions.some(comp=>comp.libertadoresCompetition)){
   const created=libertadoresMaybeCreateForSeason(source,target);
   if(created)changed=true;
  }
  if(!target.competitions.some(comp=>comp.sudamericanaCompetition)){
   const created=sudamericanaMaybeCreateForSeason(source,target);
   if(created)changed=true;
  }
 });
 if(changed)save();
}
function renderCompetitions(continent=activeCompetitionContinent){
  repairLegacyVenezuelaAdvance();
  repairLibertadoresEditions();
  if(!continent){view.innerHTML='<div class="panel"><div class="panel-head"><h3>Selecione um continente</h3><span class="tag">6 CONTINENTES</span></div><p class="muted">Escolha um continente no menu lateral para visualizar os países cadastrados e acessar seus campeonatos.</p></div>';return;}
  const countries=[...new Set(seasons.flatMap(s=>s.competitions.map(c=>c.country||'Brasil')))].filter(country=>COUNTRY_CONTINENT[slugify(country)]===continent).sort((a,b)=>a.localeCompare(b,'pt-BR'));
  function countryBody(country,season){
   if(!season)return '<div class="empty">Nenhuma competição nesta temporada.</div>';
   const list=season.competitions.filter(c=>(c.country||'Brasil')===country);
   const colombiaFirst=list.find(c=>c.colombiaDivision==='Primera División'),colombiaSecond=list.find(c=>c.colombiaDivision==='Segunda División');const boliviaFirst=list.find(c=>c.boliviaDivision==='Primera División'),boliviaCup=list.find(c=>c.boliviaDivision==='Copa de la División Profesional'),boliviaSecond=list.find(c=>c.boliviaDivision==='Copa Simón Bolívar');
   const primera=list.filter(c=>c.argentinaType==='primera');
   const uruguayFirst=list.filter(c=>['primera-apertura','intermedio','intermedio-serie','primera-clausura'].includes(c.uruguayType));
   const uruguaySecond=list.filter(c=>['competencia','competencia-serie','segunda-regular'].includes(c.uruguayType));
   const chileFirst=list.find(c=>c.chileDivision==='Primera División'),chileSecond=list.find(c=>c.chileDivision==='Primera B');const peruFirst=list.find(c=>c.peruDivision==='Primera División'&&c.peruPhase==='Apertura'),peruSecond=list.find(c=>c.peruDivision==='Liga 2');const ecuadorFirst=list.find(c=>c.ecuadorDivision==='Serie A'),ecuadorSecond=list.find(c=>c.ecuadorDivision==='Serie B');const paraguayFirst=list.find(c=>c.paraguayDivision==='Primera División'&&c.paraguayPhase==='Apertura'),paraguaySecond=list.find(c=>c.paraguayDivision==='División Intermedia');const venezuelaFirst=list.find(c=>c.venezuelaDivision==='Primera División'&&c.venezuelaPhase==='Apertura'),venezuelaSecond=list.find(c=>c.venezuelaDivision==='Segunda División');
   let html='';
   if(boliviaFirst)html+='<button class="competition-open" data-open-competition="'+season.id+'|'+boliviaFirst.id+'"><span><strong>División Profesional · Liga</strong><small>16 clubes · turno e returno · 30 rodadas</small></span><span class="competition-open-action">Abrir campeonato →</span></button>';
   if(boliviaCup)html+='<button class="competition-open" data-open-competition="'+season.id+'|'+boliviaCup.id+'"><span><strong>Copa de la División Profesional</strong><small>16 clubes · 4 grupos · mata-mata</small></span><span class="competition-open-action">Abrir competição →</span></button>';
   if(boliviaSecond)html+='<button class="competition-open" data-open-competition="'+season.id+'|'+boliviaSecond.id+'"><span><strong>Copa Simón Bolívar · Segunda División</strong><small>24 clubes · 6 grupos · mata-mata de acesso</small></span><span class="competition-open-action">Abrir campeonato →</span></button>';
   if(ecuadorFirst)html+='<button class="competition-open" data-open-competition="'+season.id+'|'+ecuadorFirst.id+'"><span><strong>Serie A · Equador</strong><small>16 clubes · fase inicial e fase final</small></span><span class="competition-open-action">Abrir campeonato →</span></button>';if(ecuadorSecond)html+='<button class="competition-open" data-open-competition="'+season.id+'|'+ecuadorSecond.id+'"><span><strong>Serie B · Equador</strong><small>12 clubes · fase classificatória e hexagonais</small></span><span class="competition-open-action">Abrir campeonato →</span></button>';
   if(paraguayFirst)html+='<button class="competition-open" data-open-competition="'+season.id+'|'+paraguayFirst.id+'"><span><strong>Primera División · Paraguai</strong><small>Apertura e Clausura · 12 clubes</small></span><span class="competition-open-action">Abrir campeonato →</span></button>';if(venezuelaFirst)html+='<button class="competition-open" data-open-competition="'+season.id+'|'+venezuelaFirst.id+'"><span><strong>Primera División · Venezuela</strong><small>Apertura e Clausura · 14 clubes</small></span><span class="competition-open-action">Abrir campeonato →</span></button>';if(venezuelaSecond)html+='<button class="competition-open" data-open-competition="'+season.id+'|'+venezuelaSecond.id+'"><span><strong>Liga FUTVE 2 · Venezuela</strong><small>17 clubes · dois grupos regionais</small></span><span class="competition-open-action">Abrir campeonato →</span></button>';if(paraguaySecond)html+='<button class="competition-open" data-open-competition="'+season.id+'|'+paraguaySecond.id+'"><span><strong>División Intermedia · Paraguai</strong><small>16 clubes · 30 rodadas</small></span><span class="competition-open-action">Abrir campeonato →</span></button>';if(peruFirst)html+='<button class="competition-open" data-open-competition="'+season.id+'|'+peruFirst.id+'"><span><strong>Primera División · Peru</strong><small>Apertura e Clausura · 18 clubes</small></span><span class="competition-open-action">Abrir campeonato →</span></button>';if(peruSecond)html+='<button class="competition-open" data-open-competition="'+season.id+'|'+peruSecond.id+'"><span><strong>Liga 2 · Peru</strong><small>18 clubes · fase regional e fase final</small></span><span class="competition-open-action">Abrir campeonato →</span></button>';if(chileFirst)html+='<button class="competition-open" data-open-competition="'+season.id+'|'+chileFirst.id+'"><span><strong>Primera División · Chile</strong><small>16 clubes · 30 rodadas</small></span><span class="competition-open-action">Abrir campeonato →</span></button>';
   if(chileSecond)html+='<button class="competition-open" data-open-competition="'+season.id+'|'+chileSecond.id+'"><span><strong>Primera B · Chile</strong><small>16 clubes · 30 rodadas + liguilla</small></span><span class="competition-open-action">Abrir campeonato →</span></button>';
   if(primera.length)html+='<button class="competition-open" data-open-competition="'+season.id+'|'+primera[0].id+'"><span><strong>Primera División</strong><small>Apertura e Clausura · '+primera[0].participants.length+' participantes</small></span><span class="competition-open-action">Abrir campeonato →</span></button>';
   if(uruguayFirst.length)html+='<button class="competition-open" data-open-competition="'+season.id+'|'+uruguayFirst[0].id+'"><span><strong>Primera División · Uruguai</strong><small>Apertura, Intermedio e Clausura · 16 clubes</small></span><span class="competition-open-action">Abrir campeonato →</span></button>';
   if(uruguaySecond.length)html+='<button class="competition-open" data-open-competition="'+season.id+'|'+uruguaySecond[0].id+'"><span><strong>Segunda División · Uruguai</strong><small>Torneo Competencia e Fase Regular · 14 clubes</small></span><span class="competition-open-action">Abrir campeonato →</span></button>';
   if(colombiaFirst)html+='<button class="competition-open" data-open-competition="'+season.id+'|'+colombiaFirst.id+'"><span><strong>Primera División · Colômbia</strong><small>Apertura e Clausura · '+colombiaFirst.participants.length+' clubes</small></span><span class="competition-open-action">Abrir campeonato →</span></button>';
   if(colombiaSecond)html+='<button class="competition-open" data-open-competition="'+season.id+'|'+colombiaSecond.id+'"><span><strong>Segunda División · Colômbia</strong><small>Apertura e Clausura · '+colombiaSecond.participants.length+' clubes</small></span><span class="competition-open-action">Abrir campeonato →</span></button>';
   html+=list.filter(comp=>comp.argentinaType!=='primera'&&!comp.uruguayType&&!comp.colombiaDivision&&!comp.chileDivision&&!comp.peruDivision&&!comp.ecuadorDivision&&!comp.paraguayDivision&&!comp.venezuelaDivision&&!comp.boliviaDivision).map(comp=>'<button class="competition-open" data-open-competition="'+season.id+'|'+comp.id+'"><span><strong>'+esc(comp.name)+'</strong><small>'+comp.participants.length+' participantes · Formato: '+esc(comp.format)+'</small></span><span class="competition-open-action">Abrir competição →</span></button>').join('');
   return html||'<div class="empty">Nenhuma competição cadastrada.</div>';
  }
  const countrySections=countries.map(country=>{
   const available=[...seasons].filter(s=>s.competitions.some(c=>(c.country||'Brasil')===country)).sort((a,b)=>b.year-a.year),current=available[0]||null;
   const blockers=countrySeasonBlockers(country,current),canAdvance=blockers.length===0;
   const history='<label class="season-history-select"><span>Temporada</span><select data-country-season="'+esc(country)+'">'+available.map(s=>'<option value="'+s.id+'" '+(s.id===current?.id?'selected':'')+'>'+s.year+(s.id===current?.id?' · atual':'')+'</option>').join('')+'</select></label>';
   const actions='<div class="country-heading-actions"><span class="tag">'+available.reduce((n,s)=>n+s.competitions.filter(c=>(c.country||'Brasil')===country).length,0)+' COMPETIÇÕES</span>'+(current?.countryAdvancements?.[country]?'<button class="btn country-advance" disabled>Temporada seguinte já criada</button>':'<button class="btn country-advance" data-advance-country="'+esc(country)+'" data-source-season="'+(current?.id||'')+'" '+(canAdvance?'':'disabled title="Conclua todas as competições e fases deste país para liberar o avanço."')+'>Avançar para temporada seguinte →</button>')+'</div>';
   const pending=canAdvance?'':'<p class="muted country-advance-reason">Pendente: '+blockers.map(esc).join(' · ')+'</p>';
   return '<section class="country-group"><button class="country-toggle" type="button" aria-expanded="false" data-country-toggle><span>'+esc(country)+'</span><span class="country-toggle-icon">＋</span></button><div class="country-content" hidden><div class="country-tools">'+history+actions+'</div>'+pending+'<div class="country-competitions">'+countryBody(country,current)+'</div></div></section>';
  }).join('');
  const libertadoresEntries=continent==='América do Sul'?seasons.flatMap(season=>season.competitions.filter(comp=>comp.libertadoresCompetition).map(comp=>({season,comp}))).sort((a,b)=>b.season.year-a.season.year):[];
  const continentalHtml=continent==='América do Sul'?'<section class="country-group"><div class="country-heading"><div><h2>Competições continentais</h2><p class="muted">Torneios que reúnem clubes de diferentes países da América do Sul.</p></div></div><button class="competition-open" data-open-libertadores-hub><span><strong>CONMEBOL Libertadores</strong><small>Vagas da próxima edição · classificação nacional · edições e campeões</small></span><span class="competition-open-action">Abrir competição →</span></button><button class="competition-open" data-open-sudamericana-hub><span><strong>CONMEBOL Sudamericana</strong><small>Vagas da próxima edição · fase preliminar · edições e campeões</small></span><span class="competition-open-action">Abrir competição →</span></button>'+libertadoresEntries.map(({season,comp})=>'<button class="competition-open" data-open-competition="'+season.id+'|'+comp.id+'"><span><strong>CONMEBOL Libertadores · '+season.year+'</strong><small>'+comp.participants.length+' participantes · '+esc(libertadoresStageLabel(comp.libertadoresStage))+'</small></span><span class="competition-open-action">Abrir edição →</span></button>').join('')+seasons.flatMap(season=>season.competitions.filter(comp=>comp.sudamericanaCompetition).map(comp=>'<button class="competition-open" data-open-competition="'+season.id+'|'+comp.id+'"><span><strong>CONMEBOL Sudamericana · '+season.year+'</strong><small>'+comp.participants.length+' classificados · '+esc(sudamericanaStageName(comp.sudamericanaStage))+'</small></span><span class="competition-open-action">Abrir edição →</span></button>')).join('')+'</section>':'';
  view.innerHTML='<div class="panel"><div class="panel-head"><h3>Países · '+esc(continent)+'</h3><span class="tag">'+countries.length+' PAÍS(ES)</span></div><p class="muted">Selecione um país para visualizar seus campeonatos e escolher a temporada.</p>'+continentalHtml+(countrySections||'<div class="empty">Ainda não há países cadastrados neste continente.</div>')+'</div>';
  view.querySelectorAll('[data-country-toggle]').forEach(button=>button.addEventListener('click',()=>{const section=button.closest('.country-group'),body=section.querySelector('.country-content'),open=body.hidden;body.hidden=!open;button.setAttribute('aria-expanded',String(open));button.querySelector('.country-toggle-icon').textContent=open?'−':'＋';}));
  view.querySelectorAll('[data-country-season]').forEach(select=>select.addEventListener('change',()=>{
   const season=seasons.find(s=>s.id===select.value);if(!season)return;
   const section=select.closest('.country-group'),country=select.dataset.countrySeason;
   section.querySelector('.country-competitions').innerHTML=countryBody(country,season);
   const blockers=countrySeasonBlockers(country,season),advance=section.querySelector('[data-advance-country]');
   section.querySelector('.country-advance-reason')?.remove();
   if(blockers.length){const p=document.createElement('p');p.className='muted country-advance-reason';p.textContent='Pendente: '+blockers.join(' · ');section.querySelector('.country-tools').after(p);}
   if(advance){advance.dataset.sourceSeason=season.id;advance.disabled=!!season.countryAdvancements?.[country]||blockers.length>0;advance.textContent=season.countryAdvancements?.[country]?'Temporada seguinte já criada':'Avançar para temporada seguinte →';}
   section.querySelectorAll('[data-open-competition]').forEach(b=>b.addEventListener('click',()=>{const [seasonId,competitionId]=b.dataset.openCompetition.split('|');renderCompetitionDetail(seasonId,competitionId);}));
  }));
  view.querySelectorAll('[data-open-competition]').forEach(b=>b.addEventListener('click',()=>{const [seasonId,competitionId]=b.dataset.openCompetition.split('|');renderCompetitionDetail(seasonId,competitionId);}));
  view.querySelector('[data-open-libertadores-hub]')?.addEventListener('click',()=>renderLibertadoresHub());
  view.querySelector('[data-open-sudamericana-hub]')?.addEventListener('click',()=>renderSudamericanaHub());
  view.querySelectorAll('[data-advance-country]').forEach(b=>b.addEventListener('click',()=>advanceCountrySeason(b.dataset.advanceCountry,b.dataset.sourceSeason)));
}
function buildArgentinaSchedule(competition){
 const zoneA=[...(competition.zones?.A||[])],zoneB=[...(competition.zones?.B||[])];
 if(competition.argentinaType==='primera'){
  const makeRounds=ids=>{
   const teams=[...ids],n=teams.length,rounds=[];
   for(let r=0;r<n;r++){
    const arr=[...teams],matches=[];
    for(let i=0;i<Math.floor(n/2);i++){
     const x=arr[i],y=arr[n-1-i];
     if(x&&y)matches.push({home:(r+i)%2===0?x:y,away:(r+i)%2===0?y:x,homeGoals:null,awayGoals:null,kind:'zonal'});
    }
    const bye=arr[n-1];rounds.push({matches,bye});teams.splice(1,0,teams.pop());
   }
   return rounds;
  };
  const a=makeRounds(zoneA),b=makeRounds(zoneB),rounds=[],pairs=competition.classicPairs||[];
  for(let i=0;i<15;i++){
   const pair=pairs[i]||[],aBye=zoneA.includes(pair[0])?pair[0]:pair[1],bBye=zoneB.includes(pair[0])?pair[0]:pair[1];
   const roundA=a.find(r=>r.bye===aBye)||a[i],roundB=b.find(r=>r.bye===bBye)||b[i];
   const cross=[{home:pair[0]||roundA.bye,away:pair[1]||roundB.bye,homeGoals:null,awayGoals:null,kind:'interzonal'}];
   rounds.push({number:i+1,matches:[...roundA.matches,...roundB.matches,...cross]});
  }
  rounds.push({number:16,matches:pairs.map(p=>({home:p[0],away:p[1],homeGoals:null,awayGoals:null,kind:'interzonal'}))});
  if(competition.phase==='Clausura')rounds.forEach(r=>r.matches.forEach(m=>{const home=m.home;m.home=m.away;m.away=home;}));
  competition.rounds=rounds;
 }else{
  const makeDouble=ids=>{
   const teams=[...ids],n=teams.length,first=[];
   for(let r=0;r<n-1;r++){
    const matches=[];
    for(let i=0;i<n/2;i++){const x=teams[i],y=teams[n-1-i];matches.push({home:(r+i)%2===0?x:y,away:(r+i)%2===0?y:x,homeGoals:null,awayGoals:null,kind:'zonal'});}
    first.push(matches);teams.splice(1,0,teams.pop());
   }
   return first;
  };
  const a=makeDouble(zoneA),b=makeDouble(zoneB),rounds=[];
  for(let i=0;i<17;i++)rounds.push({number:i+1,matches:[...a[i],...b[i]]});
  for(let i=0;i<17;i++)rounds.push({number:i+18,matches:[...a[i].map(m=>({home:m.away,away:m.home,homeGoals:null,awayGoals:null,kind:'zonal'})),...b[i].map(m=>({home:m.away,away:m.home,homeGoals:null,awayGoals:null,kind:'zonal'}))]});
  const pairs=competition.classicPairs||[];
  rounds.push({number:35,matches:pairs.map(p=>({home:p[0],away:p[1],homeGoals:null,awayGoals:null,kind:'interzonal'}))});
  rounds.push({number:36,matches:pairs.map(p=>({home:p[1],away:p[0],homeGoals:null,awayGoals:null,kind:'interzonal'}))});
  competition.rounds=rounds;
 }
}
function argentinaSeasonFirstDivisionStats(year){
 const season=seasons.find(s=>s.year===year);
 const competitions=(season?.competitions||[]).filter(c=>c.country==='Argentina'&&c.argentinaType==='primera');
 const stats=new Map();
 competitions.forEach(competition=>(competition.rounds||[]).forEach(round=>round.matches.forEach(match=>{
  if(match.homeGoals===null||match.awayGoals===null)return;
  [[match.home,match.homeGoals,match.awayGoals],[match.away,match.awayGoals,match.homeGoals]].forEach(([id,goalsFor,goalsAgainst])=>{
   if(!stats.has(id))stats.set(id,{id,points:0,played:0,wins:0,draws:0,losses:0,gf:0,ga:0});
   const row=stats.get(id);row.played++;row.gf+=goalsFor;row.ga+=goalsAgainst;
   if(goalsFor>goalsAgainst){row.wins++;row.points+=3;}
   else if(goalsFor<goalsAgainst)row.losses++;
   else{row.draws++;row.points++;}
  });
 })));
 return stats;
}
function argentinaPromediosTable(year){
 const current=seasons.find(s=>s.year===year);
 const primera=(current?.competitions||[]).find(c=>c.country==='Argentina'&&c.argentinaType==='primera');
 if(!primera)return {years:[],rows:[]};
 const years=seasons.filter(s=>s.year<=year&&s.competitions.some(c=>c.country==='Argentina'&&c.argentinaType==='primera')).map(s=>s.year).sort((a,b)=>a-b).slice(-3);
 const totals=new Map(primera.participants.map(id=>[id,{id,points:0,played:0}]));
 years.forEach(y=>argentinaSeasonFirstDivisionStats(y).forEach((stats,id)=>{
  const row=totals.get(id);if(row){row.points+=stats.points;row.played+=stats.played;}
 }));
 const rows=[...totals.values()].map(row=>({...row,average:row.played?row.points/row.played:null}));
 rows.sort((a,b)=>(a.average??Infinity)-(b.average??Infinity)||a.points-b.points||a.id.localeCompare(b.id));
 return {years,rows};
}
function uruguayFirstDivisionCompetitions(year){
 const s=seasons.find(x=>x.year===year);return (s?.competitions||[]).filter(c=>c.country==='Uruguai'&&['primera-apertura','intermedio','primera-clausura'].includes(c.uruguayType));
}
function uruguayAnnualTable(year){
 const comps=uruguayFirstDivisionCompetitions(year),base=comps.find(c=>c.uruguayType==='primera-apertura');
 const totals=new Map((base?.participants||[]).map(id=>[id,{id,points:0,played:0,wins:0,draws:0,losses:0,gf:0,ga:0}]));
 comps.forEach(c=>(c.rounds||[]).forEach(r=>r.matches.forEach(m=>{
  if(m.homeGoals===null||m.awayGoals===null)return;
  [[m.home,m.homeGoals,m.awayGoals],[m.away,m.awayGoals,m.homeGoals]].forEach(([id,gf,ga])=>{
   const row=totals.get(id);if(!row)return;row.played++;row.gf+=gf;row.ga+=ga;
   if(gf>ga){row.wins++;row.points+=3;}else if(gf<ga)row.losses++;else{row.draws++;row.points++;}
  });
 })));
 return [...totals.values()].sort((a,b)=>b.points-a.points||(b.gf-b.ga)-(a.gf-a.ga)||b.gf-a.gf||getClub(a.id).name.localeCompare(getClub(b.id).name,'pt-BR'));
}
function uruguayPromediosTable(year){
 const current=seasons.find(s=>s.year===year),base=uruguayFirstDivisionCompetitions(year).find(c=>c.uruguayType==='primera-apertura');
 const years=seasons.filter(s=>s.year<=year&&uruguayFirstDivisionCompetitions(s.year).length).map(s=>s.year).sort((a,b)=>b-a).slice(0,2);
 const rows=new Map((base?.participants||[]).map(id=>[id,{id,points:0,played:0}]));
 years.forEach(y=>uruguayAnnualTable(y).forEach(r=>{const x=rows.get(r.id);if(x){x.points+=r.points;x.played+=r.played;}}));
 const result=[...rows.values()].map(r=>({...r,average:r.played?r.points/r.played:null}));
 result.sort((a,b)=>(a.average??Infinity)-(b.average??Infinity)||a.points-b.points||a.id.localeCompare(b.id));
 return {years,rows:result};
}
function uruguayRelegationDecision(year){
 const table=uruguayPromediosTable(year),eligible=table.rows.filter(r=>r.played>0);
 return {ready:eligible.length>=3,years:table.years,rows:table.rows,relegated:eligible.slice(0,3).map(r=>r.id)};
}
function uruguayCreateSingleMatch(home,away,name){return {name,home,away,homeGoals:null,awayGoals:null,penaltyWinner:null};}
function uruguayZoneStandings(competition,zone){
 const ids=competition.zones?.[zone]||[];
 const matches=(competition.rounds||[]).flatMap(r=>r.matches).filter(m=>ids.includes(m.home)&&ids.includes(m.away));
 return getStandings({...competition,participants:ids,rounds:[{number:1,matches}]});
}
function uruguayCreateIntermedioFinal(competition){
 if(!competition||competition.uruguayType!=='intermedio')return false;
 const rounds=competition.rounds||[];
 if(!rounds.length||!rounds.every(r=>r.matches.length&&r.matches.every(m=>m.homeGoals!==null&&m.awayGoals!==null)))return false;
 const a=uruguayZoneStandings(competition,'A'),b=uruguayZoneStandings(competition,'B');
 if(!a[0]||!b[0]||a[0].played===0||b[0].played===0)return false;
 competition.uruguayIntermedioFinal={match:uruguayCreateSingleMatch(a[0].id,b[0].id,'Final do Torneo Intermedio'),champion:null,completed:false};
 return true;
}
function uruguayAdvanceIntermedioFinal(competition){
 const p=competition?.uruguayIntermedioFinal;if(!p||!p.match)return;
 const winner=uruguayMatchWinner(p.match);
 if(winner){p.champion=winner;p.completed=true;}
}

function uruguayCreateCompetenciaFinal(competition){if(!competition||competition.uruguayType!=='competencia')return false;const rounds=competition.rounds||[];if(!rounds.length||!rounds.every(r=>r.matches.length&&r.matches.every(m=>m.homeGoals!==null&&m.awayGoals!==null)))return false;const a=uruguayZoneStandings(competition,'A'),b=uruguayZoneStandings(competition,'B');if(!a[0]||!b[0]||!a[0].played||!b[0].played)return false;competition.uruguayCompetenciaFinal={match:uruguayCreateSingleMatch(a[0].id,b[0].id,'Final do Torneo Competencia'),champion:null,completed:false};return true;}
function uruguayAdvanceCompetenciaFinal(competition){const p=competition?.uruguayCompetenciaFinal;if(!p)return;const winner=uruguayMatchWinner(p.match);if(winner){p.champion=winner;p.completed=true;}}
function uruguayMatchWinner(m){
 if(!m||m.homeGoals===null||m.awayGoals===null)return null;
 if(m.homeGoals!==m.awayGoals)return m.homeGoals>m.awayGoals?m.home:m.away;
 return m.penaltyWinner||null;
}
function uruguayCreatePrimeraFinal(year){
 const comps=uruguayFirstDivisionCompetitions(year),ap=comps.find(c=>c.uruguayType==='primera-apertura'),cl=comps.find(c=>c.uruguayType==='primera-clausura');
 const inter=comps.find(c=>c.uruguayType==='intermedio');
 const done=c=>(c?.rounds||[]).length>0&&c.rounds.every(r=>r.matches.length&&r.matches.every(m=>m.homeGoals!==null&&m.awayGoals!==null));
 if(!ap||!cl||!inter||![ap,cl,inter].every(done))return false;
 const champ=(c)=>getStandings(c)[0]?.id,apChamp=champ(ap),clChamp=champ(cl),annual=uruguayAnnualTable(year),leader=annual[0]?.id;
 if(!apChamp||!clChamp||!leader)return false;
 let semifinal=null,final=null;
 if(leader===apChamp||leader===clChamp){
  const other=leader===apChamp?clChamp:apChamp;
  final=uruguayCreateSingleMatch(leader,other,'Final do Campeonato Uruguaio');
 }else{
  semifinal=uruguayCreateSingleMatch(apChamp,clChamp,'Semifinal · campeão do Apertura × campeão do Clausura');
  final=null;
 }
 cl.uruguayChampionship={year,apChamp,clChamp,annualLeader:leader,semifinal,final,completed:false,awaitingFinal:!!semifinal};
 return true;
}
function uruguayAdvancePrimeraFinal(competition){
 const p=competition.uruguayChampionship;if(!p)return;
 if(p.semifinal&&uruguayMatchWinner(p.semifinal)&&!p.final){const winner=uruguayMatchWinner(p.semifinal);p.final=uruguayCreateSingleMatch(p.annualLeader,winner,'Final · líder anual × vencedor da semifinal');p.awaitingFinal=false;return;}
 if(p.final&&uruguayMatchWinner(p.final)){p.champion=uruguayMatchWinner(p.final);p.completed=true;}
}
function uruguaySimulateMatch(m){
 if(!m||m.homeGoals!==null)return;simulateMatch(m);
 if(m.homeGoals===m.awayGoals)m.penaltyWinner=Math.random()<.5?m.home:m.away;
}
function uruguayCreateAccessPlayoffs(competition){
 const s=getStandings(competition);if(s.length<6)return false;
 const tie=(a,b,name)=>({name,teamA:a,teamB:b,legs:[{home:b,away:a,homeGoals:null,awayGoals:null},{home:a,away:b,homeGoals:null,awayGoals:null}],penaltyWinner:null});
 competition.uruguayAccess={promotedDirect:[s[0].id,s[1].id],seedTable:s.slice(0,6).map(r=>r.id),semifinals:[tie(s[2].id,s[5].id,'Semifinal 1 · 3º ('+getClub(s[2].id).name+') × 6º ('+getClub(s[5].id).name+')'),tie(s[3].id,s[4].id,'Semifinal 2 · 4º ('+getClub(s[3].id).name+') × 5º ('+getClub(s[4].id).name+')')],final:null,completed:false,promotedThird:null};
 return true;
}
function uruguayEnsureAccessPlayoffs(competition){
 const p=competition?.uruguayAccess;if(!p)return false;
 const s=getStandings(competition);if(s.length<6)return false;
 const ids=s.slice(0,6).map(r=>r.id),same=(a,b)=>Array.isArray(a)&&a.length===b.length&&a.every((id,i)=>id===b[i]);
 const expected=[
  [ids[2],ids[5]],
  [ids[3],ids[4]]
 ];
 const tieValid=(tie,pair)=>!!tie&&tie.teamA===pair[0]&&tie.teamB===pair[1]&&Array.isArray(tie.legs)&&tie.legs.length===2&&tie.legs[0].home===pair[1]&&tie.legs[0].away===pair[0]&&tie.legs[1].home===pair[0]&&tie.legs[1].away===pair[1];
 const valid=same(p.promotedDirect,ids.slice(0,2))&&same(p.seedTable,ids)&&Array.isArray(p.semifinals)&&p.semifinals.length===2&&tieValid(p.semifinals[0],expected[0])&&tieValid(p.semifinals[1],expected[1]);
 if(valid)return false;
 // O chaveamento antigo não corresponde à classificação atual: recria somente o playoff.
 return uruguayCreateAccessPlayoffs(competition);
}
function uruguayAccessWinner(t){
 if(!t||t.legs.some(m=>m.homeGoals===null||m.awayGoals===null))return null;
 const a=t.teamA,b=t.teamB;let x=0,y=0;t.legs.forEach(m=>{if(m.home===a){x+=m.homeGoals;y+=m.awayGoals;}else{y+=m.homeGoals;x+=m.awayGoals;}});
 return x>y?a:y>x?b:t.penaltyWinner||null;
}
function uruguaySimulateAccessStage(c){
 const p=c.uruguayAccess;if(!p||p.completed)return;
 const current=p.final?[p.final]:p.semifinals;
 const leg=current.some(t=>t.legs[0].homeGoals===null)?0:1;
 current.forEach(t=>{const m=t.legs[leg];if(m.homeGoals===null){simulateMatch(m);if(leg===1){let a=0,b=0;t.legs.forEach(x=>{if(x.home===t.teamA){a+=x.homeGoals;b+=x.awayGoals;}else{b+=x.homeGoals;a+=x.awayGoals;}});if(a===b)t.penaltyWinner=Math.random()<.5?t.teamA:t.teamB;}}});
 if(!p.final&&p.semifinals.every(t=>uruguayAccessWinner(t))){const winners=p.semifinals.map(uruguayAccessWinner);p.final={name:'Final do playoff · 3º acesso',teamA:winners[0],teamB:winners[1],legs:[{home:winners[1],away:winners[0],homeGoals:null,awayGoals:null},{home:winners[0],away:winners[1],homeGoals:null,awayGoals:null}],penaltyWinner:null};}
 if(p.final&&uruguayAccessWinner(p.final)){p.promotedThird=uruguayAccessWinner(p.final);p.completed=true;}
}
function argentinaAnnualTable(year){
 const season=seasons.find(s=>s.year===year);
 const primera=(season?.competitions||[]).filter(c=>c.country==='Argentina'&&c.argentinaType==='primera');
 const totals=new Map();
 primera.forEach(competition=>(competition.rounds||[]).forEach(round=>round.matches.forEach(match=>{
  if(match.homeGoals===null||match.awayGoals===null)return;
  [[match.home,match.homeGoals,match.awayGoals],[match.away,match.awayGoals,match.homeGoals]].forEach(([id,gf,ga])=>{
   if(!totals.has(id))totals.set(id,{id,points:0,played:0,wins:0,draws:0,losses:0,gf:0,ga:0});
   const row=totals.get(id);row.played++;row.gf+=gf;row.ga+=ga;
   if(gf>ga){row.wins++;row.points+=3;}else if(gf<ga)row.losses++;else{row.draws++;row.points++;}
  });
 })));
 const participants=primera[0]?.participants||[];
 return participants.map(id=>totals.get(id)||{id,points:0,played:0,wins:0,draws:0,losses:0,gf:0,ga:0}).sort((a,b)=>b.points-a.points||(b.gf-b.ga)-(a.gf-a.ga)||b.gf-a.gf||getClub(a.id).name.localeCompare(getClub(b.id).name,'pt-BR'));
}
function argentinaRelegationDecision(year){
 const promedio=argentinaPromediosTable(year).rows.filter(row=>row.played>0);
 const annual=argentinaAnnualTable(year);
 if(promedio.length<2||annual.length<2)return {ready:false,reason:'Ainda não há partidas suficientes para calcular os dois rebaixamentos.'};
 const lowestAverage=promedio[0],averageTied=promedio.filter(row=>Math.abs(row.average-lowestAverage.average)<1e-9);
 if(averageTied.length>1)return {ready:false,reason:'Há empate no último lugar dos promedios; é necessário disputar o desempate previsto no regulamento.',tie:'promedios',tied:averageTied.map(row=>row.id)};
 const annualBottom=annual[annual.length-1];
 const annualTied=annual.filter(row=>row.points===annualBottom.points);
 const annualGoalDifference=annualBottom.gf-annualBottom.ga;
 const samePointsAndGoalDifference=annualTied.filter(row=>(row.gf-row.ga)===annualGoalDifference);
 const annualRelegated=annualBottom.id===lowestAverage.id?annual[annual.length-2]:annualBottom;
 return {ready:true,relegated:[lowestAverage.id,annualRelegated.id],promedios:lowestAverage.id,annual:annualRelegated.id,average:lowestAverage.average,years:argentinaPromediosTable(year).years,annualTiebreak:annualTied.length>1?{criterion:samePointsAndGoalDifference.length>1?'saldo de gols e gols marcados':'saldo de gols',tied:annualTied.map(row=>row.id),goalDifference:annualGoalDifference}:null};
}
function repairArgentinaAdvancedGroups(){
 let changed=false;
 seasons.filter(s=>s.countryAdvancements?.Argentina).forEach(source=>{
  const nextYear=source.countryAdvancements.Argentina;
  const target=seasons.find(s=>s.year===nextYear);
  if(!target)return;
  const sourceFirst=source.competitions.find(c=>c.argentinaType==='primera');
  const sourceSecond=source.competitions.find(c=>c.argentinaType==='nacional');
  const targetFirst=target.competitions.find(c=>c.argentinaType==='primera');
  const targetSecond=target.competitions.find(c=>c.argentinaType==='nacional');
  if(!sourceFirst||!sourceSecond||!targetFirst||!targetSecond)return;
  const decision=argentinaRelegationDecision(source.year);
  const promoted=[sourceSecond.argentinaPlayoffs?.promotedDirect,sourceSecond.argentinaPlayoffs?.promotedReduced].filter(Boolean);
  if(!decision.ready||promoted.length!==2)return;
  const same=(a,b)=>JSON.stringify(a||{})===JSON.stringify(b||{});
  if(!same(targetFirst.zones,sourceFirst.zones)||!same(targetSecond.zones,sourceSecond.zones))return;
  const replace=(competition,outgoing,incoming)=>{
   const zones={A:[...(competition.zones?.A||[])],B:[...(competition.zones?.B||[])]};
   outgoing.forEach((id,index)=>{
    let key=Object.keys(zones).find(k=>zones[k].includes(id));
    if(!key)key=zones.A.length<=zones.B.length?'A':'B';
    const pos=zones[key].indexOf(id);
    if(pos>=0)zones[key][pos]=incoming[index];else zones[key].push(incoming[index]);
   });
   return zones;
  };
  const firstZones=replace(sourceFirst,decision.relegated,promoted);
  const secondZones=replace(sourceSecond,promoted,decision.relegated);
  target.competitions.filter(c=>c.argentinaType==='primera').forEach(comp=>{comp.zones={A:[...firstZones.A],B:[...firstZones.B]};comp.participants=[...firstZones.A,...firstZones.B];});
  targetSecond.zones=secondZones;
  targetSecond.participants=[...secondZones.A,...secondZones.B];
  changed=true;
 });
 if(changed)save();
}
function argentinaZoneStandings(competition,zone){
 const ids=competition.zones?.[zone]||[];
 const rows=ids.map(id=>({id,club:getClub(id),points:0,played:0,wins:0,draws:0,losses:0,gf:0,ga:0}));
 const map=new Map(rows.map(r=>[r.id,r]));
 (competition.rounds||[]).forEach(r=>r.matches.forEach(m=>{
  if(m.homeGoals===null||m.awayGoals===null)return;
  const h=map.get(m.home),a=map.get(m.away);
  if(h){h.played++;h.gf+=m.homeGoals;h.ga+=m.awayGoals;}
  if(a){a.played++;a.gf+=m.awayGoals;a.ga+=m.homeGoals;}
  if(m.homeGoals>m.awayGoals){if(h){h.wins++;h.points+=3;}if(a)a.losses++;}else if(m.homeGoals<m.awayGoals){if(a){a.wins++;a.points+=3;}if(h)h.losses++;}else{if(h){h.draws++;h.points++;}if(a){a.draws++;a.points++;}}
 }));
 return rows.sort((a,b)=>b.points-a.points||(b.gf-b.ga)-(a.gf-a.ga)||b.gf-a.gf||a.club.name.localeCompare(b.club.name,'pt-BR'));
}

function argentinaMatchWinner(tie){
 const m=tie.match;if(!m||m.homeGoals===null||m.awayGoals===null)return null;
 if(m.homeGoals>m.awayGoals)return tie.home;
 if(m.awayGoals>m.homeGoals)return tie.away;
 return tie.penaltyWinner||null;
}
function argentinaCreateSingleTie(home,away,name){
 return {name,home,away,match:{home,away,homeGoals:null,awayGoals:null},penaltyWinner:null,extraTimeGoals:null};
}
function argentinaCreateTwoLegTie(homeSeed,awaySeed,name){
 return {name,home:homeSeed,away:awaySeed,legs:[{home:awaySeed,away:homeSeed,homeGoals:null,awayGoals:null},{home:homeSeed,away:awaySeed,homeGoals:null,awayGoals:null}],penaltyWinner:null};
}
function argentinaAggregate(tie){
 let a=0,b=0;tie.legs.forEach(m=>{if(m.homeGoals===null||m.awayGoals===null)return;if(m.home===tie.home){a+=m.homeGoals;b+=m.awayGoals;}else{b+=m.homeGoals;a+=m.awayGoals;}});return {a,b};
}
function argentinaTieWinner(tie){
 if(tie.legs){if(tie.legs.some(m=>m.homeGoals===null||m.awayGoals===null))return null;const score=argentinaAggregate(tie);if(score.a>score.b)return tie.home;if(score.b>score.a)return tie.away;return tie.penaltyWinner||null;}
 return argentinaMatchWinner(tie);
}
function argentinaSimulateTie(tie){
 if(tie.legs){
  const idx=tie.legs.findIndex(m=>m.homeGoals===null||m.awayGoals===null);if(idx<0)return;
  const match=tie.legs[idx];simulateMatch(match);
  if(idx===1){const score=argentinaAggregate(tie);if(score.a===score.b)tie.penaltyWinner=Math.random()<.5?tie.home:tie.away;}
 }else if(tie.match.homeGoals===null){
  simulateMatch(tie.match);
  if(tie.match.homeGoals===tie.match.awayGoals){
   tie.extraTimeGoals={home:randomInt(0,1),away:randomInt(0,1)};
   if(tie.extraTimeGoals.home!==tie.extraTimeGoals.away){
    tie.penaltyWinner=tie.extraTimeGoals.home>tie.extraTimeGoals.away?tie.home:tie.away;tie.decision='prorrogação';
   }else{tie.penaltyWinner=Math.random()<.5?tie.home:tie.away;tie.decision='pênaltis';}
  }
 }
}
function argentinaRoundComplete(round){return round.ties.every(t=>!!argentinaTieWinner(t));}
function argentinaBuildPrimeraPlayoffs(competition){
 const a=argentinaZoneStandings(competition,'A'),b=argentinaZoneStandings(competition,'B');
 if(a.length<8||b.length<8||a.slice(0,8).some(r=>r.played===0)||b.slice(0,8).some(r=>r.played===0))return false;
 const ties=[];
 for(let i=0;i<8;i++){const x=a[i],y=b[7-i],home=x.id,away=y.id;ties.push(argentinaCreateSingleTie(home,away,'Oitavas · '+(i+1)));}
 competition.argentinaPlayoffs={kind:'primera',rounds:[{name:'Oitavas de final',ties}],completed:false,champion:null};
 return true;
}
function argentinaAdvancePrimeraRound(competition){
 const p=competition.argentinaPlayoffs;if(!p||p.completed)return false;
 const current=p.rounds[p.rounds.length-1];if(!argentinaRoundComplete(current))return false;
 const winners=current.ties.map(argentinaTieWinner);
 if(winners.length===1){p.champion=winners[0];p.completed=true;p.awaitingNext=false;return true;}
 p.awaitingNext=true;
 return true;
}
function argentinaGenerateNextPrimeraRound(competition){
 const p=competition.argentinaPlayoffs;if(!p||p.kind!=='primera'||!p.awaitingNext||p.completed)return false;
 const current=p.rounds[p.rounds.length-1];
 if(!argentinaRoundComplete(current))return false;
 const winners=current.ties.map(argentinaTieWinner);
 const names={8:'Quartas de final',4:'Semifinais',2:'Final'};
 const next=[];
 for(let i=0;i<winners.length;i+=2)next.push(argentinaCreateSingleTie(winners[i],winners[i+1],(names[winners.length]||'Próxima fase')+' · '+(i/2+1)));
 p.rounds.push({name:names[winners.length]||'Próxima fase',ties:next});
 p.awaitingNext=false;
 return true;
}
function argentinaNacionalCreatePlayoffs(competition){
 const zonaA=argentinaZoneStandings(competition,'A');
 const zonaB=argentinaZoneStandings(competition,'B');
 if(zonaA.length<8||zonaB.length<8||zonaA.some(r=>r.played===0)||zonaB.some(r=>r.played===0))return false;
 // Os líderes são definidos dinamicamente pela classificação atual de cada zona.
 const primeiroZonaA=zonaA[0].id;
 const primeiroZonaB=zonaB[0].id;
 const final=argentinaCreateSingleTie(primeiroZonaA,primeiroZonaB,'Final pelo 1º acesso · 1º da Zona A × 1º da Zona B');
 // Os 2º ao 8º de cada zona já têm seus sete jogos gerados junto com a final.
 const candidatos=[...zonaA.slice(1,8),...zonaB.slice(1,8)];
 const ordenados=[...candidatos].sort((x,y)=>y.points-x.points||(y.gf-y.ga)-(x.gf-x.ga)||y.gf-x.gf||x.id.localeCompare(y.id));
 const ties=[];
 for(let i=0;i<7;i++)ties.push(argentinaCreateSingleTie(ordenados[i].id,ordenados[13-i].id,'Primeira fase do Reducido · '+(i+1)));
 competition.argentinaPlayoffs={kind:'nacional',stage:'reducido-inicial',final,finalParticipants:{zonaA:primeiroZonaA,zonaB:primeiroZonaB},rounds:[{name:'Primeira fase do Reducido · 14 clubes',ties}],completed:false,promotedDirect:null,promotedReduced:null};
 return true;
}
function argentinaEnsureNacionalFinal(competition){
 const p=competition.argentinaPlayoffs;
 if(!p||p.kind!=='nacional'||!p.final)return;
 const zonaA=argentinaZoneStandings(competition,'A'),zonaB=argentinaZoneStandings(competition,'B');
 if(!zonaA.length||!zonaB.length)return;
 const primeiroZonaA=zonaA[0].id,primeiroZonaB=zonaB[0].id;
 const m=p.final.match;
 // Atualiza qualquer mata-mata salvo com participantes antigos, desde que a final ainda não tenha sido disputada.
 if(m&&m.homeGoals===null&&m.awayGoals===null&&(p.final.home!==primeiroZonaA||p.final.away!==primeiroZonaB)){
  p.final=argentinaCreateSingleTie(primeiroZonaA,primeiroZonaB,'Final pelo 1º acesso · 1º da Zona A × 1º da Zona B');
  p.finalParticipants={zonaA:primeiroZonaA,zonaB:primeiroZonaB};
 }
}
function argentinaBuildReducido(competition){
 const p=competition.argentinaPlayoffs;if(!p||!p.final||!argentinaMatchWinner(p.final))return false;
 const round=p.rounds[0];
 if(!round||round.ties.length!==7||!argentinaRoundComplete(round))return false;
 const direct=argentinaMatchWinner(p.final),loser=direct===p.final.home?p.final.away:p.final.home;
 p.promotedDirect=direct;p.finalLoser=loser;
 p.awaitingNext=true;
 return true;
}
function argentinaAdvanceNacionalRound(competition){
 const p=competition.argentinaPlayoffs;if(!p)return false;
 const current=p.rounds[p.rounds.length-1];if(!current||!argentinaRoundComplete(current))return false;
 const winners=current.ties.map(argentinaTieWinner);
 if(p.stage==='reducido-final'&&winners.length===1){p.promotedReduced=winners[0];p.completed=true;p.stage='concluido';p.awaitingNext=false;return true;}
 p.awaitingNext=true;
 return true;
}
function argentinaGenerateNextNacionalRound(competition){
 const p=competition.argentinaPlayoffs;if(!p||p.kind!=='nacional'||!p.awaitingNext||p.completed)return false;
 const current=p.rounds[p.rounds.length-1];if(!current||!argentinaRoundComplete(current))return false;
 const winners=current.ties.map(argentinaTieWinner);
 if(p.stage==='reducido-inicial'){
  const entrants=[p.finalLoser,...winners];
  p.rounds.push({name:'Segunda fase do Reducido · 8 clubes',ties:Array.from({length:4},(_,i)=>argentinaCreateSingleTie(entrants[i],entrants[7-i],'Segunda fase · '+(i+1)))});
  p.stage='reducido-quartas';
 }else if(p.stage==='reducido-quartas'){
  p.rounds.push({name:'Semifinais do Reducido',ties:[argentinaCreateTwoLegTie(winners[0],winners[1],'Semifinal 1'),argentinaCreateTwoLegTie(winners[2],winners[3],'Semifinal 2')]});
  p.stage='reducido-semis';
 }else if(p.stage==='reducido-semis'){
  p.rounds.push({name:'Final do Reducido',ties:[argentinaCreateTwoLegTie(winners[0],winners[1],'Final')]});
  p.stage='reducido-final';
 }else return false;
 p.awaitingNext=false;
 return true;
}
function argentinaRenderPlayoffs(competition){
 if(competition.argentinaType==='nacional')argentinaEnsureNacionalFinal(competition);
 const p=competition.argentinaPlayoffs;if(!p)return '';
 const renderTie=t=>{
  const winner=argentinaTieWinner(t);
  if(t.legs){const score=argentinaAggregate(t);return '<div class="playoff-tie"><div class="round-title"><strong>'+esc(t.name)+'</strong><span class="tag">'+(winner?'Concluído':'Em disputa')+'</span></div>'+t.legs.map((m,i)=>'<div class="fixture"><span class="fixture-team">'+clubLink(getClub(m.home),getClub(m.home).name)+'</span><strong class="score">'+(m.homeGoals===null?'—':m.homeGoals+' × '+m.awayGoals)+'</strong><span class="fixture-team away">'+clubLink(getClub(m.away),getClub(m.away).name)+'</span><small class="leg-label">'+(i?'Volta':'Ida')+'</small></div>').join('')+'<div class="aggregate-line">Agregado: <strong>'+score.a+' × '+score.b+'</strong>'+(t.penaltyWinner?' · Decidido nos pênaltis':'')+(winner?' · '+esc(getClub(winner).name).toUpperCase():'')+'</div></div>';}
  const m=t.match;return '<div class="playoff-tie"><div class="round-title"><strong>'+esc(t.name)+'</strong><span class="tag">'+(winner?'Concluído':'Em disputa')+'</span></div><div class="fixture"><span class="fixture-team">'+clubLink(getClub(m.home),getClub(m.home).name)+'</span><strong class="score">'+(m.homeGoals===null?'—':m.homeGoals+' × '+m.awayGoals)+'</strong><span class="fixture-team away">'+clubLink(getClub(m.away),getClub(m.away).name)+'</span></div>'+(t.extraTimeGoals?'<p class="muted">Prorrogação: '+t.extraTimeGoals.home+' × '+t.extraTimeGoals.away+(t.penaltyWinner?' · '+(t.decision==='prorrogação'?'Prorrogação vencida por ':'Pênaltis vencidos por ')+esc(getClub(t.penaltyWinner).name):'')+'</p>':'')+(winner?'<p class="promoted-name">Classificado: '+esc(getClub(winner).name)+'</p>':'')+'</div>';
 };
 if(p.kind==='primera')return '<div class="playoff-panel"><h3>Mata-mata · '+esc(competition.phase)+'</h3><p class="muted">Oitavas, quartas, semifinais e final em jogo único. Melhor campanha tem mando; empate após a prorrogação vai aos pênaltis.</p>'+p.rounds.map(r=>'<h4 class="season-heading">'+esc(r.name)+'</h4>'+r.ties.map(renderTie).join('')).join('')+(p.completed?'<p class="access-confirmation">Campeão: '+esc(getClub(p.champion).name)+'</p>':p.awaitingNext?'<button class="btn" id="generate-next-argentina-round">Gerar Confrontos</button>':'<button class="btn" id="simulate-argentina-knockout">Simular '+esc(p.rounds[p.rounds.length-1].name)+'</button>')+'</div>';
 return '<div class="playoff-panel"><h3>Mata-mata · Primera Nacional</h3><p class="muted">Final pelo 1º acesso: campeões das duas zonas, em jogo único. O Reducido começa com os 2º ao 8º colocados de cada zona (14 clubes); na segunda fase, entram os sete vencedores da primeira fase mais o perdedor da final pelo 1º acesso.</p>'+renderTie(p.final)+'<p class="promoted-name">'+(p.promotedDirect?'Acesso direto: '+esc(getClub(p.promotedDirect).name):'')+'</p>'+p.rounds.map(r=>'<h4 class="season-heading">'+esc(r.name)+'</h4>'+r.ties.map(renderTie).join('')).join('')+(p.completed?'<p class="access-confirmation">Segundo acesso: '+esc(getClub(p.promotedReduced).name)+'</p>':p.awaitingNext?'<button class="btn" id="generate-next-argentina-round">Gerar Confrontos</button>':'<button class="btn" id="simulate-argentina-knockout">Simular '+esc(p.stage==='reducido-inicial'?'final pelo 1º acesso e primeira fase do Reducido':p.rounds[p.rounds.length-1]?.name||'mata-mata')+'</button>')+'</div>';
}
function argentinaSimulateKnockout(competition){
 if(competition.argentinaType==='nacional')argentinaEnsureNacionalFinal(competition);
 const p=competition.argentinaPlayoffs;if(!p||p.completed||p.awaitingNext)return;
 if(p.kind==='primera'){const round=p.rounds[p.rounds.length-1];round.ties.forEach(argentinaSimulateTie);argentinaAdvancePrimeraRound(competition);return;}
 if(p.stage==='reducido-inicial'){
  if(!argentinaMatchWinner(p.final))argentinaSimulateTie(p.final);
  const primeiraFase=p.rounds[0];primeiraFase.ties.forEach(argentinaSimulateTie);
  if(argentinaMatchWinner(p.final)&&argentinaRoundComplete(primeiraFase))argentinaBuildReducido(competition);
  return;
 }
 const round=p.rounds[p.rounds.length-1];round.ties.forEach(argentinaSimulateTie);argentinaAdvanceNacionalRound(competition);
}

function argentinaCompetitionDescription(c){
 if(c.argentinaType==='primera')return c.phase+' 2026: 2 grupos de 15; 14 jogos intrazonais, um interzonal por rodada e uma rodada interzonal adicional (16 datas). Os 8 primeiros de cada zona avançam às oitavas, em jogo único; depois quartas, semifinais e final. Empates no mata-mata: prorrogação e pênaltis.';
 return 'Primeira Nacional 2026: 2 zonas de 18, turno e returno (34 datas) mais 2 jogos interzonais (36 datas). Os campeões das zonas fazem final em jogo único pelo 1º acesso. O Reducido começa com os 2º–8º de cada zona (14 clubes) na primeira fase; na segunda fase entram os sete vencedores e o perdedor da final pelo 1º acesso. O campeão do Reducido conquista o 2º acesso. Caem os dois últimos de cada zona.';
}
function buildSchedule(competition){
 if(competition.sudamericanaCompetition){if(competition.sudamericanaStage==='groups'&&!(competition.rounds||[]).length)sudamericanaBuildGroupSchedule(competition);return;}
 if(competition.libertadoresCompetition){if(competition.libertadoresStage==='groups'&&!(competition.rounds||[]).length)libertadoresBuildGroupSchedule(competition);return;}
 if(competition.boliviaDivision==='Copa de la División Profesional'||competition.boliviaDivision==='Copa Simón Bolívar'){boliviaGroupSchedule(competition);return;}
 if(competition.argentinaType){buildArgentinaSchedule(competition);return;}if(competition.peruDivision){peruBuildSchedule(competition);return;}if(competition.venezuelaDivision==='Segunda División'){const a=venezuelaRoundRobin(competition.zones.A),b=venezuelaRoundRobin(competition.zones.B);competition.rounds=Array.from({length:Math.max(a.length,b.length)},(_,i)=>({number:i+1,matches:[...(a[i]||[]),...(b[i]||[])]}));competition.venezuelaStage='regional';return;}if(competition.venezuelaDivision==='Primera División'){competition.rounds=venezuelaRoundRobin(competition.participants).slice(0,13).map((matches,i)=>({number:i+1,matches}));competition.venezuelaStage='regular';return;}
 if(['intermedio','competencia'].includes(competition.uruguayType)&&competition.zones){const zoneRounds=ids=>{const teams=[...ids],out=[];for(let r=0;r<teams.length-1;r++){const matches=[];for(let i=0;i<teams.length/2;i++){const x=teams[i],y=teams[teams.length-1-i],home=(r+i)%2===0?x:y;matches.push({home,away:home===x?y:x,homeGoals:null,awayGoals:null});}out.push(matches);teams.splice(1,0,teams.pop());}return out;};const a=zoneRounds(competition.zones.A||[]),b=zoneRounds(competition.zones.B||[]);competition.rounds=Array.from({length:Math.max(a.length,b.length)},(_,i)=>({number:i+1,matches:[...(a[i]||[]),...(b[i]||[])]}));return;}
 const teams=[...competition.participants];if(teams.length<2)return null;
 if(teams.length%2)teams.push(null);
 const size=teams.length,half=size/2,first=[];
 for(let round=0;round<size-1;round++){
  const matches=[];
  for(let i=0;i<half;i++){const a=teams[i],b=teams[size-1-i];if(a&&b){const home=(round+i)%2===0?a:b,away=home===a?b:a;matches.push({home,away,homeGoals:null,awayGoals:null});}}
  first.push({number:round+1,matches});teams.splice(1,0,teams.pop());
 }
 competition.rounds=competition.singleRound?first:first.concat(first.map((r,i)=>({number:size-1+i+1,matches:r.matches.map(m=>({home:m.away,away:m.home,homeGoals:null,awayGoals:null}))})));
}
function simulateMatch(match){
 const homeClub=getClub(match.home),awayClub=getClub(match.away);
 const h=clubRating(homeClub),a=clubRating(awayClub);
 const expected=1/(1+Math.pow(10,((a.overall-h.overall)-3)/22));
 const homeLambda=Math.max(.25,1.25+expected*.9+(h.attack-a.defense)/100);
 const awayLambda=Math.max(.2,1.15+(1-expected)*.8+(a.attack-h.defense)/100);
 const poisson=lambda=>{const limit=Math.exp(-lambda);let k=0,p=1;do{k++;p*=Math.random();}while(p>limit&&k<12);return k-1;};
 match.homeGoals=poisson(homeLambda);match.awayGoals=poisson(awayLambda);
 updateClubRatingsAfterMatch(homeClub,awayClub,match.homeGoals,match.awayGoals);
}
function updateClubRatingsAfterMatch(home,away,homeGoals,awayGoals){
 const h=clubRating(home),a=clubRating(away);
 const expectedHome=1/(1+Math.pow(10,((a.overall-h.overall)-3)/22));
 const actualHome=homeGoals>awayGoals?1:homeGoals<awayGoals?0:.5;
 const margin=Math.min(3,Math.abs(homeGoals-awayGoals)),k=2.2*(1+margin*.12),shift=k*(actualHome-expectedHome);
 home.overall=boundedRating(h.overall+shift);away.overall=boundedRating(a.overall-shift);
 home.attack=boundedRating(h.attack+Math.max(-1.8,Math.min(1.8,(homeGoals-(1.25+(h.attack-a.defense)/35))*.55)));
 away.attack=boundedRating(a.attack+Math.max(-1.8,Math.min(1.8,(awayGoals-(1.15+(a.attack-h.defense)/35))*.55)));
 home.defense=boundedRating(h.defense+Math.max(-1.5,Math.min(1.5,((1.15+(a.attack-h.defense)/35)-awayGoals)*.4)));
 away.defense=boundedRating(a.defense+Math.max(-1.5,Math.min(1.5,((1.25+(h.attack-a.defense)/35)-homeGoals)*.4)));
}
function getStandings(competition){
 const rows=competition.participants.map(id=>({id,club:getClub(id),points:0,played:0,wins:0,draws:0,losses:0,gf:0,ga:0}));
 const map=new Map(rows.map(r=>[r.id,r]));
 (competition.rounds||[]).forEach(r=>r.matches.forEach(m=>{if(m.homeGoals===null||m.awayGoals===null)return;const h=map.get(m.home),a=map.get(m.away);if(!h||!a)return;h.played++;a.played++;h.gf+=m.homeGoals;h.ga+=m.awayGoals;a.gf+=m.awayGoals;a.ga+=m.homeGoals;if(m.homeGoals>m.awayGoals){h.wins++;h.points+=3;a.losses++;}else if(m.homeGoals<m.awayGoals){a.wins++;a.points+=3;h.losses++;}else{h.draws++;a.draws++;h.points++;a.points++;}}));
 return rows.sort((a,b)=>b.points-a.points||(b.gf-b.ga)-(a.gf-a.ga)||b.gf-a.gf||a.club.name.localeCompare(b.club.name,'pt-BR'));
}
function createAccessPlayoffs(competition){
 const standings=getStandings(competition);if(standings.length<6)return false;
 const seeds=standings.slice(2,6);
 competition.playoffs={createdAt:new Date().toISOString(),ties:[
  {name:'Semifinal 1 · 3º × 6º',teamA:seeds[0].id,teamB:seeds[3].id,legs:[{home:seeds[3].id,away:seeds[0].id,homeGoals:null,awayGoals:null},{home:seeds[0].id,away:seeds[3].id,homeGoals:null,awayGoals:null}],penaltyWinner:null},
  {name:'Semifinal 2 · 4º × 5º',teamA:seeds[1].id,teamB:seeds[2].id,legs:[{home:seeds[2].id,away:seeds[1].id,homeGoals:null,awayGoals:null},{home:seeds[1].id,away:seeds[2].id,homeGoals:null,awayGoals:null}],penaltyWinner:null}
 ]};return true;
}
function playoffAggregate(tie){
 let a=0,b=0;tie.legs.forEach(m=>{if(m.homeGoals===null||m.awayGoals===null)return;if(m.home===tie.teamA){a+=m.homeGoals;b+=m.awayGoals;}else{b+=m.homeGoals;a+=m.awayGoals;}});return {a,b};
}
function playoffWinner(tie){
 if(tie.legs[1].homeGoals===null||tie.legs[1].awayGoals===null)return null;
 const score=playoffAggregate(tie);if(score.a>score.b)return tie.teamA;if(score.b>score.a)return tie.teamB;return tie.penaltyWinner||null;
}
function simulateNextPlayoffLeg(competition){
 const ties=competition.playoffs?.ties||[],legIndex=ties.some(t=>t.legs[0].homeGoals===null)?0:1;
 ties.forEach(tie=>{const match=tie.legs[legIndex];if(match.homeGoals!==null)return;simulateMatch(match);if(legIndex===1){const score=playoffAggregate(tie);if(score.a===score.b)tie.penaltyWinner=Math.random()<.5?tie.teamA:tie.teamB;}});
}
function renderPlayoffs(competition){
 const ties=competition.playoffs?.ties||[];if(!ties.length)return '';
 const completed=ties.every(t=>playoffWinner(t));
 return '<div class="playoff-panel"><div class="playoff-heading"><div><h3>Mata-mata do acesso</h3><p class="muted">Semifinais em ida e volta. O 3º enfrenta o 6º, e o 4º enfrenta o 5º. Os vencedores sobem para a Série A.</p></div><span class="tag">'+(completed?'ACESSOS DEFINIDOS':'IDA E VOLTA')+'</span></div>'+ties.map(tie=>{
  const aggregate=playoffAggregate(tie),winner=playoffWinner(tie);
  return '<div class="playoff-tie"><div class="round-title"><strong>'+tie.name+'</strong><span class="tag">'+(winner?'Acesso garantido':'Em disputa')+'</span></div>'+tie.legs.map((m,i)=>'<div class="fixture"><span class="fixture-team">'+clubLink(getClub(m.home),getClub(m.home).name)+'</span><strong class="score">'+(m.homeGoals===null?'—':m.homeGoals+' × '+m.awayGoals)+'</strong><span class="fixture-team away">'+clubLink(getClub(m.away),getClub(m.away).name)+'</span><small class="leg-label">'+(i===0?'Jogo de ida':'Jogo de volta')+'</small></div>').join('')+'<div class="aggregate-line">Agregado: <strong>'+aggregate.a+' × '+aggregate.b+'</strong>'+(tie.penaltyWinner?' · Decisão nos pênaltis':'')+(winner?' · <span class="promoted-name">'+esc(getClub(winner).name)+' garantido na Série A</span>':'')+'</div></div>';
 }).join('')+(completed?'<p class="access-confirmation">Os dois vencedores do mata-mata garantiram o acesso à Série A na próxima temporada.</p>':'<div class="playoff-actions"><button class="btn" id="simulate-playoff-leg">Simular '+(ties.some(t=>t.legs[0].homeGoals===null)?'jogos de ida':'jogos de volta')+'</button></div>')+'</div>';
}
function venezuelaTableView(c,season){
 if(c.venezuelaDivision==='Primera División'){
  const regularRounds=c.venezuelaRegularRounds||(c.venezuelaStage==='regular'?c.rounds:[]);const regular=getStandings({...c,rounds:regularRounds||[]});
  const first='<h3 class="season-heading">Tabela da primeira fase · '+esc(c.venezuelaPhase)+'</h3>'+peruTableHtml(regular);
  const annual=venezuelaAnnualTable(seasons.find(s=>s.competitions.includes(c))?.year);
  const annualHtml='<h3 class="season-heading">Tabela acumulada · Apertura + Clausura</h3><div class="table-legend">'+continentalLegendItemsHtml()+'</div>'+peruTableHtml(annual,continentalClassesForRows(season,'Venezuela',annual,Object.fromEntries((annual.length===14?annual.slice(-1):[]).map(r=>[r.id,'zone-relegation']))));
  if(c.venezuelaStage==='regular')return '<div class="argentina-rules"><p>Fase regular · 13 rodadas. Os oito primeiros avançam aos quadrangulares.</p></div>'+first+annualHtml;
  const quadrangular=['A','B'].map(z=>'<h3 class="season-heading">Quadrangular '+z+'</h3>'+peruTableHtml(venezuelaGroupTable(c,z))).join('');
  if(c.venezuelaStage==='quadrangular')return first+annualHtml+'<h3 class="season-heading">Segunda fase · Quadrangulares</h3>'+quadrangular;
  const f=c.venezuelaTitleFinal;
  return first+annualHtml+'<h3 class="season-heading">Segunda fase · Quadrangulares</h3>'+quadrangular+'<div class="playoff-panel"><h3>Final · '+esc(c.venezuelaPhase)+'</h3>'+(f?.completed?'<p class="access-confirmation">Campeão: '+esc(getClub(f.champion)?.name||'')+'</p>':'Aguardando simulação da final.')+'</div>';
 }
 const rounds=c.venezuelaStage==='regional'?(c.rounds||[]):(c.venezuelaRegionalRounds||[]);
 const initial=['A','B'].map(z=>'<h3 class="season-heading">Tabela da primeira fase · Grupo '+(z==='A'?'Centro-Occidental':'Centro-Oriental')+'</h3>'+peruTableHtml(getStandings({...c,participants:c.zones[z],rounds}))).join('');
 if(c.venezuelaStage==='regional')return '<div class="argentina-rules"><p>Fase regional · quatro primeiros de cada grupo avançam ao mata-mata.</p></div>'+initial;
 const p=c.venezuelaKnockout;
 return initial+'<h3 class="season-heading">Segunda fase · Mata-mata de acesso</h3><div class="playoff-panel">'+venezuelaKnockoutHtml(p)+(p?.completed?'<p class="access-confirmation">Promovido: '+esc(getClub(p.champion)?.name||'')+'</p>':'')+'</div>';
}
function venezuelaCompletedMatchCount(rounds){return (rounds||[]).reduce((n,r)=>n+(r.matches||[]).filter(m=>m.homeGoals!==null&&m.homeGoals!==undefined&&m.awayGoals!==null&&m.awayGoals!==undefined).length,0);}
function restoreVenezuelaActiveRounds(c){if(!c?.venezuelaDivision)return;let snapshot=null;if(c.venezuelaDivision==='Primera División'){if(c.venezuelaStage==='regular')snapshot=c.venezuelaRegularRounds;else if(c.venezuelaStage==='quadrangular')snapshot=c.venezuelaFinalRounds;}else if(c.venezuelaDivision==='Segunda División'&&c.venezuelaStage==='regional')snapshot=c.venezuelaRegionalRounds;if(!Array.isArray(snapshot)||!snapshot.length)return;const currentCount=venezuelaCompletedMatchCount(c.rounds),snapshotCount=venezuelaCompletedMatchCount(snapshot);if(!Array.isArray(c.rounds)||!c.rounds.length||snapshotCount>currentCount)c.rounds=JSON.parse(JSON.stringify(snapshot));}
function renderCompetitionDetail(seasonId,competitionId,section='table'){
  const phaseSeason=seasons.find(s=>s.id===seasonId),phaseComp=phaseSeason?.competitions.find(c=>c.id===competitionId);if(phaseComp?.colombiaTournaments){phaseComp.colombiaActivePhase=phaseComp.colombiaActivePhase||'Apertura';phaseComp.rounds=phaseComp.colombiaTournaments[phaseComp.colombiaActivePhase]?.rounds||[];}if(phaseComp?.colombiaTournaments)phaseComp.colombiaStageView=phaseComp.colombiaStageView||'first';
 const season=seasons.find(s=>s.id===seasonId),competition=season?.competitions.find(c=>c.id===competitionId);if(!season||!competition)return renderCompetitions();
 if(competition.chileDivision==='Primera B')competition.chileStageView=competition.chileStageView||'regular';if(competition.ecuadorDivision)competition.ecuadorStage=competition.ecuadorStage||'regular';if(competition.peruDivision==='Liga 2')competition.peruStage=competition.peruStage||'regional';if(competition.venezuelaDivision==='Primera División')competition.venezuelaStage=competition.venezuelaStage||'regular';if(competition.venezuelaDivision==='Segunda División')competition.venezuelaStage=competition.venezuelaStage||'regional';if(['Copa de la División Profesional','Copa Simón Bolívar'].includes(competition.boliviaDivision))competition.boliviaStage=competition.boliviaStage||'groups';restoreVenezuelaActiveRounds(competition);
 const participants=competition.participants.map(getClub).filter(Boolean).sort((a,b)=>a.name.localeCompare(b.name,'pt-BR'));
 if(section==='games'&&!competition.rounds?.length&&participants.length>=2&&(!competition.sudamericanaCompetition||competition.sudamericanaStage==='groups')&&(!competition.libertadoresCompetition||competition.libertadoresStage==='groups')&&(!competition.venezuelaDivision||competition.venezuelaDivision==='Primera División'&&competition.venezuelaStage==='regular'||competition.venezuelaDivision==='Segunda División'&&competition.venezuelaStage==='regional')&&(!competition.peruDivision||competition.peruDivision==='Primera División'||competition.peruStage==='regional')&&(!competition.boliviaDivision||competition.boliviaDivision==='Primera División'||competition.boliviaStage==='groups')){buildSchedule(competition);save();}
 const tabs=[['table','Classificação'],['games','Jogos'],['clubs','Clubes']];
 let content='';
 if(section==='table'){
  const standings=getStandings(competition);
  if(competition.sudamericanaCompetition)content=sudamericanaTableView(competition);
  else if(competition.libertadoresCompetition)content=libertadoresTableView(competition);
  else if(competition.venezuelaDivision)content=venezuelaTableView(competition,season);
  else if(competition.boliviaDivision)content=boliviaTableView(competition,season);
  else if(competition.ecuadorDivision){
   const groups=competition.ecuadorGroups||{},labels=competition.ecuadorDivision==='Serie A'?{title:'Hexagonal do título',sudamericana:'Quadrangular da Sul-Americana',descenso:'Hexagonal do descenso'}:{ascenso:'Hexagonal do ascenso',descenso:'Hexagonal da permanência'};
   const groupKeys=competition.ecuadorStage==='final'?Object.keys(groups):[];
   const rules=competition.ecuadorDivision==='Serie A'?'16 clubes: fase inicial em turno e returno (30 rodadas); depois, hexagonal do título, quadrangular por vaga continental e hexagonal do descenso. Os dois últimos do hexagonal do descenso são rebaixados à Serie B.':'12 clubes: fase classificatória em ida e volta (22 rodadas); depois, hexagonais de ascenso e de permanência. Os dois primeiros do grupo de ascenso conquistam o acesso à Serie A; o grupo de permanência define a manutenção na Serie B.';
   if(competition.ecuadorStage==='regular')content='<div class="argentina-rules"><p>Equador 2026: '+rules+'</p></div><div class="table-legend">'+continentalLegendItemsHtml()+'</div>'+peruTableHtml(standings,continentalClassesForRows(season,'Equador',standings));
   else {const complete=ecuadorFinalComplete(competition);content='<div class="argentina-rules"><p>Equador 2026: '+rules+' A tabela abaixo soma os resultados da fase inicial e da fase final dentro de cada grupo.</p></div>'+groupKeys.map(k=>{const rows=ecuadorStageTable(competition,groups[k]);let classes={};if(complete&&competition.ecuadorDivision==='Serie A'&&k==='descenso')rows.slice(-2).forEach(r=>classes[r.id]='zone-relegation');if(complete&&competition.ecuadorDivision==='Serie B'&&k==='ascenso')rows.slice(0,2).forEach(r=>classes[r.id]='zone-access');return '<h3 class="season-heading">'+labels[k]+'</h3>'+peruTableHtml(rows,classes);}).join('');if(competition.ecuadorDivision==='Serie A'){const continentalRows=libertadoresDomesticRows(season,'Equador');content+='<h3 class="season-heading">Classificação continental acumulada</h3><div class="table-legend">'+continentalLegendItemsHtml()+'</div>'+peruTableHtml(continentalRows,continentalClassesForRows(season,'Equador',continentalRows));}if(complete&&competition.ecuadorDivision==='Serie A'){const out=ecuadorStageTable(competition,groups.descenso).slice(-2).map(r=>getClub(r.id)?.name||'');content+='<div class="table-legend"><span class="legend-item relegation">Rebaixamento à Serie B · 2 clubes</span></div><p class="access-confirmation">Rebaixados à Serie B: '+out.map(esc).join(' e ')+'.</p>';}if(complete&&competition.ecuadorDivision==='Serie B'){const up=ecuadorStageTable(competition,groups.ascenso).slice(0,2).map(r=>getClub(r.id)?.name||'');content+='<div class="table-legend"><span class="legend-item access">Acesso à Serie A · 2 clubes</span></div><p class="access-confirmation">Promovidos à Serie A: '+up.map(esc).join(' e ')+'.</p>';}}
  }
  else if(competition.peruDivision==='Primera División'){const annual=peruAnnualTable(season.year),out=annual.slice(-2).map(r=>r.id);content='<div class="argentina-rules"><p>Liga 1 2026: Apertura e Clausura em turno único, 17 rodadas cada. A tabela acumulada soma os dois torneios; os dois últimos são rebaixados.</p></div><h3 class="season-heading">Tabela do Torneo '+esc(competition.peruPhase)+'</h3>'+peruTableHtml(standings);if(competition.peruPhase==='Clausura')content+='<h3 class="season-heading">Tabela acumulada · Apertura + Clausura</h3><div class="table-legend">'+continentalLegendItemsHtml()+'<span class="legend-item relegation">Rebaixamento · 2 últimos</span></div>'+peruTableHtml(annual,continentalClassesForRows(season,'Peru',annual,Object.fromEntries(out.map(id=>[id,'zone-relegation']))))+'<div class="table-legend"><span class="legend-item relegation">Rebaixamento · 2 últimos</span></div>'+(competition.peruPlayoffs?.stage==='completed'?'<p class="access-confirmation">Campeão nacional: '+esc(getClub(competition.peruPlayoffs.champion)?.name||'')+'</p>':'');}
  else if(competition.peruDivision==='Liga 2'){if(competition.peruStage==='regional')content='<div class="argentina-rules"><p>Fase Regional: 18 clubes em dois grupos de nove, ida e volta (18 rodadas). Os seis primeiros de cada grupo avançam aos grupos de campeonato; os três últimos disputam os grupos de descenso.</p></div>'+['A','B'].map(z=>'<h3 class="season-heading">Grupo '+z+'</h3>'+peruTableHtml(peruRegionalTable(competition,z))).join('');else if(competition.peruStage==='final'&&competition.peruFinalGroups)content='<div class="argentina-rules"><p>Fase Final: três grupos de campeonato com quatro clubes e dois grupos de descenso com três clubes. Os quatro melhores da tabela acumulada dos grupos de campeonato avançam aos playoffs; o último de cada grupo de descenso é identificado para rebaixamento à Liga 3, divisão que não é simulada neste sistema.</p></div>'+['A','B','C'].map(z=>'<h3 class="season-heading">Grupo Campeonato '+z+'</h3>'+peruTableHtml(peruFinalTable(competition,z))).join('')+['A','B'].map(z=>'<h3 class="season-heading">Grupo Descenso '+z+'</h3>'+peruTableHtml(peruFinalTable(competition,'D'+z),Object.fromEntries(peruFinalTable(competition,'D'+z).slice(-1).map(r=>[r.id,'zone-relegation'])))).join('');else content='<h3 class="season-heading">Playoffs de acesso</h3><p class="muted">Etapa: '+esc(competition.peruPlayoffs?.stage||'Aguardando')+'</p>'+(competition.peruPlayoffs?.champion?'<p class="access-confirmation">Campeão: '+esc(getClub(competition.peruPlayoffs.champion)?.name||'')+'</p>':'');}
  else if(competition.argentinaType){const zones=['A','B'];content='<div class="argentina-rules"><p>'+esc(argentinaCompetitionDescription(competition))+'</p></div><div class="table-legend">'+(competition.argentinaType==='primera'?'<span class="legend-item playoff">Playoffs · 1º ao 8º de cada zona</span>':'<span class="legend-item access">Final pelo acesso · 1º de cada zona</span><span class="legend-item playoff">Reducido · 2º ao 8º</span>')+'</div>'+zones.map(z=>'<h3 class="season-heading">Zona '+z+'</h3><div class="table-wrap"><table class="standings"><thead><tr><th>#</th><th>Clube</th><th>P</th><th>J</th><th>V</th><th>E</th><th>D</th><th>GP</th><th>GC</th><th>SG</th></tr></thead><tbody>'+argentinaZoneStandings(competition,z).map((r,i)=>{const rank=i+1;const rowClass=competition.argentinaType==='primera'?(rank<=8?'zone-playoff':''):rank===1?'zone-access':rank<=8?'zone-playoff':'';return '<tr class="'+rowClass+'"><td>'+rank+'</td><td class="team-name">'+clubLink(r.club,r.club.name)+'</td><td>'+r.points+'</td><td>'+r.played+'</td><td>'+r.wins+'</td><td>'+r.draws+'</td><td>'+r.losses+'</td><td>'+r.gf+'</td><td>'+r.ga+'</td><td>'+(r.gf-r.ga)+'</td></tr>';}).join('')+'</tbody></table></div>').join('');if(competition.argentinaType==='primera'&&competition.phase==='Apertura'){const promedio=argentinaPromediosTable(season.year),period=promedio.years.length+' temporada(s): '+promedio.years.join(', ');content+='<h3 class="season-heading">Tabela de promedios</h3><p class="muted">Média calculada pelos pontos divididos pelos jogos disputados nas '+esc(period)+'. A janela cresce de 1 para 2 e depois 3 temporadas; a partir daí, considera sempre as 3 mais recentes. Somente partidas simuladas na Primera División entram no cálculo.</p><div class="table-wrap"><table class="standings"><thead><tr><th>#</th><th>Clube</th><th>Pontos</th><th>Jogos</th><th>Promedio</th></tr></thead><tbody>'+promedio.rows.map((r,i)=>'<tr><td>'+(i+1)+'</td><td class="team-name">'+clubLink(getClub(r.id),getClub(r.id)?.name||'Clube')+'</td><td>'+r.points+'</td><td>'+r.played+'</td><td>'+(r.average===null?'—':r.average.toFixed(3))+'</td></tr>').join('')+'</tbody></table></div>';const anual=argentinaAnnualTable(season.year),decision=argentinaRelegationDecision(season.year);content+='<h3 class="season-heading">Tabela anual acumulada</h3><p class="muted">Soma dos pontos do Apertura e do Clausura. A última posição define um dos rebaixamentos, exceto quando coincide com o último dos promedios.</p><div class="table-wrap"><table class="standings"><thead><tr><th>#</th><th>Clube</th><th>Pontos</th><th>Jogos</th><th>SG</th></tr></thead><tbody>'+anual.map((r,i)=>'<tr class="'+[continentalQualificationClassMap(season,'Argentina')[r.id],decision.ready&&decision.relegated.includes(r.id)?'zone-relegation':''].filter(Boolean).join(' ')+'"><td>'+(i+1)+'</td><td class="team-name">'+clubLink(getClub(r.id),getClub(r.id)?.name||'Clube')+'</td><td>'+r.points+'</td><td>'+r.played+'</td><td>'+(r.gf-r.ga)+'</td></tr>').join('')+'</tbody></table></div><div class="table-legend">'+continentalLegendItemsHtml()+'<span class="legend-item relegation">Rebaixados · 2 clubes (promedios + tabela anual)</span></div><h3 class="season-heading">Rebaixamento previsto</h3><p class="muted">'+(decision.ready?'Promedios: '+esc(getClub(decision.promedios)?.name||'')+' ('+decision.average.toFixed(3)+'). Tabela anual: '+esc(getClub(decision.annual)?.name||'')+'. Os dois clubes serão rebaixados ao encerrar a temporada.':'Ainda não definido: '+esc(decision.reason))+'</p>';}}
  else if(competition.venezuelaDivision==='Primera División'){const annual=venezuelaAnnualTable(season.year),ready=annual.length===14&&annual.every(r=>r.played===26),out=ready?annual.slice(-1).map(r=>r.id):[];content='<div class="argentina-rules"><p>Venezuela 2026: Apertura e Clausura em turno único, 13 rodadas cada. A tabela acumulada soma os dois torneios; o último colocado é rebaixado à Liga FUTVE 2. Os oito primeiros avançam aos quadrangulares finais.</p></div><h3 class="season-heading">Tabela do Torneo '+esc(competition.venezuelaPhase)+'</h3>'+peruTableHtml(standings);if(competition.venezuelaPhase==='Clausura')content+='<h3 class="season-heading">Tabela acumulada · Apertura + Clausura</h3>'+peruTableHtml(annual,Object.fromEntries(out.map(id=>[id,'zone-relegation'])))+'<p class="access-confirmation">'+(ready?'Rebaixado: '+esc(getClub(out[0])?.name||'')+'.':'Aguardando a conclusão dos dois torneios.')+'</p>';}
   else if(competition.venezuelaDivision==='Segunda División'){content='<div class="argentina-rules"><p>Liga FUTVE 2 2026: 17 clubes em dois grupos regionais. Os quatro primeiros de cada grupo avançam ao mata-mata; o campeão conquista o acesso à Primera División.</p></div>'+['A','B'].map(z=>'<h3 class="season-heading">Grupo '+(z==='A'?'Centro-Occidental':'Centro-Oriental')+'</h3>'+peruTableHtml(getStandings({...competition,participants:competition.zones[z]}))).join('');}
   else if(competition.paraguayDivision==='Primera División'){
    const annual=paraguayAnnualTable(season.year),decisionReady=annual.length===12&&annual.every(r=>r.played===44),relegated=decisionReady?annual.slice(-2).map(r=>r.id):[];
    content='<div class="argentina-rules"><p>Paraguai 2026: Apertura e Clausura em turno e returno, com 22 rodadas cada. A tabela anual soma os pontos dos dois torneios; os dois últimos são rebaixados à División Intermedia.</p></div><h3 class="season-heading">Tabela do Torneo '+esc(competition.paraguayPhase)+'</h3>'+peruTableHtml(standings);
    if(competition.paraguayPhase==='Clausura')content+='<h3 class="season-heading">Tabela anual acumulada · Apertura + Clausura</h3><div class="table-legend">'+continentalLegendItemsHtml()+'<span class="legend-item relegation">Rebaixamento à División Intermedia · 2 clubes</span></div>'+peruTableHtml(annual,continentalClassesForRows(season,'Paraguai',annual,Object.fromEntries(relegated.map(id=>[id,'zone-relegation']))))+'<div class="table-legend"><span class="legend-item relegation">Rebaixamento à División Intermedia · 2 clubes</span></div><p class="access-confirmation">'+(decisionReady?'Rebaixados à División Intermedia: '+relegated.map(id=>esc(getClub(id)?.name||'')).join(' e ')+'.':'Aguardando a conclusão dos dois torneios para definir os rebaixados.')+'</p>';
   }
   else if(competition.paraguayDivision==='División Intermedia'){
    const promoted=standings.slice(0,2).map(r=>r.id),ready=standings.length===16&&standings.every(r=>r.played===30);
    content='<div class="argentina-rules"><p>División Intermedia 2026: 16 clubes em turno e returno, com 30 rodadas. Os dois primeiros da classificação final conquistam o acesso à Primera División.</p></div>'+peruTableHtml(standings,Object.fromEntries((ready?promoted:[]).map(id=>[id,'zone-access'])))+'<div class="table-legend"><span class="legend-item access">Acesso à Primera División · 2 clubes</span></div><p class="access-confirmation">'+(ready?'Promovidos à Primera División: '+promoted.map(id=>esc(getClub(id)?.name||'')).join(' e ')+'.':'Aguardando a conclusão das 30 rodadas para definir os promovidos.')+'</p>';
   }
   else if(competition.chileDivision){
   const first=competition.chileDivision==='Primera División',p=competition.chilePlayoffs,rows=standings;
   content='<div class="argentina-rules"><p>Chile 2026: 16 clubes, 30 rodadas em turno e returno. '+(first?'Os dois últimos são rebaixados.':'O campeão sobe diretamente; do 2º ao 8º disputam a liguilla pelo segundo acesso.')+'</p></div><div class="table-legend">'+(first?continentalLegendItemsHtml()+'<span class="legend-item relegation">Rebaixamento · 2 últimos</span>':'<span class="legend-item access">Acesso direto · 1º</span><span class="legend-item playoff">Liguilla · 2º ao 8º</span>')+'</div><div class="table-wrap"><table class="standings"><thead><tr><th>#</th><th>Clube</th><th>P</th><th>J</th><th>V</th><th>E</th><th>D</th><th>GP</th><th>GC</th><th>SG</th></tr></thead><tbody>'+rows.map((r,i)=>{const rank=i+1,continental=first?(continentalQualificationClassMap(season,'Chile')[r.id]||''):'',cls=[continental,first?(rank>=15?'zone-relegation':''):(rank===1?'zone-access':rank<=8?'zone-playoff':'')].filter(Boolean).join(' ');return '<tr class="'+cls+'"><td>'+rank+'</td><td class="team-name">'+clubLink(r.club,r.club.name)+'</td><td>'+r.points+'</td><td>'+r.played+'</td><td>'+r.wins+'</td><td>'+r.draws+'</td><td>'+r.losses+'</td><td>'+r.gf+'</td><td>'+r.ga+'</td><td>'+(r.gf-r.ga)+'</td></tr>';}).join('')+'</tbody></table></div>';
   if(!first&&competition.chileStageView==='liguilla'){
    const p=competition.chilePlayoffs,current=p?.rounds?.[p.rounds.length-1];
    content='<h3 class="season-heading">Liguilla pelo segundo acesso</h3><p class="muted">O 1º colocado da fase regular sobe diretamente. Os clubes do 2º ao 8º disputam a segunda vaga na Primera División.</p>'+(p?'<p class="muted">Etapa atual: '+esc(current?.name||'Concluída')+'</p>'+current?.ties.map(t=>'<p class="muted">'+esc(t.name)+' · '+(chileTieWinner(t)?'Vencedor: '+esc(getClub(chileTieWinner(t))?.name||''):'Confronto pendente')+'</p>').join('')+(p.completed?'<p class="access-confirmation">Segundo promovido: '+esc(getClub(p.promoted)?.name||'')+'</p>':''):'<p class="muted">A liguilla será disponibilizada após o encerramento das 30 rodadas da fase regular e a geração dos confrontos na aba Jogos.</p>');
   }
   if(rows.length>1&&rows[0].played===30&&rows[0].points===rows[1].points)content+='<h3 class="season-heading">Desempate pelo título</h3><p class="muted">'+(competition.chileTitleTie?.completed?'Campeão: '+esc(getClub(chileTitleWinner(competition.chileTitleTie))?.name||''):'Os dois primeiros terminaram empatados em pontos. Gere o jogo de desempate na aba Jogos.')+'</p>';
   if(!first&&p?.completed)content+='<p class="access-confirmation">Segundo promovido: '+esc(getClub(p.promoted)?.name||'')+'</p>';
  }
  else if(competition.colombiaDivision){
   const phase=competition.colombiaActivePhase||'Apertura',annual=colombiaAnnualTable(season.year,competition.colombiaDivision),stageView=competition.colombiaStageView||'first',p=competition.colombiaTournaments[phase]?.playoff,isFirst=competition.colombiaDivision==='Primera División';
   const tableHtml=rows=>'<div class="table-wrap"><table class="standings"><thead><tr><th>#</th><th>Clube</th><th>P</th><th>J</th><th>V</th><th>E</th><th>D</th><th>GP</th><th>GC</th><th>SG</th></tr></thead><tbody>'+rows.map((r,i)=>'<tr><td>'+(i+1)+'</td><td class="team-name">'+clubLink(r.club,r.club.name)+'</td><td>'+r.points+'</td><td>'+r.played+'</td><td>'+r.wins+'</td><td>'+r.draws+'</td><td>'+r.losses+'</td><td>'+r.gf+'</td><td>'+r.ga+'</td><td>'+(r.gf-r.ga)+'</td></tr>').join('')+'</tbody></table></div>';
   if(stageView==='first')content='<h3 class="season-heading">Tabela da primeira fase · '+esc(phase)+'</h3>'+tableHtml(standings);
   else if(p?.kind==='quadrangular')content='<h3 class="season-heading">Segunda fase · Quadrangulares</h3>'+['A','B'].map(z=>'<h4 class="season-heading">Grupo '+z+'</h4>'+tableHtml(colombiaGroupStandings(p,z))).join('')+(p.final?'<h3 class="season-heading">Final</h3><p class="muted">'+esc(getClub(p.final.teamA)?.name||'')+' × '+esc(getClub(p.final.teamB)?.name||'')+(colombiaTieWinner(p.final)?' · Campeão: '+esc(getClub(colombiaTieWinner(p.final))?.name||''):' · Final pendente')+'</p>':'<p class="muted">A final será exibida aqui após os quadrangulares.</p>');
   else if(p?.kind==='knockout')content='<h3 class="season-heading">Segunda fase · Mata-mata</h3>'+p.ties.map(tie=>'<p class="muted">'+esc(tie.name)+': '+esc(getClub(tie.teamA)?.name||'')+' × '+esc(getClub(tie.teamB)?.name||'')+(colombiaTieWinner(tie)?' · Vencedor: '+esc(getClub(colombiaTieWinner(tie))?.name||''):'')+'</p>').join('');
   else content='<h3 class="season-heading">Segunda fase</h3><p class="muted">Os grupos e a final aparecerão aqui depois que os confrontos forem gerados na aba Jogos.</p>';
   if(stageView==='first'){
    content+='<h3 class="season-heading">Tabela anual de reclasificación</h3>'+(isFirst?'<div class="table-legend">'+continentalLegendItemsHtml()+'</div>':'')+'<div class="table-wrap"><table class="standings"><thead><tr><th>#</th><th>Clube</th><th>Pontos</th><th>Jogos</th><th>SG</th></tr></thead><tbody>'+annual.map((r,i)=>'<tr class="'+(isFirst?(continentalQualificationClassMap(season,'Colômbia')[r.id]||''):'')+'"><td>'+(i+1)+'</td><td class="team-name">'+clubLink(getClub(r.id),getClub(r.id)?.name||'')+'</td><td>'+r.points+'</td><td>'+r.played+'</td><td>'+(r.gf-r.ga)+'</td></tr>').join('')+'</tbody></table></div>';
    if(isFirst){const avg=colombiaPromediosTable(season.year),decision=colombiaRelegationDecision(season.year);content+='<h3 class="season-heading">Tabela de promedios · rebaixamento</h3><p class="muted">Média de pontos por jogo nas duas temporadas mais recentes disponíveis. Em 2026, considera apenas 2026; em 2027, considera 2026 e 2027; a partir de 2028, as duas temporadas mais recentes.</p><div class="table-wrap"><table class="standings"><thead><tr><th>#</th><th>Clube</th><th>Pontos</th><th>Jogos</th><th>Promedio</th></tr></thead><tbody>'+avg.rows.map((r,i)=>'<tr class="'+(decision.ready&&decision.relegated.includes(r.id)?'zone-relegation':'')+'"><td>'+(i+1)+'</td><td class="team-name">'+clubLink(getClub(r.id),getClub(r.id)?.name||'')+'</td><td>'+r.points+'</td><td>'+r.played+'</td><td>'+r.average.toFixed(3)+'</td></tr>').join('')+'</tbody></table></div><p class="muted">'+(decision.ready?'Dois rebaixados previstos: '+decision.relegated.map(id=>esc(getClub(id)?.name||'')).join(' e '):esc(decision.reason))+'</p>';}
   }
   if(!isFirst)content+=colombiaPromotionPanelHtml(competition);
  }
  else if(['intermedio','competencia'].includes(competition.uruguayType)){
   const zoneTable=z=>'<h3 class="season-heading">Série '+z+'</h3><div class="table-wrap"><table class="standings"><thead><tr><th>#</th><th>Clube</th><th>P</th><th>J</th><th>V</th><th>E</th><th>D</th><th>SG</th></tr></thead><tbody>'+uruguayZoneStandings(competition,z).map((r,i)=>'<tr class="'+(i===0?'zone-access':'')+'"><td>'+(i+1)+'</td><td class="team-name">'+clubLink(r.club,r.club.name)+'</td><td>'+r.points+'</td><td>'+r.played+'</td><td>'+r.wins+'</td><td>'+r.draws+'</td><td>'+r.losses+'</td><td>'+(r.gf-r.ga)+'</td></tr>').join('')+'</tbody></table></div>';
   const isCompetencia=competition.uruguayType==='competencia',final=isCompetencia?competition.uruguayCompetenciaFinal:competition.uruguayIntermedioFinal;
   content='<div class="table-legend"><span class="legend-item access">1º de cada série · classificado para a final</span></div>'+zoneTable('A')+zoneTable('B')+'<p class="muted">Os líderes das séries A e B disputam uma final em jogo único pelo título do '+(isCompetencia?'Torneo Competencia':'Torneo Intermedio')+'.</p>'+(final?.completed?'<p class="access-confirmation">Campeão: '+esc(getClub(final.champion)?.name||'')+'</p>':'');
  }
  else if(['primera-apertura','primera-clausura'].includes(competition.uruguayType)){
   const isClausura=competition.uruguayType==='primera-clausura';
   const annual=uruguayAnnualTable(season.year),avg=uruguayPromediosTable(season.year),decision=uruguayRelegationDecision(season.year);
   content='<div class="table-legend"><span class="legend-item access">Líder da tabela anual · vaga direta na final</span><span class="legend-item relegation">Três piores médias · rebaixamento</span></div><h3 class="season-heading">Tabela do Torneo '+(isClausura?'Clausura':'Apertura')+'</h3><div class="table-wrap"><table class="standings"><thead><tr><th>#</th><th>Clube</th><th>P</th><th>J</th><th>V</th><th>E</th><th>D</th><th>GP</th><th>GC</th><th>SG</th></tr></thead><tbody>'+standings.map((r,i)=>'<tr class="'+(annual.some((x,index)=>x.id===r.id&&index===0)?'zone-access':decision.ready&&decision.relegated.includes(r.id)?'zone-relegation':'')+'"><td>'+(i+1)+'</td><td class="team-name">'+clubLink(r.club,r.club.name)+'</td><td>'+r.points+'</td><td>'+r.played+'</td><td>'+r.wins+'</td><td>'+r.draws+'</td><td>'+r.losses+'</td><td>'+r.gf+'</td><td>'+r.ga+'</td><td>'+(r.gf-r.ga)+'</td></tr>').join('')+'</tbody></table></div>';
   content+='<h3 class="season-heading">Tabela anual acumulada</h3><p class="muted">Soma dos pontos do Apertura, Intermedio e Clausura. O líder anual avança diretamente à final quando não vencer o Apertura ou o Clausura.</p><div class="table-legend">'+continentalLegendItemsHtml()+'</div><div class="table-wrap"><table class="standings"><thead><tr><th>#</th><th>Clube</th><th>Pontos</th><th>Jogos</th><th>SG</th></tr></thead><tbody>'+annual.map((r,i)=>'<tr class="'+[i===0?'zone-access':'',continentalQualificationClassMap(season,'Uruguai')[r.id]||''].filter(Boolean).join(' ')+'"><td>'+(i+1)+'</td><td class="team-name">'+clubLink(getClub(r.id),getClub(r.id)?.name||'')+'</td><td>'+r.points+'</td><td>'+r.played+'</td><td>'+(r.gf-r.ga)+'</td></tr>').join('')+'</tbody></table></div>';
   content+='<h3 class="season-heading">Tabela de promedios · rebaixamento</h3><p class="muted">Média de pontos por jogo nas duas temporadas mais recentes disponíveis ('+esc(avg.years.join(' e '))+'). Em 2026, considera apenas a temporada disponível. Os três piores promedios serão rebaixados.</p><div class="table-wrap"><table class="standings"><thead><tr><th>#</th><th>Clube</th><th>Pontos</th><th>Jogos</th><th>Promedio</th></tr></thead><tbody>'+avg.rows.map((r,i)=>'<tr class="'+(decision.ready&&decision.relegated.includes(r.id)?'zone-relegation':'')+'"><td>'+(i+1)+'</td><td class="team-name">'+clubLink(getClub(r.id),getClub(r.id)?.name||'')+'</td><td>'+r.points+'</td><td>'+r.played+'</td><td>'+(r.average===null?'—':r.average.toFixed(3))+'</td></tr>').join('')+'</tbody></table></div><p class="muted">'+(decision.ready?'Três rebaixados previstos: '+decision.relegated.map(id=>esc(getClub(id)?.name||'')).join(', '):'Aguardando partidas para calcular os promedios.')+'</p>';
  }
  else if(competition.uruguayType==='segunda-regular'){
   if(competition.uruguayAccess)uruguayEnsureAccessPlayoffs(competition);
   const p=competition.uruguayAccess;
   content='<div class="table-legend"><span class="legend-item access">Verde · 1º e 2º (acesso direto) e vencedor do playoff</span><span class="legend-item playoff">Amarelo · 3º ao 6º enquanto disputa o playoff</span></div><div class="table-wrap"><table class="standings"><thead><tr><th>#</th><th>Clube</th><th>P</th><th>J</th><th>V</th><th>E</th><th>D</th><th>GP</th><th>GC</th><th>SG</th></tr></thead><tbody>'+standings.map((r,i)=>'<tr class="'+(i<2||(p?.completed&&p.promotedThird===r.id)?'zone-access':i<6?'zone-playoff':'')+'"><td>'+(i+1)+'</td><td class="team-name">'+clubLink(r.club,r.club.name)+'</td><td>'+r.points+'</td><td>'+r.played+'</td><td>'+r.wins+'</td><td>'+r.draws+'</td><td>'+r.losses+'</td><td>'+r.gf+'</td><td>'+r.ga+'</td><td>'+(r.gf-r.ga)+'</td></tr>').join('')+'</tbody></table></div>';
  }
  else content='<div class="table-legend">'+(competition.division==='A'?continentalLegendItemsHtml()+'<span class="legend-item relegation">Rebaixamento · 17º ao 20º</span>':'<span class="legend-item access">Acesso direto · 1º e 2º</span><span class="legend-item playoff">Playoffs · 3º ao 6º</span>')+'</div><div class="table-wrap"><table class="standings"><thead><tr><th>#</th><th>Clube</th><th>P</th><th>J</th><th>V</th><th>E</th><th>D</th><th>GP</th><th>GC</th><th>SG</th></tr></thead><tbody>'+standings.map((r,i)=>{const rank=i+1,winner=competition.playoffs?.ties?.some(t=>playoffWinner(t)===r.id);const continental=competition.division==='A'&&competition.country==='Brasil'?(continentalQualificationClassMap(season,'Brasil')[r.id]||''):'',zone=[continental,competition.division==='A'?(rank>=17?'zone-relegation':''):(rank<=2||winner?'zone-access':rank<=6?'zone-playoff':'')].filter(Boolean).join(' ');return '<tr class="'+zone+'"><td>'+rank+'</td><td class="team-name">'+clubLink(r.club,r.club.name)+'</td><td>'+r.points+'</td><td>'+r.played+'</td><td>'+r.wins+'</td><td>'+r.draws+'</td><td>'+r.losses+'</td><td>'+r.gf+'</td><td>'+r.ga+'</td><td>'+(r.gf-r.ga)+'</td></tr>';}).join('')+'</tbody></table></div>'+(competition.division==='B'&&competition.playoffs?'<p class="muted">Os vencedores do mata-mata aparecem em verde: acesso garantido.</p>':'');
 }else if(section==='games'){
  if(competition.sudamericanaCompetition)content+=sudamericanaGamesPanel(competition);
  const colombiaSecondView=!!competition.colombiaDivision&&(competition.colombiaStageView||'first')==='second',chileSecondView=competition.chileDivision==='Primera B'&&competition.chileStageView==='liguilla';const rounds=(competition.colombiaDivision&&colombiaSecondView||chileSecondView)?[]:(competition.rounds||[]);
  const regularDone=rounds.length>0&&rounds.every(r=>r.matches.every(m=>m.homeGoals!==null&&m.awayGoals!==null));
  if(competition.libertadoresCompetition)content+=libertadoresGamesPanel(competition,regularDone);
  if(competition.venezuelaDivision==='Primera División'&&competition.venezuelaStage==='regular'&&regularDone)content+='<div class="playoff-panel"><h3>Segunda fase · Quadrangulares</h3><p class="muted">Os oito melhores avançam a dois grupos de quatro, em ida e volta.</p><button class="btn" id="create-venezuela-primera-final">Gerar quadrangulares</button></div>';
  if(competition.venezuelaDivision==='Primera División'&&competition.venezuelaStage==='quadrangular'&&regularDone)content+='<div class="playoff-panel"><h3>Final do Torneio '+esc(competition.venezuelaPhase)+'</h3><p class="muted">Os líderes dos grupos disputam a final em jogo único.</p><button class="btn" id="create-venezuela-primera-title">Gerar final</button></div>';
  if(competition.venezuelaDivision==='Primera División'&&competition.venezuelaStage==='title'&&competition.venezuelaTitleFinal){const f=competition.venezuelaTitleFinal,m=f.match;content+='<div class="playoff-panel"><h3>Final do Torneio '+esc(competition.venezuelaPhase)+'</h3><div class="fixture"><span class="fixture-team">'+clubLink(getClub(m.home),getClub(m.home)?.name||'')+'</span><strong class="score">'+(m.homeGoals===null?'—':m.homeGoals+' × '+m.awayGoals+(f.penaltyWinner?' · pênaltis':''))+'</strong><span class="fixture-team away">'+clubLink(getClub(m.away),getClub(m.away)?.name||'')+'</span></div>'+(f.completed?'<p class="access-confirmation">Campeão do '+esc(competition.venezuelaPhase)+': '+esc(getClub(f.champion)?.name||'')+'</p>':'<button class="btn" id="simulate-venezuela-primera-title">Simular final</button>')+'</div>';}
  if(competition.venezuelaDivision==='Segunda División'&&competition.venezuelaStage==='regional'&&regularDone)content+='<div class="playoff-panel"><h3>Fase final · Mata-mata</h3><p class="muted">Os quatro primeiros de cada grupo avançam às quartas, em ida e volta.</p><button class="btn" id="create-venezuela-futve2-final">Gerar mata-mata</button></div>';
  if(competition.venezuelaDivision==='Segunda División'&&competition.venezuelaStage==='knockout'&&competition.venezuelaKnockout){const p=competition.venezuelaKnockout,last=p.rounds[p.rounds.length-1];content+='<div class="playoff-panel"><h3>Mata-mata · '+esc(last.name)+'</h3>'+venezuelaKnockoutHtml(p)+(p.completed?'<p class="access-confirmation">Promovido: '+esc(getClub(p.champion)?.name||'')+'</p>':p.awaitingNext?'<button class="btn" id="next-venezuela-knockout">Gerar próxima fase</button>':'<button class="btn" id="simulate-venezuela-knockout">Simular jogos da fase</button>')+'</div>';}
  if(competition.boliviaDivision)content+=boliviaTiePanel(competition,season);
  if(competition.ecuadorDivision&&competition.ecuadorStage==='regular'&&regularDone)content+='<div class="playoff-panel"><h3>Fase final</h3><p class="muted">A classificação da fase inicial define os grupos finais. Os pontos da fase inicial são mantidos na tabela acumulada.</p><button class="btn" id="create-ecuador-final">Gerar grupos da fase final</button></div>';if(competition.ecuadorDivision&&competition.ecuadorStage==='final'&&competition.ecuadorGroups)content+='<div class="playoff-panel"><h3>Fase final · '+(competition.ecuadorDivision==='Serie A'?'grupos por título, competição continental e descenso':'hexagonais de ascenso e permanência')+'</h3><p class="muted">Os jogos da fase final são simulados pelas rodadas abaixo. A classificação acumula os pontos da fase inicial.</p></div>';if(competition.peruDivision==='Primera División'&&competition.peruPhase==='Clausura'&&regularDone){const p=competition.peruPlayoffs;if(!p)content+='<div class="playoff-panel"><h3>Playoffs nacionais da Liga 1</h3><button class="btn" id="create-peru-primera">Gerar confrontos</button></div>';else{const ties=p.stage==='semifinals'?p.semifinals:p.stage==='final'?[p.final]:[];content+='<div class="playoff-panel"><h3>Playoffs nacionais da Liga 1</h3>'+ties.filter(Boolean).map(t=>'<div class="round-card"><strong>'+esc(t.name)+'</strong>'+t.legs.map(m=>'<div class="fixture"><span class="fixture-team">'+clubLink(getClub(m.home),getClub(m.home)?.name||'')+'</span><strong class="score">'+(m.homeGoals===null?'—':m.homeGoals+' × '+m.awayGoals)+'</strong><span class="fixture-team away">'+clubLink(getClub(m.away),getClub(m.away)?.name||'')+'</span></div>').join('')+'</div>').join('')+(p.stage==='completed'?'<p class="access-confirmation">Campeão: '+esc(getClub(p.champion)?.name||'')+'</p>':p.awaitingNext?'<button class="btn" id="next-peru-primera">Gerar próxima fase</button>':'<button class="btn" id="simulate-peru-primera">Simular jogos da fase</button>')+'</div>';}}
  if(competition.peruDivision==='Liga 2'){const p=competition.peruPlayoffs;if(competition.peruStage==='regional'&&regularDone)content+='<div class="playoff-panel"><h3>Fase Final</h3><button class="btn" id="create-peru-final">Gerar grupos da fase final</button></div>';else if(competition.peruStage==='final'&&regularDone)content+='<div class="playoff-panel"><h3>Playoffs de acesso</h3><button class="btn" id="create-peru-playoffs">Gerar confrontos dos playoffs</button></div>';else if(competition.peruStage==='playoffs'&&p){const ties=p.stage==='semifinals'?[...p.semifinals]:p.stage==='final-repechage'?[p.final,p.repechage]:[];content+='<div class="playoff-panel"><h3>Playoffs de acesso · '+esc(p.stage)+'</h3>'+ties.filter(Boolean).map(t=>'<div class="round-card"><strong>'+esc(t.name)+'</strong>'+t.legs.map(m=>'<div class="fixture"><span class="fixture-team">'+clubLink(getClub(m.home),getClub(m.home)?.name||'')+'</span><strong class="score">'+(m.homeGoals===null?'—':m.homeGoals+' × '+m.awayGoals)+'</strong><span class="fixture-team away">'+clubLink(getClub(m.away),getClub(m.away)?.name||'')+'</span></div>').join('')+'</div>').join('')+(p.stage==='second-access'&&p.secondAccess?'<div class="round-card"><strong>Decisão do segundo acesso · jogo único</strong><div class="fixture"><span class="fixture-team">'+clubLink(getClub(p.secondAccess.home),getClub(p.secondAccess.home)?.name||'')+'</span><strong class="score">'+(p.secondAccess.match.homeGoals===null?'—':p.secondAccess.match.homeGoals+' × '+p.secondAccess.match.awayGoals)+'</strong><span class="fixture-team away">'+clubLink(getClub(p.secondAccess.away),getClub(p.secondAccess.away)?.name||'')+'</span></div></div>':'')+(p.stage==='completed'?'<p class="access-confirmation">Promovidos: '+esc(getClub(p.champion)?.name||'')+' e '+esc(getClub(p.promotedSecond)?.name||'')+'</p>':p.awaitingNext?'<button class="btn" id="next-peru-playoffs">Gerar próxima fase</button>':'<button class="btn" id="simulate-peru-playoffs">Simular jogos da fase</button>')+'</div>';}}
  if(competition.chileDivision){
   const chileRegularDone=(competition.rounds||[]).length>0&&competition.rounds.every(r=>r.matches.every(m=>m.homeGoals!==null&&m.awayGoals!==null));
   const rows=getStandings(competition),first=competition.chileDivision==='Primera División';
   if(chileRegularDone){
   if(rows.length>1&&rows[0].points===rows[1].points){
    if(!competition.chileTitleTie)content+='<div class="playoff-panel"><h3>Desempate pelo título</h3><p class="muted">Os dois primeiros terminaram empatados em pontos. Gere o jogo único de desempate.</p><button class="btn" id="create-chile-title-tie">Gerar confronto</button></div>';
    else {const t=competition.chileTitleTie,m=t.match,winner=chileTitleWinner(t);content+='<div class="playoff-panel"><h3>Desempate pelo título</h3>'+ '<div class="fixture"><span class="fixture-team">'+clubLink(getClub(m.home),getClub(m.home)?.name||'')+'</span><strong class="score">'+(m.homeGoals===null?'—':m.homeGoals+' × '+m.awayGoals)+'</strong><span class="fixture-team away">'+clubLink(getClub(m.away),getClub(m.away)?.name||'')+'</span></div>'+(winner?'<p class="access-confirmation">Campeão: '+esc(getClub(winner)?.name||'')+'</p>':'<button class="btn" id="simulate-chile-title-tie">Simular desempate</button>')+'</div>';}
   }
   if(!first){
    const p=competition.chilePlayoffs;
    if(!p)content+='<div class="playoff-panel"><h3>Liguilla pelo segundo acesso</h3><p class="muted">Quartas preliminares: 3º × 8º, 4º × 7º e 5º × 6º. O 2º colocado entra diretamente nas semifinais. Todas as fases são disputadas em ida e volta.</p><button class="btn" id="create-chile-playoffs">Gerar confrontos da liguilla</button></div>';
    else {const current=p.rounds[p.rounds.length-1];content+='<div class="playoff-panel"><h3>Liguilla pelo segundo acesso</h3><p class="muted">'+esc(current.name)+'</p>'+current.ties.map(chileRenderTie).join('')+(p.completed?'<p class="access-confirmation">Segundo acesso: '+esc(getClub(p.promoted)?.name||'')+'</p>':p.awaitingNext?'<button class="btn" id="next-chile-playoffs">Gerar próxima fase</button>':'<button class="btn" id="simulate-chile-playoffs">Simular '+(current.ties.some(t=>t.legs[0].homeGoals===null)?'jogos de ida':'jogos de volta')+'</button>')+'</div>';}
   }
   }
  }
  if(competition.argentinaType)content='<div class="argentina-rules"><p>'+esc(argentinaCompetitionDescription(competition))+'</p></div>';
  content+=rounds.length?'<div class="round-actions"><span class="muted">Rodadas: '+rounds.length+' · Jogos concluídos: '+rounds.reduce((n,r)=>n+r.matches.filter(m=>m.homeGoals!==null).length,0)+'</span><div class="round-controls"><label for="simulate-count">Simular próximas</label><select id="simulate-count">'+[1,2,3,4,5].map(n=>'<option value="'+n+'" '+(n===5?'selected':'')+'>'+n+' rodada(s)</option>').join('')+'</select><button class="btn" id="simulate-rounds">Simular resultados</button></div></div>'+rounds.map(r=>'<div class="round-card"><div class="round-title"><strong>Rodada '+r.number+'</strong><span class="tag">'+(r.matches.every(m=>m.homeGoals!==null)?'Concluída':'Pendente')+'</span></div>'+r.matches.map(m=>'<div class="fixture"><span class="fixture-team">'+clubLink(getClub(m.home),getClub(m.home).name)+'</span><strong class="score">'+(m.homeGoals===null?'—':m.homeGoals+' × '+m.awayGoals)+'</strong><span class="fixture-team away">'+clubLink(getClub(m.away),getClub(m.away).name)+'</span></div>').join('')+'</div>').join('') :(competition.boliviaDivision&&competition.boliviaStage==='knockout'||competition.libertadoresCompetition||competition.sudamericanaCompetition&&competition.sudamericanaStage!=='groups'?'':'<div class="empty">Inscreva pelo menos dois clubes para gerar as rodadas automaticamente.</div>');
  if(competition.colombiaDivision&&colombiaSecondView){
   const phase=competition.colombiaActivePhase||'Apertura',isFirst=competition.colombiaDivision==='Primera División',t=competition.colombiaTournaments[phase],p=t.playoff,top=getStandings(competition).slice(0,8);
   let panel='<div class="playoff-panel"><h3>Fase final · '+esc(phase)+'</h3><p class="muted">'+(isFirst&&phase==='Apertura'?'Quartas de final, semifinais e final em ida e volta.':'Dois quadrangulares de quatro clubes, em ida e volta, e final entre os líderes.')+'</p>';
   if(!p)panel+='<p class="muted">Classificados: '+top.map((r,i)=>(i+1)+'º '+esc(r.club.name)).join(' · ')+'</p><button class="btn" id="create-colombia-playoffs">Gerar confrontos da fase final</button>';
   else if(p.kind==='knockout'){
    panel+='<p class="muted">Etapa: '+esc(p.stage==='quarterfinals'?'Quartas de final':p.stage==='semifinals'?'Semifinais':p.stage==='final'?'Final':'Concluída')+'</p>'+p.ties.map(tie=>'<div class="round-card"><div class="round-title"><strong>'+esc(tie.name)+'</strong><span class="tag">'+(colombiaTieWinner(tie)?'Concluída':'Em disputa')+'</span></div>'+tie.legs.map((m,i)=>'<div class="fixture"><span class="fixture-team">'+clubLink(getClub(m.home),getClub(m.home)?.name||'')+'</span><strong class="score">'+(m.homeGoals===null?'—':m.homeGoals+' × '+m.awayGoals)+'</strong><span class="fixture-team away">'+clubLink(getClub(m.away),getClub(m.away)?.name||'')+'</span><small>Jogo '+(i+1)+'</small></div>').join('')+'</div>').join('');
    if(p.stage==='completed')panel+='<p class="access-confirmation">Campeão: '+esc(getClub(p.champion)?.name||'')+'</p>';
    else if(colombiaPlayoffStageDone(p))panel+='<button class="btn" id="next-colombia-playoff">Gerar próxima fase</button>';
    else panel+='<button class="btn" id="simulate-colombia-playoff">Simular '+(p.ties.some(t=>t.legs[0].homeGoals===null)?'jogos de ida':'jogos de volta')+'</button>';
   }else{
    panel+='<p class="muted">Etapa: '+(p.stage==='groups'?'Quadrangulares':p.stage==='final'?'Final':'Concluída')+'</p>';
    const groupStage=p.stage==='groups'?p:(p.history||[]).find(h=>h.stage==='groups')||(p.groupRounds?{groups:p.groups,groupRounds:p.groupRounds}:null);if(groupStage)['A','B'].forEach(z=>{panel+='<h4>Grupo '+z+' · '+(p.stage==='groups'?'fase atual':'fase concluída')+'</h4>'+groupStage.groupRounds[z].map(r=>'<div class="round-card"><div class="round-title"><strong>Rodada '+r.number+'</strong><span class="tag">'+(r.matches.every(m=>m.homeGoals!==null)?'Concluída':'Pendente')+'</span></div>'+r.matches.map(m=>'<div class="fixture"><span class="fixture-team">'+clubLink(getClub(m.home),getClub(m.home)?.name||'')+'</span><strong class="score">'+(m.homeGoals===null?'—':m.homeGoals+' × '+m.awayGoals)+'</strong><span class="fixture-team away">'+clubLink(getClub(m.away),getClub(m.away)?.name||'')+'</span></div>').join('')+'</div>').join('');});
    if(p.stage==='final'&&p.final)panel+='<div class="round-card"><div class="round-title"><strong>Final</strong></div>'+p.final.legs.map((m,i)=>'<div class="fixture"><span class="fixture-team">'+clubLink(getClub(m.home),getClub(m.home)?.name||'')+'</span><strong class="score">'+(m.homeGoals===null?'—':m.homeGoals+' × '+m.awayGoals)+'</strong><span class="fixture-team away">'+clubLink(getClub(m.away),getClub(m.away)?.name||'')+'</span><small>Jogo '+(i+1)+'</small></div>').join('')+'</div>';
    if(p.stage==='completed')panel+='<p class="access-confirmation">Campeão: '+esc(getClub(p.champion)?.name||'')+'</p>';
    else if(colombiaPlayoffStageDone(p))panel+='<button class="btn" id="next-colombia-playoff">Gerar final</button>';
    else panel+='<button class="btn" id="simulate-colombia-playoff">Simular próxima rodada/fase</button>';
   }
   panel+='</div>';content+=panel;
  }
  if(competition.colombiaDivision==='Segunda División')content+=colombiaPromotionPanelHtml(competition);
  if(competition.uruguayType==='primera-clausura'&&regularDone){
   if(!competition.uruguayChampionship)uruguayCreatePrimeraFinal(season.year);
   const p=competition.uruguayChampionship;
   if(p){
    const matchHtml=m=>m?'<div class="fixture"><span class="fixture-team">'+clubLink(getClub(m.home),getClub(m.home)?.name||'')+'</span><strong class="score">'+(m.homeGoals===null?'—':m.homeGoals+' × '+m.awayGoals+(m.penaltyWinner?' · pênaltis':''))+'</strong><span class="fixture-team away">'+clubLink(getClub(m.away),getClub(m.away)?.name||'')+'</span></div>':'';
    content+='<div class="playoff-panel"><h3>Fase final do Campeonato Uruguaio</h3>'+(p.semifinal?'<h4>Semifinal</h4>'+matchHtml(p.semifinal):'')+(p.final?'<h4>Final</h4>'+matchHtml(p.final):'')+(p.completed?'<p class="access-confirmation">Campeão uruguaio: '+esc(getClub(p.champion)?.name||'')+'</p>':'<button class="btn" id="simulate-uruguay-championship">Simular '+(p.semifinal&& !uruguayMatchWinner(p.semifinal)?'semifinal':'final')+'</button>')+'</div>';
   }
  }
  if(competition.uruguayType==='segunda-regular'&&regularDone){
   if(competition.uruguayAccess)uruguayEnsureAccessPlayoffs(competition);
   const p=competition.uruguayAccess;
   if(!p)content+='<div class="playoff-panel"><h3>Playoff pelo terceiro acesso</h3><p class="muted">Os dois primeiros colocados sobem diretamente. Do 3º ao 6º disputam a terceira vaga em semifinais e final, todas em ida e volta.</p><button class="btn" id="create-uruguay-access">Gerar confrontos do acesso</button></div>';
   else{
    const tieHtml=t=>'<div class="round-card"><div class="round-title"><strong>'+esc(t.name)+'</strong><span class="tag">'+(uruguayAccessWinner(t)?'Concluída':'Em disputa')+'</span></div>'+t.legs.map((m,i)=>'<div class="fixture"><span class="fixture-team">'+clubLink(getClub(m.home),getClub(m.home)?.name||'')+'</span><strong class="score">'+(m.homeGoals===null?'—':m.homeGoals+' × '+m.awayGoals)+'</strong><span class="fixture-team away">'+clubLink(getClub(m.away),getClub(m.away)?.name||'')+'</span><small>Jogo '+(i+1)+'</small></div>').join('')+'</div>';
    content+='<div class="playoff-panel"><h3>Playoff pelo terceiro acesso</h3><p class="muted">Acesso direto: '+p.promotedDirect.map(id=>esc(getClub(id)?.name||'')).join(' e ')+(p.promotedThird?' · Terceiro promovido: '+esc(getClub(p.promotedThird)?.name||''):'')+'</p>'+p.semifinals.map(tieHtml).join('')+(p.final?tieHtml(p.final):'')+(p.completed?'<p class="access-confirmation">Os três acessos à Primera División estão definidos.</p>':'<button class="btn" id="simulate-uruguay-access">Simular '+(p.final?'jogos do playoff final':p.semifinals.some(t=>t.legs[0].homeGoals===null)?'jogos de ida das semifinais':'jogos de volta das semifinais')+'</button>')+'</div>';
   }
  }
  if(['intermedio','competencia'].includes(competition.uruguayType)&&regularDone){
   const isCompetencia=competition.uruguayType==='competencia',final=isCompetencia?competition.uruguayCompetenciaFinal:competition.uruguayIntermedioFinal;
   if(!final)content+='<div class="playoff-panel"><h3>Final do '+(isCompetencia?'Torneo Competencia':'Torneo Intermedio')+'</h3><p class="muted">Os líderes das séries A e B disputam o título em jogo único.</p><button class="btn" id="create-uruguay-series-final">Gerar confronto da final</button></div>';
   else content+='<div class="playoff-panel"><h3>'+esc(final.match.name)+'</h3><div class="fixture"><span class="fixture-team">'+clubLink(getClub(final.match.home),getClub(final.match.home)?.name||'')+'</span><strong class="score">'+(final.match.homeGoals===null?'—':final.match.homeGoals+' × '+final.match.awayGoals+(final.match.penaltyWinner?' · pênaltis':''))+'</strong><span class="fixture-team away">'+clubLink(getClub(final.match.away),getClub(final.match.away)?.name||'')+'</span></div>'+(final.completed?'<p class="access-confirmation">Campeão: '+esc(getClub(final.champion)?.name||'')+'</p>':'<button class="btn" id="simulate-uruguay-series-final">Simular final</button>')+'</div>';
  }

  if(competition.argentinaType==='nacional'&&competition.argentinaPlayoffs)argentinaEnsureNacionalFinal(competition);
  const leadersA=competition.argentinaType==='nacional'?argentinaZoneStandings(competition,'A')[0]?.id:null;
  const leadersB=competition.argentinaType==='nacional'?argentinaZoneStandings(competition,'B')[0]?.id:null;
  const savedFinal=competition.argentinaPlayoffs?.final;
  const wrongSavedNacionalFinal=competition.argentinaType==='nacional'&&savedFinal&&(savedFinal.home!==leadersA||savedFinal.away!==leadersB);
  if(competition.argentinaType&&regularDone&&(!competition.argentinaPlayoffs||(competition.argentinaType==='nacional'&&wrongSavedNacionalFinal)))content+='<div class="playoff-panel"><h3>Gerar jogos do mata-mata</h3><p class="muted">'+(competition.argentinaType==='primera'?'Os oito primeiros de cada zona avançam às oitavas de final.':'A geração usa os líderes atuais das zonas A e B para a final pelo primeiro acesso e monta os sete confrontos iniciais do Reducido. '+(wrongSavedNacionalFinal?'Atenção: a final salva tem participantes incorretos. Regerar os confrontos apagará os resultados já simulados do mata-mata.':''))+'</p><button class="btn" id="create-argentina-playoffs">'+(competition.argentinaPlayoffs?'Regerar confrontos':'Gerar confrontos')+'</button></div>';if(competition.argentinaPlayoffs)content+=argentinaRenderPlayoffs(competition);if(competition.division==='B'&&regularDone&&!competition.playoffs)content+='<div class="playoff-panel"><h3>Mata-mata do acesso</h3><p class="muted">A fase regular terminou. Os clubes em 3º, 4º, 5º e 6º disputarão duas vagas de acesso em semifinais de ida e volta.</p><button class="btn" id="create-access-playoffs">Gerar confrontos do acesso</button></div>';
  if(competition.division==='B'&&competition.playoffs)content+=renderPlayoffs(competition);

 }else{
  content='<div class="club-list">'+participants.map(club=>'<div class="club"><span>'+clubLink(club,club.name)+(club.state?' · '+esc(club.state):'')+'</span><span class="tag">'+clubRating(club).overall+'/100</span></div>').join('')+'</div>';
  if(!participants.length)content='<div class="empty">Nenhum clube inscrito nesta competição.</div>';
 }
 const colombiaTournaments=competition.colombiaTournaments?Object.entries(competition.colombiaTournaments):[];const chilePhaseSelector=competition.chileDivision==='Primera B'?'<div class="field phase-selector"><label for="chile-stage-view">Fase do campeonato</label><select id="chile-stage-view"><option value="regular" '+((competition.chileStageView||'regular')==='regular'?'selected':'')+'>Fase regular</option><option value="liguilla" '+(competition.chileStageView==='liguilla'?'selected':'')+'>Liguilla pelo acesso</option></select></div>':'';const argentinaPrimera=competition.argentinaType==='primera'?season.competitions.filter(c=>c.argentinaType==='primera'):[];const peruPrimera=competition.peruDivision==='Primera División'?season.competitions.filter(c=>c.peruDivision==='Primera División'):[];const paraguayPrimera=competition.paraguayDivision==='Primera División'?season.competitions.filter(c=>c.paraguayDivision==='Primera División'):[];const venezuelaPrimera=competition.venezuelaDivision==='Primera División'?season.competitions.filter(c=>c.venezuelaDivision==='Primera División'):[];const ecuadorStageSelector=competition.ecuadorDivision?'<div class="field phase-selector"><label for="ecuador-stage-view">Fase do campeonato</label><select id="ecuador-stage-view"><option value="regular" '+((competition.ecuadorStage||'regular')==='regular'?'selected':'')+'>Fase inicial</option><option value="final" '+(competition.ecuadorStage==='final'?'selected':'')+'>Fase final</option></select></div>':'';const peruStageSelector=competition.peruDivision==='Liga 2'?'<div class="field phase-selector"><label for="peru-stage-view">Fase do campeonato</label><select id="peru-stage-view"><option value="regional" '+((competition.peruStage||'regional')==='regional'?'selected':'')+'>Fase Regional</option><option value="final" '+(competition.peruStage==='final'?'selected':'')+'>Fase Final</option><option value="playoffs" '+(competition.peruStage==='playoffs'?'selected':'')+'>Playoffs de acesso</option></select></div>':'';const uruguayGroup=competition.uruguayType?(competition.uruguayType==='primera-apertura'||competition.uruguayType==='intermedio'||competition.uruguayType==='intermedio-serie'||competition.uruguayType==='primera-clausura'?'first':'second'):null;const uruguayCompetitions=uruguayGroup?season.competitions.filter(c=>uruguayGroup==='first'?['primera-apertura','intermedio','intermedio-serie','primera-clausura'].includes(c.uruguayType):['competencia','competencia-serie','segunda-regular'].includes(c.uruguayType)):[];const competitionTitle=competition.peruDivision==='Liga 2'?'Liga 2':competition.peruDivision==='Primera División'?'Primera División':competition.argentinaType==='primera'?'Primera División':uruguayGroup==='first'?'Primera División':uruguayGroup==='second'?'Segunda División':competition.name;const uruguayLabel=c=>c.uruguayType==='primera-apertura'?'Torneo Apertura':c.uruguayType==='intermedio'?'Torneo Intermedio':c.uruguayType==='intermedio-serie'?c.name:c.uruguayType==='primera-clausura'?'Torneo Clausura':c.uruguayType==='competencia'?'Torneo Competencia':c.uruguayType==='segunda-regular'?'Fase Regular':c.name;view.innerHTML='<div class="competition-detail-head"><button class="btn secondary" id="back-competitions">← Voltar às competições</button><span class="tag">TEMPORADA '+season.year+' · '+esc(season.status)+'</span></div><div class="panel"><div class="panel-head"><div><span class="eyebrow">'+esc(competition.country||'Brasil').toUpperCase()+'</span><h2>'+esc(competitionTitle)+'</h2>'+(venezuelaPrimera.length>1?'<div class="field phase-selector"><label for="venezuela-phase">Torneio da temporada</label><select id="venezuela-phase">'+venezuelaPrimera.map(c=>'<option value="'+c.id+'" '+(c.id===competition.id?'selected':'')+'>'+esc(c.venezuelaPhase)+'</option>').join('')+'</select></div>':paraguayPrimera.length>1?'<div class="field phase-selector"><label for="paraguay-phase">Torneio da temporada</label><select id="paraguay-phase">'+paraguayPrimera.map(c=>'<option value="'+c.id+'" '+(c.id===competition.id?'selected':'')+'>'+esc(c.paraguayPhase)+'</option>').join('')+'</select></div>':peruPrimera.length>1?'<div class="field phase-selector"><label for="peru-phase">Torneio da temporada</label><select id="peru-phase">'+peruPrimera.map(c=>'<option value="'+c.id+'" '+(c.id===competition.id?'selected':'')+'>'+esc(c.peruPhase)+'</option>').join('')+'</select></div>':ecuadorStageSelector?ecuadorStageSelector:peruStageSelector?peruStageSelector:argentinaPrimera.length>1?'<div class="field phase-selector"><label for="argentina-phase">Torneio da temporada</label><select id="argentina-phase">'+argentinaPrimera.map(c=>'<option value="'+c.id+'" '+(c.id===competition.id?'selected':'')+'>'+esc(c.phase)+'</option>').join('')+'</select></div>':uruguayCompetitions.length>1?'<div class="field phase-selector"><label for="uruguay-competition">Campeonato da temporada</label><select id="uruguay-competition">'+uruguayCompetitions.map(c=>'<option value="'+c.id+'" '+(c.id===competition.id?'selected':'')+'>'+esc(uruguayLabel(c))+'</option>').join('')+'</select></div>':chilePhaseSelector?chilePhaseSelector:colombiaTournaments.length>1?'<div class="field phase-selector"><label for="colombia-phase">Torneio da temporada</label><select id="colombia-phase">'+colombiaTournaments.map(([key,t])=>'<option value="'+key+'" '+(key===competition.colombiaActivePhase?'selected':'')+'>'+esc(t.label)+'</option>').join('')+'</select></div><div class="field phase-selector"><label for="colombia-stage-view">Fase</label><select id="colombia-stage-view"><option value="first" '+((competition.colombiaStageView||'first')==='first'?'selected':'')+'>Primeira fase</option><option value="second" '+(competition.colombiaStageView==='second'?'selected':'')+'>Segunda fase</option></select></div>':'')+'</div><span class="tag">'+participants.length+' CLUBES</span></div><div class="competition-tabs">'+tabs.map(([key,label])=>'<button class="competition-tab '+(section===key?'active':'')+'" data-competition-tab="'+key+'">'+label+'</button>').join('')+'</div><div class="competition-section">'+content+'</div></div>';
 document.querySelector('#back-competitions').addEventListener('click',renderCompetitions);const ecuadorStageSelect=document.querySelector('#ecuador-stage-view');if(ecuadorStageSelect)ecuadorStageSelect.addEventListener('change',()=>{const v=ecuadorStageSelect.value;if(competition.ecuadorStage==='final'&&competition.rounds?.length)competition.ecuadorFinalRounds=JSON.parse(JSON.stringify(competition.rounds));else if(competition.ecuadorStage==='regular'&&competition.rounds?.length)competition.ecuadorRegularRounds=JSON.parse(JSON.stringify(competition.rounds));competition.ecuadorStage=v;if(v==='regular'&&competition.ecuadorRegularRounds)competition.rounds=JSON.parse(JSON.stringify(competition.ecuadorRegularRounds));else if(v==='final'&&competition.ecuadorGroups){competition.rounds=JSON.parse(JSON.stringify(competition.ecuadorFinalRounds||competition.rounds||[]));}save();renderCompetitionDetail(seasonId,competitionId,section);});const paraguayPhaseSelect=document.querySelector('#paraguay-phase');if(paraguayPhaseSelect)paraguayPhaseSelect.addEventListener('change',()=>renderCompetitionDetail(seasonId,paraguayPhaseSelect.value,section));const venezuelaPhaseSelect=document.querySelector('#venezuela-phase');if(venezuelaPhaseSelect)venezuelaPhaseSelect.addEventListener('change',()=>{save();renderCompetitionDetail(seasonId,venezuelaPhaseSelect.value,section);});const peruPhaseSelect=document.querySelector('#peru-phase');if(peruPhaseSelect)peruPhaseSelect.addEventListener('change',()=>renderCompetitionDetail(seasonId,peruPhaseSelect.value,section));const peruStageSelect=document.querySelector('#peru-stage-view');if(peruStageSelect)peruStageSelect.addEventListener('change',()=>{const v=peruStageSelect.value;competition.peruStage=v;if(v==='regional'&&competition.peruRegionalRounds)competition.rounds=JSON.parse(JSON.stringify(competition.peruRegionalRounds));else if(v==='final'&&competition.peruFinalRounds)competition.rounds=JSON.parse(JSON.stringify(competition.peruFinalRounds));else if(v==='playoffs')competition.rounds=[];save();renderCompetitionDetail(seasonId,competitionId,section);});const phaseSelect=document.querySelector('#argentina-phase');if(phaseSelect)phaseSelect.addEventListener('change',()=>renderCompetitionDetail(seasonId,phaseSelect.value,section));const uruguaySelect=document.querySelector('#uruguay-competition');if(uruguaySelect)uruguaySelect.addEventListener('change',()=>renderCompetitionDetail(seasonId,uruguaySelect.value,section));const colombiaSelect=document.querySelector('#colombia-phase');if(colombiaSelect)colombiaSelect.addEventListener('change',()=>{save();competition.colombiaActivePhase=colombiaSelect.value;competition.rounds=competition.colombiaTournaments[competition.colombiaActivePhase].rounds||[];save();renderCompetitionDetail(seasonId,competitionId,section);});const chileStageSelect=document.querySelector('#chile-stage-view');if(chileStageSelect)chileStageSelect.addEventListener('change',()=>{competition.chileStageView=chileStageSelect.value;save();renderCompetitionDetail(seasonId,competitionId,section);});const colombiaStageSelect=document.querySelector('#colombia-stage-view');if(colombiaStageSelect)colombiaStageSelect.addEventListener('change',()=>{competition.colombiaStageView=colombiaStageSelect.value;save();renderCompetitionDetail(seasonId,competitionId,section);});
 view.querySelectorAll('[data-competition-tab]').forEach(b=>b.addEventListener('click',()=>renderCompetitionDetail(seasonId,competitionId,b.dataset.competitionTab)));
 view.querySelectorAll('[data-open-club]').forEach(b=>b.addEventListener('click',()=>renderClubDetail(b.dataset.openClub,{type:'competition',seasonId,competitionId,section})));
 const createVenezuelaPrimeraFinal=document.querySelector('#create-venezuela-primera-final');if(createVenezuelaPrimeraFinal)createVenezuelaPrimeraFinal.addEventListener('click',()=>{if(!venezuelaCreatePrimeraFinal(competition)){alert('Conclua as 13 rodadas para gerar os quadrangulares.');return;}save();renderCompetitionDetail(seasonId,competitionId,'games');});
  const createVenezuelaPrimeraTitle=document.querySelector('#create-venezuela-primera-title');if(createVenezuelaPrimeraTitle)createVenezuelaPrimeraTitle.addEventListener('click',()=>{if(!venezuelaCreatePrimeraTitle(competition)){alert('Conclua as seis rodadas dos quadrangulares.');return;}save();renderCompetitionDetail(seasonId,competitionId,'games');});
  const simulateVenezuelaPrimeraTitle=document.querySelector('#simulate-venezuela-primera-title');if(simulateVenezuelaPrimeraTitle)simulateVenezuelaPrimeraTitle.addEventListener('click',()=>{venezuelaSimulatePrimeraTitle(competition);save();renderCompetitionDetail(seasonId,competitionId,'games');});
  const createVenezuelaFutve2Final=document.querySelector('#create-venezuela-futve2-final');if(createVenezuelaFutve2Final)createVenezuelaFutve2Final.addEventListener('click',()=>{if(!venezuelaCreateFutve2Final(competition)){alert('Conclua a fase regional para gerar o mata-mata.');return;}save();renderCompetitionDetail(seasonId,competitionId,'games');});
  const simulateVenezuelaKnockout=document.querySelector('#simulate-venezuela-knockout');if(simulateVenezuelaKnockout)simulateVenezuelaKnockout.addEventListener('click',()=>{venezuelaSimulateKnockout(competition);save();renderCompetitionDetail(seasonId,competitionId,'games');});
  const nextVenezuelaKnockout=document.querySelector('#next-venezuela-knockout');if(nextVenezuelaKnockout)nextVenezuelaKnockout.addEventListener('click',()=>{if(!venezuelaNextKnockout(competition)){alert('Não foi possível gerar a próxima fase.');return;}save();renderCompetitionDetail(seasonId,competitionId,'games');});
  const createBoliviaKnockout=document.querySelector('#create-bolivia-knockout');if(createBoliviaKnockout)createBoliviaKnockout.addEventListener('click',()=>{if(!boliviaCreateKnockout(competition)){alert('Não foi possível gerar o mata-mata. Confira se todos os jogos dos grupos foram concluídos.');return;}save();renderCompetitionDetail(seasonId,competitionId,'games');});
  const simulateBoliviaKnockout=document.querySelector('#simulate-bolivia-knockout');if(simulateBoliviaKnockout)simulateBoliviaKnockout.addEventListener('click',()=>{boliviaSimulateKnockout(competition);save();renderCompetitionDetail(seasonId,competitionId,'games');});
  const nextBoliviaKnockout=document.querySelector('#next-bolivia-knockout');if(nextBoliviaKnockout)nextBoliviaKnockout.addEventListener('click',()=>{if(!boliviaNextKnockout(competition)){alert('Não foi possível gerar a próxima fase.');return;}save();renderCompetitionDetail(seasonId,competitionId,'games');});
  const createBoliviaIndirect=document.querySelector('#create-bolivia-indirect');if(createBoliviaIndirect)createBoliviaIndirect.addEventListener('click',()=>{if(!boliviaCreateIndirectPlayoff(competition,season)){alert('Conclua a liga e a Copa Simón Bolívar para gerar o playoff indireto.');return;}save();renderCompetitionDetail(seasonId,competitionId,'games');});
  const simulateBoliviaIndirect=document.querySelector('#simulate-bolivia-indirect');if(simulateBoliviaIndirect)simulateBoliviaIndirect.addEventListener('click',()=>{boliviaSimulateIndirectPlayoff(competition);save();renderCompetitionDetail(seasonId,competitionId,'games');});
  const createEcuadorFinal=document.querySelector('#create-ecuador-final');if(createEcuadorFinal)createEcuadorFinal.addEventListener('click',()=>{if(!ecuadorCreateFinal(competition)){alert('Não foi possível gerar a fase final. Confira se todos os jogos da fase inicial foram concluídos.');return;}save();renderCompetitionDetail(seasonId,competitionId,'games');});const createPeruFinal=document.querySelector('#create-peru-final');if(createPeruFinal)createPeruFinal.addEventListener('click',()=>{if(!peruCreateFinal(competition)){alert('Não foi possível gerar a fase final. Confira a fase regional.');return;}save();renderCompetitionDetail(seasonId,competitionId,'games');});const createPeruPlayoffs=document.querySelector('#create-peru-playoffs');if(createPeruPlayoffs)createPeruPlayoffs.addEventListener('click',()=>{if(!peruCreatePlayoffs(competition)){alert('Não foi possível gerar os playoffs. Confira os grupos.');return;}save();renderCompetitionDetail(seasonId,competitionId,'games');});const simulatePeruPlayoffs=document.querySelector('#simulate-peru-playoffs');if(simulatePeruPlayoffs)simulatePeruPlayoffs.addEventListener('click',()=>{peruSimulatePlayoffStage(competition);save();renderCompetitionDetail(seasonId,competitionId,'games');});const nextPeruPlayoffs=document.querySelector('#next-peru-playoffs');if(nextPeruPlayoffs)nextPeruPlayoffs.addEventListener('click',()=>{if(!peruCreateNextPlayoffStage(competition)){alert('Não foi possível gerar a próxima fase.');return;}save();renderCompetitionDetail(seasonId,competitionId,'games');});const createPeruPrimera=document.querySelector('#create-peru-primera');if(createPeruPrimera)createPeruPrimera.addEventListener('click',()=>{if(!peruCreatePrimeraPlayoffs(competition)){alert('Não foi possível gerar os playoffs nacionais.');return;}save();renderCompetitionDetail(seasonId,competitionId,'games');});const simulatePeruPrimera=document.querySelector('#simulate-peru-primera');if(simulatePeruPrimera)simulatePeruPrimera.addEventListener('click',()=>{peruSimulatePrimera(competition);save();renderCompetitionDetail(seasonId,competitionId,'games');});const nextPeruPrimera=document.querySelector('#next-peru-primera');if(nextPeruPrimera)nextPeruPrimera.addEventListener('click',()=>{peruNextPrimera(competition);save();renderCompetitionDetail(seasonId,competitionId,'games');});const createArgentinaPlayoffs=document.querySelector('#create-argentina-playoffs');if(createArgentinaPlayoffs)createArgentinaPlayoffs.addEventListener('click',()=>{const ok=competition.argentinaType==='primera'?argentinaBuildPrimeraPlayoffs(competition):argentinaNacionalCreatePlayoffs(competition);if(!ok){alert('Não foi possível gerar o mata-mata. Confira se todas as posições necessárias têm partidas disputadas.');return;}save();renderCompetitionDetail(seasonId,competitionId,'games');});const simulateArgentinaKnockout=document.querySelector('#simulate-argentina-knockout');if(simulateArgentinaKnockout)simulateArgentinaKnockout.addEventListener('click',()=>{argentinaSimulateKnockout(competition);save();renderCompetitionDetail(seasonId,competitionId,'games');});const generateNextArgentinaRound=document.querySelector('#generate-next-argentina-round');if(generateNextArgentinaRound)generateNextArgentinaRound.addEventListener('click',()=>{const ok=competition.argentinaType==='primera'?argentinaGenerateNextPrimeraRound(competition):argentinaGenerateNextNacionalRound(competition);if(!ok){alert('Não foi possível gerar os próximos confrontos.');return;}save();renderCompetitionDetail(seasonId,competitionId,'games');});const simulateUruguayChampionship=document.querySelector('#simulate-uruguay-championship');if(simulateUruguayChampionship)simulateUruguayChampionship.addEventListener('click',()=>{const p=competition.uruguayChampionship;if(p){const pending=p.semifinal&&!uruguayMatchWinner(p.semifinal)?p.semifinal:p.final;if(pending)uruguaySimulateMatch(pending);uruguayAdvancePrimeraFinal(competition);}save();renderCompetitionDetail(seasonId,competitionId,'games');});
 const createUruguayAccess=document.querySelector('#create-uruguay-access');if(createUruguayAccess)createUruguayAccess.addEventListener('click',()=>{if(!uruguayCreateAccessPlayoffs(competition)){alert('Não foi possível gerar o playoff. Confira a classificação da fase regular.');return;}save();renderCompetitionDetail(seasonId,competitionId,'games');});
 const simulateUruguayAccess=document.querySelector('#simulate-uruguay-access');if(simulateUruguayAccess)simulateUruguayAccess.addEventListener('click',()=>{uruguaySimulateAccessStage(competition);save();renderCompetitionDetail(seasonId,competitionId,'games');});
 const createUruguayIntermedioFinal=document.querySelector('#create-uruguay-intermedio-final');if(createUruguayIntermedioFinal)createUruguayIntermedioFinal.addEventListener('click',()=>{if(!uruguayCreateIntermedioFinal(competition)){alert('Não foi possível gerar a final. Confira se as duas séries foram concluídas.');return;}save();renderCompetitionDetail(seasonId,competitionId,'games');});
 const createUruguaySeriesFinal=document.querySelector('#create-uruguay-series-final');if(createUruguaySeriesFinal)createUruguaySeriesFinal.addEventListener('click',()=>{const ok=competition.uruguayType==='competencia'?uruguayCreateCompetenciaFinal(competition):uruguayCreateIntermedioFinal(competition);if(!ok){alert('Não foi possível gerar a final. Confira se as duas séries foram concluídas.');return;}save();renderCompetitionDetail(seasonId,competitionId,'games');});
 const simulateUruguaySeriesFinal=document.querySelector('#simulate-uruguay-series-final');if(simulateUruguaySeriesFinal)simulateUruguaySeriesFinal.addEventListener('click',()=>{const final=competition.uruguayType==='competencia'?competition.uruguayCompetenciaFinal:competition.uruguayIntermedioFinal;uruguaySimulateMatch(final.match);if(competition.uruguayType==='competencia')uruguayAdvanceCompetenciaFinal(competition);else uruguayAdvanceIntermedioFinal(competition);save();renderCompetitionDetail(seasonId,competitionId,'games');});
 const createPlayoffs=document.querySelector('#create-access-playoffs');
 if(createPlayoffs)createPlayoffs.addEventListener('click',()=>{if(createAccessPlayoffs(competition)){save();renderCompetitionDetail(seasonId,competitionId,'games');}});
 const playoffSim=document.querySelector('#simulate-playoff-leg');
 if(playoffSim)playoffSim.addEventListener('click',()=>{simulateNextPlayoffLeg(competition);save();renderCompetitionDetail(seasonId,competitionId,'games');});
 const createChileTitleTie=document.querySelector('#create-chile-title-tie');if(createChileTitleTie)createChileTitleTie.addEventListener('click',()=>{if(chileCreateTitleTie(competition)){save();renderCompetitionDetail(seasonId,competitionId,'games');}});
 const simulateChileTitleTie=document.querySelector('#simulate-chile-title-tie');if(simulateChileTitleTie)simulateChileTitleTie.addEventListener('click',()=>{chileSimulateTitleTie(competition.chileTitleTie);save();renderCompetitionDetail(seasonId,competitionId,'games');});
 const createChilePlayoffs=document.querySelector('#create-chile-playoffs');if(createChilePlayoffs)createChilePlayoffs.addEventListener('click',()=>{if(!chileCreatePromotionPlayoff(competition)){alert('Não foi possível gerar a liguilla. Confira a classificação e os jogos.');return;}save();renderCompetitionDetail(seasonId,competitionId,'games');});
 const simulateChilePlayoffs=document.querySelector('#simulate-chile-playoffs');if(simulateChilePlayoffs)simulateChilePlayoffs.addEventListener('click',()=>{chileSimulatePromotionStage(competition);save();renderCompetitionDetail(seasonId,competitionId,'games');});
 const nextChilePlayoffs=document.querySelector('#next-chile-playoffs');if(nextChilePlayoffs)nextChilePlayoffs.addEventListener('click',()=>{if(!chileCreateNextPromotionStage(competition)){alert('Não foi possível gerar a próxima fase.');return;}save();renderCompetitionDetail(seasonId,competitionId,'games');});
 const createColombiaPlayoffs=document.querySelector('#create-colombia-playoffs');if(createColombiaPlayoffs)createColombiaPlayoffs.addEventListener('click',()=>{if(!colombiaCreatePlayoffs(competition)){alert('Não foi possível gerar a fase final. Confira se a fase regular está completa.');return;}save();renderCompetitionDetail(seasonId,competitionId,'games');});
 const simulateColombiaPlayoff=document.querySelector('#simulate-colombia-playoff');if(simulateColombiaPlayoff)simulateColombiaPlayoff.addEventListener('click',()=>{colombiaSimulatePlayoff(competition);save();renderCompetitionDetail(seasonId,competitionId,'games');});
 const nextColombiaPlayoff=document.querySelector('#next-colombia-playoff');if(nextColombiaPlayoff)nextColombiaPlayoff.addEventListener('click',()=>{if(!colombiaCreateNextPlayoffStage(competition)){alert('Não foi possível gerar a próxima fase.');return;}save();renderCompetitionDetail(seasonId,competitionId,'games');});
 const createColombiaPromotion=document.querySelector('#create-colombia-promotion');if(createColombiaPromotion)createColombiaPromotion.addEventListener('click',()=>{const s=colombiaPromotionStatus(competition),stage=createColombiaPromotion.dataset.promotionStage,state=competition.colombiaPromotion=competition.colombiaPromotion||{};if(stage==='grandFinal'&&s.pair?.length===2){const annual=s.annual||[];const ordered=[...s.pair].sort((x,y)=>(annual.findIndex(r=>r.id===x))-(annual.findIndex(r=>r.id===y)));state.grandFinal=colombiaCreateTie(ordered[0],ordered[1],'Grande Final pelo acesso');}else if(stage==='repechage'&&s.pair?.length===2){const annual=s.annual||[];const ordered=[...s.pair].sort((x,y)=>(annual.findIndex(r=>r.id===x))-(annual.findIndex(r=>r.id===y)));state.repechage=colombiaCreateTie(ordered[0],ordered[1],'Repechaje pelo acesso');}save();renderCompetitionDetail(seasonId,competitionId,section);});
 const simulateColombiaPromotion=document.querySelector('#simulate-colombia-promotion');if(simulateColombiaPromotion)simulateColombiaPromotion.addEventListener('click',()=>{const stage=simulateColombiaPromotion.dataset.promotionStage,tie=competition.colombiaPromotion?.[stage];if(colombiaSimulatePromotionTie(tie)){save();renderCompetitionDetail(seasonId,competitionId,section);}});
 const simulateSudamericanaPreliminary=document.querySelector('#simulate-sudamericana-preliminary');if(simulateSudamericanaPreliminary)simulateSudamericanaPreliminary.addEventListener('click',()=>{(competition.sudamericanaPreliminaryTies||[]).forEach(libertadoresSimulateTie);save();renderCompetitionDetail(seasonId,competitionId,'games');});
 const createSudamericanaGroups=document.querySelector('#create-sudamericana-groups');if(createSudamericanaGroups)createSudamericanaGroups.addEventListener('click',()=>{if(!sudamericanaCreateGroups(competition)){alert('A fase de grupos depende da conclusão da fase preliminar e da terceira fase da Libertadores.');return;}save();renderCompetitionDetail(seasonId,competitionId,'games');});
 const createSudamericanaPlayoffs=document.querySelector('#create-sudamericana-playoffs');if(createSudamericanaPlayoffs)createSudamericanaPlayoffs.addEventListener('click',()=>{if(!sudamericanaCreatePlayoffs(competition)){alert('Conclua a fase de grupos da Sudamericana e da Libertadores para gerar os playoffs.');return;}save();renderCompetitionDetail(seasonId,competitionId,'games');});
 const simulateSudamericanaStage=document.querySelector('#simulate-sudamericana-stage');if(simulateSudamericanaStage)simulateSudamericanaStage.addEventListener('click',()=>{sudamericanaSimulateKnockout(competition);save();renderCompetitionDetail(seasonId,competitionId,'games');});
 const nextSudamericanaStage=document.querySelector('#next-sudamericana-stage');if(nextSudamericanaStage)nextSudamericanaStage.addEventListener('click',()=>{if(!sudamericanaNextStage(competition)){alert('Não foi possível gerar a próxima fase da Sudamericana.');return;}save();renderCompetitionDetail(seasonId,competitionId,'games');});
 const simulateLibertadores=document.querySelector('#simulate-libertadores-stage');if(simulateLibertadores)simulateLibertadores.addEventListener('click',()=>{libertadoresSimulateStage(competition);save();renderCompetitionDetail(seasonId,competitionId,'games');});
 const nextLibertadores=document.querySelector('#next-libertadores-stage');if(nextLibertadores)nextLibertadores.addEventListener('click',()=>{if(!libertadoresNextStage(competition)){alert('Não foi possível gerar a próxima fase da Libertadores.');return;}save();renderCompetitionDetail(seasonId,competitionId,'games');});
 const createLibertadoresRound16=document.querySelector('#create-libertadores-round16');if(createLibertadoresRound16)createLibertadoresRound16.addEventListener('click',()=>{if(!libertadoresCreateRoundOf16(competition)){alert('Não foi possível gerar as oitavas de final. Confira a conclusão dos oito grupos.');return;}save();renderCompetitionDetail(seasonId,competitionId,'games');});
 const simulate=document.querySelector('#simulate-rounds');
 if(simulate)simulate.addEventListener('click',()=>{const count=Number(document.querySelector('#simulate-count').value)||5;const pending=(competition.rounds||[]).filter(r=>r.matches.some(m=>m.homeGoals===null));const selected=pending.slice(0,Math.min(5,Math.max(1,count)));if(!selected.length){alert('Todas as rodadas já foram simuladas.');return;}selected.forEach(r=>r.matches.forEach(m=>{if(m.homeGoals===null)simulateMatch(m);}));season.status='Em andamento';save();renderCompetitionDetail(seasonId,competitionId,'games');});
}function renderSeasons(){
 view.innerHTML=`<div class="panel"><div class="panel-head"><h3>Temporadas</h3><span class="tag">${seasons.length} CADASTRADAS</span></div><p class="muted">Cada temporada mantém suas próprias competições, participantes e regulamentos. Criar uma nova temporada não altera as anteriores.</p><form id="season-form" class="form-row"><div class="field"><label for="season-year">Ano da nova temporada</label><input id="season-year" type="number" min="2026" max="2100" value="${Math.max(2027,...seasons.map(s=>s.year+1))}" required></div><div class="field"><label>Participantes iniciais</label><select id="season-copy"><option value="copy">Copiar participantes da temporada mais recente</option><option value="empty">Começar com competições vazias</option></select></div><button class="btn" type="submit">Criar temporada</button></form></div>
 <div class="panel"><h3>Temporadas cadastradas</h3><div class="season-list">${[...seasons].sort((a,b)=>b.year-a.year).map(s=>`<div class="season-card"><div><strong>${s.year}</strong><small>${esc(s.status)} · ${s.competitions.reduce((n,c)=>n+c.participants.length,0)} vínculos de clubes</small></div><button class="btn secondary" data-open-season="${s.id}">Gerenciar</button></div>`).join('')}</div></div><div id="season-detail"></div>`;
 document.querySelector('#season-form').addEventListener('submit',e=>{e.preventDefault();const year=Number(document.querySelector('#season-year').value);if(seasons.some(s=>s.year===year)){alert('Já existe uma temporada para esse ano.');return;}const base=latestSeason(),copy=document.querySelector('#season-copy').value==='copy';seasons.push({id:uid(),year,status:'Preparação',createdAt:new Date().toISOString(),competitions:[{id:uid(),name:'Campeonato Brasileiro · Série A',country:'Brasil',division:'A',participants:copy?[...base.competitions.find(c=>c.division==='A').participants]:[],format:'A definir'},{id:uid(),name:'Campeonato Brasileiro · Série B',country:'Brasil',division:'B',participants:copy?[...base.competitions.find(c=>c.division==='B').participants]:[],format:'A definir'}]});save();renderSeasons();});
 document.querySelectorAll('[data-open-season]').forEach(b=>b.addEventListener('click',()=>renderSeasonDetail(b.dataset.openSeason)));
}
function renderSeasonDetail(id){
 const s=seasons.find(x=>x.id===id);if(!s)return;
 const target=document.querySelector('#season-detail');
 target.innerHTML=`<div class="panel"><div class="panel-head"><div><span class="eyebrow">GERENCIAMENTO</span><h3>Temporada ${s.year}</h3></div><select id="season-status"><option ${s.status==='Preparação'?'selected':''}>Preparação</option><option ${s.status==='Em andamento'?'selected':''}>Em andamento</option><option ${s.status==='Concluída'?'selected':''}>Concluída</option></select></div><p class="muted">Edite os participantes desta temporada sem alterar o cadastro geral de clubes nem outras temporadas.</p>${s.competitions.map(c=>`<div class="competition-manage"><div class="panel-head"><h3>${esc(c.name)}</h3><span class="tag">${c.participants.length} / ${c.argentinaType==='nacional'?36:c.argentinaType==='primera'?30:c.colombiaType?.startsWith('segunda-')?16:c.colombiaType?20:20} CLUBES</span></div><div class="field"><label for="country-${c.id}">País da competição</label><input id="country-${c.id}" data-competition-country="${c.id}" value="${esc(c.country||'Brasil')}" maxlength="60" required></div><div class="club-list">${c.participants.map(cid=>{const club=getClub(cid);return club?`<div class="club"><span>${esc(club.name)} · ${esc(club.state)}</span><button data-remove-participant="${c.id}|${cid}">Remover</button></div>`:''}).join('')}</div><div class="form-row add-participant"><div class="field"><label for="add-${c.id}">Adicionar clube cadastrado</label><select id="add-${c.id}"><option value="">Selecione um clube</option>${clubs.filter(cl=>!c.participants.includes(cl.id)).sort((a,b)=>a.name.localeCompare(b.name,'pt-BR')).map(cl=>'<option value="'+cl.id+'">'+esc(cl.name)+' · '+esc(cl.state)+'</option>').join('')}</select></div><span></span><button class="btn" data-add-participant="${c.id}">Adicionar à Série ${c.division}</button></div></div>`).join('')}</div>`;
 document.querySelector('#season-status').addEventListener('change',e=>{s.status=e.target.value;save();renderSeasons();renderSeasonDetail(id);});
 target.querySelectorAll('[data-competition-country]').forEach(select=>select.addEventListener('change',()=>{const comp=s.competitions.find(c=>c.id===select.dataset.competitionCountry);if(comp){comp.country=select.value;save();renderSeasons();renderSeasonDetail(id);}}));
 target.querySelectorAll('[data-remove-participant]').forEach(b=>b.addEventListener('click',()=>{const [compId,clubId]=b.dataset.removeParticipant.split('|');const comp=s.competitions.find(c=>c.id===compId);comp.participants=comp.participants.filter(x=>x!==clubId);save();renderSeasonDetail(id);}));
 target.querySelectorAll('[data-add-participant]').forEach(b=>b.addEventListener('click',()=>{const comp=s.competitions.find(c=>c.id===b.dataset.addParticipant),select=document.querySelector('#add-'+comp.id),clubId=select.value;if(!clubId)return;if(comp.participants.length>=(comp.argentinaType==='nacional'?36:comp.argentinaType==='primera'?30:20)){alert('Esta competição já atingiu o limite de participantes.');return;}if(!comp.argentinaType&&s.competitions.some(other=>other!==comp&&other.participants.includes(clubId))){alert('Este clube já está inscrito na outra divisão desta temporada.');return;}comp.participants.push(clubId);save();renderSeasonDetail(id);}));
}
const competitionsNav=document.querySelector('#competitions-nav'),competitionSubmenu=document.querySelector('#competition-submenu');
competitionsNav.addEventListener('click',()=>{const opening=competitionSubmenu.hidden;competitionSubmenu.hidden=!opening;competitionsNav.setAttribute('aria-expanded',String(opening));if(opening){activeCompetitionContinent=null;document.querySelectorAll('[data-continent]').forEach(x=>x.classList.remove('active'));render('competicoes');}});
document.querySelectorAll('[data-continent]').forEach(button=>button.addEventListener('click',()=>{activeCompetitionContinent=button.dataset.continent;document.querySelectorAll('[data-continent]').forEach(x=>x.classList.toggle('active',x===button));render('competicoes');}));
document.querySelectorAll('.nav-item[data-view]:not(#competitions-nav)').forEach(b=>b.addEventListener('click',()=>{competitionSubmenu.hidden=true;competitionsNav.setAttribute('aria-expanded','false');render(b.dataset.view);}));
repairArgentinaAdvancedGroups();
render();
