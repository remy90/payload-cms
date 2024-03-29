import { Select, useForm, useFormFields } from 'payload/components/forms'
import React, { ChangeEvent, useState, useEffect } from 'react'
import populateSelectOptions from './prerequisiteHelpers'
import './index.scss'

const PrerequisiteField: React.FC<{ path: string, name: string }> = ({ path, name }) => {
  const [options, setOptions] = useState<string[]>(['n/a'])
  const { fields, dispatch } = useFormFields(([fields, dispatch]) => ({ fields, dispatch }));
  const [selectedOption, setSelectedOption] = useState(`${fields[path]?.value}`)
  const [isDark, setIsDark] = useState<boolean>(false)
  const handlePrerequisiteChange = (e: ChangeEvent<HTMLSelectElement>, path: string) => {
    setSelectedOption(e.target.value)
    dispatch({
      type: "UPDATE",
      path,
      value: e.target?.value
    });
  };
  useEffect(() => {

    populateSelectOptions(fields).then(res => setOptions(res))
  }, [fields["questionSet.questionSet"].value])
  useEffect(() => {
    setIsDark(window.matchMedia("(prefers-color-scheme:dark)").matches)
  }, [])

  // const payloadSelect = <Select name='Prerequisites' label="Prerequisites" options={options} hooks={{
  //   afterChange: [({ value, data, originalDoc, req }) => console.log('afterChange', value, data, originalDoc, req)],
  //   beforeChange: [() => console.log('beforeChange')],
  //   afterRead: [() => console.log('afterRead')],
  //   beforeValidate: [() => console.log('beforeValidate')],
  // }} />
  return (<div className={isDark ? "select-wrapper-dark" : "select-wrapper-light"}><label className='select-label' htmlFor='prerequisite-select'>Prerequisites</label>
    <select className={isDark ? "select-dark" : "select-light"} placeholder='A condition before displaying this question' title="prerequisite" id="prerequisite-select" value={selectedOption} onChange={(e) => handlePrerequisiteChange(e, path)}>
      <option></option>
      {options.map((option, index) => <option key={`r-${index}`} value={option}>{option}</option>)}
    </select>
  </div>);
}
export default PrerequisiteField
