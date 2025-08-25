from rest_framework import serializers
from .models import Estudiante, Curso

class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = ['id', 'nombre', 'nota', 'estudiantes']

class EstudianteSerializer(serializers.ModelSerializer):
    cursos = CursoSerializer(many=True, read_only=True)

    class Meta:
        model = Estudiante
        fields = ['id', 'nombre', 'apellido', 'cursos']

    def create(self, validated_data):
        cursos_ids = self.context.get('cursos', [])
        estudiante = Estudiante.objects.create(**validated_data)
        
        # Asignar cursos al estudiante usando la relación muchos a muchos
        if cursos_ids:
            cursos = Curso.objects.filter(id__in=cursos_ids)
            estudiante.cursos.set(cursos)
        
        return estudiante

    def update(self, instance, validated_data):
        cursos_ids = self.context.get('cursos', [])
        
        # Actualizar datos del estudiante
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.apellido = validated_data.get('apellido', instance.apellido)
        instance.save()
        
        # Actualizar la relación muchos a muchos con los cursos
        if cursos_ids is not None:  # Solo actualizar si se proporcionan cursos
            cursos = Curso.objects.filter(id__in=cursos_ids)
            instance.cursos.set(cursos)
        
        return instance