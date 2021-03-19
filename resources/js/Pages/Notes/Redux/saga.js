/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_REPOS } from './constants';
import { reposLoaded, repoLoadingError } from './actions';




/**
 * Github repos request/response handler
 */
export function* getRepos() {
  
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  
}
