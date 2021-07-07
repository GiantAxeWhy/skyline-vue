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
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Base from 'containers/BaseDetail';
import { bindingTypes } from 'resources/port';

@inject('rootStore')
@observer
export default class BaseDetail extends Base {
  componentDidMount() {}

  get leftCards() {
    return [this.baseInfoCard];
  }

  get baseInfoCard() {
    const options = [
      {
        label: t('Bind Device Type'),
        dataIndex: 'device_owner',
      },
      {
        label: t('Bind Device'),
        dataIndex: 'device_id',
        render: (data, record) => {
          const { itemInList: { device_id, device_owner, server_name } = {} } =
            record;
          if (device_id && device_owner === 'compute:nova') {
            return (
              <Link
                to={`${this.getUrl(
                  '/compute/instance'
                )}/detail/${device_id}?tab=interface`}
              >
                {`${device_id}`}
                {server_name && `(${server_name})`}
              </Link>
            );
          }
          return data || '-';
        },
      },
      {
        label: t('VNIC Type'),
        dataIndex: 'binding:vnic_type',
        render: (value) => bindingTypes[value] || '-',
      },
      {
        label: t('QoS Policy'),
        dataIndex: 'qos_policy_id',
        copyable: false,
        render: (data) =>
          data ? (
            <Link to={`/network/qos-policy/detail/${data}`}>{data}</Link>
          ) : (
            '-'
          ),
      },
    ];
    return {
      title: t('Base Info'),
      options,
    };
  }
}