# menu_api/models.py

from django.db import models

# Önce Product ve Category'i tanımlayalım ki Comment'te kullanabilelim
class Category(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='category_images/', blank=True, null=True)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Categories" # Admin panelinde daha düzgün gözükmesi için

class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    allergens = models.CharField(max_length=255, blank=True)
    image = models.ImageField(upload_to='product_images/', blank=True, null=True)
    is_featured = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class Comment(models.Model):
    # YORUMLARI GÖSTERMEK İÇİN EN ÖNEMLİ ADIM:
    # Hangi ürüne yorum yapıldığını bilmemiz gerekiyor.
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='comments')
    username = models.CharField(max_length=100)
    text = models.TextField()
    rating = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True, null=True) # Yorum zamanını eklemek iyi bir pratik

    def __str__(self):
        return f"{self.username} - {self.product.name}"

class RestaurantInfo(models.Model):
    wifi_password = models.CharField(max_length=100, blank=True)

class WaiterCall(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    is_resolved = models.BooleanField(default=False)