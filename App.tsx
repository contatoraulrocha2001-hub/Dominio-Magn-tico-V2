
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { UserView } from './components/UserView';
import { AdminView } from './components/AdminView';
import { ProfileView } from './components/ProfileView';
import { LoginView } from './components/LoginView';
import { ViewMode, Resource, User } from './types';

const INITIAL_RESOURCES: Resource[] = [];

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>(ViewMode.LIBRARY);
  const [resources, setResources] = useState<Resource[]>(() => {
    const saved = localStorage.getItem('dm_resources');
    return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
  });
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('dm_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('dm_resources', JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('dm_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('dm_user');
    }
  }, [user]);

  const addResource = (resource: Resource) => {
    setResources(prev => [resource, ...prev]);
  };

  const deleteResource = (id: string) => {
    setResources(prev => prev.filter(r => r.id !== id));
  };

  const updateResource = (updated: Resource) => {
    setResources(prev => prev.map(r => r.id === updated.id ? updated : r));
  };

  const handleLogout = () => {
    setUser(null);
    setView(ViewMode.LIBRARY);
  };

  const renderContent = () => {
    if (!user) return null;

    switch (view) {
      case ViewMode.LIBRARY:
        return <UserView resources={resources} user={user} />;
      case ViewMode.ADMIN:
        return (
          <AdminView 
            resources={resources} 
            onAdd={addResource} 
            onDelete={deleteResource}
            onUpdate={updateResource}
          />
        );
      case ViewMode.PROFILE:
        return <ProfileView user={user} setUser={setUser} />;
      default:
        return <UserView resources={resources} user={user} />;
    }
  };

  if (!user) {
    return <LoginView onLogin={setUser} />;
  }

  return (
    <div className="flex h-screen bg-matte text-white overflow-hidden">
      <Sidebar 
        currentView={view} 
        setView={setView} 
        userRole={user.role} 
        onLogout={handleLogout}
      />
      
      <main className="flex-1 overflow-y-auto bg-matte px-8 pt-12 pb-24 relative">
        <div className="max-w-7xl mx-auto h-full">
          {renderContent()}
        </div>
        
        <div className="fixed bottom-0 right-0 p-8 pointer-events-none opacity-20 select-none">
          <h1 className="font-playfair text-9xl italic font-bold text-white/5">DM</h1>
        </div>
      </main>
    </div>
  );
};

export default App;
