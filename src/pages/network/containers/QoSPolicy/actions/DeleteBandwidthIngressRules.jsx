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
import globalQoSPolicyStore from 'stores/neutron/qos-policy';

export default class DeleteAction extends ConfirmAction {
  get id() {
    return 'delete-ingress';
  }

  get title() {
    return t('Delete Bandwidth Ingress Rules');
  }

  get buttonType() {
    return 'danger';
  }

  get buttonText() {
    return t('Delete Bandwidth Ingress Rules');
  }

  get actionName() {
    return t('delete bandwidth ingress rules');
  }

  policy = 'delete_policy_bandwidth_limit_rule';

  allowedCheckFunc = (item) => {
    if (!item) {
      return true;
    }
    return this.isOwnerOrAdmin(item) && this.hasIngressRule(item);
  };

  hasIngressRule = (item) => {
    const { rules = [] } = item;
    return rules.some((i) => i.direction === 'ingress');
  };

  isOwnerOrAdmin() {
    // TODO: check owner
    return true;
  }

  onSubmit = (data) => {
    const { id } = data.rules.find(
      (item) => item.type === 'bandwidth_limit' && item.direction === 'ingress'
    );
    return globalQoSPolicyStore.deleteBandwidthLimitRules(data, id);
  };
}
