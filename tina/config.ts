import { defineConfig } from "tinacms";
import { ClassesSelect } from './components/ClassesSelect';

export default defineConfig({
  branch: process.env.HEAD || process.env.BRANCH || "main",
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
  cmsCallback: (cms) => {
    cms.fields.add({
      name: "classes-select",
      Component: ClassesSelect,
    });
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
            label: "Sort Order",
            name: "sortOrder",
            description:
              "Controls the display order. Lower numbers appear first.",
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
        ui: {
          allowedActions: {
            createNestedFolder: false,
          }
        }
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
        ui: {
          allowedActions: {
            createNestedFolder: false,
          }
        }
      },
      {
        label: "Classes",
        name: "classes",
        path: "src/content/classes",
        format: "md",
        ui: {
          allowedActions: {
            createNestedFolder: false,
          },
        },
        fields: [
          {
            type: "string",
            label: "Class Name",
            name: "name",
            isTitle: true,
            required: true,
            description: "The display name for this class (e.g., 'Youth Karate').",
          },
          {
            type: "string",
            label: "Ages",
            name: "ages",
            required: true,
            description: "Age range for this class (e.g., '4 – 15' or '16 & Up').",
          },
          {
            type: "string",
            label: "Description",
            name: "description",
            required: true,
            ui: {
              component: "textarea",
              validate: (value: string | undefined) => {
                if (value && value.length > 200) {
                  return `Description must be 200 characters or fewer (currently ${value.length})`;
                }
              }
            },
            description: "A short description of the class shown on the Classes page.",
          },
          {
            type: "string",
            label: "Start Time",
            name: "startTime",
            required: true,
            description: "Class start time in 24-hour HH:MM format (e.g. 18:00 for 6:00 PM).",
            ui: {
              validate: (value: string | undefined) => {
                if (value && !/^\d{2}:\d{2}$/.test(value)) {
                  return 'Time must be in 24-hour HH:MM format (e.g. 18:00)';
                }
              },
            },
          },
          {
            type: "string",
            label: "End Time",
            name: "endTime",
            required: true,
            description: "Class end time in 24-hour HH:MM format (e.g. 20:00 for 8:00 PM).",
            ui: {
              validate: (value: string | undefined) => {
                if (value && !/^\d{2}:\d{2}$/.test(value)) {
                  return 'Time must be in 24-hour HH:MM format (e.g. 20:00)';
                }
              },
            },
          },
          {
            type: "string",
            label: "Location",
            name: "location",
            required: true,
            description: "Full address of the class location. Used in calendar invites.",
          },
          {
            type: "string",
            label: "Recurrence",
            name: "recurrence",
            required: true,
            options: ["Weekly", "Biweekly", "Monthly"],
            description: "How often this class repeats.",
          },
          {
            type: "string",
            label: "Recurring Days",
            name: "recurrence_byDay",
            required: true,
            list: true,
            options: [
              { value: "Sunday", label: "Sunday" },
              { value: "Monday", label: "Monday" },
              { value: "Tuesday", label: "Tuesday" },
              { value: "Wednesday", label: "Wednesday" },
              { value: "Thursday", label: "Thursday" },
              { value: "Friday", label: "Friday" },
              { value: "Saturday", label: "Saturday" },
            ],
            description: "The days of the week this class meets.",
          },
          {
            type: "number",
            label: "Tuition (once a week)",
            name: "tuitionOnce",
            required: true,
            description: "Monthly tuition in dollars for attending one day per week.",
          },
          {
            type: "number",
            label: "Tuition (twice a week)",
            name: "tuitionTwice",
            description: "Monthly tuition in dollars for attending two days per week.",
          },
          {
            type: "string",
            label: "Tuition Billing Recurrence",
            name: "tuition_billing_recurrence",
            required: true,
            options: ["Monthly", "Weekly", "Yearly"],
            description: "How often tuition is billed.",
          },
          {
            type: "number",
            label: "Sort Order",
            name: "sortOrder",
            description: "Controls the order classes appear on the page. Lower numbers appear first.",
          },
          {
            type: "string",
            label: "Kanji Character",
            name: "kanji",
            description: "A decorative kanji character displayed on the class card (e.g., 子 for Youth, 武 for Adult).",
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
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => {
              return `${values?.className || 'class'}-${values?.date
                ?.toLowerCase()
                .replace(/ /g, '-')}`
            },
          },
          allowedActions: {
            createNestedFolder: false,
          },
        },
        fields: [
          {
            type: "string",
            label: "Class",
            name: "className",
            required: true,
            description: "Select the class this announcement applies to.",
            ui: {
              component: "classes-select",
              validate: (value: string | undefined) => {
                if (!value) {
                  return 'Please select a class for this announcement';
                }
              }
            },
          },
          {
            type: "datetime",
            label: "Date",
            name: "date",
            required: true,
            description:
              "Select the class date this announcement applies to.",
          },
          {
            type: "boolean",
            label: "Class Cancelled",
            name: "cancelled",
            description:
              "Check this box if the class is cancelled on this date. This will update the 'Next Class' calendar display to skip this date.",
          },
          {
            type: "string",
            label: "Message",
            name: "message",
            ui: {
              component: "textarea",
              validate: (value: string | undefined, allValues: Record<string, unknown>) => {
                if (!allValues.cancelled && !value) {
                  return 'Please provide a message for this announcement.';
                }
                if (value && value.length > 100) {
                  return `Message must be 100 characters or fewer (currently ${value.length})`;
                }
              },
            },
            description:
              'Write the announcement message (e.g., "Class moved to 7 PM" or "Blackbelt ceremony — no regular class")',
          },
        ],
      },
      {
        label: "Instructors",
        name: "instructors",
        path: "src/content/instructors",
        format: "md",
        defaultItem: () => ({
          photoOrientation: "Portrait",
          featured: false,
        }),
        ui: {
          allowedActions: {
            createNestedFolder: false,
          },
        },
        fields: [
          {
            type: "string",
            label: "Name",
            name: "name",
            isTitle: true,
            required: true,
            description: "The instructor's full name.",
          },
          {
            type: "string",
            label: "Title",
            name: "title",
            description: "Honorific title (e.g., Kyoshi, Renshi).",
          },
          {
            type: "string",
            label: "Rank",
            name: "rank",
            description: "Belt rank (e.g., Hachidan, Rokudan).",
          },
          {
            type: "image",
            label: "Photo",
            name: "photo",
            description: "Instructor photo. Recommended dimensions: 600x800px for portrait, 800x600px for landscape.",
          },
          {
            type: "string",
            label: "Photo Orientation",
            name: "photoOrientation",
            options: ["Portrait", "Landscape"],
            description: "Select Portrait for tall photos, Landscape for wide photos.",
          },
          {
            type: "number",
            label: "Sort Order",
            name: "sortOrder",
            description: "Controls the display order. Lower numbers appear first.",
          },
          {
            type: "boolean",
            label: "Featured",
            name: "featured",
            description: "Featured instructors are displayed with a larger, prominent layout.",
          },
          {
            type: "rich-text",
            label: "Biography",
            name: "body",
            isBody: true,
            description: "Instructor biography, max 1500 characters.",
          },
        ],
      }
    ],
  },
});
