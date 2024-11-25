# Create your views here.
from decimal import Decimal
from pyexpat.errors import messages
import re
from ..models import AboutCompany, CartItem, Contact, Partner, Product
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login, logout
from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth.decorators import login_required
from ..models import Order, Product

from django.utils.timezone import get_current_timezone
from django.utils import timezone

def product_list(request):
    products = Product.objects.all()
    return render(request, 'product_list.html', {'products': products})

from ..models import Vacancy,Question,Promo,News,Feedback,Employee

def contacts(request):
    employees=Employee.objects.all()
    return render(request, 'contacts.html', {'employees': employees})

#def about(request):
#    return render(request, 'about.html')

def policy(request):
    return render(request, 'policy.html')

def vacancies(request):
    vacancies=Vacancy.objects.all()
    return render(request,'vacancies.html',{'vacancies':vacancies})

def index(request):
    latest_news = News.objects.latest('id')  # Assuming 'id' is the primary key and higher id means newer news
    partners = Partner.objects.all()
    products = Product.objects.all()
    company_info = AboutCompany.objects.all()
    context = {
        'latest_news': latest_news,
        'partners': partners,
        'products': products,
        'company_info': company_info,
    }
    return render(request, 'index.html', context)

def product_detail(request, product_id):
    product = get_object_or_404(Product, pk=product_id)
    return render(request, 'product_detail.html', {'product': product})

def cart(request):
    cart_items = CartItem.objects.all()
    return render(request, 'cart.html', {'cart_items': cart_items})

def checkout(request):
    return render(request, 'checkout.html')

from django.utils.html import linebreaks

def about(request):
    company_info = AboutCompany.objects.all()
    for company in company_info:
        if company.video_url:
            company.youtube_id = get_youtube_id(company.video_url)

        # Применяем функцию paragraph к истории компании
        company.history = paragraph(company.history)  # Форматируем текст истории

    return render(request, 'about.html', {'company_info': company_info})

def paragraph(value):
    """Функция для разбиения текста на абзацы."""
    if value:
        # Заменяем точки на точки с окончанием абзаца
        paragraphs = value.split('. ')
        return '. '.join(f'{para.strip()}' for para in paragraphs if para)
    return value

def questions(request):
    questions=Question.objects.all()
    return render(request,'questions.html',{'questions':questions})

def promos(request):
    # Получаем все активные и архивные промокоды
    active_promo_codes = Promo.objects.filter(is_active=True)
    archived_promo_codes = Promo.objects.filter(is_active=False)

    # Проверяем истечение срока действия активных промокодов
    for promo in active_promo_codes:
        promo.check_expiration()

    # Перезапрашиваем промокоды после проверки
    active_promo_codes = Promo.objects.filter(is_active=True)
    archived_promo_codes = Promo.objects.filter(is_active=False)

    context = {
        'active_promo_codes': active_promo_codes,
        'archived_promo_codes': archived_promo_codes,
    }

    return render(request, 'promos.html', context)

def apply_promo_code(request):
    message = ''
    if request.method == 'POST':
        entered_code = request.POST.get('promo_code', '').strip()

        try:
            promo = Promo.objects.get(code=entered_code, is_active=True)
            message = f'Промокод применен! Скидка: {promo.discount_value}%.'
        except Promo.DoesNotExist:
            message = 'Неверный промокод или промокод не активен.'

    return render(request, 'cart.html', {'message': message})

def news(request):
    news = News.objects.all()
    return render(request, 'news.html', {'news': news})

def news_detail(request, news_id):
    news_item = get_object_or_404(News, pk=news_id)
    return render(request, 'news_detail.html', {'news_item': news_item})

def feedbacks(request):
    feedbacks=Feedback.objects.all()
    return render(request,'feedbacks.html',{'feedbacks':feedbacks})

from ..forms import PartnerForm

def add_partner(request):
    if request.method == 'POST':
        form = PartnerForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('index')  # Перенаправление на главную страницу после добавления
    else:
        form = PartnerForm()
    return render(request, 'add_partner.html', {'form': form})

from ..models import AboutCompany
from ..forms import AboutCompanyForm

# Представление для создания нового AboutCompany
def create_about_company(request):
    if request.method == 'POST':
        form = AboutCompanyForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('about')  # После успешного сохранения можно редиректить на страницу about
    else:
        form = AboutCompanyForm()
    
    return render(request, 'create_about_company.html', {'form': form})

# Представление для редактирования существующего AboutCompany
def edit_about_company(request, pk):
    company = get_object_or_404(AboutCompany, pk=pk)
    if request.method == 'POST':
        form = AboutCompanyForm(request.POST, request.FILES, instance=company)
        if form.is_valid():
            form.save()
            return redirect('about')  # Редирект на страницу о компании после сохранения
    else:
        form = AboutCompanyForm(instance=company)
    
    return render(request, 'edit_about_company.html', {'form': form})

from ..models import Banner
from ..forms import BannerForm

def add_banner(request, company_id):
    company = get_object_or_404(AboutCompany, id=company_id)
    if request.method == 'POST':
        form = BannerForm(request.POST, request.FILES)
        if form.is_valid():
            banner = form.save(commit=False)
            banner.company = company
            banner.save()
            return redirect('about')  # Перенаправление на страницу о компании
    else:
        form = BannerForm()
    
    return render(request, 'add_banner.html', {'form': form, 'company': company})

from ..models import Cart

def add_to_cart(request, product_id):
    product = get_object_or_404(Product, pk=product_id)

    if request.user.is_authenticated:
        cart, created = Cart.objects.get_or_create(user=request.user)
    else:
        return redirect('login') 

    cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)

    if not created:  # Если товар уже есть в корзине, увеличиваем количество
        cart_item.quantity += 1
    cart_item.save()  # Сохраняем изменения

    return redirect('cart')

from django.shortcuts import get_object_or_404, redirect
from django.contrib import messages
from decimal import Decimal

from django.contrib import messages

def view_cart(request):
    if not request.user.is_authenticated:
        return redirect('login')  # Или обработайте это по-другому

    cart = get_object_or_404(Cart, user=request.user)
    cart_items = cart.items.all()  # Получаем все товары из корзины

    total_price = sum(item.total_price() for item in cart_items)  # Считаем общую стоимость
    discount = cart.applied_discount or Decimal(0)  # Используем скидку из корзины, если она есть
    active_promo_codes = Promo.objects.filter(is_active=True, expiration_date__gte=timezone.now())
    archived_promo_codes = Promo.objects.filter(is_active=False)

    if request.method == 'POST':
        promo_code = request.POST.get('promo_code')
        if promo_code:
            try:
                promo = Promo.objects.get(code=promo_code, is_active=True, expiration_date__gte=timezone.now())
                discount = promo.discount_value
                cart.applied_discount = discount  # Сохраняем скидку в корзине
                cart.promo_code = promo  # Сохраняем объект промокода в корзине
                cart.save()  # Не забудьте сохранить изменения
                messages.success(request, f'Промокод успешно применён! Скидка: {discount}%.')
            except Promo.DoesNotExist:
                messages.error(request, 'Недействительный или просроченный промокод.')

    discounted_price = total_price * (Decimal(1) - (discount))   # Новая цена с учётом скидки

    return render(request, 'cart.html', {
        'cart_items': cart_items,
        'total_price': total_price,
        'discounted_price': discounted_price,  # Передаём новую сумму
        'discount': discount,
        'active_promo_codes': active_promo_codes,  # Передаем активные промокоды
        'archived_promo_codes': archived_promo_codes,  # Передаем архивные промокоды
    })

    
def update_cart_item(request, item_id):
    if request.method == 'POST':
        quantity = request.POST.get('quantity')
        cart_item = get_object_or_404(CartItem, pk=item_id)

        if quantity and int(quantity) > 0:
            cart_item.quantity = int(quantity)
            cart_item.save()
    
    return redirect('cart')

def remove_from_cart(request, product_id):
    if request.user.is_authenticated:
        cart = get_object_or_404(Cart, user=request.user)
        cart_item = cart.items.filter(product__id=product_id).first()
        
        if cart_item:
            cart_item.delete()
    
    return redirect('cart')

@login_required
def checkout(request):
    cart = get_object_or_404(Cart, user=request.user)
    cart_items = cart.items.all()

    if not cart_items.exists():
        messages.error(request, 'Ваша корзина пуста.')
        return redirect('cart')

    total_price = sum(item.total_price() for item in cart_items)
    discount = cart.applied_discount  # Получаем скидку из корзины
    discounted_price = total_price * (Decimal(1) - (discount))

    if request.method == 'POST' and 'confirm_order' in request.POST:
        for item in cart_items:
            Order.objects.create(
                buyer=request.user,
                product=item.product,
                quantity=item.quantity,
                date_sold=timezone.now(),
                price=item.total_price() * (Decimal(1) - (discount))  # Используем итоговую цену
            )

        cart.items.all().delete()  # Очищаем корзину после оформления заказа
        cart.applied_discount = 0  # Сбрасываем применённую скидку
        cart.promo_code = None  # Сбрасываем промокод
        cart.save()
        return redirect('customer_orders')

    return render(request, 'checkout.html', {
        'cart_items': cart_items,
        'total_price': total_price,
        'discounted_price': discounted_price,
        'discount': discount,
        'applied_discount': discount,  # Передаём применённую скидку
        'promo_code': cart.promo_code  # Передаем объект промокода
    })
    
def get_youtube_id(url):
    match = re.search(r'(?:https?://)?(?:www\.)?(?:youtube\.com/watch\?v=|youtu\.be/)([a-zA-Z0-9_-]{11})', url)
    return match.group(1) if match else None   
 
# def contacts_list(request):
#     employees=Employee.objects.all()[:10]
#     return render(request, 'contacts_list.html', {'employees': employees})
def contacts_data(request):
    employees = Employee.objects.all()[:10]
    
    employee_data = []
    for employee in employees:
        employee_data.append({
            'name': employee.user.username,
            'position': employee.position,
            'phone_number': employee.phone_number,
            'email': employee.email,
            'photo_url': employee.photo.url if employee.photo else '',
        })
    
    return JsonResponse({'employees': employee_data})

def contacts_list(request):
    return render(request, 'contacts_list.html')

def students_list(request):
    return render(request, 'students_list.html')

# def statistics(request):
#     return render(request, 'statistics.html')

from django.http import JsonResponse
from math import asin, factorial

def arcsin_series(x, num_terms=10):
    """ Вычисляет ряд для arcsin(x) до заданного количества членов. """
    result = 0.0
    for n in range(num_terms):
        coef = factorial(2 * n) / (4**n * (factorial(n)**2) * (2 * n + 1))
        result += coef * (x ** (2 * n + 1))
    return result

def plot_arcsin(request):
    """ Генерирует данные для графика и рендерит их вместе с шаблоном. """
    x_values = [i / 100 for i in range(-90, 91)]  # x от -0.9 до 0.9 с шагом 0.01
    series_values = [arcsin_series(x) for x in x_values]
    math_values = [asin(x) for x in x_values]

    context = {
        "x_values": x_values,
        "series_values": series_values,
        "math_values": math_values,
    }
    return render(request, 'plot_arcsin.html', context)
