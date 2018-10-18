import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from 'src/comps/App';

const rootDOMElement = document.getElementById('app') as HTMLElement;

const render = (AppComponent = App) =>
  ReactDOM.render(<AppComponent />, rootDOMElement);

render(App);

if ((module as any).hot) {
  (module as any).hot.accept(['./comps/App'], () => {
    ReactDOM.unmountComponentAtNode(rootDOMElement);
    const NextApp = require('./comps/App').default;
    render(NextApp);
  });
}
