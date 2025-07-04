# qr_menu_backend/urls.py

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('menu_api.urls')),
]

# Medya dosyalarını (yüklenen resimler) sunmak için bu satırlar gereklidir.
# Sadece DEBUG modunda çalışır.
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)