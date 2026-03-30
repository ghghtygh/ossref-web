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

interface TreeNode {
  name: string;
  isDir: boolean;
  children: TreeNode[];
}

function buildTree(paths: string[]): TreeNode[] {
  const root: TreeNode[] = [];

  for (const path of paths) {
    const isDir = path.endsWith('/');
    const clean = isDir ? path.slice(0, -1) : path;
    const parts = clean.split('/');

    let current = root;
    for (let i = 0; i < parts.length; i++) {
      const name = parts[i];
      const isLast = i === parts.length - 1;
      let existing = current.find(n => n.name === name);

      if (!existing) {
        existing = { name, isDir: isLast ? isDir : true, children: [] };
        current.push(existing);
      }
      current = existing.children;
    }
  }

  return root;
}

function renderTree(nodes: TreeNode[], prefix: string = ''): React.ReactNode[] {
  const lines: React.ReactNode[] = [];

  nodes.forEach((node, i) => {
    const isLast = i === nodes.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    const childPrefix = prefix + (isLast ? '    ' : '│   ');
    const display = node.isDir ? node.name + '/' : node.name;

    lines.push(
      <div key={prefix + node.name}>
        <span className="muted">{prefix}{connector}</span>
        <span className={node.isDir ? 'dir' : ''}>{display}</span>
      </div>
    );

    if (node.children.length > 0) {
      lines.push(...renderTree(node.children, childPrefix));
    }
  });

  return lines;
}

function findRoot(paths: string[]): string {
  if (paths.length === 0) return '';
  const first = paths[0];
  const isDir = first.endsWith('/');
  if (!isDir) return '';

  const root = first;
  const allUnder = paths.slice(1).every(p => p.startsWith(root));
  return allUnder ? root : '';
}

interface RepoCardProps {
  repo: Repo;
  expanded: boolean;
  index: number;
  onToggle: () => void;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo, expanded, index, onToggle }) => {
  const rootPath = findRoot(repo.tree);
  const trimmedPaths = rootPath
    ? repo.tree.slice(1).map(p => p.slice(rootPath.length))
    : repo.tree;
  const tree = buildTree(trimmedPaths);

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
          {rootPath && <div><span className="muted">{rootPath}</span></div>}
          {renderTree(tree)}
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
