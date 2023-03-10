import React, { useEffect, useState } from "react";

const data = [
  {
    id: "item-1",
    imageSrc: "https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg",
    altText: "Man sitting on a rock watching sunset",
    title: "Nothing is impossible",
    subTitle: "Subtitle",
  },
  {
    id: "item-2",
    imageSrc: "https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg",
    altText: "Stars",
    title: "So many books, so little time",
    subTitle: "Subtitle",
  },
  {
    id: "item-3",
    imageSrc: "https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg",
    altText: "Ocean",
    title: "You only live once, but if you do it right, once is enough.",
    subTitle: "Subtitle",
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoRotation, setAutoRotaion] = useState(true);

  const handlePrevBtnClick = () => {
    setCurrentIndex((currentIndex - 1 + data.length) % data.length);
  };

  const handleNextBtnClick = () => {
    setCurrentIndex((currentIndex + 1) % data.length);
  };

  const autoRotateCarousel = () => {
    currentIndex + 1 > data.length - 1
      ? setCurrentIndex(0)
      : setCurrentIndex(currentIndex + 1);
  };

  const focusOnElement = (selector: string) => {
    document.getElementById(selector)?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case "ArrowRight":
        handleNextBtnClick();
        focusOnElement(`tab-${(currentIndex + 1) % data.length}`);
        break;
      case "ArrowLeft":
        handlePrevBtnClick();
        focusOnElement(`tab-${(currentIndex - 1 + data.length) % data.length}`);
        break;
      case "Home":
        setCurrentIndex(0);
        break;
      case "End":
        setCurrentIndex(data.length - 1);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    let interval: number;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (autoRotation && !query.matches) {
      interval = setInterval(() => {
        autoRotateCarousel();
      }, 5000);
    }

    return () => clearInterval(interval);
  });

  return (
    <section className="w-full h-full">
      <div
        className="relative h-full flex flex-nowrap overflow-hidden"
        role="region"
        aria-roledescription="carousel"
        aria-label="photos"
      >
        <button
          className="absolute -top-24 left-2 z-10 bg-white p-2 focus:translate-y-28"
          onClick={() => setAutoRotaion(!autoRotation)}
        >
          {autoRotation ? "Stop slide rotation" : "Start slide rotation"}
        </button>
        <div>
          <button
            id="data-carousel-prev"
            type="button"
            className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            aria-label="Previous"
            aria-controls="carousel-items"
            onClick={handlePrevBtnClick}
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-white group-focus:outline-none">
              <svg
                className="w-5 h-5 text-white sm:w-6 sm:h-6 "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
              <span className="hidden">Previous</span>
            </span>
          </button>
          <button
            id="data-carousel-next"
            type="button"
            className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            onClick={handleNextBtnClick}
            aria-label="Next"
            aria-controls="carousel-items"
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-white group-focus:outline-none">
              <svg
                className="w-5 h-5 text-white sm:w-6 sm:h-6 "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
              <span className="hidden">Next</span>
            </span>
          </button>
        </div>
        <div
          className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2"
          role="tablist"
          onFocus={() => setAutoRotaion(false)}
          onBlur={() => setAutoRotaion(true)}
        >
          {data.map((item, index) => {
            const active = currentIndex === index;
            return (
              <button
                id={`tab-${index}`}
                key={item.id}
                type="button"
                role="tab"
                aria-selected={`${active}`}
                aria-label={item.title}
                aria-controls={`slide-${index}`}
                className={`w-3 h-3 rounded-full ${
                  active ? "bg-gray-100" : "bg-gray-400"
                }`}
                tabIndex={active ? undefined : -1}
                onClick={() => setCurrentIndex(index)}
                onKeyDown={handleKeyDown}
              ></button>
            );
          })}
        </div>
        <div
          className="flex relative w-full overflow-hidden"
          id="carousel-items"
        >
          {data.map((item, index) => (
            <div
              id={`slide-${index}`}
              key={item.id}
              className="h-full relative float-left w-full min-w-full"
              style={{ transform: `translate(-${currentIndex * 100}%)` }}
              role="group"
              aria-roledescription="slide"
              aria-labelledby={`slide-label-${index}`}
            >
              <img
                src={item.imageSrc}
                className="block w-full h-full object-cover"
                alt={item.altText}
              />
              <div className="hidden p-5 md:block absolute bottom-12 left-0 right-0 text-center bg-[rgba(0,0,0,0.6)]">
                <h5
                  id={`slide-label-${index}`}
                  className="text-xl text-white font-bold"
                >
                  {item.title}
                </h5>
                {/* <p className="text-gray-300">{item.subTitle}</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
