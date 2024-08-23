from django.apps import AppConfig
from django.contrib.auth import get_user_model
from django.db.models.signals import post_migrate
import os


class ProductManagementConfig(AppConfig):
    name = 'product_management'

    def ready(self):
        from django.conf import settings
        User = get_user_model()
        if settings.DEBUG:
            post_migrate.connect(create_superuser, sender=self)

def create_superuser(sender, **kwargs):
    User = get_user_model()
    if not User.objects.filter(username=os.getenv('DJANGO_SUPERUSER_USERNAME')).exists():
        User.objects.create_superuser(
            username=os.getenv('DJANGO_SUPERUSER_USERNAME'),
            email=os.getenv('DJANGO_SUPERUSER_EMAIL'),
            password=os.getenv('DJANGO_SUPERUSER_PASSWORD')
        )