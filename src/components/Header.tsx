import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div>
        <div className="logo">oss<span>ref</span></div>
        <div className="tagline">실전 오픈소스로 배우는 서버 아키텍처</div>
      </div>
      <div className="header-right">
        GitHub API + LLM으로 자동 수집<br />
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">↗ contribute</a>
      </div>
    </header>
  );
};

export default Header;
