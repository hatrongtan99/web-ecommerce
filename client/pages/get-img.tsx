import {useEffect, useState} from 'react'
import axios from 'axios';

const GetImg = () => {
    const [img, setImg] = useState<string>('')
    console.log(`http://localhost:5000/public/images/${img}`)
    useEffect(() => {
        const fetch = async () => {
          const res = await axios.get('http://localhost:5000/api/get-img')
          setImg(res.data.data[0].image1)
        }
        fetch()
    }, [])
  return (
    <img src={`http://localhost:5000/public/images/${img}`}/>
  )
}

export default GetImg