"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type ScaleLinkProps = HTMLMotionProps<"a">;

export default function ScaleLink(props: ScaleLinkProps) {
    return (
        <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            {...props}
        />
    );
}
