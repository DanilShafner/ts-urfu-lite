import React, { useState, useEffect } from 'react';
import { FiShoppingCart, FiTrash2 } from 'react-icons/fi';

// Интерфейс товара в корзине
interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CheckoutPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // Создаем состояние для хранения товаров в корзине

  // Используем useEffect для загрузки товаров из localStorage 
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]'); // Загружаем корзину из localStorage
    setCartItems(cart); // Устанавливаем состояние корзины
  }, []);

  // Функция для удаления товара из корзины
  const removeFromCart = (id: string) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          return null;
        }
      }
      return item;
    }).filter(item => item !== null) as CartItem[];
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Функция для обновления количества товара
  const updateQuantity = (id: string, delta: number) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        item.quantity += delta;
        if (item.quantity < 1) {
          item.quantity = 1;
        }
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Рассчитываем общую сумму заказа
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container">
      <header className="header">
        <div className="header-left">
          <img src="/images/restaurant-logo.png" alt="Ресторан" className="restaurant-logo" />
          <span className="restaurant-name">Ресторан</span>
        </div>
        <div className="cart-icon">
          <FiShoppingCart size={24} />
        </div>
      </header>
      <a href="/" className="header-link">назад к Меню</a>
      <div>
        <h2>Ваш заказ</h2>
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="cart-item-info">
              <h4>{item.name}</h4>
              <p>Цена: {item.price.toFixed(2)} ₽</p>
              <div className="quantity-control">
                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
              </div>
            </div>
            <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>
              <FiTrash2 />
            </button>
          </div>
        ))}
        <h3>Итого: {total.toFixed(2)} ₽</h3>
        <button className="pay-button">Оплатить</button>
      </div>
    </div>
  );
};

export default CheckoutPage;
