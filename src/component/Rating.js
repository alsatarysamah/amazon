export default function Rating(props) {
  const { rating, num } = props;
  return (
    <div className="rating">
      <span>
        <i
          className={
            rating >= 1
              ? "fas fa-star"
              : rating >= 0.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 2
              ? "fas fa-star"
              : rating >= 1.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>{" "}
      <span>
        <i
          className={
            rating >= 3
              ? "fas fa-star"
              : rating >= 2.5
              ? "fas fa-half-star-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
      <span>{' ' + num + ' reviews'}</span>

      </span>
    </div>
  );
}
