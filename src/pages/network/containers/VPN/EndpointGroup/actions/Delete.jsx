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

import { ConfirmAction } from 'containers/Action';
import { checkPolicyRule } from 'resources/policy';
import globalVPNEndPointGroupStore from 'stores/neutron/vpn-endpoint-group';
import globalVpnIPsecConnectionStore from 'stores/neutron/vpn-ipsec-connection';
import globalRootStore from 'stores/root';

export default class DeleteAction extends ConfirmAction {
  get id() {
    return 'delete-vpn-endpoint-group';
  }

  get title() {
    return t('Delete VPN EndPoint Groups');
  }

  get buttonType() {
    return 'danger';
  }

  get buttonText() {
    return t('Delete');
  }

  get actionName() {
    return t('delete vpn endpoint groups');
  }

  policy = 'delete_endpoint_group';

  allowedCheckFunc = (item) => {
    if (!item) {
      return true;
    }
    return this.isCurrentProject(item);
  };

  isCurrentProject(item) {
    const rootStore = globalRootStore;
    if (
      !checkPolicyRule('skyline:system_admin') &&
      item.project_id !== rootStore.user.project.id
    ) {
      return false;
    }
    return true;
  }

  onSubmit = async (data) => {
    let params;
    switch (data.type) {
      case 'cidr':
        params = {
          peer_ep_group_id: data.id,
        };
        break;
      case 'subnet':
        params = {
          local_ep_group_id: data.id,
        };
        break;
      default:
        break;
    }
    const connections = await globalVpnIPsecConnectionStore.fetchList(params);
    if (connections.length > 0) {
      this.showConfirmErrorBeforeSubmit = true;
      this.confirmErrorMessageBeforeSubmit = `${t(
        'Unable to {action}, because : {reason}, instance: {name}.',
        {
          action: this.actionName || this.title,
          name: data.name,
          reason: t('the policy is in use'),
        }
      )}\n
        ${t('Used by tunnel(s): {names}. ID(s): {ids}', {
          names: connections.map((i) => i.name).join(', '),
          ids: connections.map((i) => i.id).join(', '),
        })}`;
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({ errorMsg: this.confirmErrorMessageBeforeSubmit });
    }
    return globalVPNEndPointGroupStore.delete(data);
  };
}
