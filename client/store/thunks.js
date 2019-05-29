import axios from 'axios'
import * as actions from './actions'

export const login = (email, password) => {
  return dispatch => {
    return axios
      .post('/api/auth', { email, password })
      .then(res => res.data)
      .then(user => dispatch(actions.getUser(user)))
  }
}

export const checkIfUserLoggedInThunk = () => {
  return dispatch => {
    return axios
      .get('/api/auth')
      .then(({ data }) => dispatch(actions.getUser(data)))
  }
}

export const logoutUserThunk = () => {
  return dispatch => {
    return axios.delete('/api/auth').then(() => dispatch(actions.getUser({})))
  }
}

export const fetchCohorts = () => {
  return dispatch => {
    return axios
      .get('/api/cohorts')
      .then(res => res.data)
      .then(cohorts => dispatch(actions.getCohorts(cohorts)))
  }
}

export const fetchCohort = cohortId => {
  return dispatch => {
    return axios
      .get(`/api/cohorts/${cohortId}`)
      .then(res => res.data)
      .then(cohort => dispatch(actions.getCohort(cohort)))
  }
}

export const fetchStudents = cohortId => {
  return dispatch => {
    return axios
      .get(`/api/students/${cohortId}`)
      .then(res => res.data)
      .then(students => dispatch(actions.getStudents(students)))
  }
}

export const fetchStretches = () => {
  return dispatch => {
    return axios
      .get('/api/stretches')
      .then(res => res.data)
      .then(stretches => dispatch(stretches))
  }
}
