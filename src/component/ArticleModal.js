import { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteModal from './DeleteModal';

function ArticleModal({
  editModal,
  closeModal,
  editContainerModal,
  getCoupons,
  type,
  currentCoupons,
}) {
  // 設定初始資料
  const [data, setData] = useState({
    title: '',
    is_enabled: 0,
    percent: 0,
    due_date: 1555459200,
    code: '',
  });

  // 控制開啟、關閉 deleteModal
  const [deleteShow, setDeleteShow] = useState(false);
  // 儲存時間
  const [date, setDate] = useState(new Date());

  // 設定開啟 DeleteModal 的類型
  const [deleteType, setDeleteType] = useState('');

  // 取得 input 值，價格使用 Number 寫入， 是否啟用使用 + 號將 boolean 轉換成 0 或 1
  // 其餘使用正常 String 寫入
  const dataHandle = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'percent') {
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

  // 新增資料，並重新渲染畫面、關閉 Modal、重置資料
  const submit = async () => {
    try {
      let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/article`;
      let method = 'post';
      if (type === 'edit') {
        api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/article/${currentCoupons.id}`;
        method = 'put';
      }
      await axios[method](api, {
        data: {
          ...data,
          due_date: date.getTime(),
        },
      });
      getCoupons();
      closeModal();
      setData({
        title: '',
        is_enabled: 0,
        percent: 0,
        due_date: 1555459200,
        code: '',
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 判斷是新增資料還是編輯資料、並把資料寫入
  useEffect(() => {
    if (type === 'edit') {
      setData(currentCoupons);
    } else if (type === 'create') {
      setData({
        title: '',
        is_enabled: 0,
        percent: 0,
        due_date: 1555459200,
        code: '',
      });
    }
  }, [type, currentCoupons]);

  return (
    <>
      <DeleteModal
        deleteShow={deleteShow}
        closeModal={closeModal}
        getProducts={getCoupons}
        closeDeleteModal={closeDeleteModal}
        id={currentCoupons.id}
        currentProduct={currentCoupons}
        deleteType={deleteType}
      />
      <div className="edit" ref={editModal}>
        <div className="edit__container" ref={editContainerModal}>
          <div className="edit__container__header">
            <h2 className="edit__container__header__title">
              {type === 'edit'
                ? `編輯 ${currentCoupons.title}`
                : '建立新文章'}
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
                優惠券名稱
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
            <div className="edit__container__list__percent">
              <label
                htmlFor="percent"
                className="edit__container__list__percent__label"
              >
                折扣(%)
              </label>
              <input
                type="number"
                id="percent"
                name="percent"
                className="edit__container__list__percent__input"
                value={data.percent}
                onChange={dataHandle}
              />
            </div>
            <div className="edit__container__list__code">
              <label
                htmlFor="code"
                className="edit__container__list__code__label"
              >
                折扣碼
              </label>
              <input
                type="text"
                id="code"
                name="code"
                className="edit__container__list__code__input"
                value={data.code}
                onChange={dataHandle}
              />
            </div>
            <div className="edit__container__list__due_date">
              <label
                htmlFor="due_date"
                className="edit__container__list__due_date__label"
              >
                到期日
              </label>
              <input
                type="date"
                id="due_date"
                name="due_date"
                className="edit__container__list__due_date__input"
                // 轉換時間格式
                value={date.toISOString().slice(0, 10).split('/').join('-')}
                onChange={(e) => {
                  setDate(new Date(e.target.value));
                }}
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
                onClick={() => openDeleteModal('coupon')}
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

export default ArticleModal;
