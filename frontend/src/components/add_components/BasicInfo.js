import React, {useState, useEffect} from 'react'

export default function BasicInfo({defaultName, defaultDesc, basicSetter, imageSetter}) {
   
   const [postImage, setPostImage] = useState( { myfile : ''})
   const handleSubmit = (event) =>{
      event.preventDefault();
   }

   const handleFileUpload = async (event) =>{
      const file = event.target.files[0]
      const base64 = await(convertToBase64(file))
      setPostImage({...postImage, myFile : base64})
   }

   let nameRef = '';
   let descRef = '';

   function transferInfo(event)
   {
      event.preventDefault();
      basicSetter(nameRef.value, descRef.value)
   }

   useEffect(() => {
      imageSetter(postImage)
   },[postImage])

   return (
    <div className='form-card'>
      <form>
         <input type='text' ref={(c) => nameRef = c} placeholder={defaultName}></input>
         <textarea ref={(c) => descRef = c} placeholder={defaultDesc}></textarea>
         <input 
            type='file' 
            label='Image' 
            name='myFile' 
            id='file-upoload' 
            accept='.jpeg, .png ,.jpg' 
            onChange={(handleFileUpload)}
         />
         <input type='submit' className='btn btn-dark my-2' onClick={transferInfo}></input>
         <img src={postImage.myFile} alt="recipe image" />

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