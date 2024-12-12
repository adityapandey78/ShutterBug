//RTE=Real Time Editor
import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
{
//see notes
// export default function RTE() {
//   return (
//     <Editor
//     initialValue='default value'
//     init={{
//         height: 500,
//         menubar: false,
//         plugins: [
//           'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
//           'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
//           'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
//         ],
//         toolbar: 'undo redo | blocks | ' +
//           'bold italic forecolor | alignleft aligncenter ' +
//           'alignright alignjustify | bullist numlist outdent indent | ' +
//           'removeformat | help',
//         content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
//       }}
//     />

//   )
// }
}
// *https://www.react-hook-form.com/api/usecontroller/
import {Controller} from 'react-hook-form'
//controller me el control hota hai, render hota hai and and onchange hota hai
//see the @PostForm.jsx
export default function RTE({name, control,label,defaultValue=""}){
  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
      <Controller
        name={name||"content"}
        control={control}
        render={({field:{onChange}})=>(
          <Editor
              initialValue=''
              apiKey='d89s4p9hww66g8ij8xrgbn0nl8wx632hbdtyeo9byarmv4cn'
              init={{
                  height: 500,
                  menubar: true,
                  plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                  ],
                  toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                onEditorChange={onChange}
              />
        )}
      />
    </div>
  )
}