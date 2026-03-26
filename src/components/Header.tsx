import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div>
        <div className="logo">oss<span>ref</span></div>
        <div className="tagline">아키텍처를 참고할 수 있는 오픈소스 추천</div>
      </div>
      <div className="header-right">
        GitHub API + LLM으로 자동 수집<br />
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">↗ contribute</a>
      </div>
    </header>
  );
};

export default Header;
