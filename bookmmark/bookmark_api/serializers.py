from rest_framework import serializers
from .models import Book, ReadingSessions

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'name', "genre", "nb_pages", 'author', 'completed')

class ReadingSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReadingSessions
        fields = ('id', 'book_id', 'date', 'read_time', 'nb_page')