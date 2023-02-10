import { Fields } from "payload/dist/admin/components/forms/Form/types";

const generateOptions = async (questionSets) => {
  // TODO: map questionSet to something nicer for long term maintenance improvement
  // TODO: only display earlier question sets per question set.
  // TODO: index each question with their IDs and ensure prerequisites for the same question or subsequent question sets are not possible
  // TODO: investigate why undefined combos are possible - e.g. undefined=undefined, Q1=undefined
  // TODO: when questions/answers change, trigger prerequisite list update

  const questionSet = "questionSet.questionSet"
  const numberOfQuestionSets = questionSets[`${questionSet}`].value;
  const questionNumbers = [...Array(numberOfQuestionSets).keys()];

  const questions = questionNumbers.map(qNo => questionSets[`${questionSet}.${qNo}.question`].value);

  const numberOfAnsPerQuestion = questionNumbers.map(qNo => questionSets[`${questionSet}.${qNo}.answers`].value)

  const combos = questions.flatMap((q, questionIndex) =>
    numberOfAnsPerQuestion.map((_, answerIndex) =>
      `${q} = ${questionSets[`${questionSet}.${questionIndex}.answers.${answerIndex}.answer`]?.value}`)
      ?.filter(combo => !combo.includes('undefined'))
  )
  return combos
}

const populateSelect = async (input: Fields) => {
  try {
    return generateOptions(input)
  } catch (err) {
    console.log('generateOptions', err)
  }
};

export default populateSelect;
