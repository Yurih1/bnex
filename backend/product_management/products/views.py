from rest_framework import generics
from products.models import Product
from .serializers import ProdutoSerializer
from rest_framework.permissions import IsAuthenticated


class ProdutoListCreate(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProdutoSerializer
    permission_classes = [IsAuthenticated]
    

class ProdutoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProdutoSerializer
    permission_classes = [IsAuthenticated]
