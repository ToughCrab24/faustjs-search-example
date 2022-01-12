import React from "react";
import styles from "scss/components/CTA.module.scss";

interface Props {
  children?: React.ReactNode;
}

function Body({ children }: Props): JSX.Element {
  return (
    <div className={styles.wrap}>
      <div className={styles.children}>{children}</div>
    </div>
  );
}

export default Body;
