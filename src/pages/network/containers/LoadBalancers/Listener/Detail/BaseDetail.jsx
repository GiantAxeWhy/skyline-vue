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
import Base from 'containers/BaseDetail';
import { HealthMonitorStore } from 'stores/octavia/health-monitor';

@inject('rootStore')
@observer
export default class BaseDetail extends Base {
  componentDidMount() {
    this.fetchData();
    const { default_pool: { healthmonitor_id } = {} } = this.detailData;
    if (healthmonitor_id) {
      this.fetchHealthMonitor();
    }
  }

  get shouldFetchDetail() {
    return true;
  }

  init() {
    this.store = globalListenerStore;
    this.healthmonitorStore = new HealthMonitorStore();
  }

  fetchHealthMonitor = async () => {
    const {
      default_pool: { healthmonitor_id },
    } = this.detailData;
    await this.healthmonitorStore.fetchDetail({ id: healthmonitor_id });
  };

  get leftCards() {
    return [this.PoolInfo, this.healthMonitor];
  }

  get PoolInfo() {
    const { default_pool = {} } = this.detailData || {};
    const { name, protocol, lb_algorithm, description } = default_pool;
    const options = [
      {
        label: t('Name'),
        content: name || '-',
      },
      {
        label: t('Protocol'),
        content: protocol || '-',
      },
      {
        label: t('LB Algorithm'),
        content: lb_algorithm || '-',
      },
      {
        label: t('Description'),
        content: description || '-',
      },
    ];
    return {
      title: t('Pool Info'),
      options,
    };
  }

  get healthMonitor() {
    const healthmonitor = this.healthmonitorStore.detail || {};
    const { admin_state_up, type, delay, timeout, max_retries } = healthmonitor;
    const options = [
      {
        label: t('Enable HealthMonitor'),
        content: admin_state_up ? t('Yes') : t('No'),
      },
      {
        label: t('HealthMonitor Type'),
        content: admin_state_up ? type : '-',
      },
      {
        label: t('Delay Interval(s)'),
        content: admin_state_up ? delay : '-',
      },
      {
        label: t('Timeout(s)'),
        content: admin_state_up ? timeout : '-',
      },
      {
        label: t('Max Retries'),
        content: admin_state_up ? max_retries : '-',
      },
    ];
    if (Object.keys(healthmonitor).length === 0) {
      options[0].content = '-';
    }
    return {
      title: t('HealthMonitor'),
      options,
    };
  }
}
