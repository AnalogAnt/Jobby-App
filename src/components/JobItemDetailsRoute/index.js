/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/alt-text */
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class JobItemDetailsRoute extends Component {
  state = {jobItemDetails: {}, isLoading: true}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`)
    const data = await response.json()
    const updatedData = {
      jobDetails: data.job_details,
      similarJobs: data.similar_jobs,
    }
    this.setState({jobItemDetails: updatedData, isLoading: false})
  }

  renderDetials = () => {
    const {jobItemDetails} = this.state
    const {jobDetails, similarJobs} = jobItemDetails
    const {
      company_logo_url,
      company_website_url,
      employment_type,
      id,
      title,
      job_description,
      skills,
      life_at_company,
      location,
      package_per_annum,
      rating,
    } = jobDetails

    return (
      <div>
        <div className="topcon">
          <img src={company_logo_url} alt="company logo" />
          <div className="title-con">
            <p>{title}</p>
            <p>{rating}</p>
          </div>
        </div>
        <div className="midcon">
          <div>
            <p>{location}</p>
            <p>{employment_type}</p>
          </div>
          <p>{package_per_annum}</p>
        </div>
        <hr />
        <div className="discon">
          <p>Description</p>
          <p>Visit</p>
          <p>{job_description}</p>
        </div>
        <p>Skills</p>
        <ul>
          {skills.map(each => (
            <li>
              <img src={each.image_url} />
              <p>{each.name}</p>
            </li>
          ))}
        </ul>
        <p>Life at Company</p>
        <div>
          <p>{life_at_company.description}</p>
          <img src={life_at_company.image_url} />
        </div>

        <p>Similar Jobs</p>
        <ul>
          {similarJobs.map(each => (
            <li>
              <div>
                <div className="topcon">
                  <img src={each.company_logo_url} alt="company logo" />
                  <div className="title-con">
                    <p>{each.title}</p>
                    <p>{each.rating}</p>
                  </div>
                </div>
                <div className="midcon">
                  <div>
                    <p>{each.location}</p>
                    <p>{each.employment_type}</p>
                  </div>
                </div>
                <hr />
                <div className="discon">
                  <p>Description</p>

                  <p>{each.job_description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="detialscon">
        {isLoading ? (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        ) : (
          this.renderDetials()
        )}
      </div>
    )
  }
}

export default JobItemDetailsRoute
