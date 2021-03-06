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
import {
  DesktopOutlined,
  DatabaseOutlined,
  GlobalOutlined,
  // ToolOutlined,
  HomeOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';

const renderMenu = (t) => {
  if (!t) {
    return [];
  }
  const menu = [
    {
      path: '/base/overview',
      name: t('Home'),
      key: 'overview',
      icon: <HomeOutlined />,
      level: 0,
      hasBreadcrumb: false,
      hasChildren: false,
    },
    {
      path: '/compute',
      name: t('Compute'),
      key: 'compute',
      icon: <DesktopOutlined />,
      children: [
        {
          path: '/compute/instance',
          name: t('Instance'),
          key: 'instance',
          level: 1,
          children: [
            {
              path: /^\/compute\/instance\/detail\/.[^/]+$/,
              name: t('Instance Detail'),
              key: 'instanceDetail',
              level: 2,
              routePath: '/compute/instance/detail/:id',
            },
            {
              path: '/compute/instance/create',
              name: t('Create Instance'),
              key: 'instanceCreate',
              level: 2,
            },
            {
              path: '/compute/ironic-instance/create',
              name: t('Create Ironic Instance'),
              key: 'ironicCreate',
              level: 2,
            },
          ],
        },
        {
          path: '/compute/flavor',
          name: t('Flavor'),
          key: 'flavor',
          level: 1,
          children: [
            {
              path: /^\/compute\/flavor\/detail\/.[^/]+$/,
              name: t('Flavor Detail'),
              key: 'flavorDetail',
              level: 2,
              routePath: '/compute/flavor/detail/:id',
            },
          ],
        },
        {
          path: '/compute/server-group',
          name: t('Server Group'),
          key: 'serverGroup',
          level: 1,
          children: [
            {
              path: /^\/compute\/server-group\/detail\/.[^/]+$/,
              name: t('Server Group Detail'),
              key: 'serverGroupDetail',
              level: 2,
              routePath: '/compute/server-group/detail/:id',
            },
          ],
        },
        {
          path: '/compute/image',
          name: t('Image'),
          key: 'image',
          level: 1,
          children: [
            {
              path: /^\/compute\/image\/detail\/.[^/]+$/,
              name: t('Image Detail'),
              key: 'imageDetail',
              level: 2,
              routePath: '/compute/image/detail/:id',
            },
            {
              path: '/compute/image/create',
              name: t('Create Image'),
              key: 'imageCreate',
              level: 2,
            },
          ],
        },
        {
          path: '/compute/keypair',
          name: t('Key Pairs'),
          key: 'keypair',
          level: 1,
          children: [
            {
              path: /^\/compute\/keypair\/detail\/.[^/]*$/,
              name: t('Keypair Detail'),
              key: 'keypairDetail',
              level: 2,
              routePath: '/compute/keypair/detail/:id',
            },
          ],
        },
      ],
    },
    {
      path: '/storage',
      name: t('Storage'),
      key: 'storage',
      icon: <DatabaseOutlined />,
      children: [
        {
          path: '/storage/volume',
          name: t('Volume'),
          key: 'volume',
          level: 1,
          children: [
            {
              path: '/storage/volume/create',
              name: t('Create Volume'),
              key: 'volumeCreate',
              level: 2,
            },
            {
              path: /^\/storage\/volume\/detail\/.[^/]+$/,
              name: t('Volume Detail'),
              key: 'volumeDetail',
              level: 2,
              routePath: '/storage/volume/detail/:id',
            },
          ],
        },
        {
          path: '/storage/backup',
          name: t('Backups'),
          key: 'backup',
          level: 1,
          children: [
            {
              path: /^\/storage\/backup\/detail\/.[^/]+$/,
              name: t('Backup Detail'),
              key: 'backupDetail',
              level: 2,
              routePath: '/storage/backup/detail/:id',
            },
          ],
        },
        {
          path: '/storage/snapshot',
          name: t('Volume Snapshot'),
          key: 'snapshot',
          level: 1,
          children: [
            {
              path: /^\/storage\/snapshot\/detail\/.[^/]+$/,
              name: t('Snapshot Detail'),
              key: 'snapshotDetail',
              level: 2,
              routePath: '/storage/snapshot/detail/:id',
            },
          ],
        },
        {
          path: '/storage/container',
          name: t('Object Storage'),
          key: 'container',
          level: 1,
          children: [
            {
              path: /^\/storage\/container\/detail\/[^/]+$/,
              name: t('Container Detail'),
              key: 'containerDetail',
              level: 2,
              routePath: '/storage/container/detail/:id',
            },
            {
              path: /^\/storage\/container\/detail\/[^/]+\/.+$/,
              name: t('Folder Detail'),
              key: 'folderDetail',
              level: 2,
              routePath: '/storage/container/detail/:container/:folder',
            },
          ],
        },
      ],
    },
    {
      path: '/network',
      name: t('Network'),
      key: '/network',
      icon: <GlobalOutlined />,
      children: [
        {
          path: '/network/networks',
          name: t('Networks'),
          key: 'network',
          level: 1,
          children: [
            {
              path: /^\/network\/networks\/detail\/.[^/]+$/,
              name: t('Network Detail'),
              key: 'networkDetail',
              level: 2,
              routePath: '/network/networks/detail/:id',
            },
          ],
        },
        {
          path: '/network/virtual_adapter',
          name: t('Virtual Adapter'),
          key: 'virtualAdapter',
          level: 1,
          children: [
            {
              path: /^\/network\/virtual_adapter\/detail\/.[^/]+$/,
              name: t('Virtual Adapter Detail'),
              key: 'virtualAdapterDetail',
              level: 2,
              routePath: '/network/virtual_adapter/detail/:id',
            },
          ],
        },
        {
          path: '/network/qos-policy',
          name: t('QoS Policy'),
          key: 'networkQos',
          level: 1,
          children: [
            {
              path: /^\/network\/qos-policy\/detail\/.[^/]+$/,
              name: t('QoS Policy Detail'),
              key: 'networkQosDetail',
              level: 2,
              routePath: '/network/qos-policy/detail/:id',
            },
          ],
        },
        {
          path: '/network/router',
          name: t('Routers'),
          key: 'router',
          level: 1,
          children: [
            {
              path: /^\/network\/router\/detail\/.[^/]+$/,
              name: t('Router Detail'),
              key: 'routerDetail',
              level: 2,
              routePath: '/network/router/detail/:id',
            },
            {
              path: /^\/network\/router\/.[^/]+\/port\/.[^/]+$/,
              name: t('Port Detail'),
              key: 'routerPortDetail',
              level: 2,
              routePath: '/network/router/:routerId/port/:id',
            },
          ],
        },
        {
          path: '/network/floatingip',
          name: t('Floating IPs'),
          key: 'fip',
          level: 1,
          children: [
            {
              path: /^\/network\/floatingip\/detail\/.[^/]+$/,
              name: t('Floating Ip Detail'),
              key: 'fipDetail',
              level: 2,
              routePath: '/network/floatingip/detail/:id',
            },
          ],
        },
        {
          path: '/network/topo',
          name: t('Topology'),
          key: 'networkTopo',
          level: 1,
          children: [],
        },
        {
          path: '/network/load-balancers',
          name: t('Load Balancers'),
          key: 'lb',
          level: 1,
          children: [
            {
              path: '/network/load-balancers/create',
              name: t('Create Loadbalancer'),
              key: 'lbCreate',
              level: 2,
            },
            {
              path: /^\/network\/load-balancers\/detail\/.[^/]+$/,
              name: t('Load Balancer Detail'),
              key: 'lbDetail',
              level: 2,
              routePath: '/network/load-balancers/detail/:id',
            },
            {
              path: /^\/network\/load-balancers\/.[^/]+\/listener\/.[^/]+$/,
              name: t('Listener Detail'),
              key: 'lbListenerDetail',
              level: 2,
              routePath: '/network/load-balancers/:loadBalancerId/listener/:id',
            },
          ],
        },
        {
          path: '/network/vpn',
          name: t('VPN'),
          key: 'vpn',
          level: 1,
          children: [
            {
              path: /^\/network\/ipsec-site-connection\/detail\/.[^/]+$/,
              name: t('IPsec site connection Detail'),
              key: 'ipsecDetail',
              level: 2,
              routePath: '/network/ipsec-site-connection/detail/:id',
            },
          ],
        },
        {
          path: '/network/security-group',
          name: t('Security Groups'),
          key: 'securityGroup',
          level: 1,
          children: [
            {
              path: /^\/network\/security-group\/detail\/.[^/]+$/,
              name: t('Security Group Detail'),
              key: 'securityGroupDetail',
              level: 2,
              routePath: '/network/security-group/detail/:id',
            },
          ],
        },
      ],
    },
    // {
    //   path: '/management',
    //   name: t('Maintenance'),
    //   key: '/management',
    //   icon: <ToolOutlined />,
    //   children: [
    //     {
    //       path: '/management/recycle-bin',
    //       name: t('Recycle Bin'),
    //       key: 'recycleBin',
    //       level: 1,
    //       children: [
    //         {
    //           path: /^\/management\/recycle-bin\/detail\/.[^/]+$/,
    //           name: t('Instance Detail'),
    //           key: 'recycleBinDetail',
    //           level: 2,
    //           routePath: '/management/recycle-bin/detail/:id',
    //         },
    //       ],
    //     },
    //   ],
    // },
    {
      path: '/heat',
      name: t('Orchestration'),
      key: 'heat',
      icon: <AppstoreOutlined />,
      children: [
        {
          path: '/heat/stack',
          name: t('Stacks'),
          key: 'stack',
          level: 1,
          children: [
            {
              path: /^\/heat\/stack\/detail\/.[^/]+\/.[^/]+$/,
              name: t('Stack Detail'),
              key: 'stackDetail',
              level: 2,
              routePath: '/heat/stack/detail/:id/:name',
            },
            {
              path: '/heat/stack/create',
              name: t('Create Stack'),
              key: 'stackCreate',
              level: 2,
            },
            {
              path: /^\/heat\/stack\/edit\/.[^/]+\/.[^/]+$/,
              name: t('Update Template'),
              key: 'stackEdit',
              level: 2,
              routePath: '/heat/stack/edit/:id/:name',
            },
          ],
        },
      ],
    },
  ];
  return menu;
};

export default renderMenu;
