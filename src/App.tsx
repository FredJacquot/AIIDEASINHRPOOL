import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Idea } from './types';
import IdeaCard from './components/IdeaCard';
import IdeaForm from './components/IdeaForm';
import Login from './components/Login';
import Register from './components/Register';
import ManageIdeas from './components/ManageIdeas';
import ProjectList from './components/ProjectList';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { BrainCircuit } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const AppContent: React.FC = () => {
  const [ideas, setIdeas] = React.useState<Idea[]>([]);
  const { user, logout } = useAuth();

  React.useEffect(() => {
    const storedIdeas = localStorage.getItem('ideas');
    if (storedIdeas) {
      setIdeas(JSON.parse(storedIdeas));
    }
  }, []);

  const handleSubmitIdea = (title: string, description: string) => {
    if (user) {
      const newIdea: Idea = {
        id: Date.now().toString(),
        title,
        description,
        author: user.username,
        authorId: user.id,
        upvotes: 0,
        downvotes: 0,
        comments: [],
      };
      const updatedIdeas = [newIdea, ...ideas];
      setIdeas(updatedIdeas);
      localStorage.setItem('ideas', JSON.stringify(updatedIdeas));
    }
  };

  const handleVote = (id: string, voteType: 'upvote' | 'downvote') => {
    const updatedIdeas = ideas.map((idea) =>
      idea.id === id
        ? {
            ...idea,
            upvotes: voteType === 'upvote' ? idea.upvotes + 1 : idea.upvotes,
            downvotes: voteType === 'downvote' ? idea.downvotes + 1 : idea.downvotes,
          }
        : idea
    );
    setIdeas(updatedIdeas);
    localStorage.setItem('ideas', JSON.stringify(updatedIdeas));
  };

  const handleDeleteIdea = (id: string) => {
    const updatedIdeas = ideas.filter((idea) => idea.id !== id);
    setIdeas(updatedIdeas);
    localStorage.setItem('ideas', JSON.stringify(updatedIdeas));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center">
            <BrainCircuit size={32} className="text-blue-500 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">AI in HR Ideas</h1>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/" className="text-blue-500 hover:text-blue-700">Home</Link></li>
              {user ? (
                <>
                  <li><Link to="/manage" className="text-blue-500 hover:text-blue-700">Manage Ideas</Link></li>
                  <li><button onClick={logout} className="text-blue-500 hover:text-blue-700">Logout</button></li>
                </>
              ) : (
                <>
                  <li><Link to="/login" className="text-blue-500 hover:text-blue-700">Login</Link></li>
                  <li><Link to="/register" className="text-blue-500 hover:text-blue-700">Register</Link></li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={
            <>
              <ProjectList />
              {user && <IdeaForm onSubmit={handleSubmitIdea} />}
              <div className="space-y-6 mt-8">
                <h2 className="text-2xl font-bold mb-4">Latest Ideas</h2>
                {ideas.map((idea) => (
                  <IdeaCard key={idea.id} idea={idea} onVote={handleVote} />
                ))}
              </div>
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/manage" element={
            <ProtectedRoute>
              <ManageIdeas ideas={ideas} onVote={handleVote} onDelete={handleDeleteIdea} />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;