import React, { useState } from 'react';
import { FiPlus, FiCheck } from 'react-icons/fi';

// Интерфейс товара
interface MenuItemProps {
  item: {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
    ingredients: string;
  };
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  // Создаем состояние для отслеживания добавления товара в корзину
  const [added, setAdded] = useState(false);

  // Функция для добавления товара в корзину
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]'); // Загружаем корзину из localStorage
    // Ищем товар в корзине
    const existingItemIndex = cart.findIndex((cartItem: MenuItemProps['item']) => cartItem.id === item.id); 
    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += 1; // Увеличиваем количество, если товар уже в корзине
    } else {
      cart.push({ ...item, quantity: 1 }); // Добавляем товар в корзину, если его там нет
    }
    localStorage.setItem('cart', JSON.stringify(cart)); // Сохраняем обновленную корзину в localStorage
    setAdded(true); // Обновляем состояние добавления
    setTimeout(() => setAdded(false), 2000); // Сбрасываем состояние добавления
  };

  return (
    <div className="menu-item">
      <img src={item.image} alt={item.name} className="menu-item-image" />
      <div className="menu-item-text">
        <h3>{item.name}</h3>
        <p className="ingredients">{item.ingredients}</p>
      </div>
      <div className="menu-item-price-add">
        <p className="price">{item.price.toFixed(2)} ₽</p>
        <button className={`menu-item-button ${added ? 'added' : ''}`} onClick={addToCart}>
          {added ? <FiCheck /> : <FiPlus />}
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
