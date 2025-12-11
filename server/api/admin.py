from django.contrib import admin
from .model.officemodel import Office_model as Office
from .model.fiscalyear import FiscalYear
from .model.ward import Ward

@admin.register(Office)
class OfficeAdmin(admin.ModelAdmin):
    list_display = ('name', 'full_name', 'location', 'established_date', 'created_at')
    search_fields = ('name', 'full_name')
    list_filter = ('established_date', 'created_at')
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')

@admin.register(FiscalYear)
class FiscalYearAdmin(admin.ModelAdmin):
    list_display = ('fiscalyear', 'start_date', 'end_date', 'is_active', 'created_at')
    search_fields = ('year',)
    ordering = ('-created_at',)

@admin.register(Ward)
class WardAdmin(admin.ModelAdmin):
    list_display = ('number', 'ward_location')
    search_fields = ('number', 'ward_location')
   
