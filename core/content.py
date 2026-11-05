"""Conteúdo editável do site CT Angelo Maximo.

Tudo que aparece na página e depende de informação real da academia fica aqui.
Para atualizar horários, preços, professores ou contatos, edite este arquivo;
os templates só leem estas listas. Não coloque aqui informação que não foi
confirmada pelo proprietário.
"""

CONTACT = {
    "name": "CT Angelo Maximo",
    "whatsapp": "5511997993888",
    "whatsapp_display": "(11) 99799-3888",
    "address_lines": ["Rua Benjamin Constant, 1271", "Travessa Sara Cooper, 96"],
    "instagram_handle": "@ctangelomaximojj",
    "instagram_url": "https://www.instagram.com/ctangelomaximojj/",
    "maps_query": "CT Angelo Maximo, Rua Benjamin Constant, 1271",
}

TRIAL_MESSAGE = "Olá! Quero agendar uma aula experimental grátis no CT Angelo Maximo."

NAV = [
    {"id": "inicio", "label": "Início"},
    {"id": "a-academia", "label": "A Academia"},
    {"id": "modalidades", "label": "Modalidades"},
    {"id": "professores", "label": "Professores"},
    {"id": "horarios", "label": "Horários"},
    {"id": "planos", "label": "Planos"},
    {"id": "filiais", "label": "Filiais"},
    {"id": "contato", "label": "Contato"},
]

VALUES = [
    {"icon": "shield", "title": "Disciplina", "text": "Rotina de treino, pontualidade e foco dentro e fora do tatame."},
    {"icon": "heart", "title": "Respeito", "text": "Pelo professor, pelo parceiro de treino e por quem está começando."},
    {"icon": "trend", "title": "Evolução constante", "text": "Cada aula é um passo a mais na técnica, na condição física e na confiança."},
    {"icon": "users", "title": "Espírito de equipe", "text": "Ninguém evolui sozinho: o treino é feito em dupla e a academia é uma equipe."},
    {"icon": "trophy", "title": "Formação de atletas", "text": "Treino de competição aos sábados para quem quer evoluir como atleta."},
]

MODALITIES = [
    {
        "title": "Jiu-Jítsu adulto",
        "tag": "Adulto",
        "text": "Turmas mistas e Feminino/Masculino, com aulas de kimono e de no-gi ao longo da semana.",
        "link": "schedule",
    },
    {
        "title": "Jiu-Jítsu infantil",
        "tag": "Até 12 anos",
        "text": "Turmas Kids e Kids II às terças e quintas.",
        "link": "schedule",
    },
    {
        "title": "Treino de competição",
        "tag": "Sábado",
        "text": "Treino de competição aos sábados, das 9h às 10h30.",
        "link": "schedule",
    },
    {
        "title": "Defesa pessoal",
        "tag": "Sexta",
        "text": "Aula de defesa pessoal às sextas, das 19h30 às 20h30.",
        "link": "schedule",
    },
    {
        "title": "Boxe",
        "tag": "Professor Eddi",
        "text": "Aulas de boxe com o professor Eddi. Consulte turmas e horários pelo WhatsApp.",
        "link": "whatsapp",
        "message": "Olá! Quero saber os horários das aulas de boxe.",
    },
    {
        "title": "Muay Thai",
        "tag": "Gardenal Fight Team",
        "text": "Aulas de muay thai com o professor Christofer Souza, da equipe Gardenal Fight Team. Consulte turmas e horários pelo WhatsApp.",
        "link": "whatsapp",
        "message": "Olá! Quero saber os horários das aulas de muay thai.",
    },
]

# Fotos: coloque o arquivo em core/static/core/professores/<slug>.jpg (ou .webp/.png).
TEAM = [
    {
        "slug": "angelo",
        "name": "Angelo Maximo Leite de Oliveira",
        "role": "Jiu-Jítsu · Líder do CT",
        "featured": True,
        "bio": (
            "Desde 2014, desenvolvo um projeto social de Jiu-Jítsu voltado para jovens, utilizando as artes "
            "marciais como ferramenta de transformação por meio de valores como respeito, disciplina, gratidão "
            "e amor. Em 2022, ao lado da minha esposa, fundei o Instituto Construindo um Futuro, ampliando esse "
            "propósito com ações sociais, doações e apoio às famílias da comunidade. Atualmente, também lidero "
            "o CT Angelo Maximo e atuo como empresário, sempre guiado pelo lema: “O mundo se move, quando eu me "
            "movo”, acreditando que a transformação começa pela ação."
        ),
    },
    {"slug": "tassia", "name": "Tássia Yoshie Eguchi de Oliveira", "role": "Jiu-Jítsu", "bio": ""},
    {"slug": "eddi", "name": "Eddi", "role": "Boxe", "bio": ""},
    {"slug": "christofer", "name": "Christofer Souza", "role": "Muay Thai · Gardenal Fight Team", "bio": ""},
]

MOTTO = {
    "text": "O mundo se move, quando eu me movo.",
    "author": "Lema do professor Angelo",
}

# Grade de jiu-jítsu conforme a tabela oficial da academia.
SCHEDULE = [
    {"id": "seg", "short": "Seg", "name": "Segunda", "mode": "Kimono", "slots": [
        {"time": "7h às 8h30", "label": "Misto"},
        {"time": "14h às 15h30", "label": "Misto"},
        {"time": "18h às 19h30", "label": "Misto"},
        {"time": "20h às 21h30", "label": "Misto"},
    ]},
    {"id": "ter", "short": "Ter", "name": "Terça", "mode": "Kimono", "slots": [
        {"time": "7h às 8h30", "label": "Misto / No-Gi"},
        {"time": "9h às 10h30", "label": "Kids"},
        {"time": "16h às 17h30", "label": "Misto"},
        {"time": "18h às 19h30", "label": "Kids II"},
        {"time": "20h às 21h30", "label": "Feminino / Masculino"},
    ]},
    {"id": "qua", "short": "Qua", "name": "Quarta", "mode": "Kimono", "slots": [
        {"time": "7h às 8h30", "label": "Misto"},
        {"time": "14h às 15h30", "label": "Misto"},
        {"time": "18h às 19h30", "label": "Misto"},
        {"time": "20h às 21h30", "label": "Misto"},
    ]},
    {"id": "qui", "short": "Qui", "name": "Quinta", "mode": "Kimono", "slots": [
        {"time": "7h às 8h30", "label": "Misto"},
        {"time": "9h às 10h30", "label": "Kids"},
        {"time": "16h às 17h30", "label": "Misto"},
        {"time": "18h às 19h30", "label": "Kids II"},
        {"time": "20h às 21h30", "label": "Feminino / Masculino"},
    ]},
    {"id": "sex", "short": "Sex", "name": "Sexta", "mode": "No-Gi", "slots": [
        {"time": "7h às 8h30", "label": "Misto"},
        {"time": "14h às 15h30", "label": "Misto"},
        {"time": "16h às 17h30", "label": "Misto"},
        {"time": "18h30 às 20h30", "label": "Misto"},
        {"time": "19h30 às 20h30", "label": "Defesa pessoal"},
    ]},
    {"id": "sab", "short": "Sáb", "name": "Sábado", "mode": "Competição", "slots": [
        {"time": "9h às 10h30", "label": "Treino de competição"},
    ]},
]

# Períodos dos planos 3x por semana e Livre. "save" é o desconto sobre o mensal.
PERIODS = [
    {"id": "m", "label": "Mensal", "months": 1, "per": "por mês", "word": "mensal", "bill": "cobrado todo mês", "save": ""},
    {"id": "t", "label": "Trimestral", "months": 3, "per": "no trimestre", "word": "trimestral", "bill": "cobrado a cada 3 meses", "save": "economize 25%"},
    {"id": "s", "label": "Semestral", "months": 6, "per": "no semestre", "word": "semestral", "bill": "cobrado a cada 6 meses", "save": "economize 30%"},
    {"id": "a", "label": "Anual", "months": 12, "per": "no ano", "word": "anual", "bill": "cobrado uma vez por ano", "save": "economize 35%"},
]

# Planos com seletor de período. Valores do período inteiro, por chave de PERIODS.
PERIOD_PLANS = [
    {
        "name": "3x por semana",
        "adult": {"m": 120, "t": 270, "s": 504, "a": 936},
        "kid": {"m": 100, "t": 225, "s": 420, "a": 780},
        "feature": "Três treinos por semana",
    },
    {
        "name": "Livre", "featured": True, "flag": "Treine sem limite",
        "adult": {"m": 150, "t": 337.5, "s": 630, "a": 1170},
        "kid": {"m": 120, "t": 270, "s": 504, "a": 936},
        "feature": "Treinos ilimitados na semana",
    },
]

# Demais planos, só mensais.
PLANS = [
    {
        "name": "Avulso", "price": "50", "per": "por aula",
        "features": ["Sem mensalidade"],
        "cta": "Agendar", "message": "Olá! Quero agendar uma aula avulsa.",
    },
    {
        "name": "Pai e filho", "price": "200", "per": "3x por semana · a dupla, por mês",
        "features": ["Livre: R$ 250/mês", "Filho até 12 anos"],
        "cta": "Começar", "message": "Olá! Quero saber mais sobre o plano Pai e filho.",
    },
    {
        "name": "Familiar 3 pessoas ou +", "price": "90", "per": "adulto 3x por semana · por pessoa/mês",
        "features": ["Infantil 3x por semana: R$ 70/mês", "Adulto livre: R$ 120/mês", "Infantil livre: R$ 100/mês"],
        "cta": "Começar", "message": "Olá! Quero saber mais sobre o plano Familiar.",
    },
]

UNITS = [
    {"name": "CT Angelo Maximo", "place": "Rua Benjamin Constant, 1271"},
    {"name": "CT Pólux", "place": "Suzano"},
    {"name": "CT Pólux", "place": "Guaianases · São Paulo"},
    {"name": "CT Du Thai", "place": "Poá"},
    {"name": "CT Gardenal Fight Team", "place": "Dona Benta · Suzano"},
]

# Somente depoimentos reais e autorizados. A seção só aparece quando a lista tem itens.
# Formato: {"text": "...", "author": "Nome", "detail": "Jiu-Jítsu, faixa-azul"}
TESTIMONIALS = []
