import React from 'react';
import { Repo } from '../types';
import './RepoCard.css';

const fwLabels: Record<string, string> = {
  spring: 'Spring Boot',
  fastapi: 'FastAPI',
  express: 'Express',
  nestjs: 'NestJS',
};

const archLabels: Record<string, string> = {
  layered: 'Layered',
  clean: 'Clean',
  hexagonal: 'Hexagonal',
  mvc: 'MVC',
};

interface RepoCardProps {
  repo: Repo;
  expanded: boolean;
  index: number;
  onToggle: () => void;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo, expanded, index, onToggle }) => {
  return (
    <div
      className={`card ${expanded ? 'expanded' : ''}`}
      onClick={onToggle}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="card-top">
        <div className="card-name">{repo.name}</div>
        <div className="card-stars"><span className="star">★</span>{repo.stars}</div>
      </div>
      <div className="card-desc">{repo.desc}</div>
      <div className="tags">
        <span className="tag tag-fw">{fwLabels[repo.fw] || repo.fw}</span>
        <span className="tag tag-arch">{archLabels[repo.arch] || repo.arch}</span>
        <span className="tag tag-lang">{repo.lang}</span>
      </div>
      <div className="card-meta">
        <span>{repo.owner}</span>
        <span>·</span>
        <span>최근 커밋 {repo.commit}</span>
      </div>
      <div className="tree-preview">
        <div className="tree-label">folder structure</div>
        <div className="tree">
          {repo.tree.map((line, i) => {
            const isRoot = i === 0;
            const isDir = line.endsWith('/');
            return (
              <div key={i}>
                {isRoot ? (
                  <span className="muted">{line}</span>
                ) : isDir ? (
                  <span className="dir">{line}</span>
                ) : (
                  line
                )}
              </div>
            );
          })}
        </div>
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
          onClick={e => e.stopPropagation()}
        >
          ↗ GitHub에서 보기
        </a>
      </div>
      <span className="expand-btn">{expanded ? '닫기 ↑' : '구조 보기 ↓'}</span>
    </div>
  );
};

export default RepoCard;
