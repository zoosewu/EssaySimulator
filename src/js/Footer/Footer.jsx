import React from 'react'
const Footer = () => {
  return (
    <footer className="text-muted">
      <div className="container">
        <p className="float-right mb-5" style={{ color: 'cornflowerblue', fontSize: '2rem' }}>
          <a href="https://github.com/zoosewu/EssaySimulator" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://payment.opay.tw/Broadcaster/Donate/C65AA1C8A89CB53AF4D93286E44468BF" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-donate"></i>
          </a>
        </p>
        <p className="text-center mb-1">本網站所有文體及文字素材皆取自網路，所有內容與政治傾向皆與本人無關。</p>
        <p className="text-center mb-1">EssaySimulator</p>
        <p className="text-center mb-1">Copyright © 2021 zoosewu</p>
      </div>
    </footer >)
}
export default Footer
