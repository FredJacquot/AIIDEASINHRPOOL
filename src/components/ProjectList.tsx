import React, { useEffect, useState } from 'react';
import { Idea } from '../types';

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Idea[]>([]);

  useEffect(() => {
    const storedIdeas = localStorage.getItem('ideas');
    if (storedIdeas) {
      setProjects(JSON.parse(storedIdeas));
    }
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Featured AI in HR Projects</h2>
      {projects.length === 0 ? (
        <p>No projects available yet. Be the first to submit an idea!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div key={project.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-2">{project.description}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Upvotes: {project.upvotes}</span>
                <span>Downvotes: {project.downvotes}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;