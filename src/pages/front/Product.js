import { useState, useEffect } from 'react';
import axios from 'axios';

function Product() {
  // 儲存 API response products 資料
  const [products, setProducts] = useState([]);
  // 儲存 API response pagination 資料
  const [pagination, setPagination] = useState({});
  // 儲存 API response category 資料
  const [category, setCategory] = useState([]);

  // 取得 products 資料，並將資料寫入 useState();
  const getProducts = async (page = 1) => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`
    );
    setProducts(res.data.products);
    setPagination(res.data.pagination);
    //使用 new Set 來篩選 category 是否重複，並解構回傳一個陣列
    setCategory([...new Set(res.data.products.map((product) => {
      return product.category
    }))])
    console.log(res);
  };

  useEffect(() => {
    getProducts();
  }, []);

  console.log(category)

  return (
    <>
      <main className="front-main">
        <section className="section-product">
          <div className="section-product__header">
            <h2 className="section-product__header__title">愛心好物</h2>
            <img
              src="https://images.unsplash.com/photo-1510563800743-aed236490d08?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              className="section-product__header__img"
              alt="背景圖"
            />
          </div>
          <div className="section-product__wrapper">
            <ul className="section-product__wrapper__list">
              <li className="section-product__wrapper__list__item">
                <button
                  href=""
                  className="section-product__wrapper__list__item__link"
                >
                  全部
                </button>
              </li>
              {category.map((item,index) => {
                return (
                  <li className="section-product__wrapper__list__item" key={index}>
                    <button
                      type='type'
                      className="section-product__wrapper__list__item__link"
                    >
                      {item}
                      
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="section-product__wrapper__product">
              {products.map((product) => {
                return (
                  <a className="section-product__wrapper__product__card" key={product.id}>
                    <img
                      src={product.imageUrl}
                      alt=""
                      className="section-product__wrapper__product__card__img"
                    />
                    <div className="section-product__wrapper__product__card__content">
                      <h3 className="section-product__wrapper__product__card__content__title">
                        {product.title}
                      </h3>
                      <p className="section-product__wrapper__product__card__content__price">
                        NT$
                        <span className="section-product__wrapper__product__card__content__price__number">
                          {product.origin_price}
                        </span>
                      </p>
                      <button className="section-product__wrapper__product__card__content__button">加入購物車</button>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Product;
