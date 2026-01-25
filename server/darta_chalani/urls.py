from django.urls import path, include
from rest_framework_nested import routers
from .view.designation import DesignationViewSet
from .view.darta_chalani.darta import DartaViewSet
from .view.darta_chalani.chalani import ChalaniViewSet

router = routers.DefaultRouter()
router.register(r'designations', DesignationViewSet, basename='designation')
router.register(r'darta', DartaViewSet, basename='darta')
router.register(r'chalani', ChalaniViewSet, basename='chalani')
urlpatterns = [
    path('', include(router.urls)),
]