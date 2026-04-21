from django.db import models

class User(models.Model):
    name= models.CharField(max_length=120)
    stats= models.JSONField(null=True)
    
    def __str__(self):
        return self.name
    
class Book(models.Model):
    name= models.CharField(max_length=150)
    author= models.CharField(max_length=120)
    genre= models.CharField(max_length=100, null=True)
    nb_pages= models.IntegerField(null=True)
    completed= models.BooleanField(default=False)
    
    def __str__(self):
        return self.name
    
class ReadingSessions(models.Model):
    id = models.BigAutoField(primary_key=True)
    book_id= models.ForeignKey(Book, on_delete=models.CASCADE)
    read_time= models.DurationField()
    nb_page= models.IntegerField(null=True)
    date= models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Session for {self.book_id.name}"