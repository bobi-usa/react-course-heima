import { createRoot } from 'react-dom/client';
import './index.css';

const root = createRoot(document.querySelector('#root'));

const categories = [
  {
    id: 1,
    name: '推荐',
  },
  {
    id: 2,
    name: '一人套餐',
  },
  {
    id: 3,
    name: '西贝热菜',
  },
  {
    id: 4,
    name: '西贝凉菜',
  },
  {
    id: 5,
    name: '杂粮主食',
  },
];

/**
 * JSX {} 的应用
 * 写 {} 表示要写JS了，再写一个{}表示写的是JS对象，eg: style={ {} }，注意这并不是双括号语法
 *
 * 列表渲染
 * 1. 数组的 map 方法
 * 2. 列表项要添加 key 属性，key 值要唯一
 *
 * 条件渲染
 * 1. 三元表达式 更适合：两个内容，要么渲染A，要么渲染B
 * 2. 逻辑与 && 更适合：一个内容，渲染 or 不渲染
 *
 * 样式处理
 * 1. className + 引入样式文件
 * 2. 行内样式 style
 */

const selectedId = 3;

root.render(
  <div
    style={{
      width: '300px',
      height: 500,
      backgroundColor: 'blue',
    }}
  >
    <ul className="list">
      {categories.map(({ id, name }, index) => {
        return (
          <li
            key={id}
            className={id === selectedId ? 'list-item selected' : 'list-item'}
          >
            {/* {index === 0 ? <i>点</i> : ''} */}
            {/* {index === 0 ? (
              <img
                src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/reactbase/waimai/menu-tuijian.png"
                alt="推荐"
              />
            ) : null} */}
            {index === 0 && (
              <img
                src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/reactbase/waimai/menu-tuijian.png"
                alt="推荐"
              />
            )}
            {name}
          </li>
        );
      })}
    </ul>
  </div>
);
