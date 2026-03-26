import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Filters from './components/Filters';
import RepoGrid from './components/RepoGrid';
import Footer from './components/Footer';
import { fetchRepos } from './api/mock';
import { Repo, FilterState } from './types';
import './App.css';

function App() {
  const [filters, setFilters] = useState<FilterState>({ fw: 'all', arch: 'all' });
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRepos = useCallback(async () => {
    setLoading(true);
    const data = await fetchRepos(filters);
    setRepos(data);
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    loadRepos();
  }, [loadRepos]);

  return (
    <div className="page">
      <Header />
      <Filters filters={filters} onFilterChange={setFilters} />
      <div className="count-bar">
        <div className="count">
          <strong>{repos.length}개</strong> 프로젝트
        </div>
      </div>
      <RepoGrid repos={repos} loading={loading} />
      <Footer />
    </div>
  );
}

export default App;
