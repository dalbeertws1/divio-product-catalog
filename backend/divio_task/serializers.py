from rest_framework import serializers
# from django.contrib.auth.models import User
from .models import Product, ProductSelection
from django.contrib.auth import get_user_model

User = get_user_model()
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['password', 'email']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(email=validated_data['email'])
        user.set_password(validated_data['password'])
        user.save()
        return user


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class ProductSelectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSelection
        fields = ['id', 'user', 'product']