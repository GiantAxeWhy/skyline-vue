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

// import React from 'react';
import { inject, observer } from 'mobx-react';
import { ModalAction } from 'containers/Action';
import globalServerStore from 'stores/nova/instance';
import { ServerGroupInstanceStore } from 'stores/skyline/server-group-instance';
import { isInUse, isOsDisk } from 'resources/volume';
import {
  instanceColumnsBackend,
  allowAttachVolumeInstance,
} from 'resources/instance';

export class Detach extends ModalAction {
  static id = 'detach';

  static title = t('Detach');

  static buttonType = 'danger';

  get name() {
    return t('Detach');
  }

  init() {
    this.store = globalServerStore;
    this.instanceStore = new ServerGroupInstanceStore();
    this.getInstances();
  }

  static get modalSize() {
    return 'large';
  }

  getModalSize() {
    return 'large';
  }

  get instances() {
    return this.instanceStore.list.data || [];
  }

  getInstances() {
    const members = (this.item.attachments || []).map((it) => it.server_id);
    this.instanceStore.fetchList({ members });
  }

  get defaultValue() {
    const { name, size, volume_type } = this.item;
    const value = {
      volume: `${name}(${volume_type} | ${size}GB)`,
    };
    return value;
  }

  static policy = 'os_compute_api:os-volumes-attachments:delete';

  static allowed = (item) =>
    Promise.resolve(
      isInUse(item) &&
        !isOsDisk(item) &&
        Array.isArray(item.attachments) &&
        item.attachments.length
    );

  disabledInstance = (ins) => !allowAttachVolumeInstance(ins);

  get formItems() {
    return [
      {
        name: 'volume',
        label: t('Volume'),
        type: 'label',
        iconType: 'volume',
      },
      {
        name: 'instance',
        label: t('Instance'),
        type: 'select-table',
        required: true,
        data: this.instances,
        isMulti: true,
        filterParams: [
          {
            label: t('Name'),
            name: 'name',
          },
        ],
        columns: instanceColumnsBackend,
        isLoading: this.instanceStore.list.isLoading,
        disabledFunc: this.disabledInstance,
      },
    ];
  }

  onSubmit = ({ instance }) => {
    const { id } = this.item;
    const { selectedRowKeys } = instance;
    return Promise.all(
      selectedRowKeys.map((instanceId) =>
        this.store.detachVolume({ id: instanceId, volumes: [id] })
      )
    );
  };
}

export default inject('rootStore')(observer(Detach));
