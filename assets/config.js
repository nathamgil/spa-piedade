/* =====================================================================
   Spa das Sobrancelhas Piedade — configuração
   Fonte: Instagram @spapiedade (18/11/2026). Bio: "Unidade destaque em
   Dermolev e Fio a fio no Brasil", Shopping Piedade Piso L2, seg à sáb
   das 9h às 20h, Tel (71) 3266-6093, WhatsApp (71) 98300-0352.
   Serviços tirados dos posts e destaques. Preços, duração e equipe: A CONFIRMAR.
   ===================================================================== */
window.TV = {
  nome:        'Spa das Sobrancelhas Piedade',
  nomeCurto:   'Spa Piedade',
  slogan:      'Unidade destaque em Dermolev e Fio a fio no Brasil',
  instagram:   'spapiedade',
  prefixoDemo: 'spp_',
  logo:        'assets/monograma.svg',

  textoPreco: 'Sob consulta',
  rotServico: 'Procedimento',
  textoSite:  'Agendei meu horário pelo site do Spa das Sobrancelhas Piedade.',
  contatoTxt: 'chame a unidade no WhatsApp',

  whatsappLink:    'https://wa.me/5571983000352',
  whatsapp:        '5571983000352',
  whatsappVisivel: '(71) 98300-0352',

  endereco: {
    linha1: 'Shopping Piedade, Piso L2',
    linha2: 'Salvador — BA',
    maps:   'https://www.google.com/maps/search/?api=1&query=Shopping+Piedade+Salvador',
    embed:  '',
    busca:  'Shopping Piedade, Salvador - BA'
  },
  funcionamento: 'Segunda a sábado, das 9h às 20h',

  supabaseUrl: '',
  supabaseKey: '',

  regras: { passoMin: 30, antecedenciaMin: 60, janelaDias: 30, cancelamentoH: 4 },
  semPreferencia: false,

  /* Horário da bio: seg à sáb, 9h às 20h. Domingo fechado. */
  expediente: {
    0: { aberto: false },
    1: { aberto: true, abre: '09:00', fecha: '20:00' },
    2: { aberto: true, abre: '09:00', fecha: '20:00' },
    3: { aberto: true, abre: '09:00', fecha: '20:00' },
    4: { aberto: true, abre: '09:00', fecha: '20:00' },
    5: { aberto: true, abre: '09:00', fecha: '20:00' },
    6: { aberto: true, abre: '09:00', fecha: '20:00' }
  },

  /* "Com quem" = unidade (equipe: a confirmar) */
  artistas: [
    { slug: 'piedade', nome: 'Shopping Piedade', apelido: 'Shopping Piedade', instagram: 'spapiedade', whatsapp: '5571983000352',
      foto: 'fotos/f2.jpg', oficio: 'Unidade', linha: 'Piso L2',
      estilos: ['Dermolev', 'Fio a fio', 'Micropigmentação Shadow', 'Micro labial', 'Sobrancelha masculina'] }
  ],

  objetivos: [
    { id: 'falhas',      nome: 'Preencher falhas',      icone: '◐' },
    { id: 'desenho',     nome: 'Desenho mais bonito',   icone: '◇' },
    { id: 'praticidade', nome: 'Acordar pronta',        icone: '✦' },
    { id: 'labios',      nome: 'Cor nos lábios',        icone: '◌' },
    { id: 'homem',       nome: 'Sobrancelha masculina', icone: '◎' },
    { id: 'todos',       nome: 'Ainda não sei',         icone: '?' }
  ],

  /* Procedimentos citados nos posts e destaques. Preço e duração: A CONFIRMAR. */
  servicosDemo: [
    { id:'dermolev', nome:'Dermolev', categoria:'Sobrancelhas', objetivos:['falhas','desenho'],
      descricao:'O carro-chefe da casa: a unidade é destaque nacional em Dermolev.', preco_centavos:0, a_partir_de:false, duracao_min:60,
      selo:'Destaque no Brasil', fonte:'Bio do Instagram',
      paraQuem:'Para quem quer sobrancelhas mais cheias e definidas.',
      sessao:'Avaliação do rosto, desenho e aplicação. Detalhes técnicos com a equipe.' },
    { id:'fio-a-fio', nome:'Fio a fio', categoria:'Micropigmentação', objetivos:['falhas','praticidade'],
      descricao:'Fios desenhados um a um para um resultado natural. Também destaque nacional da unidade.', preco_centavos:0, a_partir_de:false, duracao_min:120,
      selo:'Destaque no Brasil', fonte:'Bio do Instagram',
      paraQuem:'Para quem tem falhas e quer efeito de pelo natural.',
      sessao:'Desenho estratégico antes, pigmentação fio a fio e orientação de cuidados.' },
    { id:'shadow', nome:'Micropigmentação Shadow', categoria:'Micropigmentação', objetivos:['praticidade','desenho'],
      descricao:'Efeito sombreado e preenchido, como sobrancelha maquiada.', preco_centavos:0, a_partir_de:false, duracao_min:120, fonte:'Post do Instagram',
      paraQuem:'Para quem gosta da sobrancelha marcada e quer acordar pronta.',
      sessao:'Desenho, pigmentação em sombreado e retorno para ajuste.' },
    { id:'look-frances', nome:'Look francês + design estratégico', categoria:'Sobrancelhas', objetivos:['desenho'],
      descricao:'Design pensado para o formato do rosto, com acabamento leve.', preco_centavos:0, a_partir_de:false, duracao_min:60, fonte:'Post do Instagram',
      paraQuem:'Para quem quer mudar o desenho sem perder a naturalidade.',
      sessao:'Mapeamento do rosto e design sob medida.' },
    { id:'micro-labial', nome:'Micropigmentação labial', categoria:'Lábios', objetivos:['labios','praticidade'],
      descricao:'Cor e contorno nos lábios que duram.', preco_centavos:0, a_partir_de:false, duracao_min:120, fonte:'Destaque do Instagram',
      paraQuem:'Para quem quer lábios com mais cor sem depender do batom.',
      sessao:'Escolha do tom, pigmentação e orientação de cuidados.' },
    { id:'fio-homens', nome:'Fio a fio masculino', categoria:'Masculino', objetivos:['homem','falhas'],
      descricao:'Preenchimento discreto para homens, sem cara de feito.', preco_centavos:0, a_partir_de:false, duracao_min:90, fonte:'Destaque Fio em homens',
      paraQuem:'Para homens com falhas ou cicatriz na sobrancelha.',
      sessao:'Desenho respeitando o pelo natural e pigmentação discreta.' },
    { id:'retorno', nome:'Retorno de micropigmentação', categoria:'Micropigmentação', objetivos:['falhas'],
      descricao:'Revisão para ajustar cor e preencher pontos que clarearam.', preco_centavos:0, a_partir_de:false, duracao_min:60, fonte:'Post do Instagram',
      paraQuem:'Para quem já fez e está na hora do retoque.',
      sessao:'Avaliação da cicatrização e reforço onde precisa.' },
    { id:'nao-sei', nome:'Quero uma avaliação', categoria:'Ainda não sei', objetivos:['*'],
      descricao:'A equipe olha o seu rosto e indica a técnica certa.', preco_centavos:0, a_partir_de:false, duracao_min:30, fonte:'—',
      paraQuem:'Para quem ainda não sabe qual técnica escolher.', sessao:'Conversa rápida e avaliação.' }
  ]
};

window.TV.barbeirosDemo = window.TV.artistas.map(function (a) {
  return { id: a.slug, slug: a.slug, nome: a.nome, foto: a.foto, instagram: a.instagram,
           whatsapp: a.whatsapp, cargo: a.linha };
});
window.TV.artistaPor = function (chave) {
  return window.TV.artistas.filter(function (a) {
    return a.slug === chave || a.nome === chave || a.instagram === chave;
  })[0] || null;
};
window.TV.servicoPor = function (id) {
  return window.TV.servicosDemo.filter(function (s) { return s.id === id; })[0] || null;
};
window.TV.modoDemo = !(window.TV.supabaseUrl && window.TV.supabaseKey);
