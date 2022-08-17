import React, {
  CSSProperties,
  UIEvent,
  useCallback,
  useRef,
  useEffect,
  useState,
} from "react";
import { debounce, isEqual } from "lodash";

type Props = {};

const styles: { [key: string]: CSSProperties } = {
  root: {
    display: "block",
    maxHeight: "100vh",
    overflowY: "scroll",
  },
};

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = debounce(
      () => setScrollPosition(window.pageYOffset),
      100
    );
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition;
};

const ComponentGood2: React.FC<Props> = (props: Props) => {
  const scrollTop = useRef<number>(0);

  const test = useScrollPosition();
  console.log("Rendering", { scrollTop, test });

  const handleScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    scrollTop.current = target.scrollTop;
  }, []);

  return (
    <div>
      {new Array(999).fill(null).map((_, i) => (
        <div key={`element-${i}`} style={{ flex: 1 }}>{`Element ${i}`}</div>
      ))}
    </div>
  );
};

export default ComponentGood2;
