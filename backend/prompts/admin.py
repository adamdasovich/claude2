from django.contrib import admin
from .models import Prompt


@admin.register(Prompt)
class PromptAdmin(admin.ModelAdmin):
    list_display = ['title', 'user', 'is_favorite', 'created_at', 'updated_at']
    list_filter = ['is_favorite', 'created_at']
    search_fields = ['title', 'content', 'description']
