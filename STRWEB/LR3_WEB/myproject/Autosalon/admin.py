from django.contrib import admin
# Register your models here.
from .models import AboutCompany, Banner, CartItem, Employee, Partner, ProductType, Manufacturer, Product, Customer, Order, User, Sale, News, Promo, Feedback, Question, Vacancy, Admin

# class ProductAdmin(admin.ModelAdmin):
#     list_display = ('name', 'price', 'manufacturer', 'product_type')
admin.site.register(Product)
admin.site.register(Employee)
admin.site.register(Customer)
admin.site.register(Admin)
admin.site.register(ProductType)
admin.site.register(Manufacturer)
admin.site.register(Order)
admin.site.register(Vacancy)
admin.site.register(Question)
admin.site.register(Promo)
admin.site.register(News)
admin.site.register(Sale)
admin.site.register(Feedback)
admin.site.register(Partner)
admin.site.register(CartItem)
admin.site.register(AboutCompany)
admin.site.register(Banner)
admin.site.register(User)
