import { PrerequisiteField } from './fields/prerequisite/prerequisiteSelect';
import { buildConfig } from 'payload/config';
import path from 'path';
import nestedDocs from '@payloadcms/plugin-nested-docs';
import formBuilder from '@payloadcms/plugin-form-builder';
import seo from '@payloadcms/plugin-seo';
import { ReusableContent } from './collections/ReusableContent'
import { Users } from './collections/Users';
import { CaseStudies } from './collections/CaseStudies';
import { Pages } from './collections/Pages';
import { Footer } from './globals/Footer';
import { MainMenu } from './globals/MainMenu';
import { Posts } from './collections/Posts';
import { Media } from './collections/Media';
import richText from './fields/richText';
import { QuestionSets } from './collections/QuestionSets';

export default buildConfig({
  collections: [
    CaseStudies,
    QuestionSets,
    Media,
    Pages,
    Posts,
    ReusableContent,
    Users,
  ],
  globals: [
    Footer,
    MainMenu,
  ],
  graphQL: {
    disablePlaygroundInProduction: false,
  },
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  plugins: [
    formBuilder({
      formOverrides: {
        fields: [
          richText({
            name: 'leader',
            label: 'Leader Text',
            admin: {
              elements: []
            }
          }),
        ]
      }
    }),
    seo({
      collections: [
        'case-studies',
        'pages',
        'posts',
      ],
      uploadsCollection: 'media',
    }),
    nestedDocs({
      collections: ['pages'],
      generateLabel: (_, doc) => doc.title as string,
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    }),
  ],
  cors: [
    process.env.PAYLOAD_PUBLIC_APP_URL,
    // 'https://payloadcms.com',
  ].filter(Boolean),
  admin: {

    webpack: (config) => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          react: path.resolve(__dirname, '../node_modules/react'),
          'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
          'react-router-dom': path.resolve(__dirname, '../node_modules/react-router-dom'),
        }
      }
    })
  }
});
