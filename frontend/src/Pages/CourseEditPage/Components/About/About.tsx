import Input from 'src/Components/Input/Input'

import { AboutComponentInterface } from './AboutInterface'
import { useState } from 'react'

import './About.scss'
import InputImage from 'src/Components/InputImage/InputImage'

const About = ({ course, changeCourse }: AboutComponentInterface) => {
    const [selectedImage, setSelectedImage] = useState<string>('')

    const changeName = (x: string) => {
        if (course) changeCourse({ ...course, name: x })
    }

    const changePrice = (x: string) => {
        if (course) {
            changeCourse({ ...course, price: Number(x.replace(/\D/g, '')) })
        }
    }

    const changeSelectedImage = (x: string) => {
        setSelectedImage(x)
    }

    const addNewImage = (x: File) => {
        changeCourse({ ...course, newImg: x })
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
            <InputImage getImage={addNewImage} getSrcImage={changeSelectedImage} />
            <Input value={course.name} onChange={(x) => changeName(x)} title='Name' />
            <Input value={course.price} onChange={(x) => changePrice(x)} title='Price' />
            <Input value={course.number_lectures} onChange={(x) => changeNumberLectures(x)} title='Number Lectures' />
        </div>
    )
}

export default About
