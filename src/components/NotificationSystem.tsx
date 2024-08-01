import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, doc, DocumentData } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from '../firebase';

interface Notification {
  id: string;
  message: string;
  read: boolean;
}

const NotificationSystem: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchNotifications = async () => {
    const querySnapshot = await getDocs(collection(db, 'notifications'));
    const fetchedNotifications: Notification[] = [];
    querySnapshot.forEach((doc) => {
      fetchedNotifications.push({ id: doc.id, ...doc.data() } as Notification);
    });
    setNotifications(fetchedNotifications);
  };

  const createNotification = async (message: string) => {
    await addDoc(collection(db, 'notifications'), { message, read: false });
    fetchNotifications();
  };

  const markAsRead = async (id: string) => {
    const notificationRef = doc(db, 'notifications', id);
    await updateDoc(notificationRef, { read: true });
    fetchNotifications();
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div>
      <h2>Notification System</h2>
      <button onClick={() => createNotification('Notification 1')}>Notify 1</button>
      <button onClick={() => createNotification('Notification 2')}>Notify 2</button>
      <button onClick={() => createNotification('Notification 3')}>Notify 3</button>

      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>
            {notification.message} - {notification.read ? 'Read' : 'Unread'}
            {/* {!notification.read && (
              <button onClick={() => markAsRead(notification.id)}>Mark as Read</button>
            )} */}
            <Link to={`/view/${notification.id}`}>
              <button onClick={() => markAsRead(notification.id)}>View</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationSystem;
