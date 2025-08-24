from rest_framework import serializers
from .models import Estudiante, Curso

class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = ['id', 'nombre', 'nota', 'estudiante']

class EstudianteSerializer(serializers.ModelSerializer):
    cursos = CursoSerializer(many=True, read_only=True)

    class Meta:
        model = Estudiante
        fields = ['id', 'nombre', 'apellido', 'cursos']