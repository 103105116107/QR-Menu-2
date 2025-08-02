from django.urls import path
from . import views
from .views import category_list, comment_list_create, product_list

urlpatterns = [
    path('categories/', category_list),
    path('comments/', comment_list_create),
    path('products/', product_list),
    path('products/category/<int:category_id>/', views.products_by_category),
]