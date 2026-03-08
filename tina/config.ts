import { LocalAuthProvider, defineConfig } from "tinacms";
import {
  TinaUserCollection,
  UsernamePasswordAuthJSProvider,
} from "tinacms-authjs/dist/tinacms";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";
// the contentApiUrlOverride needs an absolute URL (with origin) otherwise TinaCMS constructs the media URL as undefined/media
const siteUrl = process.env.TINA_PUBLIC_SITE_URL ?? "";
// For local development, we can use TinaCMS's built-in media store which saves files to the local filesystem. For production, we want to use Cloudinary for media storage, so we load the Cloudinary media store dynamically to avoid including it in the local development bundle.
const getMediaStore = () => {
  if (isLocal) {
    return {
      tina: {
        mediaRoot: "images",
        publicFolder: "public",
      },
    }
  }
  return {
    loadCustomStore: async () => {
      const pack = await import('next-tinacms-cloudinary')
      return pack.TinaCloudCloudinaryMediaStore
    },
  }
}

export default defineConfig({
  // For local development, we can use the default content API URL which points to the local filesystem. For production, we need to override the content API URL to point to our deployed serverless function that handles GraphQL requests.
  ...(isLocal ? {} : { contentApiUrlOverride: `${siteUrl}/api/tina/gql`, }),
  authProvider: isLocal
    ? new LocalAuthProvider()
    : new UsernamePasswordAuthJSProvider(),
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: getMediaStore(),
  schema: {
    collections: [
      TinaUserCollection,
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
    ],
  },
});
