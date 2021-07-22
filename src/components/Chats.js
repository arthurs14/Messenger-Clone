import React from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth, chatEngine } from '../firebase';

import { useAuth } from '../contexts/AuthContext';

const Chats = () => {
  const history = useHistory();
  const { user } = useAuth();

  console.log(user);

  const handleLogout = async () => {
    await auth.signOut();
    history.push('/');
  };

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
        height="calc(100vh - 66px)"
        projectId={chatEngine}
        userName="."
        userSecret="."
      />
    </div>
  );
};

export default Chats;