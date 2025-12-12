from django.contrib import admin
from .model.officemodel import Office_model as Office
from .model.fiscalyear import FiscalYear
from .model.ward import Ward
from .model.committeetype import CommitteeType
from .model.committee import Committee
from .model.committee import Member

@admin.register(Office)
class OfficeAdmin(admin.ModelAdmin):
    list_display = ('name', 'full_name', 'location', 'established_date', 'created_at')
    search_fields = ('name', 'full_name')
    list_filter = ('established_date', 'created_at')
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')

@admin.register(FiscalYear)
class FiscalYearAdmin(admin.ModelAdmin):
    list_display = ('name', 'start_date', 'end_date', 'is_active', 'created_at')
    search_fields = ('year',)
    ordering = ('-created_at',)

@admin.register(Ward)
class WardAdmin(admin.ModelAdmin):
    list_display = ('number', 'ward_location')
    search_fields = ('number', 'ward_location')
   
@admin.register(CommitteeType)
class CommitteeTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'eng_name', 'code')
    search_fields = ('name',)
    ordering = ('name',)

@admin.register(Committee)
class CommitteeAdmin(admin.ModelAdmin):
    list_display = ('name', 'committee_type',  'created_at')
    search_fields = ('name','committee_type')
    ordering = ('-created_at',)
    list_filter = ('committee_type', 'ward')

@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'committee', 'role', 'citizenship_number', 'is_account_holder', 'created_at')
    search_fields = ('name', 'citizenship_number', 'committee__name')
    list_filter = ('role', 'is_account_holder', 'created_at')
    ordering = ('-created_at',)