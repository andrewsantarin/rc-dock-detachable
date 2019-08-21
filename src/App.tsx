import React, { Fragment, CSSProperties, Component } from 'react';
import NewWindow from 'react-new-window';
import DockLayout, { TabGroup, LayoutData, TabData } from 'rc-dock';

import 'rc-dock/dist/rc-dock.css';

export const jsxTab = {
  id: 'jsxTab',
  title: 'jsx',
  group: 'group',
  closable: true,
  content: (
    <div>
      JSX Tab
    </div>
  ),
};

export const htmlTab = {
  id: 'htmlTab',
  title: 'html',
  group: 'group',
  closable: true,
  content: (
    <div>
      HTML Tab
    </div>
  ),
};

type Lookup<Value> = {
  [key: string]: Value;
}

let tab: TabData = {
  id: 't1',
  title: 'Tab',
  group: 'group',
  closable: true,
  content: (
    <div>
      <p>Custom component can be added to panel's title bar.</p>
      <p>This panel has a custom maximize button and a close all button</p>
    </div>
  ),
};

const style: CSSProperties = {
  position: 'absolute',
  left: 10,
  top: 10,
  right: 10,
  bottom: 10,
};

interface AppProps {}
interface AppState { newWindow: boolean; }

class App extends Component<AppProps, AppState> {
  state: AppState = {
    newWindow: false,
  };

  count = 0;

  groups: Lookup<TabGroup> = {
    group: {
      floatable: true,
      maximizable: true,
      panelExtra: (panelData, context) => (
        <div>
          {!this.state.newWindow && (
            <span
              className='my-panel-extra-btn'
              onClick={this.createNewWindow}
            >
              window
            </span>
          )}
          <span
            className='my-panel-extra-btn'
            onClick={() => context.dockMove(this.newTab(), panelData, 'middle')}
          >
            🞦
        </span>
          <span
            className='my-panel-extra-btn'
            onClick={() => context.dockMove(panelData, null as any, 'maximize')}
          >
            <span className={`${panelData.parent!.mode === 'maximize' ? 'min' : 'max'}-icon`}>
              &nbsp;
          </span>
          </span>
          <span
            className='my-panel-extra-btn'
            onClick={() => context.dockMove(panelData, null as any, 'remove')}
          >
            X
        </span>
        </div>
      ),
    },
  };

  createNewWindow = () => {
    this.setState({
      newWindow: true,
    });
  }

  createDefaultLayout = (): LayoutData => {
    const defaultLayout: LayoutData = {
      dockbox: {
        mode: 'horizontal',
        children: [
          {
            mode: 'vertical',
            size: 500,
            children: [
              {
                tabs: [
                  tab,
                  jsxTab,
                  htmlTab,
                ],
              },
              {
                tabs: [
                  this.newTab(),
                  this.newTab(),
                ],
              },
            ],
          },
          {
            size: 300,
            tabs: [
              {
                ...tab,
                id: 't5',
              },
              {
                ...tab,
                id: 't6',
              },
            ],
          },
        ],
      },
    };

    return defaultLayout;
  }

  newTab = (): TabData => {
    return {
      id: `newtab${++this.count}`,
      title: 'New Tab',
      group: 'group',
      closable: true,
      content: (
        <div>
          <p>This panel has an 'add' button defined in panelLock</p>
        </div>
      ),
    };
  }

  render() {
    const { newWindow } = this.state;
    const defaultLayout = this.createDefaultLayout();

    return (
      <Fragment>
        <DockLayout
          defaultLayout={defaultLayout}
          groups={this.groups}
          style={style}
        />
        {newWindow && (
          <NewWindow
            onOpen={(window) => {
              
            }}
          >
            <App />
          </NewWindow>
        )}
      </Fragment>
    );
  }
}

export default App;
