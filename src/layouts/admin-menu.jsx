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
  CreditCardOutlined,
  GlobalOutlined,
  MonitorOutlined,
  SettingOutlined,
  HomeOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';

const renderMenu = (t) => {
  if (!t) {
    return [];
  }
  const menu = [
    {
      path: '/base/overview-admin',
      name: t('Home'),
      key: 'overviewAdmin',
      icon: <HomeOutlined />,
      level: 0,
      hasBreadcrumb: false,
      hasChildren: false,
    },
    {
      path: '/compute',
      name: t('Compute'),
      key: 'computeAdmin',
      icon: <DesktopOutlined />,
      children: [
        {
          path: '/compute/instance-admin',
          name: t('Instance'),
          key: 'instanceAdmin',
          level: 1,
          children: [
            {
              path: /^\/compute\/instance-admin\/detail\/.[^/]+$/,
              name: t('Instance Detail'),
              key: 'instanceDetailAdmin',
              routePath: '/compute/instance-admin/detail/:id',
              level: 2,
            },
          ],
        },
        {
          path: '/compute/flavor-admin',
          name: t('Flavor'),
          key: 'flavorAdmin',
          level: 1,
          children: [
            {
              path: '/compute/flavor-admin/create',
              name: t('Create Flavor'),
              key: 'flavorCreateAdmin',
              level: 2,
            },
            {
              path: /^\/compute\/flavor-admin\/detail\/[^/]+$/,
              name: t('Flavor Detail'),
              key: 'flavorDetailAdmin',
              routePath: '/compute/flavor-admin/detail/:id',
              level: 2,
            },
          ],
        },
        {
          path: '/compute/server-group-admin',
          name: t('Server Group'),
          key: 'serverGroupAdmin',
          level: 1,
          children: [
            {
              path: /^\/compute\/server-group-admin\/detail\/.[^/]+$/,
              name: t('Server Group Detail'),
              key: 'serverGroupDetailAdmin',
              routePath: '/compute/server-group-admin/detail/:id',
              level: 2,
            },
          ],
        },
        {
          path: '/compute/image-admin',
          name: t('Image'),
          key: 'imageAdmin',
          level: 1,
          children: [
            {
              path: /^\/compute\/image-admin\/detail\/.[^/]+$/,
              name: t('Image Detail'),
              key: 'imageDetailAdmin',
              routePath: '/compute/image-admin/detail/:id',
              level: 2,
            },
            {
              path: '/compute/image-admin/create',
              name: t('Create Image'),
              key: 'imageCreateAdmin',
              level: 2,
            },
          ],
        },
        {
          path: '/compute/hypervisors-admin',
          name: t('Hypervisors'),
          key: 'hypervisorAdmin',
          level: 1,
          children: [
            {
              path: /^\/compute\/hypervisors-admin\/detail\/.[^/]+$/,
              name: t('Hypervisor Detail'),
              key: 'hypervisorDetailAdmin',
              routePath: '/compute/hypervisors-admin/detail/:id',
              level: 2,
            },
          ],
        },
        {
          path: '/compute/aggregates-admin',
          name: t('Host Aggregates'),
          key: 'aggregateAdmin',
          level: 1,
          children: [],
        },
        {
          path: '/compute/baremetal-node-admin',
          name: t('Bare Metal Setting'),
          key: 'baremetalNodeAdmin',
          level: 1,
          children: [
            {
              path: /^\/compute\/baremetal-node-admin\/detail\/.[^/]+$/,
              name: t('Bare Metal Node Detail'),
              key: 'baremetalNodeDetailAdmin',
              routePath: '/compute/baremetal-node-admin/detail/:id',
              level: 2,
            },
            {
              path: /^\/compute\/baremetal-node-admin\/create$/,
              name: t('Create Bare Metal Node'),
              key: 'baremetalNodeCreateAdmin',
              level: 2,
            },
            {
              path: /^\/compute\/baremetal-node-admin\/edit\/.[^/]+$/,
              name: t('Bare Metal Node Edit'),
              key: 'baremetalNodeEditAdmin',
              routePath: '/compute/baremetal-node-admin/detail/:id',
              level: 2,
            },
          ],
        },
      ],
    },
    {
      path: '/storage',
      name: t('Storage'),
      key: 'storageAdmin',
      icon: <DatabaseOutlined />,
      children: [
        {
          path: '/storage/volume-admin',
          name: t('Volume'),
          key: 'volumeAdmin',
          level: 1,
          children: [
            {
              path: /^\/storage\/volume-admin\/detail\/.[^/]+$/,
              name: t('Volume Detail'),
              key: 'volumeDetailAdmin',
              level: 2,
              routePath: '/storage/volume-admin/detail/:id',
            },
          ],
        },
        {
          path: '/storage/backup-admin',
          name: t('Backups'),
          key: 'backupAdmin',
          level: 1,
          children: [
            {
              path: /^\/storage\/backup-admin\/detail\/.[^/]+$/,
              name: t('Backup Detail'),
              key: 'backupDetailAdmin',
              level: 2,
              routePath: '/storage/backup-admin/detail/:id',
            },
          ],
        },
        {
          path: '/storage/snapshot-admin',
          name: t('Volume Snapshot'),
          key: 'snapshotAdmin',
          level: 1,
          children: [
            {
              path: /^\/storage\/snapshot-admin\/detail\/.[^/]+$/,
              name: t('Snapshot Detail'),
              key: 'snapshotDetailAdmin',
              level: 2,
              routePath: '/storage/snapshot-admin/detail/:id',
            },
          ],
        },
        {
          path: '/storage/volume-type-admin',
          name: t('Volume Type'),
          key: 'volumeTypeAdmin',
          level: 1,
          children: [
            {
              path: /^\/storage\/volume-type-admin\/detail\/.[^/]+$/,
              name: t('Volume Type Detail'),
              key: 'volumeTypeDetailAdmin',
              level: 2,
              routePath: '/storage/volume-type-admin/detail/:id',
            },
            {
              path: /^\/storage\/volume-type-admin\/qos\/detail\/.[^/]+$/,
              name: t('QoS Detail'),
              key: 'volumeTypeQosDetailAdmin',
              level: 2,
              routePath: '/storage/volume-type-admin/qos/detail/:id',
            },
          ],
        },
        {
          path: '/storage/storage-admin',
          name: t('Storage Backend'),
          key: 'storageBackendAdmin',
          level: 1,
          children: [],
        },
      ],
    },
    {
      path: '/network',
      name: t('Network'),
      key: '/networkAdmin',
      icon: <GlobalOutlined />,
      children: [
        {
          path: '/network/networks-admin',
          name: t('Networks'),
          key: 'networkAdmin',
          level: 1,
          children: [
            {
              path: /^\/network\/networks-admin\/detail\/.[^/]+$/,
              name: t('Network Detail'),
              key: 'networkDetailAdmin',
              level: 2,
              routePath: '/network/networks-admin/detail/:id',
            },
          ],
        },
        {
          path: '/network/virtual_adapter_admin',
          name: t('Virtual Adapter'),
          key: 'virtualAdapterAdmin',
          level: 1,
          children: [
            {
              path: /^\/network\/virtual_adapter_admin\/detail\/.[^/]+$/,
              name: t('Virtual Adapter Detail'),
              key: 'virtualAdapterDetailAdmin',
              level: 2,
              routePath: '/network/virtual_adapter_admin/detail/:id',
            },
          ],
        },
        {
          path: '/network/qos-policy-admin',
          name: t('QoS Policy'),
          key: 'networkQosAdmin',
          level: 1,
          children: [
            {
              path: /^\/network\/qos-policy-admin\/detail\/.[^/]+$/,
              name: t('QoS Policy Detail'),
              key: 'networkQosDetailAdmin',
              level: 2,
              routePath: '/network/qos-policy-admin/detail/:id',
            },
          ],
        },
        {
          path: '/network/router-admin',
          name: t('Routers'),
          key: 'routerAdmin',
          level: 1,
          children: [
            {
              path: /^\/network\/router-admin\/detail\/.[^/]+$/,
              name: t('Router Detail'),
              key: 'routerDetailAdmin',
              level: 2,
              routePath: '/network/router-admin/detail/:id',
            },
            {
              path: /^\/network\/router-admin\/.[^/]+\/port\/.[^/]+$/,
              name: t('Port Detail'),
              key: 'routerPortDetailAdmin',
              level: 2,
              routePath: '/network/router-admin/:routerId/port/:id',
            },
          ],
        },
        {
          path: '/network/floatingip-admin',
          name: t('Floating IPs'),
          key: 'fipAdmin',
          level: 1,
          children: [
            {
              path: /^\/network\/floatingip-admin\/detail\/.[^/]+$/,
              name: t('Floating Ip Detail'),
              key: 'fipDetailAdmin',
              level: 2,
              routePath: '/network/floatingip-admin/detail/:id',
            },
          ],
        },
        {
          path: '/network/load-balancers-admin',
          name: t('Load Balancers'),
          key: 'lbAdmin',
          level: 1,
          children: [
            {
              path: /^\/network\/load-balancers-admin\/detail\/.[^/]+$/,
              name: t('Load Balancer Detail'),
              key: 'lbDetailAdmin',
              level: 2,
              routePath: '/network/load-balancers-admin/detail/:id',
            },
            {
              path: /^\/network\/load-balancers-admin\/.[^/]+\/listener\/.[^/]+$/,
              name: t('Listener Detail'),
              key: 'lbListenerDetailAdmin',
              level: 2,
              routePath:
                '/network/load-balancers-admin/:loadBalancerId/listener/:id',
            },
          ],
        },
        {
          path: '/network/vpn-admin',
          name: t('VPN'),
          key: 'vpnAdmin',
          level: 1,
          children: [
            {
              path: /^\/network\/ipsec-site-connection-admin\/detail\/.[^/]+$/,
              name: t('IPsec site connection Detail'),
              key: 'ipsecDetailAdmin',
              level: 2,
              routePath: '/network/ipsec-site-connection-admin/detail/:id',
            },
          ],
        },
        {
          path: '/network/security-group-admin',
          name: t('Security Groups'),
          key: 'securityGroupAdmin',
          level: 1,
          children: [
            {
              path: /^\/network\/security-group-admin\/detail\/.[^/]+$/,
              name: t('Security Group Detail'),
              key: 'securityGroupDetailAdmin',
              level: 2,
              routePath: '/network/security-group-admin/detail/:id',
            },
          ],
        },
      ],
    },
    {
      path: '/identity',
      name: t('Identity'),
      key: '/identity',
      icon: <CreditCardOutlined />,
      children: [
        {
          path: '/identity/domain-admin',
          name: t('Domains'),
          key: 'domainAdmin',
          level: 1,
          children: [
            {
              path: '/identity/domain-admin/create',
              name: t('Create Domain'),
              key: 'domainCreateAdmin',
              level: 2,
            },
            {
              path: /^\/identity\/domain-admin\/edit\/.[^/]+$/,
              name: t('Domain Edit'),
              key: 'domainEditAdmin',
              level: 2,
              routePath: '/identity/domain-admin/edit/:id',
            },
            {
              path: /^\/identity\/domain-admin\/detail\/.[^/]+$/,
              name: t('Domain Detail'),
              key: 'domainDetailAdmin',
              level: 2,
              routePath: '/identity/domain-admin/detail/:id',
            },
          ],
        },
        {
          path: '/identity/project-admin',
          name: t('Projects'),
          key: 'projectAdmin',
          level: 1,
          children: [
            {
              path: /^\/identity\/project-admin\/detail\/.[^/]+$/,
              name: t('Project Detail'),
              key: 'projectDetailAdmin',
              level: 2,
              routePath: '/identity/project-admin/detail/:id',
            },
            {
              path: '/identity/project-admin/create',
              name: t('Create Project'),
              key: 'projectCreateAdmin',
              level: 2,
            },
            {
              path: /^\/identity\/project-admin\/edit\/.[^/]+$/,
              name: t('Edit Project'),
              key: 'projectEditAdmin',
              level: 2,
              routePath: '/identity/project-admin/edit/:id',
            },
          ],
        },
        {
          path: '/identity/user-admin',
          name: t('Users'),
          key: 'userAdmin',
          level: 1,
          children: [
            {
              path: /^\/identity\/user-admin\/detail\/.[^/]+$/,
              name: t('User Detail'),
              key: 'userDetailAdmin',
              level: 2,
              routePath: '/identity/user-admin/detail/:id',
            },
            {
              path: '/identity/user-admin/create',
              name: t('Create User'),
              key: 'userCreateAdmin',
              level: 2,
            },
            {
              path: /^\/identity\/user-admin\/edit\/.[^/]+$/,
              name: t('User Edit'),
              key: 'userEditAdmin',
              level: 2,
              routePath: '/identity/user-admin/edit/:id',
            },
          ],
        },
        {
          path: '/identity/user-group-admin',
          name: t('User Groups'),
          key: 'userGroupAdmin',
          level: 1,
          children: [
            {
              path: /^\/identity\/user-group-admin\/detail\/.[^/]+$/,
              name: t('User Group Detail'),
              key: 'userGroupDetailAdmin',
              level: 2,
              routePath: '/identity/user-group-admin/detail/:id',
            },
            {
              path: '/identity/user-group-admin/create',
              name: t('Create User Group'),
              key: 'userGroupCreateAdmin',
              level: 2,
            },
            {
              path: /^\/identity\/user-group-admin\/edit\/.[^/]+$/,
              name: t('Edit User Group'),
              key: 'userGroupEditAdmin',
              level: 2,
              routePath: '/identity/user-group-admin/edit/:id',
            },
          ],
        },
        {
          path: '/identity/role-admin',
          name: t('Roles'),
          key: 'roleAdmin',
          level: 1,
          children: [
            {
              path: /^\/identity\/role-admin\/detail\/.[^/]+$/,
              name: t('Role Detail'),
              key: 'roleDetailAdmin',
              level: 2,
              routePath: '/identity/role-admin/detail/:id',
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
    //       path: '/management/recycle-bin-admin',
    //       name: t('Recycle Bin'),
    //       key: 'recycleBinAdmin',
    //       level: 1,
    //       children: [
    //         {
    //           path: /^\/management\/recycle-bin-admin\/detail\/.[^/]+$/,
    //           name: t('Instance Detail'),
    //           key: 'recycleBinDetailAdmin',
    //           level: 2,
    //           routePath: '/management/recycle-bin-admin/detail/:id',
    //         },
    //       ],
    //     },
    //   ],
    // },
    {
      path: '/heat',
      name: t('Orchestration'),
      key: 'heatAdmin',
      icon: <AppstoreOutlined />,
      children: [
        {
          path: '/heat/stack-admin',
          name: t('Stacks'),
          key: 'stackAdmin',
          level: 1,
          children: [
            {
              path: /^\/heat\/stack-admin\/detail\/.[^/]+\/.[^/]+$/,
              name: t('Stack Detail'),
              key: 'stackDetailAdmin',
              level: 2,
              routePath: '/heat/stack-admin/detail/:id/:name',
            },
            {
              path: '/heat/stack-admin/create',
              name: t('Create Stack'),
              key: 'stackCreateAdmin',
              level: 2,
            },
            {
              path: /^\/heat\/stack-admin\/edit\/.[^/]+\/.[^/]+$/,
              name: t('Update Template'),
              key: 'stackEditAdmin',
              level: 2,
              routePath: '/heat/stack-admin/edit/:id/:name',
            },
          ],
        },
      ],
    },
    {
      path: '/monitor-center',
      name: t('Monitor Center'),
      key: '/monitorCenterAdmin',
      icon: <MonitorOutlined />,
      children: [
        {
          path: '/monitor-center/overview-admin',
          name: t('Monitor Overview'),
          key: 'monitorOverviewAdmin',
          level: 1,
          children: [],
          hasBreadcrumb: true,
        },
        {
          path: '/monitor-center/physical-node-admin',
          name: t('Physical Node'),
          key: 'monitorPhysicalNodeAdmin',
          level: 1,
          children: [],
          hasBreadcrumb: true,
        },
        {
          path: '/monitor-center/storage-cluster-admin',
          name: t('Storage Cluster'),
          key: 'monitorStorageClusterAdmin',
          level: 1,
          children: [],
          hasBreadcrumb: true,
        },
        {
          path: '/monitor-center/openstack-service-admin',
          name: t('OpenStack Service'),
          key: 'monitorOpenstackServiceAdmin',
          level: 1,
          children: [],
          hasBreadcrumb: true,
        },
      ],
    },
    {
      path: '/configuration-admin',
      name: t('Global Setting'),
      key: 'configurationAdmin',
      icon: <SettingOutlined />,
      children: [
        {
          path: '/configuration-admin/info',
          name: t('System Info'),
          key: 'systemInfoAdmin',
          level: 1,
          children: [
            {
              path: /^\/configuration-admin\/neutron\/detail\/.[^/]+$/,
              name: t('Neutron Agent Detail'),
              key: 'neutronAgentDetailAdmin',
              level: 2,
              routePath: '/configuration-admin/neutron/detail/:id',
            },
          ],
        },
        {
          path: '/configuration-admin/setting',
          name: t('System Config'),
          key: 'settingAdmin',
          level: 1,
        },
        {
          path: '/configuration-admin/metadata',
          name: t('Metadata Definitions'),
          key: 'metadataAdmin',
          level: 1,
          children: [
            {
              path: /^\/configuration-admin\/metadata\/detail\/.[^/]+$/,
              name: t('Metadata Detail'),
              key: 'metadataDetailAdmin',
              level: 2,
              routePath: '/configuration-admin/metadata/detail/:id',
            },
          ],
        },
      ],
    },
  ];
  return menu;
};

export default renderMenu;
