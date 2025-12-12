"use client";

import { useTina, tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

type Props = {
    query: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    variables: Record<string, any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    classNameHeading?: string;
    classNameBody?: string;
    fallbackHeading: string;
    fallbackBody: string;
};

export default function HomeEditable(props: Props) {
    const { data } = useTina({ query: props.query, variables: props.variables, data: props.data });
    const page = data?.page;
    const heading = page?.title ?? props.fallbackHeading;
    const body = page?.body ?? null;

    return (
        <>
            <h1 className={props.classNameHeading} data-tina-field={page ? tinaField(page, "title") : undefined}>
                {heading}
            </h1>
            <div className={props.classNameBody} data-tina-field={page ? tinaField(page, "body") : undefined}>
                {body ? <TinaMarkdown content={body} /> : <p>{props.fallbackBody}</p>}
            </div>
        </>
    );
}
