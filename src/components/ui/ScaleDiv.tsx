import type { ComponentProps } from "react";

type ScaleDivProps = ComponentProps<"div">;

export default function ScaleDiv({ className = "", ...props }: ScaleDivProps) {
    return <div className={`fx-lift ${className}`} {...props} />;
}
