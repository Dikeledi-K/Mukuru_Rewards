from django.http import JsonResponse
from api.models import User, Balance

def get_balance(request, user_id):
    try:
        balance = Balance.objects.get(user_id=user_id)
        return JsonResponse({"balance": balance.amount})
    except Balance.DoesNotExist:
        return JsonResponse({"error": "Balance not found"}, status=404)

def update_balance(request, user_id, amount):
    try:
        balance = Balance.objects.get(user_id=user_id)
        balance.amount += amount
        balance.save()
        return JsonResponse({"balance": balance.amount})
    except Balance.DoesNotExist:
        return JsonResponse({"error": "Balance not found"}, status=404)