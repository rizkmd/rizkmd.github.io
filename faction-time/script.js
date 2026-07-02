const members = [
  {name:"Kim",    role:"bx",  tz:"Asia/Jakarta"},
  {name:"Nemo",   role:"bx", tz:"America/Chicago"},
  {name:"Tony",   role:"bx",  tz:"America/Chicago"},
  {name:"Gerroe",    role:"m",  tz:"Africa/Johannesburg"},
  {name:"Heliosvx",    role:"m",  tz:"Europe/Amsterdam"},
  {name:"Jolomann",    role:"m",  tz:"Europe/Amsterdam"},
  {name:"Kobe",   role:"m",  tz:"Europe/Paris"},
  {name:"Mothenise",    role:"m",  tz:"Europe/Amsterdam"},
  {name:"VoidWhisp",    role:"m",  tz:"Europe/Amsterdam"},
  {name:"Jblack",    role:"m",  tz:"Asia/Yangon"},
  {name:"Altay",    role:"m",  tz:"Asia/Jakarta"},
  {name:"Belry",    role:"m",  tz:"Asia/Singapore"},
  {name:"Deadlocks",    role:"m",  tz:"Asia/Singapore"},
  {name:"Braxton",  role:"m", tz:"America/Chicago"},
  {name:"Pepe",  role:"m", tz:"America/Toronto"},
  {name:"Bender", role:"m",  tz:"America/Sao_Paulo"},
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