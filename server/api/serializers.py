from rest_framework import serializers
from .models import Office, CommitteeType


class OfficeSerializer(serializers.ModelSerializer):
    """Serializer for Office model"""
    
    class Meta:
        model = Office
        fields = [
            'id',
            'office_name',
            'office_full_name',
            'location',
            'slogan',
            'established',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class CommitteeTypeSerializer(serializers.ModelSerializer):
    """Serializer for CommitteeType model"""
    
    class Meta:
        model = CommitteeType
        fields = [
            'id',
            'name',
            'name_eng',
            'committee_type_code',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
