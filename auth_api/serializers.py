from rest_framework import serializers

from django.contrib.auth.models import User


# a ModelSerializer is something that translate your model from Python to JSON
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')



