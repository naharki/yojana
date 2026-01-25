from rest_framework.viewsets import ModelViewSet
from ...model.darta_chalani.chalani import Chalani
from ...serializers.darta_chalani.chalani import ChalaniSerializer

class ChalaniViewSet(ModelViewSet):
   queryset = Chalani.objects.all().order_by("chalani_number")
   serializer_class = ChalaniSerializer
   