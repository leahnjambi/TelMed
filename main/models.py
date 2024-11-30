from django.db import models

class Service(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='services/')

class Doctor(models.Model):
    name = models.CharField(max_length=100)
    specialization = models.TextField()
    contact = models.CharField(max_length=15)
    image = models.ImageField(upload_to='doctors/')
