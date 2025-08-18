import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from '@/components/ui/icon';

const Product = () => {
  const { productId } = useParams();
  const [cartItems, setCartItems] = useState<{id: number, name: string, price: number, quantity: number}[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const allProducts = [
    {
      id: 1,
      name: "Мраморная говядина",
      description: "Премиальное мясо с мраморной структурой",
      fullDescription: "Элитная мраморная говядина высшего качества. Мясо отличается нежной текстурой и насыщенным вкусом благодаря равномерному распределению жировых прожилок. Идеально подходит для стейков и жарки на гриле.",
      price: 2500,
      oldPrice: 3000,
      image: "/img/09ee0dd6-bd26-4c11-8018-cdafe2b7c12b.jpg",
      category: "говядина",
      weight: "1 кг",
      origin: "Аргентина",
      composition: "100% говядина",
      storage: "От -18°C до -20°C"
    },
    {
      id: 2,
      name: "Ребра ягненка",
      description: "Нежные ребрышки для особых случаев",
      fullDescription: "Отборные ребра молодого ягненка. Мясо характеризуется деликатным вкусом и нежной текстурой. Прекрасно подходит для запекания в духовке с травами и специями.",
      price: 1800,
      oldPrice: 2200,
      image: "/img/39f5a6a9-d66f-4ddc-9dd9-9f6191b9c82f.jpg",
      category: "баранина",
      weight: "800 г",
      origin: "Новая Зеландия",
      composition: "100% баранина",
      storage: "От -18°C до -20°C"
    },
    {
      id: 3,
      name: "Колбасы ассорти",
      description: "Авторские колбасы от шеф-повара",
      fullDescription: "Набор из 4 видов авторских колбас, приготовленных по уникальным рецептам нашего шеф-повара. Включает: чоризо, итальянскую колбасу, мерге и домашнюю.",
      price: 1200,
      oldPrice: 1400,
      image: "/img/e518ae2f-d156-45ca-8c99-3b0cc17d11b6.jpg",
      category: "колбасы",
      weight: "600 г",
      origin: "Россия",
      composition: "Свинина, говядина, специи",
      storage: "От 0°C до +6°C"
    },
    {
      id: 4,
      name: "Свиная вырезка",
      description: "Нежная свинина высшего сорта",
      fullDescription: "Свиная вырезка — самая нежная часть свинины. Мясо практически не содержит жира и соединительных тканей, что делает его идеальным для быстрого приготовления.",
      price: 1500,
      oldPrice: 1800,
      image: "/img/fe083e35-117b-45f0-a257-972c6d1873ec.jpg",
      category: "свинина",
      weight: "700 г",
      origin: "Россия",
      composition: "100% свинина",
      storage: "От -18°C до -20°C"
    },
    {
      id: 5,
      name: "Куриная грудка",
      description: "Диетическое мясо без кости",
      fullDescription: "Филе куриной грудки без кости и кожи. Диетический продукт с высоким содержанием белка и минимальным количеством жира. Идеально для здорового питания.",
      price: 800,
      oldPrice: 950,
      image: "/img/7e26611b-2cdb-4ce8-9aff-03877ba171dc.jpg",
      category: "курица",
      weight: "500 г",
      origin: "Россия",
      composition: "100% куриное мясо",
      storage: "От -18°C до -20°C"
    }
  ];

  const product = allProducts.find(p => p.id === parseInt(productId || '0'));
  const relatedProducts = allProducts.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 3);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Товар не найден</div>;
  }

  const addToCart = (productToAdd: any, qty = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === productToAdd.id);
      if (existing) {
        return prev.map(item => 
          item.id === productToAdd.id 
            ? {...item, quantity: item.quantity + qty}
            : item
        );
      }
      return [...prev, {id: productToAdd.id, name: productToAdd.name, price: productToAdd.price, quantity: qty}];
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
          <Link to={`/category/${product.category}`} className="hover:text-primary capitalize">
            {product.category}
          </Link>
          <Icon name="ChevronRight" size={16} />
          <span className="text-primary font-medium">{product.name}</span>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-4 mb-2">
                  <h1 className="text-3xl font-bold">{product.name}</h1>
                  <Badge variant="secondary" className="capitalize">
                    {product.category}
                  </Badge>
                </div>
                <p className="text-lg text-gray-600">{product.description}</p>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-primary">₽{product.price}</span>
                <span className="text-xl text-gray-400 line-through">₽{product.oldPrice}</span>
                <Badge className="bg-green-100 text-green-800">
                  Скидка {Math.round((1 - product.price / product.oldPrice) * 100)}%
                </Badge>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4">
                <span className="text-lg font-medium">Количество:</span>
                <div className="flex items-center border rounded-lg">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3"
                  >
                    -
                  </Button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3"
                  >
                    +
                  </Button>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
                onClick={() => addToCart(product, quantity)}
              >
                Добавить в корзину за ₽{product.price * quantity}
              </Button>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Package" className="text-primary" size={20} />
                    <div>
                      <div className="font-medium">Вес</div>
                      <div className="text-sm text-gray-600">{product.weight}</div>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" className="text-primary" size={20} />
                    <div>
                      <div className="font-medium">Происхождение</div>
                      <div className="text-sm text-gray-600">{product.origin}</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="description" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Описание</TabsTrigger>
              <TabsTrigger value="specifications">Характеристики</TabsTrigger>
              <TabsTrigger value="storage">Хранение</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Подробное описание</h3>
                <p className="text-gray-700 leading-relaxed">{product.fullDescription}</p>
              </Card>
            </TabsContent>
            <TabsContent value="specifications" className="mt-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Технические характеристики</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Вес:</span>
                    <span>{product.weight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Происхождение:</span>
                    <span>{product.origin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Состав:</span>
                    <span>{product.composition}</span>
                  </div>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="storage" className="mt-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Условия хранения</h3>
                <p className="text-gray-700">Температура хранения: {product.storage}</p>
                <p className="text-gray-700 mt-2">Срок годности: 30 дней с даты производства</p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Похожие товары</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <Link to={`/product/${relatedProduct.id}`}>
                    <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10">
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">
                      <Link to={`/product/${relatedProduct.id}`} className="hover:text-primary">
                        {relatedProduct.name}
                      </Link>
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-primary">₽{relatedProduct.price}</span>
                      <Button 
                        size="sm"
                        onClick={() => addToCart(relatedProduct)}
                      >
                        В корзину
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

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

export default Product;