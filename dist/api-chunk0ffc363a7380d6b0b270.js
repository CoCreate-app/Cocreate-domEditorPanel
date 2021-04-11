/*! For license information please see api-chunk0ffc363a7380d6b0b270.js.LICENSE.txt */
(this.webpackChunkCoCreate_attributes=this.webpackChunkCoCreate_attributes||[]).push([["api-chunk"],{"../../CoCreateJS/node_modules/@cocreate/api/src/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _cocreate_socket__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cocreate/socket */ "../../CoCreateJS/node_modules/@cocreate/socket/src/index.js");\n/* harmony import */ var _cocreate_action__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cocreate/action */ "../CoCreate-action/src/index.js");\n/* harmony import */ var _cocreate_render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cocreate/render */ "../../CoCreateJS/node_modules/@cocreate/render/src/index.js");\n\n\n\n\nlet socketApi = new _cocreate_socket__WEBPACK_IMPORTED_MODULE_0__.default(\'api\');\n\nconst CoCreateApi = { \n\tmodules: { },\n\t\n\tinit: function({name, module}) {\n\t\tthis.register(name, module)\t\n\t},\n\t\n\tregister: function(name, m_instance) {\n\t\tconst self = this;\n\t\tif (typeof this.modules[name] === \'undefined\') {\n\t\t\tthis.modules[name] = m_instance;\n\t\t\t\n\t\t\tsocketApi.listen(name, (data) => {\n\t\t\t\tself.__responseProcess(name, data);\n\t\t\t})\n\t\t\t\n\t\t\t//. register actions\n\t\t\t\n\t\t\tif (Array.isArray(m_instance[\'actions\'])) {\n\t\t\t\tm_instance[\'actions\'].forEach((action) => {\n\t\t\t\t\tif (typeof m_instance[`action_${action}`] !== \'function\') {\n\t\t\t\t\t\tm_instance[`action_${action}`] = function(element) {\n\t\t\t\t\t\t\tself.__commonAction(m_instance.id, action, element)\n\t\t\t\t\t\t}\n\t\t\t\t\t} \n\t\t\t\t\t_cocreate_action__WEBPACK_IMPORTED_MODULE_1__.default.init({\n\t\t\t\t\t\taction: action,\n\t\t\t\t\t\tendEvent: action,\n\t\t\t\t\t\tcallback: (btn) => {\n\t\t\t\t\t\t\tm_instance[`action_${action}`](btn);\n\t\t\t\t\t\t},\n\t\t\t\t\t})\n\t\t\t\t})\n\t\t\t}\n\t\t}\n\t},\n\t\n\t__responseProcess: function(m_name, data) {\n\t\tconst {type, response} = data;\n\t\tconst m_instance = this.modules[m_name]\n\t\t\n\t\tif (type && response && m_instance) {\n\t\t\n\t\t\tif ( typeof m_instance[`render_${type}`] === \'function\') {\n\t\t\t\tm_instance[`render_${type}`](response);\n\t\t\t}\n\t\t\t\n\t\t\tthis.render(type, response);\n\t\t\t\n\t\t\tdocument.dispatchEvent(new CustomEvent(type, {\n\t\t\t\tdetail: {\n\t\t\t\t\tdata: response\n\t\t\t\t}\n\t\t\t}))\n\t\t}\n\t},\n\t\n\t__commonAction: function(id, action, element) {\n\t\tconst container = element.closest("form") || document;\n\t\tlet data = CoCreateApi.getFormData(id, action,  container);\n\t\tCoCreateApi.send(id, action, data);\n\t},\n\t\n\t\n\tgetFormData : function(m_name, action, container){\n\t\tconst mainAttr = `data-${m_name}`;\n\t\tconst self = this;\n\t\tconst elements = container.querySelectorAll(`[${mainAttr}^="${action}."]`);\n\n\t\tlet data = {}\n\t\telements.forEach(element => {\n\t\t\tlet name = element.getAttribute(mainAttr);\n\t\t\tlet array_name = element.getAttribute(mainAttr + "_array");\n\t\t\tlet value = self.__getElValue(element);\n\t\t\t\n\t\t\tif (!name) return\n\n\t\t\tif (action) {\n\t\t\t\tlet re = new RegExp(`^${action}.`, \'i\');\n\t\t\t\tif (re.test(name)) {\n\t\t\t\t\tname = name.replace(re, "");\n\t\t\t\t} else {\n\t\t\t\t\treturn;\n\t\t\t\t}\n\t\t\t}\n\t\t\t\n\t\t\tif (array_name) {\n\t\t\t\tif (!data[name]) {\n\t\t\t\t\tdata[name] = [];\n\t\t\t\t}\n\t\t\t\tdata[name].push(self.getFormData(m_name, array_name, element));\n\t\t\t} else if (value != null) {\n\t\t\t\tdata[name] = value;\n\t\t\t}\n\t\t});\n\t\t\n\t\tlet keys = Object.keys(data)\n\t\tlet objectData = {};\n\t\tkeys.forEach((k) => {\n\t\t\tif (k.split(\'.\').length > 1) {\n\t\t\t\tlet newData = self.__createObject(data[k], k);\n\t\t\t\tdelete data[k]\n\t\t\t\t\n\t\t\t\tobjectData = self.__mergeObject(objectData, newData);\n\t\t\t} else {\n\t\t\t\tobjectData[k] = data[k];\n\t\t\t}\n\t\t})\n\t\treturn objectData;\n\t},\n\t\n\t__getElValue: function(element) {\n\t\tlet value = null;\n\t\tif (typeof element.value !== "undefined") {\n\t\t\tswitch (element.type.toLocaleLowerCase()) {\n\t\t\t\tcase \'checkbox\':\n\t\t\t\t\tif (element.checked) {\n\t\t\t\t\t\tvalue = element.value\n\t\t\t\t\t}\n\t\t\t\t\tbreak;\n\t\t\t\tdefault:\n\t\t\t\t\tvalue = element.value;\n\t\t\t\t\tbreak;\n\t\t\t}\n\t\t} else {\n\t\t\tvalue = element.getAttribute(\'value\');\n\t\t\tif (!value) {\n\t\t\t\tvalue = element.innerHTML;\n\t\t\t}\n\t\t}\n\t\t\n\t\treturn value;\n\t},\n\t\n\t__mergeObject: function(target, source) {\n\t\ttarget = target || {};\n\t\tfor (let key of Object.keys(source)) {\n\t\t\tif (source[key] instanceof Object) {\n\t\t\t\tObject.assign(source[key], this.__mergeObject(target[key], source[key]))\n\t\t\t}\n\t\t}\n\t\t\n\t\tObject.assign(target || {}, source)\n\t\treturn target\n\t},\n\t\n\t__createObject: function (data, path) {\n\t\tif (!path) return data;\n\t\t\n\t\tlet keys = path.split(\'.\')\n\t\tlet newObject = data;\n\n\t\tfor (var  i = keys.length - 1; i >= 0; i--) {\n\t\t\tnewObject = {[keys[i]]: newObject}\t\t\t\t\n\t\t}\n\t\treturn newObject;\n\t},\n\t\n\tsend : function(module, action, data){ \n\t\tlet request_data = this.getCommonParamsExtend(data || {});\n\t\trequest_data = {...request_data, data};\n\t\tsocketApi.send(module, {type: action, data: request_data});\n\t},\n\t\n\trender: function(action, data) {\n\t\t_cocreate_render__WEBPACK_IMPORTED_MODULE_2__.default.data({\n\t\t\tselector: `[data-template_id="${action}"]`, \n\t\t\tdata: data\n\t\t});\n\t},\n\t\n\tcreateApiSocket: function(host, namespace) {\n\t\tif (namespace) {\n\t\t\tsocketApi.create({\n\t\t\t\tnamespace: namespace, \n\t\t\t\troom: null,\n\t\t\t\thost: host\n\t\t\t});\n\t\t\tsocketApi.setGlobalScope(namespace);\n\t\t} else {\n\t\t\tsocketApi.create({\n\t\t\t\tnamespace: null, \n\t\t\t\troom: null,\n\t\t\t\thost: host\n\t\t\t});\n\t\t}\n\t},\n\t\n\tgetCommonParamsExtend: function(info) \n\t{\n\t\treturn {\n\t\t\t"apiKey":           info.apiKey || config.apiKey,\n\t\t\t"securityKey":      info.securityKey || config.securityKey,\n\t\t\t"organization_id":  info.organization_id || config.organization_Id,\n\t\t}\n\t}\n}\n\nCoCreateApi.createApiSocket(\n\twindow.config.host ? window.config.host : \'server.cocreate.app\',\n\twindow.config.organization_Id\n\t// window.config.apiKey\n\t// window.config.securityKey\n);\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CoCreateApi);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Db0NyZWF0ZS5hdHRyaWJ1dGVzLy4uLy4uL0NvQ3JlYXRlSlMvbm9kZV9tb2R1bGVzL0Bjb2NyZWF0ZS9hcGkvc3JjL2luZGV4LmpzPzVkNjQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUE2QztBQUNBO0FBQ0E7O0FBRTdDLG9CQUFvQixxREFBYzs7QUFFbEMscUI7QUFDQSxXQUFXLEVBQUU7O0FBRWIsaUJBQWlCLGFBQWE7QUFDOUI7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJOztBQUVKOztBQUVBO0FBQ0E7QUFDQSxxQ0FBcUMsT0FBTztBQUM1QywyQkFBMkIsT0FBTztBQUNsQztBQUNBO0FBQ0EsTTtBQUNBLEtBQUssMERBQW1CO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixPQUFPO0FBQ25DLE9BQU87QUFDUCxNQUFNO0FBQ04sS0FBSztBQUNMO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0EsU0FBUyxlQUFlO0FBQ3hCOztBQUVBOztBQUVBLG9DQUFvQyxLQUFLO0FBQ3pDLHlCQUF5QixLQUFLO0FBQzlCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7OztBQUdGO0FBQ0EsMkJBQTJCLE9BQU87QUFDbEM7QUFDQSxrREFBa0QsU0FBUyxLQUFLLE9BQU87O0FBRXZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSw0QkFBNEIsT0FBTztBQUNuQztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw0QkFBNEI7QUFDNUI7QUFDQSxFQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxnQ0FBZ0MsUUFBUTtBQUN4QyxnQkFBZ0IscUI7QUFDaEI7QUFDQTtBQUNBLEVBQUU7O0FBRUYsdUM7QUFDQSwwREFBMEQ7QUFDMUQsa0JBQWtCO0FBQ2xCLDBCQUEwQixpQ0FBaUM7QUFDM0QsRUFBRTs7QUFFRjtBQUNBLEVBQUUsMERBQW1CO0FBQ3JCLG1DQUFtQyxPQUFPO0FBQzFDO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLFdBQVciLCJmaWxlIjoiLi4vLi4vQ29DcmVhdGVKUy9ub2RlX21vZHVsZXMvQGNvY3JlYXRlL2FwaS9zcmMvaW5kZXguanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29DcmVhdGVTb2NrZXQgZnJvbSBcIkBjb2NyZWF0ZS9zb2NrZXRcIlxuaW1wb3J0IENvQ3JlYXRlQWN0aW9uIGZyb20gJ0Bjb2NyZWF0ZS9hY3Rpb24nXG5pbXBvcnQgQ29DcmVhdGVSZW5kZXIgZnJvbSAnQGNvY3JlYXRlL3JlbmRlcidcblxubGV0IHNvY2tldEFwaSA9IG5ldyBDb0NyZWF0ZVNvY2tldCgnYXBpJyk7XG5cbmNvbnN0IENvQ3JlYXRlQXBpID0geyBcblx0bW9kdWxlczogeyB9LFxuXHRcblx0aW5pdDogZnVuY3Rpb24oe25hbWUsIG1vZHVsZX0pIHtcblx0XHR0aGlzLnJlZ2lzdGVyKG5hbWUsIG1vZHVsZSlcdFxuXHR9LFxuXHRcblx0cmVnaXN0ZXI6IGZ1bmN0aW9uKG5hbWUsIG1faW5zdGFuY2UpIHtcblx0XHRjb25zdCBzZWxmID0gdGhpcztcblx0XHRpZiAodHlwZW9mIHRoaXMubW9kdWxlc1tuYW1lXSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRoaXMubW9kdWxlc1tuYW1lXSA9IG1faW5zdGFuY2U7XG5cdFx0XHRcblx0XHRcdHNvY2tldEFwaS5saXN0ZW4obmFtZSwgKGRhdGEpID0+IHtcblx0XHRcdFx0c2VsZi5fX3Jlc3BvbnNlUHJvY2VzcyhuYW1lLCBkYXRhKTtcblx0XHRcdH0pXG5cdFx0XHRcblx0XHRcdC8vLiByZWdpc3RlciBhY3Rpb25zXG5cdFx0XHRcblx0XHRcdGlmIChBcnJheS5pc0FycmF5KG1faW5zdGFuY2VbJ2FjdGlvbnMnXSkpIHtcblx0XHRcdFx0bV9pbnN0YW5jZVsnYWN0aW9ucyddLmZvckVhY2goKGFjdGlvbikgPT4ge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgbV9pbnN0YW5jZVtgYWN0aW9uXyR7YWN0aW9ufWBdICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0XHRtX2luc3RhbmNlW2BhY3Rpb25fJHthY3Rpb259YF0gPSBmdW5jdGlvbihlbGVtZW50KSB7XG5cdFx0XHRcdFx0XHRcdHNlbGYuX19jb21tb25BY3Rpb24obV9pbnN0YW5jZS5pZCwgYWN0aW9uLCBlbGVtZW50KVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gXG5cdFx0XHRcdFx0Q29DcmVhdGVBY3Rpb24uaW5pdCh7XG5cdFx0XHRcdFx0XHRhY3Rpb246IGFjdGlvbixcblx0XHRcdFx0XHRcdGVuZEV2ZW50OiBhY3Rpb24sXG5cdFx0XHRcdFx0XHRjYWxsYmFjazogKGJ0bikgPT4ge1xuXHRcdFx0XHRcdFx0XHRtX2luc3RhbmNlW2BhY3Rpb25fJHthY3Rpb259YF0oYnRuKTtcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdFxuXHRfX3Jlc3BvbnNlUHJvY2VzczogZnVuY3Rpb24obV9uYW1lLCBkYXRhKSB7XG5cdFx0Y29uc3Qge3R5cGUsIHJlc3BvbnNlfSA9IGRhdGE7XG5cdFx0Y29uc3QgbV9pbnN0YW5jZSA9IHRoaXMubW9kdWxlc1ttX25hbWVdXG5cdFx0XG5cdFx0aWYgKHR5cGUgJiYgcmVzcG9uc2UgJiYgbV9pbnN0YW5jZSkge1xuXHRcdFxuXHRcdFx0aWYgKCB0eXBlb2YgbV9pbnN0YW5jZVtgcmVuZGVyXyR7dHlwZX1gXSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRtX2luc3RhbmNlW2ByZW5kZXJfJHt0eXBlfWBdKHJlc3BvbnNlKTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0dGhpcy5yZW5kZXIodHlwZSwgcmVzcG9uc2UpO1xuXHRcdFx0XG5cdFx0XHRkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCh0eXBlLCB7XG5cdFx0XHRcdGRldGFpbDoge1xuXHRcdFx0XHRcdGRhdGE6IHJlc3BvbnNlXG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdH1cblx0fSxcblx0XG5cdF9fY29tbW9uQWN0aW9uOiBmdW5jdGlvbihpZCwgYWN0aW9uLCBlbGVtZW50KSB7XG5cdFx0Y29uc3QgY29udGFpbmVyID0gZWxlbWVudC5jbG9zZXN0KFwiZm9ybVwiKSB8fCBkb2N1bWVudDtcblx0XHRsZXQgZGF0YSA9IENvQ3JlYXRlQXBpLmdldEZvcm1EYXRhKGlkLCBhY3Rpb24sICBjb250YWluZXIpO1xuXHRcdENvQ3JlYXRlQXBpLnNlbmQoaWQsIGFjdGlvbiwgZGF0YSk7XG5cdH0sXG5cdFxuXHRcblx0Z2V0Rm9ybURhdGEgOiBmdW5jdGlvbihtX25hbWUsIGFjdGlvbiwgY29udGFpbmVyKXtcblx0XHRjb25zdCBtYWluQXR0ciA9IGBkYXRhLSR7bV9uYW1lfWA7XG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cdFx0Y29uc3QgZWxlbWVudHMgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbChgWyR7bWFpbkF0dHJ9Xj1cIiR7YWN0aW9ufS5cIl1gKTtcblxuXHRcdGxldCBkYXRhID0ge31cblx0XHRlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXHRcdFx0bGV0IG5hbWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShtYWluQXR0cik7XG5cdFx0XHRsZXQgYXJyYXlfbmFtZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKG1haW5BdHRyICsgXCJfYXJyYXlcIik7XG5cdFx0XHRsZXQgdmFsdWUgPSBzZWxmLl9fZ2V0RWxWYWx1ZShlbGVtZW50KTtcblx0XHRcdFxuXHRcdFx0aWYgKCFuYW1lKSByZXR1cm5cblxuXHRcdFx0aWYgKGFjdGlvbikge1xuXHRcdFx0XHRsZXQgcmUgPSBuZXcgUmVnRXhwKGBeJHthY3Rpb259LmAsICdpJyk7XG5cdFx0XHRcdGlmIChyZS50ZXN0KG5hbWUpKSB7XG5cdFx0XHRcdFx0bmFtZSA9IG5hbWUucmVwbGFjZShyZSwgXCJcIik7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdGlmIChhcnJheV9uYW1lKSB7XG5cdFx0XHRcdGlmICghZGF0YVtuYW1lXSkge1xuXHRcdFx0XHRcdGRhdGFbbmFtZV0gPSBbXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkYXRhW25hbWVdLnB1c2goc2VsZi5nZXRGb3JtRGF0YShtX25hbWUsIGFycmF5X25hbWUsIGVsZW1lbnQpKTtcblx0XHRcdH0gZWxzZSBpZiAodmFsdWUgIT0gbnVsbCkge1xuXHRcdFx0XHRkYXRhW25hbWVdID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0XG5cdFx0bGV0IGtleXMgPSBPYmplY3Qua2V5cyhkYXRhKVxuXHRcdGxldCBvYmplY3REYXRhID0ge307XG5cdFx0a2V5cy5mb3JFYWNoKChrKSA9PiB7XG5cdFx0XHRpZiAoay5zcGxpdCgnLicpLmxlbmd0aCA+IDEpIHtcblx0XHRcdFx0bGV0IG5ld0RhdGEgPSBzZWxmLl9fY3JlYXRlT2JqZWN0KGRhdGFba10sIGspO1xuXHRcdFx0XHRkZWxldGUgZGF0YVtrXVxuXHRcdFx0XHRcblx0XHRcdFx0b2JqZWN0RGF0YSA9IHNlbGYuX19tZXJnZU9iamVjdChvYmplY3REYXRhLCBuZXdEYXRhKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG9iamVjdERhdGFba10gPSBkYXRhW2tdO1xuXHRcdFx0fVxuXHRcdH0pXG5cdFx0cmV0dXJuIG9iamVjdERhdGE7XG5cdH0sXG5cdFxuXHRfX2dldEVsVmFsdWU6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcblx0XHRsZXQgdmFsdWUgPSBudWxsO1xuXHRcdGlmICh0eXBlb2YgZWxlbWVudC52YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0c3dpdGNoIChlbGVtZW50LnR5cGUudG9Mb2NhbGVMb3dlckNhc2UoKSkge1xuXHRcdFx0XHRjYXNlICdjaGVja2JveCc6XG5cdFx0XHRcdFx0aWYgKGVsZW1lbnQuY2hlY2tlZCkge1xuXHRcdFx0XHRcdFx0dmFsdWUgPSBlbGVtZW50LnZhbHVlXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHZhbHVlID0gZWxlbWVudC52YWx1ZTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFsdWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgndmFsdWUnKTtcblx0XHRcdGlmICghdmFsdWUpIHtcblx0XHRcdFx0dmFsdWUgPSBlbGVtZW50LmlubmVySFRNTDtcblx0XHRcdH1cblx0XHR9XG5cdFx0XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9LFxuXHRcblx0X19tZXJnZU9iamVjdDogZnVuY3Rpb24odGFyZ2V0LCBzb3VyY2UpIHtcblx0XHR0YXJnZXQgPSB0YXJnZXQgfHwge307XG5cdFx0Zm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKHNvdXJjZSkpIHtcblx0XHRcdGlmIChzb3VyY2Vba2V5XSBpbnN0YW5jZW9mIE9iamVjdCkge1xuXHRcdFx0XHRPYmplY3QuYXNzaWduKHNvdXJjZVtrZXldLCB0aGlzLl9fbWVyZ2VPYmplY3QodGFyZ2V0W2tleV0sIHNvdXJjZVtrZXldKSlcblx0XHRcdH1cblx0XHR9XG5cdFx0XG5cdFx0T2JqZWN0LmFzc2lnbih0YXJnZXQgfHwge30sIHNvdXJjZSlcblx0XHRyZXR1cm4gdGFyZ2V0XG5cdH0sXG5cdFxuXHRfX2NyZWF0ZU9iamVjdDogZnVuY3Rpb24gKGRhdGEsIHBhdGgpIHtcblx0XHRpZiAoIXBhdGgpIHJldHVybiBkYXRhO1xuXHRcdFxuXHRcdGxldCBrZXlzID0gcGF0aC5zcGxpdCgnLicpXG5cdFx0bGV0IG5ld09iamVjdCA9IGRhdGE7XG5cblx0XHRmb3IgKHZhciAgaSA9IGtleXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdG5ld09iamVjdCA9IHtba2V5c1tpXV06IG5ld09iamVjdH1cdFx0XHRcdFxuXHRcdH1cblx0XHRyZXR1cm4gbmV3T2JqZWN0O1xuXHR9LFxuXHRcblx0c2VuZCA6IGZ1bmN0aW9uKG1vZHVsZSwgYWN0aW9uLCBkYXRhKXsgXG5cdFx0bGV0IHJlcXVlc3RfZGF0YSA9IHRoaXMuZ2V0Q29tbW9uUGFyYW1zRXh0ZW5kKGRhdGEgfHwge30pO1xuXHRcdHJlcXVlc3RfZGF0YSA9IHsuLi5yZXF1ZXN0X2RhdGEsIGRhdGF9O1xuXHRcdHNvY2tldEFwaS5zZW5kKG1vZHVsZSwge3R5cGU6IGFjdGlvbiwgZGF0YTogcmVxdWVzdF9kYXRhfSk7XG5cdH0sXG5cdFxuXHRyZW5kZXI6IGZ1bmN0aW9uKGFjdGlvbiwgZGF0YSkge1xuXHRcdENvQ3JlYXRlUmVuZGVyLmRhdGEoe1xuXHRcdFx0c2VsZWN0b3I6IGBbZGF0YS10ZW1wbGF0ZV9pZD1cIiR7YWN0aW9ufVwiXWAsIFxuXHRcdFx0ZGF0YTogZGF0YVxuXHRcdH0pO1xuXHR9LFxuXHRcblx0Y3JlYXRlQXBpU29ja2V0OiBmdW5jdGlvbihob3N0LCBuYW1lc3BhY2UpIHtcblx0XHRpZiAobmFtZXNwYWNlKSB7XG5cdFx0XHRzb2NrZXRBcGkuY3JlYXRlKHtcblx0XHRcdFx0bmFtZXNwYWNlOiBuYW1lc3BhY2UsIFxuXHRcdFx0XHRyb29tOiBudWxsLFxuXHRcdFx0XHRob3N0OiBob3N0XG5cdFx0XHR9KTtcblx0XHRcdHNvY2tldEFwaS5zZXRHbG9iYWxTY29wZShuYW1lc3BhY2UpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzb2NrZXRBcGkuY3JlYXRlKHtcblx0XHRcdFx0bmFtZXNwYWNlOiBudWxsLCBcblx0XHRcdFx0cm9vbTogbnVsbCxcblx0XHRcdFx0aG9zdDogaG9zdFxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9LFxuXHRcblx0Z2V0Q29tbW9uUGFyYW1zRXh0ZW5kOiBmdW5jdGlvbihpbmZvKSBcblx0e1xuXHRcdHJldHVybiB7XG5cdFx0XHRcImFwaUtleVwiOiAgICAgICAgICAgaW5mby5hcGlLZXkgfHwgY29uZmlnLmFwaUtleSxcblx0XHRcdFwic2VjdXJpdHlLZXlcIjogICAgICBpbmZvLnNlY3VyaXR5S2V5IHx8IGNvbmZpZy5zZWN1cml0eUtleSxcblx0XHRcdFwib3JnYW5pemF0aW9uX2lkXCI6ICBpbmZvLm9yZ2FuaXphdGlvbl9pZCB8fCBjb25maWcub3JnYW5pemF0aW9uX0lkLFxuXHRcdH1cblx0fVxufVxuXG5Db0NyZWF0ZUFwaS5jcmVhdGVBcGlTb2NrZXQoXG5cdHdpbmRvdy5jb25maWcuaG9zdCA/IHdpbmRvdy5jb25maWcuaG9zdCA6ICdzZXJ2ZXIuY29jcmVhdGUuYXBwJyxcblx0d2luZG93LmNvbmZpZy5vcmdhbml6YXRpb25fSWRcblx0Ly8gd2luZG93LmNvbmZpZy5hcGlLZXlcblx0Ly8gd2luZG93LmNvbmZpZy5zZWN1cml0eUtleVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgQ29DcmVhdGVBcGk7Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///../../CoCreateJS/node_modules/@cocreate/api/src/index.js\n')}}]);