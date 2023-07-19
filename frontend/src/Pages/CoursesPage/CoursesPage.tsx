import Breadcrumbs from 'src/Components/Breadcrumbs/Breadcrumbs'
import { RouterNames } from 'src/router'

const CoursesPage = () => {
    return (
        <div>
            <Breadcrumbs text='Courses' link={RouterNames.ALLCOURSES} />
        </div>
    )
}

export default CoursesPage
