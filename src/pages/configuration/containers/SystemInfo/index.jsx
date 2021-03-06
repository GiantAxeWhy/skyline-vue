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
import Base from 'containers/TabList';
import Catalog from './Catalog';
import ComputeService from './ComputeService';
import CinderService from './CinderService';
import NeutronAgent from './NeutronAgent';
import HeatService from './HeatService';

@inject('rootStore')
@observer
export default class Service extends Base {
  get tabs() {
    const tabs = [
      {
        title: t('Services'),
        key: 'catalog',
        component: Catalog,
      },
      {
        title: t('Compute Services'),
        key: 'computeServices',
        component: ComputeService,
      },
      {
        title: t('Block Storage Services'),
        key: 'cinderService',
        component: CinderService,
      },
      {
        title: t('Neutron Agents'),
        key: 'neutronAgent',
        component: NeutronAgent,
      },
      {
        title: t('Orchestration Services'),
        key: 'heatService',
        component: HeatService,
      },
    ];
    return tabs;
  }
}
