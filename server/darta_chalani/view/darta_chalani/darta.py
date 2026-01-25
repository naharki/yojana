from rest_framework.viewsets import ModelViewSet
from ...model.darta_chalani.darta import Darta
from ...serializers.darta_chalani.darta import DartaSerializer

class DartaViewSet(ModelViewSet):
   queryset = Darta.objects.all().order_by("darta_number")
   serializer_class = DartaSerializer
