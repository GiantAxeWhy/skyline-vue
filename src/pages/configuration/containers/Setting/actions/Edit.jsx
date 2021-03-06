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
import { ModalAction } from 'containers/Action';
import globalSettingStore from 'stores/skyline/setting';
import CodeEditor from 'components/CodeEditor';
import { inject, observer } from 'mobx-react';

@inject('rootStore')
@observer
export default class Edit extends ModalAction {
  get id() {
    return 'edit';
  }

  static buttonType = 'primary';

  get instanceName() {
    return this.item.key;
  }

  static policy = 'skyline:system_admin';

  static allowed() {
    return Promise.resolve(true);
  }

  init() {
    this.state.value = this.item.value;
  }

  get defaultValue() {
    const { key } = this.item;
    return {
      key,
    };
  }

  onChange = (value) => {
    let realValue = {};
    try {
      realValue = JSON.parse(value);
    } catch (e) {
      realValue = this.item.value;
    }
    this.setState({
      value: realValue,
    });
  };

  renderContent = () => {
    const props = {
      value: this.item.value,
      mode: 'json',
      onChange: this.onChange,
    };
    return <CodeEditor {...props} />;
  };

  get labelCol() {
    return {
      xs: { span: 4 },
      sm: { span: 4 },
    };
  }

  get wrapperCol() {
    return {
      xs: { span: 20 },
      sm: { span: 20 },
    };
  }

  get formItems() {
    return [
      {
        name: 'key',
        type: 'label',
        label: t('Name'),
      },
      {
        name: 'value',
        type: 'other',
        label: t('Value'),
        content: this.renderContent(),
      },
    ];
  }

  onSubmit = () => {
    const { key } = this.item;
    const { value } = this.state;
    const body = {
      key,
      value,
    };
    return globalSettingStore.update(body);
  };
}
