import Breadcrumbs from 'src/Components/Breadcrumbs/Breadcrumbs'
import Categories from 'src/Pages/CoursesPage/Components/Categories/Categories'

import { RouterNames } from 'src/router'

import './CoursesPage.scss'

const CoursesPage = () => {
    return (
        <div>
            <Breadcrumbs text='Courses' link={RouterNames.COURSES} />
            <Categories />
        </div>
    )
}

export default CoursesPage
