export interface Post {
  data: {
    title: string;
    description: string;
    author?: string;
    pubDate: Date;
    image?: string;
    tags?: string[];
  };
  id: string;
  gallery?: { image: string; caption?: string }[];

  // render(): Render[".md"];
  // body: string;
  // collection: "blog";
  // data: InferEntrySchema<"blog">;
  // rendered?: RenderedContent;
  // filePath?: string;
}

export interface BlogPost {
  id: string;
  title: string;
}

export interface AnnouncementPost {
  id: string;
  className: string;
  date: string;
  cancelled: boolean;
  message?: string;
}