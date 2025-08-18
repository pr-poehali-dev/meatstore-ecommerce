import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from '@/components/ui/icon';

const Index = () => {
  const [cartItems, setCartItems] = useState<{id: number, name: string, price: number, quantity: number}[]>([]);
  const [showCart, setShowCart] = useState(false);

  const products = [
    {
      id: 1,
      name: "Мраморная говядина",
      description: "Премиальное мясо с мраморной структурой",
      price: 2500,
      oldPrice: 3000,
      image: "/img/09ee0dd6-bd26-4c11-8018-cdafe2b7c12b.jpg",
      category: "Говядина"
    },
    {
      id: 2,
      name: "Ребра ягненка",
      description: "Нежные ребрышки для особых случаев",
      price: 1800,
      oldPrice: 2200,
      image: "/img/39f5a6a9-d66f-4ddc-9dd9-9f6191b9c82f.jpg",
      category: "Баранина"
    },
    {
      id: 3,
      name: "Колбасы ассорти",
      description: "Авторские колбасы от шеф-повара",
      price: 1200,
      oldPrice: 1400,
      image: "/img/e518ae2f-d156-45ca-8c99-3b0cc17d11b6.jpg",
      category: "Колбасы"
    }
  ];

  const addToCart = (product: any) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? {...item, quantity: item.quantity + 1}
            : item
        );
      }
      return [...prev, {id: product.id, name: product.name, price: product.price, quantity: 1}];
    });
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold">МЕСТО ДРАРИ</h1>
              <div className="hidden md:flex space-x-6">
                <a href="#catalog" className="hover:text-orange-200 transition-colors">Каталог</a>
                <a href="#delivery" className="hover:text-orange-200 transition-colors">Доставка</a>
                <a href="#about" className="hover:text-orange-200 transition-colors">О нас</a>
                <a href="#contacts" className="hover:text-orange-200 transition-colors">Контакты</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                className="relative bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={() => setShowCart(!showCart)}
              >
                <Icon name="ShoppingCart" size={20} />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-white text-primary min-w-5 h-5 text-xs">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Премиальные мясные продукты</h1>
          <p className="text-xl mb-8 opacity-90">Суть моварки. Вадулстена кариз</p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              ПРОДУГНАТ
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              ЕВСТО ВАРТ
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Icon name="ShoppingCart" size={48} className="text-primary mb-4" />
              <h3 className="font-semibold">Быстрый заказ</h3>
            </div>
            <div className="flex flex-col items-center">
              <Icon name="Eye" size={48} className="text-primary mb-4" />
              <h3 className="font-semibold">Контроль качества</h3>
            </div>
            <div className="flex flex-col items-center">
              <Icon name="Truck" size={48} className="text-primary mb-4" />
              <h3 className="font-semibold">Доставка</h3>
            </div>
            <div className="flex flex-col items-center">
              <Icon name="Award" size={48} className="text-primary mb-4" />
              <h3 className="font-semibold">Гарантия</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog */}
      <section id="catalog" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Каталог продукции</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span>{product.name}</span>
                    <Badge variant="secondary">{product.category}</Badge>
                  </CardTitle>
                  <p className="text-gray-600">{product.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-primary">₽{product.price}</span>
                      <span className="text-sm text-gray-400 line-through">₽{product.oldPrice}</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => addToCart(product)}
                  >
                    ADD TO CART
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowCart(false)}>
          <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Корзина</h3>
              <Button variant="ghost" onClick={() => setShowCart(false)}>
                <Icon name="X" size={24} />
              </Button>
            </div>
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center">Корзина пуста</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-4 bg-gray-50 rounded">
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-gray-600">₽{item.price} × {item.quantity}</p>
                      </div>
                      <span className="font-bold">₽{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold">Итого:</span>
                    <span className="text-xl font-bold text-primary">₽{cartTotal}</span>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Оформить заказ
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Delivery Section */}
      <section id="delivery" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Доставка</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Icon name="Clock" className="text-primary" size={24} />
                  <span>Доставка от 2 часов</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Icon name="MapPin" className="text-primary" size={24} />
                  <span>По всей Москве и области</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Icon name="Shield" className="text-primary" size={24} />
                  <span>Гарантия свежести</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary to-secondary rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Бесплатная доставка</h3>
              <p className="mb-4">при заказе от ₽3000</p>
              <Button className="bg-white text-primary hover:bg-gray-100">
                Узнать подробнее
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">О нас</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 mb-8">
              Мы - команда профессионалов, которая уже более 15 лет занимается поставками 
              премиальных мясных продуктов. Наша миссия - предоставить вам только лучшее.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">15+</div>
                <div className="text-gray-600">лет опыта</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">5000+</div>
                <div className="text-gray-600">довольных клиентов</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-gray-600">качество</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-8">Контакты</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Icon name="Phone" size={24} />
                  <span>+7 (495) 123-45-67</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Icon name="Mail" size={24} />
                  <span>info@mestodari.ru</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Icon name="MapPin" size={24} />
                  <span>Москва, ул. Примерная, д. 123</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Часы работы</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Пн-Пт:</span>
                  <span>8:00 - 22:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Сб-Вс:</span>
                  <span>9:00 - 21:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">МЕСТО ДРАРИ</h3>
              <p className="text-gray-400">Премиальные мясные продукты</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <Icon name="Instagram" size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Icon name="Facebook" size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Icon name="Twitter" size={24} />
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2024 Место Драри. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;