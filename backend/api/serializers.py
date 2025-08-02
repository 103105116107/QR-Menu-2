from rest_framework import serializers
from .models import Category, Comment, Product

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'banner_image']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'author', 'rating', 'text']

class ProductSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()  # Kategori adı gösterilsin

    class Meta:
        model = Product
        fields = ['id', 'name', 'image', 'price', 'category']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
