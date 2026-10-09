from urllib.parse import quote

from django import template

from core.content import CONTACT

register = template.Library()


@register.simple_tag
def wa(message=""):
    """Link do WhatsApp da academia, com mensagem pronta opcional."""
    url = f"https://wa.me/{CONTACT['whatsapp']}"
    return f"{url}?text={quote(message)}" if message else url
