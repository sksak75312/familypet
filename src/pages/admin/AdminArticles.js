import { useState, useEffect, useRef } from 'react';
import ArticleModal from '../../component/ArticleModal';
import Pagination from '../../component/Pagination';
import axios from 'axios';

function AdminArticles() {
  // 儲存 API response coupons 資料
  const [articles, setArticles] = useState([]);
  // 儲存 API response pagination 資料
  const [pagination, setPagination] = useState({});
  // 取得當前產品
  const [currentArticles, setCurrentArticles] = useState({});
  // 取得當前類型
  const [type, setType] = useState('');
  // 使用 useRef() 取的 DOM 元素
  const editModal = useRef();
  const editContainerModal = useRef();


  // 取得 products 資料，並將資料寫入 useState();
  const getArticles = async (page = 1) => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/admin/articles?page=${page}`
    );
    console.log(res)
    setArticles(res.data.articles);
    setPagination(res.data.pagination);
    console.log(res);
  };
  
  useEffect(() => {
    getArticles();
  }, []);


  // 打開、關閉 Modal、設定秒數搭配動畫效果
  const openModal = (type, article) => {
    setType(type);
    setCurrentArticles(article);
    editModal.current.classList.toggle('edit--open');
    setTimeout(() => {
      editContainerModal.current.classList.toggle('edit__container--open');
    }, 200);
  };
  const closeModal = () => {
    editContainerModal.current.classList.toggle('edit__container--open');
    setTimeout(() => {
      editModal.current.classList.toggle('edit--open');
    }, 500);
  };


  return (
    <>
      <ArticleModal
        editModal={editModal}
        editContainerModal={editContainerModal}
        closeModal={closeModal}
        getArticles={getArticles}
        currentCoupons={currentArticles}
        type={type}
      />
      <section className="admin__content">
        <div className="admin__content__header">
          <h2 className="admin__content__header__title">文章列表</h2>
          <button
            className="admin__content__header__btn"
            onClick={() => openModal('create', {})}
          >
            <i className="bi bi-plus-lg"></i>
          </button>
        </div>
        <table className="admin__content__table">
          <thead className="admin__content__table__thead">
            <tr className="admin__content__table__thead__tr">
              <th>優惠券名稱</th>
              <th>折扣優惠</th>
              <th>到期日</th>
              <th>折扣碼</th>
              <th>是否啟用</th>
              <th>優惠券編輯</th>
            </tr>
          </thead>
          <tbody className="admin__content__table__tbody">
            {articles.map((article) => {
              return (
                <tr
                  className="admin__content__table__tbody__tr"
                  key={article.id}
                >
                  <td>{article.title}</td>
                  <td>{article.percent}</td>
                  <td>{new Date(article.due_date).toLocaleDateString()}</td>
                  <td>{article.code}</td>
                  <td>{article.is_enabled ? '啟用' : '未啟用'}</td>
                  <td>
                    <button
                      className="admin__content__table__tbody__tr__btn"
                      onClick={() => openModal('edit', article)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination pagination={pagination} getProducts={getArticles} />
      </section>
    </>
  );
}

export default AdminArticles;
