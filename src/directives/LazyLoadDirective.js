export default {
  inserted: (el, binding, { context }) => {
    const loadImage = () => {
      const imageElement = el.querySelector('img');
      if (imageElement) {
        imageElement.addEventListener('load', () => {
          setTimeout(() => {
            context.loading = false;
          }, 100);
        });
        imageElement.addEventListener('error', () => {
          context.loading = false;
          context.error = true;
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
        threshold: '0.5',
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
