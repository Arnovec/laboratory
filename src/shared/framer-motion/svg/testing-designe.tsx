import style from "./style.module.scss";
import { motion } from "framer-motion";

export function TestingDesigne() {
  const icon = {
    hidden: {
      opacity: 0,
      pathLength: 0,
      fill: "rgba(255, 255, 255, 0)",
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
        {/* пустой сектор */}
        {/* <motion.path
          d="
          M 50 50 
          h -40 
          A 40 40, 0, 1 0, 50 10 
          z
          // L 50 100
          "
          fill="yellow"
          stroke="blue"
          stroke-width="5"
        /> */}
        <motion.path
          d="
          M 0 0 
          Q 16 -20, 33 0
          T 66 0 
          T 100 0

          M 0 33 
          Q 16 13, 33 33
          T 66 33 
          T 100 33

          M 0 66 
          Q 16 46, 33 66
          T 66 66 
          T 100 66


          M 0 100 
          Q 16 80, 33 100
          T 66 100 
          T 100 100

          //Цветочек
          // M 0 0 
          // Q 120 -20, 50 50
          // T100 100
          // M 0 100 
          // Q -20 -20, 50 50
          // T 100 0
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
