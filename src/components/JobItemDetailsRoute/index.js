/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class JobItemDetailsRoute extends Component {
  state = {jobItemDetails: {}, isLoading: true, test: true}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = {
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
      }
      this.setState({jobItemDetails: updatedData, isLoading: false})
    } else {
      this.setState({test: false})
    }
  }

  retryButtonJb = () => {
    this.getData()
  }

  renderDetials = () => {
    const {jobItemDetails, test} = this.state
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

    if (test) {
      return (
        <div>
          <div className="topcon">
            <img src={company_logo_url} alt="job details company logo" />
            <div className="title-con">
              <p>{title}</p>
              <p>{rating}</p>
              <a href={company_website_url}>Visit</a>
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
          <h1>Skills</h1>
          <ul>
            {skills.map(each => (
              <li key={each.name}>
                <img src={each.image_url} alt={each.name} />
                <p>{each.name}</p>
              </li>
            ))}
          </ul>
          <h1>Life at Company</h1>
          <div>
            <p>{life_at_company.description}</p>
            <img src={life_at_company.image_url} alt="life at company" />
          </div>

          <h1>Similar Jobs</h1>
          <ul>
            {similarJobs.map(each => (
              <li key={each.id}>
                <div>
                  <div className="topcon">
                    <img
                      src={each.company_logo_url}
                      alt="similar job company logo"
                    />
                    <div className="title-con">
                      <h1>{each.title}</h1>
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
                    <h1>Description</h1>

                    <p>{each.job_description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )
    }
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for.</p>
        <button onClick={this.retryButtonJb} type="button">
          Retry
        </button>
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
