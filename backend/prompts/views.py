from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from anthropic import Anthropic
from decouple import config
from .models import Prompt
from .serializers import PromptSerializer


class PromptViewSet(viewsets.ModelViewSet):
    serializer_class = PromptSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Prompt.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def optimize(self, request, pk=None):
        """Optimize a prompt using Claude API"""
        prompt = self.get_object()

        try:
            client = Anthropic(api_key=config('ANTHROPIC_API_KEY'))

            optimization_prompt = f"""You are an expert prompt engineer. Analyze and optimize the following AI prompt to make it more effective, clear, and well-structured.

Original prompt:
{prompt.content}

Please provide an optimized version that:
1. Improves clarity and specificity
2. Adds helpful context or constraints if needed
3. Structures the prompt better
4. Makes it more likely to produce high-quality results

Return ONLY the optimized prompt text, without any explanation or meta-commentary."""

            message = client.messages.create(
                model="claude-sonnet-4-5-20250929",
                max_tokens=2048,
                messages=[{
                    "role": "user",
                    "content": optimization_prompt
                }]
            )

            optimized_content = message.content[0].text

            return Response({
                'optimized_content': optimized_content
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
