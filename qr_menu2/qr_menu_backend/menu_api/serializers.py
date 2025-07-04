# menu_api/serializers.py

from rest_framework import serializers
from .models import Category, Product, Comment, RestaurantInfo, WaiterCall

# Yorumları gösterebilmek için önce CommentSerializer'ı tanımlıyoruz.
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'product', 'username', 'text', 'rating', 'created_at']
        # Yorum gönderilirken ürün ID'si de gönderileceği için read_only değil.

# Ürünleri ve onlara ait yorumları göstermek için ProductSerializer
class ProductSerializer(serializers.ModelSerializer):
    # BİR ÜRÜN ÇAĞRILDIĞINDA YORUMLARINI DA GÖSTERMEK İÇİN:
    # Modeldeki 'comments' related_name'ini burada kullanıyoruz.
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'category', 'name', 'description', 
            'price', 'allergens', 'image', 'is_featured', 'comments' # 'comments' alanını ekledik
        ]

# Kategorileri ve onlara ait ürünleri göstermek için CategorySerializer
class CategorySerializer(serializers.ModelSerializer):
    # BİR KATEGORİ ÇAĞRILDIĞINDA ÜRÜNLERİNİ DE GÖSTERMEK İÇİN:
    # Modeldeki 'products' related_name'ini burada kullanıyoruz.
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'image', 'products'] # 'products' alanını ekledik

# Diğer serializer'lar
class RestaurantInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestaurantInfo
        fields = '__all__'

class WaiterCallSerializer(serializers.ModelSerializer):
    class Meta:
        model = WaiterCall
        fields = '__all__'