export interface Post {
  data: {
    title: string;
    description: string;
    author?: string;
    pubDate: Date;
    image?: string;
    tags?: string[];
  };
  slug: string;
  id: string;

  // render(): Render[".md"];
  // body: string;
  // collection: "blog";
  // data: InferEntrySchema<"blog">;
  // rendered?: RenderedContent;
  // filePath?: string;
}