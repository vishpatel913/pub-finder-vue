export default {
  inserted: (el) => {
    const loadImage = () => {
      const imageElement = Array.from(el.children).find((item) => item.nodeName === 'IMG');
      if (imageElement) {
        imageElement.addEventListener('load', () => {
          setTimeout(() => {
            el.classList.add('loaded');
          }, 100);
        });
        imageElement.addEventListener('error', () => {
          el.classList.add('failed');
        });
        imageElement.src = imageElement.dataset.url;
      }
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadImage();
          observer.unobserve(el);
        }
      });
    };

    const createObserver = () => {
      const options = {
        root: null,
        threshold: '0',
      };
      const observer = new IntersectionObserver(handleIntersect, options);
      observer.observe(el);
    };

    if (window.IntersectionObserver) {
      createObserver();
    } else {
      loadImage();
    }
  },
};
