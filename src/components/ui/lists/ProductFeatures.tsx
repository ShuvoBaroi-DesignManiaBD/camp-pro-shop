const ProductFeatures = () => {
  return (
    <div className="ct-product-additional-info">
      <span className="text-base font-semibold">Extra Features</span>
      <ul className="[&>li]:flex [&>li]:gap-2 [&>li]:items-center text-base space-y-1.5 mt-3 [&>li>span>svg]:fill-secondary">
        <li>
          <span className="ct-icon-container">
            <svg width="15" height="15" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm6.2 9.5-7.6 7.6c-.4.4-1.1.4-1.5 0l-3.3-3.3c-.4-.4-.4-1.1 0-1.5.4-.4 1.1-.4 1.5 0l2.5 2.5L16.7 8c.4-.4 1.1-.4 1.5 0 .4.4.4 1.1 0 1.5z"></path>
            </svg>
          </span>
          <span className="ct-label">Premium Quality</span>
        </li>
        <li>
          <span className="ct-icon-container">
            <svg width="15" height="15" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm6.2 9.5-7.6 7.6c-.4.4-1.1.4-1.5 0l-3.3-3.3c-.4-.4-.4-1.1 0-1.5.4-.4 1.1-.4 1.5 0l2.5 2.5L16.7 8c.4-.4 1.1-.4 1.5 0 .4.4.4 1.1 0 1.5z"></path>
            </svg>
          </span>
          <span className="ct-label">Secure Payments</span>
        </li>
        <li>
          <span className="ct-icon-container">
            <svg width="15" height="15" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm6.2 9.5-7.6 7.6c-.4.4-1.1.4-1.5 0l-3.3-3.3c-.4-.4-.4-1.1 0-1.5.4-.4 1.1-.4 1.5 0l2.5 2.5L16.7 8c.4-.4 1.1-.4 1.5 0 .4.4.4 1.1 0 1.5z"></path>
            </svg>
          </span>
          <span className="ct-label">Satisfaction Guarantee</span>
        </li>
        <li>
          <span className="ct-icon-container">
            <svg width="15" height="15" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm6.2 9.5-7.6 7.6c-.4.4-1.1.4-1.5 0l-3.3-3.3c-.4-.4-.4-1.1 0-1.5.4-.4 1.1-.4 1.5 0l2.5 2.5L16.7 8c.4-.4 1.1-.4 1.5 0 .4.4.4 1.1 0 1.5z"></path>
            </svg>
          </span>
          <span className="ct-label">Worldwide Shipping</span>
        </li>
        <li>
          <span className="ct-icon-container">
            <svg width="15" height="15" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm6.2 9.5-7.6 7.6c-.4.4-1.1.4-1.5 0l-3.3-3.3c-.4-.4-.4-1.1 0-1.5.4-.4 1.1-.4 1.5 0l2.5 2.5L16.7 8c.4-.4 1.1-.4 1.5 0 .4.4.4 1.1 0 1.5z"></path>
            </svg>
          </span>
          <span className="ct-label">Money Back Guarantee</span>
        </li>
      </ul>
    </div>
  );
};

export default ProductFeatures;
