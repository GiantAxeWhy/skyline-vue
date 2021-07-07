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

import { neutronBase } from 'utils/constants';
import { action } from 'mobx';
import Base from '../base';

export class QoSPolicyStore extends Base {
  get module() {
    return 'qos/policies';
  }

  get apiVersion() {
    return neutronBase();
  }

  get responseKey() {
    return 'policy';
  }

  get listResponseKey() {
    return 'policies';
  }

  get listFilterByProject() {
    return true;
  }

  // get needGetProject() {
  //   return false;
  // }
  updateParamsSortPage = (params, sortKey, sortOrder) => {
    if (sortKey && sortOrder) {
      params.sort_key = sortKey;
      params.sort_dir = sortOrder === 'descend' ? 'desc' : 'asc';
    }
  };

  get paramsFuncPage() {
    return (params) => {
      const { current, ...rest } = params;
      return rest;
    };
  }

  @action
  update({ id }, newObject) {
    const data = {};
    data[`${this.responseKey}`] = newObject;
    return this.submitting(request.put(`${this.getDetailUrl({ id })}`, data));
  }

  async createBandwidthLimitRule({ id }, data) {
    const createPromise = request.post(
      `${this.getDetailUrl({ id })}/bandwidth_limit_rules`,
      { bandwidth_limit_rule: data }
    );
    return this.submitting(createPromise);
  }

  async createDSCPMarkingRule({ id }, data) {
    const createPromise = request.post(
      `${this.getDetailUrl({ id })}/dscp_marking_rules`,
      { dscp_marking_rule: data }
    );
    return this.submitting(createPromise);
  }

  async deleteBandwidthLimitRules({ id }, ruleId) {
    return this.submitting(
      request.delete(
        `${this.getDetailUrl({ id })}/bandwidth_limit_rules/${ruleId}`
      )
    );
  }

  async deleteDSCPMarkingRules({ id }, ruleId) {
    return this.submitting(
      request.delete(
        `${this.getDetailUrl({ id })}/dscp_marking_rules/${ruleId}`
      )
    );
  }

  async updateBandwidthLimitRule({ id }, ruleId, rule) {
    return this.submitting(
      request.put(
        `${this.getDetailUrl({ id })}/bandwidth_limit_rules/${ruleId}`,
        {
          bandwidth_limit_rule: rule,
        }
      )
    );
  }

  async updateDSCPMarkingRule({ id }, ruleId, rule) {
    return this.submitting(
      request.put(`${this.getDetailUrl({ id })}/dscp_marking_rules/${ruleId}`, {
        dscp_marking_rule: rule,
      })
    );
  }

  async detailDidFetch(item, all_projects) {
    if (all_projects) {
      item.project_name =
        (await this.fetchProjectDetail({ id: item.project_id })).project.name ||
        '-';
    }
    return item;
  }

  get needGetProject() {
    return true;
  }
}

const globalQoSPolicyStore = new QoSPolicyStore();

export default globalQoSPolicyStore;