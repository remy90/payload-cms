
import { CollectionConfig } from 'payload/types';
import { blockFields } from '../fields/blockFields';
import PrerequisiteField from '../customComponents/PrerequisiteField';


export const QuestionSets: CollectionConfig = {
  slug: 'question-set',
  fields: [
    {
      name: "Question set title",
      type: "text",
    },
    blockFields({
      name: "questionSet",
      fields: [{
        name: "questionSet",
        type: "array",
        fields: [{
          name: "question",
          type: "text",
          label: "Question",
          required: true,
        },
        {
          name: "answers",
          type: "array",
          label: "Answers",
          minRows: 2,
          required: true,
          labels: {
            singular: "answer",
            plural: "answers"
          },
          fields: [{
            name: "answer",
            type: "text",
          }],
        },
        {
          name: "prerequisite",
          type: "text",
          admin: {
            components: {
              Field: PrerequisiteField
            }
          }
        }
        ],
      }]
    }),
  ],
}
