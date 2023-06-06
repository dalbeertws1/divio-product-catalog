from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .serializers import UserSerializer, ProductSerializer, ProductSelectionSerializer
from rest_framework import generics 
from rest_framework import filters
from .models import Product, ProductSelection
from rest_framework_simplejwt.tokens import RefreshToken, TokenError



class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class Products(generics.ListAPIView):
    queryset = Product.objects.all()
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description', 'price', 'stock']
    ordering_fields = '__all__'

    def post(self, request):

        ids = request.data.get('id', None)
        if ids:
            products = Product.objects.filter(id__in=ids)
            selection = ProductSelection.objects.filter(user=request.user).first()
            selection.product.clear()
            selection.product.add(*products)

        return Response({'message': 'Products added to cart'}, status=status.HTTP_200_OK)


        # res = {}
        # # id =1 
        # product = Product.objects.filter(id=id).first()
        # # product_ids = request.data.get('id', None)
        # selected_products = ProductSelection.objects.filter(user=request.user).first()
        # print(selected_products, '====================wddd=')
        # if not selected_products:
        #         cart = ProductSelection.objects.create(user=request.user)
        #         print(cart.selected.all(), '=====================')
        # else:
        #     cart = product.selected.all()
        #     print(cart, '========ffffffffffff=============')
        # if not product_ids:
        #     return Response({'error':'id is required'}, status=status.HTTP_400_BAD_REQUEST)
        # for id in product_ids:
        #     product = Product.objects.filter(id=id).first()
        #     selected_products = product.selected.filter(user=request.user).first()
            # if not selected_products:
            #     selected_products = ProductSelection.objects.create(user=request.user)
        #     if product in selected_products.product.all():
        #             selected_products.product.remove(product)
        #             res = {'msg':'Removed successfully'}
        #     else:
        #         selected_products.product.add(product)
        #         res = {'msg':'Added successfully'}
        # return Response(res, status=status.HTTP_200_OK)
    
    def get(self, request):
        queryset = self.get_queryset()
        products = self.filter_queryset(queryset)
        serializer = ProductSerializer(products, many=True)
        for product in serializer.data:
            is_selected = ProductSelection.objects.filter(user=request.user, product=product['id']).exists()
            product['is_selected'] = is_selected
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    

    # def put(self, request):
    #     id = request.data.get('id', None)
    #     if not id:
    #         return Response({'error':'id is required'}, status=status.HTTP_400_BAD_REQUEST)
    #     product = Product.objects.filter(id=id).first()
    #     if product:
    #         product.user.remove(request.user)
    #         return Response(status=status.HTTP_200_OK)
    #     return Response({'error':'product not found'}, status=status.HTTP_404_NOT_FOUND)



        
class UserDetailsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            'id': request.user.id,
            'username': request.user.username,
            'email': request.user.email
        })

# class LogoutView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         refresh_token = request.data.get('refresh_token')

#         if refresh_token:
#             try:
#                 token = RefreshToken(refresh_token)
#                 token.blacklist()
#                 return Response({"message": "Logout successful."})
#             except TokenError:
#                 return Response({"message": "Invalid token or token expired."}, status=400)
#         else:
#             return Response({"message": "Refresh token is required."}, status=400)

class ProductsAdd(APIView):
    def post(self, request):
        res = {}
        product_ids = request.data.get('id', None)
        if not product_ids:
            return Response({'error':'id is required'}, status=status.HTTP_400_BAD_REQUEST)
        for id in product_ids:
            product = Product.objects.filter(id=id).first()
            selected_products = product.selected.filter(user=request.user).first()
            if not selected_products:
                selected_products = ProductSelection.objects.create(user=request.user)
            if product not in selected_products.product.all():
                selected_products.product.add(product)
                res = {'msg':'Added successfully'}
            else:
                res = {'msg':'Already added'}
        return Response(res, status=status.HTTP_200_OK) 
    
# class ProductsRemove(APIView):
#     def post()
        
