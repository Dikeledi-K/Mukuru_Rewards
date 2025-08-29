from django.http import JsonResponse
from api.models import User, Points


def get_points(request, user_id):
    try:
        points = Points.objects.get(user_id=user_id)
        return JsonResponse({
            "total_points": points.total_points,
            "bonus_points": points.bonus_points
        })
    except Points.DoesNotExist:
        return JsonResponse({"error": "Points not found"}, status=404)

def add_points(request, user_id, amount):
    try:
        points = Points.objects.get(user_id=user_id)
        points.total_points += amount
        points.save()
        return JsonResponse({"total_points": points.total_points})
    except Points.DoesNotExist:
        return JsonResponse({"error": "Points not found"}, status=404)
    

def add_bonus_points(request, user_id, bonus):
    try:
        points = Points.objects.get(user_id=user_id)
        points.bonus_points += bonus
        points.save()
        return JsonResponse({"bonus_points": points.bonus_points})
    except Points.DoesNotExist:
        return JsonResponse({"error": "Points not found"}, status=404)
