from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .view.office_view import OfficeViewSet
from .view.fiscalyear import FiscalYearViewSet

router = DefaultRouter()
router.register(r'offices', OfficeViewSet, basename='office')
router.register(r'fiscalyears', FiscalYearViewSet, basename='fiscalyear')
urlpatterns = [
    path('api/', include(router.urls)),
]
