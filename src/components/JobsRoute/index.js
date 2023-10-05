/* eslint-disable no-unused-vars */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import JobItem from '../JobItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobsRoute extends Component {
  state = {
    jobsList: [],
    isLoading: false,
    checkedState: [],
    salaryRange: '',
    searchInput: '',
    fetchStatus: true,
    profileFetch: true,
    profileDetails: [],
  }

  componentDidMount() {
    this.getJobs()
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response2 = await fetch('https://apis.ccbp.in/profile', options)
    if (response2.ok) {
      const fetchedData = await response2.json()
      console.log()
      const updatedData = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        isLoading: false,
        profileFetch: true,
      })
    } else {
      this.setState({profileFetch: false})
    }
  }

  getJobs = async () => {
    const {checkedState, salaryRange, searchInput} = this.state
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(
      `https://apis.ccbp.in/jobs?employment_type=${checkedState.join()}&minimum_package=${salaryRange}&search=${searchInput}`,
      options,
    )
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(product => ({
        companyLogoUrl: product.company_logo_url,
        employmentType: product.employment_type,
        jobDescription: product.job_description,
        id: product.id,
        location: product.location,
        title: product.title,
        rating: product.rating,
        packagePerAnnum: product.package_per_annum,
      }))
      this.setState({
        jobsList: updatedData,
        fetchStatus: true,
        isLoading: false,
      })
    } else if (response.ok !== true) {
      this.setState({isLoading: false, fetchStatus: false})
    }
  }

  handleOnChange = id => {
    const {checkedState} = this.state
    let updatedCheckedState

    if (checkedState.includes(id)) {
      updatedCheckedState = checkedState.filter(each => each !== id)
    } else {
      updatedCheckedState = [...checkedState, id]
    }

    this.setState({checkedState: updatedCheckedState}, () => {
      this.getJobs()
    })
  }

  onRadio = id => {
    this.setState({salaryRange: id}, () => {
      this.getJobs()
    })
  }

  retryButtonPr = () => {
    this.getProfile()
  }

  retryButtonJb = () => {
    this.getJobs()
  }

  onInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {
      isLoading,
      profileDetails,
      jobsList,
      checkedState,
      searchInput,
      profileFetch,
      fetchStatus,
    } = this.state

    let compo
    let jobcompo

    if (isLoading) {
      compo = (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      )
    } else if (profileFetch) {
      compo = (
        <div className="profileCard">
          <img src={profileDetails.profileImageUrl} alt="profile" />
          <h1>{profileDetails.name} </h1>
          <p>{profileDetails.shortBio}</p>
        </div>
      )
    } else {
      compo = (
        <div>
          <button onClick={this.retryButtonPr} type="button">
            Retry
          </button>
        </div>
      )
    }

    if (isLoading) {
      jobcompo = (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      )
    } else if (fetchStatus) {
      jobcompo = (
        <div>
          {jobsList.map(each => (
            <JobItem details={each} key={each.id} />
          ))}
        </div>
      )
    } else {
      jobcompo = (
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
    return (
      <>
        <Header />
        <div className="jobsTab">
          <div className="sidebar">
            <div className="profile">{compo}</div>
            <hr />
            <h1>Type of Employment</h1>
            <ul className="emplytype">
              {employmentTypesList.map(({label, employmentTypeId}) => (
                <li key={employmentTypeId}>
                  <div className="toppings-list-item">
                    <div className="left-section">
                      <input
                        type="checkbox"
                        id={employmentTypeId}
                        name={label}
                        value={employmentTypeId}
                        checked={checkedState.includes(employmentTypeId)}
                        onChange={() => this.handleOnChange(employmentTypeId)}
                      />
                      <label htmlFor={employmentTypeId}>{label}</label>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <hr />
            <h1>Salary Range</h1>
            <ul>
              {salaryRangesList.map(({salaryRangeId, label}) => (
                <li key={salaryRangeId}>
                  <div onChange={() => this.onRadio(salaryRangeId)}>
                    <label>
                      <input type="radio" value={salaryRangeId} name="gender" />
                      {label}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="jobCon">
            <div className="searchbar">
              <input
                placeholder="Search"
                onChange={this.onInput}
                value={searchInput}
                type="search"
              />
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.getJobs}
              >
                Search
              </button>
            </div>
            {jobcompo}
          </div>
        </div>
      </>
    )
  }
}

export default JobsRoute
