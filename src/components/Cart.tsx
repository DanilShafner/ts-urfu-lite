import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom'; 
import { FiTrash2 } from 'react-icons/fi'; 

// Интерфейс товара в корзине
interface CartItem {
  id: string; 
  name: string; 
  price: number; 
  image: string; 
  quantity: number; 
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // Создаем состояние для хранения товаров в корзине

  // Используем useEffect для загрузки товаров из localStorage
  useEffect(() => {
    // Загружаем корзину из localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
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
    setCartItems(updatedCart); // Обновляем состояние корзины
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Сохраняем обновленную корзину в localStorage
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
    setCartItems(updatedCart); // Обновляем состояние корзины
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Сохраняем обновленную корзину в localStorage
  };

  // Рассчитываем общую сумму заказа
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Корзина</h2>
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
      <Link to="/checkout" className="checkout-button">Оплатить</Link> 
    </div>
  );
};

export default Cart;
