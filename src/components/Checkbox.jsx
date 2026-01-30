import React from 'react'

// interface  {
//   defaultChecked?: boolean
//   handleCheck: any
//   ischecked?: boolean
//   label?: string
//   name?: string
//   // color: string
//   disabled?: boolean
//   value?: boolean
//   error?: any
// }

export const CustomCheckbox = ({
  defaultChecked,
  handleCheck,
  ischecked,
  label,
  name,
  value,
  // color,
  disabled,
  error,
}) => {
  return (
    <div className='inline-flex items-center'>
      <div className='cursor-pointer w-[40px] h-[40px] flex justify-center items-center rounded-full hover:bg-[#575abc1A]'>
        <input
          className={`cursor-pointer w-[16px] h-[16px] rounded border-[1px] border-[#AEB0CF]
            ${ischecked ? 'bg-[#575ABC]' : 'bg-[#ffffff]'} hover:bg-[red]`}
          type='checkbox'
          name={name}
          id={label}
          checked={ischecked}
          defaultChecked={defaultChecked}
          onChange={handleCheck}
          disabled={disabled}
        />
      </div>
      <label className='dark:text-white'>{label}</label>
    </div>
  )
}
