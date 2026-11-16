const STORE='gerenciador-futebol-dados-v2';
const LEGACY_STORE='gerenciador-futebol-clubes-v1';
const SEED_2026=[
 ['Athletico Paranaense','PR','A'],['Atlético-MG','MG','A'],['Bahia','BA','A'],['Botafogo','RJ','A'],['Chapecoense','SC','A'],['Corinthians','SP','A'],['Coritiba','PR','A'],['Cruzeiro','MG','A'],['Flamengo','RJ','A'],['Fluminense','RJ','A'],['Grêmio','RS','A'],['Internacional','RS','A'],['Mirassol','SP','A'],['Palmeiras','SP','A'],['Red Bull Bragantino','SP','A'],['Remo','PA','A'],['Santos','SP','A'],['São Paulo','SP','A'],['Vasco da Gama','RJ','A'],['Vitória','BA','A'],
 ['América-MG','MG','B'],['Athletic','MG','B'],['Atlético-GO','GO','B'],['Avaí','SC','B'],['Botafogo-SP','SP','B'],['Ceará','CE','B'],['CRB','AL','B'],['Criciúma','SC','B'],['Cuiabá','MT','B'],['Fortaleza','CE','B'],['Goiás','GO','B'],['Juventude','RS','B'],['Londrina','PR','B'],['Náutico','PE','B'],['Novorizontino','SP','B'],['Operário-PR','PR','B'],['Ponte Preta','SP','B'],['São Bernardo','SP','B'],['Sport','PE','B'],['Vila Nova','GO','B']
];
const uid=()=>crypto.randomUUID();
const slugify=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
function initialData(){
 const old=JSON.parse(localStorage.getItem(LEGACY_STORE)||'[]');
 const clubs=[];
 const add=(name,state,id)=>{const key=slugify(name);if(!clubs.some(c=>slugify(c.name)===key))clubs.push({id:id||key,name,state:state||'',slug:key});};
 old.forEach(c=>add(c.name,c.state,c.id));
 SEED_2026.forEach(([name,state])=>add(name,state));
 const byName=name=>clubs.find(c=>slugify(c.name)===slugify(name)).id;
 const a=SEED_2026.filter(x=>x[2]==='A').map(x=>byName(x[0]));
 const b=SEED_2026.filter(x=>x[2]==='B').map(x=>byName(x[0]));
 return {clubs,seasons:[{id:'season-2026',year:2026,status:'Preparação',createdAt:new Date().toISOString(),competitions:[{id:'serie-a',name:'Campeonato Brasileiro · Série A',country:'Brasil',division:'A',participants:a,format:'A definir'},{id:'serie-b',name:'Campeonato Brasileiro · Série B',country:'Brasil',division:'B',participants:b,format:'A definir'}]}]};
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
 const hasTestData=seasons.some(s=>s.competitions.some(c=>Array.isArray(c.rounds)&&c.rounds.length));
 if(!hasTestData){alert('Ainda não existem calendários ou resultados para resetar.');return;}
 if(!confirm('Isso apagará todos os calendários e resultados gerados em todas as temporadas e restaurará a força inicial dos clubes. Os clubes e participantes serão mantidos. Continuar?'))return;
 seasons.forEach(s=>{s.competitions.forEach(c=>{delete c.rounds;delete c.playoffs;});s.status='Preparação';});
 clubs.forEach(club=>{initializeClubRating(club);club.overall=club.initialRating.overall;club.attack=club.initialRating.attack;club.defense=club.initialRating.defense;});
 save();render('inicio');alert('Calendários, resultados e alterações de força foram resetados.');
}
function renderHome(){
 const season=latestSeason();
 view.innerHTML=`
 <div class="welcome"><span class="eyebrow">SEU UNIVERSO DE FUTEBOL</span><h2>Uma nova temporada começa aqui.</h2><p>Gerencie clubes, organize competições e simule campeonatos. Os resultados criados aqui formarão a história própria do seu futebol.</p></div>
 <div class="grid"><div class="card"><small>CLUBES CADASTRADOS</small><strong>${clubs.length}</strong></div><div class="card"><small>COMPETIÇÕES INICIAIS</small><strong>02</strong></div><div class="card"><small>TEMPORADAS CADASTRADAS</small><strong>${seasons.length}</strong></div></div>
 <div class="panel"><div class="panel-head"><h3>Primeira temporada · ${season.year}</h3><span class="tag">${esc(season.status)}</span></div>${season.competitions.map(c=>`<div class="competition-row"><div><strong>${esc(c.name)}</strong><small>${c.participants.length} clubes · Formato: ${esc(c.format)}</small></div><span class="tag">Cadastrada</span></div>`).join('')}</div>
 <div class="panel"><h3>Regra de evolução dos clubes</h3><p class="muted">A força muda exclusivamente pelos resultados simulados. Promoção e rebaixamento não alteram ratings automaticamente.</p></div>
 <div class="panel reset-panel"><div><h3>Ferramentas da fase de testes</h3><p class="muted">Apaga calendários e resultados simulados e restaura as forças iniciais. Clubes e participantes serão preservados.</p></div><button class="btn danger" id="reset-test-games">Resetar jogos de teste</button></div>`;
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
function renderCompetitions(){
 const countries=[...new Set(seasons.flatMap(s=>s.competitions.map(c=>c.country||'Brasil')))].sort((a,b)=>a.localeCompare(b,'pt-BR'));
 const countrySections=countries.map(country=>'<section class="country-group"><div class="country-heading"><h2>'+esc(country)+'</h2><span class="tag">'+seasons.reduce((n,s)=>n+s.competitions.filter(c=>(c.country||'Brasil')===country).length,0)+' COMPETIÇÕES</span></div>'+[...seasons].sort((a,b)=>b.year-a.year).map(s=>{const list=s.competitions.filter(c=>(c.country||'Brasil')===country);return list.length?'<h3 class="season-heading">Temporada '+s.year+'</h3>'+list.map(c=>'<button class="competition-open" data-open-competition="'+s.id+'|'+c.id+'"><span><strong>'+esc(c.name)+'</strong><small>'+c.participants.length+' participantes · Formato: '+esc(c.format)+'</small></span><span class="competition-open-action">Abrir competição →</span></button>').join(''):'';}).join('')+'</section>').join('');
 view.innerHTML='<div class="panel"><div class="panel-head"><h3>Competições por país</h3><span class="tag">'+countries.length+' PAÍS(ES)</span></div><p class="muted">As competições estão organizadas pelo país ao qual pertencem. Selecione uma para consultar classificação, jogos e clubes participantes.</p>'+(countrySections||'<div class="empty">Nenhuma competição cadastrada.</div>')+'</div>';
 view.querySelectorAll('[data-open-competition]').forEach(b=>b.addEventListener('click',()=>{const [seasonId,competitionId]=b.dataset.openCompetition.split('|');renderCompetitionDetail(seasonId,competitionId);}));
}
function buildSchedule(competition){
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
  content='<div class="table-legend">'+(competition.division==='A'?'<span class="legend-item relegation">Rebaixamento · 16º ao 20º</span>':'<span class="legend-item access">Acesso direto · 1º e 2º</span><span class="legend-item playoff">Playoffs · 3º ao 6º</span>')+'</div><div class="table-wrap"><table class="standings"><thead><tr><th>#</th><th>Clube</th><th>P</th><th>J</th><th>V</th><th>E</th><th>D</th><th>GP</th><th>GC</th><th>SG</th></tr></thead><tbody>'+standings.map((r,i)=>{const rank=i+1,winner=competition.playoffs?.ties?.some(t=>playoffWinner(t)===r.id);const zone=competition.division==='A'?(rank>=17?'zone-relegation':''):(rank<=2||winner?'zone-access':rank<=6?'zone-playoff':'');return '<tr class="'+zone+'"><td>'+rank+'</td><td class="team-name">'+clubLink(r.club,r.club.name)+'</td><td>'+r.points+'</td><td>'+r.played+'</td><td>'+r.wins+'</td><td>'+r.draws+'</td><td>'+r.losses+'</td><td>'+r.gf+'</td><td>'+r.ga+'</td><td>'+(r.gf-r.ga)+'</td></tr>';}).join('')+'</tbody></table></div>'+(competition.division==='B'&&competition.playoffs?'<p class="muted">Os vencedores do mata-mata aparecem em verde: acesso garantido.</p>':'');
 }else if(section==='games'){
  const rounds=competition.rounds||[];
  content=rounds.length?'<div class="round-actions"><span class="muted">Rodadas: '+rounds.length+' · Jogos concluídos: '+rounds.reduce((n,r)=>n+r.matches.filter(m=>m.homeGoals!==null).length,0)+'</span><div class="round-controls"><label for="simulate-count">Simular próximas</label><select id="simulate-count">'+[1,2,3,4,5].map(n=>'<option value="'+n+'" '+(n===5?'selected':'')+'>'+n+' rodada(s)</option>').join('')+'</select><button class="btn" id="simulate-rounds">Simular resultados</button></div></div>'+rounds.map(r=>'<div class="round-card"><div class="round-title"><strong>Rodada '+r.number+'</strong><span class="tag">'+(r.matches.every(m=>m.homeGoals!==null)?'Concluída':'Pendente')+'</span></div>'+r.matches.map(m=>'<div class="fixture"><span class="fixture-team">'+clubLink(getClub(m.home),getClub(m.home).name)+'</span><strong class="score">'+(m.homeGoals===null?'—':m.homeGoals+' × '+m.awayGoals)+'</strong><span class="fixture-team away">'+clubLink(getClub(m.away),getClub(m.away).name)+'</span></div>').join('')+'</div>').join('') :'<div class="empty">Inscreva pelo menos dois clubes para gerar as rodadas automaticamente.</div>';
  const regularDone=rounds.length>0&&rounds.every(r=>r.matches.every(m=>m.homeGoals!==null));
  if(competition.division==='B'&&regularDone&&!competition.playoffs)content+='<div class="playoff-panel"><h3>Mata-mata do acesso</h3><p class="muted">A fase regular terminou. Os clubes em 3º, 4º, 5º e 6º disputarão duas vagas de acesso em semifinais de ida e volta.</p><button class="btn" id="create-access-playoffs">Gerar confrontos do acesso</button></div>';
  if(competition.division==='B'&&competition.playoffs)content+=renderPlayoffs(competition);

 }else{
  content='<div class="club-list">'+participants.map(club=>'<div class="club"><span>'+clubLink(club,club.name)+(club.state?' · '+esc(club.state):'')+'</span><span class="tag">'+clubRating(club).overall+'/100</span></div>').join('')+'</div>';
  if(!participants.length)content='<div class="empty">Nenhum clube inscrito nesta competição.</div>';
 }
 view.innerHTML='<div class="competition-detail-head"><button class="btn secondary" id="back-competitions">← Voltar às competições</button><span class="tag">TEMPORADA '+season.year+' · '+esc(season.status)+'</span></div><div class="panel"><div class="panel-head"><div><span class="eyebrow">CAMPEONATO BRASILEIRO</span><h2>'+esc(competition.name)+'</h2></div><span class="tag">'+participants.length+' CLUBES</span></div><div class="competition-tabs">'+tabs.map(([key,label])=>'<button class="competition-tab '+(section===key?'active':'')+'" data-competition-tab="'+key+'">'+label+'</button>').join('')+'</div><div class="competition-section">'+content+'</div></div>';
 document.querySelector('#back-competitions').addEventListener('click',renderCompetitions);
 view.querySelectorAll('[data-competition-tab]').forEach(b=>b.addEventListener('click',()=>renderCompetitionDetail(seasonId,competitionId,b.dataset.competitionTab)));
 view.querySelectorAll('[data-open-club]').forEach(b=>b.addEventListener('click',()=>renderClubDetail(b.dataset.openClub,{type:'competition',seasonId,competitionId,section})));
 const createPlayoffs=document.querySelector('#create-access-playoffs');
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
 target.innerHTML=`<div class="panel"><div class="panel-head"><div><span class="eyebrow">GERENCIAMENTO</span><h3>Temporada ${s.year}</h3></div><select id="season-status"><option ${s.status==='Preparação'?'selected':''}>Preparação</option><option ${s.status==='Em andamento'?'selected':''}>Em andamento</option><option ${s.status==='Concluída'?'selected':''}>Concluída</option></select></div><p class="muted">Edite os participantes desta temporada sem alterar o cadastro geral de clubes nem outras temporadas.</p>${s.competitions.map(c=>`<div class="competition-manage"><div class="panel-head"><h3>${esc(c.name)}</h3><span class="tag">${c.participants.length} / 20 CLUBES</span></div><div class="field"><label for="country-${c.id}">País da competição</label><select id="country-${c.id}" data-competition-country="${c.id}">${['Brasil','Argentina','Chile','Uruguai','Paraguai','Estados Unidos','Inglaterra','Espanha','Itália','Alemanha','França','Portugal','Outro'].map(country=>`<option value="${country}" ${(c.country||'Brasil')===country?'selected':''}>${country}</option>`).join('')}</select></div><div class="club-list">${c.participants.map(cid=>{const club=getClub(cid);return club?`<div class="club"><span>${esc(club.name)} · ${esc(club.state)}</span><button data-remove-participant="${c.id}|${cid}">Remover</button></div>`:''}).join('')}</div><div class="form-row add-participant"><div class="field"><label for="add-${c.id}">Adicionar clube cadastrado</label><select id="add-${c.id}"><option value="">Selecione um clube</option>${clubs.filter(cl=>!c.participants.includes(cl.id)).sort((a,b)=>a.name.localeCompare(b.name,'pt-BR')).map(cl=>'<option value="'+cl.id+'">'+esc(cl.name)+' · '+esc(cl.state)+'</option>').join('')}</select></div><span></span><button class="btn" data-add-participant="${c.id}">Adicionar à Série ${c.division}</button></div></div>`).join('')}</div>`;
 document.querySelector('#season-status').addEventListener('change',e=>{s.status=e.target.value;save();renderSeasons();renderSeasonDetail(id);});
 target.querySelectorAll('[data-competition-country]').forEach(select=>select.addEventListener('change',()=>{const comp=s.competitions.find(c=>c.id===select.dataset.competitionCountry);if(comp){comp.country=select.value;save();renderSeasons();renderSeasonDetail(id);}}));
 target.querySelectorAll('[data-remove-participant]').forEach(b=>b.addEventListener('click',()=>{const [compId,clubId]=b.dataset.removeParticipant.split('|');const comp=s.competitions.find(c=>c.id===compId);comp.participants=comp.participants.filter(x=>x!==clubId);save();renderSeasonDetail(id);}));
 target.querySelectorAll('[data-add-participant]').forEach(b=>b.addEventListener('click',()=>{const comp=s.competitions.find(c=>c.id===b.dataset.addParticipant),select=document.querySelector('#add-'+comp.id),clubId=select.value;if(!clubId)return;if(comp.participants.length>=20){alert('Esta competição já tem 20 participantes.');return;}if(s.competitions.some(other=>other!==comp&&other.participants.includes(clubId))){alert('Este clube já está inscrito na outra divisão desta temporada.');return;}comp.participants.push(clubId);save();renderSeasonDetail(id);}));
}
document.querySelectorAll('.nav-item').forEach(b=>b.addEventListener('click',()=>render(b.dataset.view)));
render();
