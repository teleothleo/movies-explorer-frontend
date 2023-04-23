
const LoadCardList = ({ onLoadMore }) => {

  return (
    <section className="load-card-list">
      <button onClick={onLoadMore} className="load-card-list__load-btn btn-border">Ещё</button>
    </section>
  );
}

export default LoadCardList;
