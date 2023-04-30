
const LoaderBtn = ({ onLoadMore }) => {

  return (
    <section className="loader-btn">
      <button onClick={onLoadMore} className="loader-btn__load-btn btn-border">Ещё</button>
    </section>
  );
}

export default LoaderBtn;
