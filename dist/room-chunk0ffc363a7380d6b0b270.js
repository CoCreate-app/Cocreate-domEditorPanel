/*! For license information please see room-chunk0ffc363a7380d6b0b270.js.LICENSE.txt */
(this.webpackChunkCoCreate_attributes=this.webpackChunkCoCreate_attributes||[]).push([["room-chunk"],{"../../CoCreateJS/node_modules/@cocreate/room/src/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst CoCreateRoom = {\n  \n\tinit: function(container) {\n\t\tlet mainContainer = container || document;\n\t\tif (!mainContainer.querySelectorAll) {\n\t\t\treturn;\n\t\t}\n\t\t\n\t\tlet elements = mainContainer.querySelectorAll('[data-namespace], [data-room]');\n\t\t\n\t\tlet clients = {};\n\t\telements.forEach((el) => {\n\t\t\tif (el.isUsedForRoom) {\n\t\t\t\treturn;\n\t\t\t}\n\t\t\tconst host = CoCreate.host;\n\t\t\tlet namespace = el.getAttribute('data-namespace');\n\t\t\tlet room = el.getAttribute('data-room') || ''\n\t\t\tif (!namespace) {\n\t\t\t\tnamespace = config.organization_Id;\n\t\t\t}\n\t\t\t\n\t\t\tlet key = `${namespace}`;\n\t\t\tif (room) {\n\t\t\t\tkey = `${namespace}/${room}`\n\t\t\t}\n\t\t\t\n\t\t\tif (!clients[key]) {\n\t\t\t\tCoCreate.socket.create({\n\t\t\t\t\tnamespace,\n\t\t\t\t\troom,\n\t\t\t\t\thost\n\t\t\t\t})\n\t\t\t\t\n\t\t\t\tclients[key] = true;\n\t\t\t}\n\t\t\t\n\t\t\tel.isUsedForRoom = true;\n\t\t});\n\t}\n}\n\nCoCreateRoom.init();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CoCreateRoom);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Db0NyZWF0ZS5hdHRyaWJ1dGVzLy4uLy4uL0NvQ3JlYXRlSlMvbm9kZV9tb2R1bGVzL0Bjb2NyZWF0ZS9yb29tL3NyYy9pbmRleC5qcz9lYmNiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWdCLFVBQVU7QUFDMUI7QUFDQSxhQUFhLFVBQVUsR0FBRyxLQUFLO0FBQy9COztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTs7QUFFQSxpRUFBZSxZQUFZIiwiZmlsZSI6Ii4uLy4uL0NvQ3JlYXRlSlMvbm9kZV9tb2R1bGVzL0Bjb2NyZWF0ZS9yb29tL3NyYy9pbmRleC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IENvQ3JlYXRlUm9vbSA9IHtcbiAgXG5cdGluaXQ6IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuXHRcdGxldCBtYWluQ29udGFpbmVyID0gY29udGFpbmVyIHx8IGRvY3VtZW50O1xuXHRcdGlmICghbWFpbkNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdFxuXHRcdGxldCBlbGVtZW50cyA9IG1haW5Db250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbmFtZXNwYWNlXSwgW2RhdGEtcm9vbV0nKTtcblx0XHRcblx0XHRsZXQgY2xpZW50cyA9IHt9O1xuXHRcdGVsZW1lbnRzLmZvckVhY2goKGVsKSA9PiB7XG5cdFx0XHRpZiAoZWwuaXNVc2VkRm9yUm9vbSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBob3N0ID0gQ29DcmVhdGUuaG9zdDtcblx0XHRcdGxldCBuYW1lc3BhY2UgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbmFtZXNwYWNlJyk7XG5cdFx0XHRsZXQgcm9vbSA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1yb29tJykgfHwgJydcblx0XHRcdGlmICghbmFtZXNwYWNlKSB7XG5cdFx0XHRcdG5hbWVzcGFjZSA9IGNvbmZpZy5vcmdhbml6YXRpb25fSWQ7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdGxldCBrZXkgPSBgJHtuYW1lc3BhY2V9YDtcblx0XHRcdGlmIChyb29tKSB7XG5cdFx0XHRcdGtleSA9IGAke25hbWVzcGFjZX0vJHtyb29tfWBcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0aWYgKCFjbGllbnRzW2tleV0pIHtcblx0XHRcdFx0Q29DcmVhdGUuc29ja2V0LmNyZWF0ZSh7XG5cdFx0XHRcdFx0bmFtZXNwYWNlLFxuXHRcdFx0XHRcdHJvb20sXG5cdFx0XHRcdFx0aG9zdFxuXHRcdFx0XHR9KVxuXHRcdFx0XHRcblx0XHRcdFx0Y2xpZW50c1trZXldID0gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0ZWwuaXNVc2VkRm9yUm9vbSA9IHRydWU7XG5cdFx0fSk7XG5cdH1cbn1cblxuQ29DcmVhdGVSb29tLmluaXQoKTtcblxuZXhwb3J0IGRlZmF1bHQgQ29DcmVhdGVSb29tOyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///../../CoCreateJS/node_modules/@cocreate/room/src/index.js\n")}}]);