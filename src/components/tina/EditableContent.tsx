"use client";

import { useTina, tinaField } from "tinacms/dist/react";
import type { ReactNode } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FieldFn = (page: any, section: string, field: string) => string | undefined;

type Props = {
    query: string;
    variables: Record<string, unknown>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    children: ReactNode;
};

export default function EditableContent(props: Props) {
    // useTina will re-render when content changes in the CMS
    useTina({ query: props.query, variables: props.variables, data: props.data });

    // Just return the children - the data is already being used via useTina
    // The parent component already has access to the data
    return <>{props.children}</>;
}

// Helper function to create tinaField marker
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export function createFieldHelper(page: any): FieldFn {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (pg: any, section: string, field: string) => {
        if (!pg || !pg[section]) return undefined;
        return tinaField(pg[section], field);
    };
}
