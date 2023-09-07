import Input from 'src/Components/Input/Input'

import { AboutComponentInterface } from './AboutInterface'
import { useState } from 'react'

import './About.scss'

const About = ({ course, changeCourse, changeFormData }: AboutComponentInterface) => {
    const [selectedImage, setSelectedImage] = useState<string>('')
    const changeName = (x: string) => {
        if (course) changeCourse({ ...course, name: x })
    }

    const changePrice = (x: string) => {
        if (course) {
            changeCourse({ ...course, price: Number(x.replace(/\D/g, '')) })
        }
    }

    const changeImage = (x: React.ChangeEvent<HTMLInputElement>) => {
        if (x.target.files) {
            const file = x.target.files[0]
            const reader = new FileReader()

            reader.readAsDataURL(file)
            reader.onload = (e) => {
                if (e.target) {
                    setSelectedImage(String(e.target.result))
                }
            }

            changeFormData(file)
        }
    }

    const changeNumberLectures = (x: string) => {
        if (course) {
            changeCourse({ ...course, number_lectures: Number(x.replace(/\D/g, '')) })
        }
    }

    return (
        <div className='about'>
            <h2 className='about-title'>About</h2>
            <h3 className='about-imageTitle'>Image</h3>
            <div className='about-image'>
                <img src={selectedImage ? selectedImage : course.img} className='image' alt='course' />
            </div>
            <input type='file' accept='image/png, image/gif, image/jpeg' onChange={changeImage} />
            <Input value={course.name} onChange={(x) => changeName(x)} title='Name' />
            <Input value={course.price} onChange={(x) => changePrice(x)} title='Price' />
            <Input value={course.number_lectures} onChange={(x) => changeNumberLectures(x)} title='Number Lectures' />
        </div>
    )
}

export default About
