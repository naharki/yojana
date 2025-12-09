from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Office, CommitteeType
from .serializers import OfficeSerializer, CommitteeTypeSerializer


class OfficeViewSet(viewsets.ModelViewSet):
    """ViewSet for Office CRUD operations"""
    queryset = Office.objects.all()
    serializer_class = OfficeSerializer


class CommitteeTypeViewSet(viewsets.ModelViewSet):
    """ViewSet for CommitteeType CRUD operations"""
    queryset = CommitteeType.objects.all()
    serializer_class = CommitteeTypeSerializer
