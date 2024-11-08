import { createRoot } from 'react-dom/client';
import './index.css';

const root = createRoot(document.querySelector('#root'));

// React 事件绑定

// 第二种
const handleClick = (e) => {
  alert('a');
  e.preventDefault();
};

root.render(
  <div>
    <div
      className="box"
      // 第一种
      onClick={() => {
        alert(1);
      }}
    ></div>
    <a href="http://www.baidu.com" onClick={handleClick}>
      百度
    </a>
  </div>
);
