export interface BlogPost {
    sys: {
        id: string;
    };
    fields: {
        title: string;
        slug: string;
        heroImage?: {
            fields: {
                file: {
                    url: string;
                };
            };
        };
        body: any;
        tags?: string[] | string;
        publishedDate?: string;
    };
}
