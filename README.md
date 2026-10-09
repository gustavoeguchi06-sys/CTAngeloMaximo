# CT Angelo Maximo

Site da academia CT Angelo Maximo (Jiu-Jítsu, Boxe e Muay Thai), feito com Django.
Identidade visual em preto, branco e cinza claro.

## Rodar localmente

```bash
python -m venv .venv
.venv\Scripts\activate        # Windows (Linux/macOS: source .venv/bin/activate)
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Abra http://localhost:8000.

## Onde editar

| O que mudar | Onde |
|---|---|
| Horários, planos, professores, filiais, contato, WhatsApp | [`core/content.py`](core/content.py) |
| Visual (cores, tipografia, espaçamentos) | [`core/static/core/css/site.css`](core/static/core/css/site.css) |
| Comportamento (menu, abas de horários, galeria) | [`core/static/core/js/site.js`](core/static/core/js/site.js) |
| Estrutura da página | [`core/templates/core/`](core/templates/core/) |

Todo o conteúdo da página vem de `content.py`: não coloque informação que o proprietário
não tenha confirmado.

## Fotos

As fotos são opcionais. Ao colocar os arquivos nas pastas abaixo, a página passa a usá-los
automaticamente (use imagens comprimidas, até uns 300 KB):

- `core/static/core/img/hero.jpg` — foto do topo da página (sem ela, aparece a logo grande)
- `core/static/core/galeria/` — seção Galeria (a seção só aparece se houver fotos)
- `core/static/core/professores/<nome>.jpg` — `angelo`, `tassia`, `eddi`, `christofer`

Depoimentos: adicione itens reais e autorizados à lista `TESTIMONIALS` em `content.py`;
a seção só aparece quando a lista tem conteúdo.

## Antes de publicar na internet

As configurações atuais são de desenvolvimento. Em produção, defina `DEBUG = False`,
`ALLOWED_HOSTS`, uma `SECRET_KEY` própria (fora do repositório) e rode `collectstatic`.
