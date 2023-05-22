import { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteModal from './DeleteModal';

function ProductModal({
  editModal,
  closeModal,
  editContainerModal,
  getProducts,
  type,
  currentProduct,
}) {
  // 設定初始資料
  const [data, setData] = useState({
    title: '',
    category: '',
    origin_price: 100,
    price: 100,
    unit: '',
    description: '',
    content: '',
    is_enabled: 0,
    imageUrl: '',
  });

  // 關閉 Modal
  const [deleteShow, setDeleteShow] = useState(false);

  // 設定開啟 DeleteModal 的類型
  const [deleteType, setDeleteType] = useState('');

  // 取得 input 值，價格使用 Number 寫入， 是否啟用使用 + 號將 boolean 轉換成 0 或 1
  // 其餘使用正常 String 寫入
  const dataHandle = (e) => {
    const { name, value, checked } = e.target;
    if (['origin_price', 'price'].includes(name)) {
      setData({
        ...data,
        [name]: Number(value),
      });
    } else if (name === 'is_enabled') {
      console.log(e);
      setData({
        ...data,
        [name]: +checked,
      });
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };
  // 產品刪除畫面顯示、關閉，並傳入呼叫的類型
  const openDeleteModal = (type) => {
    setDeleteShow(true);
    setDeleteType(type);
  };
  const closeDeleteModal = () => {
    setDeleteShow(false);
  };

  // 新增資料，並重新渲染畫面、關閉 Modal 、重置資料
  const submit = async () => {
    try {
      let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product`;
      let method = 'post';
      if (type === 'edit') {
        api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${currentProduct.id}`;
        method = 'put';
      }
      await axios[method](api, {
        data: data,
      });
      getProducts();
      closeModal();
      setData({
        title: '',
        category: '',
        origin_price: 100,
        price: 100,
        unit: '',
        description: '',
        content: '',
        is_enabled: 0,
        imageUrl: '',
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 判斷是新增資料還是編輯資料、並把資料寫入
  useEffect(() => {
    if (type === 'edit') {
      setData(currentProduct);
    } else if (type === 'create') {
      setData({
        title: '',
        category: '',
        origin_price: 100,
        price: 100,
        unit: '',
        description: '',
        content: '',
        is_enabled: 0,
        imageUrl: '',
      });
    }
  }, [type, currentProduct]);

  return (
    <>
      <DeleteModal
        deleteShow={deleteShow}
        closeModal={closeModal}
        getProducts={getProducts}
        closeDeleteModal={closeDeleteModal}
        id={currentProduct.id}
        currentProduct={currentProduct}
        deleteType={deleteType}
      />
      <div className="edit" ref={editModal}>
        <div className="edit__container" ref={editContainerModal}>
          <div className="edit__container__header">
            <h2 className="edit__container__header__title">
              {type === 'edit' ? `編輯 ${currentProduct.title}` : '建立新產品'}
            </h2>
            <button
              className="edit__container__header__button"
              onClick={() => closeModal()}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          <div className="edit__container__list">
            <div className="edit__container__list__title">
              <label
                htmlFor="title"
                className="edit__container__list__title__label"
              >
                產品名稱
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="edit__container__list__title__input"
                value={data.title}
                onChange={dataHandle}
              />
            </div>
            <div className="edit__container__list__category">
              <label
                htmlFor="category"
                className="edit__container__list__category__label"
              >
                產品分類
              </label>
              <input
                type="text"
                id="category"
                name="category"
                className="edit__container__list__category__input"
                value={data.category}
                onChange={dataHandle}
              />
            </div>
            <div className="edit__container__list__unit">
              <label
                htmlFor="unit"
                className="edit__container__list__unit__label"
              >
                產品單位
              </label>
              <input
                type="unit"
                id="unit"
                name="unit"
                className="edit__container__list__unit__input"
                value={data.unit}
                onChange={dataHandle}
              />
            </div>
            <div className="edit__container__list__origin_price">
              <label
                htmlFor="origin_price"
                className="edit__container__list__origin_price__label"
              >
                產品原價
              </label>
              <input
                type="number"
                id="origin_price"
                name="origin_price"
                className="edit__container__list__origin_price__input"
                value={data.origin_price}
                onChange={dataHandle}
              />
            </div>
            <div className="edit__container__list__price">
              <label
                htmlFor="price"
                className="edit__container__list__price__label"
              >
                產品售價
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className="edit__container__list__price__input"
                value={data.price}
                onChange={dataHandle}
              />
            </div>
            <div className="edit__container__list__description">
              <label
                htmlFor="description"
                className="edit__container__list__description__label"
              >
                產品描述
              </label>
              <textarea
                type="text"
                id="description"
                name="description"
                className="edit__container__list__description__input"
                value={data.description}
                onChange={dataHandle}
              />
            </div>
            <div className="edit__container__list__content">
              <label
                htmlFor="content"
                className="edit__container__list__content__label"
              >
                產品內容
              </label>
              <textarea
                type="text"
                id="content"
                name="content"
                className="edit__container__list__content__input"
                value={data.content}
                onChange={dataHandle}
              />
            </div>
            <div className="edit__container__list__imageUrl">
              <label
                htmlFor="imageUrl"
                className="edit__container__list__imageUrl__label"
              >
                圖片網址
              </label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                className="edit__container__list__imageUrl__input"
                value={data.imageUrl}
                onChange={dataHandle}
              />
            </div>
            <div className="edit__container__list__is_enabled">
              <input
                type="checkbox"
                id="is_enabled"
                name="is_enabled"
                className="edit__container__list__is_enabled__input"
                onChange={dataHandle}
                checked={data.is_enabled}
              />
              <label
                htmlFor="is_enabled"
                className="edit__container__list__is_enabled__label"
              >
                是否啟用
              </label>
            </div>
          </div>
          <div className="edit__container__button">
            {type === 'edit' && (
              <button
                type="button"
                className="edit__container__button__del"
                onClick={() => openDeleteModal('product')}
              >
                刪除
              </button>
            )}
            <button
              type="button"
              className="edit__container__button__store"
              onClick={() => submit()}
            >
              儲存
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductModal;
