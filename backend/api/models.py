from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    banner_image = models.ImageField(upload_to='category_images/', blank=True, null=True)

    def __str__(self):
        return self.name

class Comment(models.Model):
    author = models.CharField(max_length=100)
    rating = models.IntegerField(default=0)
    text = models.TextField()

    def __str__(self):
        return f"{self.author} ({self.rating})"
    
class Product(models.Model):
    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to='product_images/', blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    price = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return self.name
    
class Product(models.Model):
    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to='product_images/', blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    price = models.DecimalField(max_digits=8, decimal_places=2)
    
    # Yeni eklenen alanlar
    allergens = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    rating = models.IntegerField(default=0)
    wifi_password = models.CharField(max_length=100, blank=True, null=True)
    table_number = models.CharField(max_length=10, blank=True, null=True)

    def __str__(self):
        return self.name