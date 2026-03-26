import React from 'react';
import { Repo } from '../types';
import RepoCard from './RepoCard';
import './RepoGrid.css';

interface RepoGridProps {
  repos: Repo[];
  loading: boolean;
}

const RepoGrid: React.FC<RepoGridProps> = ({ repos, loading }) => {
  const [expandedIdx, setExpandedIdx] = React.useState<number | null>(null);

  React.useEffect(() => {
    setExpandedIdx(null);
  }, [repos]);

  if (loading) {
    return (
      <div className="grid">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card skeleton" />
        ))}
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <div className="grid">
        <div className="empty">
          <strong>결과 없음</strong>
          다른 필터 조합을 시도해보세요.
        </div>
      </div>
    );
  }

  return (
    <div className="grid">
      {repos.map((repo, i) => (
        <RepoCard
          key={repo.name}
          repo={repo}
          expanded={expandedIdx === i}
          index={i}
          onToggle={() => setExpandedIdx(expandedIdx === i ? null : i)}
        />
      ))}
    </div>
  );
};

export default RepoGrid;
