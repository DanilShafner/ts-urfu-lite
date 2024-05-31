import React, { useState, useEffect } from 'react';
import MenuItem from './MenuItem';
import Cart from './Cart';
import { FiShoppingCart } from 'react-icons/fi';

// Интерфейс для товаров
interface MenuItemType {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  ingredients: string;
}

const MenuPage: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]); // Создаем состояние для хранения товаров
  const [filter, setFilter] = useState<string>('all'); // Создаем состояние для фильтрации товаров
  const [cartVisible, setCartVisible] = useState<boolean>(false); // Создаем состояние для отображения корзины

  // Используем useEffect для загрузки данных из файла menu.json
  useEffect(() => {
    fetch('/menu.json') // Загружаем данные из файла menu.json
      .then(response => response.json()) // Преобразуем ответ в JSON
      .then(data => setMenuItems(data)); // Устанавливаем состояние товаров
  }, []);

  // Фильтруем товары по выбранной категории
  const filteredItems = filter === 'all' ? menuItems : menuItems.filter(item => item.category === filter);

  return (
    <div className="container">
      <header className="header">
        <div className="header-left">
          <img src="/images/restaurant-logo.png" alt="Ресторан" className="restaurant-logo" />
          <span className="restaurant-name">Ресторан</span>
        </div>
        <div className="cart-icon" onClick={() => setCartVisible(!cartVisible)}>
          <FiShoppingCart size={24} />
        </div>
      </header>
      <a href="/" className="header-link">Меню</a>
      <div className="filters">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>Все</button>
        <button className={filter === 'soups' ? 'active' : ''} onClick={() => setFilter('soups')}>Супы</button>
        <button className={filter === 'drinks' ? 'active' : ''} onClick={() => setFilter('drinks')}>Напитки</button>
        <button className={filter === 'hot' ? 'active' : ''} onClick={() => setFilter('hot')}>Горячее</button>
        <button className={filter === 'breakfast' ? 'active' : ''} onClick={() => setFilter('breakfast')}>Завтрак</button>
        <button className={filter === 'salads' ? 'active' : ''} onClick={() => setFilter('salads')}>Салаты</button>
        <button className={filter === 'porridge' ? 'active' : ''} onClick={() => setFilter('porridge')}>Каши</button>
      </div>
      <div className="menu-container">
        {filteredItems.map(item => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
      {cartVisible && <div className="cart-popup"><Cart /></div>}
    </div>
  );
};

export default MenuPage;
