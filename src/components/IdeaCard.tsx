import React from 'react';
import { ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react';
import { Idea } from '../types';

interface IdeaCardProps {
  idea: Idea;
  onVote: (id: string, voteType: 'upvote' | 'downvote') => void;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea, onVote }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-bold mb-2">{idea.title}</h2>
      <p className="text-gray-600 mb-4">{idea.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Posted by {idea.author}</span>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onVote(idea.id, 'upvote')}
            className="flex items-center text-green-500 hover:text-green-600"
          >
            <ThumbsUp size={18} className="mr-1" />
            <span>{idea.upvotes}</span>
          </button>
          <button
            onClick={() => onVote(idea.id, 'downvote')}
            className="flex items-center text-red-500 hover:text-red-600"
          >
            <ThumbsDown size={18} className="mr-1" />
            <span>{idea.downvotes}</span>
          </button>
          <div className="flex items-center text-blue-500">
            <MessageCircle size={18} className="mr-1" />
            <span>{idea.comments.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;