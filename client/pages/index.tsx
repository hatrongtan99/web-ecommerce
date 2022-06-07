import type { NextPage } from 'next'
import {MainLayout} from '../components'
import axios from 'axios';
import { ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import {useRouter } from 'next/router'

const Home = () => {
  const router = useRouter()

  const [image, setimage] = useState<any>()

  const handleUpdate: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()
    if (image) {
      const formData = new FormData();
      for (let item of image) {
        formData.append('image', item);
      }
      
      const res = await axios.post('http://localhost:5000/api/upload-single', formData)
      if (res.data.success) {
        router.push('/get-img')
      }
      console.log("res ", res.data)
    }
  }

  const handleButtonClick: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      setimage(e.target.files)
    }
  };

  return (
    // <MainLayout titlePage='Trang Chủ'>
    //   <div>main tết </div>
    // </MainLayout>
    <form encType="multipart/form-data">
      <label>Store Image</label><br/><br/>
      <input type="file"  name="image" onChange={handleButtonClick} multiple/>
      <button type="submit" onClick={handleUpdate}>Upload</button>
    </form>
  )
}

export default Home
