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

const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const { LocalStorage } = require('./local-storage-mock');

enzyme.configure({ adapter: new Adapter() });

global.t = jest.fn();
global.localStorage = new LocalStorage(jest);
global.sessionStorage = new LocalStorage(jest);
