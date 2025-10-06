from django.db import models
from django.contrib.auth.models import User


class Prompt(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='prompts')
    title = models.CharField(max_length=255)
    content = models.TextField()
    description = models.TextField(blank=True, null=True)
    tags = models.JSONField(default=list, blank=True)
    color = models.CharField(max_length=7, default='#6366f1')  # Hex color for card
    is_favorite = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return self.title
