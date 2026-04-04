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
            description:
              "The headline for this article. Appears at the top of the page and in search results.",
          },
          {
            type: "datetime",
            label: "Publish Date",
            name: "pubDate",
            required: true,
            description:
              "The date this article was published. Used for sorting and display.",
          },
          {
            type: "string",
            label: "Description",
            name: "description",
            ui: {
              component: "textarea",
            },
            description:
              "A brief summary of the article. Shown in article previews and search engine results.",
          },
          {
            type: "string",
            label: "Author",
            name: "author",
            description:
              "The name of the person who wrote this article.",
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
            description:
              "Keywords to categorize this article (e.g., 'tournament', 'events'). Helps with filtering and search.",
          },
          {
            type: "rich-text",
            label: "Body",
            name: "body",
            isBody: true,
            description:
              "The full content of the article. Use the toolbar to format text, add headings, links, and images.",
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
                description:
                  "A heading for this article's gallery section.",
              },
              {
                type: "string",
                label: "Description",
                name: "description",
                ui: {
                  component: "textarea",
                },
                description:
                  "A short description displayed above the gallery.",
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
                    description:
                      "Select whether this item is a photo or video.",
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
                    description:
                      "A short title for this media item.",
                  },
                  {
                    type: "string",
                    label: "Caption",
                    name: "caption",
                    description:
                      "A brief description shown below the image or video.",
                  },
                  {
                    type: "string",
                    label: "Credit",
                    name: "credit",
                    description:
                      "Attribution for the photographer or videographer.",
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
            description:
              "Select whether this gallery item is a photo or video.",
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
            description:
              "A short title for this gallery item.",
          },
          {
            type: "string",
            label: "Caption",
            name: "caption",
            description:
              "A brief description shown below the image or video.",
          },
          {
            type: "string",
            label: "Credit",
            name: "credit",
            description:
              "Attribution for the photographer or videographer.",
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
            description:
              "The question as it will appear on the FAQ page.",
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
            description:
              "The answer to the question. Use the toolbar to format text, add links, etc.",
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
            description:
              "The Japanese, Okinawan, or martial arts term (e.g., 'Kata', 'Sensei').",
          },
          {
            type: "string",
            label: "Pronunciation",
            name: "pronunciation",
            description:
              "How to pronounce the term (e.g., 'kah-tah'). Displayed next to the term on the dictionary page.",
          },
          {
            type: "rich-text",
            label: "Definition",
            name: "definition",
            isBody: true,
            description:
              "The meaning and context of the term.",
          },
        ],

      },
      {
        label: "Class Announcements",
        name: "announcements",
        path: "src/content/announcements",
        format: "md",
        defaultItem: () => ({
          date: new Date().toISOString(),
          cancelled: false,
        }),
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
            isTitle: true,
            required: true,
            description:
              "A short label for this announcement (e.g., 'Youth Karate - Apr 6'). This is used for organizational purposes in the CMS and does not appear on the public site.",
          },
          {
            type: "string",
            label: "Class",
            name: "className",
            required: true,
            options: ["Youth Karate", "Adult Karate"],
            description: "Which class this announcement is for",
          },
          {
            type: "datetime",
            label: "Date",
            name: "date",
            required: true,
            description:
              "The class date this announcement applies to",
          },
          {
            type: "boolean",
            label: "Class Cancelled",
            name: "cancelled",
            description:
              "Check this box if the class is cancelled on this date. This will update the 'Next Class' display to skip this date.",
          },
          {
            type: "string",
            label: "Message",
            name: "message",
            ui: {
              component: "textarea",
              validate: (value: string | undefined) => {
                if (value && value.length > 100) {
                  return `Message must be 100 characters or fewer (currently ${value.length})`;
                }
              },
            },
            description:
              "Announcement details, 100 characters max (e.g., 'Holiday — no class', 'Class moved to 7 PM')",
          },
        ],
      }
    ],
  },
});
