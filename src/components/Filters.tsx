import React from 'react';
import { FilterState } from '../types';
import './Filters.css';

interface FilterOption {
  value: string;
  label: string;
}

const fwOptions: FilterOption[] = [
  { value: 'all', label: '전체' },
  { value: 'spring', label: 'Spring Boot' },
  { value: 'fastapi', label: 'FastAPI' },
  { value: 'express', label: 'Express' },
  { value: 'nestjs', label: 'NestJS' },
];

const archOptions: FilterOption[] = [
  { value: 'all', label: '전체' },
  { value: 'layered', label: 'Layered' },
  { value: 'clean', label: 'Clean' },
  { value: 'hexagonal', label: 'Hexagonal' },
  { value: 'mvc', label: 'MVC' },
];

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="filters-section">
      <div className="filter-row">
        <span className="filter-label">framework</span>
        {fwOptions.map(opt => (
          <span
            key={opt.value}
            className={`chip ${filters.fw === opt.value ? 'active' : ''}`}
            onClick={() => onFilterChange({ ...filters, fw: opt.value })}
          >
            {opt.label}
          </span>
        ))}
      </div>
      <div className="filter-row">
        <span className="filter-label">architecture</span>
        {archOptions.map(opt => (
          <span
            key={opt.value}
            className={`chip ${filters.arch === opt.value ? 'active' : ''}`}
            onClick={() => onFilterChange({ ...filters, arch: opt.value })}
          >
            {opt.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Filters;
