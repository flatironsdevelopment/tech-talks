import React, { useState } from "react";

type Props = {};

const ComponentBad: React.FC<Props> = (props: Props) => {
  const [scrollTop, setScrollTop] = useState(0);

  console.log("Rendering", { scrollTop });

  return (
    <div
      onScroll={(event) => {
        const target = event.target as HTMLDivElement;
        setScrollTop(target.scrollTop);
      }}
      style={{
        display: "block",
        maxHeight: "100vh",
        overflowY: "scroll",
      }}
    >
      {new Array(999).fill(null).map((_, i) => (
        <div key={`element-${i}`} style={{ flex: 1 }}>{`Element ${i}`}</div>
      ))}
    </div>
  );
};

export default ComponentBad;
