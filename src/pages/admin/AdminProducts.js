import { useState, useEffect, useRef } from 'react';
import ProductModal from '../../component/ProductModal';
import Pagination from '../../component/Pagination';
import axios from 'axios';

function AdminProducts() {
  // 儲存 API response products 資料
  const [products, setProducts] = useState([]);
  // 儲存 API response pagination 資料
  const [pagination, setPagination] = useState({});
  // 儲存當前產品
  const [currentProduct, setCurrentProduct] = useState({});
  // 儲存當前類型
  const [type, setType] = useState('');
  // 使用 useRef() 取的 DOM 元素
  const editModal = useRef();
  const editContainerModal = useRef();

  // 取得 products 資料，並將資料寫入 useState();
  const getProducts = async (page = 1) => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/admin/products?page=${page}`
    );
    setProducts(res.data.products);
    setPagination(res.data.pagination);
  };

  useEffect(() => {
    getProducts();
  }, []);

  // 打開、關閉 Modal、設定秒數搭配動畫效果
  const openModal = (type, product) => {
    setType(type);
    setCurrentProduct(product);
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
      <ProductModal
        editModal={editModal}
        editContainerModal={editContainerModal}
        closeModal={closeModal}
        getProducts={getProducts}
        currentProduct={currentProduct}
        type={type}
      />
      <section className="admin__content">
        <div className="admin__content__header">
          <h2 className="admin__content__header__title">產品列表</h2>
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
              <th>產品分類</th>
              <th>產品名稱</th>
              <th>產品售價</th>
              <th>是否啟用</th>
              <th>產品編輯</th>
            </tr>
          </thead>
          <tbody className="admin__content__table__tbody">
            {products.map((product) => {
              return (
                <tr
                  className="admin__content__table__tbody__tr"
                  key={product.id}
                >
                  <td>{product.category}</td>
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>{product.is_enabled ? '啟用' : '未啟用'}</td>
                  <td>
                    <button
                      className="admin__content__table__tbody__tr__btn"
                      onClick={() => openModal('edit', product)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination pagination={pagination} getProducts={getProducts} />
      </section>
    </>
  );
}

export default AdminProducts;
