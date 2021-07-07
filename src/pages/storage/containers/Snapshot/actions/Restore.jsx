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
import globalVolumeStore from 'stores/cinder/volume';

export default class RestoreAction extends ConfirmAction {
  get id() {
    return 'restore';
  }

  get title() {
    return t('Restore');
  }

  get buttonText() {
    return t('Restore');
  }

  get actionName() {
    return t('Restore');
  }

  policy = 'volume:create';

  onSubmit = () => {
    const { volume_id: id, id: snapshot_id } = this.item;
    return globalVolumeStore.revert(id, { snapshot_id });
  };
}