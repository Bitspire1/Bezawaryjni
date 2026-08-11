"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type ScaleButtonProps = HTMLMotionProps<"button">;

export default function ScaleButton(props: ScaleButtonProps) {
    return (
        <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            {...props}
        />
    );
}
