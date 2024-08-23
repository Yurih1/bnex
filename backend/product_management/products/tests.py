from django.test import TestCase
from .models import Product
import uuid


class ProductModelTest(TestCase):

    def test_product_uuid(self):
        product = Product.objects.create(
            nome='Produto de Teste',
            descricao='Descrição do produto de teste',
            preco=10.00
        )
        self.assertIsInstance(product.id, uuid.UUID)
        