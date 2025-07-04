from django.contrib import admin
from .models import Category, Product, Comment, RestaurantInfo, WaiterCall

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Comment)
admin.site.register(RestaurantInfo)
admin.site.register(WaiterCall)
