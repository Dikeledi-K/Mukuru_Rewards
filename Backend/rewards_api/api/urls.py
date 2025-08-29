from django.urls import path
from . import views

urlpatterns = [
    # Points
    path("points/<int:user_id>/", views.get_points),
    path("points/<int:user_id>/add/<int:amount>/", views.add_points),
    path("points/<int:user_id>/bonus/<int:bonus>/", views.add_bonus_points),

    # Balance
    path("balance/<int:user_id>/", views.get_balance),
    path("balance/<int:user_id>/update/<int:amount>/", views.update_balance),

    # Rewards
    path("rewards/<int:user_id>/", views.get_rewards),
    path("rewards/<int:user_id>/add/<str:description>/", views.add_reward),
    path("rewards/redeem/<int:reward_id>/", views.redeem_reward),
]
