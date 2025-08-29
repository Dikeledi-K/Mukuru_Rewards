from django.http import JsonResponse
from api.models import User, Reward

def get_rewards(request, user_id):
    rewards = Reward.objects.filter(user_id=user_id)
    rewards_list = [{"id": r.id, "description": r.description, "redeemed": r.redeemed} for r in rewards]
    return JsonResponse({"rewards": rewards_list})

def add_reward(request, user_id, description):
    try:
        user = User.objects.get(id=user_id)
        reward = Reward.objects.create(user=user, description=description)
        return JsonResponse({"id": reward.id, "description": reward.description})
    except User.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)

def redeem_reward(request, reward_id):
    try:
        reward = Reward.objects.get(id=reward_id)
        if reward.redeemed:
            return JsonResponse({"error": "Reward already redeemed"}, status=400)
        reward.redeemed = True
        reward.save()
        return JsonResponse({"id": reward.id, "description": reward.description, "redeemed": reward.redeemed})
    except Reward.DoesNotExist:
        return JsonResponse({"error": "Reward not found"}, status=404)
