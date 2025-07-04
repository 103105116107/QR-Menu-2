from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProductViewSet, CommentViewSet, RestaurantInfoViewSet, WaiterCallViewSet
from django.urls import path, include

router = DefaultRouter()
router.register('categories', CategoryViewSet)
router.register('products', ProductViewSet)
router.register('comments', CommentViewSet)
router.register('info', RestaurantInfoViewSet)
router.register('waiter-calls', WaiterCallViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
