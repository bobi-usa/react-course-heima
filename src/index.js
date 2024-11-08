// 1. 导包
import React from 'react';
import { createRoot } from 'react-dom/client';

// 2. 创建 React 根对象
const root = createRoot(document.querySelector('#root'));

// 3. 渲染 React 内容
// <h1>Hello React!</h1> => JSX（写在js中的HTML）
root.render(
  // JSX 的 3个规则：
  // 1. 只能有一个根节点
  // 2. 所有的标签必须闭合（像 img这种单标签，必须写 “/” 进行闭合）
  // 3. 标签属性名称是驼峰命名法
  <div>
    <h1>Hello JSX!</h1>
    <img
      className="avatar"
      src="https://avatars.githubusercontent.com/u/21986636?v=4"
      alt="头像"
    />
  </div>
);

console.log(<h1 className="bbb">Hello World!</h1>);
console.log(
  React.createElement(
    'h1',
    {
      className: 'aaa',
    },
    'Hello World!'
  )
);
