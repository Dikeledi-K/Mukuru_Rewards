from django.db import models
from django.http import JsonResponse

# 1. User table
class User(models.Model):
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    joined_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username

# 2. Points table
class Points(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    total_points = models.IntegerField(default=0)
    bonus_points = models.IntegerField(default=0)  # separate bonus points
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - Points"

# 3. Balance table
class Balance(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    amount = models.FloatField(default=0.0)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - Balance"

# 4. Rewards table
class Reward(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.CharField(max_length=100)
    redeemed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.description}"
