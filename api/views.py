
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Estudiante, Curso
from .serializers import EstudianteSerializer, CursoSerializer

class EstudianteViewSet(viewsets.ModelViewSet):
    queryset = Estudiante.objects.all()
    serializer_class = EstudianteSerializer

    def create(self, request, *args, **kwargs):
        cursos_ids = request.data.get('cursos', [])
        serializer = self.get_serializer(data=request.data, context={'cursos': cursos_ids})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        cursos_ids = request.data.get('cursos', [])
        serializer = self.get_serializer(instance, data=request.data, partial=partial, context={'cursos': cursos_ids})
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

class CursoViewSet(viewsets.ModelViewSet):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer