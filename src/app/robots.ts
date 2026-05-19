import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin/", "/preview/", "/api/"],
        },
        sitemap: "https://bezawaryjni.pl/sitemap.xml",
    };
}
