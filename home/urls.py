from allauth.account.views import confirm_email
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView



urlpatterns = [
    path('admin/', admin.site.urls),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('account/', include('allauth.urls')),
    re_path('accounts-rest/registration/account-confirm-email/(?P<key>.+)/$', confirm_email, name='account_confirm_email'),
    path('empty-auth/', include('django.contrib.auth.urls')),
    re_path(r'^.*', TemplateView.as_view(template_name='index.html')),

]