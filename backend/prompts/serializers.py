from rest_framework import serializers
from .models import Prompt


class PromptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prompt
        fields = ['id', 'title', 'content', 'description', 'tags', 'color', 'is_favorite', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
