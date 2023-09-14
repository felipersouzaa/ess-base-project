import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './index.module.css';

const apiService = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

interface HistoryItem {
  user: string;
  new_fav: string;
  id: string;
}

const UserHistoryPage: React.FC = () => {
  const user = 'UserMock';
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    fetchHistoryData(user);
  }, []);

  const fetchHistoryData = (user: string) => {
    apiService.get(`/favoritos/{user_id}?user=${user}`)
      .then(response => {
        processResponseData(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const processResponseData = (data: any) => {
    const processedData = data.map((item: any) => ({
      name: item.new_fav,
      id: item.id,
    }));
    setHistory(processedData.reverse());
  };

  return (
    <div className={styles.container}>
      <div className={styles.returnButtonContainer}>
        <button className={styles.returnButton} onClick={() => window.history.back()}>Retornar</button>
      </div>
      <h1 className={styles.title}>Favoritos</h1>
      <div className={styles.scrollContainer}>
        <div className={styles['scrollable-card-container']}>
          {history.map(item => (
            <div key={item.id} className={styles.card}>
              <div className={styles.place}>
                <div className={styles.innerPlace}></div>
              </div>
              <p>Name: {item.new_fav}</p>
              <p>ID: {item.id}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserHistoryPage;
