from rest_framework import viewsets
from .models import Category, Product, Comment, RestaurantInfo, WaiterCall
from .serializers import CategorySerializer, ProductSerializer, CommentSerializer, RestaurantInfoSerializer, WaiterCallSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class RestaurantInfoViewSet(viewsets.ModelViewSet):
    queryset = RestaurantInfo.objects.all()
    serializer_class = RestaurantInfoSerializer

class WaiterCallViewSet(viewsets.ModelViewSet):
    queryset = WaiterCall.objects.all()
    serializer_class = WaiterCallSerializer
