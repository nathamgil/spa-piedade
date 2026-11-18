/* =====================================================================
   Vitrine da Equilíbrio do Corpo (todas as páginas) — não depende do motor.
   - faixa de demo, ano, menu do celular, página atual no menu
   - cards de tratamento (capa) e fichas completas (tratamentos.html)
   - "próxima sessão livre" na capa (usa o motor quando ele carrega)
   - links de WhatsApp, FAQ, botão flutuante
   ===================================================================== */
(function () {
  'use strict';

  var CFG = window.TV;
  function $(s) { return document.querySelector(s); }
  function $$(s) { return Array.prototype.slice.call(document.querySelectorAll(s)); }
  function el(tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  }

  $$('.ano').forEach(function (n) { n.textContent = new Date().getFullYear(); });
  if (CFG.modoDemo && $('#faixa-demo')) $('#faixa-demo').hidden = false;
  $$('[data-zap]').forEach(function (a) { a.href = CFG.whatsapp ? 'https://wa.me/' + CFG.whatsapp : CFG.whatsappLink; });

  /* ---- menu ---- */
  var bm = $('#btn-menu'), menu = $('#menu');
  if (bm && menu) {
    bm.addEventListener('click', function () {
      var ab = bm.getAttribute('aria-expanded') === 'true';
      bm.setAttribute('aria-expanded', ab ? 'false' : 'true');
      menu.classList.toggle('aberto', !ab);
    });
    menu.addEventListener('click', function (ev) {
      if (ev.target.closest('a')) { bm.setAttribute('aria-expanded', 'false'); menu.classList.remove('aberto'); }
    });
  }
  var aqui = location.pathname.split('/').pop() || 'index.html';
  $$('#menu a').forEach(function (a) {
    var h = a.getAttribute('href');
    if (h === aqui) a.setAttribute('aria-current', 'page');
  });

  var linhas = CFG.servicosDemo.filter(function (s) { return s.id !== 'nao-sei'; });

  /* ---- cards da capa ---- */
  var grade = $('#grade-tratamentos');
  if (grade) {
    linhas.forEach(function (s, i) {
      var a = el('a', 'trat-card' + (s.selo ? ' trat-destaque' : ''));
      a.href = 'tratamentos.html#' + s.id;
      a.appendChild(el('span', 'trat-num', String(i + 1).padStart(2, '0')));
      if (s.selo) a.appendChild(el('span', 'selo', s.selo));
      a.appendChild(el('h3', null, s.nome));
      a.appendChild(el('p', null, s.descricao));
      a.appendChild(el('span', 'trat-mais', 'Para quem é e como funciona →'));
      grade.appendChild(a);
    });
  }

  /* ---- fichas completas (tratamentos.html) ---- */
  var fichas = $('#fichas'), indice = $('#indice');
  if (fichas) {
    var cats = [];
    linhas.forEach(function (s) { if (cats.indexOf(s.categoria) < 0) cats.push(s.categoria); });
    cats.forEach(function (c) {
      var g = el('div', 'indice-grupo');
      g.appendChild(el('b', null, c));
      linhas.filter(function (s) { return s.categoria === c; }).forEach(function (s) {
        var a = el('a', null, s.nome); a.href = '#' + s.id; g.appendChild(a);
      });
      indice.appendChild(g);
    });
    linhas.forEach(function (s, i) {
      var f = el('article', 'ficha');
      f.id = s.id;
      var lado = el('div', 'ficha-lado');
      lado.appendChild(el('span', 'trat-num', String(i + 1).padStart(2, '0')));
      lado.appendChild(el('span', 'ficha-cat', s.categoria));
      var arco = el('div', 'arco arco-mini');
      arco.appendChild(el('span', 'arco-txt', 'Foto do ' + (s.id === 'start-mulher' ? 'método' : 'tratamento') + ' em breve'));
      lado.appendChild(arco);
      f.appendChild(lado);
      var corpo = el('div', 'ficha-corpo');
      var h = el('h2', null, s.nome);
      if (s.selo) h.appendChild(el('span', 'selo', s.selo));
      corpo.appendChild(h);
      corpo.appendChild(el('p', 'ficha-resumo', s.descricao));
      var dl = el('div', 'ficha-blocos');
      [['Para quem é', s.paraQuem], ['Como funciona a sessão', s.sessao], ['Investimento', 'Sob sessão: o valor sai do plano montado na sessão.']].forEach(function (b) {
        var d = el('div', 'ficha-bloco');
        d.appendChild(el('h3', null, b[0]));
        d.appendChild(el('p', null, b[1]));
        dl.appendChild(d);
      });
      corpo.appendChild(dl);
      var ac = el('div', 'acoes');
      var ag = el('a', 'btn btn-cacau', 'Agendar sessão para ' + s.nome);
      ag.href = 'index.html?tratamento=' + s.id + '#agendar';
      ac.appendChild(ag);
      if (s.id === 'start-mulher') { var m = el('a', 'btn btn-linha', 'Conhecer o método'); m.href = 'metodo.html'; ac.appendChild(m); }
      corpo.appendChild(ac);
      f.appendChild(corpo);
      fichas.appendChild(f);
    });
    if (location.hash) setTimeout(function () { var x = document.getElementById(location.hash.slice(1)); if (x) x.scrollIntoView(); }, 60);
  }

  /* ---- objetivos na capa: levam ao agendamento já filtrado ---- */
  var objCapa = $('#objetivos-capa');
  if (objCapa) {
    CFG.objetivos.forEach(function (o) {
      var b = el('a', 'obj-capa');
      b.href = 'index.html?objetivo=' + o.id + '#agendar';
      b.appendChild(el('span', 'obj-ic', o.icone));
      b.appendChild(el('span', null, o.nome));
      b.addEventListener('click', function (ev) {
        if (!CFG.escolheObjetivo || !$('#agendar-app')) return;
        ev.preventDefault();
        CFG.escolheObjetivo(o.id);
        $('#agendar').scrollIntoView({ behavior: 'smooth' });
      });
      objCapa.appendChild(b);
    });
  }

  /* ---- próxima sessão livre (capa) ---- */
  var prox = $('#prox-vaga');
  if (prox) {
    document.addEventListener('tv:dados', function (ev) {
      var b = ev.detail.barbeiros[0], s = ev.detail.servicos.filter(function (x) { return (x.slug || x.id) === 'nao-sei'; })[0] || ev.detail.servicos[0];
      if (!b || !s || !CFG.proximoLivre) return;
      CFG.proximoLivre(b, s).then(function (v) {
        if (!v) return;
        $('#prox-quando').textContent = CFG.diaRelativo(v.dia) + ' · ' + v.hora;
        $('#prox-reservar').onclick = function () {
          CFG.agendarDireto(b.id, s.id, v.dia, v.hora);
          $('#agendar').scrollIntoView({ behavior: 'smooth' });
        };
        prox.hidden = false;
      });
    });
  }

  /* ---- FAQ: um aberto por vez ---- */
  $$('.faq details').forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) $$('.faq details').forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  /* ---- botão flutuante ---- */
  var flutua = $('.flutua'), agendar = $('#agendar');
  if (flutua) {
    var visto = false;
    var atualiza = function () { flutua.hidden = window.scrollY < window.innerHeight * 0.7 || visto; };
    if (agendar && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { visto = es[0].isIntersecting; atualiza(); }, { threshold: 0.05 }).observe(agendar);
    }
    window.addEventListener('scroll', atualiza, { passive: true });
    atualiza();
  }
  window.addEventListener('load', function () {
    var alvo = location.hash === '#agendar' && document.getElementById('agendar');
    if (alvo) setTimeout(function () { alvo.scrollIntoView(); }, 150);
  });
})();
