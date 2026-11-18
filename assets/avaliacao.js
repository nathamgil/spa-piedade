/* =====================================================================
   Peças do agendamento de AVALIAÇÃO — carrega ANTES de agenda.js.
   Etapas na tela: Objetivo e tratamento → Sobre você → Dia → Seus dados.
   - objetivo (chips) filtra a lista de tratamentos (CFG.filtroServico)
   - "Sobre você": perguntas rápidas de pré-sessão, todas opcionais
   - entrega tudo ao motor como observação (CFG.montaObs / resumoProjeto)
   - no fim, abre o WhatsApp da clínica com o resumo copiado
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
  if (!$('#agendar-app')) return;

  /* ---- objetivo ---- */
  var objetivo = null;
  function cfgDe(s) {
    // no modo real o serviço vem do banco (slug); no demo, do config (id)
    return CFG.servicoPor(s.slug || s.id) || CFG.servicosDemo.filter(function (x) { return x.nome === s.nome; })[0] || {};
  }
  CFG.filtroServico = function (s) {
    if (!objetivo || objetivo.id === 'todos') return true;
    var o = cfgDe(s).objetivos || [];
    return o.indexOf('*') >= 0 || o.indexOf(objetivo.id) >= 0;
  };
  var boxObj = $('#obj-chips'), tituloTrat = $('#trat-titulo');
  CFG.objetivos.forEach(function (o) {
    var b = el('button', 'obj');
    b.type = 'button'; b.setAttribute('aria-pressed', 'false'); b.setAttribute('data-obj', o.id);
    b.appendChild(el('span', 'obj-ic', o.icone));
    b.appendChild(el('span', null, o.nome));
    b.addEventListener('click', function () { escolheObjetivo(o); });
    boxObj.appendChild(b);
  });
  function escolheObjetivo(o) {
    objetivo = o;
    $$('#obj-chips .obj').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-obj') === o.id ? 'true' : 'false'); });
    tituloTrat.textContent = o.id === 'todos' ? 'Todos os tratamentos' : 'Tratamentos para: ' + o.nome.toLowerCase();
    $('#trat-box').classList.add('trat-aberto');
    if (CFG.repintaServicos) CFG.repintaServicos();
    $('#trat-box').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  CFG.escolheObjetivo = function (id) {
    var o = CFG.objetivos.filter(function (x) { return x.id === id; })[0];
    if (o) escolheObjetivo(o);
  };

  /* ---- chips de escolha única (Sobre você) ---- */
  $$('[data-grupo]').forEach(function (box) {
    box.addEventListener('click', function (ev) {
      var c = ev.target.closest('.chip'); if (!c) return;
      var ligado = c.getAttribute('aria-pressed') === 'true';
      Array.prototype.forEach.call(box.querySelectorAll('.chip'), function (x) { x.setAttribute('aria-pressed', 'false'); });
      c.setAttribute('aria-pressed', ligado ? 'false' : 'true');
    });
  });
  function respostas() {
    return $$('[data-grupo]').map(function (g) {
      var c = g.querySelector('.chip[aria-pressed="true"]');
      return c ? g.getAttribute('data-rotulo') + ': ' + c.textContent : '';
    }).filter(Boolean);
  }

  /* ---- ganchos do motor ---- */
  CFG.anexos = function () { return []; };
  CFG.montaObs = function () {
    var relato = $('#pj-ideia').value.trim(), ref = $('#cli-obs').value.trim();
    return ['Objetivo: ' + (objetivo ? objetivo.nome : 'não informado')]
      .concat(respostas(), [relato ? 'Relato: ' + relato : '', ref ? 'Observação: ' + ref : ''])
      .filter(Boolean).join('\n');
  };
  CFG.resumoProjeto = function () { return ['Objetivo', objetivo ? objetivo.nome : 'A definir na sessão']; };
  CFG.limpaProjeto = function () {
    $$('#projeto .chip').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
    $('#pj-ideia').value = '';
    objetivo = null;
    $$('#obj-chips .obj').forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
    $('#trat-box').classList.remove('trat-aberto');
    tituloTrat.textContent = 'Todos os tratamentos';
  };
  $('#pj-continuar').addEventListener('click', function () { CFG.projetoPronto(); });

  /* ---- fim: WhatsApp da clínica (link da bio não aceita texto pronto) ---- */
  function copia(aviso) {
    var txt = CFG.ultimoResumo || '', saida = $('#ok-copiado');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(function () { saida.textContent = aviso; }, function () { saida.textContent = txt; });
    } else saida.textContent = txt;
  }
  document.addEventListener('tv:agendado', function () {
    var zap = $('#ok-zap');
    if (!(CFG.ultimoDestino || {}).zap && CFG.whatsappLink) {
      zap.href = CFG.whatsappLink;
      zap.textContent = 'Copiar resumo e abrir o WhatsApp';
      zap.classList.remove('btn-direct');
      CFG.ultimoDestino = { zap: '', link: CFG.whatsappLink };
    }
  });
  $('#ok-zap').addEventListener('click', function () {
    if (!(CFG.ultimoDestino || {}).zap) copia('Resumo copiado. É só colar na conversa do WhatsApp que abriu.');
  });
  $('#ok-copiar').addEventListener('click', function () { copia('Resumo copiado.'); });

  /* ---- chegou de outra página: ?tratamento=lipedema ou ?objetivo=gestacao ---- */
  document.addEventListener('tv:dados', function () {
    var q = new URLSearchParams(location.search);
    var obj = q.get('objetivo'), trat = q.get('tratamento');
    if (obj) CFG.escolheObjetivo(obj);
    if (trat && CFG.agendarServico) {
      CFG.agendarServico(trat);
      setTimeout(function () { $('#agendar').scrollIntoView(); }, 80);
    }
  });
})();
