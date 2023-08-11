from django.apps import AppConfig


class BoomnetConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'boomnet'

    def ready(self):
        import boomnet.signals
