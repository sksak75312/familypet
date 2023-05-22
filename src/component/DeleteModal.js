import axios from "axios";

function DeleteModal({
  deleteShow,
  closeModal,
  getProducts,
  closeDeleteModal,
  currentProduct,
  deleteType,
  id,
}) {

  const deleteHandle = async() => {
    try {
      let apiType = 'product'
      if (deleteType === 'coupon') {
        apiType = 'coupon'
      }
      await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/${apiType}/${id}`);
      closeDeleteModal();
      closeModal();
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {deleteShow && (
        <div className="delete">
          <div className="delete__container">
            <div className="delete__container__header">
              <h2 className="delete__container__header__title">刪除</h2>
              <button
                className="delete__container__header__button"
                onClick={() => closeDeleteModal()}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="delete__container__content">
              <h4 className="delete__container__content__text">
                {currentProduct.title}
              </h4>
            </div>
            <div className="delete__container__footer">
              <button
                className="delete__container__footer__button"
                onClick={deleteHandle}
              >
                確認
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteModal;
