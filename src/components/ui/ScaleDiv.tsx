"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type ScaleDivProps = HTMLMotionProps<"div">;

export default function ScaleDiv(props: ScaleDivProps) {
    return (
        <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            {...props}
        />
    );
}
