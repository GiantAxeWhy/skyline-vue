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
import { RouterStore } from 'stores/neutron/router';
import { NetworkStore } from 'stores/neutron/network';
import globalNeutronStore from 'stores/neutron/neutron';
import { ModalAction } from 'containers/Action';
import { has } from 'lodash';
import { networkStatus } from 'resources/network';
import {
  availabilityZoneState,
  availabilityZoneResource,
} from 'resources/neutron';

export class Create extends ModalAction {
  static id = 'create';

  static title = t('Create Router');

  init() {
    this.store = new RouterStore();
    this.networkStore = new NetworkStore();
    this.fetchAzones();
  }

  get name() {
    return t('create router');
  }

  static get modalSize() {
    return 'large';
  }

  getModalSize() {
    return 'large';
  }

  fetchAzones() {
    globalNeutronStore.fetchAvailableZones();
  }

  get aZones() {
    return (globalNeutronStore.availableZones || [])
      .filter((it) => it.state === 'available' && it.resource === 'router')
      .map((it) => ({
        ...it,
        id: it.name,
      }));
  }

  get defaultValue() {
    return {
      openExterlNet: false,
    };
  }

  static policy = 'create_router';

  static allowed = () => Promise.resolve(true);

  onValuesChange = (changedFields) => {
    if (has(changedFields, 'openExterlNet')) {
      this.setState({
        openExterlNet: changedFields.openExterlNet,
      });
    }
  };

  onSubmit = (values) => {
    const { openExterlNet, externalNetwork, hints = {}, ...others } = values;
    const extGateway = openExterlNet
      ? {
          external_gateway_info: {
            network_id: externalNetwork.selectedRows[0].id,
          },
        }
      : null;
    const availability_zone_hints = hints.selectedRowKeys || [];
    return this.store.create({
      ...others,
      ...extGateway,
      availability_zone_hints,
    });
  };

  get formItems() {
    const { openExterlNet } = this.state;
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
        name: 'hints',
        label: t('Availability Zone Hints'),
        type: 'select-table',
        data: this.aZones,
        isLoading: globalNeutronStore.zoneLoading,
        isMulti: true,
        filterParams: [
          {
            label: t('Name'),
            name: 'name',
          },
        ],
        columns: [
          {
            title: t('Name'),
            dataIndex: 'name',
          },
          {
            title: t('State'),
            dataIndex: 'state',
            render: (value) => availabilityZoneState[value] || '-',
          },
          {
            title: t('Resource Type'),
            dataIndex: 'resource',
            render: (value) => availabilityZoneResource[value] || value,
          },
        ],
      },
      {
        name: 'openExterlNet',
        label: t('Options'),
        type: 'check',
        content: t('Open External Gateway'),
      },
      {
        name: 'externalNetwork',
        label: t('External Gateway'),
        type: 'select-table',
        backendPageStore: this.networkStore,
        extraParams: { 'router:external': true },
        required: openExterlNet,
        hidden: !openExterlNet,
        filterParams: [
          {
            label: t('Name'),
            name: 'name',
          },
        ],
        columns: [
          {
            title: t('Name'),
            dataIndex: 'name',
          },
          {
            title: t('Status'),
            dataIndex: 'status',
            render: (value) => networkStatus[value] || '-',
          },
          {
            title: t('Created At'),
            dataIndex: 'created_at',
            valueRender: 'sinceTime',
          },
        ],
      },
    ];
  }
}

export default inject('rootStore')(observer(Create));
