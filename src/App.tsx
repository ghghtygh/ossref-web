import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Filters from './components/Filters';
import RepoGrid from './components/RepoGrid';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import { fetchRepos } from './api/mock';
import { faro } from '@grafana/faro-web-sdk';
import { Repo, FilterState } from './types';
import './App.css';

function App() {
  const [filters, setFilters] = useState<FilterState>({ fw: 'all', arch: 'all' });
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRepos = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchRepos(filters);
      setRepos(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      faro.api?.pushError(error);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadRepos();
  }, [loadRepos]);

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}

export default App;
