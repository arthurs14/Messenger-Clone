import React,  { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth, chatEngine, chatKey } from '../firebase';

import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Chats = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await auth.signOut();
    history.push('/');
  };

  const getFile = async (url) => {
    const response = await fetch(url);

    // blob any type of file to transfer in binary format
    const data = await response.blob();

    return new File([data], 'userPhoto.jpg', { type: 'image/jpeg' });
  };

  useEffect(() => {
    if (!user) {
      history.push('/');
      return;
    }

    axios.get('https://api.chatengine.io/users/me', {
      headers: {
        "project-id": chatEngine,
        "user-name": user.email,
        "user-secret": user.uid,
      }
    })
    .then(() => {
      setLoading(false);
    })
    .catch(() => {
      let formData = new FormData();
      formData.append('email', user.email);
      formData.append('username', user.displayName);
      formData.append('secret', user.uid);

      getFile(user.photoUrl)
        .then((avatar) => {
          formData.append('avatar', avatar, avatar.name);

          axios.post('https://api.chatengine.io/users', formData, {
            headers: {
              "private-key": chatKey,
            }
          })
          .then(() => setLoading(false))
          .catch((error) => console.log(error));
        })
    });
  }, [user, history]);

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">
          Messenger Clone
        </div>
        <div onClick={handleLogout} className="logout-tab">
          Logout
        </div>
      </div>

      <ChatEngine 
        projectId={chatEngine}
        userName="."
        userSecret="."
      />
    </div>
  );
};

export default Chats;