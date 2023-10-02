import {Link} from 'react-router-dom'
import './index.css'

const JobItem = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    id,
    location,
    title,
    rating,
    packagePerAnnum,
  } = details

  return (
    <Link to={`/jobs/${id}`}>
      <div className="jobItem">
        <div className="topcon">
          <img src={companyLogoUrl} alt="company logo" />
          <div className="title-con">
            <p>{title}</p>
            <p>{rating}</p>
          </div>
        </div>
        <div className="midcon">
          <div>
            <p>{location}</p>
            <p>{employmentType}</p>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <div className="discon">
          <p>Description</p>
          <p>{jobDescription}</p>
        </div>
      </div>
    </Link>
  )
}

export default JobItem
