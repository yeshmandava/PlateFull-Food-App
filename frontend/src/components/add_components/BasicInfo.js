import React, {useState, useEffect} from 'react'

export default function BasicInfo({defaultName, defaultDesc, basicSetter, imageSetter}) {
   
   const [postImage, setPostImage] = useState( { myfile : ''})

   const handleFileUpload = async (event) =>{
      const file = event.target.files[0]
      const base64 = await(convertToBase64(file))
      setPostImage({...postImage, myFile : base64})
   }

   let nameRef = '';
   let descRef = '';
   let submitRef = '';

   function transferInfo(event)
   {
      event.preventDefault();
      if (nameRef.value === '' || descRef.value ==='')
      {
         alert('Please fill out all fields.')
         return;
      }
      basicSetter(nameRef.value, descRef.value)
      submitRef.value = 'Done';
   }

   useEffect(() => {
      imageSetter(postImage)
   },[postImage])

   return (
    <div className="form-card text-center">
      <form className='text-start'>
         <h4 className='form-heading mb-3'>Basic Info</h4>
         <label for='recipe-name'>Choose a Recipe Name</label>
         <input 
         type='text' 
         ref={(c) => 
         nameRef = c} 
         name='recipe-name' 
         placeholder={defaultName} 
         className='mb-3'/>

         <label for='recipe-description'>Write a Description</label>
         <textarea 
         ref={(c) => descRef = c} 
         placeholder={defaultDesc}
         className='mb-3'></textarea>
         
         <label for='recipe-image'>Pick an Image</label>
         <input 
            type='file' 
            label='Image' 
            name='myFile' 
            id='file-upoload' 
            accept='.jpeg, .png ,.jpg' 
            onChange={(handleFileUpload)}
            className='mb-1'
         />
         <img src={postImage.myFile} alt="recipe image" />
         <input type='submit' className='btn btn-dark my-2' ref={(c) => submitRef = c} onClick={transferInfo}/>

      </form>
    </div>
  )
}

function convertToBase64(file){
   return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () =>{
         resolve(fileReader.result)
      }
      fileReader.onerror = (error) =>{
         reject(error)
      }
   })
}