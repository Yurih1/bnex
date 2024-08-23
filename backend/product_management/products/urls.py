from django.urls import path
from .views import ProdutoListCreate, ProdutoRetrieveUpdateDestroy

urlpatterns = [
    path('', ProdutoListCreate.as_view(), name='produto-list-create'),
    path('<uuid:pk>/', ProdutoRetrieveUpdateDestroy.as_view(), name='produto-detail'),
]
