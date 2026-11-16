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
const labels={inicio:'Painel inicial',competicoes:'Competições',clubes:'Clubes',temporadas:'Temporadas',partidas:'Partidas',classificacao:'Classificação',historico:'Histórico'};
const CONTINENTS=['América do Norte','América do Sul','Europa','Ásia','África','Oceania'];
const COUNTRY_CONTINENT=Object.fromEntries(['Brasil','Argentina','Uruguai','Colômbia','Chile','Paraguai','Equador','Peru','Venezuela','Bolívia','Guiana','Suriname'].map(country=>[slugify(country),'América do Sul']));
let activeCompetitionContinent=null;
function save(){seasons.forEach(s=>s.competitions.forEach(c=>{if(c.colombiaTournaments&&c.colombiaActivePhase)c.colombiaTournaments[c.colombiaActivePhase].rounds=c.rounds||[];if(c.ecuadorDivision&&c.ecuadorStage==='final'&&c.rounds?.length)c.ecuadorFinalRounds=JSON.parse(JSON.stringify(c.rounds));if(c.ecuadorDivision&&c.ecuadorStage==='regular'&&c.rounds?.length)c.ecuadorRegularRounds=JSON.parse(JSON.stringify(c.rounds));if(c.venezuelaDivision==='Primera División'&&c.rounds?.length){if(c.venezuelaStage==='regular')c.venezuelaRegularRounds=JSON.parse(JSON.stringify(c.rounds));if(c.venezuelaStage==='quadrangular')c.venezuelaFinalRounds=JSON.parse(JSON.stringify(c.rounds));}if(c.venezuelaDivision==='Segunda División'&&c.venezuelaStage==='regional'&&c.rounds?.length)c.venezuelaRegionalRounds=JSON.parse(JSON.stringify(c.rounds));if(c.boliviaDivision&&c.boliviaStage==='groups'&&c.rounds?.length)c.boliviaGroupRounds=JSON.parse(JSON.stringify(c.rounds));}));data={clubs,seasons};localStorage.setItem(STORE,JSON.stringify(data));}
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
function boliviaTableView(c){
 if(c.boliviaDivision==='Primera División'){
  const rows=getStandings(c),last=rows.slice(-1),playoff=rows.slice(-2,-1),classes={};last.forEach(r=>classes[r.id]='zone-relegation');playoff.forEach(r=>classes[r.id]='zone-playoff');
  return '<div class="argentina-rules"><p>Liga em turno e returno · 30 rodadas. O último colocado é rebaixado diretamente; o penúltimo disputa o playoff de ascenso/descenso contra o vice-campeão da Copa Simón Bolívar.</p></div>'+peruTableHtml(rows,classes)+'<div class="table-legend"><span class="legend-item relegation">Rebaixamento direto · último colocado</span><span class="legend-item playoff">Playoff de ascenso/descenso · penúltimo colocado</span></div>';
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
 else if(page==='temporadas')renderSeasons();
 else if(page==='competicoes')renderCompetitions(activeCompetitionContinent);
 else {const desc={partidas:'As partidas serão geradas pelo calendário e terão resultados simulados automaticamente.',classificacao:'A classificação será calculada automaticamente a partir dos resultados das partidas.',historico:'As temporadas concluídas e as avaliações dos clubes ficarão registradas aqui.'};view.innerHTML='<div class="panel"><h3>'+labels[page]+'</h3><p class="muted">'+desc[page]+'</p><div class="empty">Este módulo será desenvolvido em uma próxima etapa.</div></div>';}
}
function resetTestMatches(){
 const hasTestData=seasons.some(s=>s.year!==2026||s.countryAdvancements||s.competitions.some(c=>(Array.isArray(c.rounds)&&c.rounds.length)||c.playoffs||c.chilePlayoffs||c.chileTitleTie||c.peruPlayoffs||c.peruStage==='final'||c.peruStage==='playoffs'||c.venezuelaStage&&c.venezuelaStage!==(c.venezuelaDivision==='Primera División'?'regular':'regional')||c.venezuelaRegularRounds||c.venezuelaFinalRounds||c.venezuelaRegionalRounds||c.venezuelaGroups||c.venezuelaTitleFinal||c.venezuelaKnockout||c.boliviaStage==='knockout'||c.boliviaGroupRounds||c.boliviaKnockout||c.boliviaIndirectPlayoff));
 if(!hasTestData){alert('O sistema já está no estado inicial da temporada de 2026.');return;}
 if(!confirm('Isso apagará todos os calendários, resultados, mata-matas e temporadas posteriores a 2026. O sistema voltará à temporada de 2026 e restaurará a força inicial dos clubes. Os cadastros dos clubes e os participantes de 2026 serão mantidos. Continuar?'))return;
 seasons=seasons.filter(s=>s.year===2026);
 seasons.forEach(s=>{
  delete s.countryAdvancements;
  s.competitions.forEach(c=>{delete c.rounds;delete c.playoffs;delete c.chilePlayoffs;delete c.chileTitleTie;delete c.ecuadorRegularRounds;delete c.ecuadorGroups;if(c.ecuadorDivision){c.ecuadorStage='regular';}delete c.peruPlayoffs;delete c.peruFinalGroups;delete c.peruBonus;delete c.peruRegionalRounds;delete c.peruFinalRounds;if(c.peruDivision==='Liga 2')c.peruStage='regional';delete c.venezuelaRegularRounds;delete c.venezuelaFinalRounds;delete c.venezuelaRegionalRounds;delete c.venezuelaGroups;delete c.venezuelaGroupWinners;delete c.venezuelaTitleFinal;delete c.venezuelaKnockout;delete c.venezuelaQualified;delete c.boliviaGroupRounds;delete c.boliviaKnockout;delete c.boliviaQualified;delete c.boliviaIndirectPlayoff;if(c.boliviaDivision==='Primera División')delete c.boliviaStage;if(c.boliviaDivision==='Copa de la División Profesional'||c.boliviaDivision==='Copa Simón Bolívar')c.boliviaStage='groups';if(c.venezuelaDivision==='Primera División')c.venezuelaStage='regular';if(c.venezuelaDivision==='Segunda División')c.venezuelaStage='regional';});
  s.status='Preparação';
 });
 clubs.forEach(club=>{initializeClubRating(club);club.overall=club.initialRating.overall;club.attack=club.initialRating.attack;club.defense=club.initialRating.defense;});
 save();render('inicio');alert('O sistema voltou à temporada de 2026. Temporadas futuras, calendários, resultados, mata-matas e alterações de força foram resetados.');
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
  const continentalHtml=continent==='América do Sul'?'<section class="country-group"><div class="country-heading"><div><h2>Competições continentais</h2><p class="muted">Torneios que reúnem clubes de diferentes países da América do Sul.</p></div></div><button class="competition-open" data-open-libertadores-hub><span><strong>CONMEBOL Libertadores</strong><small>Vagas da próxima edição · classificação nacional · edições e campeões</small></span><span class="competition-open-action">Abrir competição →</span></button>'+libertadoresEntries.map(({season,comp})=>'<button class="competition-open" data-open-competition="'+season.id+'|'+comp.id+'"><span><strong>CONMEBOL Libertadores · '+season.year+'</strong><small>'+comp.participants.length+' participantes · '+esc(libertadoresStageLabel(comp.libertadoresStage))+'</small></span><span class="competition-open-action">Abrir edição →</span></button>').join('')+'</section>':'';
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
function venezuelaTableView(c){
 if(c.venezuelaDivision==='Primera División'){
  const regularRounds=c.venezuelaRegularRounds||(c.venezuelaStage==='regular'?c.rounds:[]);const regular=getStandings({...c,rounds:regularRounds||[]});
  const first='<h3 class="season-heading">Tabela da primeira fase · '+esc(c.venezuelaPhase)+'</h3>'+peruTableHtml(regular);
  const annual=venezuelaAnnualTable(seasons.find(s=>s.competitions.includes(c))?.year);
  const annualHtml='<h3 class="season-heading">Tabela acumulada · Apertura + Clausura</h3>'+peruTableHtml(annual,Object.fromEntries((annual.length===14?annual.slice(-1):[]).map(r=>[r.id,'zone-relegation'])));
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
 if(section==='games'&&!competition.rounds?.length&&participants.length>=2&&(!competition.libertadoresCompetition||competition.libertadoresStage==='groups')&&(!competition.venezuelaDivision||competition.venezuelaDivision==='Primera División'&&competition.venezuelaStage==='regular'||competition.venezuelaDivision==='Segunda División'&&competition.venezuelaStage==='regional')&&(!competition.peruDivision||competition.peruDivision==='Primera División'||competition.peruStage==='regional')&&(!competition.boliviaDivision||competition.boliviaDivision==='Primera División'||competition.boliviaStage==='groups')){buildSchedule(competition);save();}
 const tabs=[['table','Classificação'],['games','Jogos'],['clubs','Clubes']];
 let content='';
 if(section==='table'){
  const standings=getStandings(competition);
  if(competition.libertadoresCompetition)content=libertadoresTableView(competition);
  else if(competition.venezuelaDivision)content=venezuelaTableView(competition);
  else if(competition.boliviaDivision)content=boliviaTableView(competition);
  else if(competition.ecuadorDivision){
   const groups=competition.ecuadorGroups||{},labels=competition.ecuadorDivision==='Serie A'?{title:'Hexagonal do título',sudamericana:'Quadrangular da Sul-Americana',descenso:'Hexagonal do descenso'}:{ascenso:'Hexagonal do ascenso',descenso:'Hexagonal da permanência'};
   const groupKeys=competition.ecuadorStage==='final'?Object.keys(groups):[];
   const rules=competition.ecuadorDivision==='Serie A'?'16 clubes: fase inicial em turno e returno (30 rodadas); depois, hexagonal do título, quadrangular por vaga continental e hexagonal do descenso. Os dois últimos do hexagonal do descenso são rebaixados à Serie B.':'12 clubes: fase classificatória em ida e volta (22 rodadas); depois, hexagonais de ascenso e de permanência. Os dois primeiros do grupo de ascenso conquistam o acesso à Serie A; o grupo de permanência define a manutenção na Serie B.';
   if(competition.ecuadorStage==='regular')content='<div class="argentina-rules"><p>Equador 2026: '+rules+'</p></div>'+peruTableHtml(standings);
   else {const complete=ecuadorFinalComplete(competition);content='<div class="argentina-rules"><p>Equador 2026: '+rules+' A tabela abaixo soma os resultados da fase inicial e da fase final dentro de cada grupo.</p></div>'+groupKeys.map(k=>{const rows=ecuadorStageTable(competition,groups[k]);let classes={};if(complete&&competition.ecuadorDivision==='Serie A'&&k==='descenso')rows.slice(-2).forEach(r=>classes[r.id]='zone-relegation');if(complete&&competition.ecuadorDivision==='Serie B'&&k==='ascenso')rows.slice(0,2).forEach(r=>classes[r.id]='zone-access');return '<h3 class="season-heading">'+labels[k]+'</h3>'+peruTableHtml(rows,classes);}).join('');if(complete&&competition.ecuadorDivision==='Serie A'){const out=ecuadorStageTable(competition,groups.descenso).slice(-2).map(r=>getClub(r.id)?.name||'');content+='<div class="table-legend"><span class="legend-item relegation">Rebaixamento à Serie B · 2 clubes</span></div><p class="access-confirmation">Rebaixados à Serie B: '+out.map(esc).join(' e ')+'.</p>';}if(complete&&competition.ecuadorDivision==='Serie B'){const up=ecuadorStageTable(competition,groups.ascenso).slice(0,2).map(r=>getClub(r.id)?.name||'');content+='<div class="table-legend"><span class="legend-item access">Acesso à Serie A · 2 clubes</span></div><p class="access-confirmation">Promovidos à Serie A: '+up.map(esc).join(' e ')+'.</p>';}}
  }
  else if(competition.peruDivision==='Primera División'){const annual=peruAnnualTable(season.year),out=annual.slice(-2).map(r=>r.id);content='<div class="argentina-rules"><p>Liga 1 2026: Apertura e Clausura em turno único, 17 rodadas cada. A tabela acumulada soma os dois torneios; os dois últimos são rebaixados.</p></div><h3 class="season-heading">Tabela do Torneo '+esc(competition.peruPhase)+'</h3>'+peruTableHtml(standings);if(competition.peruPhase==='Clausura')content+='<h3 class="season-heading">Tabela acumulada · Apertura + Clausura</h3>'+peruTableHtml(annual,Object.fromEntries(out.map(id=>[id,'zone-relegation'])))+'<div class="table-legend"><span class="legend-item relegation">Rebaixamento · 2 últimos</span></div>'+(competition.peruPlayoffs?.stage==='completed'?'<p class="access-confirmation">Campeão nacional: '+esc(getClub(competition.peruPlayoffs.champion)?.name||'')+'</p>':'');}
  else if(competition.peruDivision==='Liga 2'){if(competition.peruStage==='regional')content='<div class="argentina-rules"><p>Fase Regional: 18 clubes em dois grupos de nove, ida e volta (18 rodadas). Os seis primeiros de cada grupo avançam aos grupos de campeonato; os três últimos disputam os grupos de descenso.</p></div>'+['A','B'].map(z=>'<h3 class="season-heading">Grupo '+z+'</h3>'+peruTableHtml(peruRegionalTable(competition,z))).join('');else if(competition.peruStage==='final'&&competition.peruFinalGroups)content='<div class="argentina-rules"><p>Fase Final: três grupos de campeonato com quatro clubes e dois grupos de descenso com três clubes. Os quatro melhores da tabela acumulada dos grupos de campeonato avançam aos playoffs; o último de cada grupo de descenso é identificado para rebaixamento à Liga 3, divisão que não é simulada neste sistema.</p></div>'+['A','B','C'].map(z=>'<h3 class="season-heading">Grupo Campeonato '+z+'</h3>'+peruTableHtml(peruFinalTable(competition,z))).join('')+['A','B'].map(z=>'<h3 class="season-heading">Grupo Descenso '+z+'</h3>'+peruTableHtml(peruFinalTable(competition,'D'+z),Object.fromEntries(peruFinalTable(competition,'D'+z).slice(-1).map(r=>[r.id,'zone-relegation'])))).join('');else content='<h3 class="season-heading">Playoffs de acesso</h3><p class="muted">Etapa: '+esc(competition.peruPlayoffs?.stage||'Aguardando')+'</p>'+(competition.peruPlayoffs?.champion?'<p class="access-confirmation">Campeão: '+esc(getClub(competition.peruPlayoffs.champion)?.name||'')+'</p>':'');}
  else if(competition.argentinaType){const zones=['A','B'];content='<div class="argentina-rules"><p>'+esc(argentinaCompetitionDescription(competition))+'</p></div><div class="table-legend">'+(competition.argentinaType==='primera'?'<span class="legend-item playoff">Playoffs · 1º ao 8º de cada zona</span>':'<span class="legend-item access">Final pelo acesso · 1º de cada zona</span><span class="legend-item playoff">Reducido · 2º ao 8º</span>')+'</div>'+zones.map(z=>'<h3 class="season-heading">Zona '+z+'</h3><div class="table-wrap"><table class="standings"><thead><tr><th>#</th><th>Clube</th><th>P</th><th>J</th><th>V</th><th>E</th><th>D</th><th>GP</th><th>GC</th><th>SG</th></tr></thead><tbody>'+argentinaZoneStandings(competition,z).map((r,i)=>{const rank=i+1;const rowClass=competition.argentinaType==='primera'?(rank<=8?'zone-playoff':''):rank===1?'zone-access':rank<=8?'zone-playoff':'';return '<tr class="'+rowClass+'"><td>'+rank+'</td><td class="team-name">'+clubLink(r.club,r.club.name)+'</td><td>'+r.points+'</td><td>'+r.played+'</td><td>'+r.wins+'</td><td>'+r.draws+'</td><td>'+r.losses+'</td><td>'+r.gf+'</td><td>'+r.ga+'</td><td>'+(r.gf-r.ga)+'</td></tr>';}).join('')+'</tbody></table></div>').join('');if(competition.argentinaType==='primera'&&competition.phase==='Apertura'){const promedio=argentinaPromediosTable(season.year),period=promedio.years.length+' temporada(s): '+promedio.years.join(', ');content+='<h3 class="season-heading">Tabela de promedios</h3><p class="muted">Média calculada pelos pontos divididos pelos jogos disputados nas '+esc(period)+'. A janela cresce de 1 para 2 e depois 3 temporadas; a partir daí, considera sempre as 3 mais recentes. Somente partidas simuladas na Primera División entram no cálculo.</p><div class="table-wrap"><table class="standings"><thead><tr><th>#</th><th>Clube</th><th>Pontos</th><th>Jogos</th><th>Promedio</th></tr></thead><tbody>'+promedio.rows.map((r,i)=>'<tr><td>'+(i+1)+'</td><td class="team-name">'+clubLink(getClub(r.id),getClub(r.id)?.name||'Clube')+'</td><td>'+r.points+'</td><td>'+r.played+'</td><td>'+(r.average===null?'—':r.average.toFixed(3))+'</td></tr>').join('')+'</tbody></table></div>';const anual=argentinaAnnualTable(season.year),decision=argentinaRelegationDecision(season.year);content+='<h3 class="season-heading">Tabela anual acumulada</h3><p class="muted">Soma dos pontos do Apertura e do Clausura. A última posição define um dos rebaixamentos, exceto quando coincide com o último dos promedios.</p><div class="table-wrap"><table class="standings"><thead><tr><th>#</th><th>Clube</th><th>Pontos</th><th>Jogos</th><th>SG</th></tr></thead><tbody>'+anual.map((r,i)=>'<tr class="'+(decision.ready&&decision.relegated.includes(r.id)?'zone-relegation':'')+'"><td>'+(i+1)+'</td><td class="team-name">'+clubLink(getClub(r.id),getClub(r.id)?.name||'Clube')+'</td><td>'+r.points+'</td><td>'+r.played+'</td><td>'+(r.gf-r.ga)+'</td></tr>').join('')+'</tbody></table></div><div class="table-legend"><span class="legend-item relegation">Rebaixados · 2 clubes (promedios + tabela anual)</span></div><h3 class="season-heading">Rebaixamento previsto</h3><p class="muted">'+(decision.ready?'Promedios: '+esc(getClub(decision.promedios)?.name||'')+' ('+decision.average.toFixed(3)+'). Tabela anual: '+esc(getClub(decision.annual)?.name||'')+'. Os dois clubes serão rebaixados ao encerrar a temporada.':'Ainda não definido: '+esc(decision.reason))+'</p>';}}
  else if(competition.venezuelaDivision==='Primera División'){const annual=venezuelaAnnualTable(season.year),ready=annual.length===14&&annual.every(r=>r.played===26),out=ready?annual.slice(-1).map(r=>r.id):[];content='<div class="argentina-rules"><p>Venezuela 2026: Apertura e Clausura em turno único, 13 rodadas cada. A tabela acumulada soma os dois torneios; o último colocado é rebaixado à Liga FUTVE 2. Os oito primeiros avançam aos quadrangulares finais.</p></div><h3 class="season-heading">Tabela do Torneo '+esc(competition.venezuelaPhase)+'</h3>'+peruTableHtml(standings);if(competition.venezuelaPhase==='Clausura')content+='<h3 class="season-heading">Tabela acumulada · Apertura + Clausura</h3>'+peruTableHtml(annual,Object.fromEntries(out.map(id=>[id,'zone-relegation'])))+'<p class="access-confirmation">'+(ready?'Rebaixado: '+esc(getClub(out[0])?.name||'')+'.':'Aguardando a conclusão dos dois torneios.')+'</p>';}
   else if(competition.venezuelaDivision==='Segunda División'){content='<div class="argentina-rules"><p>Liga FUTVE 2 2026: 17 clubes em dois grupos regionais. Os quatro primeiros de cada grupo avançam ao mata-mata; o campeão conquista o acesso à Primera División.</p></div>'+['A','B'].map(z=>'<h3 class="season-heading">Grupo '+(z==='A'?'Centro-Occidental':'Centro-Oriental')+'</h3>'+peruTableHtml(getStandings({...competition,participants:competition.zones[z]}))).join('');}
   else if(competition.paraguayDivision==='Primera División'){
    const annual=paraguayAnnualTable(season.year),decisionReady=annual.length===12&&annual.every(r=>r.played===44),relegated=decisionReady?annual.slice(-2).map(r=>r.id):[];
    content='<div class="argentina-rules"><p>Paraguai 2026: Apertura e Clausura em turno e returno, com 22 rodadas cada. A tabela anual soma os pontos dos dois torneios; os dois últimos são rebaixados à División Intermedia.</p></div><h3 class="season-heading">Tabela do Torneo '+esc(competition.paraguayPhase)+'</h3>'+peruTableHtml(standings);
    if(competition.paraguayPhase==='Clausura')content+='<h3 class="season-heading">Tabela anual acumulada · Apertura + Clausura</h3>'+peruTableHtml(annual,Object.fromEntries(relegated.map(id=>[id,'zone-relegation'])))+'<div class="table-legend"><span class="legend-item relegation">Rebaixamento à División Intermedia · 2 clubes</span></div><p class="access-confirmation">'+(decisionReady?'Rebaixados à División Intermedia: '+relegated.map(id=>esc(getClub(id)?.name||'')).join(' e ')+'.':'Aguardando a conclusão dos dois torneios para definir os rebaixados.')+'</p>';
   }
   else if(competition.paraguayDivision==='División Intermedia'){
    const promoted=standings.slice(0,2).map(r=>r.id),ready=standings.length===16&&standings.every(r=>r.played===30);
    content='<div class="argentina-rules"><p>División Intermedia 2026: 16 clubes em turno e returno, com 30 rodadas. Os dois primeiros da classificação final conquistam o acesso à Primera División.</p></div>'+peruTableHtml(standings,Object.fromEntries((ready?promoted:[]).map(id=>[id,'zone-access'])))+'<div class="table-legend"><span class="legend-item access">Acesso à Primera División · 2 clubes</span></div><p class="access-confirmation">'+(ready?'Promovidos à Primera División: '+promoted.map(id=>esc(getClub(id)?.name||'')).join(' e ')+'.':'Aguardando a conclusão das 30 rodadas para definir os promovidos.')+'</p>';
   }
   else if(competition.chileDivision){
   const first=competition.chileDivision==='Primera División',p=competition.chilePlayoffs,rows=standings;
   content='<div class="argentina-rules"><p>Chile 2026: 16 clubes, 30 rodadas em turno e returno. '+(first?'Os dois últimos são rebaixados.':'O campeão sobe diretamente; do 2º ao 8º disputam a liguilla pelo segundo acesso.')+'</p></div><div class="table-legend">'+(first?'<span class="legend-item relegation">Rebaixamento · 2 últimos</span>':'<span class="legend-item access">Acesso direto · 1º</span><span class="legend-item playoff">Liguilla · 2º ao 8º</span>')+'</div><div class="table-wrap"><table class="standings"><thead><tr><th>#</th><th>Clube</th><th>P</th><th>J</th><th>V</th><th>E</th><th>D</th><th>GP</th><th>GC</th><th>SG</th></tr></thead><tbody>'+rows.map((r,i)=>{const rank=i+1,cls=first?(rank>=15?'zone-relegation':''):(rank===1?'zone-access':rank<=8?'zone-playoff':'');return '<tr class="'+cls+'"><td>'+rank+'</td><td class="team-name">'+clubLink(r.club,r.club.name)+'</td><td>'+r.points+'</td><td>'+r.played+'</td><td>'+r.wins+'</td><td>'+r.draws+'</td><td>'+r.losses+'</td><td>'+r.gf+'</td><td>'+r.ga+'</td><td>'+(r.gf-r.ga)+'</td></tr>';}).join('')+'</tbody></table></div>';
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
    content+='<h3 class="season-heading">Tabela anual de reclasificación</h3><div class="table-wrap"><table class="standings"><thead><tr><th>#</th><th>Clube</th><th>Pontos</th><th>Jogos</th><th>SG</th></tr></thead><tbody>'+annual.map((r,i)=>'<tr><td>'+(i+1)+'</td><td class="team-name">'+clubLink(getClub(r.id),getClub(r.id)?.name||'')+'</td><td>'+r.points+'</td><td>'+r.played+'</td><td>'+(r.gf-r.ga)+'</td></tr>').join('')+'</tbody></table></div>';
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
   content+='<h3 class="season-heading">Tabela anual acumulada</h3><p class="muted">Soma dos pontos do Apertura, Intermedio e Clausura. O líder anual avança diretamente à final quando não vencer o Apertura ou o Clausura.</p><div class="table-wrap"><table class="standings"><thead><tr><th>#</th><th>Clube</th><th>Pontos</th><th>Jogos</th><th>SG</th></tr></thead><tbody>'+annual.map((r,i)=>'<tr class="'+(i===0?'zone-access':'')+'"><td>'+(i+1)+'</td><td class="team-name">'+clubLink(getClub(r.id),getClub(r.id)?.name||'')+'</td><td>'+r.points+'</td><td>'+r.played+'</td><td>'+(r.gf-r.ga)+'</td></tr>').join('')+'</tbody></table></div>';
   content+='<h3 class="season-heading">Tabela de promedios · rebaixamento</h3><p class="muted">Média de pontos por jogo nas duas temporadas mais recentes disponíveis ('+esc(avg.years.join(' e '))+'). Em 2026, considera apenas a temporada disponível. Os três piores promedios serão rebaixados.</p><div class="table-wrap"><table class="standings"><thead><tr><th>#</th><th>Clube</th><th>Pontos</th><th>Jogos</th><th>Promedio</th></tr></thead><tbody>'+avg.rows.map((r,i)=>'<tr class="'+(decision.ready&&decision.relegated.includes(r.id)?'zone-relegation':'')+'"><td>'+(i+1)+'</td><td class="team-name">'+clubLink(getClub(r.id),getClub(r.id)?.name||'')+'</td><td>'+r.points+'</td><td>'+r.played+'</td><td>'+(r.average===null?'—':r.average.toFixed(3))+'</td></tr>').join('')+'</tbody></table></div><p class="muted">'+(decision.ready?'Três rebaixados previstos: '+decision.relegated.map(id=>esc(getClub(id)?.name||'')).join(', '):'Aguardando partidas para calcular os promedios.')+'</p>';
  }
  else if(competition.uruguayType==='segunda-regular'){
   if(competition.uruguayAccess)uruguayEnsureAccessPlayoffs(competition);
   const p=competition.uruguayAccess;
   content='<div class="table-legend"><span class="legend-item access">Verde · 1º e 2º (acesso direto) e vencedor do playoff</span><span class="legend-item playoff">Amarelo · 3º ao 6º enquanto disputa o playoff</span></div><div class="table-wrap"><table class="standings"><thead><tr><th>#</th><th>Clube</th><th>P</th><th>J</th><th>V</th><th>E</th><th>D</th><th>GP</th><th>GC</th><th>SG</th></tr></thead><tbody>'+standings.map((r,i)=>'<tr class="'+(i<2||(p?.completed&&p.promotedThird===r.id)?'zone-access':i<6?'zone-playoff':'')+'"><td>'+(i+1)+'</td><td class="team-name">'+clubLink(r.club,r.club.name)+'</td><td>'+r.points+'</td><td>'+r.played+'</td><td>'+r.wins+'</td><td>'+r.draws+'</td><td>'+r.losses+'</td><td>'+r.gf+'</td><td>'+r.ga+'</td><td>'+(r.gf-r.ga)+'</td></tr>').join('')+'</tbody></table></div>';
  }
  else content='<div class="table-legend">'+(competition.division==='A'?'<span class="legend-item relegation">Rebaixamento · 17º ao 20º</span>':'<span class="legend-item access">Acesso direto · 1º e 2º</span><span class="legend-item playoff">Playoffs · 3º ao 6º</span>')+'</div><div class="table-wrap"><table class="standings"><thead><tr><th>#</th><th>Clube</th><th>P</th><th>J</th><th>V</th><th>E</th><th>D</th><th>GP</th><th>GC</th><th>SG</th></tr></thead><tbody>'+standings.map((r,i)=>{const rank=i+1,winner=competition.playoffs?.ties?.some(t=>playoffWinner(t)===r.id);const zone=competition.division==='A'?(rank>=17?'zone-relegation':''):(rank<=2||winner?'zone-access':rank<=6?'zone-playoff':'');return '<tr class="'+zone+'"><td>'+rank+'</td><td class="team-name">'+clubLink(r.club,r.club.name)+'</td><td>'+r.points+'</td><td>'+r.played+'</td><td>'+r.wins+'</td><td>'+r.draws+'</td><td>'+r.losses+'</td><td>'+r.gf+'</td><td>'+r.ga+'</td><td>'+(r.gf-r.ga)+'</td></tr>';}).join('')+'</tbody></table></div>'+(competition.division==='B'&&competition.playoffs?'<p class="muted">Os vencedores do mata-mata aparecem em verde: acesso garantido.</p>':'');
 }else if(section==='games'){
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
  content+=rounds.length?'<div class="round-actions"><span class="muted">Rodadas: '+rounds.length+' · Jogos concluídos: '+rounds.reduce((n,r)=>n+r.matches.filter(m=>m.homeGoals!==null).length,0)+'</span><div class="round-controls"><label for="simulate-count">Simular próximas</label><select id="simulate-count">'+[1,2,3,4,5].map(n=>'<option value="'+n+'" '+(n===5?'selected':'')+'>'+n+' rodada(s)</option>').join('')+'</select><button class="btn" id="simulate-rounds">Simular resultados</button></div></div>'+rounds.map(r=>'<div class="round-card"><div class="round-title"><strong>Rodada '+r.number+'</strong><span class="tag">'+(r.matches.every(m=>m.homeGoals!==null)?'Concluída':'Pendente')+'</span></div>'+r.matches.map(m=>'<div class="fixture"><span class="fixture-team">'+clubLink(getClub(m.home),getClub(m.home).name)+'</span><strong class="score">'+(m.homeGoals===null?'—':m.homeGoals+' × '+m.awayGoals)+'</strong><span class="fixture-team away">'+clubLink(getClub(m.away),getClub(m.away).name)+'</span></div>').join('')+'</div>').join('') :(competition.boliviaDivision&&competition.boliviaStage==='knockout'||competition.libertadoresCompetition?'':'<div class="empty">Inscreva pelo menos dois clubes para gerar as rodadas automaticamente.</div>');
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
