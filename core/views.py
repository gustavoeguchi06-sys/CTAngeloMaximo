import json
from pathlib import Path
from urllib.parse import quote

from django.shortcuts import render
from django.templatetags.static import static

from . import content

ASSETS = Path(__file__).resolve().parent / "static" / "core"
IMAGE_SUFFIXES = (".webp", ".jpg", ".jpeg", ".png", ".avif")


def _find_image(folder, stem):
    """URL estática de <folder>/<stem>.<ext> se o arquivo existir, senão None."""
    for suffix in IMAGE_SUFFIXES:
        if (ASSETS / folder / f"{stem}{suffix}").is_file():
            return static(f"core/{folder}/{stem}{suffix}")
    return None


def _gallery():
    """Fotos da pasta core/static/core/galeria/, em ordem alfabética."""
    folder = ASSETS / "galeria"
    if not folder.is_dir():
        return []
    files = sorted(p for p in folder.iterdir() if p.suffix.lower() in IMAGE_SUFFIXES)
    return [
        {"url": static(f"core/galeria/{p.name}"), "alt": f"Treino no CT Angelo Maximo, foto {i}"}
        for i, p in enumerate(files, start=1)
    ]


def _initials(name):
    return "".join(word[0] for word in name.split()[:2]).upper()


def _json_ld():
    contact = content.CONTACT
    return json.dumps(
        {
            "@context": "https://schema.org",
            "@type": "SportsActivityLocation",
            "name": contact["name"],
            "description": "Academia de Jiu-Jítsu, Boxe e Muay Thai.",
            "telephone": "+" + contact["whatsapp"],
            "address": {
                "@type": "PostalAddress",
                "streetAddress": contact["address_lines"][0],
                "addressCountry": "BR",
            },
            "sameAs": [contact["instagram_url"]],
        },
        ensure_ascii=False,
    )


def _brl(value):
    """Valor em reais no formato brasileiro, sem centavos quando inteiro."""
    if value == int(value):
        return f"{int(value):,}".replace(",", ".")
    return f"{value:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")


def _period_plans():
    first = content.PERIODS[0]["id"]
    return [
        {
            **plan,
            "adult_json": json.dumps(plan["adult"]),
            "kid_json": json.dumps(plan["kid"]),
            "price": _brl(plan["adult"][first]),
            "kid_price": _brl(plan["kid"][first]),
            "message": f"Olá! Quero saber mais sobre o plano {plan['name']} {content.PERIODS[0]['word']}.",
        }
        for plan in content.PERIOD_PLANS
    ]


def index(request):
    gallery = _gallery()
    testimonials = content.TESTIMONIALS

    # Seções opcionais mudam a sequência de fundos; o contato escolhe o tom que não
    # repete o da seção anterior nem o do rodapé preto.
    last_tone = "white"
    if gallery:
        last_tone = "black"
    if testimonials:
        last_tone = "gray"
    contact_tone = "gray" if last_tone == "white" else "white"

    footer_links = list(content.NAV)
    if gallery:
        footer_links.insert(-1, {"id": "galeria", "label": "Galeria"})

    team = [
        {**member, "photo": _find_image("professores", member["slug"]), "initials": _initials(member["name"])}
        for member in content.TEAM
    ]

    context = {
        "contact": content.CONTACT,
        "trial_message": content.TRIAL_MESSAGE,
        "nav_links": content.NAV,
        "footer_links": footer_links,
        "hero": content.HERO,
        "bands": content.BANDS,
        "hero_shortcuts": [link for link in footer_links if link["id"] in content.HERO["shortcuts"]],
        "values": content.VALUES,
        "modalities": content.MODALITIES,
        "team": team,
        "motto": content.MOTTO,
        "schedule": content.SCHEDULE,
        "plans": content.PLANS,
        "periods": content.PERIODS,
        "periods_json": json.dumps(content.PERIODS, ensure_ascii=False),
        "period_plans": _period_plans(),
        "units": content.UNITS,
        "testimonials": testimonials,
        "gallery": gallery,
        "hero_image": _find_image("img", "hero"),
        "contact_tone": contact_tone,
        "maps_url": "https://www.google.com/maps/search/?api=1&query=" + quote(content.CONTACT["maps_query"]),
        "json_ld": _json_ld(),
    }
    return render(request, "core/index.html", context)
