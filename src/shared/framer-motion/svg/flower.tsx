import style from "./style.module.scss";
import { motion } from "framer-motion";

export function Flower() {
  const icon = {
    hidden: {
      opacity: 0,
      pathLength: 0,
      fill: "rgba(255, 255, 255, 1)",
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      fill: "rgba(255, 255, 255, 1)",
    },
  };

  return (
    <div className={style["container"]}>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100  100"
        className={style["item"]}
      >
        <motion.path
          //Цветочек
          d="
          M 0 0 
          Q 120 -20, 50 50
          T100 100
          M 0 100 
          Q -20 -20, 50 50
          T 100 0
          "
          variants={icon}
          initial="hidden"
          animate="visible"
          transition={{
            default: { duration: 2, ease: "easeInOut" },
            fill: { duration: 2, ease: [1, 0, 0.8, 1] },
          }}
        />
      </motion.svg>
    </div>
  );
}
