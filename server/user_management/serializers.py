from rest_framework import serializers
from .models import User,  App

class AppSerializer(serializers.ModelSerializer):
    class Meta:
        model = App
        fields = ['id', 'name']

class UserSerializer(serializers.ModelSerializer):
    assigned_apps = AppSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'assigned_apps']

class AdminCreateSerializer(serializers.ModelSerializer):
   apps = serializers.PrimaryKeyRelatedField(
       queryset = App.objects.all(),
         many = True,
            write_only = True,
    )
   class Meta:
       model = User
       fields = ['username', 'email', 'password', 'apps']
       extra_kwargs = {'password': {'write_only': True}}

   def create(self, validated_data):
       apps = validated_data.pop('apps')
       user = User.objects.create_user(role= 'admin', **validated_data)
       user.assigned_apps.set(apps)
       return user
   
class UserCreateSerializer(serializers.ModelSerializer):
      app = serializers.PrimaryKeyRelatedField(
            queryset = App.objects.all(),
                write_only = True
        )
      class Meta:
          model = User
          fields = ['username', 'email', 'password', 'app']
          extra_kwargs = {'password': {'write_only': True}}

      def create(self, validated_data):
          app = validated_data.pop('app')
          user = User.objects.create_user(role= 'user', **validated_data) 
          user.assigned_apps.add(app) 
          return user