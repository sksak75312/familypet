function Pagination({ pagination, getProducts }) {
  return (
    <nav className="admin__content__nav">
      <ul className="admin__content__nav__list">
        {pagination.has_pre && (
          <li className="admin__content__nav__list__item">
            <button
              className="admin__content__nav__list__item__link"
              onClick={() => getProducts(pagination.current_page - 1)}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
          </li>
        )}
        {[...new Array(pagination.total_pages)].map((_, i) => {
          return (
            <li className="admin__content__nav__list__item" key={i}>
              <button
                className={`admin__content__nav__list__item__link ${
                  pagination.current_page === i + 1 &&
                  'admin__content__nav__list__item__link--active'
                }`}
                onClick={() => getProducts(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          );
        })}

        {pagination.has_next && (
          <li className="admin__content__nav__list__item">
            <button
              className="admin__content__nav__list__item__link"
              onClick={() => getProducts(pagination.current_page + 1)}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Pagination;
