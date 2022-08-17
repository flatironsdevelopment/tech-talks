import React, { CSSProperties, UIEvent, useCallback, useState } from "react";
import { debounce } from "lodash";

type Props = {};

const styles: { [key: string]: CSSProperties } = {
  root: {
    display: "block",
    maxHeight: "100vh",
    overflowY: "scroll",
  },
};

const ComponentGood1: React.FC<Props> = (props: Props) => {
  const [scrollTop, setScrollTop] = useState(0);

  console.log("Rendering", { scrollTop });

  const handleScroll = useCallback(
    debounce((event: UIEvent<HTMLDivElement>) => {
      const target = event.target as HTMLDivElement;
      setScrollTop(target.scrollTop);
    }, 300),
    []
  );

  return (
    <div onScroll={handleScroll} style={styles.root}>
      {new Array(999).fill(null).map((_, i) => (
        <div key={`element-${i}`} style={{ flex: 1 }}>{`Element ${i}`}</div>
      ))}
    </div>
  );
};

export default ComponentGood1;
