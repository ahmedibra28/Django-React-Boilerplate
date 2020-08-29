from rest_framework import serializers
from rest_auth.models import TokenModel

from accounts.models import CustomUser


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'first_name', 'last_name', 'full_name', 'is_staff']






class CustomTokenSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True) 

    class Meta:
        model = TokenModel
        fields = ('key','user')