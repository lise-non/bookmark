from django.http import HttpResponse
from rest_framework import viewsets
from .models import Book, ReadingSessions
from .serializers import BookSerializer, ReadingSessionSerializer

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