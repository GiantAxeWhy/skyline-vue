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

import { action } from 'mobx';
import { cinderBase } from 'utils/constants';
import Base from '../base';
import { VolumeStore } from './volume';

export class BackupStore extends Base {
  get module() {
    if (!globals.user) {
      return null;
    }
    return `${globals.user.project.id}/backups`;
  }

  get apiVersion() {
    return cinderBase();
  }

  get responseKey() {
    return 'backup';
  }

  getListDetailUrl = () => `${this.apiVersion}/${this.module}/detail`;

  updateParamsSortPage = (params, sortKey, sortOrder) => {
    if (sortKey && sortOrder) {
      params.sort = `${sortKey}:${sortOrder === 'descend' ? 'desc' : 'asc'}`;
    }
  };

  async detailDidFetch(item) {
    const { volume_id } = item;
    try {
      const volumeStore = new VolumeStore();
      const result = await volumeStore.fetchDetail({ id: volume_id });
      item.volume = result;
      item.volume_name = result.name;
    } catch (e) {}
    return item;
  }

  get paramsFuncPage() {
    return (params) => {
      const { current, all_projects, ...rest } = params;
      return {
        all_tenants: all_projects,
        ...rest,
      };
    };
  }

  @action
  restore(id, data) {
    const body = { restore: data || {} };
    return this.submitting(
      request.post(`${this.getDetailUrl({ id })}/restore`, body)
    );
  }
}
const globalBackupStore = new BackupStore();
export default globalBackupStore;