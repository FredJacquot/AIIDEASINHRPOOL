import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Idea } from '../types';
import IdeaCard from './IdeaCard';

interface ManageIdeasProps {
  ideas: Idea[];
  onVote: (id: string, voteType: 'upvote' | 'downvote') => void;
  onDelete: (id: string) => void;
}

const ManageIdeas: React.FC<ManageIdeasProps> = ({ ideas, onVote, onDelete }) => {
  const { user } = useAuth();

  const userIdeas = ideas.filter(idea => idea.authorId === user?.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Manage Your Ideas</h2>
      {userIdeas.length === 0 ? (
        <p>You haven't posted any ideas yet.</p>
      ) : (
        <div className="space-y-6">
          {userIdeas.map(idea => (
            <div key={idea.id} className="relative">
              <IdeaCard idea={idea} onVote={onVote} />
              <button
                onClick={() => onDelete(idea.id)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageIdeas;