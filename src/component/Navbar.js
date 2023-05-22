import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion, useCycle } from 'framer-motion';

// 方便未來增加頁面
const listItem = [
  {
    id: 'about',
    to: '/about',
    item: '關於我們',
  },
  {
    id: 'adopt',
    to: '/adopt',
    item: '領養專區',
  },
  {
    id: 'heart',
    to: '/product',
    item: '愛心好物',
  },
];

// 設置清單開啟、關閉變化，動畫順序 staggerDirection 為 1 從第一個到最後一個 ，-1 則相反
const menuVariants = {
  hidden: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
  visible: {
    transition: {
      staggerChildren: 0.3,
      staggerDirection: 1,
    },
  },
};

// 設置項目開啟、關閉變化
const itemVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

function Navbar() {
  // 點擊切換 True 、 False，相似為 useState()
  const [burgerOpen, setBurgerOpen] = useCycle(false, true);

  return (
    <>
      <header className="front-header">
        <div className="front-header__wrapper">
          <div className="front-header__wrapper__mobile">
            <button
              className="front-header__wrapper__mobile__button"
              onClick={setBurgerOpen}
            >
              {burgerOpen ? (
                <i className="bi bi-x-lg"></i>
              ) : (
                <i className="bi bi-list"></i>
              )}
            </button>
            <AnimatePresence>
              {/* 設置初始 initial 位置、動畫 animate 位置、結束 exit 位置 */}
              {burgerOpen && (
                <motion.div
                  className="front-header__wrapper__mobile__menu"
                  initial={{ width: 'auto' }}
                  animate={{ width: '100vw' }}
                  exit={{ height: 0, transition: { delay: 0.6 } }}
                >
                  <motion.ul
                    className="front-header__wrapper__mobile__menu__list"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={menuVariants}
                  >
                    {listItem.map((item) => {
                      return (
                        // 子元素會繼承 initial 、 animate 、 exit ，只需設定 variants
                        <motion.li
                          className="front-header__wrapper__mobile__menu__list__item"
                          key={item.id}
                          variants={itemVariants}
                        >
                          <Link
                            to={item.to}
                            className="front-header__wrapper__mobile__menu__list__item__link"
                            onClick={setBurgerOpen}
                          >
                            {item.item}
                          </Link>
                        </motion.li>
                      );
                    })}
                  </motion.ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <ul className="front-header__wrapper__list">
            {listItem.map((item) => {
              return (
                <li className="front-header__wrapper__list__item" key={item.id}>
                  <NavLink
                    to={item.to}
                    className="front-header__wrapper__list__item__link"
                  >
                    {item.item}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <Link to="/" className="front-header__wrapper__title">
            Family Pet
          </Link>
          <div className="front-header__wrapper__icon">
            <Link to="/" className="front-header__wrapper__icon__link">
              <i className="bi bi-cart2"></i>
            </Link>
            <Link to="/login" className="front-header__wrapper__icon__link">
              <i className="bi bi-person"></i>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
