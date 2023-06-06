from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import Products, RegisterView, UserDetailsView, ProductsAdd


urlpatterns = [
    # Your URLs...
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('products/', Products.as_view(), name='products'),
    # path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/getme/', UserDetailsView.as_view(), name='getme'),
    path('products/add/', ProductsAdd.as_view(), name='products_add'),
    # path('products/remove/', ProductsRemove.as_view(), name='products_remove')

]