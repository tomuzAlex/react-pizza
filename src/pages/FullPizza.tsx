import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const FullPizza: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  React.useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get(`https://66147b222fc47b4cf27c6734.mockapi.io/items/${id}`);
        setPizza(data);
      } catch {
        alert('Ошибка при получении пиццы');
        navigate('/');
      }
    };
    fetchPizza();
  },);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="Фото пиццы" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

export default FullPizza;
