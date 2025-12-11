from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .view.office_view import OfficeViewSet
from .view.fiscalyear import FiscalYearViewSet
from .view.ward import WardViewSet
router = DefaultRouter()
router.register(r'offices', OfficeViewSet, basename='office')
router.register(r'fiscalyears', FiscalYearViewSet, basename='fiscalyear')
router.register(r'wards', WardViewSet, basename='ward')
urlpatterns = [
    path('api/', include(router.urls)),
]
