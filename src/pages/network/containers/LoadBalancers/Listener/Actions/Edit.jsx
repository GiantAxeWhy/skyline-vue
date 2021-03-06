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
import globalListenerStore from 'stores/octavia/listener';
import { ModalAction } from 'containers/Action';
import globalLbaasStore from 'stores/octavia/loadbalancer';

@inject('rootStore')
@observer
export default class Edit extends ModalAction {
  static id = 'edit-listener';

  static title = t('Edit Listener');

  static buttonText = t('Edit');

  init() {
    this.store = globalListenerStore;
  }

  get defaultValue() {
    const { item } = this.props;
    return {
      name: item.name,
      description: item.description,
    };
  }

  static policy = 'os_load-balancer_api:listener:put';

  static allowed = async (item, containerProps) => {
    let { detail: lbDetail } = containerProps || {};
    if (!lbDetail) {
      lbDetail = await globalLbaasStore.pureFetchDetail(item.loadbalancers[0]);
    }
    return Promise.resolve(
      item.provisioning_status === 'ACTIVE' &&
        lbDetail.provisioning_status === 'ACTIVE'
    );
  };

  onSubmit = (values) => {
    const { id } = this.item;
    return globalListenerStore.edit({ id }, values);
  };

  get formItems() {
    return [
      {
        name: 'name',
        label: t('Name'),
        type: 'input-name',
        required: true,
        placeholder: t('Please input name'),
      },
      {
        name: 'description',
        label: t('Description'),
        type: 'textarea',
        required: false,
      },
    ];
  }
}
