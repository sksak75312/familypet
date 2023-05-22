import { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

// 側欄使用陣列、方便新增後台項目
const asideItem = [
  {
    id: 'products',
    icon: 'bi bi-cup-hot',
    link: '/admin/products',
    item: '產品管理',
  },
  {
    id: 'coupons',
    icon: 'bi bi-ticket-perforated',
    link: '/admin/coupons',
    item: '優惠券管理',
  },
  {
    id: 'orders',
    icon: 'bi bi-file-earmark-text',
    link: '/admin/orders',
    item: '訂單管理',
  },
  {
    id: 'articles',
    icon: 'bi bi-file-text',
    link: '/admin/articles',
    item: '文章管理',
  },
];

function Dashboard() {
  const navigate = useNavigate();

  // 取出 Toke
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('familyPetToken='))
    ?.split('=')[1];

  axios.defaults.headers.common['Authorization'] = token;

  // 判斷沒有 Token 跳回登入畫面
  useEffect(() => {
    if (!token) {
      return navigate('/login');
    }
  }, [token, navigate]);

  // 登出清除 Token、跳回登入畫面
  const logout = () => {
    document.cookie = 'familyPetToken=;';
    navigate('/login');
  };

  return (
    <>
      <header className="admin__header">
        <h2 className="admin__header__title">Family Pet</h2>
        <div className="admin__header__button">
          <button className="admin__header__button__item" onClick={() => {
            navigate('/');
          }}>
            <i className="bi bi-house admin__header__button__item__icon"></i>
          </button>
          <button className="admin__header__button__item" onClick={logout}>
            <i className="bi bi-box-arrow-in-right admin__header__button__item__icon"></i>
          </button>
        </div>
      </header>
      <main className="admin__main">
        <section className="admin__aside">
          <nav className="admin__aside__navbar">
            <ul className="admin__aside__navbar__list">
              {asideItem.map((item) => {
                return (
                  <li
                    className="admin__aside__navbar__list__item"
                    key={item.id}
                  >
                    <NavLink
                      className="admin__aside__navbar__list__item__link"
                      to={item.link}
                    >
                      <i className={item.icon}></i>
                      {item.item}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </section>
        <Outlet></Outlet>
      </main>
    </>
  );
}

export default Dashboard;
