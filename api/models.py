from django.db import models

class Estudiante(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.nombre} {self.apellido}"

class Curso(models.Model):
    nombre = models.CharField(max_length=100)
    nota = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    estudiantes = models.ManyToManyField(Estudiante, related_name='cursos', blank=True)

    def __str__(self):
        return f"{self.nombre}"