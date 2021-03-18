
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React, {useRef, } from 'react';
export default ({
  value,
  label,
  name,
  onChange,
  className,
  errors = [],
  ...props
}) => {
  // const inputEl = useRef(null);
  // function test() {
  //   console.log(inputEl.current.editor.config.get( 'image.toolbar' ));
  // }

  return (

    <div  className = {className ? className : "w-full pb-8 pr-6"}>
          <CKEditor
          onReady={ editor => {
              let labelNode = document.querySelector('.ck-editor  label')
              labelNode.innerHTML = label;
              labelNode.setAttribute('for' , name);
              labelNode.addEventListener('click',()=>{
                editor.focus();
              })
          } }
              config={{
                  placeholder: 'Type some text...',
              }}


              //ref={inputEl}
              name={name}
              editor={ ClassicEditor }
              data={value}
              onChange={onChange}
          />
          {errors && <div className="form-error">{errors}</div>}
    </div>

    
  );
};
