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

import React from 'react';
import { inject, observer } from 'mobx-react';
import { Typography } from 'antd';
import { ModalAction } from 'containers/Action';
import { allCanReadPolicy } from 'resources/policy';
import styles from './index.less';

const { Paragraph } = Typography;

@inject('rootStore')
@observer
export default class Token extends ModalAction {
  static id = 'get-token';

  static title = t('Get Token');

  get name() {
    return t('Get Token');
  }

  get token() {
    const key = 'keystone_token';
    const item = localStorage.getItem(key);
    try {
      return JSON.parse(item) || {};
    } catch (e) {
      return {};
    }
  }

  get showNotice() {
    return false;
  }

  get tokenValue() {
    return this.token.value || '';
  }

  get tokenExpiry() {
    const { expires } = this.token;
    return expires || 0;
  }

  getLeftStr = (value) => {
    const left = value - Date.now();
    const seconds = Math.floor(left / 1000);
    if (seconds < 60) {
      return t('{seconds} seconds', { seconds });
    }
    const minutes = Math.floor(seconds / 60);
    const leftSeconds = seconds % 60;
    if (minutes < 60) {
      return t('{minutes} minutes {leftSeconds} seconds', {
        minutes,
        leftSeconds,
      });
    }
    const hours = Math.floor(minutes / 60);
    const leftMinutes = minutes % 60;
    return t('{hours} hours {leftMinutes} minutes {leftSeconds} seconds', {
      hours,
      leftMinutes,
      leftSeconds,
    });
  };

  get tips() {
    return t(
      'Please save your token properly and it will be valid for {left}.',
      { left: this.getLeftStr(this.tokenExpiry) }
    );
  }

  get defaultValue() {
    const value = {
      token: this.tokenValue,
    };
    return value;
  }

  static policy = allCanReadPolicy;

  static allowed = () => Promise.resolve(true);

  get labelCol() {
    return {
      xs: { span: 0 },
      sm: { span: 0 },
    };
  }

  get wrapperCol() {
    return {
      xs: { span: 24 },
      sm: { span: 24 },
    };
  }

  get formItems() {
    return [
      {
        name: 'token',
        label: '',
        type: 'label',
        component: (
          <Paragraph
            copyable={{ text: this.tokenValue }}
            className={styles.token}
          >
            <pre>{this.tokenValue}</pre>
          </Paragraph>
        ),
      },
    ];
  }

  onSubmit = () => Promise.resolve();
}
