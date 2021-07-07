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

import { inject, observer } from 'mobx-react';
import { ModalAction } from 'containers/Action';
import globalNetworkStore from 'stores/neutron/network';
import checkPolicy, { checkPolicyRule } from 'resources/policy';
import globalRootStore from 'stores/root';

@inject('rootStore')
@observer
export default class Edit extends ModalAction {
  static id = 'edit-network';

  static title = t('Edit');

  static buttonText = t('Edit');

  static policy = 'update_network';

  get defaultValue() {
    const { item } = this.props;
    return {
      ...item,
    };
  }

  static allowed = (item) => {
    const rootStore = globalRootStore;
    if (
      !checkPolicyRule('skyline:system_admin') &&
      item.project_id !== rootStore.user.project.id
    ) {
      return Promise.resolve(false);
    }
    return Promise.resolve(true);
  };

  onSubmit = (values) => {
    const { item: { id } = {} } = this.props;
    const { name, description, ...rest } = values;
    const data = { name, description };
    if (this.isSystemAdmin) {
      data.shared = rest.shared;
    }
    if (this.isAdminPage) {
      data['router:external'] = rest['router:external'];
    }
    return globalNetworkStore.edit({ id }, data);
  };

  get isSystemAdmin() {
    return checkPolicy({
      rules: ['skyline:system_admin'],
      every: false,
    });
  }

  get formItems() {
    return [
      {
        name: 'name',
        label: t('Name'),
        type: 'input-name',
        required: true,
        withoutChinese: true,
      },
      {
        name: 'description',
        label: t('Description'),
        type: 'textarea',
        required: false,
      },
      {
        name: 'shared',
        label: t('Shared'),
        type: 'select',
        hidden: !this.isSystemAdmin,
        options: [
          {
            label: t('Yes'),
            value: true,
          },
          {
            label: t('No'),
            value: false,
          },
        ],
      },
      {
        name: 'router:external',
        label: t('External Network'),
        type: 'check',
        hidden: !this.isAdminPage,
      },
    ];
  }
}