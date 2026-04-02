import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN,
      stopwordLanguages: ['eng'],
    },
  },
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        label: "News & Updates",
        name: "blog",
        path: "src/content/blog",
        format: "md",
        defaultItem: () => ({
          pubDate: new Date().toISOString(),
        }),
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            label: "Publish Date",
            name: "pubDate",
            required: true,
          },
          {
            type: "string",
            label: "Description",
            name: "description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            label: "Author",
            name: "author",
          },
          {
            type: "image",
            label: "Featured Image",
            name: "image",
            description:
              "This is a large image that appears at the beginning of your article. Recommended dimensions: 1200x630px",
          },
          {
            type: "string",
            label: "Tags",
            name: "tags",
            list: true,
          },
          {
            type: "rich-text",
            label: "Body",
            name: "body",
            isBody: true,
            templates: [
              {
                name: "BlockQuote",
                label: "Block Quote",
                ui: {
                  defaultItem: {
                    children: [{ type: "p", children: [{ text: "" }] }],
                  },
                },
                fields: [
                  {
                    name: "children",
                    label: "Quote Content",
                    ui: {
                      component: "rich-text",
                    },
                    type: "rich-text",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            label: "Photo/Video Gallery",
            name: "imageGallery",
            fields: [
              {
                type: "string",
                label: "Title",
                name: "title",
              },
              {
                type: "string",
                label: "Description",
                name: "description",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "object",
                label: "Media Items",
                name: "gallery",
                list: true,
                fields: [
                  {
                    type: "string",
                    label: "Media type",
                    name: "mediaType",
                    options: ["photo", "video"],
                    required: true,
                  },
                  {
                    type: "image",
                    label: "Image",
                    name: "image",
                    description:
                      "Upload the image file for the gallery. Recommended dimensions: 1200x630px",
                  },
                  {
                    type: "string",
                    label: "Vimeo video URL",
                    name: "vimeoUrl",
                    description:
                      "Paste the Vimeo video URL (e.g., 'https://vimeo.com/1110587814')",
                  },
                  {
                    type: "string",
                    label: "Title",
                    name: "title",
                  },
                  {
                    type: "string",
                    label: "Caption",
                    name: "caption",
                  },
                  {
                    type: "string",
                    label: "Credit",
                    name: "credit",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        label: "Photo/Video Gallery",
        name: "gallery",
        path: "src/content/gallery",
        format: "md",
        defaultItem: () => ({
          pubDate: new Date().toISOString(),
        }),
        fields: [
          {
            type: "string",
            label: "Media type",
            name: "mediaType",
            options: ["photo", "video"],
            required: true,
          },
          {
            type: "image",
            label: "Image",
            name: "image",
            description:
              "Upload the image file for the gallery. Recommended dimensions: 1200x630px",
          },
          {
            type: "string",
            label: "Vimeo video URL",
            name: "vimeoUrl",
            description:
              "Paste the Vimeo video URL (e.g., 'https://vimeo.com/1110587814')",
          },
          {
            type: "datetime",
            label: "Publish Date",
            name: "pubDate",
            required: true,
            description:
              "This is the date that will be used to sort your images in the gallery. It does not have to be the date the photo was taken.",
          },
          {
            type: "string",
            label: "Title",
            name: "title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            label: "Caption",
            name: "caption",
          },
          {
            type: "string",
            label: "Credit",
            name: "credit",
          },
        ],
      },
      {
        label: "Frequently Asked Questions",
        name: "faqs",
        path: "src/content/faqs",
        format: "md",
        fields: [
          {
            type: "string",
            label: "Question",
            name: "question",
            isTitle: true,
            required: true,
          },
          {
            type: "number",
            label: "Sort Priority",
            name: "sortPriority",
            description:
              "Determines the order of the FAQs. Lower numbers (like 0 or 1) appear first.",
          },
          {
            type: "rich-text",
            label: "Body",
            name: "body",
            isBody: true,
          },
        ],
      },
      {
        label: "Dictionary",
        name: "dictionary",
        path: "src/content/dictionary",
        format: "md",
        fields: [
          {
            type: "string",
            label: "Term",
            name: "term",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            label: "Pronunciation",
            name: "pronunciation",
          },
          {
            type: "rich-text",
            label: "Definition",
            name: "definition",
            isBody: true,
          },
        ],

      }
    ],
  },
});
