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

import { get, isArray } from 'lodash';
import moment from 'moment';
import { getStrFromTimestamp, getTimestamp } from 'utils/time';
import client from 'client';
import metricDict from '../metricDict';

// 给query串增加数据，如hostname等。
export function getRequestUrl(url, params, finalFormatFunc, baseParams) {
  const totalParams = { ...params, ...baseParams };
  return finalFormatFunc(
    Object.keys(totalParams).length === 0 ? url : addParams(url, totalParams)
  );
}

export function addParams(query, params) {
  let addStr = '';
  Object.keys(params).forEach((key) => {
    if (isArray(params[key])) {
      addStr += `${key}=~"${params[key].join('|')}",`;
    } else {
      addStr += `${key}="${params[key]}",`;
    }
  });
  return `${query}{${addStr.substring(0, addStr.length - 1)}}`;
}

export function fetchPrometheus(
  query,
  getRangeType = 'range',
  currentRange,
  interval
) {
  if (getRangeType === 'current') {
    return client.skyline.query.list({
      query,
    });
  }
  if (getRangeType === 'range') {
    return client.skyline.queryRange.list({
      query,
      start: getTimestamp(currentRange[0]),
      end: getTimestamp(currentRange[1]),
      step: interval,
    });
  }
}

export function getBaseQuery(metricKey) {
  let query = metricDict;
  metricKey.split('.').forEach((key) => {
    query = query[key];
  });
  return query;
}

export const ChartType = {
  ONELINE: 'oneline',
  MULTILINE: 'multiline',
  ONELINEDEVICES: 'oneline_devices',
  MULTILINEDEVICES: 'multiline_devices',
};

export const getXScale = (timeRange) => {
  const rangeMinutes = moment(timeRange[1]).diff(
    moment(timeRange[0]),
    'minutes',
    true
  );
  const index =
    (rangeMinutes > 20160 && 4) ||
    (rangeMinutes > 10080 && rangeMinutes <= 20160 && 3) ||
    (rangeMinutes > 1440 && rangeMinutes <= 10080 && 2) ||
    (rangeMinutes > 60 && rangeMinutes <= 1440 && 1) ||
    (rangeMinutes > 0 && rangeMinutes <= 60 && 0) ||
    0;
  return {
    type: 'time',
    ...maskAndTicketCountDict[index],
  };
};

export const baseReturnFunc = (d) => d;

export const getPromises = (metricKey) => {
  const queries = get(metricDict, metricKey);
  return queries.url.map((u, idx) => {
    // 按顺序取聚合函数
    const finalFormatFunc =
      (queries.finalFormatFunc || [])[idx] || baseReturnFunc;
    // 按顺序获取基础参数
    const baseParams = (queries.baseParams || [])[idx] || {};
    const finalUrl = getRequestUrl(u, {}, finalFormatFunc, baseParams);
    return fetchPrometheus(finalUrl, 'current');
  });
};

const maskAndTicketCountDict = [
  {
    // 一小时内的
    // mask: 'HH:mm:ss',
    formatter: (d) => getStrFromTimestamp(d, 'HH:mm:ss'),
    ticketCount: 6,
  },
  {
    // 一天内的
    // mask: 'HH:mm:ss',
    formatter: (d) => getStrFromTimestamp(d, 'HH:mm:ss'),
    ticketCount: 6,
  },
  {
    // 7天内的
    // mask: 'MM-DD HH:mm',
    formatter: (d) => getStrFromTimestamp(d, 'MM-DD HH:mm'),
    ticketCount: 3,
  },
  {
    // 14天内的
    // mask: 'MM-DD HH:mm',
    formatter: (d) => getStrFromTimestamp(d, 'MM-DD HH:mm'),
    ticketCount: 6,
  },
  {
    // 以上
    // mask: 'MM-DD HH:mm',
    formatter: (d) => getStrFromTimestamp(d, 'MM-DD HH:mm'),
    ticketCount: 6,
  },
];

export const range2IntervalsDict = [
  [
    {
      text: t('10s'),
      value: 10,
    },
    {
      text: t('1min'),
      value: 60,
    },
    {
      text: t('5min'),
      value: 300,
    },
  ],
  [
    {
      text: t('1min'),
      value: 60,
    },
    {
      text: t('5min'),
      value: 300,
    },
    {
      text: t('1H'),
      value: 3600,
    },
  ],
  [
    {
      text: t('1H'),
      value: 3600,
    },
    {
      text: t('1D'),
      value: 86400,
    },
  ],
  [
    {
      text: t('1D'),
      value: 86400,
    },
  ],
];

export const getRange = (type) =>
  ({
    // last 2 weeks
    3: [moment().subtract(2, 'weeks'), moment()],
    // last 7 days
    2: [moment().subtract(1, 'weeks'), moment()],
    // last day
    1: [moment().subtract(1, 'days'), moment()],
    // last hour
    0: [moment().subtract(1, 'hours'), moment()],
  }[type] || [moment().subtract(1, 'hours'), moment()]);

export function getInterval(currentRange) {
  const start = (currentRange || getRange(0))[0];
  const end = (currentRange || getRange(0))[1];
  const rangeMinutes = end.diff(start, 'minutes');
  const index =
    (rangeMinutes > 44640 && 3) ||
    (rangeMinutes > 1440 && rangeMinutes <= 44640 && 2) ||
    (rangeMinutes > 60 && rangeMinutes <= 1440 && 1) ||
    (rangeMinutes > 0 && rangeMinutes <= 60 && 0) ||
    0;
  return range2IntervalsDict[index];
}

// 1 hour ago - now
export const defaultOneHourAgo = [moment().subtract(1, 'hours'), moment()];
