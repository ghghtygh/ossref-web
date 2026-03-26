import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <span>ossref — open source reference gallery</span>
      <span>데이터는 GitHub API 기반으로 수집됩니다</span>
    </footer>
  );
};

export default Footer;
