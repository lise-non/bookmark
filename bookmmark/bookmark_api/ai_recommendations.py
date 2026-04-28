import anthropic
import json


def get_recommendations(books_read):
    client = anthropic.Anthropic()

    book_list = "\n".join([
        f"- {book['name']} by {book['author']}"
        for book in books_read
    ])

    message = client.messages.create(
        model="claude-opus-4-7",
        max_tokens=1024,
        system=[{
            "type": "text",
            "text": (
                "You are a book recommendation expert. When given a reading history, "
                "recommend 5 books the person would enjoy. "
                'Always respond with valid JSON in exactly this format: '
                '{"recommendations": [{"title": "...", "author": "...", "reason": "..."}]}'
            ),
            "cache_control": {"type": "ephemeral"},
        }],
        messages=[{
            "role": "user",
            "content": f"Based on this reading history, recommend 5 books:\n\n{book_list}",
        }],
    )

    return json.loads(message.content[0].text)
