"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = __importDefault(require("fs-extra"));
var listr_1 = __importDefault(require("listr"));
var path_1 = __importDefault(require("path"));
var _1 = require(".");
var installhelper_1 = require("./helpers/installhelper");
function tasks(answers) {
    var _this = this;
    return new listr_1.default([
        {
            title: 'Initialize Project',
            task: function () {
                return new listr_1.default([
                    {
                        title: 'Initialize package.json',
                        task: function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (answers.electron) {
                                            _1.defaultpackage.homepage = './';
                                            _1.defaultpackage.scripts.electron = 'electron .';
                                            _1.defaultpackage.scripts.build = 'rescripts build';
                                            _1.defaultpackage.scripts.test = 'rescripts test';
                                            _1.defaultpackage.scripts.postinstall =
                                                'electron-builder install-app-deps';
                                            _1.defaultpackage.author = {
                                                name: 'Default Author',
                                                email: 'nobody@example.com',
                                                url: 'https://example.com',
                                            };
                                            _1.defaultpackage.build = {
                                                appId: 'com.create-react-app-extended.defaultapp',
                                                productName: answers.projectname,
                                                copyright: 'No copyright',
                                                mac: {
                                                    category: 'public.app-category.utilities',
                                                },
                                                files: ['build/**/*', 'node_modules/**/*'],
                                                directories: {
                                                    buildResources: 'assets',
                                                },
                                            };
                                            _1.defaultpackage.scripts.start =
                                                'concurrently "rescripts start" "wait-on http://localhost:3000 && electron ."';
                                            _1.defaultpackage.scripts['electron-pack'] = 'electron-builder -lw';
                                            // TODO : Add Typescript support for electron-starter
                                            _1.defaultpackage.main = 'public/electron.js';
                                        }
                                        return [4 /*yield*/, Promise.all([
                                                fs_extra_1.default.writeFile('./package.json', JSON.stringify(_1.defaultpackage)),
                                                fs_extra_1.default.copyFile(path_1.default.join(__dirname, 'generator', 'src', 'electron', '.env'), '.env'),
                                                fs_extra_1.default.copyFile(path_1.default.join(__dirname, 'generator', 'src', 'electron', '.rescriptsrc.js'), '.rescriptsrc.js'),
                                                fs_extra_1.default.copyFile(path_1.default.join(__dirname, 'generator', 'src', 'electron', '.webpack.config.js'), '.webpack.config.js'),
                                            ])];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); },
                    },
                    {
                        title: 'Add React',
                        task: function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, installhelper_1.installDependency(answers.packagemanager, 'react')];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); },
                    },
                    {
                        title: 'Install React-DOM',
                        task: function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, installhelper_1.installDependency(answers.packagemanager, 'react-dom')];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); },
                    },
                    {
                        title: 'Install React-Scripts',
                        task: function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, installhelper_1.installDependency(answers.packagemanager, 'react-scripts')];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); },
                    },
                    {
                        title: 'Install Redux',
                        enabled: function () { return answers.redux; },
                        task: function () {
                            return new listr_1.default([
                                {
                                    title: 'Install Redux Base',
                                    task: function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, installhelper_1.installDependency(answers.packagemanager, 'redux')];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); },
                                },
                                {
                                    title: 'Install React Redux',
                                    task: function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, installhelper_1.installDependency(answers.packagemanager, 'react-redux')];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); },
                                },
                                {
                                    title: 'Install Redux Types',
                                    enabled: function () { return answers.typescript; },
                                    task: function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, installhelper_1.installDependency(answers.packagemanager, '@types/react-redux')];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); },
                                },
                            ]);
                        },
                    },
                    {
                        title: 'Install Electron',
                        enabled: function () { return answers.electron; },
                        task: function () {
                            return new listr_1.default([
                                {
                                    title: 'Install Electron Core',
                                    task: function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, installhelper_1.installDevDependency(answers.packagemanager, 'electron')];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); },
                                },
                                {
                                    title: 'Install electron-builder',
                                    task: function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, installhelper_1.installDevDependency(answers.packagemanager, 'electron-builder typescript')];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); },
                                },
                                {
                                    title: 'Install Concurrently',
                                    task: function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, installhelper_1.installDevDependency(answers.packagemanager, 'concurrently')];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); },
                                },
                                {
                                    title: 'Install @rescripts/cli',
                                    task: function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, installhelper_1.installDevDependency(answers.packagemanager, '@rescripts/cli')];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); },
                                },
                                {
                                    title: 'Install @rescripts/rescript-env',
                                    task: function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, installhelper_1.installDevDependency(answers.packagemanager, '@rescripts/rescript-env')];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); },
                                },
                                {
                                    title: 'Install wait-on',
                                    task: function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, installhelper_1.installDevDependency(answers.packagemanager, 'wait-on')];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); },
                                },
                                {
                                    title: 'Install electron-is-dev',
                                    task: function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, installhelper_1.installDevDependency(answers.packagemanager, 'electron-is-dev')];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); },
                                },
                            ], { concurrent: true });
                        },
                    },
                ]);
            },
        },
        {
            title: 'Initialize Git',
            enabled: function () { return answers.repo; },
            task: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _1.pExec('git init')];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); },
        },
        {
            title: 'Add Public Resources',
            task: function () {
                return new listr_1.default([
                    {
                        title: 'Add Basic Resources',
                        task: function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, fs_extra_1.default.copy(path_1.default.join(__dirname, 'generator', 'public'), './public')];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); },
                    },
                    {
                        title: 'Add Electron Starter',
                        enabled: function () { return answers.electron; },
                        task: function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, fs_extra_1.default.copyFile(path_1.default.join(__dirname, 'generator', 'src', 'electron', 'electron.js'), './public/electron.js')];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); },
                    },
                ]);
            },
        },
        {
            title: 'Configure Typescript',
            task: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fs_extra_1.default.copyFile(path_1.default.join(__dirname, 'generator', 'typescript', 'tsconfig.json'), './tsconfig.json')];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); },
        },
        {
            title: 'Generate Source',
            task: function () {
                return new listr_1.default([
                    {
                        title: 'Add CSS',
                        task: function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, fs_extra_1.default.copy(path_1.default.join(__dirname, 'generator', 'src', 'css'), './src/css')];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); },
                    },
                    {
                        title: 'Add Images',
                        task: function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, fs_extra_1.default.copy(path_1.default.join(__dirname, 'generator', 'src', 'img'), './src/img')];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); },
                    },
                    {
                        title: 'Add Typescript',
                        enabled: function () { return answers.typescript; },
                        task: function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!answers.redux) return [3 /*break*/, 2];
                                        return [4 /*yield*/, Promise.all([
                                                installhelper_1.installDependency(answers.packagemanager, '@types/react @types/react-dom'),
                                                fs_extra_1.default.copy(path_1.default.join(__dirname, 'generator', 'src', 'typescript', 'Redux'), './src'),
                                            ])];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 2: return [4 /*yield*/, Promise.all([
                                            installhelper_1.installDependency(answers.packagemanager, '@types/react @types/react-dom'),
                                            fs_extra_1.default.copy(path_1.default.join(__dirname, 'generator', 'src', 'typescript', 'Normal'), './src'),
                                        ])];
                                    case 3:
                                        _a.sent();
                                        _a.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); },
                    },
                    {
                        title: 'Add Javascript',
                        enabled: function () { return !answers.typescript; },
                        task: function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!answers.redux) return [3 /*break*/, 2];
                                        return [4 /*yield*/, fs_extra_1.default.copy(path_1.default.join(__dirname, 'generator', 'src', 'javascript', 'Redux'), './src')];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 2: return [4 /*yield*/, fs_extra_1.default.copy(path_1.default.join(__dirname, 'generator', 'src', 'javascript', 'Normal'), './src')];
                                    case 3:
                                        _a.sent();
                                        _a.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); },
                    },
                    {
                        title: 'Add Redux',
                        enabled: function () { return answers.redux; },
                        task: function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        fs_extra_1.default.mkdirSync('./src/store');
                                        return [4 /*yield*/, fs_extra_1.default.copy(path_1.default.join(__dirname, 'generator', 'src', 'store', 'typescript'), './src/store')];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); },
                    },
                ], { concurrent: true });
            },
        },
    ], { concurrent: true });
}
exports.tasks = tasks;
