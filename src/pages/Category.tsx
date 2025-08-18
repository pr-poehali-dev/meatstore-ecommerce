import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from '@/components/ui/icon';

const Category = () => {
  const { categoryName } = useParams();
  const [cartItems, setCartItems] = useState<{id: number, name: string, price: number, quantity: number}[]>([]);
  const [showCart, setShowCart] = useState(false);

  const allProducts = [
    {
      id: 1,
      name: "Мраморная говядина",
      description: "Премиальное мясо с мраморной структурой",
      price: 2500,
      oldPrice: 3000,
      image: "/img/09ee0dd6-bd26-4c11-8018-cdafe2b7c12b.jpg",
      category: "говядина"
    },
    {
      id: 2,
      name: "Ребра ягненка",
      description: "Нежные ребрышки для особых случаев",
      price: 1800,
      oldPrice: 2200,
      image: "/img/39f5a6a9-d66f-4ddc-9dd9-9f6191b9c82f.jpg",
      category: "баранина"
    },
    {
      id: 3,
      name: "Колбасы ассорти",
      description: "Авторские колбасы от шеф-повара",
      price: 1200,
      oldPrice: 1400,
      image: "/img/e518ae2f-d156-45ca-8c99-3b0cc17d11b6.jpg",
      category: "колбасы"
    },
    {
      id: 4,
      name: "Свиная вырезка",
      description: "Нежная свинина высшего сорта",
      price: 1500,
      oldPrice: 1800,
      image: "/img/fe083e35-117b-45f0-a257-972c6d1873ec.jpg",
      category: "свинина"
    },
    {
      id: 5,
      name: "Куриная грудка",
      description: "Диетическое мясо без кости",
      price: 800,
      oldPrice: 950,
      image: "/img/7e26611b-2cdb-4ce8-9aff-03877ba171dc.jpg",
      category: "курица"
    }
  ];

  const filteredProducts = allProducts.filter(product => 
    categoryName ? product.category === categoryName.toLowerCase() : true
  );

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

  const categoryTitle = categoryName ? 
    categoryName.charAt(0).toUpperCase() + categoryName.slice(1) : 
    'Все товары';

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-2xl font-bold hover:text-orange-200">МЕСТО ДРАРИ</Link>
              <div className="hidden md:flex space-x-6">
                <Link to="/" className="hover:text-orange-200 transition-colors">Главная</Link>
                <Link to="/category/говядина" className="hover:text-orange-200 transition-colors">Говядина</Link>
                <Link to="/category/свинина" className="hover:text-orange-200 transition-colors">Свинина</Link>
                <Link to="/category/курица" className="hover:text-orange-200 transition-colors">Курица</Link>
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

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-primary">Главная</Link>
          <Icon name="ChevronRight" size={16} />
          <span className="text-primary font-medium">{categoryTitle}</span>
        </div>
      </div>

      {/* Category Header */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{categoryTitle}</h1>
          <p className="text-lg text-gray-600">
            {filteredProducts.length} товаров в категории
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-start text-lg">
                    <Link to={`/product/${product.id}`} className="hover:text-primary transition-colors">
                      {product.name}
                    </Link>
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-gray-600">{product.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-primary">₽{product.price}</span>
                      <span className="text-sm text-gray-400 line-through">₽{product.oldPrice}</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-sm"
                    onClick={() => addToCart(product)}
                  >
                    В КОРЗИНУ
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
    </div>
  );
};

export default Category;