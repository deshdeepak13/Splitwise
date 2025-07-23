import React from "react";
import { motion } from "framer-motion";

const NoContentMessage = ({ icon: Icon, title, message }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center mt-20 text-gray-500"
    >
      {Icon && <Icon className="mx-auto text-3xl mb-3" />}
      <p className="font-medium">{title}</p>
      <p className="text-sm">{message}</p>
    </motion.div>
  );
};

export default NoContentMessage;