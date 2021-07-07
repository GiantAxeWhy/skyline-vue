// Copyright 2021 99cloud
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'mobx-react-router';
// import { AppContainer } from 'react-hot-loader';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import enUS from 'antd/es/locale/en_US';
import globalRootStore from 'stores/root';
import request from 'utils/request';
import PageLoading from 'components/PageLoading';
import i18n from './i18n';
import App from './App';

window.t = i18n.t;
window.request = request;
window.globals = {
  user: null,
};

const store = globalRootStore;

// request error handler
window.onunhandledrejection = function (e) {
  if (e && (e.status === 'Failure' || e.status >= 400)) {
    if (e.status === 401) {
      // session timeout handler, except app store page.
      /* eslint-disable no-alert */
      const currentPath = window.location.pathname;
      if (currentPath.indexOf('login') < 0) {
        store.gotoLoginPage(currentPath);
        // window.location.href = `/user/login?referer=${currentPath}`;
      }
    }
  }
};

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, store.routing);
const lang = i18n.getLocale();
const localeProvider = lang === 'en' ? enUS : zhCN;

const render = (component) => {
  ReactDOM.render(
    <Suspense fallback={<PageLoading className="sl-page-loading" />}>
      {/* <>{component}</> */}
      <ConfigProvider locale={localeProvider}>{component}</ConfigProvider>
    </Suspense>,
    document.getElementById('app')
  );
};

const getUser = async (callback) => {
  if (window.location.pathname.indexOf('/login') < 0) {
    try {
      await store.getUserProfileAndPolicy();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      store.gotoLoginPage();
    } finally {
      callback && callback();
    }

    return;
  }
  callback && callback();
};
getUser(() => {
  render(<App rootStore={store} history={history} />);
});

module.hot &&
  module.hot.accept('./App', () => {
    const NextApp = lazy(() => import('./App'));
    // eslint-disable-next-line import/no-extraneous-dependencies
    const { AppContainer } = lazy(() => import('react-hot-loader'));
    render(
      <AppContainer>
        <NextApp rootStore={store} history={history} />
      </AppContainer>
    );
  });