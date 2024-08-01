import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, DocumentData, DocumentReference } from 'firebase/firestore';
import { db } from '../firebase';

// Define the Notification interface
interface Notification {
  id: string;
  message: string;
  read: boolean;
}

// Define the expected parameters from the URL
interface Params {
  id: string;
}

const ViewNotification: React.FC = () => {
  // Use the Params interface to type the useParams hook
  const { id } = useParams();
  const navigate = useNavigate();
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        // Ensure id is a string and defined before using it
        if (id) {
          const docRef: DocumentReference<DocumentData> = doc(db, 'notifications', id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setNotification({ id: docSnap.id, ...docSnap.data() } as Notification);
          } else {
            console.log('No such document!');
          }
        } else {
          console.error('ID is undefined or not a string.');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchNotification();
  }, [id]);

  if (!notification) {
    return <div>Loading...</div>;
  }

  return (
    <div className="notification-view">
      <h3>Notification Details</h3>
      <p>
        <strong>Message:</strong> {notification?.message}
      </p>
      <p>
        <strong>Status:</strong> {notification.read ? 'Read' : 'Unread'}
      </p>
      <button onClick={() => navigate('/')}>Back to Notifications</button>
    </div>
  );
};

export default ViewNotification;
