import CardwithSideImage from "../components/cardWithSideImage";
import { motion } from "framer-motion";
const AuthCard = ({ content, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <CardwithSideImage content={content}>{children}</CardwithSideImage>
    </motion.div>
  );
};

export default AuthCard;
