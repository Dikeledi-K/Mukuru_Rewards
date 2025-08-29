from django.contrib import admin
from .models import User, Points, Balance, Reward

admin.site.register(User)
admin.site.register(Points)
admin.site.register(Balance)
admin.site.register(Reward)
