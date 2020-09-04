/*
 * Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import { createStore, applyMiddleware, compose } from 'redux';
import clientMiddleware from './middleware/clientMiddleware';
import { IHttpService } from './middleware/types';
import reducers, { AppState } from './reducers';

function configureStore(httpClient: IHttpService) {
  const middleWares = [clientMiddleware<AppState>(httpClient)];
  const composeWithReduxDevTools = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = composeWithReduxDevTools(applyMiddleware(...middleWares))(createStore);
  //@ts-ignore
  return store(reducers);
}

export default configureStore;
