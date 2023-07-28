import Breadcrumbs from 'src/Components/Breadcrumbs/Breadcrumbs'
import Courses from 'src/Components/Courses/Courses'

import { RouterNames } from 'src/router'

import './CoursesPage.scss'

const CoursesPage = () => {
    return (
        <div>
            <Breadcrumbs text='Courses' link={RouterNames.ALLCOURSES} />
            <Courses />
        </div>
    )
}

export default CoursesPage
