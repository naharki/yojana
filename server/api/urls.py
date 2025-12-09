from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OfficeViewSet, CommitteeTypeViewSet

router = DefaultRouter()
router.register(r'offices', OfficeViewSet, basename='office')
router.register(r'committee-types', CommitteeTypeViewSet, basename='committee-type')

urlpatterns = [
    path('', include(router.urls)),
]
