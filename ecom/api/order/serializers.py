from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.HyperlinkedModelSerializer):
    class meta:
        model = Order
        fields = ('user')

        #TODO

