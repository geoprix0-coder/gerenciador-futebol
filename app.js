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
 const add=(name,state,id)=>{const key=slugify(name);if(!clubs.some(c=>slugify(c.name)===key))clubs.push({id:id||key,name,state:state||'',slug:key});};
 old.forEach(c=>add(c.name,c.state,c.id));
 SEED_2026.forEach(([name,state])=>add(name,state));
 [...ARGENTINA_PRIMERA_2026.A,...ARGENTINA_PRIMERA_2026.B,...ARGENTINA_NACIONAL_2026.A,...ARGENTINA_NACIONAL_2026.B].forEach(name=>add(name,''));
 const byName=name=>clubs.find(c=>slugify(c.name)===slugify(name)).id;
 const a=SEED_2026.filter(x=>x[2]==='A').map(x=>byName(x[0]));
 const b=SEED_2026.filter(x=>x[2]==='B').map(x=>byName(x[0]));
 const ids=names=>names.map(byName);
 const argA=ids([...ARGENTINA_PRIMERA_2026.A,...ARGENTINA_PRIMERA_2026.B]);
 const argB=ids([...ARGENTINA_NACIONAL_2026.A,...ARGENTINA_NACIONAL_2026.B]);
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
const labels={inicio:'Painel inicial',competicoes:'Competições',clubes:'Clubes',temporadas:'Temporadas',partidas:'Partidas',classificacao:'Classificação',historico:'Histórico'};
function save(){data={clubs,seasons};localStorage.setItem(STORE,JSON.stringify(data));}
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
seasons.forEach(season=>season.competitions.forEach(competition=>{if(!competition.country)competition.country='Brasil';}));
clubs.forEach(initializeClubRating);
save();
function clubRating(club){initializeClubRating(club);return {overall:Number(club.overall),attack:Number(club.attack),defense:Number(club.defense)};}
function clubLink(club,label){return '<button class="club-link" data-open-club="'+club.id+'">'+esc(label||club.name)+'</button>';}
function latestSeason(){return [...seasons].sort((a,b)=>b.year-a.year)[0];}
function render(page='inicio'){
 title.textContent=labels[page]||'Painel inicial';
 document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.view===page));
 if(page==='inicio')renderHome();
 else if(page==='clubes')renderClubs();
 else if(page==='temporadas')renderSeasons();
 else if(page==='competicoes')renderCompetitions();
 else {const desc={partidas:'As partidas serão geradas pelo calendário e terão resultados simulados automaticamente.',classificacao:'A classificação será calculada automaticamente a partir dos resultados das partidas.',historico:'As temporadas concluídas e as avaliações dos clubes ficarão registradas aqui.'};view.innerHTML='<div class="panel"><h3>'+labels[page]+'</h3><p class="muted">'+desc[page]+'</p><div class="empty">Este módulo será desenvolvido em uma próxima etapa.</div></div>';}
}
function resetTestMatches(){
 const hasTestData=seasons.some(s=>s.year!==2026||s.countryAdvancements||s.competitions.some(c=>(Array.isArray(c.rounds)&&c.rounds.length)||c.playoffs));
 if(!hasTestData){alert('O sistema já está no estado inicial da temporada de 2026.');return;}
 if(!confirm('Isso apagará todos os calendários, resultados, mata-matas e temporadas posteriores a 2026. O sistema voltará à temporada de 2026 e restaurará a força inicial dos clubes. Os cadastros dos clubes e os participantes de 2026 serão mantidos. Continuar?'))return;
 seasons=seasons.filter(s=>s.year===2026);
 seasons.forEach(s=>{
  delete s.countryAdvancements;
  s.competitions.forEach(c=>{delete c.rounds;delete c.playoffs;});
  s.status='Preparação';
 });
 clubs.forEach(club=>{initializeClubRating(club);club.overall=club.initialRating.overall;club.attack=club.initialRating.attack;club.defense=club.initialRating.defense;});
 save();render('inicio');alert('O sistema voltou à temporada de 2026. Temporadas futuras, calendários, resultados, mata-matas e alterações de força foram resetados.');
}
function renderHome(){
 const season=latestSeason();
 view.innerHTML=`
 <div class="welcome"><span class="eyebrow">SEU UNIVERSO DE FUTEBOL</span><h2>Uma nova temporada começa aqui.</h2><p>Gerencie clubes, organize competições e simule campeonatos. Os resultados criados aqui formarão a história própria do seu futebol.</p></div>
 <div class="grid"><div class="card"><small>CLUBES CADASTRADOS</small><strong>${clubs.length}</strong></div><div class="card"><small>COMPETIÇÕES INICIAIS</small><strong>02</strong></div><div class="card"><small>TEMPORADAS CADASTRADAS</small><strong>${seasons.length}</strong></div></div>
 <div class="panel"><div class="panel-head"><h3>Primeira temporada · ${season.year}</h3><span class="tag">${esc(season.status)}</span></div>${season.competitions.map(c=>`<div class="competition-row"><div><strong>${esc(c.name)}</strong><small>${c.participants.length} clubes · Formato: ${esc(c.format)}</small></div><span class="tag">Cadastrada</span></div>`).join('')}</div>
 <div class="panel"><h3>Regra de evolução dos clubes</h3><p class="muted">A força muda exclusivamente pelos resultados simulados. Promoção e rebaixamento não alteram ratings automaticamente.</p></div>
 <div class="panel reset-panel"><div><h3>Ferramentas da fase de testes</h3><p class="muted">Apaga tudo que foi simulado, remove as temporadas posteriores e retorna o sistema a 2026. Os clubes e os participantes de 2026 serão preservados.</p></div><button class="btn danger" id="reset-test-games">Resetar jogos de teste</button></div>`;
 document.querySelector('#reset-test-games').addEventListener('click',resetTestMatches);
}
function renderClubDetail(clubId,back={type:'clubs'}){
 const club=getClub(clubId);if(!club)return;const rating=clubRating(club);
 const memberships=seasons.flatMap(s=>s.competitions.filter(c=>c.participants.includes(clubId)).map(c=>({year:s.year,name:c.name})));
 view.innerHTML='<div class="competition-detail-head"><button class="btn secondary" id="club-back">← Voltar</button><span class="tag">FICHA DO CLUBE</span></div><div class="panel"><div class="panel-head"><div><span class="eyebrow">CADASTRO DO CLUBE</span><h2>'+esc(club.name)+'</h2><p class="muted">'+esc(club.state||'Estado não informado')+'</p></div><span class="tag">'+memberships.length+' INSCRIÇÕES</span></div><h3>Força da equipe</h3><p class="muted">Escala provisória de 1 a 100. O valor 50 é neutro e pode ser ajustado nesta ficha.</p><form id="club-rating-form" class="rating-grid"><div class="field"><label for="rating-overall">Força geral</label><input id="rating-overall" type="number" min="1" max="100" value="'+rating.overall+'" required></div><div class="field"><label for="rating-attack">Ataque</label><input id="rating-attack" type="number" min="1" max="100" value="'+rating.attack+'" required></div><div class="field"><label for="rating-defense">Defesa</label><input id="rating-defense" type="number" min="1" max="100" value="'+rating.defense+'" required></div><button class="btn" type="submit">Salvar força</button></form><div class="rating-bars"><div><span>Geral</span><strong>'+rating.overall+'/100</strong><i><b style="width:'+rating.overall+'%"></b></i></div><div><span>Ataque</span><strong>'+rating.attack+'/100</strong><i><b style="width:'+rating.attack+'%"></b></i></div><div><span>Defesa</span><strong>'+rating.defense+'/100</strong><i><b style="width:'+rating.defense+'%"></b></i></div></div><h3 class="club-memberships-title">Competições</h3>'+(memberships.length?memberships.map(m=>'<div class="competition-row"><strong>'+esc(m.name)+'</strong><span class="tag">'+m.year+'</span></div>').join(''):'<div class="empty">Este clube ainda não está inscrito em uma competição.</div>')+'</div>';
 document.querySelector('#club-rating-form').addEventListener('submit',e=>{e.preventDefault();const values=['overall','attack','defense'].map(k=>Number(document.querySelector('#rating-'+k).value));if(values.some(v=>!Number.isInteger(v)||v<1||v>100)){alert('Informe valores inteiros entre 1 e 100.');return;}[club.overall,club.attack,club.defense]=values;save();renderClubDetail(clubId,back);});
 document.querySelector('#club-back').addEventListener('click',()=>{if(back.type==='competition')renderCompetitionDetail(back.seasonId,back.competitionId,back.section);else render('clubes');});
}
function renderClubs(){
 view.innerHTML=`<div class="panel"><div class="panel-head"><h3>Cadastro de clubes</h3><span class="tag">CADASTRO ÚNICO</span></div><p class="muted">Cada clube existe uma única vez no cadastro e pode participar de várias temporadas e divisões.</p><form id="club-form"><div class="form-row"><div class="field"><label for="club-name">Nome do clube</label><input id="club-name" required maxlength="70" placeholder="Ex.: Clube de Futebol"></div><div class="field"><label for="club-state">Estado (UF)</label><input id="club-state" maxlength="2" placeholder="Ex.: MG"></div><button class="btn" type="submit">Adicionar clube</button></div></form></div>
 <div class="panel"><div class="panel-head"><h3>Clubes cadastrados</h3><span class="tag">${clubs.length} REGISTROS</span></div>${clubs.length?'<div class="club-list">'+[...clubs].sort((a,b)=>a.name.localeCompare(b.name,'pt-BR')).map(c=>'<div class="club"><span>'+clubLink(c,c.name)+(c.state?' · '+esc(c.state):'')+'</span></div>').join('')+'</div>':'<div class="empty">Nenhum clube cadastrado.</div>'}</div>`;
 view.querySelectorAll('[data-open-club]').forEach(b=>b.addEventListener('click',()=>renderClubDetail(b.dataset.openClub)));
 document.querySelector('#club-form').addEventListener('submit',e=>{e.preventDefault();const name=document.querySelector('#club-name').value.trim(),state=document.querySelector('#club-state').value.trim().toUpperCase();if(!name)return;if(clubs.some(c=>slugify(c.name)===slugify(name))){alert('Este clube já está cadastrado.');return;}const club={id:uid(),name,state,slug:slugify(name)};initializeClubRating(club);clubs.push(club);save();renderClubs();});
}
function countrySeason(country){
 return [...seasons].filter(season=>season.competitions.some(c=>(c.country||'Brasil')===country)).sort((a,b)=>b.year-a.year)[0]||null;
}
function countrySeasonReady(country,season){
 if(!season||season.countryAdvancements?.[country])return false;
 const competitions=season.competitions.filter(c=>(c.country||'Brasil')===country);
 if(!competitions.length)return false;
 return competitions.every(c=>{
  const rounds=c.rounds||[];
  const regularDone=rounds.length>0&&rounds.every(r=>r.matches.length>0&&r.matches.every(m=>m.homeGoals!==null&&m.awayGoals!==null));
  if(!regularDone)return false;
  if(country==='Argentina'&&!c.argentinaPlayoffs?.completed)return false;
  if(country==='Brasil'&&c.division==='B'&&c.participants.length>=6){
   const ties=c.playoffs?.ties||[];
   return ties.length>0&&ties.every(t=>!!playoffWinner(t));
  }
  return true;
 });
}
function advanceCountrySeason(country,sourceSeasonId){
 const source=seasons.find(s=>s.id===sourceSeasonId);
 if(!countrySeasonReady(country,source)){alert('Ainda existem jogos pendentes neste país.');return;}
 const sourceComps=source.competitions.filter(c=>(c.country||'Brasil')===country);
 const divisions={A:sourceComps.find(c=>c.division==='A'),B:sourceComps.find(c=>c.division==='B')};
 const nextParticipants=new Map(sourceComps.map(c=>[c.id,[...c.participants]]));
 const nextZones=new Map();
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
  target.competitions.push({...Object.fromEntries(Object.entries(comp).filter(([k])=>!['rounds','playoffs','argentinaPlayoffs'].includes(k))),id:uid(),name:comp.name,country,division:comp.division||'',participants:nextParticipants.get(comp.id)||[...comp.participants],...(nextZones.has(comp.id)?{zones:nextZones.get(comp.id)}:{}),format:comp.format||'A definir'});
 });
 save();renderCompetitions();
 alert(country==='Brasil'&&divisions.A&&divisions.B?'Temporada '+nextYear+' criada! Os quatro últimos da Série A foram rebaixados, e os quatro promovidos da Série B foram definidos. As forças acumuladas dos clubes foram preservadas.':'Temporada '+nextYear+' criada! Os participantes e as forças acumuladas dos clubes foram preservados.');
}
function renderCompetitions(){
 const countries=[...new Set(seasons.flatMap(s=>s.competitions.map(c=>c.country||'Brasil')))].sort((a,b)=>a.localeCompare(b,'pt-BR'));
 const countrySections=countries.map(country=>{
  const current=countrySeason(country);
  const canAdvance=countrySeasonReady(country,current);
  return '<section class="country-group"><div class="country-heading"><h2>'+esc(country)+'</h2><div class="country-heading-actions"><span class="tag">'+seasons.reduce((n,s)=>n+s.competitions.filter(c=>(c.country||'Brasil')===country).length,0)+' COMPETIÇÕES</span>'+(canAdvance?'<button class="btn country-advance" data-advance-country="'+esc(country)+'" data-source-season="'+current.id+'">Avançar para temporada seguinte →</button>':'')+'</div></div>'+[...seasons].sort((a,b)=>b.year-a.year).map(s=>{const list=s.competitions.filter(c=>(c.country||'Brasil')===country);if(!list.length)return '';const primera=list.filter(c=>c.argentinaType==='primera');const others=list.filter(c=>c.argentinaType!=='primera');let html='<h3 class="season-heading">Temporada '+s.year+'</h3>';if(primera.length){html+='<button class="competition-open" data-open-competition="'+s.id+'|'+primera[0].id+'"><span><strong>Primera División</strong><small>Apertura e Clausura · '+primera[0].participants.length+' participantes</small></span><span class="competition-open-action">Abrir campeonato →</span></button>';}html+=others.map(c=>'<button class="competition-open" data-open-competition="'+s.id+'|'+c.id+'"><span><strong>'+esc(c.name)+'</strong><small>'+c.participants.length+' participantes · Formato: '+esc(c.format)+'</small></span><span class="competition-open-action">Abrir competição →</span></button>').join('');return html;}).join('')+'</section>';
 }).join('');
 view.innerHTML='<div class="panel"><div class="panel-head"><h3>Competições por país</h3><span class="tag">'+countries.length+' PAÍS(ES)</span></div><p class="muted">O botão de avanço aparece quando todas as partidas e fases decisivas dos campeonatos daquele país estiverem concluídas.</p>'+(countrySections||'<div class="empty">Nenhuma competição cadastrada.</div>')+'</div>';
 view.querySelectorAll('[data-open-competition]').forEach(b=>b.addEventListener('click',()=>{const [seasonId,competitionId]=b.dataset.openCompetition.split('|');renderCompetitionDetail(seasonId,competitionId);}));
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
 if(winners.length===1){p.champion=winners[0];p.completed=true;return true;}
 const next=[];
 for(let i=0;i<winners.length;i+=2)next.push(argentinaCreateSingleTie(winners[i],winners[i+1],['Quartas de final','Semifinais','Final'][Math.log2(16/winners.length)]||'Próxima fase'));
 const names={8:'Quartas de final',4:'Semifinais',2:'Final'};
 p.rounds.push({name:names[winners.length]||'Próxima fase',ties:next});
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
 return argentinaAdvanceNacionalRound(competition);
}
function argentinaAdvanceNacionalRound(competition){
 const p=competition.argentinaPlayoffs;if(!p)return false;
 const current=p.rounds[p.rounds.length-1];if(!current||!argentinaRoundComplete(current))return false;
 const winners=current.ties.map(argentinaTieWinner);
 if(winners.length===1){p.promotedReduced=winners[0];p.completed=true;p.stage='concluido';return true;}
 if(p.stage==='reducido-inicial'){
  const entrants=[p.finalLoser,...winners];p.rounds.push({name:'Segunda fase do Reducido · 8 clubes',ties:Array.from({length:4},(_,i)=>argentinaCreateSingleTie(entrants[i],entrants[7-i],'Segunda fase · '+(i+1)))});p.stage='reducido-quartas';
 }else if(p.stage==='reducido-quartas'){
  p.rounds.push({name:'Semifinais do Reducido',ties:[argentinaCreateTwoLegTie(winners[0],winners[1],'Semifinal 1'),argentinaCreateTwoLegTie(winners[2],winners[3],'Semifinal 2')]});p.stage='reducido-semis';
 }else if(p.stage==='reducido-semis'){
  p.rounds.push({name:'Final do Reducido',ties:[argentinaCreateTwoLegTie(winners[0],winners[1],'Final')]});p.stage='reducido-final';
 }else if(p.stage==='reducido-final'){
  p.promotedReduced=winners[0];p.completed=true;p.stage='concluido';
 }
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
 if(p.kind==='primera')return '<div class="playoff-panel"><h3>Mata-mata · '+esc(competition.phase)+'</h3><p class="muted">Oitavas, quartas, semifinais e final em jogo único. Melhor campanha tem mando; empate após a prorrogação vai aos pênaltis.</p>'+p.rounds.map(r=>'<h4 class="season-heading">'+esc(r.name)+'</h4>'+r.ties.map(renderTie).join('')).join('')+(p.completed?'<p class="access-confirmation">Campeão: '+esc(getClub(p.champion).name)+'</p>':'<button class="btn" id="simulate-argentina-knockout">Simular '+esc(p.rounds[p.rounds.length-1].name)+'</button>')+'</div>';
 return '<div class="playoff-panel"><h3>Mata-mata · Primera Nacional</h3><p class="muted">Final pelo 1º acesso: campeões das duas zonas, em jogo único. O Reducido começa com os 2º ao 8º colocados de cada zona (14 clubes); na segunda fase, entram os sete vencedores da primeira fase mais o perdedor da final pelo 1º acesso.</p>'+renderTie(p.final)+'<p class="promoted-name">'+(p.promotedDirect?'Acesso direto: '+esc(getClub(p.promotedDirect).name):'')+'</p>'+p.rounds.map(r=>'<h4 class="season-heading">'+esc(r.name)+'</h4>'+r.ties.map(renderTie).join('')).join('')+(p.completed?'<p class="access-confirmation">Segundo acesso: '+esc(getClub(p.promotedReduced).name)+'</p>':'<button class="btn" id="simulate-argentina-knockout">Simular '+esc(p.stage==='reducido-inicial'?'final pelo 1º acesso e primeira fase do Reducido':p.rounds[p.rounds.length-1]?.name||'mata-mata')+'</button>')+'</div>';
}
function argentinaSimulateKnockout(competition){
 if(competition.argentinaType==='nacional')argentinaEnsureNacionalFinal(competition);
 const p=competition.argentinaPlayoffs;if(!p||p.completed)return;
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
 if(competition.argentinaType){buildArgentinaSchedule(competition);return;}
 const teams=[...competition.participants];if(teams.length<2)return null;
 if(teams.length%2)teams.push(null);
 const size=teams.length,half=size/2,first=[];
 for(let round=0;round<size-1;round++){
  const matches=[];
  for(let i=0;i<half;i++){const a=teams[i],b=teams[size-1-i];if(a&&b){const home=(round+i)%2===0?a:b,away=home===a?b:a;matches.push({home,away,homeGoals:null,awayGoals:null});}}
  first.push({number:round+1,matches});teams.splice(1,0,teams.pop());
 }
 competition.rounds=first.concat(first.map((r,i)=>({number:size-1+i+1,matches:r.matches.map(m=>({home:m.away,away:m.home,homeGoals:null,awayGoals:null}))})));
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
function renderCompetitionDetail(seasonId,competitionId,section='table'){
 const season=seasons.find(s=>s.id===seasonId),competition=season?.competitions.find(c=>c.id===competitionId);if(!season||!competition)return renderCompetitions();
 const participants=competition.participants.map(getClub).filter(Boolean).sort((a,b)=>a.name.localeCompare(b.name,'pt-BR'));
 if(section==='games'&&!competition.rounds?.length&&participants.length>=2){buildSchedule(competition);save();}
 const tabs=[['table','Classificação'],['games','Jogos'],['clubs','Clubes']];
 let content='';
 if(section==='table'){
  const standings=getStandings(competition);
  if(competition.argentinaType){const zones=['A','B'];content='<div class="argentina-rules"><p>'+esc(argentinaCompetitionDescription(competition))+'</p></div><div class="table-legend">'+(competition.argentinaType==='primera'?'<span class="legend-item playoff">Playoffs · 1º ao 8º de cada zona</span>':'<span class="legend-item access">Final pelo acesso · 1º de cada zona</span><span class="legend-item playoff">Reducido · 2º ao 8º</span><span class="legend-item relegation">Rebaixamento · 17º e 18º</span>')+'</div>'+zones.map(z=>'<h3 class="season-heading">Zona '+z+'</h3><div class="table-wrap"><table class="standings"><thead><tr><th>#</th><th>Clube</th><th>P</th><th>J</th><th>V</th><th>E</th><th>D</th><th>GP</th><th>GC</th><th>SG</th></tr></thead><tbody>'+argentinaZoneStandings(competition,z).map((r,i)=>{const rank=i+1;const rowClass=competition.argentinaType==='primera'?(rank<=8?'zone-playoff':''):rank===1?'zone-access':rank<=8?'zone-playoff':rank>=17?'zone-relegation':'';return '<tr class="'+rowClass+'"><td>'+rank+'</td><td class="team-name">'+clubLink(r.club,r.club.name)+'</td><td>'+r.points+'</td><td>'+r.played+'</td><td>'+r.wins+'</td><td>'+r.draws+'</td><td>'+r.losses+'</td><td>'+r.gf+'</td><td>'+r.ga+'</td><td>'+(r.gf-r.ga)+'</td></tr>';}).join('')+'</tbody></table></div>').join('');if(competition.argentinaType==='primera'&&competition.phase==='Apertura'){const promedio=argentinaPromediosTable(season.year),period=promedio.years.length+' temporada(s): '+promedio.years.join(', ');content+='<h3 class="season-heading">Tabela de promedios</h3><p class="muted">Média calculada pelos pontos divididos pelos jogos disputados nas '+esc(period)+'. A janela cresce de 1 para 2 e depois 3 temporadas; a partir daí, considera sempre as 3 mais recentes. Somente partidas simuladas na Primera División entram no cálculo.</p><div class="table-wrap"><table class="standings"><thead><tr><th>#</th><th>Clube</th><th>Pontos</th><th>Jogos</th><th>Promedio</th></tr></thead><tbody>'+promedio.rows.map((r,i)=>'<tr><td>'+(i+1)+'</td><td class="team-name">'+clubLink(getClub(r.id),getClub(r.id)?.name||'Clube')+'</td><td>'+r.points+'</td><td>'+r.played+'</td><td>'+(r.average===null?'—':r.average.toFixed(3))+'</td></tr>').join('')+'</tbody></table></div>';const anual=argentinaAnnualTable(season.year),decision=argentinaRelegationDecision(season.year);content+='<h3 class="season-heading">Tabela anual acumulada</h3><p class="muted">Soma dos pontos do Apertura e do Clausura. A última posição define um dos rebaixamentos, exceto quando coincide com o último dos promedios.</p><div class="table-wrap"><table class="standings"><thead><tr><th>#</th><th>Clube</th><th>Pontos</th><th>Jogos</th><th>SG</th></tr></thead><tbody>'+anual.map((r,i)=>'<tr><td>'+(i+1)+'</td><td class="team-name">'+clubLink(getClub(r.id),getClub(r.id)?.name||'Clube')+'</td><td>'+r.points+'</td><td>'+r.played+'</td><td>'+(r.gf-r.ga)+'</td></tr>').join('')+'</tbody></table></div><h3 class="season-heading">Rebaixamento previsto</h3><p class="muted">'+(decision.ready?'Promedios: '+esc(getClub(decision.promedios)?.name||'')+' ('+decision.average.toFixed(3)+'). Tabela anual: '+esc(getClub(decision.annual)?.name||'')+'. Os dois clubes serão rebaixados ao encerrar a temporada.':'Ainda não definido: '+esc(decision.reason))+'</p>';}}
  else content='<div class="table-legend">'+(competition.division==='A'?'<span class="legend-item relegation">Rebaixamento · 17º ao 20º</span>':'<span class="legend-item access">Acesso direto · 1º e 2º</span><span class="legend-item playoff">Playoffs · 3º ao 6º</span>')+'</div><div class="table-wrap"><table class="standings"><thead><tr><th>#</th><th>Clube</th><th>P</th><th>J</th><th>V</th><th>E</th><th>D</th><th>GP</th><th>GC</th><th>SG</th></tr></thead><tbody>'+standings.map((r,i)=>{const rank=i+1,winner=competition.playoffs?.ties?.some(t=>playoffWinner(t)===r.id);const zone=competition.division==='A'?(rank>=17?'zone-relegation':''):(rank<=2||winner?'zone-access':rank<=6?'zone-playoff':'');return '<tr class="'+zone+'"><td>'+rank+'</td><td class="team-name">'+clubLink(r.club,r.club.name)+'</td><td>'+r.points+'</td><td>'+r.played+'</td><td>'+r.wins+'</td><td>'+r.draws+'</td><td>'+r.losses+'</td><td>'+r.gf+'</td><td>'+r.ga+'</td><td>'+(r.gf-r.ga)+'</td></tr>';}).join('')+'</tbody></table></div>'+(competition.division==='B'&&competition.playoffs?'<p class="muted">Os vencedores do mata-mata aparecem em verde: acesso garantido.</p>':'');
 }else if(section==='games'){
  const rounds=competition.rounds||[];
  if(competition.argentinaType)content='<div class="argentina-rules"><p>'+esc(argentinaCompetitionDescription(competition))+'</p></div>';
  content+=rounds.length?'<div class="round-actions"><span class="muted">Rodadas: '+rounds.length+' · Jogos concluídos: '+rounds.reduce((n,r)=>n+r.matches.filter(m=>m.homeGoals!==null).length,0)+'</span><div class="round-controls"><label for="simulate-count">Simular próximas</label><select id="simulate-count">'+[1,2,3,4,5].map(n=>'<option value="'+n+'" '+(n===5?'selected':'')+'>'+n+' rodada(s)</option>').join('')+'</select><button class="btn" id="simulate-rounds">Simular resultados</button></div></div>'+rounds.map(r=>'<div class="round-card"><div class="round-title"><strong>Rodada '+r.number+'</strong><span class="tag">'+(r.matches.every(m=>m.homeGoals!==null)?'Concluída':'Pendente')+'</span></div>'+r.matches.map(m=>'<div class="fixture"><span class="fixture-team">'+clubLink(getClub(m.home),getClub(m.home).name)+'</span><strong class="score">'+(m.homeGoals===null?'—':m.homeGoals+' × '+m.awayGoals)+'</strong><span class="fixture-team away">'+clubLink(getClub(m.away),getClub(m.away).name)+'</span></div>').join('')+'</div>').join('') :'<div class="empty">Inscreva pelo menos dois clubes para gerar as rodadas automaticamente.</div>';
  const regularDone=rounds.length>0&&rounds.every(r=>r.matches.every(m=>m.homeGoals!==null&&m.awayGoals!==null));
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
 const argentinaPrimera=competition.argentinaType==='primera'?season.competitions.filter(c=>c.argentinaType==='primera'):[];const competitionTitle=competition.argentinaType==='primera'?'Primera División':competition.name;view.innerHTML='<div class="competition-detail-head"><button class="btn secondary" id="back-competitions">← Voltar às competições</button><span class="tag">TEMPORADA '+season.year+' · '+esc(season.status)+'</span></div><div class="panel"><div class="panel-head"><div><span class="eyebrow">'+esc(competition.country||'Brasil').toUpperCase()+'</span><h2>'+esc(competitionTitle)+'</h2>'+(argentinaPrimera.length>1?'<div class="field phase-selector"><label for="argentina-phase">Torneio da temporada</label><select id="argentina-phase">'+argentinaPrimera.map(c=>'<option value="'+c.id+'" '+(c.id===competition.id?'selected':'')+'>'+esc(c.phase)+'</option>').join('')+'</select></div>':'')+'</div><span class="tag">'+participants.length+' CLUBES</span></div><div class="competition-tabs">'+tabs.map(([key,label])=>'<button class="competition-tab '+(section===key?'active':'')+'" data-competition-tab="'+key+'">'+label+'</button>').join('')+'</div><div class="competition-section">'+content+'</div></div>';
 document.querySelector('#back-competitions').addEventListener('click',renderCompetitions);const phaseSelect=document.querySelector('#argentina-phase');if(phaseSelect)phaseSelect.addEventListener('change',()=>renderCompetitionDetail(seasonId,phaseSelect.value,section));
 view.querySelectorAll('[data-competition-tab]').forEach(b=>b.addEventListener('click',()=>renderCompetitionDetail(seasonId,competitionId,b.dataset.competitionTab)));
 view.querySelectorAll('[data-open-club]').forEach(b=>b.addEventListener('click',()=>renderClubDetail(b.dataset.openClub,{type:'competition',seasonId,competitionId,section})));
 const createArgentinaPlayoffs=document.querySelector('#create-argentina-playoffs');if(createArgentinaPlayoffs)createArgentinaPlayoffs.addEventListener('click',()=>{const ok=competition.argentinaType==='primera'?argentinaBuildPrimeraPlayoffs(competition):argentinaNacionalCreatePlayoffs(competition);if(!ok){alert('Não foi possível gerar o mata-mata. Confira se todas as posições necessárias têm partidas disputadas.');return;}save();renderCompetitionDetail(seasonId,competitionId,'games');});const simulateArgentinaKnockout=document.querySelector('#simulate-argentina-knockout');if(simulateArgentinaKnockout)simulateArgentinaKnockout.addEventListener('click',()=>{argentinaSimulateKnockout(competition);save();renderCompetitionDetail(seasonId,competitionId,'games');});const createPlayoffs=document.querySelector('#create-access-playoffs');
 if(createPlayoffs)createPlayoffs.addEventListener('click',()=>{if(createAccessPlayoffs(competition)){save();renderCompetitionDetail(seasonId,competitionId,'games');}});
 const playoffSim=document.querySelector('#simulate-playoff-leg');
 if(playoffSim)playoffSim.addEventListener('click',()=>{simulateNextPlayoffLeg(competition);save();renderCompetitionDetail(seasonId,competitionId,'games');});
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
 target.innerHTML=`<div class="panel"><div class="panel-head"><div><span class="eyebrow">GERENCIAMENTO</span><h3>Temporada ${s.year}</h3></div><select id="season-status"><option ${s.status==='Preparação'?'selected':''}>Preparação</option><option ${s.status==='Em andamento'?'selected':''}>Em andamento</option><option ${s.status==='Concluída'?'selected':''}>Concluída</option></select></div><p class="muted">Edite os participantes desta temporada sem alterar o cadastro geral de clubes nem outras temporadas.</p>${s.competitions.map(c=>`<div class="competition-manage"><div class="panel-head"><h3>${esc(c.name)}</h3><span class="tag">${c.participants.length} / ${c.argentinaType==='nacional'?36:c.argentinaType==='primera'?30:20} CLUBES</span></div><div class="field"><label for="country-${c.id}">País da competição</label><input id="country-${c.id}" data-competition-country="${c.id}" value="${esc(c.country||'Brasil')}" maxlength="60" required></div><div class="club-list">${c.participants.map(cid=>{const club=getClub(cid);return club?`<div class="club"><span>${esc(club.name)} · ${esc(club.state)}</span><button data-remove-participant="${c.id}|${cid}">Remover</button></div>`:''}).join('')}</div><div class="form-row add-participant"><div class="field"><label for="add-${c.id}">Adicionar clube cadastrado</label><select id="add-${c.id}"><option value="">Selecione um clube</option>${clubs.filter(cl=>!c.participants.includes(cl.id)).sort((a,b)=>a.name.localeCompare(b.name,'pt-BR')).map(cl=>'<option value="'+cl.id+'">'+esc(cl.name)+' · '+esc(cl.state)+'</option>').join('')}</select></div><span></span><button class="btn" data-add-participant="${c.id}">Adicionar à Série ${c.division}</button></div></div>`).join('')}</div>`;
 document.querySelector('#season-status').addEventListener('change',e=>{s.status=e.target.value;save();renderSeasons();renderSeasonDetail(id);});
 target.querySelectorAll('[data-competition-country]').forEach(select=>select.addEventListener('change',()=>{const comp=s.competitions.find(c=>c.id===select.dataset.competitionCountry);if(comp){comp.country=select.value;save();renderSeasons();renderSeasonDetail(id);}}));
 target.querySelectorAll('[data-remove-participant]').forEach(b=>b.addEventListener('click',()=>{const [compId,clubId]=b.dataset.removeParticipant.split('|');const comp=s.competitions.find(c=>c.id===compId);comp.participants=comp.participants.filter(x=>x!==clubId);save();renderSeasonDetail(id);}));
 target.querySelectorAll('[data-add-participant]').forEach(b=>b.addEventListener('click',()=>{const comp=s.competitions.find(c=>c.id===b.dataset.addParticipant),select=document.querySelector('#add-'+comp.id),clubId=select.value;if(!clubId)return;if(comp.participants.length>=(comp.argentinaType==='nacional'?36:comp.argentinaType==='primera'?30:20)){alert('Esta competição já atingiu o limite de participantes.');return;}if(!comp.argentinaType&&s.competitions.some(other=>other!==comp&&other.participants.includes(clubId))){alert('Este clube já está inscrito na outra divisão desta temporada.');return;}comp.participants.push(clubId);save();renderSeasonDetail(id);}));
}
document.querySelectorAll('.nav-item').forEach(b=>b.addEventListener('click',()=>render(b.dataset.view)));
repairArgentinaAdvancedGroups();
render();
