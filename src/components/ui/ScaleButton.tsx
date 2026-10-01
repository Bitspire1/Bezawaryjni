import type { ComponentProps } from "react";

type ScaleButtonProps = ComponentProps<"button">;

export default function ScaleButton({ className = "", ...props }: ScaleButtonProps) {
    return <button className={`fx-pop ${className}`} {...props} />;
}
