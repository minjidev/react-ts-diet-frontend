const carouselConfig = {
  CAROUSEL_DATA_SIZE: 20,
  CAROUSEL_DATA_SIZE_PER_PAGE: 5,
  getEagerLoadCount() {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      return 5;
    }
    if (window.matchMedia('(min-width: 768px)').matches) {
      return 3;
    }
    return 2;
  },
};

export default carouselConfig;
