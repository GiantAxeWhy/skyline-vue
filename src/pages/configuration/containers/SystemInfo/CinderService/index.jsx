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

import { observer, inject } from 'mobx-react';
import Base from 'containers/List';
import { serviceStatus, serviceState } from 'resources/service';
import globalServiceStore from 'stores/cinder/service';
import actionConfigs from './actions';

@inject('rootStore')
@observer
export default class CinderService extends Base {
  init() {
    this.store = globalServiceStore;
  }

  get policy() {
    return 'volume_extension:services:index';
  }

  get name() {
    return t('cinder services');
  }

  get hasTab() {
    return true;
  }

  get actionConfigs() {
    return actionConfigs;
  }

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'binary',
    },
    {
      title: t('Host'),
      dataIndex: 'host',
      isHideable: true,
    },
    {
      title: t('Availability Zone'),
      dataIndex: 'zone',
      isHideable: true,
    },
    {
      title: t('Service Status'),
      dataIndex: 'status',
      render: (value) => serviceStatus[value] || '-',
      tip: (value, record) => {
        if (value === 'enabled') {
          return '';
        }
        const { disabled_reason } = record || {};
        if (disabled_reason) {
          return `${t('Reason: ')} ${disabled_reason}`;
        }
        return '';
      },
    },
    {
      title: t('Service State'),
      dataIndex: 'state',
      render: (value) => serviceState[value] || '-',
    },
    {
      title: t('Last Updated'),
      dataIndex: 'updated_at',
      isHideable: true,
      valueRender: 'sinceTime',
    },
  ];

  get searchFilters() {
    return [
      {
        label: t('Name'),
        name: 'binary',
      },
      {
        label: t('Service Status'),
        name: 'status',
        options: Object.keys(serviceStatus).map((key) => ({
          label: serviceStatus[key],
          key,
        })),
      },
      {
        label: t('Service State'),
        name: 'state',
        options: Object.keys(serviceState).map((key) => ({
          label: serviceState[key],
          key,
        })),
      },
    ];
  }
}
