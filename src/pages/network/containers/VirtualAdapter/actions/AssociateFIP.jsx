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
import globalFloatingIpsStore from 'stores/neutron/floatingIp';
import { ModalAction } from 'containers/Action';
import { isNotError } from 'resources/instance';
import { getPortsAndReasons } from 'resources/port';
import { getCanReachSubnetIdsWithRouterIdInComponent } from 'resources/router';
import {
  getInterfaceWithReason,
  handleFixedIPChange,
} from 'resources/floatingip';

@inject('rootStore')
@observer
export default class AssociateFip extends ModalAction {
  static id = 'AssociateFip';

  static title = t('Associate Floating IP');

  init() {
    this.getInterfaces();
    getCanReachSubnetIdsWithRouterIdInComponent.call(this);
    this.state = {
      interfaces: [],
      fixed_ip: null,
      canAssociateFloatingIPs: [],
      canReachSubnetIdsWithRouterId: [],
      portLoading: true,
    };
  }

  async getInterfaces() {
    const buildInterfaces = [this.item];
    const interfaces = await getInterfaceWithReason(buildInterfaces);
    this.setState({
      interfaces,
      portLoading: false,
    });
  }

  static get modalSize() {
    return 'large';
  }

  getModalSize() {
    return 'large';
  }

  get name() {
    return t('Associate Floating IP');
  }

  get ports() {
    const { interfaces, canReachSubnetIdsWithRouterId } = this.state;
    return getPortsAndReasons.call(
      this,
      interfaces,
      canReachSubnetIdsWithRouterId
    );
  }

  get defaultValue() {
    const { name } = this.item;
    const value = {
      virtualAdapter: name,
    };
    return value;
  }

  static policy = 'update_floatingip';

  handleFixedIPChange = (e) => handleFixedIPChange.call(this, e);

  static allowed = (item, containerProps) => {
    const { isAdminPage = false } = containerProps;
    return Promise.resolve(!isAdminPage && isNotError(item) && canAssociated());

    function canAssociated() {
      return (
        item.associatedDetail && item.associatedDetail.length < item.ipv4.length
      );
    }
  };

  onSubmit = (values) => {
    const { fixed_ip, fip } = values;
    const selectedFixedIP = fixed_ip.selectedRows[0];
    const fipId = fip.selectedRowKeys[0];
    return globalFloatingIpsStore.associateFip({
      id: fipId,
      port_id: this.item.id,
      fixed_ip_address: selectedFixedIP.fixed_ip_address,
    });
  };

  get formItems() {
    const { canAssociateFloatingIPs, portLoading, fipLoading } = this.state;
    return [
      {
        name: 'virtualAdapter',
        label: t('Virtual Adapter'),
        type: 'label',
        iconType: 'instance',
      },
      {
        name: 'fixed_ip',
        label: t('Fixed IP'),
        type: 'select-table',
        required: true,
        data: this.ports,
        isLoading: portLoading,
        disabledFunc: (record) => !record.available,
        onChange: this.handleFixedIPChange,
        isMulti: false,
        filterParams: [
          {
            label: t('Ip Address'),
            name: 'name',
          },
        ],
        columns: [
          {
            title: t('Ip Address'),
            dataIndex: 'name',
          },
          {
            title: t('Subnet ID'),
            dataIndex: 'subnet_id',
          },
          {
            title: t('Reason'),
            dataIndex: 'reason',
          },
        ],
      },
      {
        name: 'fip',
        label: t('Floating Ip Address'),
        type: 'select-table',
        required: true,
        data: canAssociateFloatingIPs,
        isLoading: fipLoading,
        isMulti: false,
        filterParams: [
          {
            label: t('Floating Ip Address'),
            name: 'name',
          },
        ],
        columns: [
          {
            title: t('Floating Ip Address'),
            dataIndex: 'name',
          },
          {
            title: t('Network'),
            dataIndex: 'network_name',
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
