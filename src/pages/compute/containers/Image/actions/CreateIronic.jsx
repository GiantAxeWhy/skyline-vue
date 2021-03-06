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
import CreateInstance from 'pages/compute/containers/Instance/actions/StepCreate';
import { canImageCreateIronicInstance } from 'resources/image';
import { canCreateIronicByEndpoint } from 'resources/instance';

export class CreateIronic extends CreateInstance {
  static id = 'ironic-create';

  static title = t('Create Ironic Instance');

  static path(item) {
    return `/compute/ironic-instance/create?image=${item.id}&os_distro=${item.os_distro}`;
  }

  static policy = 'os_compute_api:servers:create:trusted_certs';

  static allowed(item, containerProps) {
    const { isAdminPage } = containerProps;
    return Promise.resolve(
      !isAdminPage &&
        canCreateIronicByEndpoint() &&
        canImageCreateIronicInstance(item)
    );
  }
}

export default inject('rootStore')(observer(CreateIronic));
