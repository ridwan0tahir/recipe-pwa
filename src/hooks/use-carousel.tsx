import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

type EmblaCarouselParameters = Parameters<typeof useEmblaCarousel>;

type UseCarouselOptions = {
  options?: EmblaCarouselParameters[0];
  plugins?: EmblaCarouselParameters[1];
};

export const useCarousel = ({
  options,
  plugins = [],
}: UseCarouselOptions = {}) => {
  const [carouselRef, carouselApi] = useEmblaCarousel(options, plugins);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);

  const onInit = useCallback(() => {
    setScrollSnaps(carouselApi?.scrollSnapList());
  }, [carouselApi]);

  const onSelect = useCallback(() => {
    if (!carouselApi) {
      return;
    }

    setSelectedIndex(carouselApi?.selectedScrollSnap());
    setCanScrollPrev(!carouselApi?.canScrollPrev());
    setCanScrollNext(!carouselApi?.canScrollNext());
  }, [carouselApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (!carouselApi || !index) {
        return;
      }

      carouselApi?.scrollTo(index);
    },
    [carouselApi]
  );

  const scrollPrev = useCallback(() => {
    carouselApi?.scrollPrev();
  }, [carouselApi]);

  const scrollNext = useCallback(() => {
    carouselApi?.scrollNext();
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    onInit();
    onSelect();
    carouselApi
      .on("reInit", onInit)
      .on("reInit", onSelect)
      .on("select", onSelect);

    return () => {
      carouselApi?.off("reInit", onInit).off("select", onSelect);
    };
  }, [carouselApi, onInit, onSelect]);

  return {
    carouselRef,
    carouselApi,
    canScrollNext,
    canScrollPrev,
    scrollTo,
    scrollNext,
    scrollPrev,
    selectedIndex,
    scrollSnaps,
  };
};
