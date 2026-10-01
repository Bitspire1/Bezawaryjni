import type { ComponentProps } from "react";

type ScaleLinkProps = ComponentProps<"a">;

export default function ScaleLink({ className = "", ...props }: ScaleLinkProps) {
    return <a className={`fx-pop ${className}`} {...props} />;
}
