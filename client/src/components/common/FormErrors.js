import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const FormErrors = ({ errors = [] }) => {
  if (!errors.length) return null;

  return (
    <div className="form-errors-container" role="alert">
      <motion.ul variants={container}>
        {errors.map((msg, index) => (
          <motion.li key={index} variants={item}>
            <span>{msg}</span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default FormErrors;
