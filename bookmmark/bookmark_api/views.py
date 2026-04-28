from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets
from bookmark_api.models import Book, ReadingSessions
from bookmark_api.serializers import BookSerializer, ReadingSessionSerializer
from bookmark_api.ai_recommendations import get_recommendations

def homepage(request):
    return HttpResponse("Hello world")

def about(request):
    return HttpResponse("About page")

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class ReadingSessionViewSet(viewsets.ModelViewSet):
    queryset = ReadingSessions.objects.all()
    serializer_class = ReadingSessionSerializer
    
def recommendations_view(request):
    books_read = list(
        Book.objects.filter(completed=True)
        .values("name", "author")
    )

    if not books_read:
        return JsonResponse(
            {"error": "No completed books found. Mark some books as completed first."},
            status=400,
        )

    data = get_recommendations(books_read)
    return JsonResponse(data)