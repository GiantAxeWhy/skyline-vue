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
import { FormAction } from 'containers/Action';
import globalImageStore from 'stores/glance/image';
import {
  imageOS,
  imageUsage,
  imageFormats,
  imageFormatsConsole,
  imageVisibility,
} from 'resources/image';
import { cpuPolicyList, cpuThreadPolicyList } from 'resources/flavor';
import { NoSetValue, getOptionsWithNoset, getOptions } from 'utils/index';
import { ProjectStore } from 'stores/keystone/project';
import { projectTableOptions } from 'resources/project';

export class CreateForm extends FormAction {
  init() {
    this.store = globalImageStore;
    this.projectStore = new ProjectStore();
    this.getProjects();
  }

  static id = 'image-create';

  static title = t('Create Image');

  static path = (_, containerProp) => {
    const { isAdminPage } = containerProp;
    return isAdminPage
      ? '/compute/image-admin/create'
      : '/compute/image/create';
  };

  get listUrl() {
    return this.getRoutePath('image');
  }

  get name() {
    return t('Create image');
  }

  get labelCol() {
    return {
      xs: { span: 6 },
      sm: { span: 5 },
    };
  }

  get hasRequestCancelCallback() {
    return true;
  }

  static policy = ['add_image', 'upload_image'];

  static allowed() {
    return Promise.resolve(true);
  }

  getProjects() {
    if (this.isAdminPage) {
      this.projectStore.fetchList();
    }
  }

  get projects() {
    return this.projectStore.list.data || [];
  }

  get defaultValue() {
    return {
      hw_qemu_guest_agent: 'yes',
      usage_type: 'common',
      visibility: this.isAdminPage ? 'public' : false,
      hw_cpu_policy: NoSetValue,
      hw_cpu_thread_policy: NoSetValue,
    };
  }

  get imageFormats() {
    if (this.isAdminPage) {
      return imageFormats;
    }
    return imageFormatsConsole;
  }

  get formatList() {
    // todo: filter formats by settings
    return Object.keys(this.imageFormats).map((key) => ({
      value: key,
      label: this.imageFormats[key],
    }));
  }

  get osList() {
    return Object.keys(imageOS).map((key) => ({
      value: key,
      label: imageOS[key],
    }));
  }

  get yesNoList() {
    return [
      { value: 'yes', label: t('Yes') },
      { value: 'no', label: t('No') },
    ];
  }

  get useTypeList() {
    return Object.keys(imageUsage)
      .map((key) => ({
        value: key,
        label: imageUsage[key],
      }))
      .filter((it) => {
        if (!this.isAdminPage) {
          return it.value === 'common' || it.value === 'ironic';
        }
        return true;
      });
  }

  checkFileType = (file) => {
    const types = Object.keys(this.imageFormats);
    const { name } = file;
    const suffix = name.substring(name.lastIndexOf('.') + 1);
    const suffixHasType = types.some((it) => suffix.toLowerCase().includes(it));
    return suffixHasType;
  };

  validateFile = (rule, value) => {
    if (!value) {
      return Promise.reject(t('Please select a file'));
    }
    if (!this.checkFileType(value)) {
      return Promise.reject(
        t('Please select a file with the suffix {types}', {
          types: Object.keys(this.imageFormats).join(','),
        })
      );
    }
    return Promise.resolve();
  };

  get formItems() {
    const { more, visibility } = this.state;
    const isShare = this.isAdminPage && visibility === 'shared';
    return [
      {
        name: 'name',
        label: t('Name'),
        type: 'input-name',
        isImage: true,
        required: true,
      },
      {
        name: 'owner',
        label: t('Owned Project'),
        type: 'select-table',
        required: this.isAdminPage,
        hidden: !this.isAdminPage,
        data: this.projects,
        isLoading: this.projectStore.list.isLoading,
        ...projectTableOptions,
      },
      {
        name: 'file',
        label: t('File'),
        type: 'upload',
        required: true,
        validator: this.validateFile,
      },
      {
        name: 'disk_format',
        label: t('Format'),
        type: 'select',
        options: this.formatList,
        required: true,
      },
      {
        name: 'os_distro',
        label: t('OS'),
        type: 'select',
        options: this.osList,
        required: true,
      },
      {
        name: 'os_version',
        label: t('OS Version'),
        type: 'input',
        required: true,
      },
      {
        name: 'os_admin_user',
        label: t('OS Admin'),
        type: 'input',
        required: true,
        extra: t(
          'In general, administrator for Windows,root for Linux, please fill by image uploading.'
        ),
      },
      {
        name: 'min_disk',
        label: t('Min System Disk(GB)'),
        type: 'input-int',
        min: 0,
        max: 500,
      },
      {
        name: 'min_ram',
        label: t('Min Memory(GB)'),
        type: 'input-int',
        min: 0,
        max: 500,
      },
      {
        name: 'visibility',
        label: t('Visibility'),
        type: 'radio',
        options: getOptions(imageVisibility),
        hidden: !this.isAdminPage,
      },
      {
        name: 'members',
        label: t('Project'),
        type: 'select-table',
        required: isShare,
        isMulti: true,
        hidden: !isShare,
        data: this.projects,
        isLoading: this.projectStore.list.isLoading,
        ...projectTableOptions,
      },
      {
        name: 'protected',
        label: t('Protected'),
        type: 'check',
        content: t('Protected'),
      },
      {
        name: 'usage_type',
        label: t('Usage Type'),
        type: 'select',
        options: this.useTypeList,
      },
      {
        name: 'description',
        label: t('Description'),
        type: 'textarea',
        maxLength: 255,
      },
      {
        name: 'more',
        label: t('Advanced Options'),
        type: 'more',
      },
      {
        name: 'hw_qemu_guest_agent',
        label: t('qemu_guest_agent enabled'),
        type: 'radio',
        onlyRadio: true,
        options: this.yesNoList,
        tip: t(
          'It is recommended to install and use this agent. The instance created with this image can be used to modify the password (qemu_guest_agent needs to be installed when creating the image).'
        ),
        hidden: !more,
      },
      {
        name: 'hw_cpu_policy',
        label: t('CPU Policy'),
        type: 'select',
        options: getOptionsWithNoset(cpuPolicyList),
        hidden: !more,
      },
      {
        name: 'hw_cpu_thread_policy',
        label: t('CPU Thread Policy'),
        type: 'select',
        options: getOptionsWithNoset(cpuThreadPolicyList),
        hidden: !more,
      },
    ];
  }

  onSubmit = (values) => {
    const {
      file,
      visibility,
      more,
      hw_cpu_policy,
      hw_cpu_thread_policy,
      min_ram,
      owner,
      usage_type = 'common',
      members,
      ...rest
    } = values;
    const body = {
      visibility: visibility || 'private',
      container_format: 'bare',
      usage_type,
      ...rest,
    };
    if (min_ram) {
      body.min_ram = min_ram * 1024;
    }
    if (hw_cpu_policy !== NoSetValue) {
      body.hw_cpu_policy = hw_cpu_policy;
    }
    if (hw_cpu_thread_policy !== NoSetValue) {
      body.hw_cpu_thread_policy = hw_cpu_thread_policy;
    }
    if (this.isAdminPage) {
      body.owner = owner.selectedRowKeys[0];
    }
    const mems = visibility === 'shared' ? members.selectedRowKeys : [];
    const config = this.getUploadRequestConf();
    return this.store.create(body, file, mems, config);
  };
}

export default inject('rootStore')(observer(CreateForm));
