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
 return {clubs,seasons:[{id:'season-2026',year:2026,status:'Preparação',createdAt:new Date().toISOString(),competitions:[{id:'serie-a',name:'Campeonato Brasileiro · Série A',division:'A',participants:a,format:'A definir'},{id:'serie-b',name:'Campeonato Brasileiro · Série B',division:'B',participants:b,format:'A definir'}]}]};
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
function renderHome(){
 const season=latestSeason();
 view.innerHTML=`
 <div class="welcome"><span class="eyebrow">SEU UNIVERSO DE FUTEBOL</span><h2>Uma nova temporada começa aqui.</h2><p>Gerencie clubes, organize competições e simule campeonatos. Os resultados criados aqui formarão a história própria do seu futebol.</p></div>
 <div class="grid"><div class="card"><small>CLUBES CADASTRADOS</small><strong>${clubs.length}</strong></div><div class="card"><small>COMPETIÇÕES INICIAIS</small><strong>02</strong></div><div class="card"><small>TEMPORADAS CADASTRADAS</small><strong>${seasons.length}</strong></div></div>
 <div class="panel"><div class="panel-head"><h3>Primeira temporada · ${season.year}</h3><span class="tag">${esc(season.status)}</span></div>${season.competitions.map(c=>`<div class="competition-row"><div><strong>${esc(c.name)}</strong><small>${c.participants.length} clubes · Formato: ${esc(c.format)}</small></div><span class="tag">Cadastrada</span></div>`).join('')}</div>
 <div class="panel"><h3>Regra de evolução dos clubes</h3><p class="muted">Dados reais são usados somente para a avaliação inicial. Depois disso, a força muda exclusivamente pelos resultados simulados dentro do sistema. Promoção e rebaixamento não alteram ratings automaticamente.</p></div>`;
}
function renderClubs(){
 view.innerHTML=`<div class="panel"><div class="panel-head"><h3>Cadastro de clubes</h3><span class="tag">CADASTRO ÚNICO</span></div><p class="muted">Cada clube existe uma única vez no cadastro e pode participar de várias temporadas e divisões.</p><form id="club-form"><div class="form-row"><div class="field"><label for="club-name">Nome do clube</label><input id="club-name" required maxlength="70" placeholder="Ex.: Clube de Futebol"></div><div class="field"><label for="club-state">Estado (UF)</label><input id="club-state" maxlength="2" placeholder="Ex.: MG"></div><button class="btn" type="submit">Adicionar clube</button></div></form></div>
 <div class="panel"><div class="panel-head"><h3>Clubes cadastrados</h3><span class="tag">${clubs.length} REGISTROS</span></div>${clubs.length?'<div class="club-list">'+[...clubs].sort((a,b)=>a.name.localeCompare(b.name,'pt-BR')).map(c=>'<div class="club"><span>'+esc(c.name)+(c.state?' · '+esc(c.state):'')+'</span></div>').join('')+'</div>':'<div class="empty">Nenhum clube cadastrado.</div>'}</div>`;
 document.querySelector('#club-form').addEventListener('submit',e=>{e.preventDefault();const name=document.querySelector('#club-name').value.trim(),state=document.querySelector('#club-state').value.trim().toUpperCase();if(!name)return;if(clubs.some(c=>slugify(c.name)===slugify(name))){alert('Este clube já está cadastrado.');return;}clubs.push({id:uid(),name,state,slug:slugify(name)});save();renderClubs();});
}
function renderCompetitions(){
 view.innerHTML='<div class="panel"><div class="panel-head"><h3>Competições cadastradas</h3><span class="tag">SÉRIE A + SÉRIE B</span></div><p class="muted">Clique em uma competição para abrir sua página, consultar a classificação, os jogos e os clubes participantes.</p>'+[...seasons].sort((a,b)=>b.year-a.year).map(s=>'<h3 class="season-heading">'+s.year+'</h3>'+s.competitions.map(c=>'<button class="competition-open" data-open-competition="'+s.id+'|'+c.id+'"><span><strong>'+esc(c.name)+'</strong><small>'+c.participants.length+' participantes · Formato: '+esc(c.format)+'</small></span><span class="competition-open-action">Abrir competição →</span></button>').join('')).join('')+'</div>';
 view.querySelectorAll('[data-open-competition]').forEach(b=>b.addEventListener('click',()=>{const [seasonId,competitionId]=b.dataset.openCompetition.split('|');renderCompetitionDetail(seasonId,competitionId);}));
}
function renderCompetitionDetail(seasonId,competitionId,section='table'){
 const season=seasons.find(s=>s.id===seasonId),competition=season?.competitions.find(c=>c.id===competitionId);if(!season||!competition)return renderCompetitions();
 const participants=competition.participants.map(getClub).filter(Boolean).sort((a,b)=>a.name.localeCompare(b.name,'pt-BR'));
 const tabs=[['table','Classificação'],['games','Jogos'],['clubs','Clubes']];
 let content='';
 if(section==='table'){
  content='<div class="table-wrap"><table class="standings"><thead><tr><th>#</th><th>Clube</th><th>P</th><th>J</th><th>V</th><th>E</th><th>D</th><th>GP</th><th>GC</th><th>SG</th></tr></thead><tbody>'+participants.map((club,i)=>'<tr><td>'+(i+1)+'</td><td class="team-name">'+esc(club.name)+'</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>').join('')+'</tbody></table></div><p class="muted">A classificação será atualizada automaticamente quando os jogos forem cadastrados e simulados.</p>';
 }else if(section==='games'){
  content='<div class="empty">Ainda não há jogos cadastrados para esta competição. O calendário e as partidas serão exibidos aqui quando forem criados.</div>';
 }else{
  content='<div class="club-list">'+participants.map(club=>'<div class="club"><span>'+esc(club.name)+(club.state?' · '+esc(club.state):'')+'</span></div>').join('')+'</div>';
  if(!participants.length)content='<div class="empty">Nenhum clube inscrito nesta competição.</div>';
 }
 view.innerHTML='<div class="competition-detail-head"><button class="btn secondary" id="back-competitions">← Voltar às competições</button><span class="tag">TEMPORADA '+season.year+' · '+esc(season.status)+'</span></div><div class="panel"><div class="panel-head"><div><span class="eyebrow">CAMPEONATO BRASILEIRO</span><h2>'+esc(competition.name)+'</h2></div><span class="tag">'+participants.length+' CLUBES</span></div><div class="competition-tabs">'+tabs.map(([key,label])=>'<button class="competition-tab '+(section===key?'active':'')+'" data-competition-tab="'+key+'">'+label+'</button>').join('')+'</div><div class="competition-section">'+content+'</div></div>';
 document.querySelector('#back-competitions').addEventListener('click',renderCompetitions);
 view.querySelectorAll('[data-competition-tab]').forEach(b=>b.addEventListener('click',()=>renderCompetitionDetail(seasonId,competitionId,b.dataset.competitionTab)));
}
function renderSeasons(){
 view.innerHTML=`<div class="panel"><div class="panel-head"><h3>Temporadas</h3><span class="tag">${seasons.length} CADASTRADAS</span></div><p class="muted">Cada temporada mantém suas próprias competições, participantes e regulamentos. Criar uma nova temporada não altera as anteriores.</p><form id="season-form" class="form-row"><div class="field"><label for="season-year">Ano da nova temporada</label><input id="season-year" type="number" min="2026" max="2100" value="${Math.max(2027,...seasons.map(s=>s.year+1))}" required></div><div class="field"><label>Participantes iniciais</label><select id="season-copy"><option value="copy">Copiar participantes da temporada mais recente</option><option value="empty">Começar com competições vazias</option></select></div><button class="btn" type="submit">Criar temporada</button></form></div>
 <div class="panel"><h3>Temporadas cadastradas</h3><div class="season-list">${[...seasons].sort((a,b)=>b.year-a.year).map(s=>`<div class="season-card"><div><strong>${s.year}</strong><small>${esc(s.status)} · ${s.competitions.reduce((n,c)=>n+c.participants.length,0)} vínculos de clubes</small></div><button class="btn secondary" data-open-season="${s.id}">Gerenciar</button></div>`).join('')}</div></div><div id="season-detail"></div>`;
 document.querySelector('#season-form').addEventListener('submit',e=>{e.preventDefault();const year=Number(document.querySelector('#season-year').value);if(seasons.some(s=>s.year===year)){alert('Já existe uma temporada para esse ano.');return;}const base=latestSeason(),copy=document.querySelector('#season-copy').value==='copy';seasons.push({id:uid(),year,status:'Preparação',createdAt:new Date().toISOString(),competitions:[{id:uid(),name:'Campeonato Brasileiro · Série A',division:'A',participants:copy?[...base.competitions.find(c=>c.division==='A').participants]:[],format:'A definir'},{id:uid(),name:'Campeonato Brasileiro · Série B',division:'B',participants:copy?[...base.competitions.find(c=>c.division==='B').participants]:[],format:'A definir'}]});save();renderSeasons();});
 document.querySelectorAll('[data-open-season]').forEach(b=>b.addEventListener('click',()=>renderSeasonDetail(b.dataset.openSeason)));
}
function renderSeasonDetail(id){
 const s=seasons.find(x=>x.id===id);if(!s)return;
 const target=document.querySelector('#season-detail');
 target.innerHTML=`<div class="panel"><div class="panel-head"><div><span class="eyebrow">GERENCIAMENTO</span><h3>Temporada ${s.year}</h3></div><select id="season-status"><option ${s.status==='Preparação'?'selected':''}>Preparação</option><option ${s.status==='Em andamento'?'selected':''}>Em andamento</option><option ${s.status==='Concluída'?'selected':''}>Concluída</option></select></div><p class="muted">Edite os participantes desta temporada sem alterar o cadastro geral de clubes nem outras temporadas.</p>${s.competitions.map(c=>`<div class="competition-manage"><div class="panel-head"><h3>${esc(c.name)}</h3><span class="tag">${c.participants.length} / 20 CLUBES</span></div><div class="club-list">${c.participants.map(cid=>{const club=getClub(cid);return club?`<div class="club"><span>${esc(club.name)} · ${esc(club.state)}</span><button data-remove-participant="${c.id}|${cid}">Remover</button></div>`:''}).join('')}</div><div class="form-row add-participant"><div class="field"><label for="add-${c.id}">Adicionar clube cadastrado</label><select id="add-${c.id}"><option value="">Selecione um clube</option>${clubs.filter(cl=>!c.participants.includes(cl.id)).sort((a,b)=>a.name.localeCompare(b.name,'pt-BR')).map(cl=>'<option value="'+cl.id+'">'+esc(cl.name)+' · '+esc(cl.state)+'</option>').join('')}</select></div><span></span><button class="btn" data-add-participant="${c.id}">Adicionar à Série ${c.division}</button></div></div>`).join('')}</div>`;
 document.querySelector('#season-status').addEventListener('change',e=>{s.status=e.target.value;save();renderSeasons();renderSeasonDetail(id);});
 target.querySelectorAll('[data-remove-participant]').forEach(b=>b.addEventListener('click',()=>{const [compId,clubId]=b.dataset.removeParticipant.split('|');const comp=s.competitions.find(c=>c.id===compId);comp.participants=comp.participants.filter(x=>x!==clubId);save();renderSeasonDetail(id);}));
 target.querySelectorAll('[data-add-participant]').forEach(b=>b.addEventListener('click',()=>{const comp=s.competitions.find(c=>c.id===b.dataset.addParticipant),select=document.querySelector('#add-'+comp.id),clubId=select.value;if(!clubId)return;if(comp.participants.length>=20){alert('Esta competição já tem 20 participantes.');return;}if(s.competitions.some(other=>other!==comp&&other.participants.includes(clubId))){alert('Este clube já está inscrito na outra divisão desta temporada.');return;}comp.participants.push(clubId);save();renderSeasonDetail(id);}));
}
document.querySelectorAll('.nav-item').forEach(b=>b.addEventListener('click',()=>render(b.dataset.view)));
render();
