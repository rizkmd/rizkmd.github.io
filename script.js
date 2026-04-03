const members = [
  {name:"Pablo",  role:"bx", tz:"Europe/London"},
  {name:"Vic",    role:"bx",  tz:"Europe/London"},
  {name:"Kim",    role:"bx",  tz:"Asia/Jakarta"},
  {name:"Nemo",   role:"bx", tz:"America/Chicago"},
  {name:"Tony",   role:"bx",  tz:"America/Chicago"},
  {name:"Bailey",  role:"m",  tz:"Europe/London"},
  {name:"Mikey",  role:"m",  tz:"Europe/London"},
  {name:"Ais",    role:"m",  tz:"Africa/Johannesburg"},
  {name:"Gerroe",    role:"m",  tz:"Africa/Johannesburg"},
  {name:"Kobe",   role:"m",  tz:"Europe/Paris"},
  {name:"Nyx",    role:"m",  tz:"Europe/Helsinki"},
  {name:"Kuruman",    role:"m",  tz:"Europe/Helsinki"},
  {name:"Sarica", role:"m",  tz:"Europe/Helsinki"},
  {name:"Metrogomez", role:"m",  tz:"Europe/Istanbul"},
  {name:"Talaaa", role:"m",  tz:"Europe/Istanbul"},
  {name:"Spamwithtam",    role:"m",  tz:"Asia/Kolkata"},
  {name:"Alcatraz",    role:"m",  tz:"Asia/Jakarta"},
  {name:"Belry",    role:"m",  tz:"Asia/Singapore"},
  {name:"Kantonero",    role:"m",  tz:"Asia/Singapore"},
  {name:"Possitive_under",    role:"m",  tz:"Asia/Singapore"},
  {name:"Schizonova",    role:"m",  tz:"Asia/Singapore"},
  {name:"Sloppy",    role:"m",  tz:"Asia/Singapore"},
  {name:"L33t",    role:"m",  tz:"Australia/Sydney"},
  {name:"Sizzle",    role:"m",  tz:"Australia/Sydney"},
  {name:"Jarkck",    role:"m",  tz:"America/Vancouver"},
  {name:"Jilbey",    role:"m",  tz:"America/Vancouver"},
  {name:"Roheezy",    role:"m",  tz:"America/Vancouver"},
  {name:"Aloro",    role:"m",  tz:"America/Chicago"},
  {name:"Braxton",  role:"m", tz:"America/Chicago"},
  {name:"Little Pablo",  role:"m", tz:"America/Chicago"},
  {name:"Hamlito",  role:"m", tz:"America/Toronto"},
  {name:"Matriark",  role:"m", tz:"America/Toronto"},
  {name:"Pepe",  role:"m", tz:"America/Toronto"},
  {name:"Spider",  role:"m", tz:"America/Toronto"},
  {name:"Wrathkon",  role:"m", tz:"America/Toronto"},
  {name:"Bender", role:"m",  tz:"America/Sao_Paulo"},
  {name:"Webra", role:"m",  tz:"America/Sao_Paulo"},
];

function fmt(tz) {
  return new Date().toLocaleTimeString('en-GB', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: tz
  });
}

function fmtDate(tz) {
  return new Date().toLocaleDateString('en-GB', {
    weekday: 'short', month: 'short', day: 'numeric', timeZone: tz
  });
}

function tzLabel(tz) {
  return new Date().toLocaleTimeString('en-GB', {
    timeZoneName: 'short', timeZone: tz
  }).split(' ').pop();
}

function makeCard(m, idx) {
  const pipClass = m.role === 'bx' ? 'pip-bx' : m.role === 'b' ? 'pip-b' : 'pip-m';
  const d = document.createElement('div');
  d.className = 'card';
  d.innerHTML = `
    <div class="role-pip ${pipClass}"></div>
    <div class="card-name">${m.name}</div>
    <div class="card-clock" id="c-${idx}"></div>
    <div class="card-sub" id="d-${idx}"></div>
  `;
  return d;
}

members.forEach((m, i) => {
  const grid = m.role === 'bx'
    ? document.getElementById('grid-bx')
    : m.role === 'b'
    ? document.getElementById('grid-b')
    : document.getElementById('grid-m');
  grid.appendChild(makeCard(m, i));
});

function tick() {
  document.getElementById('tc-clock').textContent = fmt('UTC');
  document.getElementById('tc-date').textContent = fmtDate('UTC') + ' · UTC';
  members.forEach((m, i) => {
    const ce = document.getElementById('c-' + i);
    const de = document.getElementById('d-' + i);
    if (ce) ce.textContent = fmt(m.tz);
    if (de) de.textContent = fmtDate(m.tz) + ' · ' + tzLabel(m.tz);
  });
}

tick();
setInterval(tick, 1000);