from django.contrib import admin
from .models import Office, CommitteeType


@admin.register(Office)
class OfficeAdmin(admin.ModelAdmin):
    list_display = ('office_name', 'office_full_name', 'location', 'established', 'created_at')
    search_fields = ('office_name', 'office_full_name')
    list_filter = ('established', 'created_at')
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')


@admin.register(CommitteeType)
class CommitteeTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'name_eng', 'committee_type_code', 'created_at')
    search_fields = ('name', 'name_eng', 'committee_type_code')
    list_filter = ('created_at',)
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')
