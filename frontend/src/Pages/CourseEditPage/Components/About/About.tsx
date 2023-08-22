import Input from 'src/Components/Input/Input'

import { AboutComponentInterface } from './AboutInterface'

import './About.scss'

const About = ({ course, changeCourse, changeFormData }: AboutComponentInterface) => {
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
            changeFormData(x.target.files[0])
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
            <div className='about-image'>
                <h3 className='about-image-title'>Image</h3>
                <img src={course.img} className='image' alt='course' />
            </div>
            <input type='file' accept='image/png, image/gif, image/jpeg' onChange={changeImage} />
            <Input value={course.name} onChange={(x) => changeName(x)} placeholder='Name' />
            <Input value={course.price} onChange={(x) => changePrice(x)} placeholder='Price' />
            <Input
                value={course.number_lectures}
                onChange={(x) => changeNumberLectures(x)}
                placeholder='Number Lectures'
            />
        </div>
    )
}

export default About
