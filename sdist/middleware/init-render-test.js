"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../public/index");
var app_reducers_1 = require("../public/reducers/app-reducers");
var redux_devtools_extension_1 = require("redux-devtools-extension");
var redux_thunk_1 = require("redux-thunk");
var redux_1 = require("redux");
// import counterApp from './reducers'
// import App from './containers/App'
var reactDOMServer = require("react-dom/server");
function renderFullPage(html, preloadedState) {
    return "\n    <!doctype html>\n    <html>\n      <head>\n        <title>Redux Universal Example</title>\n      </head>\n      <body>\n        <div id=\"root\">" + html + "</div>\n        <script>\n          window.__PRELOADED_STATE__ = " + JSON.stringify(preloadedState).replace(/</g, '\\u003c') + "\n        </script>\n        <script src='./rollup/bundle.js'></script>\n      </body>\n    </html>\n    ";
}
// function app() {
//     console.log('store', store)
//     return ReactDOM.render(
//         <Provider store = { store }>
//             <TestApp/>
//         </Provider>,
//       document.getElementById('app')
//     );
// }
function handleRender(req, res) {
    // Create a new Redux store instance
    var store = redux_1.createStore(app_reducers_1.default, redux_devtools_extension_1.composeWithDevTools(redux_1.applyMiddleware(redux_thunk_1.default)));
    // Render the component to a string
    var html = reactDOMServer.renderToString(index_1.Thing);
    // // Grab the initial state from our Redux store
    var preloadedState = store.getState();
    // // Send the rendered page back to the client
    res.send(renderFullPage(html, preloadedState));
}
exports.default = handleRender;
//# sourceMappingURL=init-render-test.js.map